import { StyleSheet } from "react-native";

export const primaryColor = "#07427C"; // primary color
export const inactivePrimaryColor = "#07427C4D"; // primary color
export const secondaryColor = "#07427C0D";
export const white = "#FFFFFF";
export const background = "#F8F8F8";
export const black = "#222222"; // text color level 1
export const bodyText = "#222222CC"; // text color level 2
export const subText = "#22222299"; // text color level 3
export const accent = "#E66D1C";
export const accentLight = "#E66D1C0D";
export const yellowLight = "#FFFF000D";
export const greenLight = "#0398550D";
export const neutral = "#B1B2B2"; // mostly uses for inactive bottom navigation text
export const inputLabel = "#837F7F";
export const inputBorder = "#E7E5E5";

export const globalStyleSheet = StyleSheet.create({
    main: {
        minHeight: "100%",
        display: 'flex',
        alignItems: 'center',
        backgroundColor: background,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        padding: 20,
        flex: 1,
    },

})