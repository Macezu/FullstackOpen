import React from "react";
import { Text, View, FlatList, Image, Button } from "react-native";
import { render } from "@testing-library/react-native";
import Formatter from "../../../utils/formatter";


const RepositoryItem = ({ item }) => {
  return (
    <View>
      <View >
        <Image source={{ uri: item.ownerAvatarUrl }} />
        <Text testID="fullName">
          {item.fullName}
        </Text>
      </View>
      <View >
        <Text testID="description">{item.description}</Text>
        <Button testID="language"
          title={item.language}
        />
      </View>
      <View >
        <Text testID="forks">
          Forks:
          {item.forksCount > 1000
            ? Formatter(item.forksCount)
            : item.forksCount}
        </Text>
        <Text testID="stars">
          Stars:
          {item.stargazersCount > 1000
            ? Formatter(item.stargazersCount)
            : item.stargazersCount}
        </Text>
        <Text testID="ratings">
          Rating:
          {item.ratingAverage > 1000
            ? Formatter(item.ratingAverage)
            : item.ratingAverage}
        </Text>
        <Text testID="reviews">
          Reviews:
          {item.reviewCount > 1000
            ? Formatter(item.reviewCount)
            : item.reviewCount}
        </Text>
      </View>
    </View>
  );
};

export const RepositoryListContainer = ({ repositories }) => {
  // Get the nodes from the edges array
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  const renderItem = ({ item }) => (
    <RepositoryItem item={item} />
  );

  return (
    <FlatList
      data={repositoryNodes}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  );
};

describe("RepositoryList", () => {
  describe("RepositoryListContainer", () => {
    it("renders repository information correctly", () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor:
            "WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==",
          startCursor: "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd"
        },
        edges: [
          {
            node: {
              id: "jaredpalmer.formik",
              fullName: "jaredpalmer/formik",
              description: "Build forms in React, without the tears",
              language: "TypeScript",
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                "https://avatars2.githubusercontent.com/u/4060187?v=4"
            },
            cursor: "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd"
          },
          {
            node: {
              id: "async-library.react-async",
              fullName: "async-library/react-async",
              description: "Flexible promise-based React data loader",
              language: "JavaScript",
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                "https://avatars1.githubusercontent.com/u/54310907?v=4"
            },
            cursor:
              "WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ=="
          }
        ]
      };

      const { getAllByTestId } = render(
        <RepositoryListContainer repositories={repositories} />
      );

      const firstRepo = repositories.edges[0].node;
      const secondRepo = repositories.edges[1].node;

      const fullNames = getAllByTestId("fullName");
      expect(fullNames[0]).toHaveTextContent(firstRepo.fullName);
      expect(fullNames[1]).toHaveTextContent(secondRepo.fullName);

      const descriptions = getAllByTestId("description");
      expect(descriptions[0]).toHaveTextContent(firstRepo.description);
      expect(descriptions[1]).toHaveTextContent(secondRepo.description);

      const languages = getAllByTestId("language");
      expect(languages[0]).toHaveTextContent(firstRepo.language);
      expect(languages[1]).toHaveTextContent(secondRepo.language);

      const stargazersCounts = getAllByTestId("stars");
      expect(stargazersCounts[0]).toHaveTextContent(
        Formatter(firstRepo.stargazersCount)
      );
      expect(stargazersCounts[1]).toHaveTextContent(
        Formatter(secondRepo.stargazersCount)
      );

      const forksCounts = getAllByTestId("forks");
      expect(forksCounts[0]).toHaveTextContent(
        Formatter(firstRepo.forksCount)
      );
      expect(forksCounts[1]).toHaveTextContent("Forks:69");

      const ratingAverages = getAllByTestId("ratings");
      expect(ratingAverages[0]).toHaveTextContent("Rating:88");
      expect(ratingAverages[1]).toHaveTextContent("Rating:72");

      const reviewCounts = getAllByTestId("reviews");
      expect(reviewCounts[0]).toHaveTextContent("Reviews:3");
      expect(reviewCounts[1]).toHaveTextContent("Reviews:3");
    });
  });
});
