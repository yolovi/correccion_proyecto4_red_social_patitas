const express = require("express");
const {
  isAuthorComment,
  authentication,
} = require("../middlewares/authentication");
const upload = require("../middlewares/uploads"); // Asegúrate de que el nombre coincida con tu archivo
const CommentController = require("../controllers/CommentController");

const router = express.Router();

router.post("/", authentication, upload.single("image"), CommentController.create);
router.post("/id/:_id", authentication, CommentController.likeOneComment);
router.get("/", CommentController.getAll);
router.put("/id/:_id", authentication, upload.single("image"), CommentController.update);
router.delete("/id/:_id", authentication, CommentController.delete);

module.exports = router;
