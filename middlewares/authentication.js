const Comment = require("../models/Comment.js");
const Post = require("../models/post.js");
const User = require("../models/user.js");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const JWT_SIGNATURE = process.env.JWT_SECRET;

const authentication = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .send({ message: "Token no proporcionado o formato incorrecto" });
    }

    const token = authHeader.replace("Bearer ", "");

    const payload = jwt.verify(token, JWT_SIGNATURE);
    const user = await User.findOne({
      _id: payload._id,
      "tokens.token": token,
    });

    if (!user) {
      return res
        .status(401)
        .send({ message: "Token no válido o usuario no encontrado" });
    }

    req.user = user;
    req.token = token;

    next();
  } catch (error) {
    console.error("Error en autenticación:", error.message);
    return res
      .status(401)
      .send({ error: error.message || error, message: "Token inválido" });
  }
};

const isAuthorComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params._id);
    if (comment.user.toString() !== req.user._id.toString()) {
      return res.status(403).send({ message: "Este comentario no es tuyo" });
    }
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      error,
      message: "Ha habido un problema al comprobar la autoría del comentario",
    });
  }
};

const isAuthorPost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params._id);
    if (post.user.toString() !== req.user._id.toString()) {
      return res.stauts(403).send({ message: "Esta publicación no es tuya" });
    }
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      error,
      message: "Ha habido un problema al verificar que este post es tuyo",
    });
  }
};

module.exports = { authentication, isAuthorComment, isAuthorPost };
