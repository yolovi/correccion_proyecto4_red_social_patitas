const express = require("express");
const {
  authentication,
  isAuthorPost,
} = require("../middlewares/authentication");
const PostController = require("../controllers/postController");
const router = express.Router();

router.post("/", authentication, PostController.create);
router.post("/id/:_id", authentication, PostController.likeOnePost);
router.put("/id/:_id", authentication, isAuthorPost, PostController.update);
router.get("/id/:_id", PostController.getOne);
router.get("/title/:title", PostController.getPostsByName);
router.get("/id/:_id", PostController.getOne);
router.get("/", PostController.getAll);
router.delete("/id/:_id", authentication, isAuthorPost, PostController.delete);

module.exports = router;
