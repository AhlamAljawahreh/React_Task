const express = require("express");

//controllers
const { createNewStore, getAllStores, getStoreById } = require("../controllers/Store");



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
storeRouter.get(
  "/",
  authentication,
  getAllStores
);
storeRouter.get("/:id", authentication, getStoreById);
module.exports = storeRouter;
