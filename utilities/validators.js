const { body } = require("express-validator");

const signUpValidator = [
  body("username").notEmpty().withMessage("Please enter username.").trim(),

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
