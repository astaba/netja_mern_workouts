import React from "react";
import { Form, ActionFunctionArgs, useActionData } from "react-router-dom";
import { DBWorkoutType } from "../types";

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const payload = {
    title: formData.get("title"),
    reps: formData.get("reps"),
    load: formData.get("load"),
  };
  // console.log(payload);
  const requestedURL = new URL("http://localhost:4000/api/workouts");
  const headers = new Headers({ "Content-Type": "application/json" });
  const options = {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
  };
  const outGoingRequest = new Request(requestedURL, options);
  const response = await fetch(outGoingRequest);
  if (!response.ok) {
    const error = await response.json();
    console.error(error);
    return error;
  }
  const data = await response.json();
  // console.log(data);
  return data;
};

const WorkoutForm = () => {
  const [formInputs, setFormInputs] = React.useState({
    title: "",
    load: "",
    reps: "",
  });
  const [error, setError] = React.useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormInputs({
      ...formInputs,
      [name]: value,
    });
  };

  const actionData = useActionData() as { error: string } | DBWorkoutType;
  React.useEffect(() => {
    if (actionData && "error" in actionData) {
      setError(actionData.error);
    } else {
      setFormInputs({ title: "", load: "", reps: "" });
      setError("");
    }
  }, [actionData]);

  return (
    <Form method="post">
      <h3>Add a new workout</h3>
      <label htmlFor="title">Exersize Title:</label>
      <input
        type="text"
        id="title"
        name="title"
        value={formInputs.title}
        onChange={handleInputChange}
      />
      <label htmlFor="load">Load (in Kg):</label>
      <input
        type="number"
        id="load"
        name="load"
        value={formInputs.load}
        onChange={handleInputChange}
      />
      <label htmlFor="reps">Number of reps:</label>
      <input
        type="number"
        id="reps"
        name="reps"
        value={formInputs.reps}
        onChange={handleInputChange}
      />
      <button type="submit">Add Workout</button>
      {error && <div className="error">{error}</div>}
    </Form>
  );
};

export default WorkoutForm;
