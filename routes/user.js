const express = require("express");
const { authentication } = require("../middlewares/authentication");
const UserController = require("../controllers/userController");

const router = express.Router();

router.post("/", UserController.create);
router.post("/login", UserController.login);
router.delete("/logout", authentication, UserController.logout);
router.get("/id/:_id", UserController.getById);
router.get("/name/:name", UserController.getUserByName);
router.get("/profile", authentication, UserController.getUsuarioConectado);
router.get("/confirm/:email", UserController.confirm);

module.exports = router;
