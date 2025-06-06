const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
    name: String,
    password: String,
    email:String,
}, {timestamps: true});

const User = mongoose.model("User", UserSchema);

module.exports = User;