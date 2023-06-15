import { 
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity, 
    TouchableWithoutFeedback, 
    Keyboard, 
    ScrollView,
} from "react-native";
import NotificationIcon from "../assets/icons/NotificationIcon";
import SearchIcon from "../assets/icons/SearchIcon";
import QuickOrderIcon from "../assets/icons/QuickOrderIcon";
import QuickAnalyticsIcon from "../assets/icons/QuickAnalyticsIcon";
import QuickInventoryIcon from "../assets/icons/QuickInventoryIcon";
import QuickWaybiillIcon from "../assets/icons/QuickWaybillIcon";
import Orders from "../components/Orders";
import CustomBottomSheet from "../components/CustomBottomSheet";
import SearchBar from "../components/SearchBar";
import { useState, useRef } from "react";


const Home = ({navigation}) => {
      
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
        }
    ]

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
        bottomSheetModalRef.current?.present();
        setShowOverlay(true);
        Keyboard.dismiss();
    }

    return (
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
                            <View style={style.header}>
                                <View style={style.headerTextContainer}>
                                    <Text style={style.paragraph}>Welcome back!</Text>
                                    <Text style={style.heading}> Abayomi Daniel</Text>
                                </View>
                                {/* navigate to notification stack */}
                                <TouchableOpacity 
                                    style={style.notificationWrapper}
                                    onPress={() => {navigation.navigate("Notifications")}}
                                >
                                    <NotificationIcon />
                                </TouchableOpacity>
                            </View>
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
                            <View style={style.quickAccessWrapper}>
                                <TouchableOpacity 
                                    style={style.quickOrder}
                                    onPress={() => {navigation.navigate("SendOrder")}}
                                >
                                    <QuickOrderIcon />
                                    <Text style={style.quickActionHeading}>Send an Order</Text>
                                    <Text style={style.quickActionParagraph}>Make fast deliveries to your customers</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    style={style.quickInventory}
                                    onPress={() => {navigation.navigate("Inventory")}}    
                                >
                                    <QuickInventoryIcon />
                                    <Text style={style.quickActionHeading}>Manage Inventory</Text>
                                    <Text style={style.quickActionParagraph}>Review and add to your stores inventory</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    style={style.quickWaybill}
                                    onPress={() => {navigation.navigate("SendWaybill")}}
                                >
                                    <QuickWaybiillIcon />
                                    <Text style={style.quickActionHeading}>Send Waybill</Text>
                                    <Text style={style.quickActionParagraph}>Restock your inventory with your preferred partner</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    style={style.quickAnalytics}
                                    onPress={() => {navigation.navigate("Analytics")}}
                                >
                                    <QuickAnalyticsIcon />
                                    <Text style={style.quickActionHeading}>View Analytics</Text>
                                    <Text style={style.quickActionParagraph}>Easily view your business growth and analytics</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={style.homeOrders}>
                                <View style={style.homeOrdersHeader}>
                                    <Text style={style.homeOrdersHeading}>Recent Orders</Text>
                                    <TouchableOpacity
                                        onPress={() => {navigation.navigate("Orders")}}
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
                                {orders.map((order, index) => (
                                    <Orders key={order.id} item={order} index={index} orders={orders} />
                                ))}
                            </View>
                        </View>
                    </View>
                    <CustomBottomSheet
                        bottomSheetModalRef={bottomSheetModalRef}
                        setShowOverlay={setShowOverlay}
                        showOverlay={showOverlay}
                        closeModal={closeModal}
                        snapPointsArray={["50%", "90%"]}
                        autoSnapAt={1}
                        sheetTitle={""}
                    >
                        <SearchBar 
                            placeholder={"Search Komitex Stocks"}
                            searchQuery={searchQuery}
                            setSearchQuery={setSearchQuery}
                        />
                    </CustomBottomSheet>
                </View>
            </ScrollView>
        </TouchableWithoutFeedback>
    );
}

const style = StyleSheet.create({
    main: {
    },
    container: {
        
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
        // backgroundColor: 'red',
        alignItems: 'center',
        width: '100%',
    },
    headerTextContainer: {
        display: 'flex',
        flexDirection:  'column',
    },
    paragraph: {
        fontFamily: 'mulish-regular',
        color: 'rgba(34, 34, 34, 0.6)',
        fontSize: 10,
    },
    heading: {
        color: 'rgb(34, 34, 34)',
        fontFamily: 'mulish-bold',
        fontSize: 12,
    },
    notificationWrapper: {
        width: 24,
        height: 24,
        backgroundColor: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
    },
    searchWrapper: {
        height: 40,
        width: "100%",
        backgroundColor: '#ffffff',
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
        color: "rgba(34, 34, 34, 0.6)",
    },
    callToActionText: {
        color: 'rgba(34, 34, 34, 0.8)',
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
        backgroundColor: 'rgba(7, 66, 124, 0.05)',
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
        backgroundColor: 'rgba(230, 109, 28, 0.05)',
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
        backgroundColor: 'rgba(255, 255, 0, 0.05)',
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
        backgroundColor: 'rgba(3, 152, 85, 0.05)',
        borderRadius: 12,
        display: 'flex',
        flexDirection: 'column',
        padding: 15,
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    quickActionHeading: {
        color: 'rgba(34, 34, 34, 1)',
        fontFamily: 'mulish-bold',
        fontSize: 12,
    },
    quickActionParagraph: {
        color: 'rgba(34, 34, 34, 0.6)',
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
        color: 'rgba(34, 34, 34, 0.8)',
    },
    seeMore: {
        fontFamily: 'mulish-bold',
        color: '#07427C',
    },
    ordersListWrapper: {
        height: "100%",
    }
})
 
export default Home;