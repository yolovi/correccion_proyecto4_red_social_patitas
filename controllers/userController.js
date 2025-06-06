//Importar el módulo bcrypt
const User = require("../models/user");
// const bcrypt = require("bcryptjs")

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




// const UserController = {
//     async create(requ, res) {
//         try {
//             const password = bcrypt.hashSync(req.body.password, 12)
//             const user = await User.create({ ...req.body, password: password, role: "user" })
//             res.status(201).send({
//                 msg: "Usuario creado con éxito",
//                 user
//             })
//         } catch (error) {
//             res.status(500).send({
//                 msg: "Usuario no se ha podido crear", error
//             })
//         }
//     },
//     login (req,res){
//         User.findOne ({
//             where: {
//                 email:req.body.email
//             }
//         }).then(user => {
//             if(!user){
//                 return res.status(400).send({message: "Usuario o contraseña incorrectos"})
//             }
//             const isMatch = bcrypt.compareSync(req.body.password, user.password);
//             if(!isMatch){
//                 return res.status(400).send({message: "Usuario o contraseña incorrectos"})
//                 }
//                 res.send(user)
//             })
//         }
// }





module.exports = UserController
