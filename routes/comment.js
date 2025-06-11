const express = require("express");
const { isAuthorComment, authentication } = require("../middlewares/authentication");
const CommentController = require("../controllers/CommentController");

const router = express.Router();

router.post("/", authentication, CommentController.create);
router.post("/id/:_id", authentication, CommentController.likeOneComment);
router.put("/id/:_id", authentication, isAuthorComment, CommentController.update);
router.get("/", CommentController.getAll);
router.delete("/id/:_id", authentication, isAuthorComment, CommentController.delete);

module.exports = router;
