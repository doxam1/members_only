const { validationResult } = require("express-validator");
const { changeStatusToGold } = require("../db/queries");

const goldMemberController = async (req, res, next) => {
  console.log(req.body);
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    await changeStatusToGold(req.user.id);

    res.status(200).json({ message: "Answer correct!" });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  goldMemberController,
};
