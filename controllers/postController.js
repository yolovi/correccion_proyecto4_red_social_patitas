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
  async update(req, res) {
        try {
            const post = await Post.findByIdAndUpdate(req.params._id, req.body, { new: true })
            res.send({ message: "Post actualizado correctamente", post});
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
     async getProductsByName(req, res) {
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
     }

};

module.exports = PostController;
