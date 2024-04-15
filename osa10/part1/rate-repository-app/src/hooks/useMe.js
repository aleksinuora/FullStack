import { useQuery } from '@apollo/client';

import { ME } from '../graphql/queries';

const useMe = () => {
  const { data, error, loading } = useQuery(ME, {
    fetchPolicy: 'no-cache',
  });

  return { data, error, loading };
};

export default useMe;
