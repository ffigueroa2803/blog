import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const OnlyAdminPrivateRouter = () => {
  const { currentUser } = useSelector((state) => state.auth);

  return currentUser && currentUser?.user?.role === "ADMIN" ? (
    <Outlet />
  ) : (
    <Navigate to="/sign-in" />
  );
};

export default OnlyAdminPrivateRouter;
