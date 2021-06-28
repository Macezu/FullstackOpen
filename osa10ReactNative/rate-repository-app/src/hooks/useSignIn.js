import { Authorize } from "../graphql/mutations";
import { useMutation } from "@apollo/client";

export const useSignIn = () => {
    const [mutate, result] = useMutation(Authorize, {
        fetchPolicy: "cache-and-network"
      });
  
    const signIn = async ({ username, password }) => {
        mutate({ variables: { credentials: {username,password} } });
    };
  
    return [signIn, result];
  };