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
  },
  multiline: {
    borderColor : theme.colors.error,
    borderWidth: 2,
  }
});

const ReviewForm = ({ onSubmit }) => {
  return (
    <View style={styles.containerCol}>
      <FormikTextInput
        name="ownerName"
        placeholder="Owner's GitHub username"
      />
      <FormikTextInput name="repositoryName" placeholder="Repository's name" />
      <FormikTextInput name="rating" placeholder="Numeric rating" />
      <FormikTextInput
        highlight = {true}
        multiline={true}
        name="text"
        placeholder="Review (optional)"
      />
      <Button onPress={onSubmit} title="Send"></Button>
    </View>
  );
};

export default ReviewForm;
