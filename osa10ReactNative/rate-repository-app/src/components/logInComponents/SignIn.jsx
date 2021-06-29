import React from "react";
import { useHistory } from "react-router-native";
import useSignIn from "../../hooks/useSignIn";
import ContainerSignIn from "./ContainerSignIn";



const SignIn = () => {
  const [signIn] = useSignIn();
  const history = useHistory();
  

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const data = await signIn({ username, password });
      data;
      // const storage = new AuthStorage("authToken");
      // storage.setAccessToken({"Authorization" : `Bearer ${data.authorize.accessToken}` }); 
      //console.log(authStorage.getAccessToken());
      history.push("/");
    } catch (e) {
      console.log(e);
    }
  };

  return <ContainerSignIn onSubmit={onSubmit} />;
};

export default SignIn;






