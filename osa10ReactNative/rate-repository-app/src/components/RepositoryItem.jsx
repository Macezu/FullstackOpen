import React from "react";
import { View, Image, StyleSheet, Button } from "react-native";
import theme from "../theme";
import Text from "./Text";

const formatter = (number) => {
  let final =  Array.from(String(number));
  if (final.length > 5){
    final.splice(3,0,".");
  } else if (final.length > 4){
    final.splice(2,0,".");
  } else {
    final.splice(1,0,".");     
  }
  final = final.slice(0,final.length-2);
  final.push("k");
  return final.join("");
};

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

const RepositoryItem = ({ item }) => {
  formatter(item.forksCount);
  return (
    <View>
      <View style={styles.containerRow}>
        <Image style={styles.tinyLogo} source={{uri : item.ownerAvatarUrl}} />
        <Text fontWeight="bold" decorative="toRight">
          {item.fullName}
        </Text>
      </View>
      <View style={styles.containerCol}>
        <Text>{item.description}</Text>
        <Button
          onPress={() => console.log("kissa")}
          title={item.language}
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
      </View>
      <View style={styles.containerRow}>
        <Text pads="yes">Forks: {item.forksCount > 1000 ? formatter(item.forksCount) : item.forksCount}</Text>
        <Text pads="yes">Stars: {item.stargazersCount > 1000 ? formatter(item.stargazersCount) : item.stargazersCount}</Text>
        <Text pads="yes">Rating: {item.ratingAverage > 1000 ? formatter(item.ratingAverage) : item.ratingAverage}</Text>
        <Text pads="yes">Reviews: {item.reviewCount > 1000 ? formatter(item.reviewCount) : item.reviewCount}</Text>
      </View>
      
    </View>
  );
};

export default RepositoryItem;
