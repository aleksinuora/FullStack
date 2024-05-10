import { useMutation, useApolloClient } from '@apollo/client';

import { SIGN_IN } from '../graphql/mutations';
import useAuthStorage from './useAuthStorage';

const useSignIn = () => {
  const [mutate, result] = useMutation(SIGN_IN, {
    fetchPolicy: 'no-cache',
  });
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const signIn = async ({ username, password }) => {
    console.log('signIn called');
    return mutate({
      variables: { credentials: { username: username, password: password } },

      onCompleted: (data) => {
        if (data) {
          authStorage.setAccessToken(data.authenticate.accessToken);
          console.log('stored token:', authStorage.getAccessToken());
        }
        apolloClient.resetStore();
      },
    });
  };
  return [signIn, result];
};

export default useSignIn;
