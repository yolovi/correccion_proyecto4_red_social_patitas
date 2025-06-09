const express = require("express");
const PostController = require("../controllers/postController");
const Post = require("../models/Post");
const isAuthor = require("../middlewares/authentication");
const router = express.Router();

router.post("/", PostController.create);
router.put("/id/:_id", PostController.update);
router.get("/id/:_id", PostController.getOne);
router.get("/title/:title", PostController.getPostsByName)
router.delete("/id/:_id", PostController.delete);


module.exports = router;