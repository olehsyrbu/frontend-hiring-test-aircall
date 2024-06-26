import { gql } from '@apollo/client';
import { USER_FIELDS } from 'src/gql/fragments/user';

export const LOGIN_MUTATION = gql`
  ${USER_FIELDS}

  mutation Login($input: LoginInput!) {
    login(input: $input) {
      access_token
      refresh_token
      user {
        ...UserFields
      }
    }
  }
`;
