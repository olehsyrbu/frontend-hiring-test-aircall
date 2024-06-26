import { FetchResult } from '@apollo/client';
interface LoginInput {
  username: string;
  password: string;
}

interface AuthResponseType {
  access_token: string;
  refresh_token: string;
  user: UserType;
}

interface DeprecatedAuthResponseType {
  access_token: string;
  user: UserType;
}

interface AuthContextProps {
  user: UserType | null;
  status: Status;
  accessToken: string | null;
  refreshToken: string | null;
  login: ({
    username,
    password
  }: {
    username: string;
    password: string;
  }) => Promise<FetchResult<AuthResponseType>>;
  logout: () => void;
}
