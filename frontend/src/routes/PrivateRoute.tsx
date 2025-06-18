import type { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  children: ReactElement;
}

function PrivateRoute({ children }: PrivateRouteProps) {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
}

export default PrivateRoute;
