// react native components
import { 
    View, 
    Text, 
    FlatList, 
    TouchableWithoutFeedback,
    StyleSheet,
    Keyboard
} from "react-native";
// react hooks
import { useState } from "react";
// components
import Header from "../components/Header";
import SelectLogisticsCard from "../components/SelectLogisticsCard";
import SearchBar from "../components/SearchBar";
// colors
import { bodyText, white, background } from "../style/colors";
// skeleton
import AddLogisticsSkeleton from "../skeletons/AddLogisticsSkeleton";

const AddLogistics = ({navigation}) => {

    const [searchQuery, setSearchQuery] = useState("");

    // state to indicate page loading
    const [pageLoading, setPageLoading] = useState(true);

    setTimeout(() => {
        setPageLoading(false);
    }, 500);

    // logistics list
    const logisticsList = [
        {
            id: 1,
            logistics: "Komitex Logistics",
            imageUrl: '../assets/images/komitex.png',
            verified: true,
            destinations: 14,
            rating: 4.9,
            onPress: () => {navigation.navigate("LogisticsDetails")}
        },
        {
            id: 2,
            logistics: "DHL",
            imageUrl: '../assets/images/dhl.png',
            verified: true,
            destinations: 28,
            rating: 4.2,
            onPress: () => {navigation.navigate("LogisticsDetails")}
        },
        {
            id: 3,
            logistics: "Fedex",
            imageUrl: '../assets/images/fedex.png',
            verified: true,
            destinations: 33,
            rating: 4.0,
            onPress: () => {navigation.navigate("LogisticsDetails")}
        },
        {
            id: 4,
            logistics: "UPS",
            imageUrl: '../assets/images/ups.png',
            verified: false,
            destinations: 14,
            rating: 3.5,
            onPress: () => {navigation.navigate("LogisticsDetails")}
        },
    ];

    // render AddLogistics page
    return (
        <>
            {!pageLoading ? (
                <TouchableWithoutFeedback 
                    style={{
                        flex: 1, 
                    }}
                    // onclick dismiss keyboard
                    onPress={() => Keyboard.dismiss()}
                >
                    <FlatList 
                        // remove vertical scroll indicator 
                        showsVerticalScrollIndicator={false}
                        ListHeaderComponent={
                            <View style={style.headerWrapper}>
                                {/* header component */}
                                <Header
                                    navigation={navigation} 
                                    stackName={"Add Logistics"} 
                                    iconFunction={() => {}} 
                                    icon={null}
                                    unpadded={true}
                                />
                                <Text style={style.headingText}>
                                    Select a preferred logistics partner for efficient 
                                    inventory management and timely order fulfillment.
                                </Text>
                                {/* logistics search bar */}
                                <SearchBar
                                    placeholder={"Search for a logistics or location"}
                                    searchQuery={searchQuery}
                                    setSearchQuery={setSearchQuery}
                                    backgroundColor={white}
                                    disableFilter={true}
                                />
                            </View>
                        }
                        columnWrapperStyle={style.listContainer}
                        style={style.listWrapper}
                        keyExtractor={item => item.id}
                        data={logisticsList}
                        numColumns={2}
                        renderItem={({ item }) => (
                            <SelectLogisticsCard
                                logistics={item.logistics}
                                imageUrl={item.imageUrl}
                                destinations={item.destinations}
                                rating={item.rating}
                                verified={item.verified}
                                onPress={item.onPress}
                            />
                        )}
                    />
                </TouchableWithoutFeedback>
            ) : <AddLogisticsSkeleton />}

        </>
    );
}

// stylesheet
const style = StyleSheet.create({
    listWrapper: {
        width: "100%",
        height: "100%",
        padding: 20,
        paddingTop: 0,
        backgroundColor: background,
    },
    listContainer: {
        display: "flex",
        flexDirection: "row",
        gap: 16,
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 16,
    },
    headingText: {
        fontFamily: "mulish-medium",
        fontSize: 12,
        color: bodyText,
        marginBottom: 24,
        marginTop: 8,
    },
})
 
export default AddLogistics;