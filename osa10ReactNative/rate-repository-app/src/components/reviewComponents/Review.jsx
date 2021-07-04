import React from "react";
import { useHistory } from "react-router-native";
import useReview from "../../hooks/useReview"
import ReviewContainer from "./ReviewContainer"



const Review = () => {
  const [review] = useReview();
  const history = useHistory();
  

  const onSubmit = async (values) => {
    const { ownerName, repositoryName, rating ,text } = values;

    try {
      const data = await review({ ownerName, repositoryName,rating, text });
      console.log(data);
      history.push("/");
    } catch (e) {
      console.log(e);
    }
  };

  return <ReviewContainer onSubmit={onSubmit} />;
};

export default Review;






