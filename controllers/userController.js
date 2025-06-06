
//const { JWT_SIGNATURE } = require("../config/keys");
const User = require("../models/User");
//Comentar para ver usuario sin bcrypt:
//const bcrypt = require("bcryptjs")
//const jwt = require ("jsonwebtoken")

//Descomentar para ver usuario sin bcrypt:
const UserController = {
  async create(req, res) {
    try {
      const user = await User.create(req.body);
      res.status(201).send({ msg: 'User created', user });
    } catch (error) {
      console.error("Error al crear el usuario:", error); 
      res.status(500).send({
        msg: "Usuario no se ha podido crear",
        error: error.message || JSON.stringify(error)
      });
    }
  }
} 

//USUARIO CON BCRYPT 
// const UserController = {
//     async create(requ, res) {
//         try {
//             const password = await bcrypt.hash(req.body.password, 10)
//             const user = await User.create({ ...req.body, password: password, role:"user"})
//             res.status(201).send({
//                 msg: "Usuario creado con éxito",
//                 user
//             })
//         } catch (error) {
//             res.status(500).send({
//                 msg: "Usuario no se ha podido crear", error
//             })
//         }
//     }
//   }
  
    // async xxxx (req,res){
    //      try {
    //         const user: await User.findOne({
    //           email: req.body.email
    //         })
    //           const isMatch = bcrypt.compareSync(req.body.password, user.password)
    //           if(!isMatch) {
    //             return.res.status(400).send("Corre o contraseña incorrectos")
    //           }
    //           const token = jwt.sign({_id:user._id}, JWT_SIGNATURE);
    //           if (user.token.length > 4 )user.tokens.shift(); //si hay 4 tokens guardados, nos quita el primero en la array
    //           user.tokens.push(token) //guardar token
    //           await user.save();
    //           res.send({message:"Bienvenid@" + user.name, token});
    //       } catch (error) {
    //         console.error(error)
    //         res.status(500)send({
    //             msg: "Usuario no se ha podido crear", error
    //         })

    //       }
    //     }

module.exports = UserController
