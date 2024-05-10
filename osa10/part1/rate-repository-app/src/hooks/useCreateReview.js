import { useMutation } from '@apollo/client';

import { CREATE_REVIEW } from '../graphql/mutations';

const useCreateReview = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW, {
    fetchPolicy: 'network-only',
  });

  const createReview = async (review) => {
    console.log('createReview called');
    return mutate({
      variables: {
        review: {
          ownerName: review.ownerName,
          repositoryName: review.repositoryName,
          rating: Number(review.rating),
          text: review.review,
        },
      },
    });
  };

  return [createReview, result];
};

export default useCreateReview;
