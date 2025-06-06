const Post = require("../models/Post");

const PostController = {
  async create(req, res) {
    try {
      const post = await Post.create(req.body);
      res.status(201).send(post);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Ha habido un problema al crear el post" });
    }
  },
  async getOne(req, res) {
    try {
      const post = await Post.findById(req.params._id)
        .select("name content comments")
        .populate({
          path: "comments",
          select: "text",
        });
      res.status(200).send(post);
    } catch (error) {
      res.status(500).send(error);
    }
  },
};

module.exports = PostController;
