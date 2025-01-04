const { validationResult } = require("express-validator");

const signupPostControl = (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      console.log(errors);
      return res.render("pages/signup", { errors: errors.array() });
    }

    //await for query to db...
  } catch (err) {
    next(err);
  }
};

module.exports = {
  signupPostControl,
};
