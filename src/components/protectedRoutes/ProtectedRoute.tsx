import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";

interface ProtectedRouteProps {
  roles?: string[];
}

const ProtectedRoute = ({ roles = [] }: ProtectedRouteProps) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />;

  return !roles.length || roles.includes(user!.role) ? (
    <Outlet />
  ) : (
    <Navigate to="/" replace />
  );
};

export default ProtectedRoute;
