import React from "react";
import { useHistory } from "react-router-native";
import useReview from "../../hooks/useReview";
import useRepositories from "../../hooks/useRepositories";
import ReviewContainer from "./ReviewContainer";

const Review = () => {
  const [review] = useReview();
  const history = useHistory();

  const onSubmit = async (values) => {
    const { repositoryName, ownerName, text } = values;
    const rating = Number(values.rating);

    try {
      const data = await review({ repositoryName, ownerName, rating, text });
      console.log(data);
      console.log(data.createReview.repositoryId)
      history.push(`/${data.createReview.repositoryId}`);
    } catch (e) {
      alert(e.message);
      console.log(e);
    }
  };

  return <ReviewContainer onSubmit={onSubmit} />;
};

export default Review;
