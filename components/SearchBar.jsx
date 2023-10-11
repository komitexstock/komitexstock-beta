// react native components
import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
// icons
import SearchIcon from "../assets/icons/SearchIcon";
import FilterIcon from "../assets/icons/FilterIcon";
import ClearSearch from "../assets/icons/ClearSearch";
// react hooks
import { useState } from "react";
// colors
import { background, black, inputLabel } from "../style/colors";
// components
import OpenFilterButton from "./OpenFilterButton";

const SearchBar = ({placeholder, searchQuery, setSearchQuery, filterParams, backgroundColor, disableFilter, openFilter}) => {

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
                    placeholderTextColor={inputLabel}
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
            { !disableFilter && 
                <OpenFilterButton
                    onPress={openFilter}
                    filterParams={filterParams}
                    filterSearch={true}
                    background={backgroundColor}
                />
            }
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
        backgroundColor: background,
    },
    searchInput: {
        fontFamily: "mulish-semibold",
        fontSize: 12,
        flex: 1,
        color: black,
    },
    filterButton: {
        backgroundColor: background,
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