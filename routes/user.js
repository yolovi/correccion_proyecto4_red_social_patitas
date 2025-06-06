const express = require("express")
const UserController = require("../controllers/UserController")
const router = express.Router()

//Descomentar para usuario sin bcrypt:
 router.post("/",UserController.create)

//Comentar para usuario sin bycript y sin login:
//router.post("/login", UserController.login)


module.exports = router

