const express = require("express");
const app = express();
const PORT = 8080;
const { dbConnection } = require("./config/config");

dbConnection();

//MIDDLEWARE
app.use(express.json());

//RUTAS
app.use("/post", require("./routes/post"));
app.use("/comment", require("./routes/comment"));

//SERVIDOR
app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});
