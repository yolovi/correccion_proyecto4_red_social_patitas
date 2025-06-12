require("dotenv").config();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const transporter = require("../config/nodemailer");
const JWT_SIGNATURE = process.env.JWT_SECRET;

//USUARIO CON BCRYPT:
const UserController = {
  async create(req, res) {
    try {
      const password = await bcrypt.hash(req.body.password, 10);
      const imagePath = req.file ? req.file.filename : null;

      const userData = {
        ...req.body,
        password: password,
        confirmed: false,
        role: "user",
        image: imagePath,
      };
      console.log("Datos del usuario a crear:", userData); // Para depuración
      const user = await User.create(userData);
      const url = "http://localhost:8080/user/confirm/" + req.body.email;
      await transporter.sendMail({
        to: req.body.email,
        subject: "Confirme su registro",
        html: `<h3> Bienvenid@ a Patitas Conectadas, estás a punto de registrarte</h3>
              <a href = "${url}"> Clica para confirmar tu registro</a>`,
      });
      res.status(201).send({
        msg: "Comprueba tu correo, te hemos enviado un mensaje",
        user,
      });
    } catch (error) {
      if (
        error.message &&
        error.message.includes("Solo se permiten imágenes")
      ) {
        return res.status(400).send({
          msg: "Error en la subida de la imagen: " + error.message,
          error: error.message,
        });
      }
      console.error(error);
      res.status(500).send({
        msg: "Usuario no se ha podido crear",
        error: error.message,
      });
    }
  },
  // LOGIN
  async login(req, res) {
    try {
      const user = await User.findOne({
        email: req.body.email,
      });
      if (!user) {
        return res.status(400).send("Correo o contraseña incorrectos");
      }
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
      if (user.tokens.length > 4) user.tokens.shift();
      user.tokens.push({ token });
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
  async update(req, res) {
    try {
      const updateData = { ...req.body };
      if (req.file) updateData.image = req.file.path;

      const user = await User.findByIdAndUpdate(req.params._id, req.body);
      res.send({ message: "User actualizado correctamente", user });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Ha habido un problema al actualizar el user" });
    }
  },
  async logout(req, res) {
    try {
      if (!req.user || !req.token) {
        return res.status(401).send({ message: "No autorizado" });
      }
      await User.findByIdAndUpdate(
        req.user._id,
        { $pull: { tokens: { token: req.token } } },
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
