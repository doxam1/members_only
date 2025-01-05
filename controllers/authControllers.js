const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const pool = require("../db/pool");

//queries import
const { signUpNewUser } = require("../db/queries");

const signupPostControl = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      console.log(errors);
      return res.render("pages/signup", { errors: errors.array() });
    }
    const { f_name, l_name, adminPass } = req.body;

    let admin;
    adminPass ? (admin = true) : (admin = false);
    console.log("admin: ", admin);
    bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
      if (err) {
        next(err);
      } else {
        await signUpNewUser(
          req.body.username,
          hashedPassword,
          req.body.f_name,
          req.body.l_name,
          admin
        );
        const userResult = await pool.query(
          "SELECT id, username FROM users WHERE username = $1",
          [req.body.username]
        );
        const user = userResult.rows[0];
        console.log(user);
        req.login(user, function (err) {
          if (err) {
            return next(err);
          }
          res.redirect("/");
        });
      }
    });
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  signupPostControl,
};
