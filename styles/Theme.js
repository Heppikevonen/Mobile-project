import { configureFonts, DefaultTheme } from "react-native-paper";
import customFonts from './Fonts';

const theme = {
    ...DefaultTheme,
    fonts: configureFonts(customFonts),
    roundness: 4,
    colors: {
        ...DefaultTheme.colors,
        primary: '#EA5A00',
        secondary: '#3BAD55',
        accent: '#373F41',
        text: '#737B7D',
    }
}

export default theme; 