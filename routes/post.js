const express = require("express");
const { authentication } = require("../middlewares/authentication");
const PostController = require("../controllers/postController");
const upload = require("../middlewares/uploads"); 
const Post = require("../models/Post");
const isAuthor = require("../middlewares/authentication");
const router = express.Router();

router.post("/", authentication, upload.single("image"), PostController.create);
router.put("/id/:_id", authentication, upload.single("image"), PostController.update);
router.get("/id/:_id", PostController.getOne);
router.get("/title/:title", PostController.getPostsByName)
router.delete("/id/:_id", authentication, PostController.delete);
router.post("/id/:_id", authentication, PostController.likeOnePost);
router.get("/id/:_id", PostController.getOne);
router.get("/", PostController.getAll);


module.exports = router;