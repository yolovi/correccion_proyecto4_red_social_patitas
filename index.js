const express = require("express");
const app = express();
const PORT = 8080;
const { dbConnection } = require("./config/config");

dbConnection();

//MIDDLEWARE
app.use(express.json());

//RUTAS

//SERVIDOR
app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});
