import { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { useAuth } from 'src/hooks';

export const AppRedirect = () => {
  const navigate = useNavigate();
  const { accessToken } = useAuth();

  useEffect(() => {
    if (accessToken) {
      navigate('/calls');
    } else {
      navigate('/login');
    }
  }, [navigate, accessToken]);

  return <Outlet />;
};
