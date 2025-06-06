const Comment = require("../models/Comment.js");

const isAuthorComment = async (req, res, next) => {
  try {
    const order = await Comment.findById(req.params._id);
    if (order.userId.toString() !== req.user._id.toString()) {
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

module.exports = { isAuthorComment };
