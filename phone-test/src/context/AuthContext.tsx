import { createContext, useCallback, useMemo, useState } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { FetchResult, useMutation, useQuery } from '@apollo/client';
import { useLocalStorage } from 'src/hooks/useLocalStorage';
import { AuthContextProps, AuthResponseType } from 'src/declarations/auth';
import { UserStatus, UserType } from 'src/declarations/user';
import { ME_QUERY } from 'src/gql/queries';
import { LOGIN_MUTATION } from 'src/gql/mutations';
import { ACCESS_TOKEN, REFRESH_TOKEN } from 'src/utils/constants';

const AuthContext = createContext<AuthContextProps>({
  user: null,
  status: UserStatus.loading,
  accessToken: null,
  refreshToken: null,
  login: ({ username, password }: { username: string; password: string }) =>
    Promise.resolve({} as FetchResult<AuthResponseType>),
  logout: () => {}
});

export const AuthProvider = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserType | null>(null);
  const [status, setStatus] = useState<UserStatus>(UserStatus.loading);
  const [accessToken, setAccessToken] = useLocalStorage(ACCESS_TOKEN);
  const [refreshToken, setRefreshToken] = useLocalStorage(REFRESH_TOKEN);
  const [loginMutation] = useMutation(LOGIN_MUTATION);

  useQuery(ME_QUERY, {
    onCompleted: data => {
      setUser(data.me);
    }
  });

  const login = useCallback(
    ({ username, password }: { username: string; password: string }) => {
      return loginMutation({
        variables: { input: { username, password } },
        onCompleted: ({
          login
        }: {
          login: {
            access_token: string;
            refresh_token: string;
            user: UserType;
          };
        }) => {
          const { access_token, refresh_token, user } = login;
          setAccessToken(access_token);
          setRefreshToken(refresh_token);
          setUser(user);
          setStatus(UserStatus.authenticated);
          navigate('/calls');
        }
      });
    },
    [setAccessToken, setRefreshToken, loginMutation, setUser, navigate]
  );

  const logout = useCallback(() => {
    setAccessToken(null);
    setRefreshToken(null);
    setStatus(UserStatus.unauthenticated);
    navigate('/login', { replace: true });
  }, [navigate, setAccessToken, setRefreshToken]);

  const value = useMemo(() => {
    return {
      login,
      logout,
      status,
      user,
      accessToken,
      refreshToken
    };
  }, [user, status, accessToken, refreshToken, login, logout]);

  return (
    <AuthContext.Provider value={value}>
      <Outlet />
    </AuthContext.Provider>
  );
};
export default AuthContext;
