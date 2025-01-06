const pool = require("./pool");

async function signUpNewUser(
  username,
  password,
  f_name,
  l_name,
  admin = false
) {
  try {
    await pool.query(
      "INSERT INTO users (username, password, f_name, l_name, admin) VALUES ($1, $2, $3, $4, $5)",
      [username, password, f_name, l_name, admin]
    );
  } catch (err) {
    console.log(err);
  }
}

async function createPostQuery(title, content, user_id) {
  try {
    await pool.query(
      "INSERT INTO messages (title, content, user_id) VALUES ($1, $2, $3)",
      [title, content, user_id]
    );
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  signUpNewUser,
  createPostQuery,
};
