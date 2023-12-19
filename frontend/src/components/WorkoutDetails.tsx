import React from "react";
import { useSubmit } from "react-router-dom";
import moment from "moment";

import { WorkoutDetailsProps } from "../types";
import IconDeleteBin5Line from "./IconDeleteBin5Line";

const WorkoutDetails: React.FC<WorkoutDetailsProps> = ({ workout }) => {
  const createdAt = moment(workout.createdAt).fromNow();

  const submit = useSubmit();

  const handleDelete = () => {
    const formData = new FormData();
    formData.append("id", workout.id);
    submit(formData, { method: "DELETE" });
  };

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
      <span title="Delete">
        <IconDeleteBin5Line onClick={handleDelete} />
      </span>
    </div>
  );
};

export default WorkoutDetails;
