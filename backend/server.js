require("dotenv").config();
const express = require("express");

const workoutsRouter = require("./routes/workouts.routes")

const port = process.env.PORT;
const host = "127.0.0.1";

const app = express();

// middleware
app.use((req, res, next) => {
  console.log({ path: req.path, method: req.method });
  next();
});

app.use("/api/workouts", workoutsRouter);

app.use("*", (req, res) => {
	res.status(404).json({ error: "Page not found"});
})

app.listen(port, host, () => {
  console.log(`Server runing at http://${host}:${port}`);
});
