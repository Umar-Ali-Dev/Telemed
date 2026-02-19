import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const token = true;
  if (token) {
    return <Navigate to="/provider/dashboard" replace />;
  }
  return <Outlet />;
};

export default PublicRoute;
