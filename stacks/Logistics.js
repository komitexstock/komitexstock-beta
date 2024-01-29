// react native
import {
    FlatList,
    StyleSheet,
    View,
} from "react-native";
// component
import Header from "../components/Header";
import BusinessCard from "../components/BusinessCard";
// color
import { black, bodyText, white, background } from "../style/colors";
// recat hooks
import { useState, useEffect } from "react";
// skeleton screen
import LogisticsSkeleton from "../skeletons/LogisticsSkeleton";

const Logistics = ({navigation}) => {

    // logistics list
    const logisticsList = [
        {
            business_id: 1,
            business_name: "Komitex Logistics",
            banner_image: 'https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/banners%2Fkomitex.png?alt=media&token=a8039272-66b6-4e24-8ab1-a4dfd40503f8',
            verified: true,
            totalLocations: 17,
            totalStock: 25,
            lowStock: true,
            onPress: () => {
                navigation.navigate("AboutLogistics", {
                    business_id: 1,
                    business_name: "Komitex Logistics",
                    banner_image: 'https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/banners%2Fkomitex.png?alt=media&token=a8039272-66b6-4e24-8ab1-a4dfd40503f8',
                    verified: true,
                })
            },
            deactivated: false, 
            addNew: false 
        },
        {
            business_id: 2,
            business_name: "DHL",
            banner_image: 'https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/banners%2Fdhl.png?alt=media&token=e113f106-0eaf-420e-9fe4-488cb8e6c26d',
            verified: true,
            totalLocations: 15,
            totalStock: 17,
            lowStock: false,
            onPress: () => {
                navigation.navigate("AboutLogistics", {
                    business_id: 2,
                    business_name: "DHL",
                    banner_image: 'https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/banners%2Fdhl.png?alt=media&token=e113f106-0eaf-420e-9fe4-488cb8e6c26d',
                    verified: true,
                })
            },
            deactivated: false, 
            addNew: false,
        },
        {
            business_id: 3,
            business_name: "Fedex",
            banner_image: 'https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/banners%2Ffedex.png?alt=media&token=d943aea6-37ec-4f61-a589-01ad7bdd1299',
            verified: true,
            totalLocations: 11,
            totalStock: 9,
            lowStock: false,
            onPress: () => {
                navigation.navigate("AboutLogistics", {
                    business_id: 3,
                    business_name: "Fedex",
                    banner_image: 'https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/banners%2Ffedex.png?alt=media&token=d943aea6-37ec-4f61-a589-01ad7bdd1299',
                    verified: true,
                })
            },
            deactivated: false, 
            addNew: false,
        },
        {
            business_id: 4,
            business_name: "UPS",
            banner_image: 'https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/banners%2Fups.png?alt=media&token=37224ee1-4460-4fec-a39b-3af040b65fe0',
            verified: false,
            totalLocations: 5,
            totalStock: 7,
            lowStock: false,
            onPress: () => {
                navigation.navigate("AboutLogistics", {
                    business_id: 4,
                    business_name: "UPS",
                    banner_image: 'https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/banners%2Fups.png?alt=media&token=37224ee1-4460-4fec-a39b-3af040b65fe0',
                    verified: false,
                })
            },
            deactivated: true, 
            addNew: false,
        },
        {
            id: 5,
            logistics: null,
            imageUrl: null,
            totalLocations: null,
            totalStock: null,
            lowStock: false,
            onPress: () => {
                navigation.navigate("AddLogistics")
            },
            addNew: true
        }
    ];

    // page loading state
    const [pageLoading, setPageLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setPageLoading(false);
        }, 500);
    })

    //  render Logistics stack
    return (
        <>
            {!pageLoading ? (
                <FlatList 
                    // disable vertical scroll indicator
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={
                        <View style={style.headerWrapper}>
                            {/* header components */}
                            <Header 
                                navigation={navigation} 
                                stackName={"Logistics"} 
                                iconFunction={null} 
                                icon={null} 
                                unpadded={true}
                            />
                        </View>
                    }
                    columnWrapperStyle={style.listContainer}
                    style={style.listWrapper}
                    // extract data key/unique id
                    keyExtractor={item => item.business_id}
                    // data to be iterated
                    data={logisticsList}
                    // render list items in two columns
                    numColumns={2}
                    renderItem={({ item }) => (
                        // logistics card item
                        <BusinessCard
                            businessName={item?.business_name}
                            bannerImage={item?.banner_image}
                            totalLocations={item?.totalLocations}
                            totalStock={item?.totalStock}
                            lowStock={item?.lowStock}
                            onPress={item?.onPress}
                            addNew={item?.addNew}
                            deactivated={item?.deactivated}
                        />
                    )}
                />
            ) : <LogisticsSkeleton /> /* logistics loading skeleton */}
        </>
    );
}

// stylesheet
const style = StyleSheet.create({
    headerWrapper: {
        paddingBottom: 20,
    },
    listWrapper: {
        width: "100%",
        minHeight: "100%",
        paddingHorizontal: 20,
        marginBottom: 70,
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
    addNewLogistics: {
        minWidth: "40%",
        maxWidth: "50%",
        height: 180,
        backgroundColor: white,
        borderRadius: 12,
        flex: 1,
        padding: 12,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "flex-start",
    },
    popUpContent: {
        flex: 1,
        height: "100%",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    popUpHeading: {
        fontSize: 16,
        fontFamily: 'mulish-bold',
        textAlign: 'center',
        color:  black,
    },
    popUpParagraph: {
        fontSize: 12,
        fontFamily: 'mulish-medium',
        textAlign: 'center',
        color: bodyText,
    },
    popUpButtonWrapper: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: '100%',
    }
})
 
export default Logistics;