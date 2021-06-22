import React from "react";
import FormikTextInput from "./FormikTextInput";
import { Text, Pressable, View,Button } from "react-native";
import { Formik } from "formik";

const initialValues = {
  username: "",
  password: ""
};


const logSubmit = (username,password) => {
  console.log(username , password);
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
        <Button onPress={onSubmit} title="Send"></Button> 
    </View>
  );
};

const LoginView = () => {
  const onSubmit = (values) => {
    
    const username = values.username;
    const password = values.password;
    logSubmit(username,password);
  };
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ handleSubmit }) => <LoginForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default LoginView;
