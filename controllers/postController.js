const Post = require("../models/Post");

const PostController = {
  async create(req, res) {
    try {
      if (!req.body.title || !req.body.body) {
        return res
          .status(400)
          .send({ message: "Título y contenido son requeridos" });
      }
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
  async update(req, res) {
    try {
      const post = await Post.findByIdAndUpdate(req.params._id, req.body, { new: true })
      res.send({ message: "Post actualizado correctamente", post });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Ha habido un problema al actualizar el post' })

    }
  },
  async delete(req, res) {
    try {
      const post = await Post.findByIdAndDelete(req.params._id)
      res.send({ message: 'Post eliminado', post })
    } catch (error) {
      console.error(error)
      res.status(500).send({ message: 'Ha habido un problema al eliminar el post' })
    }
  },
  async getPostsByName(req, res) {
    try {
      if (req.params.title.length > 20) {
        return res.status(400).send('Búsqueda demasiado larga')
      }
      const post = new RegExp(req.params.title, "i");
      const posts = await Post.find({ title: post });
      res.send(posts);
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: 'Ha habido un problema al traer los posts' })
    }
  },

  async likeOnePost(req, res) {
    try {
      const post = await Post.findById(req.params._id);
      const userId = req.body.user;
      const hasLiked = post.likes.some((_id) => _id.toString() === userId);
      if (hasLiked) {
        post.likes.pull(userId);
      } else {
        post.likes.push(userId);
      }
      await post.save();
      res.status(200).send(post);
    } catch (error) {
      res.status(500)
      console.error(error)
      .send({
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
