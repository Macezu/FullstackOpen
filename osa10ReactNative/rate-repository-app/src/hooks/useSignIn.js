import { Authorize } from "../graphql/mutations";
import { useMutation } from "@apollo/client";

const useSignIn = () => {
    const [mutate, result] = useMutation(Authorize);
  
    const signIn = async ({ username, password }) => {
      const { data } = await mutate({
        variables: { credentials: { username, password } },
      });
  
  
      return data;
    };
  
    return [signIn, result];
  };
  
  export default useSignIn;