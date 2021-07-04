import React from 'react';
import { TextInput as NativeTextInput, StyleSheet } from 'react-native';
import theme from '../theme';

const styles = StyleSheet.create({
  borders: {
    borderColor : theme.colors.error,
    borderWidth: 2,
  },
  highlight:{
    borderWidth: 2,
    textAlign: "center",
    borderColor : theme.colors.highlight
  },
});

const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = [
    props.highlight === true && styles.highlight,
    error && styles.borders,
    style
  ];

  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;