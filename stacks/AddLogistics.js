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

    // to store search query
    const [searchQuery, setSearchQuery] = useState("");

    // state to indicate page loading
    const [pageLoading, setPageLoading] = useState(true);

    setTimeout(() => {
        setPageLoading(false);
    }, 500);

    // logistics list
    const logisticsList = [
        {
            business_id: 1,
            business_name: "Komitex Logistics",
            banner_image: 'https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/banners%2Fkomitex.png?alt=media&token=a8039272-66b6-4e24-8ab1-a4dfd40503f8',
            verified: true,
            destinations: 14,
            rating: 4.9,
            onPress: () => {navigation.navigate("LogisticsDetails", {
                business_id: 1,
                business_name: "Komitex Logistics",
                banner_image: 'https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/banners%2Fkomitex.png?alt=media&token=a8039272-66b6-4e24-8ab1-a4dfd40503f8',
                verified: true,
            })}
        },
        {
            business_id: 2,
            business_name: "DHL",
            banner_image: 'https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/banners%2Fdhl.png?alt=media&token=e113f106-0eaf-420e-9fe4-488cb8e6c26d',
            verified: true,
            destinations: 28,
            rating: 4.2,
            onPress: () => {navigation.navigate("LogisticsDetails", {
                business_id: 2,
                business_name: "DHL",
                banner_image: 'https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/banners%2Fdhl.png?alt=media&token=e113f106-0eaf-420e-9fe4-488cb8e6c26d',
                verified: true,
            })}
        },
        {
            business_id: 3,
            business_name: "Fedex",
            banner_image: 'https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/banners%2Ffedex.png?alt=media&token=d943aea6-37ec-4f61-a589-01ad7bdd1299',
            verified: true,
            destinations: 33,
            rating: 4.0,
            onPress: () => {navigation.navigate("LogisticsDetails", {
                business_id: 3,
                business_name: "Fedex",
                banner_image: 'https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/banners%2Ffedex.png?alt=media&token=d943aea6-37ec-4f61-a589-01ad7bdd1299',
                verified: true,
            })}
        },
        {
            business_id: 4,
            business_name: "UPS",
            banner_image: 'https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/banners%2Fups.png?alt=media&token=37224ee1-4460-4fec-a39b-3af040b65fe0',
            verified: false,
            destinations: 14,
            rating: 3.5,
            onPress: () => {navigation.navigate("LogisticsDetails", {
                business_id: 4,
                business_name: "UPS",
                banner_image: 'https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/banners%2Fups.png?alt=media&token=37224ee1-4460-4fec-a39b-3af040b65fe0',
                verified: false,
            })}
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
                                {/* paragaraph */}
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
                        keyExtractor={item => item.business_id}
                        data={logisticsList}
                        numColumns={2}
                        // render select logistics card
                        renderItem={({ item }) => (
                            <SelectLogisticsCard
                                logistics={item.business_name}
                                imageUrl={item.banner_image}
                                destinations={item.destinations}
                                rating={item.rating}
                                verified={item.verified}
                                onPress={item.onPress}
                            />
                        )}
                    />
                </TouchableWithoutFeedback>
            ) : <AddLogisticsSkeleton /> /* Add logistics skeleton */} 
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