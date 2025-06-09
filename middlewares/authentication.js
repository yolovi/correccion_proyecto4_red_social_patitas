const Comment = require("../models/Comment.js");
const Post = require('../models/Post.js')

const isAuthorComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params._id);
    if (comment.userId.toString() !== req.user._id.toString()) {
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


const isAuthorPost = async(req, res, next) => {
    try {
        const post = await Post.findById(req.params._id);
        if (post.userId.toString() !== req.user._id.toString()) {
            return res.stauts(403).send({message: "Esta publicación no es tuya"});
        }
        next();        
    } catch (error) {
        console.error(error)
        return res.status(500).send({ error, message: "Ha habido un problema al verificar que este post es tuyo"})
    }
}



module.exports = { isAuthorComment , isAuthorPost };

