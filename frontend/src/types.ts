export interface DBWorkoutType {
  _id: string;
  title: string;
  reps: number;
  load: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export type WorkoutType = {
  id: string;
  title: string;
  reps: number;
  load: number;
  createdAt: Date;
  updatedAt: Date;
};

export type WorkoutDetailsProps = {
  workout: WorkoutType;
}