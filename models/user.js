const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
    name: String,
    password: String,
    email:String,
    role:String,
    tokens: [],
}, {timestamps: true});

UserSchema.index ({
    name:"text",
});

const User = mongoose.model("User", UserSchema);

module.exports = User;