import { Outlet } from "react-router-dom";

export const EmptyLayout = () => {
  return (
    <>
      <div>Empty Layout</div>
      <Outlet />
      <div>Empty Layout</div>
    </>
  );
};
