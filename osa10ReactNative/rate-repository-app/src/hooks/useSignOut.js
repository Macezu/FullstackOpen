import useAuthStorage from "./useAuthStorage";
import { useApolloClient } from "@apollo/client";


const useSignOut = () => {
  const client = useApolloClient();
  const authStorage = useAuthStorage();

  const signOut = async () => {
    await authStorage.removeAccessToken();
    client.resetStore();
  };

  return [signOut];
};

export default useSignOut;