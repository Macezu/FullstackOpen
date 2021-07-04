import React, {useState} from "react";
import useRepositories from "../../hooks/useRepositories"
import RepositoryItem from "./RepositoryItem";
import Menu from "./Menu";
import { FlatList, View, StyleSheet } from "react-native";



const styles = StyleSheet.create({
  separator: {
    height: 10
  }
});




const ItemSeparator = () => <View style={styles.separator} />;


export const RepositoryListContainer = ({ repositories, handleOrderChange }) => {
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
      ListHeaderComponent={() => <Menu handleOrderChange={handleOrderChange}/>}
    />
  );
};


const RepositoryList = () => {
  const [filter, setFilter] = useState("");
  const { repositories } = useRepositories();

  console.log(repositories)

  const handleOrderChange = (arg) => {
    console.log('HERE')
    setFilter(arg)
    repositories  = useRepositories(filter);
  }
  
  return <RepositoryListContainer repositories={repositories} handleOrderChange={handleOrderChange} />;
  
};

export default RepositoryList;
