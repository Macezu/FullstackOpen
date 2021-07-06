import React from "react";
import { useParams } from "react-router-native";
import useRepository from "../../hooks/useRepository";
import RepositoryItem from "./RepositoryItem";
import ReviewItem from "../reviewComponents/ReviewItem";
import { FlatList, StyleSheet, View } from "react-native";

const styles = StyleSheet.create({
  separator: {
    height: 5,
    backgroundColor: "rgb(240, 240, 240)"
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

const SingleRepository = () => {
  let { id } = useParams();
  const { repository, fetchMore } = useRepository({
    id: id,
    first: 3
  });

  const onEndReach = () => {
    fetchMore();
  };

  const reviews = repository
    ? repository.reviews.edges.map((edge) => edge.node)
    : [];

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={reviews}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => <ReviewItem review={item} />}
        keyExtractor={({ id }) => id}
        ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
        onEndReached={onEndReach}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};

export default SingleRepository;
