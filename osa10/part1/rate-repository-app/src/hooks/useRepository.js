import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';

import { GET_REPOSITORY } from '../graphql/queries';

const useRepository = () => {
  const { repositoryId } = useParams();
  const { data, error, loading } = useQuery(GET_REPOSITORY, {
    fetchPolicy: 'cache-and-network',
    variables: { repositoryId },
  });

  return { data, error, loading };
};

export default useRepository;
