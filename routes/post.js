const express = require("express");
const PostController = require("../controllers/PostController");
const Post = require("../models/Post");
const isAuthor = require("../middlewares/authentication");
const router = express.Router();

router.post("/", PostController.create);
router.put("/id/:_id", PostController.update);
router.get("/id/:_id", PostController.getOne);
router.get("/title/:title", PostController.getProductsByName)
router.delete("/id/:_id", PostController.delete);


module.exports = router;