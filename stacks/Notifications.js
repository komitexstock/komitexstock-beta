// react native component
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    BackHandler
} from "react-native";
// icons
import FilterIcon from "../assets/icons/FilterIcon";
import NotificationLargeIcon from "../assets/icons/NotificationLargeIcon";
// components
import OrderListItem from "../components/OrderListItem";
import Header from "../components/Header";
// react hooks
import { useState, useRef, useEffect } from "react";
// colors and global style
import { background, black, bodyText } from "../style/colors";
import { windowHeight } from "../utils/helpers";

const Notifications = ({navigation}) => {

    // order list 1
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
            imageUrl: '../assets/images/fedex..png',
            navigateToChat: () => {
                navigation.navigate("Chat", {
                    id: "abc123",
                    type: "Order",
                    order: "Chat Message",
                    name: "Fedex",
                    imageUrl: '../assets/images/fedex..png',
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
            imageUrl: '../assets/images/komitex..png',
            navigateToChat: () => {
                navigation.navigate("Chat", {
                    id: "abc123",
                    type: "Order",
                    order: "Chat Message",
                    name: "Komitex",
                    imageUrl: '../assets/images/komitex..png',
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
            imageUrl: '../assets/images/dhl..png',
            navigateToChat: () => {
                navigation.navigate("Chat", {
                    id: "abc123",
                    type: "Order",
                    order: "Chat Message",
                    name: "DHL",
                    imageUrl: '../assets/images/dhl..png',
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
            status: "Canceled",
            imageUrl: '../assets/images/komitex..png',
            navigateToChat: () => {
                navigation.navigate("Chat", {
                    id: "abc123",
                    type: "Order",
                    order: "Chat Message",
                    name: "Komitex",
                    imageUrl: '../assets/images/komitex..png',
                })
            },
        },
    ];

    // order list 2
    const orders1 = [
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
			imageUrl: '../assets/images/dhl..png',
            navigateToChat: () => {
                navigation.navigate("Chat", {
                    id: "abc123",
                    type: "Order",
                    order: "Chat Message",
                    name: "DHL",
                    imageUrl: '../assets/images/dhl..png',
                })
            },
        },
        {
			name: "Sarah Johnson",
			location: "Chicago",
			products: [
				{ product_name: "Tennis Shoes", quantity: 1 },
			],
			datetime: "2023-06-01 11:20",
			id: "789def",
			price: 15500,
			status: "Delivered",
			imageUrl: '../assets/images/ups..png',
            navigateToChat: () => {
                navigation.navigate("Chat", {
                    id: "abc123",
                    type: "Order",
                    order: "Chat Message",
                    name: "UPS",
                    imageUrl: '../assets/images/ups..png',
                })
            },
        },
        {
			name: "Matthew Wilson",
			location: "Sydney",
			products: [
				{ product_name: "Backpack", quantity: 1 },
				{ product_name: "Water Bottle", quantity: 1 },
			],
			datetime: "2023-05-20 14:30",
			id: "012ghi",
			price: 17000,
			status: "Pending",
			imageUrl: '../assets/images/komitex..png',
            navigateToChat: () => {
                navigation.navigate("Chat", {
                    id: "abc123",
                    type: "Order",
                    order: "Chat Message",
                    name: "Komitex",
                    imageUrl: '../assets/images/komitex..png',
                })
            },
        },
        {
			name: "Sophie Lee",
			location: "Seoul",
			products: [
				{ product_name: "Sneakers", quantity: 1 },
			],
			datetime: "2023-06-03 16:10",
			id: "345jkl",
			price: 12500,
			status: "Dispatched",
			imageUrl: '../assets/images/komitex..png',
            navigateToChat: () => {
                navigation.navigate("Chat", {
                    id: "abc123",
                    type: "Order",
                    order: "Chat Message",
                    name: "Komitex",
                    imageUrl: '../assets/images/komitex..png',
                })
            },
        },
        {
			name: "Daniel Brown",
			location: "London",
			products: [
				{ product_name: "Joggers", quantity: 1 },
				{ product_name: "Hoodie", quantity: 1 },
			],
			datetime: "2023-05-12 09:45",
			id: "678mno",
			price: 19500,
			status: "Delivered",
			imageUrl: '../assets/images/komitex..png',
            navigateToChat: () => {
                navigation.navigate("Chat", {
                    id: "abc123",
                    type: "Order",
                    order: "Chat Message",
                    name: "Komitex",
                    imageUrl: '../assets/images/komitex..png',
                })
            },
        },
        {
			name: "Emma Davis",
			location: "Paris",
			products: [
				{ product_name: "Skateboard", quantity: 1 },
			],
			datetime: "2023-06-02 13:15",
			id: "901pqr",
			price: 8000,
			status: "Canceled",
			imageUrl: '../assets/images/fedex..png',
            navigateToChat: () => {
                navigation.navigate("Chat", {
                    id: "abc123",
                    type: "Order",
                    order: "Chat Message",
                    name: "Fedex",
                    imageUrl: '../assets/images/fedex..png',
                })
            },
        },
    ];

    // bottomsheet overlay
    const [showOverlay, setShowOverlay] = useState(false);

    // use effect to close modal
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
    
    // bottomsheet ref
    const bottomSheetModalRef = useRef(null);

    // close bottom sheet modal function
    const closeModal = () => {
        bottomSheetModalRef.current?.close();
        setShowOverlay(false);
    };

    // open bottom sheet modal function
    const openModal = () => {
      bottomSheetModalRef.current?.present();
      setShowOverlay(true);
    }

    // filter buttons in filter notifications bottomsheef
    const filterButtons = [
      {
        id: 1,
        title: "Status",
        buttons: [
			{
				id: 1,
				text: "All",
				selected: true,
			},
			{
				id: 2,
				text: "Pending",
				selected: false,
			},
			{
				id: 3,
				text: "Delivered",
				selected: false,
			},
			{
				id: 4,
				text: "Cancelled",
				selected: false,
			},
        ]
      },
      {
        id: 2,
        title: "Sort by",
        buttons: [
			{
				id: 1,
				text: "Time",
				selected: true,
			},
			{
				id: 2,
				text: "Logistics",
				selected: false,
			},
			{
				id: 3,
				text: "Customer Name",
				selected: false,
			},
        ]
      }
    ]

    // render Notifications page
    return (
        <>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={style.main}>
                    {/* Header */}
                    <Header 
                        navigation={navigation} 
                        stackName={"Notifications"} 
                        iconFunction={openModal} 
                        icon={<FilterIcon />} 
                        iconExist={true} 
                        unpadded={true}
                    />
                    {/* Date */}
                    <View style={style.dateWrapper}>
                        <Text style={style.date}>Today</Text>
                    </View>
                    <View style={style.notificationWrapper}>
                        {orders.map((item, index) => (
                            <OrderListItem item={item} index={index} key={index} firstOrder={0} lastOrder={orders.length - 1} extraVerticalPadding={true} />
                        ))}
                    </View>
                    <View style={style.dateWrapper}>
                        <Text style={style.date}>Tues, May 09, 2023</Text>
                    </View>
                    <View style={style.notificationWrapper}>
                        {orders1.map((item, index) => (
                            <OrderListItem item={item} index={index} key={index} firstOrder={0} lastOrder={orders1.length - 1} extraVerticalPadding={true} />
                        ))}
                    </View>

                    {/* no notificaton notice */}
                    {/* <View style={style.noNotificationsWraper}>
                        <NotificationLargeIcon />
                        <Text style={style.noNotificationsHeading}>
                            No notifications yet
                        </Text>
                        <Text style={style.noNotificationsParagraph}>
                            You’ve got a blank state (for now). We’ll let you know when updates arrive!
                        </Text>
                    </View> */}
                </View>
            </ScrollView>
        </>
    );
}

// style sheet
const style = StyleSheet.create({
    main: {
        minHeight: windowHeight,
        display: 'flex',
        alignItems: 'center',
        backgroundColor: background,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        padding: 20,
        paddingTop: 0,
        flex: 1,
    },
    notificationWrapper: {
        width: "100%",
        flex: 1,
    },
    date: {
		color: bodyText,
		fontSize: 12,
		fontFamily: 'mulish-semibold',
    },
    dateWrapper: {
		display: 'flex',
		justifyContent: 'flex-start',
		flexDirection: 'row',
		width: "100%",
        marginTop: 24,
        marginBottom: 12,
    },
    modalContent: {
		display: "flex",
		flexDirection: 'column',
		alignItems: "center",
		justifyContent: "space-between",
		width: "100%",
		flex: 1,
        marginBottom: 20,
    },
    noNotificationsWraper: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'column',
        width: "100%",
        height: "100%",
        paddingTop: 202,
    },
    noNotificationsHeading: {
        color: black,
        fontSize: 14,
        marginTop: 12,
        marginBottom: 8,
        fontFamily: 'mulish-semibold',
    },
    noNotificationsParagraph: {
        color: bodyText,
        fontSize: 12,
        fontFamily: 'mulish-regular',
        width: 230,
        textAlign: 'center',
    },
});
 
export default Notifications;