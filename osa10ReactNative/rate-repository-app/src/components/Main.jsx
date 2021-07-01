import React from "react";
import RepositoryList from "./repositoryComponents/RepositoryList";
import SignIn from "./logInComponents/SignIn";
import { StyleSheet, View } from "react-native";
import { Route, Switch, Redirect } from "react-router-native";
import AppBar from "./AppBarComponents/AppBar";
import SingleRepository from "./repositoryComponents/RepositoryDetailed";

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
        <Route path="/:id" >
          <SingleRepository/>
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
