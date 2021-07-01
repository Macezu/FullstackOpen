import React from "react";
import useRepositories from "../../hooks/useRepositories"
import RepositoryItem from "./RepositoryItem";
import { FlatList, View, StyleSheet } from "react-native";



const styles = StyleSheet.create({
  separator: {
    height: 10
  }
});


const ItemSeparator = () => <View style={styles.separator} />;


export const RepositoryListContainer = ({ repositories }) => {
  // Get the nodes from the edges array
  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];
  
  const renderItem = ({ item }) => <RepositoryItem item={item} />;


  return (
    
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem = {renderItem}
      keyExtractor={(item) => item.id}
    />
  );
};


const RepositoryList = () => {
  const { repositories } = useRepositories();
  
  return <RepositoryListContainer repositories={repositories} />;
  
};

export default RepositoryList;
