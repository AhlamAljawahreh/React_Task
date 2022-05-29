const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const db = require("./database/db");

app.use(cors());

app.use(express.json());

const PORT = 5000;


const loginRouter = require("./routes/Login");
const usersRouter = require("./routes/User");
const storeRouter = require("./routes/Store");



app.use("/login", loginRouter);
app.use("/users", usersRouter);
app.use("/store", storeRouter);



app.listen(PORT, () => {
  console.log(`SERVER WORKING ON PORT: ${PORT}`);
});
