const express = require("express");

//controllers
const { createNewStore } = require("../controllers/Store");



//Middleware
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");



const storeRouter = express.Router();



storeRouter.post(
  "/",
  authentication,
  authorization("CREATE_STORE"),
  createNewStore
);
module.exports = storeRouter;
