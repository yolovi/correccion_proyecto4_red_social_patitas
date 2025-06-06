const express = require("express");
const PostController = require("../controllers/postController");

const router = express.Router();

router.post("/", PostController.create);
router.get("/id/:_id", PostController.getOne);

module.exports = router;
