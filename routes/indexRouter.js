const express = require("express");
const morgan = require("morgan");

const indexRouter = express.Router();

indexRouter.get("/", morgan("dev"), (req, res, next) => {
  res.render("pages/index");
});

module.exports = {
  indexRouter,
};
