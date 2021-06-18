import React from "react";
import { View } from "react-native";
import Text from './Text';

const RepositoryItem = ({ item }) => {
  return (
    <View>
      <Text fontWeight="bold">Name : {item.fullName}</Text>
      <Text>description : {item.description}</Text>
      <Text>language : {item.language}</Text>
      <Text>Forks: {item.forksCount}</Text>
      <Text>Stars: {item.stargazersCount}</Text>
      <Text>Ratings: {item.ratingAverage}</Text>
      <Text>Rewviews: {item.reviewCount}</Text>
      <Text>Avatar Url: {item.ownerAvatarUrl}</Text>
    </View>
  );
};

export default RepositoryItem;
