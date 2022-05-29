const express = require("express");

//controllers
const {
  createNewUser,
} = require("../controllers/User");


const usersRouter = express.Router();

usersRouter.post("/", createNewUser);


module.exports = usersRouter;
