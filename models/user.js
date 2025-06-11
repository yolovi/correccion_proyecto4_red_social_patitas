const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Por favor introduce tu nombre"],
    },
    password: {
      type: String,
      required: [true, "Por favor introduce tu contraseña"],
    },
    email: {
      type: String,
      required: [true, "Por favor introduce un correo electrónico válido"],
      unique: true,
    },
    role: {
      type: String,
      default: "user",
    },
    confirmed: {
      type: Boolean,
      default: false,
    },
     image: [{
      type: String
    }],
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
       
      },
    ],
  },
  { timestamps: true }
);
UserSchema.index({
  name: "text",
});
const User = mongoose.model("User", UserSchema);
module.exports = User;
