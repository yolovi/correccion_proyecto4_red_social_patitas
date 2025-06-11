const express = require("express");
const {
  isAuthorComment,
  authentication,
} = require("../middlewares/authentication");
const upload = require("../middlewares/uploads"); 
const CommentController = require("../controllers/CommentController");
const router = express.Router();


router.post("/", authentication, upload.single("image"), CommentController.create);
router.post("/id/:_id", authentication, CommentController.likeOneComment);
router.put("/id/:_id", authentication,upload.single("image"), isAuthorComment, CommentController.update);
router.get("/", CommentController.getAll);
router.delete("/id/:_id", authentication, isAuthorComment, CommentController.delete);

module.exports = router;
