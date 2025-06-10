const { JWT_SIGNATURE } = require("../config/keys");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
//USUARIO CON BCRYPT:
const UserController = {
  async create(req, res) {
    try {
      const password = await bcrypt.hash(req.body.password, 10);
      const user = await User.create({
        ...req.body,
        password: password,
        role: "user",
      });
      res.status(201).send({
        msg: "Usuario creado con éxito",
        user,
      });
    } catch (error) {
      res.status(500).send({
        msg: "Usuario no se ha podido crear",
        error,
      });
    }
  },
  //LOGIN
  async login(req, res) {
    try {
      const user = await User.findOne({
        email: req.body.email,
      });
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
  //LOGOUT DIAPOSITIVAS
  // async logout (req, res) {
  //     try {
  //       if (!req.user) {
  //         return res.status(401).send ({message:"No autorizado"}) //req.user debe existir. El usuario tiene que estar autenticado.
  //       }
  //       const token = req.headers.authorization?.replace('Bearer ', ''); // Extrae el token del header (eliminando "Bearer si existe)
  //       if (!token) {
  //         return res.status(400).send ({msg: "Token no proporcionado"});
  //       }
  //       //Elimina el token del array "tokens" del usuario
  //       await User.findByIdAndUpdate (
  //         req.user._id,
  //         { $pull: {tokens: token}},
  //         {new:true}
  //       );
  //       res.send ({msg: "Desconectado con éxito"});
  //     }catch (error) {
  //       console.error (error);
  //       res.status (500).send({
  //         msg:"Hubo un problema al intentar desconectar al usuario",
  //         error: error.message, });
  //       }
  //     },
  //   }
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
};
module.exports = UserController;
