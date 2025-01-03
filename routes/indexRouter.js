const express = require("express");

const indexRouter = express.Router();

indexRouter.get("/", (req, res, next) => {
  res.render("pages/index");
});

module.exports = {
  indexRouter,
};
