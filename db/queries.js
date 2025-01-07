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

async function getAllMessagesQuery() {
  try {
    const results = await pool.query(
      "SELECT *,f_name,l_name  FROM messages JOIN users ON messages.user_id = users.id ORDER BY timestamp DESC"
    );
    return results.rows;
  } catch (err) {
    console.log(err);
  }
}

async function changeStatusToGold(user_id) {
  try {
    await pool.query("UPDATE users SET status = $1 WHERE id = $2", [
      "gold",
      user_id,
    ]);
  } catch (err) {
    console.error("Error in changing member status: ", err);
  }
}

// async function getUserByUserIdQuery(user_id) {
//   try {
//     const results = await pool.query(
//       "SELECT f_name, l_name FROM users WHERE id = $1",
//       [user_id]
//     );
//     return results.rows;
//   } catch (err) {
//     console.log(err);
//   }
// }

module.exports = {
  signUpNewUser,
  createPostQuery,
  getAllMessagesQuery,
  changeStatusToGold,

  /* getUserByUserIdQuery */
};
