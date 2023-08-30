// react native components
import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
// icons
import SearchIcon from "../assets/icons/SearchIcon";
import FilterIcon from "../assets/icons/FilterIcon";
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
        <View style={style.searchBarWrapper}>
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
            <TouchableOpacity style={[style.filterButton, {backgroundColor: backgroundColor}]}>
                <FilterIcon />
            </TouchableOpacity>
        </View>
    );
}

// stylesheet
const style = StyleSheet.create({
    searchBarWrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 12,
        width: "100%",
        height: 40,
        marginBottom: 20
    },
    searchBar: {
        height: '100%',
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 10,
        gap: 10,
        borderRadius: 12,
        backgroundColor: "#f8f8f8",
    },
    searchInput: {
        fontFamily: "mulish-semibold",
        fontSize: 12,
        flex: 1,
        color: black,
    },
    filterButton: {
        backgroundColor: "#f8f8f8",
        width: 40,
        height: 40,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
    }
})
 
export default SearchBar;