const { body } = require("express-validator");
const pool = require("../db/pool");
require("dotenv").config();

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

  body("adminPass")
    .optional()
    .custom(async (value, { req }) => {
      try {
        const result = await pool.query(
          "SELECT password FROM admin WHERE password = $1",
          [value]
        );
        if (result.rows.length < 1) {
          throw new Error("Wrong admin password.");
        }
        return true;
      } catch (err) {
        throw new Error("Wrong admin password.");
      }
    }),
];

const goldMemberValidator = [
  body("goldMemberAnswer")
    .trim()
    .custom((value) => {
      if (value != process.env.GOLD_MEMBER_RIDDLE_ANSWER) {
        throw new Error("wrong answer.");
      }
      return true;
    }),
];

module.exports = {
  signUpValidator,
  goldMemberValidator,
};
