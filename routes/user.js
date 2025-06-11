const express = require("express");
const { authentication } = require("../middlewares/authentication");
const upload = require("../middlewares/uploads");
const UserController = require("../controllers/userController");

const router = express.Router();

router.post("/", upload.single("image"), UserController.create);
router.post("/login", UserController.login);
router.put('/id/:_id', authentication, upload.single("image"),UserController.update)
router.get("/id/:_id", UserController.getById);
router.get("/name/:name", UserController.getUserByName);
router.get("/profile", authentication, UserController.getUsuarioConectado);
router.get("/confirm/:email", UserController.confirm);
router.delete("/logout", authentication, UserController.logout);

module.exports = router;
