import React from "react";
import { Link } from "react-router-native";
import {
  View,
  StyleSheet,
  Pressable,
  ScrollView,
  TouchableHighlight
} from "react-native";
import Constants from "expo-constants";
import AppBarTab from "./AppBarTab";
import theme from "../../theme";
import { GET_AUTHORIZATION } from "../../graphql/queries";
import { useQuery } from "@apollo/client";
import useSignOut from "../../hooks/useSignOut";

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
  const [signOut] = useSignOut();
  const { data, loading, error } = useQuery(GET_AUTHORIZATION, {
    fetchPolicy: "cache-and-network"
  });

  if (loading) return <div>loading...</div>;
  if (error) return <div>error</div>;

  return (
    <View style={styles.container}>
      <ScrollView horizontal={true}>
        <Pressable onPress={() => alert("ksa")}>
          <Link to="/">
            <AppBarTab title={" Repositories "} />
          </Link>
        </Pressable>
        {data.authorizedUser ? (
           <ScrollView horizontal={true}>
            <Link to="/review">
              <AppBarTab title={" Create a review "} />
            </Link>
            <Pressable onPress={() => signOut()}>
              <AppBarTab testID="signOut" title={" Sign Out "} />
            </Pressable>
           </ScrollView>
        ) : (
          <Pressable onPress={() => alert("toinen")}>
            <Link to="/signin">
              <AppBarTab title={" Sign In "} />
            </Link>
          </Pressable>
        )}
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
