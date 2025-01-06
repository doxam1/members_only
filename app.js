const express = require("express");
const path = require("path");
require("dotenv").config();
const morgan = require("morgan");

const flash = require("connect-flash");

const { passport } = require("./routes/auth");
const session = require("express-session");

const app = express();

//logger
app.use(morgan("dev"));

const pool = require("./db/pool");

//PORT config
const PORT = process.env.PORT || 3000;

// ejs
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//public dir
app.use(express.static(path.join(__dirname, "public")));

//req.body parser
app.use(express.urlencoded({ extended: false }));

//passport js:
//session
app.use(
  session({
    store: new (require("connect-pg-simple")(session))({
      pool,
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }, // 30 days
    // Insert express-session options here
  })
);

//for errors?
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

//authentication routes:
const { authRouter } = require("./routes/auth");
app.use("/", authRouter);

//routes import
const { indexRouter } = require("./routes/indexRouter");
app.use("/", indexRouter);

//msgs router
const { msgRouter } = require("./routes/msgRouter");
app.use("/", msgRouter);

// error handler.
app.use((req, res, next) => {
  throw new Error("somthing broke!");
});
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).render("pages/error");
});

// port listening.
app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});
