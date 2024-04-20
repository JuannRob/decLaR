import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";

const ProtectedEditorRoute = () => {
  const { user } = useAuth();
  if (user?.role === "admin" || user?.role === "editor") return <Outlet />;
  return <Navigate to="/" />;
};

export default ProtectedEditorRoute;
