const pool = require("./pool");

async function signUpNewUser(username, password) {
  try {
    await pool.query("INSERT INTO users (username, password) VALUES ($1, $2)", [
      username,
      password,
    ]);
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  signUpNewUser,
};
