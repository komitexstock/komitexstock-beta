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
import { useState, useRef } from "react";
// components
import Header from "../components/Header";
import SelectLogisticsCard from "../components/SelectLogisticsCard";
import SearchBar from "../components/SearchBar";
import ModalButton from "../components/ModalButton";
import PopUpBottomSheet from "../components/PopUpBottomSheet";
import SuccessPrompt from "../components/SuccessPrompt";
// colors
import { bodyText, black, white, background } from "../style/colors";

const AddLogistics = ({navigation}) => {

    const [searchQuery, setSearchQuery] = useState("");

    // popUp modal ref
    const popUpBottomSheetModalRef = useRef(null);

    // close popup modal bottomsheet function
    const closePopUpModal = () => {
        popUpBottomSheetModalRef.current?.close();
    };
    // function to open bottom sheet modal
    const openPopUpModal = () => {
        popUpBottomSheetModalRef.current?.present();
    }

    // logistics list
    const logisticsList = [
        {
            id: 1,
            logistics: "Komitex Logistics",
            imageUrl: require('../assets/images/komitex.png'),
            verified: true,
            destinations: 14,
            rating: 4.9,
            onPress: () => {navigation.navigate("LogisticsDetails")}
        },
        {
            id: 2,
            logistics: "DHL",
            imageUrl: require('../assets/images/dhl.png'),
            verified: true,
            destinations: 28,
            rating: 4.2,
            onPress: () => {navigation.navigate("LogisticsDetails")}
        },
        {
            id: 3,
            logistics: "Fedex",
            imageUrl: require('../assets/images/fedex.png'),
            verified: true,
            destinations: 33,
            rating: 4.0,
            onPress: () => {navigation.navigate("LogisticsDetails")}
        },
        {
            id: 4,
            logistics: "UPS",
            imageUrl: require('../assets/images/ups.png'),
            verified: false,
            destinations: 14,
            rating: 3.5,
            onPress: () => {navigation.navigate("LogisticsDetails")}
        },
    ];

    // render AddLogistics page
    return (
        <>
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
            {/* pop up modal */}
            <PopUpBottomSheet
                bottomSheetModalRef={popUpBottomSheetModalRef}
                closeModal={closePopUpModal}
                snapPointsArray={["40%"]}
                autoSnapAt={0}
                sheetTitle={false}
                sheetSubtitle={false}
            >   
                <View style={style.popUpContent}>
                    <SuccessPrompt />
                    <Text style={style.popUpHeading}>
                        Komitex Succesfully Added
                    </Text>
                    <Text style={style.popUpParagraph}>
                        Hi Raymond, You have successfully linked your store to Komitex Logistics
                    </Text>
                    <ModalButton
                        name={"Done"}
                        onPress={() => {navigation.navigate("Inventory")}}
                    />
                </View>
            </PopUpBottomSheet>
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
        color: black,
    },
    popUpParagraph: {
        fontSize: 12,
        fontFamily: 'mulish-regular',
        textAlign: 'center',
        color: bodyText,
    },
})
 
export default AddLogistics;