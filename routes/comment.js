const express = require("express");
const {
  isAuthorComment,
  authentication,
} = require("../middlewares/authentication");
const CommentController = require("../controllers/CommentController");

const router = express.Router();

router.post("/", CommentController.create);
router.post("/id/:_id", authentication, CommentController.likeOneComment);
router.get("/", CommentController.getAll);
router.put("/id/:_id", /* isAuthorComment, */ CommentController.update);
router.delete("/id/:_id", /* isAuthorComment, */ CommentController.delete);

module.exports = router;
