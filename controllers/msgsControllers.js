const { createPostQuery } = require("../db/queries");

const createPostController = async (req, res, next) => {
  try {
    await createPostQuery(req.body.title, req.body.content, req.user.id);
    res.redirect("/");
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createPostController,
};
