const express = require("express");
const CommentController = require("../controllers/commentController");
const { isAuthorComment } = require("../middlewares/authentication");

const router = express.Router();

router.post("/", CommentController.create);
router.post("/id/:_id", CommentController.likeOneComment);
router.get("/", CommentController.getAll);
router.put("/id/:_id", /* isAuthorComment, */ CommentController.update);
router.delete("/id/:_id", /* isAuthorComment, */ CommentController.delete);

module.exports = router;
