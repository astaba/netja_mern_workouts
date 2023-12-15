require("dotenv").config();
const express = require("express");

const port = process.env.PORT;
const host = "127.0.0.1";

const app = express();

// middleware
app.use((req, res, next) => {
  console.log({ path: req.path, method: req.method });
  next();
});

app.get("/", (req, res) => {
  res.json({ msg: "Welcome to the app" });
});

app.listen(port, host, () => {
  console.log(`Server runing at http://${host}:${port}`);
});
