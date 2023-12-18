import React from "react";
import { WorkoutDetailsProps } from "../types";

const WorkoutDetails: React.FC<WorkoutDetailsProps> = ({ workout }) => {
  const createdAt = workout.createdAt.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p>
        <strong>Load (kg): </strong>
        {workout.load}
      </p>
      <p>
        <strong>Reps: </strong>
        {workout.reps}
      </p>
      <p>{createdAt}</p>
    </div>
  );
};

export default WorkoutDetails;
