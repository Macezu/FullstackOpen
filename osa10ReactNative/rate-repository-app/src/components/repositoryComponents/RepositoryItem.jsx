import React from "react";
import { View, Image, StyleSheet, Button, Pressable } from "react-native";
import theme from "../../theme";
import Text from "../Text";
import Formatter from "../../utils/formatter";
import { Link } from "react-router-native";
import * as Linking from "expo-linking";

const styles = StyleSheet.create({
  containerRow: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    marginLeft: 15
  },
  containerCol: {
    flexDirection: "column",
    alignItems: "center",
    margin: 15
  },
  tinyLogo: theme.images.thumbnail,
  medium: theme.images.medium
});

const RepositoryItem = ({ item, ghUrl }) => {
  return (
    <View>
      <View style={styles.containerRow}>
        <Image style={styles.tinyLogo} source={{ uri: item.ownerAvatarUrl }} />
        <Pressable>
          <Link to={`/${item.id}`} underlayColor="#f0f4f7" content={item}>
            <Text fontWeight="bold" decorative="toRight">
              {item.fullName}
            </Text>
          </Link>
        </Pressable>
      </View>
      <View style={styles.containerCol}>
        <Text>{item.description}</Text>
        <Button
          onPress={() => console.log("kissa")}
          title={item.language}
          color={theme.colors.primary}
          accessibilityLabel="Learn more about this language"
        />
      </View>
      <View style={styles.containerRow}>
        <Text pads="yes">
          Forks:{" "}
          {item.forksCount > 1000
            ? Formatter(item.forksCount)
            : item.forksCount}
        </Text>
        <Text pads="yes">
          Stars:{" "}
          {item.stargazersCount > 1000
            ? Formatter(item.stargazersCount)
            : item.stargazersCount}
        </Text>
        <Text pads="yes">
          Rating:{" "}
          {item.ratingAverage > 1000
            ? Formatter(item.ratingAverage)
            : item.ratingAverage}
        </Text>
        <Text pads="yes">
          Reviews:{" "}
          {item.reviewCount > 1000
            ? Formatter(item.reviewCount)
            : item.reviewCount}
        </Text>
      </View>
      <View style={styles.containerCol}>
        {ghUrl && (
          <Button
            onPress={() => Linking.openURL(ghUrl)}
            title="Open in Github"
            accessibilityLabel="Open repo in github"
            color={theme.colors.primary}
          />
        )}
      </View>
    </View>
  );
};

export default RepositoryItem;
