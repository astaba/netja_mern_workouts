require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const workoutsRouter = require("./routes/workouts.routes")

const port = process.env.PORT;
const host = "127.0.0.1";

const app = express();

// middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log({ path: req.path, method: req.method });
  next();
});

app.use("/api/workouts", workoutsRouter);

app.use("*", (req, res) => {
	res.status(404).json({ error: "Page not found"});
})

mongoose
	.connect(process.env.MONGODB_FITNESS_URI)
	.then(() => {
		app.listen(port, host, () => {
			console.log(`Server connected to db and running at http://${host}:${port}`);
		});
	})
	.catch((error) => {
		console.error(error);
	})

