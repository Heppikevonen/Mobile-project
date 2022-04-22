import { configureFonts, DefaultTheme } from "react-native-paper";
import customFonts from './Fonts';

const theme = {
  ...DefaultTheme,
  fonts: configureFonts(customFonts),
  roundness: 4,
  colors: {
    ...DefaultTheme.colors,
    primary: "#F5620E",
    secondary: "#31A54E",
    accent: "#373F41",
    text: "#737B7D",
    onSurface: "#191C1D",
    onSurfaceVariant: "#52433E",
    onPrimaryContainer: "#370E00",
    onSecondaryContainer: "#002106",
    surfaceVariantDark: "#52433E",
    outline: "#85736C",
    secondaryContainer: "#89FB98",
    error: "#BA1B1B",
    neutral80: "#C4C7C7",
    onPrimary: "#FFFFFF",
    surface: "#FBFDFE",
    surface1: '#F7F3F1',
    surface2: '#F4EEEA',
    surface5: '#EFE2DA',
    surfaceVariant: "#F4DED6",
    errorContainer: "#FFDAD4",
    primaryContainer: "#FFDBCC",
    primary80: "#FFB594",
    primary95: "#FFEDE5",

  },
};

export default theme; 