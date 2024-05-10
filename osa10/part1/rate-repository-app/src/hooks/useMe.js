import { useQuery } from '@apollo/client';

import { ME } from '../graphql/queries';

const useMe = (includeReviews = false) => {
  const { data, error, loading, refetch } = useQuery(ME, {
    fetchPolicy: 'no-cache',
    variables: {
      includeReviews: includeReviews,
    },
  });

  return { data, error, loading, refetch };
};

export default useMe;
