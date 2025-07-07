import { Navigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';

const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { isAuthenticated, user, isLoading } = useAuthStore();

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Redirect to home if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Check admin requirement
  if (requireAdmin && !user?.is_admin) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute; 