const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

//queries import
const { signUpNewUser } = require("../db/queries");

const signupPostControl = (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      console.log(errors);
      return res.render("pages/signup", { errors: errors.array() });
    }
    bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
      if (err) {
        next(err);
      } else {
        await signUpNewUser(req.body.username, hashedPassword);
      }
    });
    res.redirect("/");
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  signupPostControl,
};
