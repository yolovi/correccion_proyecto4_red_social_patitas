const { JWT_SIGNATURE } = require("../config/keys");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const transporter = require("../config/nodemailer");

//USUARIO CON BCRYPT:
const UserController = {
  async create(req, res) {
    try {
      // 1. Hash de la contraseña
      const password = await bcrypt.hash(req.body.password, 10);

      // 2. Prepara los datos del usuario
      const imagePath = req.file ? req.file.filename : null;

      const userData = {
        ...req.body,
        password: password,
        confirmed: false,
        role: "user",
        image: imagePath
      };

      // // 3. Si se subió un archivo, añade la ruta al objeto userData
      // if (req.file) {
      //   userData.profilePicture = req.file.path; // Multer añade la ruta del archivo subido
      // } else {
      //   // Opcional: Si no se subió una imagen, podrías querer usar la imagen por defecto
      //   userData.profilePicture = "uploads/default_avatar.png";
      // }

      // 4. Crea el usuario en la base de datos
      console.log("Datos del usuario a crear:", userData); // Para depuración
      const user = await User.create(userData);

    /*   // 5. Envía el correo de confirmación
      const url = "http://localhost:8080/user/confirm/" + req.body.email; // Asegúrate de que 8080 es tu puerto frontend o el correcto
      await transporter.sendMail({
        // Ahora 'transporter' estará definido
        to: req.body.email,
        subject: "Confirme su registro",
        html: `<h3> Bienvenid@ a Patitas Conectadas, estás a punto de registrarte</h3>
              <a href = "${url}"> Clica para confirmar tu registro</a>`,
      }); */

      // 6. Responde con éxito
      res.status(201).send({
        msg: "Comprueba tu correo, te hemos enviado un mensaje",
        user,
      });
    } catch (error) {
      // Manejo de errores de Multer (si el error viene del middleware de Multer, tendrá un 'message' específico)
      if (
        error.message &&
        error.message.includes("Solo se permiten imágenes")
      ) {
        return res.status(400).send({
          msg: "Error en la subida de la imagen: " + error.message,
          error: error.message,
        });
      }
      console.error(error); // Imprime el error completo para depuración
      res.status(500).send({
        msg: "Usuario no se ha podido crear",
        error: error.message, // Envía solo el mensaje del error para mayor claridad al cliente
      });
    }
  },
  // LOGIN
  async login(req, res) {
    try {
      const user = await User.findOne({
        email: req.body.email,
      });
      //si no se encuentra el usuario no o existe
      if (!user) {
        return res.status(400).send("Correo o contraseña incorrectos");
      }

      //Verificación de usuario confirmado
      if (!user.confirmed) {
        return res
          .status(403)
          .send("Debes confirmar tu correo antes de iniciar sesión");
      }
      const isMatch = bcrypt.compareSync(req.body.password, user.password);

      if (!isMatch) {
        return res.status(400).send("Correo o contraseña incorrectos");
      }
      const token = jwt.sign({ _id: user._id }, JWT_SIGNATURE);
      if (user.tokens.length > 4) user.tokens.shift(); //si hay 4 tokens guardados, nos quita el primero en la array
      user.tokens.push({ token }); //guardar token
      await user.save();
      res.send({
        message: "¡Bienvenid@!Has finalizado con éxito tu log in " + user.name,
        token,
      });
    } catch (error) {
      console.error("Error al iniciar sesion", error);
      res.status(500).send({
        msg: "No se ha podido hacer el log in",
        error,
      });
    }
  },
  async logout(req, res) {
    try {
      if (!req.user || !req.token) {
        //req.user debe existir. El usuario tiene que estar autenticado.
        return res.status(401).send({ message: "No autorizado" });
      }
      await User.findByIdAndUpdate(
        req.user._id,
        { $pull: { tokens: { token: req.token } } }, // Elimina el token específico del array de tokens del usuario
        { new: true }
      );
      res.send({ msg: "Desconectado con éxito" });
    } catch (error) {
      console.error("Error en logout:", error);
      res.status(500).send({
        msg: "Hubo un problema al intentar desconectar al usuario",
        error: error.message,
      });
    }
  },
  //GET BY ID
  async getById(req, res) {
    try {
      const userById = await User.findById(req.params._id);
      res.send(userById);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Ha habido un problema al traer el usuario por ID" });
    }
  },
  //GET BY NAME
  async getUserByName(req, res) {
    try {
      const usuarios = await User.find({
        $text: {
          $search: req.params.name,
        },
      });
      res.send(usuarios);
    } catch (error) {
      console.log(error);
    }
  },
  //GET únicamente el usuario conectado
  async getUsuarioConectado(req, res) {
    try {
      res.send({
        msg: "Perfil del usuario autenticado",
        user: req.user,
      });
    } catch (error) {
      res.status(500).send({ msg: "Error al obtener el perfil", error });
    }
  },
  //CONFIRMATION EMAIL
  async confirm(req, res) {
    try {
      const result = await User.updateOne(
        { email: req.params.email },
        { $set: { confirmed: true } }
      );

      if (result.modifiedCount === 0) {
        return res.status(404).send("Usuario no encontrado o ya confirmado");
      }

      res.status(200).send("Usuario confirmado con éxito");
    } catch (error) {
      console.error(error);
      res.status(500).send("Error al confirmar el usuario");
    }
  },
};

module.exports = UserController;
