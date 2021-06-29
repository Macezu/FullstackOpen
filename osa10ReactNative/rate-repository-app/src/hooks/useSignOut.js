import useAuthStorage from "./useAuthStorage";
import { useApolloClient } from "@apollo/client";


const useSignOut = () => {
  const client = useApolloClient();
  const authStorage = useAuthStorage();

  const signOut = async () => {

    console.log("HERE");
    await authStorage.removeAccessToken();
    client.resetStore();
    console.log(authStorage.getAccessToken());
  };

  return [signOut];
};

export default useSignOut;