
// const User = require('../models/User.js');
// const jwt = require('jsonwebtoken');
// const { JWT_SIGNATURE } = require('../config/keys.js');

//LOGOUT DIAPOSITIVAS
// const authentication = async (req, res, next) => {
//     try {
//         const token = req.headers.authorization;
//         const payload = jwt.verify(token, JWT_SIGNATURE);
//         const user = await User.findOne({ _id: payload._id, tokens: token });
//         if (!user) {
//             return res.status(401).send({ message: 'No estas autorizado' });
//         }
//         req.user = user;
//         next();
//     } catch (error) {
//         console.error(error)
//         return res.status(500).send({ error, message: 'Ha habido un problema con el token' })
//     }
// }

// module.exports = authentication

const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { JWT_SIGNATURE } = require('../config/keys');

const authentication = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).send({ message: 'Token no proporcionado o formato incorrecto' }); //evita errores como jwt malformed si el token viene vacío, sin "Bearer" o mal escrito
    }

    const token = authHeader.replace('Bearer ', '');

    const payload = jwt.verify(token, JWT_SIGNATURE); // <-- AQUÍ FALLA si el token está mal
    const user = await User.findOne({ _id: payload._id, 'tokens.token': token });

    if (!user) {
      return res.status(401).send({ message: 'Token no válido o usuario no encontrado' });
    }

    req.user = user;
    req.token = token;
    next();

  } catch (error) {
    console.error('Error en autenticación:', error.message);
    return res.status(401).send({ error: error.message || error, message: 'Token inválido' });
  }
};

module.exports = { authentication };