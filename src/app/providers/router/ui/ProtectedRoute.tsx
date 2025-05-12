import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { signinPagePath, mainPagePath } from '@/shared/const/router';

export const ProtectedRoute: React.FC = () => {
  const location = useLocation();
  const authToken = localStorage.getItem('token');

  if (authToken && location.pathname === signinPagePath) return <Navigate to={mainPagePath} />;
  if (!authToken && location.pathname !== signinPagePath) return <Navigate to={signinPagePath} />;

  return <Outlet />;
};
