const express = require("express")
const UserController = require("../controllers/UserController")
const router = express.Router()


router.post("/",UserController.create) //Descomentar para usuario sin bcrypt
router.post("/login", UserController.login)
router.delete("/logout", UserController.logout)

module.exports = router

