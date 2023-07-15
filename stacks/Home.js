// react native components
import { 
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity, 
    TouchableWithoutFeedback, 
    Keyboard, 
    ScrollView,
    BackHandler
} from "react-native";
// icons
import NotificationIcon from "../assets/icons/NotificationIcon";
import SearchIcon from "../assets/icons/SearchIcon";
import QuickOrderIcon from "../assets/icons/QuickOrderIcon";
import QuickAnalyticsIcon from "../assets/icons/AnalyticsIcon";
import QuickInventoryIcon from "../assets/icons/QuickInventoryIcon";
import QuickWaybiillIcon from "../assets/icons/QuickWaybillIcon";
// components
import OrderListItem from "../components/OrderListItem";
import CustomBottomSheet from "../components/CustomBottomSheet";
import SearchBar from "../components/SearchBar";
import Header from "../components/Header";
import ModalButton from "../components/ModalButton";
// react hooks
import { useState, useRef, useEffect } from "react";
// bottomsheet component
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
// colors
import { accentLight, background, black, bodyText, greenLight, primaryColor, secondaryColor, white, yellowLight } from "../style/colors";


const Home = ({navigation}) => {
      
    // order list
    const orders = [
        {
            name: "John Doe",
            location: "New York",
            products: [
                { product_name: "Shirt", quantity: 2 },
                { product_name: "Jeans", quantity: 1 },
            ],
            datetime: "2023-03-15 09:30",
            id: "abc123",
            price: 15000,
            status: "Delivered",
            imageUrl: require('../assets/images/komitex.png'),
            newMessage: true,
            navigateToChat: () => {
                navigation.navigate("Chat", {
                    id: "abc123",
                    type: "order",
                    order: "Chat Message",
                    name: "Komitex",
                    imageUrl: require('../assets/images/komitex.png'),
                })
            },
        },
        {
            name: "Jane Smith",
            location: "London",
            products: [
                { product_name: "Shoes", quantity: 1 },
                { product_name: "Socks", quantity: 3 },
            ],
            datetime: "2023-02-22 14:45",
            id: "def456",
            price: 13000,
            status: "Pending",
            imageUrl: require('../assets/images/fedex.png'),
            newMessage: false,
            navigateToChat: () => {
                navigation.navigate("Chat", {
                    id: "def456",
                    type: "order",
                    order: "Chat Message",
                    name: "Fedex",
                    imageUrl: require('../assets/images/fedex.png'),
                })
            },
        },
        {
            name: "Michael Johnson",
            location: "Los Angeles",
            products: [
                { product_name: "Hat", quantity: 1 },
            ],
            datetime: "2023-01-10 12:15",
            id: "ghi789",
            price: 14000,
            status: "Dispatched",
            imageUrl: require('../assets/images/komitex.png'),
            newMessage: true,
            navigateToChat: () => {
                navigation.navigate("Chat", {
                    id: "ghi789",
                    type: "order",
                    order: "Chat Message",
                    name: "Komitex",
                    imageUrl: require('../assets/images/komitex.png'),
                })
            },
        },
        {
            name: "Robert Davis",
            location: "Berlin",
            products: [
                { product_name: "Sunglasses", quantity: 1 },
            ],
            datetime: "2023-03-01 11:10",
            id: "mno345",
            price: 16000,
            status: "Cancelled",
            imageUrl: require('../assets/images/dhl.png'),
            newMessage: true,
            navigateToChat: () => {
                navigation.navigate("Chat", {
                    id: "mno345",
                    type: "order",
                    order: "Chat Message",
                    name: "Dhl",
                    imageUrl: require('../assets/images/dhl.png'),
                })
            },
        },
        {
            name: "Sophia Brown",
            location: "Tokyo",
            products: [
                { product_name: "T-Shirt", quantity: 3 },
            ],
            datetime: "2023-02-14 16:55",
            id: "pqr678",
            price: 12000,
            status: "Rescheduled",
            imageUrl: require('../assets/images/ups.png'),
            newMessage: false,
            navigateToChat: () => {
                navigation.navigate("Chat", {
                    id: "pqr678",
                    type: "order",
                    order: "Chat Message",
                    name: "Ups",
                    imageUrl: require('../assets/images/ups.png'),
                })
            },
        }
    ];

    // state to control overlay
    const [showOverlay, setShowOverlay] = useState(false);

    // state to hold search query
    const [searchQuery, setSearchQuery] = useState("");

    // bottom sheet ref
    const bottomSheetModalRef = useRef(null);

    // close bottom sheet functiom
    const closeModal = () => {
        bottomSheetModalRef.current?.close();
        setShowOverlay(false);
    };
    
    // open bottom sheet functiom
    const openModal = () => {
        // reset modal parameters
        setModal({
            type: "Search",
            title: "",
            snapPointsArray: ["50%", "80%", "100%"],
            autoSnapAt: 2,
        });
        bottomSheetModalRef.current?.present();
        setShowOverlay(true);
    }

    const [modal, setModal] = useState({
        type: "Search",
        title: "",
        snapPointsArray: ["50%", "80%", "100%"],
        autoSnapAt: 2,
    })

    // useEffect to listen for onPress back button and close modal
    useEffect(() => {
        // function to run if back button is pressed
        const backAction = () => {
            // Run your function here
            if (showOverlay) {
                // if modal is open, close modal
                closeModal();
                return true;
            } else {
                // if modal isnt open simply navigate back
                return false;
            }
        };
    
        // listen for onPress back button
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction
        );
    
        return () => backHandler.remove();

    }, [showOverlay]);

    // useEffect(() => {
    //     setTimeout(() => {
    //         setModal({
    //             type: "Review",
    //             title: "",
    //             snapPointsArray: ["45%"],
    //             autoSnapAt: 0,
    //         });
    //         bottomSheetModalRef.current?.present();
    //         setShowOverlay(true);
    //     }, 5000);
    // }, [])

    // render Home page
    return (
        <>
            <TouchableWithoutFeedback 
                onPress={() => Keyboard.dismiss()}
            >
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={style.container}
                >
                    <View style={style.main}>
                        <View
                            style={style.homeScrollView}
                        >
                            <View style={style.homeWrapper}>
                                {/* Header Component */}
                                <Header
                                    navigation={navigation}
                                    stackName={
                                        <View style={style.headerTextContainer}>
                                            <Text style={style.paragraph}>Welcome back!</Text>
                                            <Text style={style.heading}> Abayomi Daniel</Text>
                                        </View>
                                    }
                                    removeBackArrow={true}
                                    unpadded={true}
                                    icon={<NotificationIcon />}
                                    iconFunction={() => {navigation.navigate("Notifications")}}
                                />
                                {/* button search bar to open search modal bottomsheet */}
                                <View style={style.searchWrapper}>
                                    <SearchIcon />
                                    <TouchableOpacity 
                                        style={style.searchInput}
                                        onPress={openModal}
                                    >
                                        <Text style={style.searchPlaceholder}>Search Komitex Stocks</Text>
                                    </TouchableOpacity>
                                </View>
                                <View>
                                    <Text style={style.callToActionText}>What do you want to do today?</Text>
                                </View>
                                {/* quick action buttons */}
                                <View style={style.quickAccessWrapper}>
                                    {/* quick order */}
                                    <TouchableOpacity 
                                        style={style.quickOrder}
                                        onPress={() => {navigation.navigate("SendOrder")}}
                                    >
                                        <QuickOrderIcon />
                                        <Text style={style.quickActionHeading}>Send an Order</Text>
                                        <Text style={style.quickActionParagraph}>Make fast deliveries to your customers</Text>
                                    </TouchableOpacity>
                                    {/* quick inventory */}
                                    <TouchableOpacity 
                                        style={style.quickInventory}
                                        onPress={() => {navigation.navigate("Inventory")}}    
                                    >
                                        <QuickInventoryIcon />
                                        <Text style={style.quickActionHeading}>Manage Inventory</Text>
                                        <Text style={style.quickActionParagraph}>Review and add to your stores inventory</Text>
                                    </TouchableOpacity>
                                    {/* quick waybill */}
                                    <TouchableOpacity 
                                        style={style.quickWaybill}
                                        onPress={() => {navigation.navigate("SendWaybill")}}
                                    >
                                        <QuickWaybiillIcon />
                                        <Text style={style.quickActionHeading}>Send Waybill</Text>
                                        <Text style={style.quickActionParagraph}>Restock your inventory with your preferred partner</Text>
                                    </TouchableOpacity>
                                    {/* quick analytics */}
                                    <TouchableOpacity 
                                        style={style.quickAnalytics}
                                        onPress={() => {navigation.navigate("Analytics")}}
                                    >
                                        <QuickAnalyticsIcon />
                                        <Text style={style.quickActionHeading}>View Analytics</Text>
                                        <Text style={style.quickActionParagraph}>Easily view your business growth and analytics</Text>
                                    </TouchableOpacity>
                                </View>
                                {/* recent orders */}
                                <View style={style.homeOrders}>
                                    <View style={style.homeOrdersHeader}>
                                        <Text style={style.homeOrdersHeading}>Recent Orders</Text>
                                        <TouchableOpacity
                                            onPress={() => {navigation.navigate("Orders")}}
                                            // onPress={() => {navigation.navigate("WriteReview")}}
                                        >
                                            <Text style={style.seeMore} >
                                                See more
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View
                                    style={style.ordersListWrapper}
                                >
                                    {/* order list max 5 items */}
                                    {orders.map((order, index) => (
                                        <OrderListItem key={order.id} item={order} index={index} length={orders.length} />
                                    ))}
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
            {/* bottomsheet */}
            <CustomBottomSheet
                bottomSheetModalRef={bottomSheetModalRef}
                setShowOverlay={setShowOverlay}
                showOverlay={showOverlay}
                closeModal={closeModal}
                snapPointsArray={modal.snapPointsArray}
                autoSnapAt={modal.autoSnapAt} // search bottomsheet auto snap at fullscreen
                sheetTitle={modal.title}
            >
                {modal.type === "Search" && 
                    <>
                        {/* text input search bar */}
                        <SearchBar 
                            placeholder={"Search Komitex Stocks"}
                            searchQuery={searchQuery}
                            setSearchQuery={setSearchQuery}
                            backgroundColor={background}
                        />
                        {/* search result order list */}
                        <BottomSheetScrollView style={style.orderSearchResults}>
                            {orders.map((order, index) => (
                                <OrderListItem key={order.id} item={order} index={index} length={orders.length} />
                            ))}
                        </BottomSheetScrollView>
                    </> 
                }

                {modal.type === "Review" && 
                    <View style={style.modalWrapper}>
                        <View style={style.modalTextWrapper}>
                            <Text style={style.modalHeading}>
                                Share your feedback with Komitex: 
                                What did you love and how can they improve?
                            </Text>
                            <Text style={style.modalParagraph}>
                                Tell us how Komitex delivery services were. 
                                Your feedback encourages logistics to do their best 
                                and helps future merchant know what to expect.
                            </Text>
                        </View>
                        <View style={style.modalButtonWrapper}>
                            <ModalButton
                                name={"Write a Review"}
                                onPress={() => {
                                    closeModal();
                                    navigation.navigate("WriteReview");
                                }}
                            />
                            <ModalButton
                                name={"Maybe Later"}
                                secondaryButton={true}
                                onPress={() => {
                                    closeModal();
                                }}
                            />

                        </View>
                    </View> 
                }
            </CustomBottomSheet>
        </>
    );
}

// stylesheet
const style = StyleSheet.create({
    modalWrapper: {
        width: "100%",
        height: "100%",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    modalTextWrapper: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 16,
        width: '100%',
        paddingHorizontal: 17,
    },
    modalHeading: { 
        fontFamily: 'mulish-bold',
        fontSize: 14,
        color: black,
        textAlign: 'center',
    },
    modalParagraph: { 
        fontFamily: 'mulish-regular',
        fontSize: 12,
        color: bodyText,
        textAlign: 'center',
    },
    modalButtonWrapper: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
        gap: 16,
    },
    homeScrollView: {
        minHeight:  "100%",
        paddingHorizontal: 20,
    },  
    homeWrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginBottom: 90,
    },
    header: {
        flexDirection: 'row',
        display: 'flex',
        justifyContent: 'space-between',
        height: 72,
        alignItems: 'center',
        width: '100%',
    },
    headerTextContainer: {
        display: 'flex',
        flexDirection:  'column',
    },
    paragraph: {
        fontFamily: 'mulish-regular',
        color: bodyText,
        fontSize: 10,
    },
    heading: {
        color: black,
        fontFamily: 'mulish-bold',
        fontSize: 12,
    },
    notificationWrapper: {
        width: 24,
        height: 24,
        backgroundColor: white,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
    },
    searchWrapper: {
        height: 40,
        width: "100%",
        backgroundColor: white,
        borderRadius: 10,
        paddingHorizontal: 12,
        paddingVertical: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        justifyContent: 'flex-start',
        marginBottom: 10,
    },
    searchInput: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },  
    searchPlaceholder: {
        fontFamily: 'mulish-regular',
        fontSize: 12,  
        color: bodyText,
    },
    callToActionText: {
        color: bodyText,
        fontFamily: 'mulish-bold',
        fontSize: 12,
        marginTop: 20,
        marginBottom: 10,
    },
    quickAccessWrapper: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 20,
        marginBottom: 15,
    },
    quickOrder: {
        width: '45%',
        height: 100,
        flexGrow: 1,
        backgroundColor: secondaryColor,
        borderRadius: 12,
        display: 'flex',
        flexDirection: 'column',
        padding: 15,
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    quickInventory: {
        width: '45%',
        height: 100,
        flexGrow: 1,
        backgroundColor: accentLight,
        borderRadius: 12,
        display: 'flex',
        flexDirection: 'column',
        padding: 15,
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    quickWaybill: {
        width: '45%',
        flexGrow: 1,
        height: 100,
        backgroundColor: yellowLight,
        borderRadius: 12,
        display: 'flex',
        flexDirection: 'column',
        padding: 15,
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    quickAnalytics: {
        flexGrow: 1,
        width: '45%',
        height: 100,
        backgroundColor: greenLight,
        borderRadius: 12,
        display: 'flex',
        flexDirection: 'column',
        padding: 15,
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    quickActionHeading: {
        color: black,
        fontFamily: 'mulish-semibold',
        fontSize: 12,
    },
    quickActionParagraph: {
        color: bodyText,
        fontFamily: 'mulish-regular',
        fontSize: 10,
    },
    homeOrders: {
        width: "100%",
    },
    homeOrdersHeader: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: "100%",
        height: 50,
    },
    homeOrdersHeading: {
        fontFamily: 'mulish-bold',
        color: bodyText,
    },
    seeMore: {
        fontFamily: 'mulish-medium',
        color: primaryColor,
    },
    ordersListWrapper: {
        height: "100%",
        width: "100%",
    }
})
 
export default Home;