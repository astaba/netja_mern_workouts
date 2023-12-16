const express = require("express");

const Workout = require("../models/workout.model");

const router = express.Router();

router
  .route("/")
  .get((req, res) => {
    res.json({ msg: "response to '/' GET" });
  })
  .post(async (req, res) => {
    const { title, reps, load } = req.body;

    try {
      const workout = await Workout.create({ title, reps, load });
      res.status(200).json(workout);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  });

router
  .route("/:id")
  .get((req, res) => {
    res.json({ msg: "response to '/:id' GET" });
  })
  .delete((req, res) => {
    res.json({ msg: "response to '/:id' DELETE" });
  })
  .patch((req, res) => {
    res.json({ msg: "response to '/:id' PATCH" });
  });

module.exports = router;
