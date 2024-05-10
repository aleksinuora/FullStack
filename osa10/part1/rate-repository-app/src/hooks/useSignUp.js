import { useMutation } from '@apollo/client';

import { SIGN_UP } from '../graphql/mutations';

const useSignUp = () => {
  const [mutate, result] = useMutation(SIGN_UP, {
    fetchPolicy: 'network-only',
  });

  const signUp = async (user) => {
    return mutate({
      variables: {
        user: {
          username: user.username,
          password: user.password,
        },
      },
    });
  };

  return [signUp, result];
};

export default useSignUp;
