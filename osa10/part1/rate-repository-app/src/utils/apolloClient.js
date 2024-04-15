import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import Constants from 'expo-constants';
import { setContext } from '@apollo/client/link/context';

const createApolloClient = (authStorage) => {
  const ip = Constants.expoConfig.hostUri.substring(
    0,
    Constants.expoConfig.hostUri.length - 5
  );
  const apolloUri = Constants.expoConfig.extra.apolloUri;
  console.log(ip, apolloUri);

  const httpLink = createHttpLink({
    uri: `http://${ip}:${apolloUri}`,
  });

  const authLink = setContext(async (_, { headers }) => {
    try {
      const accessToken = await authStorage.getAccessToken();
      return {
        headers: {
          ...headers,
          authorization: accessToken ? `Bearer ${accessToken}` : '',
        },
      };
    } catch (e) {
      console.log(e);
      return {
        headers,
      };
    }
  });

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
