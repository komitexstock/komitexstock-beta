// react native component
import { 
    View, 
    Text, 
    FlatList, 
    TouchableOpacity, 
    TouchableWithoutFeedback,
    StyleSheet,
    BackHandler,
    Animated,
} from "react-native";
// colors
import { background, blackOut, bodyText, primaryColor, secondaryColor, white } from "../style/colors";
// icons
import MenuIcon from "../assets/icons/MenuIcon";
import SearchIcon from '../assets/icons/SearchIcon'
import CalendarIcon from "../assets/icons/CalendarIcon";
import FilterIcon from '../assets/icons/FilterIcon';
// react hooks
import { useState, useRef, useEffect } from "react";
// components
import StatWrapper from "../components/StatWrapper";
import StatCard from "../components/StatCard";
import OrderListItem from "../components/OrderListItem";
import CustomBottomSheet from "../components/CustomBottomSheet";
import SelectInput from "../components/SelectInput";
import FilterButtonGroup from "../components/FilterButtonGroup";
import SearchBar from "../components/SearchBar";
import Badge from "../components/Badge";
import Header from "../components/Header";
import FilterBottomSheet from "../components/FilterBottomSheet";
import CalendarSheet from "../components/CalendarSheet";
// bottomsheet components
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import FilterPill from "../components/FilterPill";
// moment
import moment from "moment";

const Orders = ({navigation}) => {

    // orders list
    const orderList = [
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
            newMessage: true,
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
        },
        {
            name: "Emily Wilson",
            location: "Paris",
            products: [
                { product_name: "Dress", quantity: 1 },
                { product_name: "Scarf", quantity: 2 },
            ],
            datetime: "2023-05-03 10:20",
            id: "stu901",
            price: 25000,
            status: "Delivered",
            imageUrl: require('../assets/images/komitex.png'),
            newMessage: false,
            navigateToChat: () => {
                navigation.navigate("Chat", {
                    id: "stu901",
                    type: "order",
                    order: "Chat Message",
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
            datetime: "2023-04-01 09:45",
            id: "vwx234",
            price: 18000,
            status: "Pending",
            imageUrl: require('../assets/images/fedex.png'),
            newMessage: false,
            navigateToChat: () => {
                navigation.navigate("Chat", {
                    id: "vwx234",
                    type: "order",
                    order: "Chat Message",
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
            datetime: "2023-05-21 15:30",
            id: "yz0123",
            price: 19000,
            status: "Dispatched",
            imageUrl: require('../assets/images/komitex.png'),
            newMessage: false,
            navigateToChat: () => {
                navigation.navigate("Chat", {
                    id: "yz0123",
                    type: "order",
                    order: "Chat Message",
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
            datetime: "2023-04-11 13:20",
            id: "bcd345",
            price: 22000,
            status: "Cancelled",
            imageUrl: require('../assets/images/dhl.png'),
            newMessage: false,
            navigateToChat: () => {
                navigation.navigate("Chat", {
                    id: "bcd345",
                    type: "order",
                    order: "Chat Message",
                    name: "Dhl",
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
            datetime: "2023-05-07 10:50",
            id: "efg567",
            price: 28000,
            status: "Delivered",
            imageUrl: require('../assets/images/ups.png'),
            newMessage: false,
            navigateToChat: () => {
                navigation.navigate("Chat", {
                    id: "efg567",
                    type: "order",
                    order: "Chat Message",
                    name: "Ups",
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
            datetime: "2023-04-25 16:15",
            id: "ghi678",
            price: 20000,
            status: "Rescheduled",
            imageUrl: require('../assets/images/komitex.png'),
            newMessage: true,
            navigateToChat: () => {
                navigation.navigate("Chat", {
                    id: "ghi678",
                    type: "order",
                    order: "Chat Message",
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
            datetime: "2023-06-01 11:30",
            id: "jkl901",
            price: 30000,
            status: "Pending",
            imageUrl: require('../assets/images/fedex.png'),
            newMessage: true,
            navigateToChat: () => {
                navigation.navigate("Chat", {
                    id: "jkl901",
                    type: "order",
                    order: "Chat Message",
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
            datetime: "2023-05-17 14:50",
            id: "mno234",
            price: 26000,
            status: "Dispatched",
            imageUrl: require('../assets/images/komitex.png'),
            newMessage: false,
            navigateToChat: () => {
                navigation.navigate("Chat", {
                    id: "mno234",
                    type: "order",
                    order: "Chat Message",
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
            datetime: "2023-04-05 12:05",
            id: "pqr345",
            price: 23000,
            status: "Cancelled",
            imageUrl: require('../assets/images/dhl.png'),
            newMessage: false,
            navigateToChat: () => {
                navigation.navigate("Chat", {
                    id: "pqr345",
                    type: "order",
                    order: "Chat Message",
                    name: "Dhl",
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
            datetime: "2023-06-03 09:40",
            id: "stu567",
            price: 32000,
            status: "Delivered",
            imageUrl: require('../assets/images/ups.png'),
            newMessage: true,
            navigateToChat: () => {
                navigation.navigate("Chat", {
                    id: "stu567",
                    type: "order",
                    order: "Chat Message",
                    name: "Ups",
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
            datetime: "2023-05-11 15:55",
            id: "vwx678",
            price: 24000,
            status: "Rescheduled",
            imageUrl: require('../assets/images/komitex.png'),
            newMessage: true,
            navigateToChat: () => {
                navigation.navigate("Chat", {
                    id: "vwx678",
                    type: "order",
                    order: "Chat Message",
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
            datetime: "2023-06-09 11:15",
            id: "yz0124",
            price: 35000,
            status: "Pending",
            imageUrl: require('../assets/images/fedex.png'),
            newMessage: false,
            navigateToChat: () => {
                navigation.navigate("Chat", {
                    id: "yz0124",
                    type: "order",
                    order: "Chat Message",
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
            datetime: "2023-05-26 16:40",
            id: "bcd456",
            price: 27000,
            status: "Dispatched",
            imageUrl: require('../assets/images/komitex.png'),
            newMessage: false,
            navigateToChat: () => {
                navigation.navigate("Chat", {
                    id: "bcd456",
                    type: "order",
                    order: "Chat Message",
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
            datetime: "2023-04-15 11:55",
            id: "efg789",
            price: 30000,
            status: "Cancelled",
            imageUrl: require('../assets/images/dhl.png'),
            newMessage: true,
            navigateToChat: () => {
                navigation.navigate("Chat", {
                    id: "efg789",
                    type: "order",
                    order: "Chat Message",
                    name: "Dhl",
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
            datetime: "2023-06-13 10:25",
            id: "ghi901",
            price: 38000,
            status: "Delivered",
            imageUrl: require('../assets/images/ups.png'),
            newMessage: false,
            navigateToChat: () => {
                navigation.navigate("Chat", {
                    id: "ghi901",
                    type: "order",
                    order: "Chat Message",
                    name: "Ups",
                    imageUrl: require('../assets/images/ups.png'),
                })
            },
        },
    ];

    // searched order list
    const ordersListSearched = [
        {
            name: "Emily Wilson",
            location: "Paris",
            products: [
                { product_name: "Dress", quantity: 1 },
                { product_name: "Scarf", quantity: 2 },
            ],
            datetime: "2023-05-03 10:20",
            id: "stu901",
            price: 25000,
            status: "Delivered",
            imageUrl: require('../assets/images/komitex.png'),
            navigateToChat: () => {
                navigation.navigate("Chat", {
                    id: "stu901",
                    type: "order",
                    order: "Chat Message",
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
            datetime: "2023-04-01 09:45",
            id: "vwx234",
            price: 18000,
            status: "Pending",
            imageUrl: require('../assets/images/fedex.png'),
            navigateToChat: () => {
                navigation.navigate("Chat", {
                    id: "vwx234",
                    type: "order",
                    order: "Chat Message",
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
            datetime: "2023-05-26 16:40",
            id: "bcd456",
            price: 27000,
            status: "Dispatched",
            imageUrl: require('../assets/images/komitex.png'),
            navigateToChat: () => {
                navigation.navigate("Chat", {
                    id: "bcd456",
                    type: "order",
                    order: "Chat Message",
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
            datetime: "2023-04-15 11:55",
            id: "efg789",
            price: 30000,
            status: "Cancelled",
            imageUrl: require('../assets/images/dhl.png'),
            navigateToChat: () => {
                navigation.navigate("Chat", {
                    id: "efg789",
                    type: "order",
                    order: "Chat Message",
                    name: "Dhl",
                    imageUrl: require('../assets/images/dhl.png'),
                })
            },
        },
    ]

    // order daily stat array
    const stats = [
        {
            id: 1,
            title: "Total Earnings",
            presentValue: 200000,
            oldValue: 185500,
            decimal: true,
            unit: "₦",
            unitPosition: "start",
        },
        {
            id: 2,
            title: "Total Orders",
            presentValue: 40,
            oldValue: 36,
            decimal: false,
            unit: "",
            unitPosition: "end",
        },
        {
            id: 3,
            title: "Total Delivered",
            presentValue: 29,
            oldValue: 33,
            decimal: false,
            unit: "",
            unitPosition: "end",
        },
        {
            id: 4,
            title: "Total Cancelled",
            presentValue: 1,
            oldValue: 3,
            decimal: false,
            unit: "",
            unitPosition: "end",
        },
    ];

    // function to apply filter
    const handleApplyFilter = () => {
        setFilterParameters(prevParamters => {
            return prevParamters.map(filterParam => {
                if (filterParam.title  !== "Period") {
                    const selectedButton = filterParam.buttons.filter(button => button.selected === true);
                    // console.log(selectedButton);
                    return {
                        ...filterParam,
                        value: selectedButton[0].text,
                        default: selectedButton[0].text === "All" ? true : false, 

                    }
                } else {
                    return {...filterParam}
                }
            })
        });
        closeFilter();
    }


    const handleFilterParameters = (title, button) => {
        if (title !== "Period") {
            // console.log("Here");
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
        }
    }
    
    const handleRemoveFIlter = (title) => {
        if (title !== "Period") {
            setFilterParameters(prevParamters => {
                return prevParamters.map(filterParam => {
                    if (filterParam.title === title) {
                        return {
                            ...filterParam,
                            default: true,
                            value: "All",
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

    // filter order button
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
            title: "Warehouse",
            value: "All",
            default: true,
            buttons: [
                {
                    text: "All",
                    selected: true,
                    onPress: () => {
                        handleFilterParameters("Warehouse", "All")
                    }
                },
                {
                    text: "Warri",
                    selected: false,
                    onPress: () => {
                        handleFilterParameters("Warehouse", "Warri")
                    }
                },
                {
                    text: "Asaba",
                    selected: false,
                    onPress: () => {
                        handleFilterParameters("Warehouse", "Asaba")
                    }
                },
                {
                    text: "Benin",
                    selected: false,
                    onPress: () => {
                        handleFilterParameters("Warehouse", "Benin")
                    }
                },
                {
                    text: "Sapele",
                    selected: false,
                    onPress: () => {
                        handleFilterParameters("Warehouse", "Sapele")
                    }
                },
                {
                    text: "Abraka",
                    selected: false,
                    onPress: () => {
                        handleFilterParameters("Warehouse", "Abraka")
                    }
                },
            ]
        },
        {
            title: "Period",
            value: new Date(),
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
                    text: "Current Week",
                    selected: false,
                    onPress: () => {
                        handleFilterParameters("Period", "Current week")
                    }
                },
                {
                    text: "Last Week",
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

    // console.log(filterParameters[0].value);

    // state to store search query
    const [searchQuery, setSearchQuery] = useState("");

    // search modal refernce
    const modalRef = useRef(null);

    // state to store modal parameters
    const [modal, setModal] = useState({
        snapPointsArray: ["50%"],
        autoSnapAt: 0,
        sheetTitle: "",
        overlay: false,
        modalContent: <></>,
        clearFilterFunction: false,
    })

    // use effect to close modal if back button is pressed
    useEffect(() => {
        // function to run if back button is pressed
        const backAction = () => {
            // Run your function here
            if (modal.overlay) {
                // if modal is open, close modal
                closeModal();
                return true;
            } else if (calendar.open) { //if calendar is open, close it
                handleCloseCalendar();
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

    }, [modal.overlay, calendar]);

    // search modal parameters
    const searchModal = {
        snapPointsArray: ["50%", "80%", "100%"],
        autoSnapAt: 2,
        sheetTitle: "Orders",
        overlay: true,
        clearFilterFunction: false,
        modalContent: <>
            <SearchBar 
                placeholder={"Search orders"}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                backgroundColor={"#f8f8f8"}
            />
            <BottomSheetScrollView style={style.orderSearchResults}>
                {ordersListSearched.map((order, index) => (
                    <OrderListItem
                        key={order.id} 
                        item={order} 
                        index={index} 
                        length={ordersListSearched.length} 
                    />
                ))}
            </BottomSheetScrollView>
        </>
    };

    // close modal function
    const closeModal = () => {
        setModal(prevModal => {
            return {
                ...prevModal,
                overlay: false,
            }
        });
        modalRef.current?.close();
    };

    // open modal function
    const openModal = (type) => {
        if (type === "filter") {
            setModal(filterModal);
        } else {
            setModal(searchModal);
        }
        modalRef.current?.present();
    }

    const filterSheetRef = useRef(null);

    const openFilter = () => {
        filterSheetRef.current?.present()
    }

    const closeFilter = () => {
        filterSheetRef.current?.close()
    }

    const fixedBarHeight = useRef(0);
    // const [scrollHeight, setScrollHeight] = useState(0);
    const [showHeaderShadow, setShowHeaderShadow] = useState(false);
    
    const animatedOffset = useRef(new Animated.Value(0)).current;

    const animateHeaderOnScroll = (e) => {
        const yOffset = e.nativeEvent.contentOffset.y;
        if (yOffset < fixedBarHeight.current) setShowHeaderShadow(false);
        else setShowHeaderShadow(true);
        Animated.timing(animatedOffset, {
            toValue: yOffset < fixedBarHeight.current ? -yOffset : -234,
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



    // calendar ref
    const calendarRef = useRef(null);

    const [calendar, setCalendar] = useState({
        open: false,
        setDate: setStartDate,
        maxDate: false,
        minDate: false,
    });

    useEffect(() => {
        // console.log(startDate);
        // console.log(today);
        if (moment(startDate).format('DD MMMM, YYYY') === moment(today).format('DD MMMM, YYYY')) {
            setEndDate(today);
        }
    }, [startDate])

    const hanldeOpenCalendar = (inputType) => {
        if (inputType === "StartDate") {
            setActiveStartDate(true);
            setCalendar({
                open: true,
                setDate: setStartDate,
                maxDate: endDate ? moment(endDate).subtract(1, 'days') : today,
                minDate: false
            });
        } else {
            setActiveEndDate(true);
            setCalendar({
                open: true,
                setDate: setEndDate,
                maxDate: today,
                minDate: startDate ? moment(startDate).add(1, 'days') : startDate,
            });
        }
        calendarRef.current?.present();
    }

    const handleCloseCalendar = () => {
        setActiveEndDate(false);
        setActiveStartDate(false);
        setCalendar({
            ...calendar,
            open: false,
        })
        calendarRef.current?.close();
    }
    // console.log(fixedBarHeight.current);
    // console.log(scrollHeight);

    return (
        <>
            {/* Header component */}
            <Header
                navigation={navigation}
                stackName={"Orders"}
                removeBackArrow={true}
                icon={<MenuIcon />}
                iconFunction={() => {}}
                backgroundColor={background}
            />
            <TouchableWithoutFeedback style={{flex: 1}}>
                <FlatList 
                    onScroll={animateHeaderOnScroll}
                    // disable flatlist vertical scroll indicator
                    showsVerticalScrollIndicator={false}
                    stickyHeaderIndices={[0]}
                    // flat list header component
                    ListHeaderComponent={
                        <Animated.View 
                            style={[
                                style.headerWrapper, 
                                {transform: [{translateY: animatedOffset}]},
                                showHeaderShadow && style.headerShadow
                            ]}
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
                            <TouchableOpacity 
                                style={style.sendOrderButton}
                                onPress={() => navigation.navigate("SendOrder")}
                            >
                                <Text style={style.orderButtonText}>Send an Order</Text>
                            </TouchableOpacity>
                            <View 
                                style={[
                                    style.unfixedBar,
                                ]}
                                onLayout={(e) => {
                                    fixedBarHeight.current = e.nativeEvent.layout.y;
                                }}
                            >
                                <View style={style.recentOrderHeading}>
                                    <View style={style.recentOrderTextWrapper}>
                                        <Text style={style.recentOrderHeadingText}>Recent Orders</Text>
                                        {/* badge showing numbers of unread orders */}
                                        <Badge number={9} />
                                    </View>
                                    <View style={style.actionWrapper}>
                                        {/* search button to trigger search bottomsheet */}
                                        <TouchableOpacity 
                                            style={style.menuIcon}
                                            onPress={() => openModal("search")}
                                            >
                                            <SearchIcon />
                                        </TouchableOpacity>
                                        {/* filter button to trigger filter bottomsheet */}
                                        <TouchableOpacity
                                            style={style.menuIcon}
                                            onPress={openFilter}
                                        >
                                            <FilterIcon />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={style.orderPillWrapper}>
                                    {filterParameters.map(filterParam => {
                                        if (!filterParam.default) {
                                            if (filterParam.title !== "Period") {
                                                return (
                                                    <FilterPill
                                                        key={filterParam.title}
                                                        text={filterParam.value}
                                                        onPress={() => handleRemoveFIlter(filterParam.title)}
                                                        background={white}
                                                    />
                                                )
                                            }
                                        }
                                    })}

                                </View>
                            </View>
                        </Animated.View>
                    }
                    // pad the bottom due to presence of a bottom nav
                    contentContainerStyle={{paddingBottom: 90}}
                    style={style.listWrapper}
                    keyExtractor={item => item.id}
                    data={filterParameters[0].value === "All" ? orderList : orderList.filter(order => order.status === filterParameters[0].value)}
                    // data={() => {
                    //     if (filterParameters[0].value === "All") return orderList;
                    //     else return orderList;
                    //     // else return orderList.filter(order => order.status === filterParameters[0].value);
                    // }}
                    renderItem={({ item, index }) => (
                        <View style={style.orderWrapper}>
                            <OrderListItem 
                                item={item} 
                                index={index} 
                                length={orderList.length} 
                                extraVerticalPadding={true} 
                            />
                        </View>
                    )}
                />
            </TouchableWithoutFeedback>
            {/* bottom sheet */}
            <CustomBottomSheet 
                bottomSheetModalRef={modalRef}
                showOverlay={modal.overlay}
                closeModal={() => closeModal("filter")}
                snapPointsArray={modal.snapPointsArray}
                autoSnapAt={modal.autoSnapAt}
                sheetTitle={modal.sheetTitle}
                clearFilterFunction={modal.clearFilterFunction}
            >
                {/* modal content */}
                {modal.modalContent}
            </CustomBottomSheet>
            {/* filter bottom sheet */}
            <FilterBottomSheet 
                fiterSheetRef={filterSheetRef}
                closeFilter={closeFilter}
                clearFilterFunction={() => {}}
                applyFilterFunction={handleApplyFilter}
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
                            onPress={() => {hanldeOpenCalendar("StartDate")}}
                            icon={<CalendarIcon />}
                            active={activeStartDate}
                            inputFor={"Date"}
                        />

                        {/* End date */}
                        <SelectInput
                            label={"End Date"}
                            placeholder={"DD MMMM, YYYY"}
                            value={endDate}
                            onPress={() => {hanldeOpenCalendar("EndDate")}}
                            icon={<CalendarIcon />}
                            active={activeEndDate}
                            inputFor={"Date"}
                        />
                    </View>
            </FilterBottomSheet>
            {/* calnedar */}
            <CalendarSheet 
                closeCalendar={handleCloseCalendar}
                setDate={calendar.setDate}
                disableActionButtons={true}
                snapPointsArray={["60%"]}
                minDate={calendar.minDate}
                maxDate={calendar.maxDate}
                calendarRef={calendarRef} 
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
        paddingBottom: 20,
        backgroundColor: background,
    },
    headerShadow: {
        shadowColor: blackOut,
        shadowOffset: { 
            width: 0,
            height: 4
        },
        shadowOpacity: 0.1,
        shadowRadius: 16,
        elevation: 5,
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
    sendOrderButton: {
        height: 44,
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: 'center',
        backgroundColor: secondaryColor,
        borderRadius: 12,
        marginVertical: 22,
    },
    orderButtonText: {
        fontFamily: "mulish-semibold",
        fontSize: 16,
        color: primaryColor,
    },
    unfixedBar: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        // backgroundColor: 'purple',
    },
    recentOrderHeading: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        height: 24,
        marginTop: 8,
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
        marginTop: 8,
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