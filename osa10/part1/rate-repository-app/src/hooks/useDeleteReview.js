import { useMutation } from '@apollo/client';

import { DELETE_REVIEW } from '../graphql/mutations';

const useDeleteReview = () => {
  const [mutate] = useMutation(DELETE_REVIEW, {
    fetchPolicy: 'network-only',
  });

  const deleteReview = async (id, refetchReviews) => {
    console.log('deleteReview called');
    return mutate({
      variables: {
        deleteReviewId: id,
      },
      onCompleted: () => {
        console.log('trying to refetch reviews...');
        refetchReviews();
      },
    });
  };

  return [deleteReview];
};

export default useDeleteReview;
