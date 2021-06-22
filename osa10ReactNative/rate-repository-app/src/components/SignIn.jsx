import React from "react";
import FormikTextInput from "./FormikTextInput";
import { Text, Pressable, View } from "react-native";
import { Formik } from "formik";

const initialValues = {
  username: "",
  password: ""
};


const logSubmit = (values) => {
  console.log(values);
};

const LoginForm = ({ onSubmit }) => {
  return (
    <View>
      <FormikTextInput name="username" placeholder="Username" />
      <FormikTextInput
        secureTextEntry={true}
        name="password"
        placeholder="Password"
      />
      <Pressable onPress={onSubmit}>
        <Text>Calculate</Text>
      </Pressable>
    </View>
  );
};

const LoginView = () => {
  const onSubmit = (values) => {
    const username = toString(values.username);
    const password = toString(values.password);

    if (isNaN(username) && isNaN(password) && password !== 0) {
      logSubmit(username, password);
    }
  };
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ handleSubmit }) => <LoginForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default LoginView;
