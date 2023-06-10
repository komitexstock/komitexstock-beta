import SearchIcon from "../assets/icons/SearchIcon";
import ClearSearch from "../assets/icons/ClearSearch";
import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";

const SearchBar = ({placeholder, searchQuery, setSearchQuery}) => {

    const handleSearchQuery = (text) => {
        setSearchQuery(text);
    }

    return (
        <View style={style.searchBar}>
            <SearchIcon />
            <TextInput 
                style={style.searchInput}
                placeholder={placeholder}
                inputMode="search"
                value={searchQuery}
                onChangeText={handleSearchQuery}
                placeholderTextColor={"#837f7f"}
            />
            <TouchableOpacity
                style={style.clearSearch}
                onPress={() => setSearchQuery("")}
            >
                <ClearSearch />
            </TouchableOpacity>
        </View>
    );
}

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
    },
})
 
export default SearchBar;