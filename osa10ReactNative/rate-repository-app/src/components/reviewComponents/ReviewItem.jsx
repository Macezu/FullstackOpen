import React from "react";
import { parseISO,format } from "date-fns";
import { View, StyleSheet } from "react-native";
import Text from "../Text";
import theme from "../../theme";

const styles = StyleSheet.create({
  ratingCont: {
    width: 40,
    borderWidth: 2,
    borderRadius: 60,
    flexDirection: "row"
  },
  centeredTxt: {
    color: theme.colors.primary,
    textAlign: "center",
    margin: 10
  }
});

const ReviewItem = ({ review }) => {
  return (
    <View>
      <View style={styles.ratingCont}>
        <Text style={styles.centeredTxt} fontWeight="xtrabold">
          {review.rating}
        </Text>
      </View>
      <Text fontWeight="bold" fontSize="subheading">
        {review.user.username}
      </Text>
      <Text fontStyle="italic">
        {format(parseISO(review.createdAt), "dd.MM.yyyy")}
        {"\n"}
        {"\n"}
        {review.text}
      </Text>
    </View>
  );
};

export default ReviewItem;
