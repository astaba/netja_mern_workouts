const { isValidObjectId } = require("mongoose");

const Workout = require("../models/workout.model");

class WorkoutsController {
  static async apiGetWorkouts(req, res) {
    try {
      const workouts = await Workout.find();
      res.status(200).json(workouts);
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: error.message });
    }
  }

  static async apiPostWorkout(req, res) {
    const { title, reps, load } = req.body;

    try {
      const workout = await Workout.create({ title, reps, load });
      res.status(200).json(workout);
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: error.message });
    }
  }

  static async apiGetWorkoutById(req, res) {
    const id = req.params.id;
    if (!isValidObjectId(id)) {
      return res.status(404).json({ error: "Invalid id" });
    }
    try {
      const workout = await Workout.findById(id);
      if (workout?.id !== id) {
        return res.status(400).json({ error: "No such workout" });
      }
      res.status(200).json(workout);
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: error.message });
    }
  }

  static async apiDeleteWorkout(req, res) {
    const id = req.params.id;
    if (!isValidObjectId(id)) {
      return res.status(404).json({ error: "Invalid id" });
    }
    try {
      const workout = await Workout.findByIdAndDelete(id);
      if (workout?.id !== id) {
        return res.status(400).json({ error: "No such workout" });
      }
      res.status(200).json({ message: "Successfully deleted workout." });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async apiUpdateWorkout(req, res) {
    const id = req.params.id;
    if (!isValidObjectId(id)) {
      return res.status(404).json({ error: "Invalid id" });
    }
    try {
      const workout = await Workout.findOneAndUpdate(
        { _id: id },
        { ...req.body }
      );
      if (workout?.id !== id) {
        return res.status(400).json({ error: "No such workout" });
      }
      res.status(200).json(workout);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = WorkoutsController;
