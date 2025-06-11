const mongoose = require("mongoose");
const ObjectId = mongoose.SchemaTypes.ObjectId;

const CommentSchema = new mongoose.Schema(
  {
    text: String,
    postId: { type: ObjectId, ref: "Post" },
    likes: [{ type: ObjectId, ref: "User" }],
    user: {
      type: ObjectId,
      ref: "User",
    },  image: [{
      type: String
    }]
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;
