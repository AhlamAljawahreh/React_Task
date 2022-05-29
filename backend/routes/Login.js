const express = require("express");

//controllers
const { login } = require("../controllers/login");

const loginRouter = express.Router();

loginRouter.post("/", login);

module.exports = loginRouter;
