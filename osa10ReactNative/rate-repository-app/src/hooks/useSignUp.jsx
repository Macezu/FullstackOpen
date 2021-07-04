import { CREATE_USER } from "../graphql/mutations";
import { useMutation } from "@apollo/client";
import { useApolloClient } from '@apollo/client';

const useSignUp = () => {
  const client = useApolloClient();
  const [mutate, result] = useMutation(CREATE_USER);

  const signUp = async ({ username, password }) => {

    const { data } = await mutate({
      variables: { user: { username, password } }
    });
    client.resetStore();
    return data;
  };

  return [signUp, result];
};

export default useSignUp;
