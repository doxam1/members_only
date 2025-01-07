const express = require("express");

const msgRouter = express.Router();

//add validation.

const {
  createPostController,
  deletePostController,
} = require("../controllers/msgsControllers");

msgRouter.post("/createPost", createPostController);

msgRouter.post("/deletePost", deletePostController);

module.exports = {
  msgRouter,
};
