import React from 'react';
import { TextInput as NativeTextInput, StyleSheet } from 'react-native';
import theme from '../theme';

const styles = StyleSheet.create({
  text: {
    color: theme.colors.blue,
  },
});

const TextInput = ({ style, error, ...props }) => {
  console.log(`error : ${error == false}`);
  const textInputStyle = [
    error === !false && styles.text,
    style
  ];

  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;