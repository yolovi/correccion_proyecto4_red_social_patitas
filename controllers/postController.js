const Post = require("../models/Post");

const PostController = {
  async create(req, res) {
    try {
      const post = await Post.create(req.body);
      res.status(201).send(post);
    } catch (error) {
      res
        .status(500)
        .send({ message: "Ha habido un problema al crear el post" });
    }
  },
  async getOne(req, res) {
    try {
      const post = await Post.findById(req.params._id).populate(
        {
          path: "comments",
          select: "text",
        }.populate({
          path: "comments",
          select: "text",
        })
      );
      res.status(200).send(post);
    } catch (error) {
      res.status(500).send(error);
    }
  },
  async likeOnePost(req, res) {
    try {
      const post = await Post.findById(req.params._id);
      const userId = req.user._id;
      const hasLiked = post.likes.some(
        (id) => id.toString() === req.user._id.toString()
      );
      if (hasLiked) {
        post.likes.pull(userId);
      } else {
        post.likes.push(userId);
      }
      await post.save();
      res.status(200).send({
        message: hasLiked
          ? "Has quitado tu like del post"
          : "Has dado like al post",
        likesCount: post.likes.length,
        post,
      });
    } catch (error) {
      res.status(500).send({
        message: "Ha habido un problema al dar o quitar el like al post",
      });
    }
  },
  async getAll(req, res) {
    try {
      const post = await Post.find().populate({
        path: "user",
        select: "name",
      });
      res.status(200).send(post);
    } catch (error) {
      res.status(500).send({
        message: "Ha habido un problema al traer la información de los post",
      });
    }
  },
};

module.exports = PostController;
