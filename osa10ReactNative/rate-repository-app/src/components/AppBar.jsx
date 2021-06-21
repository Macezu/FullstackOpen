import React from "react";
import { Link } from "react-router-native";
import {
  View,
  StyleSheet,
  Pressable,
  ScrollView,
  TouchableHighlight,
  Text
} from "react-native";
import Constants from "expo-constants";
import AppBarTab from "./AppBarTab";
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    display: "flex",
    flexDirection: "row",
    backgroundColor: theme.colors.appbarBG,
    paddingLeft: 20,
    marginBottom: 20
  }
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal={true}>
        <Pressable onPress={() => alert("ksa")}>
          <Link to="/">
            <AppBarTab title={" Repositories "} />
          </Link>
        </Pressable>
        <Pressable onPress={() => alert("toinen")}>
          <Link to="/signin">
            <AppBarTab title={" Sign In "} />
          </Link>
        </Pressable>
      </ScrollView>
    </View>
  );
};

<TouchableHighlight
  activeOpacity={0.6}
  underlayColor="#DDDDDD"
  onPress={() => alert("Pressed!")}
>
  <Pressable />
</TouchableHighlight>;

export default AppBar;
