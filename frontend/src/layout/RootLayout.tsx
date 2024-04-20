import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const RootLayout = () => {
  return (
    <>
      <Navbar />
      <div className="pages">
        <Outlet />
      </div>
    </>
  );
};

export default RootLayout;
