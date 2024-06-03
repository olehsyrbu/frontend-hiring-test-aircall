import { useNavigate, useLocation } from 'react-router-dom';

export const useNavigateWithParams = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const mergeUrlParams = (search: string, newParams: object) => {
    const params = new URLSearchParams(search);

    for (const [key, value] of Object.entries(newParams)) {
      params.set(key, value);
    }
    return params.toString();
  };

  const navigateWithParams = (path: string, params: object) => {
    navigate(`${path}?${mergeUrlParams(location.search, params)}`);
  };

  return navigateWithParams;
};
