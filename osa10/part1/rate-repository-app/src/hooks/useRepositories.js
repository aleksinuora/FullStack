import { useQuery } from '@apollo/client';

import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (order, keyword) => {
  const { data, error, loading } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables: {
      orderBy: order === 'CREATED_AT' ? order : 'RATING_AVERAGE',
      orderDirection: order === 'ASC' ? order : 'DESC',
      searchKeyword: keyword ? keyword : '',
    },
  });

  return { data, error, loading };
};

export default useRepositories;
