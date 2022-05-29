const express = require("express");

//controllers
const { createNewItem, getAllItemsByStoreID, deleteItemById } = require("../controllers/Item");

//Middleware
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");

const itemRouter = express.Router();

itemRouter.post("/", authentication, authorization("ADD_ITEM"), createNewItem);
itemRouter.get("/:id", authentication, getAllItemsByStoreID);
itemRouter.put(
  "/:id",
  authentication,
  authorization("REMOVE_ITEM"),
  deleteItemById
);


module.exports = itemRouter;
