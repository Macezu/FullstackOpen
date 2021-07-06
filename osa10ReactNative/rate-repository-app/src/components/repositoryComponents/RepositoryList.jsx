import React, { useState } from "react";
import useRepositories from "../../hooks/useRepositories";
import RepositoryItem from "./RepositoryItem";
import Menu from "./Menu";
import { FlatList, View, StyleSheet } from "react-native";
import { Searchbar } from "react-native-paper";
import { useDebounce } from "use-debounce";

const styles = StyleSheet.create({
  separator: {
    height: 10
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({
  repositories,
  setOrderBy,
  orderBy,
  onChangeSearch,
  searchQuery,
  onEndReach,
}) => {
  // Get the nodes from the edges array
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  const renderItem = ({ item }) => <RepositoryItem item={item} />;

  return (
    <>
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
      />
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={() => (
          <Menu setOrderBy={setOrderBy} orderBy={orderBy} />
        )}
        onEndReached={onEndReach}
        onEndReachedThreshold={1.0}
      />
    </>
  );
};

const RepositoryList = () => {
  const [orderBy, setOrderBy] = useState("Latest");
  const [searchQuery, setSearchQuery] = useState("");
  const onChangeSearch = (query) => setSearchQuery(query);
  const [debounced] = useDebounce(searchQuery, 500);

  const orderSelection = (searchKeyword) => {
    const organizeRepos = {
      orderBy: "CREATED_AT",
      orderDirection: "DESC",
      searchKeyword: searchKeyword,
      first: 6
    };
    switch (orderBy) {
      case "Latest":
        return organizeRepos;
      case "Highest":
        organizeRepos.orderBy = "RATING_AVERAGE";
        return organizeRepos;
      case "Lowest":
        organizeRepos.orderBy = "RATING_AVERAGE";
        organizeRepos.orderDirection = "ASC";
        return organizeRepos;
      default:
        return organizeRepos;
    }
  };

  
  const { repositories, fetchMore } = useRepositories(orderSelection(debounced));

  const onEndReach = () => {
    console.log('Here')
    fetchMore();
  };

  return (
    <RepositoryListContainer
      repositories={repositories}
      setOrderBy={setOrderBy}
      orderBy={orderBy}
      onChangeSearch={onChangeSearch}
      searchQuery={searchQuery}
      onEndReach={onEndReach}
    />
  );
};

export default RepositoryList;
