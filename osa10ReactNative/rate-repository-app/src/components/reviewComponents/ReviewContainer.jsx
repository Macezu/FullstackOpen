import React from "react";
import { Formik } from "formik";
import * as yup from "yup";
import ReviewForm from "./ReviewForm";


const initialValues = {
    owner: "",
    repoName: "",
    rating: 0,
    textualReview: ""
};

const validationSchema = yup.object().shape({
    owner: yup.string().required("Owner of repository is required"),
    repoName: yup.string().required("Repository name is required"),
    rating: yup.number().required("Rating required").min(0).max(100).integer(),
});

const LoginView = ({onSubmit}) => {

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <ReviewForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default LoginView;
