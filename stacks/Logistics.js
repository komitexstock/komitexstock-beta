// react native
import {
    FlatList,
    StyleSheet,
    View,
} from "react-native";
// component
import Header from "../components/Header";
import LogisticsCard from "../components/LogisticsCard";
// color
import { black, bodyText, white } from "../style/colors";

const Logistics = ({navigation}) => {

    // logistics list
    const logisticsList = [
        {
            id: 1,
            logistics: "Komitex Logistics",
            imageUrl: require('../assets/images/komitex.png'),
            totalLocations: 17,
            totalStock: 25,
            lowStock: true,
            onPress: () => {
                navigation.navigate("DeactivateLogistics");
            },
            addNew: false 
        },
        {
            id: 2,
            logistics: "DHL",
            imageUrl: require('../assets/images/dhl.png'),
            totalLocations: 15,
            totalStock: 17,
            lowStock: false,
            onPress: () => {
                navigation.navigate("DeactivateLogistics");
            },
            addNew: false,
        },
        {
            id: 3,
            logistics: "Fedex",
            imageUrl: require('../assets/images/fedex.png'),
            totalLocations: 11,
            totalStock: 9,
            lowStock: false,
            onPress: () => {
                navigation.navigate("DeactivateLogistics");
            },
            addNew: false,
        },
        {
            id: 4,
            logistics: "UPS",
            imageUrl: require('../assets/images/ups.png'),
            totalLocations: 5,
            totalStock: 7,
            lowStock: false,
            onPress: () => {
                navigation.navigate("DeactivateLogistics");
            },
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
                navigation.navigate("AddLogistics");
            },
            addNew: true
        }
    ];

    //  render Logistics stack
    return (
        <>
            <FlatList 
                // disable vertical scroll indicator
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={
                    <View style={style.headerWrapper}>
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
                keyExtractor={item => item.id}
                data={logisticsList}
                // render list items in two columns
                numColumns={2}
                renderItem={({ item }) => (
                    // logistics card
                    <LogisticsCard
                        logistics={item.logistics}
                        imageUrl={item.imageUrl}
                        totalLocations={item.totalLocations}
                        totalStock={item.totalStock}
                        lowStock={item.lowStock}
                        onPress={item.onPress}
                        addNew={item.addNew}
                    />
                )}
            />
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
        height: "100%",
        paddingHorizontal: 20,
        marginBottom: 70,
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