import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";

const ProtectedAdminRoute = () => {
  const { user } = useAuth();
  if (user?.role !== "admin") return <Navigate to="/" />;
  return <Outlet />;
};

export default ProtectedAdminRoute;
