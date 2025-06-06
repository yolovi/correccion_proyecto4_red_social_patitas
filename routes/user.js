const express = require("express")
const UserController = require("../controllers/userController")
const router = express.Router()
//añadir login después de / cuando esté listo para implementar. También después de UserController
router.post("/",UserController.create)

module.exports = router

