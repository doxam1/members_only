const express = require("express");
const path = require("path");
require("dotenv").config();

const app = express();

//PORT config
const PORT = process.env.PORT || 3000;

// ejs
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//public dir
app.use(express.static(path.join(__dirname, "public")));

//routes import
const { indexRouter } = require("./routes/indexRouter");
app.use("/", indexRouter);

//authentication routes:
const { authRouter } = require("./routes/auth");
app.use("/", authRouter);

app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});
