import FormikTextInput from "../FormikTextInput";
import React from "react";
import { StyleSheet, View, Button } from "react-native";
import theme from "../../theme";

const styles = StyleSheet.create({
  containerCol: {
    flexDirection: "column",
    alignItems: "center",
    padding: 10,
    margin: 15,
    borderWidth: 2,
    backgroundColor: theme.colors.secondary
  }
});

const LoginForm = ({ onSubmit }) => {
  return (
    <View style={styles.containerCol}>
      <FormikTextInput name="username" placeholder="Username" />
      <FormikTextInput
        secureTextEntry={true}
        name="password"
        placeholder="Password"
      />
      <Button onPress={onSubmit} title="Send"></Button>
    </View>
  );
};

export default LoginForm;
