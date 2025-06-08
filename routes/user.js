const express = require("express")
const UserController = require("../controllers/UserController")
const {authentication} = require("../middlewares/authentication") 
const router = express.Router()


router.post("/",UserController.create) 
router.post("/login", UserController.login)
router.delete("/logout", authentication, UserController.logout)
router.get("/id/:_id", UserController.getById)

module.exports = router

