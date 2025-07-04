require("dotenv").config()
const mongoose = require("mongoose");


const PORT = process.env.PORT || 3001;
//const { MONGO_URI } = require("./keys");
const MONGO_URI = process.env.MONGO_URI;

const dbConnection = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Base de datos conectada con éxito");
  } catch (error) {
    console.error(error);
   // throw new Error("Error a la hora de iniciar la base de datos");
  }
};

module.exports = dbConnection;
