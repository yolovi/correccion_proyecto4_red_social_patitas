const express = require("express");
const PostController = require("../controllers/postController");

const router = express.Router();

router.post("/", PostController.create);
router.post("/id/:_id", PostController.likeOnePost);
router.get("/id/:_id", PostController.getOne);
router.get("/", PostController.getAll);

module.exports = router;
