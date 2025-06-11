const mongoose = require("mongoose");
const ObjectId = mongoose.SchemaTypes.ObjectId;

const PostSchema = new mongoose.Schema(
  {
    title: String,
    body: String,
    comments: [{ type: ObjectId, ref: "Comment" }],
    likes: [{ type: ObjectId, ref: "User" }],
    user: {
      type: ObjectId,
      ref: "User",
    },
    image: [{
      type: String
    }]
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
