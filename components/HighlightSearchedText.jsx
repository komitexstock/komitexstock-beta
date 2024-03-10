// react native components
import { Text, StyleSheet, View } from "react-native";

// components
import Mark from "./Mark";
import { black } from "../style/colors";

const HighlightSearchedText = ({targetText, searchQuery, fontFamily, fontSize, color}) => {
    if (!searchQuery) return <></>;
    // split text according to position of search keyword
    let textArray = targetText.toLowerCase().split(searchQuery.toLowerCase());
    const fullString = textArray.join(`%!#${searchQuery}%!#`)

    textArray = fullString.split('%!#');

    // criteria to capitalize words
    const checkCapitalizedWord = (index) => {
        // if index is 0
        if (index === 0) return true;
        // previous element
        const previousElement = textArray[index - 1];
        // if first letter strings in product name matches searhQuery
        if (index === 1 && textArray[0] === "") return true;
        // check for match
        if (previousElement.endsWith(" ")) return true;

        // else return false
        return false;
    }

    // function to capitalize words after space
    capitalizeWordsAfterSpace = (str) => {
        // Split the string into an array of words
        const words = str.split(" ");
    
        // Capitalize each word after the first one
        for (let i = 1; i < words.length; i++) {
            words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
        }
    
        // Join the words back into a single string
        return words.join(" ");
    }

    return (
        <View style={style.searchTextWrapper}>
            { textArray.map((text, index) => {
                if (index % 2 === 0) {
                    return (
                        <Text 
                            key={index} 
                            style={[
                                style.searchedText,
                                fontFamily && fontFamily,
                                fontSize && fontSize,
                                color && color,
                                checkCapitalizedWord(index) && {textTransform: 'capitalize'},
                            ]}
                        >
                            {index !== 0 ? capitalizeWordsAfterSpace(text) : text}
                        </Text>
                    ) 
                } else {
                    return (
                        <Text
                            key={index}
                            style={[
                                style.searchedText,
                                fontFamily && fontFamily,
                                fontSize && fontSize,
                                color && color,
                                checkCapitalizedWord(index) && {textTransform: 'capitalize'},
                            ]}
                        >
                            <Mark key={index} fontSize={12}>{text?.toLowerCase()}</Mark>
                        </Text>
                    )
                }
            })}
        </View>
    )
}

// styles
const style = StyleSheet.create({
    searchTextWrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'baseline',
    },
    searchedText: {
        color: black,
        fontFamily: "mulish-semibold",
        fontSize: 12,
        flexWrap: "wrap",   
    },
})

export default HighlightSearchedText;