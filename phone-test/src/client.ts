import {
  ApolloLink,
  Observable,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  FetchResult
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { GraphQLError } from 'graphql';
import { REFRESH_TOKEN_MUTATION } from 'src/gql/mutations/refreshToken';
import {
  ACCESS_TOKEN,
  REFRESH_TOKEN_V2_MUTATION,
  UNAUTHORIZED,
  REFRESH_TOKEN
} from 'src/utils/constants';

const httpLink = createHttpLink({
  uri: 'https://frontend-test-api.aircall.dev/graphql'
});

const authLink = new ApolloLink((operation, forward) => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);
  let token = accessToken || undefined;

  if (operation.operationName === REFRESH_TOKEN_V2_MUTATION) {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);
    token = refreshToken || undefined;
  }

  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${JSON.parse(token)}` : ''
    }
  });

  return forward(operation);
});

const refreshToken = async () => {
  try {
    const { data } = await client.mutate({
      mutation: REFRESH_TOKEN_MUTATION
    });
    const accessToken = data?.refreshTokenV2.access_token;
    if (!accessToken) {
      throw new GraphQLError('Empty AccessToken');
    }

    localStorage.setItem(ACCESS_TOKEN, JSON.stringify(accessToken));
    return accessToken;
  } catch (err) {
    localStorage.clear();
    throw err;
  }
};

const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
  if (graphQLErrors) {
    for (let err of graphQLErrors) {
      switch (err.message) {
        case UNAUTHORIZED:
          // ignore 401 error for a refresh request
          if (operation.operationName === REFRESH_TOKEN_V2_MUTATION) return;

          const observable = new Observable<FetchResult<Record<string, object>>>(observer => {
            (async () => {
              try {
                const accessToken = await refreshToken();
                operation.setContext({
                  headers: {
                    ...operation.getContext().headers,
                    authorization: `Bearer ${accessToken}`
                  }
                });

                forward(operation).subscribe({
                  next: observer.next.bind(observer),
                  error: observer.error.bind(observer),
                  complete: observer.complete.bind(observer)
                });
              } catch (err) {
                observer.error(err);
              }
            })();
          });

          return observable;
      }
    }
  }

  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
  }
});

const client = new ApolloClient({
  link: ApolloLink.from([authLink, errorLink, httpLink]),
  cache: new InMemoryCache()
});

export default client;
