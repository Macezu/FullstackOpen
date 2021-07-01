import React from "react";
import { format, formatDistance, formatRelative, subDays } from "date-fns";
import { View, Button, StyleSheet } from "react-native";
import Text from "../Text";
import theme from "../../theme";

const styles = StyleSheet.create({
  button: {
    color: "red",
    aspectRatio: 4,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "black"
  },
  container: {
    width: 10,
    height: 10,
    borderWidth: 5,
    borderRadius: 5/2
  }
});

const ReviewItem = ({ review }) => {
  return (
    <View>
      {/* <Button
        style={styles.button}
        title={review.rating}
        color={theme.colors.primary}
        accessibilityLabel="Im just a button"
      /> */}
      <View>
      <Text fontWeight="xtrabold">{review.rating}</Text>
      </View>
      <Text fontWeight="bold" fontSize="subheading">
        {review.user.username}
      </Text>
      <Text fontStyle="italic">
        {format(review.createdAt, "DD.MM.YYYY")}
        {"\n"}
        {"\n"}
        {review.text}
      </Text>
    </View>
  );
};

export default ReviewItem;
