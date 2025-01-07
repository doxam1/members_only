const { createPostQuery, deletePostQuery } = require("../db/queries");

const createPostController = async (req, res, next) => {
  try {
    await createPostQuery(req.body.title, req.body.content, req.user.id);
    res.redirect("/");
  } catch (err) {
    next(err);
  }
};
const deletePostController = async (req, res, next) => {
  // console.log(req.body);
  try {
    await deletePostQuery(req.body.msg_id);
    res.redirect("/");
  } catch (err) {
    next(err);
  }
};
module.exports = {
  createPostController,
  deletePostController,
};
