const express = require("express");

const indexRouter = express.Router();

const { getAllMessagesQuery } = require("../db/queries");

const { goldMemberValidator } = require("../utilities/validators");
const { goldMemberController } = require("../controllers/indexControllers");

indexRouter.get("/", async (req, res, next) => {
  const messages = await getAllMessagesQuery();
  console.log(messages);

  res.render("pages/index", { user: req.user, messages });
});

indexRouter.get("/about", (req, res, next) => {
  res.render("pages/about", { user: req.user });
});

indexRouter.post("/gold", goldMemberValidator, goldMemberController);

module.exports = {
  indexRouter,
};
