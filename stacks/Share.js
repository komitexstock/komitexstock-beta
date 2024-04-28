// react native components
import { View, TouchableWithoutFeedback, Text, ScrollView, StyleSheet, Keyboard, BackHandler } from "react-native";
// components
import SearchBar from "../components/SearchBar";
import Header from "../components/Header";
import OrderListItem from "../components/OrderListItem";
import CustomButton from "../components/CustomButton";
import FilterBottomSheet from "../components/FilterBottomSheet";
import FilterButtonGroup from "../components/FilterButtonGroup";
import FilterPill from "../components/FilterPill";
import CalendarSheet from "../components/CalendarSheet";
import SelectInput from "../components/SelectInput";
// colors
import { background, bodyText, white } from "../style/colors";
// icons
import CalendarIcon from "../assets/icons/CalendarIcon";
// react hooks
import { useState, useEffect, useRef } from "react";
// moment
import moment from "moment";
// skeleton screen
import ShareSkeleton from "../skeletons/ShareSkeleton";
// globals
import { useGlobals } from "../context/AppContext";

const Share = ({navigation}) => {

    // sheet ref
    const filterSheetRef = useRef(null);

    // global states
    const {
        setFilterBottomSheet,
        calendarSheetRef,
        calendarSheetOpen
    } = useGlobals();

    // update botomsheet global states
    useEffect(() => {
        // set filter bottomsheet global state
        setFilterBottomSheet(prevState=> {
            return {...prevState, close: () => filterSheetRef.current?.close()}
        });
    }, []);

    // order list
    const [orders, setOrders] = useState([
        {
            name: "John Doe",
            location: "New York",
            products: [
                { product_name: "Shirt", quantity: 2 },
                { product_name: "Jeans", quantity: 1 },
            ],
            phone_number: ["080186289374", "080967751200"],
            datetime: "2023-03-15 09:30",
            id: "abc123",
            price: 15000,
            logistics: "Komitex",
            status: "Delivered",
            imageUrl: '../assets/images/komitex..png',
            newMessage: true,
            navigateToChat: () => {
                navigation.navigate("Chat", {
                    id: "abc123",
                    type: "Order",
                    name: "Komitex",
                    imageUrl: '../assets/images/komitex..png',
                })
            },
            selected: false,
            time: 'recent',
        },
        {
            name: "Jane Smith",
            location: "London",
            products: [
                { product_name: "Shoes", quantity: 1 },
                { product_name: "Socks", quantity: 3 },
            ],
            phone_number: ["080860404347"],
            datetime: "2023-02-22 14:45",
            id: "def456",
            price: 13000,
            status: "Pending",
            logistics: "Fedex",
            imageUrl: '../assets/images/fedex..png',
            newMessage: true,
            navigateToChat: () => {
                navigation.navigate("Chat", {
                    id: "def456",
                    type: "Order",
                    name: "Fedex",
                    imageUrl: '../assets/images/fedex..png',
                })
            },
            selected: false,
            time: 'recent',
        },
        {
            name: "Michael Johnson",
            location: "Los Angeles",
            products: [
                { product_name: "Hat", quantity: 1 },
            ],
            phone_number: ["080462257637", "080751031530"],
            datetime: "2023-01-10 12:15",
            id: "ghi789",
            price: 14000,
            status: "Dispatched",
            logistics: "Komitex",
            imageUrl: '../assets/images/komitex..png',
            newMessage: true,
            navigateToChat: () => {
                navigation.navigate("Chat", {
                    id: "ghi789",
                    type: "Order",
                    name: "Komitex",
                    imageUrl: '../assets/images/komitex..png',
                })
            },
            selected: false,
            time: 'recent',
        },
        {
            name: "Robert Davis",
            location: "Berlin",
            products: [
                { product_name: "Sunglasses", quantity: 1 },
            ],
            phone_number: ["080396596050"],
            datetime: "2023-03-01 11:10",
            id: "mno345",
            price: 16000,
            status: "Delivered",
            logistics: "DHL",
            imageUrl: '../assets/images/dhl..png',
            newMessage: true,
            navigateToChat: () => {
                navigation.navigate("Chat", {
                    id: "mno345",
                    type: "Order",
                    name: "DHL",
                    imageUrl: '../assets/images/dhl..png',
                })
            },
            selected: false,
            time: 'recent',
        },
        {
            name: "Sophia Brown",
            location: "Tokyo",
            products: [
                { product_name: "T-Shirt", quantity: 3 },
            ],
            phone_number: ["080378780801", "080918807202"],
            datetime: "2023-02-14 16:55",
            id: "pqr678",
            price: 12000,
            logistics: "UPS",
            status: "Rescheduled",
            imageUrl: '../assets/images/ups..png',
            newMessage: false,
            navigateToChat: () => {
                navigation.navigate("Chat", {
                    id: "pqr678",
                    type: "Order",
                    name: "UPS",
                    imageUrl: '../assets/images/ups..png',
                })
            },
            selected: false,
            time: 'older',
        },
        {
            name: "Emily Wilson",
            location: "Paris",
            products: [
                { product_name: "Dress", quantity: 1 },
                { product_name: "Scarf", quantity: 2 },
            ],
            phone_number: ["080945349876"],
            datetime: "2023-05-03 10:20",
            id: "stu901",
            price: 25000,
            status: "Delivered",
            logistics: "Komitex",
            imageUrl: '../assets/images/komitex..png',
            newMessage: false,
            navigateToChat: () => {
                navigation.navigate("Chat", {
                    id: "stu901",
                    type: "Order",
                    name: "Komitex",
                    imageUrl: '../assets/images/komitex..png',
                })
            },
            selected: false,
            time: 'older',
        },
        {
            name: "David Johnson",
            location: "New York",
            products: [
                { product_name: "Pants", quantity: 2 },
            ],
            phone_number: ["080858451915", "080413137765"],
            datetime: "2023-04-01 09:45",
            id: "vwx234",
            price: 18000,
            logistics: "Fedex",
            status: "Pending",
            imageUrl: '../assets/images/fedex..png',
            newMessage: false,
            navigateToChat: () => {
                navigation.navigate("Chat", {
                    id: "vwx234",
                    type: "Order",
                    name: "Fedex",
                    imageUrl: '../assets/images/fedex..png',
                })
            },
            selected: false,
            time: 'older',
        },
        {
            name: "Olivia Taylor",
            location: "London",
            products: [
                { product_name: "Sweater", quantity: 1 },
            ],
            phone_number: ["080845837259"],
            datetime: "2023-05-21 15:30",
            id: "yz0123",
            price: 19000,
            logistics: "Komitex",
            status: "Dispatched",
            imageUrl: '../assets/images/komitex..png',
            newMessage: false,
            navigateToChat: () => {
                navigation.navigate("Chat", {
                    id: "yz0123",
                    type: "Order",
                    name: "Komitex",
                    imageUrl: '../assets/images/komitex..png',
                })
            },
            selected: false,
            time: 'older',
        },
        {
            name: "Ethan Wilson",
            location: "Los Angeles",
            products: [
                { product_name: "Jacket", quantity: 1 },
            ],
            phone_number: ["080121868652"],
            datetime: "2023-04-11 13:20",
            id: "bcd345",
            price: 22000,
            status: "Cancelled",
            logistics: "DHL",
            imageUrl: '../assets/images/dhl..png',
            newMessage: false,
            navigateToChat: () => {
                navigation.navigate("Chat", {
                    id: "bcd345",
                    type: "Order",
                    name: "DHL",
                    imageUrl: '../assets/images/dhl..png',
                })
            },
            selected: false,
            time: 'older',
        },
        {
            name: "Emma Davis",
            location: "Berlin",
            products: [
                { product_name: "Watch", quantity: 1 },
            ],
            phone_number: ["080357205693"],
            datetime: "2023-05-07 10:50",
            id: "efg567",
            price: 28000,
            status: "Delivered",
            logistics: "UPS",
            imageUrl: '../assets/images/ups..png',
            newMessage: false,
            navigateToChat: () => {
                navigation.navigate("Chat", {
                    id: "efg567",
                    type: "Order",
                    name: "UPS",
                    imageUrl: '../assets/images/ups..png',
                })
            },
            selected: false,
            time: 'older',
        },
        {
            name: "William Smith",
            location: "Tokyo",
            products: [
                { product_name: "Trousers", quantity: 2 },
            ],
            phone_number: ["080266879509"],
            datetime: "2023-04-25 16:15",
            id: "ghi678",
            price: 20000,
            logistics: "Komitex",
            status: "Rescheduled",
            imageUrl: '../assets/images/komitex..png',
            newMessage: true,
            navigateToChat: () => {
                navigation.navigate("Chat", {
                    id: "ghi678",
                    type: "Order",
                    name: "Komitex",
                    imageUrl: '../assets/images/komitex..png',
                })
            },
            selected: false,
            time: 'older',
        },
        {
            name: "Isabella Johnson",
            location: "Paris",
            products: [
                { product_name: "Blouse", quantity: 1 },
                { product_name: "Skirt", quantity: 1 },
            ],
            phone_number: ["080228206684", "080304276185"],
            datetime: "2023-06-01 11:30",
            id: "jkl901",
            price: 30000,
            logistics: "Fedex",
            status: "Pending",
            imageUrl: '../assets/images/fedex..png',
            newMessage: true,
            navigateToChat: () => {
                navigation.navigate("Chat", {
                    id: "jkl901",
                    type: "Order",
                    name: "Fedex",
                    imageUrl: '../assets/images/fedex..png',
                })
            },
            selected: false,
            time: 'older',
        },
        {
            name: "Mia Taylor",
            location: "London",
            products: [
                { product_name: "Coat", quantity: 1 },
            ],
            phone_number: ["080719383444"],
            datetime: "2023-05-17 14:50",
            id: "mno234",
            logistics: "Komitex",
            price: 26000,
            status: "Dispatched",
            imageUrl: '../assets/images/komitex..png',
            newMessage: false,
            navigateToChat: () => {
                navigation.navigate("Chat", {
                    id: "mno234",
                    type: "Order",
                    name: "Komitex",
                    imageUrl: '../assets/images/komitex..png',
                })
            },
            selected: false,
            time: 'older',
        },
        {
            name: "James Brown",
            location: "Los Angeles",
            products: [
                { product_name: "Gloves", quantity: 1 },
            ],
            phone_number: ["080690847443"],
            datetime: "2023-04-05 12:05",
            id: "pqr345",
            logistics: "DHL",
            price: 23000,
            status: "Dispatched",
            imageUrl: '../assets/images/dhl..png',
            newMessage: false,
            navigateToChat: () => {
                navigation.navigate("Chat", {
                    id: "pqr345",
                    type: "Order",
                    name: "DHL",
                    imageUrl: '../assets/images/dhl..png',
                })
            },
            selected: false,
            time: 'older',
        },
        {
            name: "Alexander Davis",
            location: "Berlin",
            products: [
                { product_name: "Belt", quantity: 1 },
            ],
            phone_number: ["080122962992"],
            datetime: "2023-06-03 09:40",
            id: "stu567",
            price: 32000,
            logistics: "UPS",
            status: "Delivered",
            imageUrl: '../assets/images/ups..png',
            newMessage: true,
            navigateToChat: () => {
                navigation.navigate("Chat", {
                    id: "stu567",
                    type: "Order",
                    name: "UPS",
                    imageUrl: '../assets/images/ups..png',
                })
            },
            selected: false,
            time: 'older',
        },
        {
            name: "Charlotte Wilson",
            location: "Tokyo",
            products: [
                { product_name: "Sweatshirt", quantity: 1 },
            ],
            phone_number: ["080979884374", "080711181621"],
            datetime: "2023-05-11 15:55",
            id: "vwx678",
            price: 24000,
            logistics: "Komitex",
            status: "Rescheduled",
            imageUrl: '../assets/images/komitex..png',
            newMessage: true,
            navigateToChat: () => {
                navigation.navigate("Chat", {
                    id: "vwx678",
                    type: "Order",
                    name: "Komitex",
                    imageUrl: '../assets/images/komitex..png',
                })
            },
            selected: false,
            time: 'older',
        },
        {
            name: "Henry Johnson",
            location: "Paris",
            products: [
                { product_name: "Jeans", quantity: 1 },
                { product_name: "T-Shirt", quantity: 2 },
            ],
            phone_number: ["080608173820", "080539108385"],
            datetime: "2023-06-09 11:15",
            id: "yz0124",
            price: 35000,
            status: "Delivered",
            imageUrl: '../assets/images/fedex..png',
            logistics: "Fedex",
            newMessage: false,
            navigateToChat: () => {
                navigation.navigate("Chat", {
                    id: "yz0124",
                    type: "Order",
                    name: "Fedex",
                    imageUrl: '../assets/images/fedex..png',
                })
            },
            selected: false,
            time: 'older',
        },
        {
            name: "Amelia Taylor",
            location: "London",
            products: [
                { product_name: "Shirt", quantity: 1 },
            ],
            phone_number: ["080782045192"],
            datetime: "2023-05-26 16:40",
            id: "bcd456",
            price: 27000,
            status: "Dispatched",
            logistics: "Komitex",
            imageUrl: '../assets/images/komitex..png',
            newMessage: false,
            navigateToChat: () => {
                navigation.navigate("Chat", {
                    id: "bcd456",
                    type: "Order",
                    name: "Komitex",
                    imageUrl: '../assets/images/komitex..png',
                })
            },
            selected: false,
            time: 'older',
        },
        {
            name: "Benjamin Davis",
            location: "Los Angeles",
            products: [
                { product_name: "Socks", quantity: 2 },
            ],
            phone_number: ["080378482469"],
            datetime: "2023-04-15 11:55",
            id: "efg789",
            price: 30000,
            status: "Pending",
            logistics: "DHL",
            imageUrl: '../assets/images/dhl..png',
            newMessage: true,
            navigateToChat: () => {
                navigation.navigate("Chat", {
                    id: "efg789",
                    type: "Order",
                    name: "DHL",
                    imageUrl: '../assets/images/dhl..png',
                })
            },
            selected: false,
            time: 'older',
        },
        {
            name: "Victoria Smith",
            location: "Berlin",
            products: [
                { product_name: "Sunglasses", quantity: 1 },
            ],
            phone_number: ["080537402885", "080518403617"],
            datetime: "2023-06-13 10:25",
            id: "ghi901",
            price: 38000,
            logistics: "UPS",
            status: "Cancelled",
            imageUrl: '../assets/images/ups..png',
            newMessage: false,
            navigateToChat: () => {
                navigation.navigate("Chat", {
                    id: "ghi901",
                    type: "Order",
                    name: "UPS",
                    imageUrl: '../assets/images/ups..png',
                })
            },
            selected: false,
            time: 'older',
        },
        {
            name: "Liam Williams",
            location: "San Francisco",
            products: [
              { product_name: "Shoes", quantity: 1 },
            ],
            phone_number: ["080361204464"],
            datetime: "2023-09-01 09:15",
            id: "fedex101",
            price: 22000,
            status: "Dispatched",
            logistics: "Fedex",
            imageUrl: '../assets/images/fedex..png',
            newMessage: true,
            navigateToChat: () => {
              navigation.navigate("Chat", {
                id: "fedex101",
                type: "Order",
                name: "Fedex",
                imageUrl: '../assets/images/fedex..png',
              });
            },
            selected: false,
            time: 'older',
        },
        {
            name: "Liam Thomas",
            location: "Seattle",
            products: [
              { product_name: "Gloves", quantity: 1 },
            ],
            phone_number: ["080410728759"],
            datetime: "2023-08-01 09:15",
            id: "ups001",
            price: 22000,
            status: "Dispatched",
            logistics: "UPS",
            imageUrl: '../assets/images/ups..png',
            newMessage: true,
            navigateToChat: () => {
              navigation.navigate("Chat", {
                id: "ups001",
                type: "Order",
                name: "UPS",
                imageUrl: '../assets/images/ups..png',
              });
            },
            selected: false,
            time: 'older',
        },
        {
            name: "Olivia Anderson",
            location: "Seattle",
            products: [
              { product_name: "Jacket", quantity: 1 },
              { product_name: "Socks", quantity: 3 },
            ],
            phone_number: ["080412854570"],
            datetime: "2023-08-28 14:30",
            id: "fedex102",
            price: 18000,
            status: "Delivered",
            logistics: "Fedex",
            imageUrl: '../assets/images/fedex..png',
            newMessage: false,
            navigateToChat: () => {
              navigation.navigate("Chat", {
                id: "fedex102",
                type: "Order",
                name: "Fedex",
                imageUrl: '../assets/images/fedex..png',
              });
            },
            selected: false,
            time: 'older',
        },
        {
            name: "Olivia Brown",
            location: "Phoenix",
            products: [
              { product_name: "Belt", quantity: 1 },
            ],
            phone_number: ["080308855123"],
            datetime: "2023-08-05 14:30",
            id: "ups002",
            price: 18000,
            status: "Delivered",
            logistics: "UPS",
            imageUrl: '../assets/images/ups..png',
            newMessage: false,
            navigateToChat: () => {
              navigation.navigate("Chat", {
                id: "ups002",
                type: "Order",
                name: "UPS",
                imageUrl: '../assets/images/ups..png',
              });
            },
            selected: false,
            time: 'older',
        },
        {
            name: "Ella Wilson",
            location: "Denver",
            products: [
              { product_name: "Sweatshirt", quantity: 1 },
            ],
            phone_number: ["080292741676", "080569485305"],
            datetime: "2023-08-10 16:45",
            id: "ups003",
            price: 15000,
            status: "Cancelled",
            logistics: "UPS",
            imageUrl: '../assets/images/ups..png',
            newMessage: true,
            navigateToChat: () => {
              navigation.navigate("Chat", {
                id: "ups003",
                type: "Order",
                name: "UPS",
                imageUrl: '../assets/images/ups..png',
              });
            },
            selected: false,
            time: 'older',
        },
        {
            name: "Sophia Martinez",
            location: "Denver",
            products: [
              { product_name: "T-Shirt", quantity: 2 },
            ],
            phone_number: ["080685843121", "080652042584"],
            datetime: "2023-08-25 16:45",
            id: "fedex103",
            price: 15000,
            status: "Cancelled",
            logistics: "Fedex",
            imageUrl: '../assets/images/fedex..png',
            newMessage: true,
            navigateToChat: () => {
              navigation.navigate("Chat", {
                id: "fedex103",
                type: "Order",
                name: "Fedex",
                imageUrl: '../assets/images/fedex..png',
              });
            },
            selected: false,
            time: 'older',
        },
        {
            name: "James Davis",
            location: "Miami",
            products: [
              { product_name: "Dress", quantity: 1 },
            ],
            phone_number: ["080692702150", "080613163067"],
            datetime: "2023-08-22 10:20",
            id: "fedex104",
            price: 26000,
            status: "Pending",
            logistics: "Fedex",
            imageUrl: '../assets/images/fedex..png',
            newMessage: false,
            navigateToChat: () => {
              navigation.navigate("Chat", {
                id: "fedex104",
                type: "Order",
                name: "Fedex",
                imageUrl: '../assets/images/fedex..png',
              });
            },
            selected: false,
            time: 'older',
        },
        {
            name: "William Taylor",
            location: "Phoenix",
            products: [
              { product_name: "Sweater", quantity: 1 },
            ],
            phone_number: ["080790382784"],
            datetime: "2023-08-19 15:30",
            id: "fedex105",
            price: 28000,
            status: "Rescheduled",
            logistics: "Fedex",
            imageUrl: '../assets/images/fedex..png',
            newMessage: true,
            navigateToChat: () => {
              navigation.navigate("Chat", {
                id: "fedex105",
                type: "Order",
                name: "Fedex",
                imageUrl: '../assets/images/fedex..png',
              });
            },
            selected: false,
            time: 'older',
        },
        {
            name: "Ella Harris",
            location: "Las Vegas",
            products: [
              { product_name: "Coat", quantity: 1 },
            ],
            phone_number: ["080106644976", "080823118857"],
            datetime: "2023-08-16 13:20",
            id: "fedex106",
            price: 25000,
            status: "Delivered",
            logistics: "Fedex",
            imageUrl: '../assets/images/fedex..png',
            newMessage: false,
            navigateToChat: () => {
              navigation.navigate("Chat", {
                id: "fedex106",
                type: "Order",
                name: "Fedex",
                imageUrl: '../assets/images/fedex..png',
              });
            },
            selected: false,
            time: 'older',
        },
        {
            name: "James Martin",
            location: "Dallas",
            products: [
              { product_name: "Coat", quantity: 1 },
            ],
            phone_number: ["080493257998"],
            datetime: "2023-08-15 10:20",
            id: "ups004",
            price: 26000,
            status: "Pending",
            logistics: "UPS",
            imageUrl: '../assets/images/ups..png',
            newMessage: false,
            navigateToChat: () => {
              navigation.navigate("Chat", {
                id: "ups004",
                type: "Order",
                name: "UPS",
                imageUrl: '../assets/images/ups..png',
              });
            },
            selected: false,
            time: 'older',
        },
        {
            name: "Aiden Smith",
            location: "Atlanta",
            products: [
              { product_name: "Dress", quantity: 1 },
            ],
            phone_number: ["080238134144", "080502441770"],
            datetime: "2023-08-20 13:20",
            id: "ups005",
            price: 25000,
            status: "Delivered",
            logistics: "UPS",
            imageUrl: '../assets/images/ups..png',
            newMessage: true,
            navigateToChat: () => {
              navigation.navigate("Chat", {
                id: "ups005",
                type: "Order",
                name: "UPS",
                imageUrl: '../assets/images/ups..png',
              });
            },
            selected: false,
            time: 'older',
        },
        {
            name: "Liam Davis",
            location: "Chicago",
            products: [
              { product_name: "Shoes", quantity: 1 },
            ],
            phone_number: ["080129015749", "080224189804"],
            datetime: "2023-08-01 09:15",
            id: "dhl001",
            price: 22000,
            status: "Dispatched",
            logistics: "DHL",
            imageUrl: '../assets/images/dhl..png',
            newMessage: true,
            navigateToChat: () => {
              navigation.navigate("Chat", {
                id: "dhl001",
                type: "Order",
                name: "DHL",
                imageUrl: '../assets/images/dhl..png',
              });
            },
            selected: false,
            time: 'older',
        },
        {
            name: "William Johnson",
            location: "Miami",
            products: [
              { product_name: "Jeans", quantity: 1 },
              { product_name: "T-Shirt", quantity: 2 },
            ],
            phone_number: ["080286015885"],
            datetime: "2023-08-05 14:30",
            id: "dhl002",
            price: 18000,
            status: "Delivered",
            logistics: "DHL",
            imageUrl: '../assets/images/dhl..png',
            newMessage: false,
            navigateToChat: () => {
              navigation.navigate("Chat", {
                id: "dhl002",
                type: "Order",
                name: "DHL",
                imageUrl: '../assets/images/dhl..png',
              });
            },
            selected: false,
            time: 'older',
        },
        {
            name: "Sophia Smith",
            location: "Los Angeles",
            products: [
              { product_name: "Dress", quantity: 1 },
            ],
            phone_number: ["080119914260", "080572474789"],
            datetime: "2023-08-10 16:45",
            id: "dhl003",
            price: 15000,
            status: "Cancelled",
            logistics: "DHL",
            imageUrl: '../assets/images/dhl..png',
            newMessage: true,
            navigateToChat: () => {
              navigation.navigate("Chat", {
                id: "dhl003",
                type: "Order",
                name: "DHL",
                imageUrl: '../assets/images/dhl..png',
              });
            },
            selected: false,
            time: 'older',
        },
        {
            name: "James Brown",
            location: "San Francisco",
            products: [
              { product_name: "Sweater", quantity: 1 },
            ],
            phone_number: ["080659461378", "080305024060"],
            datetime: "2023-08-15 10:20",
            id: "dhl004",
            price: 26000,
            status: "Pending",
            logistics: "DHL",
            imageUrl: '../assets/images/dhl..png',
            newMessage: false,
            navigateToChat: () => {
              navigation.navigate("Chat", {
                id: "dhl004",
                type: "Order",
                name: "DHL",
                imageUrl: '../assets/images/dhl..png',
              });
            },
            selected: false,
            time: 'older',
        },
        {
            name: "Aiden Wilson",
            location: "New York",
            products: [
              { product_name: "Coat", quantity: 1 },
            ],
            phone_number: ["080339794570", "080744050079"],
            datetime: "2023-08-20 13:20",
            id: "dhl005",
            price: 25000,
            status: "Delivered",
            logistics: "DHL",
            imageUrl: '../assets/images/dhl..png',
            newMessage: true,
            navigateToChat: () => {
              navigation.navigate("Chat", {
                id: "dhl005",
                type: "Order",
                name: "DHL",
                imageUrl: '../assets/images/dhl..png',
              });
            },
            selected: false,
            time: 'older',
        },        
        {
            name: "Aiden Jackson",
            location: "Atlanta",
            products: [
              { product_name: "Gloves", quantity: 1 },
            ],
            phone_number: ["080110930235", "080749591913"],
            datetime: "2023-08-13 12:05",
            id: "fedex107",
            price: 23000,
            status: "Dispatched",
            logistics: "Fedex",
            imageUrl: '../assets/images/fedex..png',
            newMessage: false,
            navigateToChat: () => {
              navigation.navigate("Chat", {
                id: "fedex107",
                type: "Order",
                name: "Fedex",
                imageUrl: '../assets/images/fedex..png',
              });
            },
            selected: false,
            time: 'older',
        },
        {
            name: "Mia Thomas",
            location: "Philadelphia",
            products: [
              { product_name: "Belt", quantity: 1 },
            ],
            phone_number: ["080186508788", "080867333324"],
            datetime: "2023-08-10 09:40",
            id: "fedex108",
            price: 32000,
            status: "Rescheduled",
            logistics: "Fedex",
            imageUrl: '../assets/images/fedex..png',
            newMessage: true,
            navigateToChat: () => {
              navigation.navigate("Chat", {
                id: "fedex108",
                type: "Order",
                name: "Fedex",
                imageUrl: '../assets/images/fedex..png',
              });
            },
            selected: false,
            time: 'older',
        },
    ]);

    const [pageLoading, setPageLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setPageLoading(false);
        }, 500);
    })

    const [searchQuery, setSearchQuery] = useState("");

    const selectOrder = (id) => {
        setOrders(prevOrders => {
            return prevOrders.map(order => {
                return order.id === id ? {...order, selected: !order.selected} : order
            })
        })
    }

    // filter order bottom sheet parameters
    const [filterParameters, setFilterParameters] = useState([
        {
            title: "Status",
            value: "All",
            default: true,
            buttons: [
                {
                    text: "All",
                    selected: true,
                    onPress: () => {
                        handleFilterParameters("Status", "All")
                    }
                },
                {
                    text: "Pending",
                    selected: false,
                    onPress: () => {
                        handleFilterParameters("Status", "Pending")
                    }
                },
                {
                    text: "Delivered",
                    selected: false,
                    onPress: () => {
                        handleFilterParameters("Status", "Delivered")
                    }
                },
                {
                    text: "Cancelled",
                    selected: false,
                    onPress: () => {
                        handleFilterParameters("Status", "Cancelled")
                    }
                },
                {
                    text: "Dispatched",
                    selected: false,
                    onPress: () => {
                        handleFilterParameters("Status", "Dispatched")
                    }
                },
                {
                    text: "Rescheduled",
                    selected: false,
                    onPress: () => {
                        handleFilterParameters("Status", "Rescheduled")
                    }
                },
            ],
        },
        {
            title: "Logistics",
            value: "All",
            default: true,
            buttons: [
                {
                    text: "All",
                    selected: true,
                    onPress: () => {
                        handleFilterParameters("Logistics", "All")
                    }
                },
                {
                    text: "Komitex",
                    selected: false,
                    onPress: () => {
                        handleFilterParameters("Logistics", "Komitex")
                    }
                },
                {
                    text: "Fedex",
                    selected: false,
                    onPress: () => {
                        handleFilterParameters("Logistics", "Fedex")
                    }
                },
                {
                    text: "DHL",
                    selected: false,
                    onPress: () => {
                        handleFilterParameters("Logistics", "DHL")
                    }
                },
                {
                    text: "UPS",
                    selected: false,
                    onPress: () => {
                        handleFilterParameters("Logistics", "UPS")
                    }
                },
            ]
        },
        {
            title: "Period",
            value: "Today",
            default: true,
            buttons: [
                {
                    text: "Today",
                    selected: true,
                    onPress: () => {
                        handleFilterParameters("Period", "Today")
                    }
                },
                {
                    text: "Yesterday",
                    selected: false,
                    onPress: () => {
                        handleFilterParameters("Period", "Yesterday")
                    }
                },
                {
                    text: "Current week",
                    selected: false,
                    onPress: () => {
                        handleFilterParameters("Period", "Current week")
                    }
                },
                {
                    text: "Last week",
                    selected: false,
                    onPress: () => {
                        handleFilterParameters("Period", "Last week")
                    }
                },
                {
                    text: "Custom period",
                    selected: false,
                    onPress: () => {
                        handleFilterParameters("Period", "Custom period")
                        openCalendar("StartDate");
                    }
                },
                {
                    text: "Current month",
                    selected: false,
                    onPress: () => {
                        handleFilterParameters("Period", "Current month")
                    }
                },
                {
                    text: "Last month",
                    selected: false,
                    onPress: () => {
                        handleFilterParameters("Period", "Last month")
                    }
                },
            ]
        }
    ]);

    // filterParameters.e

    const filterOrders = (duration, orders, filterParams) => {
        const newList = orders.filter(order => order.time === duration);
        if (searchQuery === "") {

            if (filterParams.every(filter => filter.default === true)) return newList

            return newList.filter(order => {
                const filterArray = filterParams.map(filterParam => {
                    if (filterParam.title !== "Period") {
                        if (filterParam.value === "All") {
                            return true;
                        } else {
                            if (filterParam.title === "Status") {
                                return filterParam.value.toLowerCase() === order.status.toLowerCase();
                            } else if (filterParam.title === "Logistics") {
                                return filterParam.value === order.logistics;
                            }
                        } 
                    } else {
                        return true;
                    }
                })
                // console.log(filterArray);
    
                return filterArray.every((element) => element === true);
            });

        } else {

            const searchResult = newList.filter(order => {
                return order.name.toLowerCase().includes(searchQuery.toLowerCase()) || order.location.toLowerCase().includes(searchQuery.toLowerCase()) || order.logistics.toLowerCase().includes(searchQuery.toLowerCase()) || order.products.some(product => product.product_name.toLowerCase().includes(searchQuery.toLowerCase())) || order.phone_number.some(phone_number => phone_number.toLowerCase().includes(searchQuery.toLowerCase()));
            });

            if (filterParams.every(filter => filter.default === true)) return searchResult;

            return searchResult.filter(order => {
                const filterArray = filterParams.map(filterParam => {
                    if (filterParam.title !== "Period") {
                        if (filterParam.value === "All") {
                            return true;
                        } else {
                            if (filterParam.title === "Status") {
                                return filterParam.value.toLowerCase() === order.status.toLowerCase();
                            } else if (filterParam.title === "Logistics") {
                                return filterParam.value === order.logistics;
                            }
                        } 
                    } else {
                        return true;
                    }
                })
                // console.log(filterArray);
    
                return filterArray.every((element) => element === true);
            });
        }
    }



    // open filter function
    const openFilter = (type) => {
        // dismmis keyboard
        Keyboard.dismiss();

        // open filtr botomsheet
        filterSheetRef.current?.present()

        // update filter bottomsheet global state
        setFilterBottomSheet(prevState => {
            return {
                ...prevState,
                opened: true,
            }
        });
    }
    
    const closeFilter = () => {
        // close filter bottomsheet
        filterSheetRef.current?.close();

        // update filter bottomsheet global state
        setFilterBottomSheet(prevState => {
            return {
                ...prevState,
                opened: false,
            }
        });
    }

    // function to setEnd date as today if start date is selected as today
    useEffect(() => {
        // console.log(startDate);
        // console.log(today);
        if (moment(startDate).format('DD MMMM, YYYY') === moment(today).format('DD MMMM, YYYY')) {
            setEndDate(today);
        }
    }, [startDate])

    // function to apply filter
    const handleApplyFilter = () => {
        setFilterParameters(prevParamters => {
            return prevParamters.map(filterParam => {
                const selectedButton = filterParam.buttons.filter(button => button.selected === true);
                // console.log(selectedButton);
                if (filterParam.title  !== "Period") {
                    return {
                        ...filterParam,
                        value: selectedButton[0].text,
                        default: selectedButton[0].text === "All" ? true : false, 
                    }
                } else {
                    return {
                        ...filterParam,
                        value: selectedButton[0].text,
                        default: selectedButton[0].text === "Today" ? true : false, 
                    }
                }
            })
        });

        closeFilter(); // pass true to not reset filter
    }

    // function to select filter
    const handleFilterParameters = (title, button) => {
        setFilterParameters(prevParamters => {
            return prevParamters.map(filterParam => {
                if (filterParam.title === title) {
                    return {
                        ...filterParam,
                        buttons: filterParam.buttons.map(filterButton => {
                            if (filterButton.text === button) {
                                return {
                                    ...filterButton,
                                    selected: true,
                                }
                            } else {
                                return {
                                    ...filterButton,
                                    selected: false,
                                }
                            }
                        }),
                    }
                } else {
                    return {...filterParam}
                }
            })
        });
        if (title === "Period") {
            // console.log("Here");
        }
        
    }
    
    // remove filter function, applied to the close icon in the filter pill
    const handleRemoveFilter = (title) => {
        setFilterParameters(prevParamters => {
            return prevParamters.map(filterParam => {
                if (filterParam.title === title) {
                    return {
                        ...filterParam,
                        default: true,
                        value: title === "Period" ? "Today" : "All",
                        buttons: filterParam.buttons.map(filterButton => {
                            if (filterButton.text === "All") {
                                return {
                                    ...filterButton,
                                    selected: true,
                                }
                            } else {
                                return {
                                    ...filterButton,
                                    selected: false,
                                }
                            }
                        }),
                    }
                } else {
                    return {...filterParam}
                }
            })
        });
    }

    // function to clearAll fiter
    const handleClearAllFilter = () => {
        // clear all filter
        handleRemoveFilter("Period");
        handleRemoveFilter("Status");
        handleRemoveFilter("Logistics");
        // close filter bottomsheet
        closeFilter();
    }

    // previous date
    const prevDate = new Date();
    prevDate.setDate(prevDate.getDate() - 1);

    // previous date
    const today = new Date();
    // today.setDate(today.getDate());

    // variable to store start date
    const [startDate, setStartDate] = useState(today);

    // variable to indicate start date input active state
    const [activeStartDate, setActiveStartDate] = useState(false);
    
    // variable to store end date
    const [endDate, setEndDate] = useState(today);
    // variable to indicate end date input active state
    const [activeEndDate, setActiveEndDate] = useState(false);

    const [calendar, setCalendar] = useState({
        setDate: setStartDate,
        maxDate: false,
        minDate: false,
    });

    // function to open calendar
    const openCalendar = (inputType) => {
        if (inputType === "StartDate") {
            setActiveStartDate(true);
            setCalendar({
                setDate: setStartDate,
                maxDate: endDate ? moment(endDate).subtract(1, 'days') : today,
                minDate: false
            });
        } else {
            setActiveEndDate(true);
            setCalendar({
                setDate: setEndDate,
                maxDate: today,
                minDate: startDate ? moment(startDate).add(1, 'days') : startDate,
            });
        }
        calendarSheetRef.current?.present();
    }

    // close calendar
    const closeCalendar = () => {
        setActiveEndDate(false);
        setActiveStartDate(false);
        calendarSheetRef.current?.close();
    }

    // disable active states of select input if calendar is closed with back button
    useEffect(() => {
        if (!calendarSheetOpen) {
            setActiveEndDate(false);
            setActiveStartDate(false);
        }
    }, [calendarSheetOpen])

    // share screen
    return (
        <>
            {!pageLoading ? <>
                <TouchableWithoutFeedback>
                    <ScrollView style={style.container} showsVerticalScrollIndicator={false}>
                        <View 
                            style={[
                                style.mainWrapper,
                                orders.filter(order => order.selected).length > 0 && {marginBottom: 100}
                            ]}
                        >
                            <Header
                                stackName={"Send to"}
                                inlineArrow={true}
                                removeBackArrow={true}
                                unpadded={true}
                                navigation={navigation}
                            />
                            <SearchBar 
                                backgroundColor={white}
                                placeholder={"Search order"}
                                searchQuery={searchQuery}
                                setSearchQuery={setSearchQuery}
                                openFilter={openFilter}
                            />
                            {/* check if any filter has been applied, i.e it is not in its default value */}
                            {filterParameters.find(filterParam => filterParam.default === false) && (
                                <View style={style.searchOrderPillWrapper}>
                                    {filterParameters.map(filterParam => {
                                        if (!filterParam.default) {
                                            if (filterParam.value !== "Custom period") {
                                                return (
                                                    <FilterPill
                                                        key={filterParam.title}
                                                        text={filterParam.value}
                                                        onPress={() => handleRemoveFilter(filterParam.title, "search")}
                                                        background={white}
                                                    />
                                                )
                                            }
                                        }
                                    })}
                                </View>
                            )}
                            <View style={style.titleWrapper}>
                                <Text style={style.heading}>Recent</Text>
                            </View>
                            <View style={style.ordersWrapper}>
                                {/* order list max 5 items */}
                                {filterOrders('recent', orders, filterParameters).map((order) => {
                                    return order.time === 'recent' && (
                                        <OrderListItem
                                            key={order.id}
                                            item={order}
                                            selectable={true}
                                            selected={order.selected}
                                            selectFunction={selectOrder}  
                                            searchQuery={searchQuery}
                                        />
                                    )
                                })}
                            </View>
                            <View style={style.titleWrapper}>
                                <Text style={style.heading}>Others</Text>
                            </View>
                            <View style={style.ordersWrapper}>
                                {/* order list max 5 items */}
                                {filterOrders('older', orders, filterParameters).map((order) => {
                                    return order.time === 'older' && (
                                        <OrderListItem
                                            key={order.id}
                                            item={order}
                                            selectable={true}
                                            selected={order.selected}
                                            selectFunction={selectOrder}  
                                            searchQuery={searchQuery}
                                        />
                                    )
                                })}
                            </View>
                        </View>
                    </ScrollView>
                </TouchableWithoutFeedback>
            </> : <ShareSkeleton />}
            {/* show send button only if an order has been selected */}
            {orders.filter(order => order.selected).length > 0 && (
                <CustomButton 
                    name={`Send (${orders.filter(order => order.selected).length})`} 
                    onPress={() => {}}
                    backgroundColor={white}
                    inactive={false}
                    fixed={true}
                />
            )}
            {/* filter bottom sheet */}
            <FilterBottomSheet 
                height={606}
                closeFilter={closeFilter}
                fiterSheetRef={filterSheetRef}
                applyFilterFunction={handleApplyFilter}
                clearFilterFunction={handleClearAllFilter}
            >
                {filterParameters.map(item => (
                    <FilterButtonGroup
                        buttons={item.buttons}
                        title={item.title}
                        key={item.title}
                    />
                ))}

                <View style={style.inputContainer}>
                    {/* Start date */}
                    <SelectInput 
                        label={"Start Date"} 
                        placeholder={"DD MMMM, YYYY"} 
                        value={startDate}
                        onPress={() => {openCalendar("StartDate")}}
                        icon={<CalendarIcon />}
                        active={activeStartDate}
                        inputFor={"Date"}
                    />

                    {/* End date */}
                    <SelectInput
                        label={"End Date"}
                        placeholder={"DD MMMM, YYYY"}
                        value={endDate}
                        onPress={() => {openCalendar("EndDate")}}
                        icon={<CalendarIcon />}
                        active={activeEndDate}
                        inputFor={"Date"}
                    />
                </View>
            </FilterBottomSheet>
            {/* calnedar */}
            <CalendarSheet 
                closeCalendar={closeCalendar}
                setDate={calendar.setDate}
                disableActionButtons={true}
                snapPointsArray={["60%"]}
                minDate={calendar.minDate}
                maxDate={calendar.maxDate}
                calendarRef={calendarSheetRef} 
            />
        </>

    );
}

const style = StyleSheet.create({
    container: {
        width: "100%",
        eight: "100%",
        backgroundColor: background,
        paddingHorizontal: 20,
        paddingBottom: 150,
    },
    ordersWrapper: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: white,
        gap: 10,
        paddingVertical: 5,
        borderRadius: 12,
        marginBottom: 24,
    },
    titleWrapper: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%',
        marginBottom: 12,
    },
    heading: {
        color: bodyText,
        fontFamily: 'mulish-bold',
        fontSize: 10,
    },
    searchOrderPillWrapper: {
        width: '100%',
        display: "flex",
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: "center",
        justifyContent: "flex-start",
        gap: 8,
        marginBottom: 14,
        marginTop: -4,
    },
})
 
export default Share;