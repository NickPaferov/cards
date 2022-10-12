import { Outlet } from "react-router-dom";
import { NavMenu } from "../components/NavMenu";

export const BaseLayout = () => {
  return (
    <>
      <div>Base Layout</div>
      <NavMenu />
      <Outlet />
      <div>Base Layout</div>
    </>
  );
};
