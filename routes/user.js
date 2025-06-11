const express = require("express");
const { authentication } = require("../middlewares/authentication");
const upload = require("../middlewares/uploads"); // Importa Multer
const UserController = require("../controllers/userController");

const router = express.Router();

// Crear usuario con imagen de perfil
router.post("/", upload.single("image"), UserController.create);

// Actualizar usuario con imagen de perfil (requiere autenticación)
router.put('/id/:_id', upload.single("image"),UserController.update)

// Otras rutas
router.post("/login", UserController.login);
router.delete("/logout", authentication, UserController.logout);
router.get("/id/:_id", UserController.getById);
router.get("/name/:name", UserController.getUserByName);
router.get("/profile", authentication, UserController.getUsuarioConectado);
router.get("/confirm/:email", UserController.confirm);

module.exports = router;
