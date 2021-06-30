import React from "react";
import RepositoryList from "./RepositoryList";
import SignIn from "./logInComponents/SignIn";
import { StyleSheet, View } from "react-native";
import { Route, Switch, Redirect } from "react-router-native";
import AppBar from "./AppBarComponents/AppBar";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1
  }
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Switch>
        <Route path="/signin" exact>
          <SignIn />
        </Route>
        <Route path="/" exact>
          <RepositoryList />
        </Route>
        <Redirect to="/" />
      </Switch>
    </View>
  );
};

export default Main;
