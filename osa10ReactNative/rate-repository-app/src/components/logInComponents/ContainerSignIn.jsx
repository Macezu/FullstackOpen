import React from "react";
import { Formik } from "formik";
import * as yup from "yup";
import LoginForm from "./LogInForm";


const initialValues = {
  username: "",
  password: ""
};

const validationSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required")
});

const LoginView = ({onSubmit}) => {

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
