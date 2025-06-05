const express = require("express");
const PostController = require("../controllers/postController");
const Post = require("../models/post");
const router = express.Router();

router.post("/", PostController.create);

module.exports = router;
