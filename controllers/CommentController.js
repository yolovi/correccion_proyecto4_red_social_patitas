const Post = require("../models/post");
const Comment = require("../models/Comment");

const CommentController = {
  async create(req, res) {
    try {
      const comment = await Comment.create({
        ...req.body,
        user: req.user._id,
        image: req.file ? req.file.path : null,
      });
      await Post.findByIdAndUpdate(comment.postId, {
        $push: { comments: comment._id },
      });
      res.status(201).send({ msg: "Comentario creado con éxito", comment });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .send({ message: "Ha habido un problema al crear tu comentario" });
    }
  },
  async getAll(req, res) {
    try {
      const comments = await Comment.find().populate({
        path: "user",
        select: "name",
      });
      res.status(200).send(comments);
    } catch (error) {
      res.status(500).send({
        message: "Ha habido un problema al consultar los comentarios",
      });
    }
  },
  async update(req, res) {
    try {
      const updateData = { ...req.body };
      if (req.file) updateData.image = req.file.path;

      const comment = await Comment.findByIdAndUpdate(
        req.params._id,
        updateData,
        { new: true, user: req.user._id }
      );
      res.send({ message: "Comentario actualizado correctamente", comment });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Ha habido un problema al actualizar el comentario" });
    }
  },
  async delete(req, res) {
    try {
      const comment = await Comment.findByIdAndDelete(req.params._id);
      res.send({ message: "Comentario eliminado", comment });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Ha habido un problema al eliminar el comentario" });
    }
  },
  async likeOneComment(req, res) {
    try {
      const commentId = req.params._id;
      const userId = req.user._id;
      const comment = await Comment.findById(commentId);
      const hasLiked = comment.likes.some(
        (id) => id.toString() === req.user._id.toString()
      );
      if (hasLiked) {
        comment.likes.pull(userId);
      } else {
        comment.likes.push(userId);
      }
      await comment.save();
      res.status(200).send({
        message: hasLiked
          ? "Has quitado tu like del post"
          : "Has dado like al post",
        likesCount: comment.likes.length,
        comment,
      });
    } catch (error) {
      console.error("Error en likeOneComment:", error);
      res.status(500).send({
        message: "Ha habido un problema al dar o quitar el like al comentario",
      });
    }
  },
};

module.exports = CommentController;
