import React from "react";
import { useHistory } from "react-router-native";
import useSignIn from "../../hooks/useSignIn";
import ReviewContainer from "./ReviewContainer"



const Review = () => {
  const [signIn] = useSignIn();
  const history = useHistory();
  

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const data = await signIn({ username, password });
      data;
      history.push("/");
    } catch (e) {
      console.log(e);
    }
  };

  return <ReviewContainer onSubmit={onSubmit} />;
};

export default Review;






