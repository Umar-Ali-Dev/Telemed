import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ROLE_DASHBOARDS } from '../constants/roles';
import type { Role } from '../constants/roles';

interface ProtectedRouteProps {
  role: Role; // which role is allowed on this route
}

const ProtectedRoute = ({ role }: ProtectedRouteProps) => {
  const { user, isLoading } = useAuth();

  // Still restoring session — render nothing to avoid flash of wrong page
  if (isLoading) return null;

  // Not logged in — back to login
  if (!user) return <Navigate to="/" replace />;

  // Logged in but wrong role — redirect to their own dashboard
  if (user.role !== role) return <Navigate to={ROLE_DASHBOARDS[user.role as Role]} replace />;

  return <Outlet />;
};

export default ProtectedRoute;