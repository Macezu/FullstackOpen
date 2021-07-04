import { CREATE_REVIEW } from "../graphql/mutations";
import { useMutation, useQuery } from "@apollo/client";
import { useApolloClient } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";

const useReview = () => {
  const client = useApolloClient();
  const [mutate, result] = useMutation(CREATE_REVIEW);
  

  const review = async ({ repositoryName, ownerName, rating, text }) => {
    const { data } = await mutate({
      variables: { review: { repositoryName, ownerName, rating, text } }
    });

    client.resetStore();
    return data;
  };

  return [review, result];
};

export default useReview;
