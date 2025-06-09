const express = require("express");
const { authentication } = require("../middlewares/authentication");
const PostController = require("../controllers/postController");

const router = express.Router();

router.post("/", PostController.create);
router.post("/id/:_id", authentication, PostController.likeOnePost);
router.get("/id/:_id", PostController.getOne);
router.get("/", PostController.getAll);

module.exports = router;
