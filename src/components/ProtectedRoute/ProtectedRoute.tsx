import { Navigate, useLocation } from 'react-router-dom';
import type { ReactNode } from 'react';
import { useAuth } from '../../context/AuthContext';

interface ProtectedRouteProps {
  children: ReactNode;
}

// ProtectedRoute wrapper en route og tjekker om brugeren er logget ind.
// Hvis ikke, redirectes til /login — og vi gemmer den oprindelige URL
// så vi kan sende brugeren tilbage efter login.
// Termen: "route guard" / "protected route" / "auth guard"
function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated } = useAuth();

  // useLocation giver os den nuværende URL inkl. path, search og state.
  // Termen: "location object"
  const location = useLocation();

  if (!isAuthenticated) {
    // Navigate erstatter den nuværende route — brugeren kan ikke trykke "tilbage" til den.
    // state={{ from: location }} gemmer hvor brugeren kom fra så vi kan redirecte tilbage.
    // Termen: "redirect" / "replace navigation"
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}

export default ProtectedRoute;
