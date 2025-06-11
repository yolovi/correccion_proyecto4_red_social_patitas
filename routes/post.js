const express = require("express");
const upload = require("../middlewares/uploads"); 
const {
  authentication,
  isAuthorPost,
} = require("../middlewares/authentication");
const PostController = require("../controllers/postController");
const router = express.Router();

router.post("/", authentication,upload.single("image"),PostController.create);
router.post("/id/:_id", authentication, PostController.likeOnePost);
router.put("/id/:_id", authentication,upload.single("image"), isAuthorPost, PostController.update);
router.get("/id/:_id", PostController.getOne);
router.get("/title/:title", PostController.getPostsByName);
router.get("/", PostController.getAll);
router.delete("/id/:_id", authentication, isAuthorPost, PostController.delete);

module.exports = router;
