import React from "react";
import { Text as NativeText, StyleSheet } from "react-native";

import theme from "../theme";

const styles = StyleSheet.create({
  text: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.body,
    fontFamily: theme.fonts.default,
    fontWeight: theme.fontWeights.normal
  },
  colorTextSecondary: {
    color: theme.colors.textSecondary
  },
  colorPrimary: {
    color: theme.colors.primary
  },
  colorBlue: {
    backgroundColor: theme.colors.blue
  },
  fontSizeSubheading: {
    fontSize: theme.fontSizes.subheading
  },
  fontSizeHeader:{
      fontSize: theme.fontSizes.header
  },
  fontWeightBold: {
    fontWeight: theme.fontWeights.bold
  },
  fontWeightXtraBold: {
    fontWeight: theme.fontWeights.xtrabold
  },
  fontDecors:{
    textAlign: theme.fontDecor.location,
    alignSelf: theme.fontDecor.yPosition,
    paddingLeft: theme.fontDecor.padL
  },
  fontPads : {
    margin: theme.fontPad.margin,
    padding: theme.fontPad.padding
  },
  center : {
    justifyContent: theme.fontDecor.xposition
  },
  fontStyles : {
    fontWeight: theme.fontstyles.italicText
  }
});

const Text = ({ color, fontSize,fontStyle, fontWeight, decorative, pads, center, style, ...props }) => {
  const textStyle = [
    styles.text,
    color === "textSecondary" && styles.colorTextSecondary,
    color === "primary" && styles.colorPrimary,
    color === "blue" && styles.colorBlue,
    fontSize === "subheading" && styles.fontSizeSubheading,
    fontSize === "header" && styles.fontSizeHeader,
    fontWeight === "bold" && styles.fontWeightBold,
    fontWeight === "xtrabold" && styles.fontWeightXtraBold,
    decorative === "toRight" && styles.fontDecors,
    fontStyle === "italic" && styles.fontStyles,
    pads === "yes" && styles.fontPads,
    center === "yes" && styles.center,
    style
  ];

  return <NativeText style={textStyle} {...props} />;
};

export default Text;
