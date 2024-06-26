import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RootLayout from "./layout/RootLayout";
import Home, { loader as homeLoader } from "./pages/Home";
import { action as workoutFormAction } from "./components/WorkoutForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
        loader: homeLoader,
        action: workoutFormAction,
      }
    ]
  }
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
