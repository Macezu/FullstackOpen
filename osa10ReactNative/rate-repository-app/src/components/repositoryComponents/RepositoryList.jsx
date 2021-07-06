import React, { useState } from "react";
import useRepositories from "../../hooks/useRepositories";
import RepositoryItem from "./RepositoryItem";
import Menu from "./Menu";
import { FlatList, View, StyleSheet } from "react-native";
import { Searchbar } from "react-native-paper";
import { useDebounce } from 'use-debounce';

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
  searchQuery
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
    const reOrganizeRepos = {
      orderBy: "CREATED_AT",
      orderDirection: "DESC",
      searchKeyword: searchKeyword,
      first: 6
    };
    switch (orderBy) {
      case "Latest":
        return reOrganizeRepos;
      case "Highest":
        reOrganizeRepos.orderBy = "RATING_AVERAGE";
        return reOrganizeRepos;
      case "Lowest":
        reOrganizeRepos.orderBy = "RATING_AVERAGE";
        reOrganizeRepos.orderDirection = "ASC";
        return reOrganizeRepos;
      default:
        return reOrganizeRepos;
    }
  };

  const { repositories } = useRepositories(orderSelection(debounced));

  return (
    <RepositoryListContainer
      repositories={repositories}
      setOrderBy={setOrderBy}
      orderBy={orderBy}
      onChangeSearch={onChangeSearch}
      searchQuery={searchQuery}
    />
  );
};

export default RepositoryList;
