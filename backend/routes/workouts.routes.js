const express = require("express");

const WorkoutsController = require("../controllers/workouts.controller");

const router = express.Router();

router.route("/")
  .get(WorkoutsController.apiGetWorkouts)
  .post(WorkoutsController.apiPostWorkout);

router.route("/:id")
  .get(WorkoutsController.apiGetWorkoutById)
  .delete(WorkoutsController.apiDeleteWorkout)
  .patch(WorkoutsController.apiUpdateWorkout);

module.exports = router;
