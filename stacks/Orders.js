// react native component
import { 
    View, 
    Text, 
    FlatList, 
    TouchableOpacity, 
    TouchableWithoutFeedback,
    StyleSheet,
    Animated,
    Keyboard,
} from "react-native";
// colors
import { background, blackOut, bodyText, primaryColor, white } from "../style/colors";
// icons
import MenuIcon from "../assets/icons/MenuIcon";
import SearchIcon from '../assets/icons/SearchIcon'
import CalendarIcon from "../assets/icons/CalendarIcon";
// react hooks
import { useState, useRef, useEffect } from "react";
// components
import StatWrapper from "../components/StatWrapper";
import StatCard from "../components/StatCard";
import OrderListItem from "../components/OrderListItem";
import CustomBottomSheet from "../components/CustomBottomSheet";
import CustomButton from "../components/CustomButton"
import SelectInput from "../components/SelectInput";
import FilterButtonGroup from "../components/FilterButtonGroup";
import SearchBar from "../components/SearchBar";
import Badge from "../components/Badge";
import Header from "../components/Header";
import FilterBottomSheet from "../components/FilterBottomSheet";
import CalendarSheet from "../components/CalendarSheet";
import FilterPill from "../components/FilterPill";
import OpenFilterButton from "../components/OpenFilterButton";
// bottomsheet components
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
// moment
import moment from "moment";
// skeleton screen
import OrdersSkeleton from "../skeletons/OrdersSkeleton";
// globals
import { useGlobals } from "../context/AppContext";

const Orders = ({navigation}) => {

    // bottom sheet refs
    const { bottomSheetRef, filterSheetRef, calendarSheetRef, calendarSheetOpen} = useGlobals();

    // orders full list
    const orderList = [
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
            imageUrl: require('../assets/images/komitex.png'),
            newMessage: true,
            navigateToChat: () => {
                navigation.navigate("Chat", {
                    id: "abc123",
                    type: "Order",
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
            phone_number: ["080860404347"],
            datetime: "2023-02-22 14:45",
            id: "def456",
            price: 13000,
            status: "Pending",
            logistics: "Fedex",
            imageUrl: require('../assets/images/fedex.png'),
            newMessage: true,
            navigateToChat: () => {
                navigation.navigate("Chat", {
                    id: "def456",
                    type: "Order",
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
            phone_number: ["080462257637", "080751031530"],
            datetime: "2023-01-10 12:15",
            id: "ghi789",
            price: 14000,
            status: "Dispatched",
            logistics: "Komitex",
            imageUrl: require('../assets/images/komitex.png'),
            newMessage: true,
            navigateToChat: () => {
                navigation.navigate("Chat", {
                    id: "ghi789",
                    type: "Order",
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
            phone_number: ["080396596050"],
            datetime: "2023-03-01 11:10",
            id: "mno345",
            price: 16000,
            status: "Delivered",
            logistics: "DHL",
            imageUrl: require('../assets/images/dhl.png'),
            newMessage: true,
            navigateToChat: () => {
                navigation.navigate("Chat", {
                    id: "mno345",
                    type: "Order",
                    name: "DHL",
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
            phone_number: ["080378780801", "080918807202"],
            datetime: "2023-02-14 16:55",
            id: "pqr678",
            price: 12000,
            logistics: "UPS",
            status: "Rescheduled",
            imageUrl: require('../assets/images/ups.png'),
            newMessage: false,
            navigateToChat: () => {
                navigation.navigate("Chat", {
                    id: "pqr678",
                    type: "Order",
                    name: "UPS",
                    imageUrl: require('../assets/images/ups.png'),
                })
            },
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
            imageUrl: require('../assets/images/komitex.png'),
            newMessage: false,
            navigateToChat: () => {
                navigation.navigate("Chat", {
                    id: "stu901",
                    type: "Order",
                    name: "Komitex",
                    imageUrl: require('../assets/images/komitex.png'),
                })
            },
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
            imageUrl: require('../assets/images/fedex.png'),
            newMessage: false,
            navigateToChat: () => {
                navigation.navigate("Chat", {
                    id: "vwx234",
                    type: "Order",
                    name: "Fedex",
                    imageUrl: require('../assets/images/fedex.png'),
                })
            },
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
            imageUrl: require('../assets/images/komitex.png'),
            newMessage: false,
            navigateToChat: () => {
                navigation.navigate("Chat", {
                    id: "yz0123",
                    type: "Order",
                    name: "Komitex",
                    imageUrl: require('../assets/images/komitex.png'),
                })
            },
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
            imageUrl: require('../assets/images/dhl.png'),
            newMessage: false,
            navigateToChat: () => {
                navigation.navigate("Chat", {
                    id: "bcd345",
                    type: "Order",
                    name: "DHL",
                    imageUrl: require('../assets/images/dhl.png'),
                })
            },
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
            imageUrl: require('../assets/images/ups.png'),
            newMessage: false,
            navigateToChat: () => {
                navigation.navigate("Chat", {
                    id: "efg567",
                    type: "Order",
                    name: "UPS",
                    imageUrl: require('../assets/images/ups.png'),
                })
            },
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
            imageUrl: require('../assets/images/komitex.png'),
            newMessage: true,
            navigateToChat: () => {
                navigation.navigate("Chat", {
                    id: "ghi678",
                    type: "Order",
                    name: "Komitex",
                    imageUrl: require('../assets/images/komitex.png'),
                })
            },
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
            imageUrl: require('../assets/images/fedex.png'),
            newMessage: true,
            navigateToChat: () => {
                navigation.navigate("Chat", {
                    id: "jkl901",
                    type: "Order",
                    name: "Fedex",
                    imageUrl: require('../assets/images/fedex.png'),
                })
            },
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
            imageUrl: require('../assets/images/komitex.png'),
            newMessage: false,
            navigateToChat: () => {
                navigation.navigate("Chat", {
                    id: "mno234",
                    type: "Order",
                    name: "Komitex",
                    imageUrl: require('../assets/images/komitex.png'),
                })
            },
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
            imageUrl: require('../assets/images/dhl.png'),
            newMessage: false,
            navigateToChat: () => {
                navigation.navigate("Chat", {
                    id: "pqr345",
                    type: "Order",
                    name: "DHL",
                    imageUrl: require('../assets/images/dhl.png'),
                })
            },
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
            imageUrl: require('../assets/images/ups.png'),
            newMessage: true,
            navigateToChat: () => {
                navigation.navigate("Chat", {
                    id: "stu567",
                    type: "Order",
                    name: "UPS",
                    imageUrl: require('../assets/images/ups.png'),
                })
            },
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
            imageUrl: require('../assets/images/komitex.png'),
            newMessage: true,
            navigateToChat: () => {
                navigation.navigate("Chat", {
                    id: "vwx678",
                    type: "Order",
                    name: "Komitex",
                    imageUrl: require('../assets/images/komitex.png'),
                })
            },
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
            imageUrl: require('../assets/images/fedex.png'),
            logistics: "Fedex",
            newMessage: false,
            navigateToChat: () => {
                navigation.navigate("Chat", {
                    id: "yz0124",
                    type: "Order",
                    name: "Fedex",
                    imageUrl: require('../assets/images/fedex.png'),
                })
            },
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
            imageUrl: require('../assets/images/komitex.png'),
            newMessage: false,
            navigateToChat: () => {
                navigation.navigate("Chat", {
                    id: "bcd456",
                    type: "Order",
                    name: "Komitex",
                    imageUrl: require('../assets/images/komitex.png'),
                })
            },
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
            imageUrl: require('../assets/images/dhl.png'),
            newMessage: true,
            navigateToChat: () => {
                navigation.navigate("Chat", {
                    id: "efg789",
                    type: "Order",
                    name: "DHL",
                    imageUrl: require('../assets/images/dhl.png'),
                })
            },
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
            imageUrl: require('../assets/images/ups.png'),
            newMessage: false,
            navigateToChat: () => {
                navigation.navigate("Chat", {
                    id: "ghi901",
                    type: "Order",
                    name: "UPS",
                    imageUrl: require('../assets/images/ups.png'),
                })
            },
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
            imageUrl: require('../assets/images/fedex.png'),
            newMessage: true,
            navigateToChat: () => {
              navigation.navigate("Chat", {
                id: "fedex101",
                type: "Order",
                name: "Fedex",
                imageUrl: require('../assets/images/fedex.png'),
              });
            },
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
            imageUrl: require('../assets/images/ups.png'),
            newMessage: true,
            navigateToChat: () => {
              navigation.navigate("Chat", {
                id: "ups001",
                type: "Order",
                name: "UPS",
                imageUrl: require('../assets/images/ups.png'),
              });
            },
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
            imageUrl: require('../assets/images/fedex.png'),
            newMessage: false,
            navigateToChat: () => {
              navigation.navigate("Chat", {
                id: "fedex102",
                type: "Order",
                name: "Fedex",
                imageUrl: require('../assets/images/fedex.png'),
              });
            },
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
            imageUrl: require('../assets/images/ups.png'),
            newMessage: false,
            navigateToChat: () => {
              navigation.navigate("Chat", {
                id: "ups002",
                type: "Order",
                name: "UPS",
                imageUrl: require('../assets/images/ups.png'),
              });
            },
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
            imageUrl: require('../assets/images/ups.png'),
            newMessage: true,
            navigateToChat: () => {
              navigation.navigate("Chat", {
                id: "ups003",
                type: "Order",
                name: "UPS",
                imageUrl: require('../assets/images/ups.png'),
              });
            },
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
            imageUrl: require('../assets/images/fedex.png'),
            newMessage: true,
            navigateToChat: () => {
              navigation.navigate("Chat", {
                id: "fedex103",
                type: "Order",
                name: "Fedex",
                imageUrl: require('../assets/images/fedex.png'),
              });
            },
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
            imageUrl: require('../assets/images/fedex.png'),
            newMessage: false,
            navigateToChat: () => {
              navigation.navigate("Chat", {
                id: "fedex104",
                type: "Order",
                name: "Fedex",
                imageUrl: require('../assets/images/fedex.png'),
              });
            },
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
            imageUrl: require('../assets/images/fedex.png'),
            newMessage: true,
            navigateToChat: () => {
              navigation.navigate("Chat", {
                id: "fedex105",
                type: "Order",
                name: "Fedex",
                imageUrl: require('../assets/images/fedex.png'),
              });
            },
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
            imageUrl: require('../assets/images/fedex.png'),
            newMessage: false,
            navigateToChat: () => {
              navigation.navigate("Chat", {
                id: "fedex106",
                type: "Order",
                name: "Fedex",
                imageUrl: require('../assets/images/fedex.png'),
              });
            },
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
            imageUrl: require('../assets/images/ups.png'),
            newMessage: false,
            navigateToChat: () => {
              navigation.navigate("Chat", {
                id: "ups004",
                type: "Order",
                name: "UPS",
                imageUrl: require('../assets/images/ups.png'),
              });
            },
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
            imageUrl: require('../assets/images/ups.png'),
            newMessage: true,
            navigateToChat: () => {
              navigation.navigate("Chat", {
                id: "ups005",
                type: "Order",
                name: "UPS",
                imageUrl: require('../assets/images/ups.png'),
              });
            },
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
            imageUrl: require('../assets/images/dhl.png'),
            newMessage: true,
            navigateToChat: () => {
              navigation.navigate("Chat", {
                id: "dhl001",
                type: "Order",
                name: "DHL",
                imageUrl: require('../assets/images/dhl.png'),
              });
            },
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
            imageUrl: require('../assets/images/dhl.png'),
            newMessage: false,
            navigateToChat: () => {
              navigation.navigate("Chat", {
                id: "dhl002",
                type: "Order",
                name: "DHL",
                imageUrl: require('../assets/images/dhl.png'),
              });
            },
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
            imageUrl: require('../assets/images/dhl.png'),
            newMessage: true,
            navigateToChat: () => {
              navigation.navigate("Chat", {
                id: "dhl003",
                type: "Order",
                name: "DHL",
                imageUrl: require('../assets/images/dhl.png'),
              });
            },
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
            imageUrl: require('../assets/images/dhl.png'),
            newMessage: false,
            navigateToChat: () => {
              navigation.navigate("Chat", {
                id: "dhl004",
                type: "Order",
                name: "DHL",
                imageUrl: require('../assets/images/dhl.png'),
              });
            },
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
            imageUrl: require('../assets/images/dhl.png'),
            newMessage: true,
            navigateToChat: () => {
              navigation.navigate("Chat", {
                id: "dhl005",
                type: "Order",
                name: "DHL",
                imageUrl: require('../assets/images/dhl.png'),
              });
            },
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
            imageUrl: require('../assets/images/fedex.png'),
            newMessage: false,
            navigateToChat: () => {
              navigation.navigate("Chat", {
                id: "fedex107",
                type: "Order",
                name: "Fedex",
                imageUrl: require('../assets/images/fedex.png'),
              });
            },
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
            imageUrl: require('../assets/images/fedex.png'),
            newMessage: true,
            navigateToChat: () => {
              navigation.navigate("Chat", {
                id: "fedex108",
                type: "Order",
                name: "Fedex",
                imageUrl: require('../assets/images/fedex.png'),
              });
            },
        },
    ];

    // state to indicate page loading
    const [pageLoading, setPageLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setPageLoading(false);
        }, 500);   
    })
    
    // function to apply filter
    const handleApplyFilter = (filterType) => {
        if (filterType !== "search") {
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
        } else {
            setSearchFilterParameters(prevParamters => {
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
        }

        closeFilter(); // pass true to not reset filter
    }


    const handleFilterParameters = (title, button, filterType) => {
        if (filterType !== "search") {
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
        } else {
            setSearchFilterParameters(prevParamters => {
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
    }
    
    const handleRemoveFilter = (title, filterType) => {
        if (filterType !== "search") {
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
        } else {
            setSearchFilterParameters(prevParamters => {
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
    }

    // function to clearAll fiter
    const handleClearAllFilter = (filterType) => {
        if (filterType !== "search") {
            // clear all filter
            handleRemoveFilter("Period");
            handleRemoveFilter("Status");
            handleRemoveFilter("Logistics");
        } else {
            // clear all filter
            handleRemoveFilter("Period", "search");
            handleRemoveFilter("Status", "search");
            handleRemoveFilter("Logistics", "search");
        }
        // close filter bottomsheet
        closeFilter();
    };

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
        // {
        //     title: "Warehouse",
        //     value: "All",
        //     default: true,
        //     buttons: [
        //         {
        //             text: "All",
        //             selected: true,
        //             onPress: () => {
        //                 handleFilterParameters("Warehouse", "All")
        //             }
        //         },
        //         {
        //             text: "Warri",
        //             selected: false,
        //             onPress: () => {
        //                 handleFilterParameters("Warehouse", "Warri")
        //             }
        //         },
        //         {
        //             text: "Asaba",
        //             selected: false,
        //             onPress: () => {
        //                 handleFilterParameters("Warehouse", "Asaba")
        //             }
        //         },
        //         {
        //             text: "Benin",
        //             selected: false,
        //             onPress: () => {
        //                 handleFilterParameters("Warehouse", "Benin")
        //             }
        //         },
        //         {
        //             text: "Sapele",
        //             selected: false,
        //             onPress: () => {
        //                 handleFilterParameters("Warehouse", "Sapele")
        //             }
        //         },
        //         {
        //             text: "Abraka",
        //             selected: false,
        //             onPress: () => {
        //                 handleFilterParameters("Warehouse", "Abraka")
        //             }
        //         },
        //     ]
        // },
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

    // filter order bottom sheet parameters
    const [searchFilterParameters, setSearchFilterParameters] = useState([
        {
            title: "Status",
            value: "All",
            default: true,
            buttons: [
                {
                    text: "All",
                    selected: true,
                    onPress: () => {
                        handleFilterParameters("Status", "All", "search")
                    }
                },
                {
                    text: "Pending",
                    selected: false,
                    onPress: () => {
                        handleFilterParameters("Status", "Pending", "search")
                    }
                },
                {
                    text: "Delivered",
                    selected: false,
                    onPress: () => {
                        handleFilterParameters("Status", "Delivered", "search")
                    }
                },
                {
                    text: "Cancelled",
                    selected: false,
                    onPress: () => {
                        handleFilterParameters("Status", "Cancelled", "search")
                    }
                },
                {
                    text: "Dispatched",
                    selected: false,
                    onPress: () => {
                        handleFilterParameters("Status", "Dispatched", "search")
                    }
                },
                {
                    text: "Rescheduled",
                    selected: false,
                    onPress: () => {
                        handleFilterParameters("Status", "Rescheduled", "search")
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
                        handleFilterParameters("Logistics", "All", "search")
                    }
                },
                {
                    text: "Komitex",
                    selected: false,
                    onPress: () => {
                        handleFilterParameters("Logistics", "Komitex", "search")
                    }
                },
                {
                    text: "Fedex",
                    selected: false,
                    onPress: () => {
                        handleFilterParameters("Logistics", "Fedex", "search")
                    }
                },
                {
                    text: "DHL",
                    selected: false,
                    onPress: () => {
                        handleFilterParameters("Logistics", "DHL", "search")
                    }
                },
                {
                    text: "UPS",
                    selected: false,
                    onPress: () => {
                        handleFilterParameters("Logistics", "UPS", "search")
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
                        handleFilterParameters("Period", "Today", "search")
                    }
                },
                {
                    text: "Yesterday",
                    selected: false,
                    onPress: () => {
                        handleFilterParameters("Period", "Yesterday", "search")
                    }
                },
                {
                    text: "Current week",
                    selected: false,
                    onPress: () => {
                        handleFilterParameters("Period", "Current week", "search")
                    }
                },
                {
                    text: "Last week",
                    selected: false,
                    onPress: () => {
                        handleFilterParameters("Period", "Last week", "search")
                    }
                },
                {
                    text: "Custom period",
                    selected: false,
                    onPress: () => {
                        handleFilterParameters("Period", "Custom period", "search")
                        openCalendar("StartDate");
                    }
                },
                {
                    text: "Current month",
                    selected: false,
                    onPress: () => {
                        handleFilterParameters("Period", "Current month", "search")
                    }
                },
                {
                    text: "Last month",
                    selected: false,
                    onPress: () => {
                        handleFilterParameters("Period", "Last month", "search")
                    }
                },
            ]
        }
    ]);

    // get filtervlaue
    const getFilterValue = (title, filterType) => {
        if (filterType !== "search") {
            return filterParameters.find(filterParam => filterParam.title === title).value
        } else {
            return searchFilterParameters.find(filterParam => filterParam.title === title).value
        }
    }

    const [orders, setOrders] = useState([
        {id: "sticky"},
        ...orderList
    ]);
 
    const [searchedOrders, setSearchedOrders] = useState([
        // ...orderList
    ]);

    
    // state to store search query
    const [searchQuery, setSearchQuery] = useState("");
 
    // total proce
    const totalPrice = orders.reduce((accumulator, currentOrder) => {
        const price = parseFloat(currentOrder.price);
        if (!isNaN(price)) {
          return accumulator + price;
        }
        return accumulator;
    }, 0);

    // console.log(totalPrice);

    // implement filter in home order list
    useEffect(() => {
        const newOrder = orderList.filter(order => {
            const filterArray = filterParameters.map(filterParam => {
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
            return filterArray.every((element) => element === true);;
        })

        setOrders([
            {id: "sticky"},
            ...newOrder
        ]);
    }, [getFilterValue("Status"), getFilterValue("Logistics"), getFilterValue("Period")]);

    // implement filter in home order list
    useEffect(() => {

        if (searchQuery === '') {
            return setSearchedOrders([]);
        }

        const searchResult = orderList.filter(order => {
            return order.name.toLowerCase().includes(searchQuery.toLowerCase()) || order.location.toLowerCase().includes(searchQuery.toLowerCase()) || order.logistics.toLowerCase().includes(searchQuery.toLowerCase()) || order.products.some(product => product.product_name.toLowerCase().includes(searchQuery.toLowerCase())) || order.phone_number.some(phone_number => phone_number.toLowerCase().includes(searchQuery.toLowerCase()));
        });

        // console.log(searchResult);

        const newOrder = searchResult.filter(order => {
            const filterArray = searchFilterParameters.map(filterParam => {
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

            return filterArray.every((element) => element === true);;
        })

        setSearchedOrders([
            ...newOrder
        ]);
    }, [getFilterValue("Status", "search"), getFilterValue("Logistics", "search"), getFilterValue("Period", "search"), searchQuery]);

    // order daily stat array
    const stats = [
        {
            id: 1,
            title: "Total Earnings",
            presentValue: totalPrice,
            oldValue: 745500,
            decimal: true,
            unit: "₦",
            unitPosition: "start",
        },
        {
            id: 2,
            title: "Total Orders",
            presentValue: orders.length - 1,
            oldValue: 36,
            decimal: false,
            unit: "",
            unitPosition: "end",
        },
        {
            id: 3,
            title: "Total Delivered",
            presentValue: orders.filter(order => order.status === "Delivered").length,
            oldValue: 33,
            decimal: false,
            unit: "",
            unitPosition: "end",
        },
        {
            id: 4,
            title: "Total Cancelled",
            presentValue: orders.filter(order => order.status === "Cancelled").length,
            oldValue: 3,
            decimal: false,
            unit: "",
            unitPosition: "end",
        },
    ];
    
    // close modal function
    const closeModal = () => {
        bottomSheetRef.current?.close();
    };

    // open modal function
    const openModal = () => {
        bottomSheetRef.current?.present();
    }

    // filter state
    const [filterType, setFilterType] = useState("home")

    // open filter function
    const openFilter = (type) => {
        Keyboard.dismiss();
        setFilterType(type)
        filterSheetRef.current?.present()
    }
    
    const closeFilter = () => {
        // close filter bottomsheet
        filterSheetRef.current?.close()
    }

    // sticky header offset
    const stickyHeaderOffset = useRef(0);

    const shadowElevation = useRef(new Animated.Value(0)).current;

    // animated shadow when scroll height reaches sticky header
    const animateHeaderOnScroll = (e) => {
        // console.log(stickyHeaderOffset.current);
        const yOffset = e.nativeEvent.contentOffset.y;
        // console.log(yOffset);
        Animated.timing(shadowElevation, {
            toValue: yOffset > stickyHeaderOffset.current ? 3 : 0,
            duration: 200,
            useNativeDriver: false,
        }).start();
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

    // calendar state
    const [calendar, setCalendar] = useState({
        setDate: setStartDate,
        maxDate: false,
        minDate: false,
    });

    // function to setEnd date as today if start date is selected as today
    useEffect(() => {
        // console.log(startDate);
        // console.log(today);
        if (moment(startDate).format('DD MMMM, YYYY') === moment(today).format('DD MMMM, YYYY')) {
            setEndDate(today);
        }
    }, [startDate])

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

    const closeCalendar = () => {
        setActiveEndDate(false);
        setActiveStartDate(false);
        calendarSheetRef.current?.close();
    }

    useEffect(() => {
        if (!calendarSheetOpen) {
            setActiveEndDate(false);
            setActiveStartDate(false);
        };
    }, [])

    // function to set startDate and endDate based on range provided
    const handleSetTimeRange = (range) => {

    }

    return (
        <>
            {!pageLoading ? (<>
                <Header
                    navigation={navigation}
                    stackName={"Orders"}
                    removeBackArrow={true}
                    icon={<MenuIcon />}
                    iconFunction={() => {}}
                    backgroundColor={background}
                />
                {/* page content */}
                <TouchableWithoutFeedback style={{flex: 1}}>
                    <FlatList 
                        // onscroll event run function
                        onScroll={animateHeaderOnScroll}
                        // disable flatlist vertical scroll indicator
                        showsVerticalScrollIndicator={false}
                        stickyHeaderIndices={[1]}
                        // flat list header component
                        ListHeaderComponent={
                            <View 
                                style={style.headerWrapper}
                                onLayout={e => {
                                    stickyHeaderOffset.current = e.nativeEvent.layout.height + 57;
                                    // where 57 is the height of the Header component
                                }}
                            >
                                <StatWrapper>
                                    {stats.map(stat => (
                                        <StatCard
                                            key={stat.id}
                                            title={stat.title}
                                            presentValue={stat.presentValue}
                                            oldValue={stat.oldValue}
                                            decimal={stat.decimal}
                                            unit={stat.unit}
                                            unitPosition={stat.unitPosition}
                                        />
                                    ))}
                                </StatWrapper>
                                {/* onPress navigate to sendOrder page */}
                                <CustomButton
                                    secondaryButton={true}
                                    name={"Send an Order"}
                                    shrinkWrapper={true}
                                    onPress={() => navigation.navigate("SendOrder")}
                                    unpadded={true}
                                    wrapperStyle={{marginTop: 22}}
                                />
                            </View>
                        }
                        // pad the bottom due to presence of a bottom nav
                        contentContainerStyle={{paddingBottom: 90}}
                        style={style.listWrapper}
                        keyExtractor={item => item.id}
                        data={orders}
                        renderItem={({ item, index }) => {
                            // console.log(index);
                            if (item.id === "sticky") {
                                return (
                                    <Animated.View
                                        style={[
                                            style.stickyBar,
                                            {elevation: shadowElevation}
                                        ]}
                                    >
                                        <View style={style.recentOrderHeading}>
                                            <View style={style.recentOrderTextWrapper}>
                                                <Text style={style.recentOrderHeadingText}>Recent Orders</Text>
                                                {/* badge showing numbers of unread orders */}
                                                <Badge number={orders.filter(order => order.newMessage).length} />
                                            </View>
                                            <View style={style.actionWrapper}>
                                                {/* search button to trigger search bottomsheet */}
                                                <TouchableOpacity 
                                                    style={style.menuIcon}
                                                    onPress={() => openModal("search")}
                                                    >
                                                    <SearchIcon />
                                                </TouchableOpacity>
                                                <OpenFilterButton
                                                    onPress={() => openFilter("home")}
                                                    filterParams={filterParameters}
                                                />
                                            </View>
                                        </View>
                                        <View style={style.orderPillWrapper}>
                                            {filterParameters.map(filterParam => {
                                                if (!filterParam.default) {
                                                    if (filterParam.value !== "Custom period") {
                                                        return (
                                                            <FilterPill
                                                                key={filterParam.title}
                                                                text={filterParam.value}
                                                                onPress={() => handleRemoveFilter(filterParam.title)}
                                                                background={white}
                                                            />
                                                        )
                                                    }
                                                }
                                            })}

                                        </View>
                                    </Animated.View>
                                )
                            }
                            return (
                                <View style={style.orderWrapper}>
                                    <OrderListItem 
                                        item={item} 
                                        index={index} 
                                        lastOrder={orders.length - 1}
                                        firstOrder={1}
                                        extraVerticalPadding={true} 
                                    />
                                </View>
                            )
                        }}
                    />
                </TouchableWithoutFeedback>
            </>) : <OrdersSkeleton />}
            {/* Header component */}
            {/* bottom sheet */}
            <CustomBottomSheet 
                bottomSheetModalRef={bottomSheetRef}
                closeModal={closeModal}
                snapPointsArray={["100%"]}
                autoSnapAt={0}
                sheetTitle={"Orders"}
                disablePanToClose={true}
            >
                <SearchBar 
                    placeholder={"Search orders"}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    backgroundColor={background}
                    openFilter={() => openFilter("search")}
                    filterParams={searchFilterParameters}
                />

                {/* check if any filter has been applied, i.e it is not in its default value */}
                {searchFilterParameters.find(filterParam => filterParam.default === false) && (
                    <View style={style.searchOrderPillWrapper}>
                        {searchFilterParameters.map(filterParam => {
                            if (!filterParam.default) {
                                if (filterParam.value !== "Custom period") {
                                    return (
                                        <FilterPill
                                            key={filterParam.title}
                                            text={filterParam.value}
                                            onPress={() => handleRemoveFilter(filterParam.title, "search")}
                                            background={background}
                                        />
                                    )
                                }
                            }
                        })}
                    </View>
                )}

                <BottomSheetScrollView 
                    showsVerticalScrollIndicator={false} 
                    style={style.orderSearchResults}
                >
                    {searchedOrders.map((order, index) => (
                        <OrderListItem
                            key={order.id} 
                            item={order} 
                            index={index}
                            firstOrder={0}
                            lastOrder={searchedOrders.length}
                            searchQuery={searchQuery}
                            sideFunctions={closeModal}
                        />   
                    ))}
                </BottomSheetScrollView>
            </CustomBottomSheet>
            {/* filter bottom sheet */}
            <FilterBottomSheet 
                fiterSheetRef={filterSheetRef}
                closeFilter={closeFilter}
                clearFilterFunction={handleClearAllFilter}
                applyFilterFunction={filterType === "search" ? () => handleApplyFilter("search") : handleApplyFilter}
                height={"80%"}
            >
                {filterType === "home" && filterParameters.map(item => (
                    <FilterButtonGroup
                        buttons={item.buttons}
                        title={item.title}
                        key={item.title}
                    />
                ))}

                {filterType === "search" && searchFilterParameters.map(item => (
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

// stylesheet
const style = StyleSheet.create({
    listWrapper: {
        width: "100%",
        height: "100%",
        backgroundColor: background,
    },
    headerWrapper: {
        paddingHorizontal: 20,
        width: "100%",
        backgroundColor: background,
        marginBottom: 30,
    },
    menuIcon: {
        width: 24,
        height: 24,
        backgroundColor: white,
        borderRadius: 6,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    orderButtonText: {
        fontFamily: "mulish-semibold",
        fontSize: 16,
        color: primaryColor,
    },
    stickyBar: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        backgroundColor: background,
        paddingHorizontal: 20,
        shadowColor: blackOut,
        shadowOffset: { 
            width: 0,
            height: 0
        },
        shadowOpacity: 0.05,
        shadowRadius: 20,
    },
    recentOrderHeading: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        height: 24,
    },
    recentOrderTextWrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 4,
    },
    recentOrderHeadingText: {
        fontFamily: "mulish-bold",
        color: bodyText,
        fontSize: 12,
    },
    actionWrapper: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
    },
    modalContent: {
        display: "flex",
        flexDirection: 'column',
        alignItems: "center",
        justifyContent: "flex-start",
        width: "100%",
        flex: 1,
    },
    orderPillWrapper: {
        width: '100%',
        display: "flex",
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: "center",
        justifyContent: "flex-start",
        gap: 8,
        paddingTop: 8,
        paddingBottom: 12,
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
    orderWrapper: {
        paddingHorizontal: 20,
    },
    inputContainer: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: 20,
        paddingEnd: 20,
        paddingBottom: 90,
    },

})
 
export default Orders;