const express = require("express");

//controllers
const { createNewItem } = require("../controllers/Item");

//Middleware
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");

const itemRouter = express.Router();

itemRouter.post("/", authentication, authorization("ADD_ITEM"), createNewItem);
module.exports = itemRouter;
