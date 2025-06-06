const express = require("express")
const UserController = require("../controllers/UserController")
const router = express.Router()


 router.post("/",UserController.create) //Descomentar para usuario sin bcrypt

//Comentar para usuario sin bycript y sin login:
//router.post("/login", UserController.login)


module.exports = router

