import React from 'react';
import { TextInput as NativeTextInput, StyleSheet } from 'react-native';
import theme from '../theme';

const styles = StyleSheet.create({
  borders: {
    borderColor : theme.colors.error,
    borderWidth: 2,
  },
});

const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = [
    error && styles.borders,
    style
  ];

  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;