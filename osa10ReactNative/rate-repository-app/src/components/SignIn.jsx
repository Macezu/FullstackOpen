import React from "react";
import FormikTextInput from "./FormikTextInput";
import { StyleSheet, View, Button } from "react-native";
import { Formik } from "formik";
import theme from "../theme";
import * as yup from "yup";

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

const initialValues = {
  username: "",
  password: ""
};

const validationSchema = yup.object().shape({
  username: yup
    .required("Weight is required"),
  password: yup
    .required("Height is required")
});

const logSubmit = (username, password) => {
  console.log(username, password);
};

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

const LoginView = () => {
  const onSubmit = (values) => {
    const username = values.username;
    const password = values.password;
    logSubmit(username, password);
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <LoginForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default LoginView;
