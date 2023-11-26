// react native components
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from "react-native";
// icons
import SearchIcon from "../assets/icons/SearchIcon";
import ClearSearch from "../assets/icons/ClearSearch";
// react hooks
// colors
import { background, black, bodyText, inputLabel } from "../style/colors";
// components
import OpenFilterButton from "./OpenFilterButton";

const SearchBar = ({placeholder, searchQuery, setSearchQuery, filterParams, backgroundColor, disableFilter, openFilter, button, onPress}) => {

    // function to update search query
    const handleSearchQuery = (text) => {
        setSearchQuery(text);
    }

    // render SearchBar component
    return (
        <View style={style.searchBarWrapper}>
            <View 
                style={[
                    style.searchBar, 
                    button && {paddingVertical: 0},
                    {backgroundColor: backgroundColor}
                ]}
            >
                {/* search icon */}
                <SearchIcon />
                {/* search bar text input */}
                { !button ? (
                    <TextInput 
                        style={style.searchInput}
                        placeholder={placeholder}
                        inputMode="search"
                        value={searchQuery}
                        onChangeText={handleSearchQuery}
                        placeholderTextColor={inputLabel}
                    />
                ) : (
                    <TouchableOpacity 
                        onPress={onPress}
                        style={style.searchButton}
                    >
                        <Text style={style.searchButtonText}>{placeholder}</Text>
                    </TouchableOpacity>
                )}
                {/* clear search button, only visible when search bar isn't empty */}
                { searchQuery && (
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
    },
    searchButton: {
        flex: 1,
        height: "100%",
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
    },
    searchButtonText: {
        color: inputLabel,
        fontSize: 12,
        fontFamily: 'mulish-semibold',
        marginBottom: 1,
    }
})
 
export default SearchBar;