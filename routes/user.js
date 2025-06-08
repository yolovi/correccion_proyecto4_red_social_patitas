const express = require("express")
const UserController = require("../controllers/UserController")
const {authentication} = require("../middlewares/authentication")
const router = express.Router()


router.post("/",UserController.create) //Descomentar para usuario sin bcrypt
router.post("/login", UserController.login)
router.delete("/logout", authentication, UserController.logout)

module.exports = router

