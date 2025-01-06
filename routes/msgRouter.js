const express = require("express");

const msgRouter = express.Router();

//add validation.

const { createPostController } = require("../controllers/msgsControllers");

msgRouter.post("/createPost", createPostController);

module.exports = {
  msgRouter,
};
