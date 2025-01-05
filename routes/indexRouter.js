const express = require("express");

const indexRouter = express.Router();

indexRouter.get("/", (req, res, next) => {
  res.render("pages/index", { user: req.user });
});

indexRouter.get("/about", (req, res, next) => {
  res.render("pages/about");
});

module.exports = {
  indexRouter,
};
