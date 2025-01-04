const express = require("express");
const bcrypt = require("bcryptjs");

const authRouter = express.Router();

const passport = require("passport");
const LocalStrategy = require("passport-local");

const pool = require("../db/pool");

//validators
const { signUpValidator } = require("../utilities/validators");

//controllers
const { signupPostControl } = require("../controllers/authControllers");

//passport js config
passport.use(
  new LocalStrategy(async (username, password, done) => {
    console.log("local strategy trigerred");
    try {
      const { rows } = await pool.query(
        "SELECT * FROM users WHERE username = $1",
        [username]
      );
      const user = rows[0];

      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return done(null, false, { message: "Incorrect password" });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [
      id,
    ]);
    const user = rows[0];

    done(null, user);
  } catch (err) {
    done(err);
  }
});

//routes

authRouter.get("/signup", (req, res, next) => {
  res.render("pages/signup", { title: "Sign up", user: req.user });
});

authRouter.post("/signup", [signUpValidator], signupPostControl);

authRouter.get("/login", (req, res, next) => {
  console.log(req.flash());
  res.render("pages/login", { title: "Log in", user: req.user });
});

authRouter.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

authRouter.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

module.exports = {
  authRouter,
  passport,
};
