import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from 'src/hooks/useAuth';
import { useEffect } from 'react';
import { UserStatus } from 'src/declarations/user';
import { ProtectedLayout } from 'src/components';

export const ProtectedRoute = () => {
  const { user, status } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (status !== UserStatus.authenticated) return;
    if (!user && window.location.pathname !== '/login') navigate('/login');
  }, [user, status, navigate]);

  return (
    <ProtectedLayout>
      <Outlet />
    </ProtectedLayout>
  );
};
