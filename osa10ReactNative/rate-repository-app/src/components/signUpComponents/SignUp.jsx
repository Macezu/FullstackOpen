import React from "react";
import { useHistory } from "react-router-native";
import useSignUp from "../../hooks/useSignUp";
import useSignIn from "../../hooks/useSignIn";
import SignUpContainer from "./SignUpContainer"


const SignUp = () => {
  const [signIn] = useSignIn();
  const [signUp] = useSignUp();
  const history = useHistory();
  

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const newUser = await signUp({ username, password });
      console.log(newUser)
      const data = await signIn({ username, password });
      console.log("data: ",data)
      history.push("/");
    } catch (e) {
      console.log(e);
    }
  };

  return <SignUpContainer onSubmit={onSubmit} />;
};

export default SignUp;






