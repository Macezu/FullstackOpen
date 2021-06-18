import React from "react";
import { View, StyleSheet, Pressable } from "react-native";
import Constants from "expo-constants";
import AppBarTab from "./AppBarTab";
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    display: "flex",
    flexDirection: "row",
    backgroundColor: theme.colors.appbarBG,
    paddingLeft: 20
  }
});

const AppBar = () => {
  return (
    <View style={styles.container}>
        <Pressable  onPress={() => alert("Kissa")}>
            <AppBarTab title={"Repositories"}/>
        </Pressable>
    </View>
  );
};

export default AppBar;
