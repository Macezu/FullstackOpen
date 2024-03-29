import { Platform } from 'react-native';

const theme = {
  colors: {
    textPrimary: "#24292e",
    textSecondary: "#586069",
    primary: "#0366d6",
    secondary: "#D4B895",
    appbarBG: "#f39bfc20",
    highlight: "#b600f6",
    error: "#d73a4a"
  },
  fontSizes: {
    body: 14,
    subheading: 16,
    header: 22
  },
  fonts: {
    fontFamily: Platform.select({
      android: 'Roboto',
      ios: 'Arial',
      default: 'System',
    }),
  },
  fontstyles: {
    italicText: '100'
  },
  fontDecor: {
    padL: 5,
    location: 'right',
    yPosition :  "center",
    xposition: "center"
  },
  fontPad: {
    margin: 10,
    padding: 5
  },
  fontWeights: {
    normal: "400",
    bold: "700",
    xtrabold: "900"
  },
  images: {
    thumbnail: {
      width: 50,
      height: 50
    },
    medium: {
      width: 100,
      height: 100
    },
    big: {
      width: 150,
      height: 150
    }
  }
};

export default theme;
