import { Suspense } from "react";
import {
  Await,
  defer,
  json,
  useLoaderData,
  LoaderFunctionArgs,
} from "react-router-dom";

import { DBWorkoutType, WorkoutType } from "../types";
import WorkoutDetails from "../components/WorkoutDetails";

const loaderWorker = async (request: Request) => {
  const url = "http://localhost:4000/api/workouts/";
  const requestInit = {
    method: request.method,
  };
  const outGoingRequest = new Request(url, requestInit);
  const response = await fetch(outGoingRequest);
  if (!response.ok) {
    throw json(
      { message: "Could not retrieve workouts" },
      { status: response.status, statusText: response.statusText }
    );
  }
  const data: DBWorkoutType[] = await response.json();

  const workouts = data.map((workout) => ({
    id: workout._id,
    title: workout.title,
    reps: workout.reps,
    load: workout.load,
    createdAt: new Date(workout.createdAt),
    updatedAt: new Date(workout.updatedAt),
  }));
  console.log(workouts);
  return workouts;
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  return defer({ workouts: loaderWorker(request) });
};

const Home = () => {
  const deferedData = useLoaderData() as { workouts: Promise<WorkoutType[]> };

  return (
    <div className="home">
      <div className="workouts">
        <Suspense fallback={<h3>Loading...</h3>}>
          <Await resolve={deferedData.workouts}>
            {(workouts: WorkoutType[]) =>
              workouts.map((workout) => (
                <WorkoutDetails key={workout.id} workout={workout} />
              ))
            }
          </Await>
        </Suspense>
      </div>
    </div>
  );
};

export default Home;
