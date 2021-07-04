import { CREATE_REVIEW } from "../graphql/mutations";
import { useMutation } from "@apollo/client";
import { useApolloClient } from '@apollo/client';

const useReview = () => {
  const client = useApolloClient();
  const [mutate, result] = useMutation(CREATE_REVIEW);

  const review = async ({ ownerName, repositoryName, rating ,text }) => {

    const { data } = await mutate({
      variables: { review: { ownerName, repositoryName, rating ,text } }
    });
  
    client.resetStore();
    return data;
  };

  return [review, result];
};

export default useReview;
