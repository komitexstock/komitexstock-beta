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

const Merchants = ({navigation}) => {

    // logistics list
    const logisticsList = [
        {
            id: 1,
            logistics: "Komitex Logistics",
            imageUrl: '../assets/images/komitex.png',
            totalProducts: 17,
            totalStock: 25,
            lowStock: true,
            onPress: () => {
                navigation.navigate("AboutMerchant");
            },
            addNew: false 
        },
        {
            id: 2,
            logistics: "DHL",
            imageUrl: '../assets/images/dhl.png',
            totalProducts: 15,
            totalStock: 17,
            lowStock: false,
            onPress: () => {
                navigation.navigate("AboutMerchant");
            },
            addNew: false,
        },
        {
            id: 3,
            logistics: "Fedex",
            imageUrl: '../assets/images/fedex.png',
            totalProducts: 11,
            totalStock: 9,
            lowStock: false,
            onPress: () => {
                navigation.navigate("AboutMerchant");
            },
            addNew: false,
        },
        {
            id: 4,
            logistics: "UPS",
            imageUrl: '../assets/images/ups.png',
            totalProducts: 5,
            totalStock: 7,
            lowStock: false,
            onPress: () => {
                navigation.navigate("AboutMerchant");
            },
            addNew: false,
        },
    ];

    // page loading state
    const [pageLoading, setPageLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setPageLoading(false);
        }, 500);
    })

    //  render merchants stack
    return (
        <>
            {!pageLoading ? (
                <FlatList 
                    // disable vertical scroll indicator
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={
                        <View style={style.headerWrapper}>
                            <Header 
                                navigation={navigation} 
                                stackName={"Merchants"} 
                                iconFunction={null} 
                                icon={null} 
                                unpadded={true}
                            />
                        </View>
                    }
                    columnWrapperStyle={style.listContainer}
                    style={style.listWrapper}
                    keyExtractor={item => item.id}
                    data={logisticsList}
                    // render list items in two columns
                    numColumns={2}
                    renderItem={({ item }) => (
                        // logistics card
                        <BusinessCard
                            logistics={item?.logistics}
                            imageUrl={item?.imageUrl}
                            totalStock={item?.totalStock}
                            totalProducts={item?.totalProducts}
                            lowStock={item?.lowStock}
                            onPress={item?.onPress}
                            addNew={item?.addNew}
                        />
                    )}
                />
            ) : <LogisticsSkeleton />}
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
 
export default Merchants;