const express = require("express");
const app = express();
require("dotenv").config()
const PORT = process.env.PORT;
const dbConnection = require("./config/config");

//MIDDLEWARE
app.use(express.json());

dbConnection();

//RUTAS
app.use("/post", require("./routes/post"));
app.use("/comment", require("./routes/comment"));
app.use("/user", require("./routes/user"));

//SERVIDOR
app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});
