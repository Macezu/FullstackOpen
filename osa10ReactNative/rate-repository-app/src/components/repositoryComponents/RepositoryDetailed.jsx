import React, { useState, useEffect } from "react";
import { useParams } from "react-router-native";
import useRepository from "../../hooks/useRepository";
import RepositoryItem from "./RepositoryItem";
import { FlatList, StyleSheet, View, Text } from "react-native";

const styles = StyleSheet.create({
  separator: {
    height: 10
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryInfo = ({ repository }) => {
  if (repository) {
    return <RepositoryItem detailed={true} item={repository} />;
  } else {
    return <div>Loading..</div>;
  }
};

const ReviewItem = ({ review }) => {
  console.log(review)
  // Create ReviewItem Comp
  return <View><Text>{review.rating}{review.text}</Text></View>
};

const SingleRepository = () => {
  let { id } = useParams();
  const { repository } = useRepository(id);

  const reviews = repository
    ? repository.reviews.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={reviews}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
      // ...
    />
  );
};

export default SingleRepository;
