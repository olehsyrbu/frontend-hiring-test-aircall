export interface UserType {
  id: string;
  username: string;
}

export enum UserStatus {
  loading = 'loading',
  authenticated = 'authenticated',
  unauthenticated = 'unauthenticated'
}
