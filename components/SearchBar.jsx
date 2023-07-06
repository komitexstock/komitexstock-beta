// react native components
import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
// icons
import SearchIcon from "../assets/icons/SearchIcon";
import ClearSearch from "../assets/icons/ClearSearch";
// react hooks
import { useState } from "react";
// colors
import { black } from "../style/colors";

const SearchBar = ({placeholder, searchQuery, setSearchQuery, backgroundColor}) => {

    // function to update search query
    const handleSearchQuery = (text) => {
        setSearchQuery(text);
    }

    // render SearchBar component
    return (
        <View style={[style.searchBar, {backgroundColor: backgroundColor}]}>
            {/* search icon */}
            <SearchIcon />
            {/* search bar text input */}
            <TextInput 
                style={style.searchInput}
                placeholder={placeholder}
                inputMode="search"
                value={searchQuery}
                onChangeText={handleSearchQuery}
                placeholderTextColor={"#837f7f"}
            />
            {/* clear search button, only visible when search bar isn't empty */}
            { searchQuery !== '' && (
                <TouchableOpacity
                    style={style.clearSearch}
                    onPress={() => setSearchQuery("")}
                >
                    <ClearSearch />
                </TouchableOpacity>
            )}
        </View>
    );
}

// stylesheet
const style = StyleSheet.create({
    searchBar: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: "100%",
        height: 40,
        paddingHorizontal: 12,
        paddingVertical: 10,
        gap: 10,
        borderRadius: 12,
        backgroundColor: "#f8f8f8",
        marginBottom: 20
    },
    searchInput: {
        fontFamily: "mulish-semibold",
        fontSize: 12,
        flex: 1,
        color: black,
    },
})
 
export default SearchBar;