import React from "react";
import { Formik } from "formik";
import * as yup from "yup";

import SignUpForm from "./SignUpForm";


const initialValues = {
  username: "",
  password: "",
  passwordconf: ""
};

const validationSchema = yup.object().shape({
  username: yup.string().required("Username is required").min(1).max(30),
  password: yup.string().required("Password is required").min(1).max(50),
  passwordconf:  yup.string()
  .oneOf([yup.ref('password'), null])
  .required('Password confirm is required')
});

const SignUpView = ({onSubmit}) => {

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignUpView;