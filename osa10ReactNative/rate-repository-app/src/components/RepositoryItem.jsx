import React from "react";
import { View, Image, StyleSheet } from "react-native";
import theme from "../theme";
import Text from "./Text";

const styles = StyleSheet.create({
  containerRow: {
    display: "flex",
    flexDirection: "row",
  },
  containerCol: {
    flexDirection: "column"
  },
  tinyLogo: theme.images.thumbnail,
  medium: theme.images.medium
});

const RepositoryItem = ({ item }) => {
  return (
    <View>
      <View style={styles.containerRow}>
        <Image style={styles.tinyLogo} source={item.ownerAvatarUrl} />
        <Text fontWeight="bold">Name : {item.fullName}</Text>
      </View>
      <Text>description : {item.description}</Text>
      <Text>language : {item.language}</Text>
      <View style={styles.containerRow}>
        <Text>Forks: {item.forksCount}</Text>
        <Text>Stars: {item.stargazersCount}</Text>
        <Text>Ratings: {item.ratingAverage}</Text>
        <Text>Rewviews: {item.reviewCount}</Text>
      </View>
    </View>
  );
};

export default RepositoryItem;
