const Post = require("../models/post");

const PostController = {
  async create(req, res) {
    try {
      if (!req.body.title || !req.body.body) {
        return res
          .status(400)
          .send({ message: "Título y contenido son requeridos" });
      }

      const imagePath = req.file ? req.file.filename : null;

      const post = await Post.create({
        ...req.body,
        image: imagePath,
        user: req.user._id,
      });
      res.status(201).send(post);
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .send({ message: "Ha habido un problema al crear el post" });
    }
  },
  async getOne(req, res) {
    try {
      const post = await Post.findById(req.params._id).populate({
        path: "comments",
        populate: {
          path: "user",
          select: "text",
        },
      });

      res.status(200).send(post);
    } catch (error) {
      console.log(error);
      /**CORRECCION:
       * no podemos mandar el error como respuesta. Esta llamada se va a consumir, seguramente almacenandose su
       * respuesta en una variable en el front. Si mandamos el error como respuesta lo va a recibir como si todo
       * hubiese ido bien, pero no tendrá almacenado el post que buscaba si no un error
       */
      res.status(500).send(error);
    }
  },
  async update(req, res) {
    try {
      const updateData = { ...req.body };
      if (req.file) updateData.image = req.file.path;

      const post = await Post.findByIdAndUpdate(req.params._id, req.body, {
        new: true,
        userId: req.user._id,
      });
      res.send({ message: "Post actualizado correctamente", post });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Ha habido un problema al actualizar el post" });
    }
  },
  async delete(req, res) {
    try {
      const post = await Post.findByIdAndDelete(req.params._id);
      res.send({ message: "Post eliminado", post });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Ha habido un problema al eliminar el post" });
    }
  },
  async getPostsByName(req, res) {
    try {
      if (req.params.title.length > 20) {
        return res.status(400).send("Búsqueda demasiado larga");
      }
      const post = new RegExp(req.params.title, "i");
      const posts = await Post.find({ title: post });
      res.send(posts);
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .send({ message: "Ha habido un problema al traer los posts" });
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
      res.status(500);
      console.error(error).send({
        message: "Ha habido un problema al dar o quitar el like al post",
      });
    }
  },
  async getAll(req, res) {
    try {
      const { page = 1, limit = 10 } = req.query;
      const post = await Post.find()
        .populate({
          path: "comments",
          populate: {
            path: "user",
            select: "text",
          },
        })
        .limit(limit * 1)
        .skip((page - 1) * limit);

      res.status(200).send(post);
    } catch (error) {
      res.status(500).send({
        message: "Ha habido un problema al traer la información de los post",
      });
    }
  },
};

module.exports = PostController;
