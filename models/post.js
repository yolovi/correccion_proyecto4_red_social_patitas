const mongoose = require("mongoose");
const ObjectId = mongoose.SchemaTypes.ObjectId;

const PostSchema = new mongoose.Schema(
  {
    name: String,
    content: String,
    comments: [{ type: ObjectId, ref: "Comment" }],
    likes: [{ type: ObjectId, ref: "User" }],
    user: {
      type: ObjectId,
      ref: "User",
    },
    image: {
      type: String, // Aquí se guarda la ruta del archivo de imagen
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
