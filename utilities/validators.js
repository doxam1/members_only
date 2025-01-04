const { body } = require("express-validator");
const pool = require("../db/pool");

const signUpValidator = [
  body("username")
    .notEmpty()
    .withMessage("Please enter username.")
    .trim()
    .custom(async (value) => {
      const result = await pool.query(
        "SELECT username FROM users WHERE username = $1",
        [value]
      );
      if (result.rows.length > 0) {
        throw new Error("username already exists.");
      }
      return true;
    }),

  body("password")
    .notEmpty()
    .withMessage("please enter a password.")
    .trim()
    .isLength({ min: 5 })
    .withMessage("password must be atleast 5 characters length."),

  body("confirmPassword")
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage("password fields does not match."),
];

module.exports = {
  signUpValidator,
};
