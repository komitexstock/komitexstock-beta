// react native components
import { 
    View, 
    Text, 
    FlatList, 
    TouchableOpacity, 
    TouchableWithoutFeedback,
    StyleSheet,
    BackHandler,
    Animated,
    Keyboard
} from "react-native";
// icons
import MenuIcon from "../assets/icons/MenuIcon";
import SearchIcon from '../assets/icons/SearchIcon'
import FilterIcon from '../assets/icons/FilterIcon';
import CalendarIcon from "../assets/icons/CalendarIcon";
// colors
import {
    background,
    black,
    blackOut,
    bodyText,
    neutral,
    primaryColor,
    secondaryColor,
    white,
} from "../style/colors";
// react hooks
import { useState, useRef, useEffect } from "react";
// components
import StatWrapper from "../components/StatWrapper";
import StatCard from "../components/StatCard";
import CustomBottomSheet from "../components/CustomBottomSheet";
import CustomButton from "../components/CustomButton";
import SearchBar from "../components/SearchBar";
import WaybillListItem from "../components/WaybillListItem";
import FilterPill from "../components/FilterPill";
import Badge from "../components/Badge";
import Header from "../components/Header";
import FilterBottomSheet from "../components/FilterBottomSheet";
import SelectInput from "../components/SelectInput";
import FilterButtonGroup from "../components/FilterButtonGroup";
import CalendarSheet from "../components/CalendarSheet";
// bottomsheet component
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
// moment
import moment from "moment";
// skeleton screen
import WaybillSkeleton from "../skeletons/WaybillSkeleton";

const Waybill = ({navigation}) => {

    // stata array
    const stats = [
        {
            id: 1,
            title: "Total Waybill Sent",
            presentValue: 30,
            oldValue: 28,
            decimal: false,
            unit: "",
            unitPosition: "start",
        },
        {
            id: 2,
            title: "Total Waybill Recived",
            presentValue: 5,
            oldValue: 4,
            decimal: false,
            unit: "",
            unitPosition: "end",
        },
        {
            id: 3,
            title: "Total Items Sent",
            presentValue: 74,
            oldValue: 63,
            decimal: false,
            unit: "",
            unitPosition: "end",
        },
        {
            id: 4,
            title: "Total Delivered",
            presentValue: 57,
            oldValue: 55,
            decimal: false,
            unit: "",
            unitPosition: "end",
        },
    ];

    const [pageLoading, setPageLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setPageLoading(false);
        }, 500);
    })

    // tabs, default as Outgoing for Merchants
    const [tab, setTab] = useState("outgoing");

    // state to store searchQuery
    const [searchQuery, setSearchQuery] = useState("");

    // search modal refernce
    const modalRef = useRef(null);

    // modal state
    const [modal, setModal] = useState({
        open: false,
    });

    // close search modal bottomsheet function
    const closeModal = () => {
        modalRef.current?.close();

        setModal({
            open: false,
        });

        setFilter(prevFilter => {
            return {
                ...prevFilter,
                filterType: tab,
            }
        })
    };
    
    // open search modal bottomsheet function
    const openModal = () => {
        // update modal state
        setModal({
            open: true,
        });
        // set filter as search
        setFilter(prevFilter => {
            return {
                ...prevFilter,
                filterType: "search",
            }
        })
        modalRef.current?.present();
    }

    // list of outgoing waybill
    const waybillList = [
        {
            products: [
                { product_name: "Shirt", quantity: 12 },
                { product_name: "Jeans", quantity: 4 },
            ],
            datetime: "2023-03-15 09:30",
            id: "abc123",
            logistics: "Komitex",
            inventory_action: "increment",
            status: "Delivered",
            imageUrl: require('../assets/images/komitex.png'),
            newMessage: true,
            navigateToChat: () => {
                navigation.navigate("Chat", {
                    id: "abc123",
                    type: "Waybill",
                    order: "Chat Message",
                    name: "Komitex",
                    imageUrl: require('../assets/images/komitex.png'),
                })
            },
        },
        {
            products: [
                { product_name: "Shoes", quantity: 10 },
                { product_name: "Socks", quantity: 5 },
            ],
            datetime: "2023-02-22 14:45",
            id: "def456",
            status: "Pending",
            logistics: "Fedex",
            inventory_action: "increment",
            imageUrl: require('../assets/images/fedex.png'),
            newMessage: false,
            navigateToChat: () => {
                navigation.navigate("Chat", {
                    id: "def456",
                    type: "Waybill",
                    order: "Chat Message",
                    name: "Fedex",
                    imageUrl: require('../assets/images/fedex.png'),
                })
            },
        },
        {
            products: [
                { product_name: "Hat", quantity: 8 },
            ],
            datetime: "2023-01-10 12:15",
            id: "ghi789",
            logistics: "Komitex",
            inventory_action: "increment",
            status: "Delivered",
            imageUrl: require('../assets/images/komitex.png'),
            newMessage: false,
            navigateToChat: () => {
                navigation.navigate("Chat", {
                    id: "ghi789",
                    type: "Waybill",
                    order: "Chat Message",
                    name: "Komitex",
                    imageUrl: require('../assets/images/komitex.png'),
                })
            },
        },
        {
            products: [
                { product_name: "Sunglasses", quantity: 4 },
            ],
            datetime: "2023-03-01 11:10",
            id: "mno345",
            logistics: "DHL",
            inventory_action: "increment",
            status: "Pending",
            imageUrl: require('../assets/images/dhl.png'),
            newMessage: true,
            navigateToChat: () => {
                navigation.navigate("Chat", {
                    id: "mno345",
                    type: "Waybill",
                    order: "Chat Message",
                    name: "Dhl",
                    imageUrl: require('../assets/images/dhl.png'),
                })
            },
        },
        {
            products: [
                { product_name: "T-Shirt", quantity: 6 },
            ],
            datetime: "2023-02-14 16:55",
            id: "pqr678",
            status: "Pending",
            logistics: "UPS",
            inventory_action: "increment",
            imageUrl: require('../assets/images/ups.png'),
            newMessage: false,
            navigateToChat: () => {
                navigation.navigate("Chat", {
                    id: "pqr678",
                    type: "Waybill",
                    order: "Chat Message",
                    name: "Ups",
                    imageUrl: require('../assets/images/ups.png'),
                })
            },
        },
        {
            products: [
                { product_name: "Dress", quantity: 3 },
                { product_name: "Handbag", quantity: 2 },
            ],
            datetime: "2023-04-05 15:20",
            id: "stu901",
            status: "Pending",
            logistics: "Fedex",
            inventory_action: "increment",
            imageUrl: require('../assets/images/fedex.png'),
            newMessage: true,
            navigateToChat: () => {
                navigation.navigate("Chat", {
                    id: "stu901",
                    type: "Waybill",
                    order: "Chat Message",
                    name: "Fedex",
                    imageUrl: require('../assets/images/fedex.png'),
                })
            },
        },
        {
            products: [
                { product_name: "Sweater", quantity: 7 },
                { product_name: "Beanie", quantity: 3 },
            ],
            datetime: "2023-05-12 09:55",
            id: "vwx234",
            status: "Delivered",
            logistics: "Komitex",
            inventory_action: "increment",
            imageUrl: require('../assets/images/komitex.png'),
            newMessage: false,
            navigateToChat: () => {
                navigation.navigate("Chat", {
                    id: "vwx234",
                    type: "Waybill",
                    order: "Chat Message",
                    name: "Komitex",
                    imageUrl: require('../assets/images/komitex.png'),
                })
            },
        },
        {
            products: [
                { product_name: "Running Shoes", quantity: 2 },
            ],
            datetime: "2023-06-20 17:30",
            id: "yza567",
            status: "Pending",
            logistics: "DHL",
            inventory_action: "increment",
            imageUrl: require('../assets/images/dhl.png'),
            newMessage: false,
            navigateToChat: () => {
                navigation.navigate("Chat", {
                    id: "yza567",
                    type: "Waybill",
                    order: "Chat Message",
                    name: "Dhl",
                    imageUrl: require('../assets/images/dhl.png'),
                })
            },
        },
        {
            products: [
                { product_name: "Shorts", quantity: 5 },
            ],
            datetime: "2023-07-15 14:10",
            id: "bcd890",
            status: "Delivered",
            logistics: "UPS",
            inventory_action: "increment",
            imageUrl: require('../assets/images/ups.png'),
            newMessage: true,
            navigateToChat: () => {
                navigation.navigate("Chat", {
                    id: "bcd890",
                    type: "Waybill",
                    order: "Chat Message",
                    name: "Ups",
                    imageUrl: require('../assets/images/ups.png'),
                })
            },
        },
        {
            products: [
                { product_name: "Backpack", quantity: 1 },
            ],
            datetime: "2023-08-08 10:45",
            id: "efg123",
            status: "Pending",
            logistics: "Fedex",
            inventory_action: "increment",
            imageUrl: require('../assets/images/fedex.png'),
            newMessage: false,
            navigateToChat: () => {
                navigation.navigate("Chat", {
                    id: "efg123",
                    type: "Waybill",
                    order: "Chat Message",
                    name: "Fedex",
                    imageUrl: require('../assets/images/fedex.png'),
                })
            },
        },
        {
            products: [
                { product_name: "Dress", quantity: 3 },
                { product_name: "Scarf", quantity: 1 },
            ],
            datetime: "2023-05-03 10:20",
            id: "stu961",
            status: "Pending",
            logistics: "Komitex",
            inventory_action: "decrement",
            imageUrl: require('../assets/images/komitex.png'),
            newMessage: false,
            navigateToChat: () => {
                navigation.navigate("Chat", {
                    id: "stu901",
                    type: "Waybill",
                    order: "Chat Message",
                    name: "Komitex",
                    imageUrl: require('../assets/images/komitex.png'),
                })
            },
        },
        {
            products: [
                { product_name: "Pants", quantity: 2 },
            ],
            datetime: "2023-04-01 09:45",
            id: "vwx224",
            status: "Delivered",
            logistics: "Fedex",
            inventory_action: "decrement",
            imageUrl: require('../assets/images/fedex.png'),
            newMessage: false,
            navigateToChat: () => {
                navigation.navigate("Chat", {
                    id: "vwx234",
                    type: "Waybill",
                    order: "Chat Message",
                    name: "Fedex",
                    imageUrl: require('../assets/images/fedex.png'),
                })
            },
        },
        {
            products: [
                { product_name: "Sweater", quantity: 3 },
            ],
            datetime: "2023-05-21 15:30",
            id: "yz0183",
            status: "Pending",
            logistics: "Komitex",
            inventory_action: "decrement",
            imageUrl: require('../assets/images/komitex.png'),
            newMessage: false,
            navigateToChat: () => {
                navigation.navigate("Chat", {
                    id: "yz0123",
                    type: "Waybill",
                    order: "Chat Message",
                    name: "Komitex",
                    imageUrl: require('../assets/images/komitex.png'),
                })
            },
        },
    ];

    // waybill list
    const [waybill, setWaybill] = useState([
        {id: "sticky"},
        ...waybillList.filter(waybill => waybill.inventory_action === "increment"),
    ]);

    const [searchedWaybill, setSearchedWaybill] = useState(waybillList);

    // function to get number of unread messages
    const getNumberOfUnreadMessages = (inventory_action) => {
        if (inventory_action === "increment") {
            return waybillList.filter(waybill => waybill.newMessage && waybill.inventory_action === "increment").length
        } else if (inventory_action === "decrement") {
            return waybillList.filter(waybill => waybill.newMessage && waybill.inventory_action === "decrement").length
        }
    }

    // sticky header offset
    const stickyHeaderOffset = useRef(0);

    // shadow elevation value, to be animated on scroll of flatlist component
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

    // filter state
    const [filter, setFilter] = useState({
        open: false,
        filterType: "outgoing",
    })

    // filter bottom sheef ref
    const filterSheetRef = useRef(null);

    // open filter function
    const openFilter = () => {
        Keyboard.dismiss();
        setFilter(prevFilter => {
            return {
                ...prevFilter,
                open: true,
            }
        })
        filterSheetRef.current?.present()
    }
    
    const closeFilter = () => {
        // close filter bottomsheet
        filterSheetRef.current?.close()
        setFilter({
            ...filter,
            open: false,
        })
    }

    // function to apply filter
    const handleApplyFilter = (filterType) => {
        if (filterType === "incoming") {
            setIncomingFilter(prevParamters => {
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
        } else if (filterType === "outgoing") {
            setOutgoingFilter(prevParamters => {
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
        } else if (filterType === "search") {
            setSearchFilter(prevParamters => {
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

    // console.log(filter);


    // function to set filter parameter, runc on click an action button in filter bottomsheet
    const handleFilterParameters = (title, button, filterType) => {
        if (filterType === "incoming") {
            setIncomingFilter(prevParamters => {
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
        } else if (filterType === "outgoing") {
            setOutgoingFilter(prevParamters => {
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
        } else if (filterType === "search") {
            setSearchFilter(prevParamters => {
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
    
    // function to remove filter
    const handleRemoveFilter = (title) => {
        if (filter.filterType === "incoming") {
            setIncomingFilter(prevParamters => {
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
        } else if (filter.filterType === "outgoing") {
            setOutgoingFilter(prevParamters => {
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
        } else if (filter.filterType === "search") {
            setSearchFilter(prevParamters => {
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
    const handleClearAllFilter = () => {
        // clear all filter
        handleRemoveFilter("Period");
        handleRemoveFilter("Status");
        handleRemoveFilter("Logistics");
        // close filter bottomsheet
        closeFilter();
    }

    // filter incoming waybill bottom sheet parameters
    const [incomingFilter, setIncomingFilter] = useState([
        {
            title: "Status",
            value: "All",
            default: true,
            buttons: [
                {
                    text: "All",
                    selected: true,
                    onPress: () => {
                        handleFilterParameters("Status", "All", "incoming")
                    }
                },
                {
                    text: "Pending",
                    selected: false,
                    onPress: () => {
                        handleFilterParameters("Status", "Pending", "incoming")
                    }
                },
                {
                    text: "Delivered",
                    selected: false,
                    onPress: () => {
                        handleFilterParameters("Status", "Delivered", "incoming")
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
                        handleFilterParameters("Logistics", "All", "incoming")
                    }
                },
                {
                    text: "Komitex",
                    selected: false,
                    onPress: () => {
                        handleFilterParameters("Logistics", "Komitex", "incoming")
                    }
                },
                {
                    text: "Fedex",
                    selected: false,
                    onPress: () => {
                        handleFilterParameters("Logistics", "Fedex", "incoming")
                    }
                },
                {
                    text: "DHL",
                    selected: false,
                    onPress: () => {
                        handleFilterParameters("Logistics", "DHL", "incoming")
                    }
                },
                {
                    text: "UPS",
                    selected: false,
                    onPress: () => {
                        handleFilterParameters("Logistics", "UPS", "incoming")
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
                        handleFilterParameters("Period", "Today", "incoming")
                    }
                },
                {
                    text: "Yesterday",
                    selected: false,
                    onPress: () => {
                        handleFilterParameters("Period", "Yesterday", "incoming")
                    }
                },
                {
                    text: "Current week",
                    selected: false,
                    onPress: () => {
                        handleFilterParameters("Period", "Current week", "incoming")
                    }
                },
                {
                    text: "Last week",
                    selected: false,
                    onPress: () => {
                        handleFilterParameters("Period", "Last week", "incoming")
                    }
                },
                {
                    text: "Custom period",
                    selected: false,
                    onPress: () => {
                        handleFilterParameters("Period", "Custom period", "incoming")
                        openCalendar("StartDate");
                    }
                },
                {
                    text: "Current month",
                    selected: false,
                    onPress: () => {
                        handleFilterParameters("Period", "Current month", "incoming")
                    }
                },
                {
                    text: "Last month",
                    selected: false,
                    onPress: () => {
                        handleFilterParameters("Period", "Last month", "incoming")
                    }
                },
            ]
        }
    ]);

    // filter outcoming waybill bottom sheet parameters
    const [outgoingFilter, setOutgoingFilter] = useState([
        {
            title: "Status",
            value: "All",
            default: true,
            buttons: [
                {
                    text: "All",
                    selected: true,
                    onPress: () => {
                        handleFilterParameters("Status", "All", "outgoing")
                    }
                },
                {
                    text: "Pending",
                    selected: false,
                    onPress: () => {
                        handleFilterParameters("Status", "Pending", "outgoing")
                    }
                },
                {
                    text: "Delivered",
                    selected: false,
                    onPress: () => {
                        handleFilterParameters("Status", "Delivered", "outgoing")
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
                        handleFilterParameters("Logistics", "All", "outgoing")
                    }
                },
                {
                    text: "Komitex",
                    selected: false,
                    onPress: () => {
                        handleFilterParameters("Logistics", "Komitex", "outgoing")
                    }
                },
                {
                    text: "Fedex",
                    selected: false,
                    onPress: () => {
                        handleFilterParameters("Logistics", "Fedex", "outgoing")
                    }
                },
                {
                    text: "DHL",
                    selected: false,
                    onPress: () => {
                        handleFilterParameters("Logistics", "DHL", "outgoing")
                    }
                },
                {
                    text: "UPS",
                    selected: false,
                    onPress: () => {
                        handleFilterParameters("Logistics", "UPS", "outgoing")
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
                        handleFilterParameters("Period", "Today", "outgoing")
                    }
                },
                {
                    text: "Yesterday",
                    selected: false,
                    onPress: () => {
                        handleFilterParameters("Period", "Yesterday", "outgoing")
                    }
                },
                {
                    text: "Current week",
                    selected: false,
                    onPress: () => {
                        handleFilterParameters("Period", "Current week", "outgoing")
                    }
                },
                {
                    text: "Last week",
                    selected: false,
                    onPress: () => {
                        handleFilterParameters("Period", "Last week", "outgoing")
                    }
                },
                {
                    text: "Custom period",
                    selected: false,
                    onPress: () => {
                        handleFilterParameters("Period", "Custom period", "outgoing")
                        openCalendar("StartDate");
                    }
                },
                {
                    text: "Current month",
                    selected: false,
                    onPress: () => {
                        handleFilterParameters("Period", "Current month", "outgoing")
                    }
                },
                {
                    text: "Last month",
                    selected: false,
                    onPress: () => {
                        handleFilterParameters("Period", "Last month", "outgoing")
                    }
                },
            ]
        }
    ]);

    // filter order bottom sheet parameters
    const [searchFilter, setSearchFilter] = useState([
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
        if (filterType === "incoming") {
            return incomingFilter.find(filterParam => filterParam.title === title).value
        } else if (filterType === "outgoing") {
            return outgoingFilter.find(filterParam => filterParam.title === title).value
        } else if (filterType === "search") {
            return searchFilter.find(filterParam => filterParam.title === title).value
        }
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

    const closeCalendar = () => {
        setActiveEndDate(false);
        setActiveStartDate(false);
        setCalendar({
            ...calendar,
            open: false,
        })
        calendarRef.current?.close();
    }

    const updateWaybillList = (tab) => {
        if (tab === "outgoing") {
            const outgoingWaybill = waybillList.filter(waybill => waybill.inventory_action === "increment");

            const newWaybillList = outgoingWaybill.filter(waybill => {
                const filterArray = outgoingFilter.map(filterParam => {
                    if (filterParam.title !== "Period") {
                        if (filterParam.value === "All") {
                            return true;
                        } else {
                            if (filterParam.title === "Status") {
                                return filterParam.value.toLowerCase() === waybill.status.toLowerCase();
                            } else if (filterParam.title === "Logistics") {
                                return filterParam.value === waybill.logistics;
                            }
                        } 
                    } else {
                        return true;
                    }
                })
                // console.log(filterArray);

                return filterArray.every((element) => element === true);;
            })

            setWaybill([
                {id: "sticky"},
                ...newWaybillList
            ]);            
        } else {
            const incomingWaybill = waybillList.filter(waybill => waybill.inventory_action === "decrement");
            // console.log(searchResult);
    
            const newWaybillList = incomingWaybill.filter(waybill => {
                const filterArray = incomingFilter.map(filterParam => {
                    if (filterParam.title !== "Period") {
                        if (filterParam.value === "All") {
                            return true;
                        } else {
                            if (filterParam.title === "Status") {
                                return filterParam.value.toLowerCase() === waybill.status.toLowerCase();
                            } else if (filterParam.title === "Logistics") {
                                return filterParam.value === waybill.logistics;
                            }
                        } 
                    } else {
                        return true;
                    }
                })
                // console.log(filterArray);
    
                return filterArray.every((element) => element === true);;
            })
    
            setWaybill([
                {id: "sticky"},
                ...newWaybillList
            ]);
        }
    }

    // implement filter in outgoing waybill list
    useEffect(() => {
        if (tab === "outgoing") {
            setFilter(prevFilter => {
                return {
                    ...prevFilter,
                    filterType: tab,
                }
            })
        } else {
            setFilter(prevFilter => {
                return {
                    ...prevFilter,
                    filterType: tab,
                }
            })
        }

        updateWaybillList(tab);
    }, [incomingFilter, outgoingFilter, tab]);
    
    // implement filter in search waybill list
    useEffect(() => {

        if (searchQuery === '') {
            return setSearchedWaybill([]);
        }

        const searchResult = waybillList.filter(waybill => {
            return waybill.logistics.toLowerCase().includes(searchQuery.toLowerCase()) || waybill.products.some(product => product.product_name.toLowerCase().includes(searchQuery.toLowerCase()));
        });

        // console.log(searchResult);

        const newWaybillList = searchResult.filter(waybill => {
            const filterArray = searchFilter.map(filterParam => {
                if (filterParam.title !== "Period") {
                    if (filterParam.value === "All") {
                        return true;
                    } else {
                        if (filterParam.title === "Status") {
                            return filterParam.value.toLowerCase() === waybill.status.toLowerCase();
                        } else if (filterParam.title === "Logistics") {
                            return filterParam.value === waybill.logistics;
                        }
                    } 
                } else {
                    return true;
                }
            })
            // console.log(filterArray);

            return filterArray.every((element) => element === true);;
        })

        setSearchedWaybill([
            ...newWaybillList
        ]);
    }, [getFilterValue("Status", "search"), getFilterValue("Logistics", "search"), getFilterValue("Period", "search"), searchQuery]);

    // use effect to close modal if 
    // back button is pressed and modal is opened
    useEffect(() => {
        // function to run if back button is pressed
        const backAction = () => {
            // Run your function here
            if (calendar.open) {
                closeCalendar();
                return true;        
            }else if (filter.open) {
                closeFilter();
                return true;
            } else if (modal.overlay) {
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

    }, [modal, filter, calendar]);


    return (
        <>
            {/* header component */}
            {!pageLoading ? <>
                {/* fixed header */}
                <Header
                    navigation={navigation}
                    stackName={"Waybill"}
                    removeBackArrow={true}
                    backgroundColor={background}
                    icon={<MenuIcon />}
                    iconFunction={() => {}}
                />
                {/* screen content */}
                <TouchableWithoutFeedback style={{flex: 1}}>
                    <FlatList 
                        onScroll={animateHeaderOnScroll}
                        showsVerticalScrollIndicator={false}
                        stickyHeaderIndices={[1]}
                        ListHeaderComponent={
                            <View 
                                style={style.headerWrapper}
                                onLayout={e => {
                                    stickyHeaderOffset.current = e.nativeEvent.layout.height + 57;
                                    // where 57 is the height of the Header component
                                }}
                            >
                                {/* stats */}
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
                                {/* onPress navigate to send waybill page */}
                                <CustomButton
                                    secondaryButton={true}
                                    name={"Send Waybill"}
                                    shrinkWrapper={true}
                                    onPress={() => navigation.navigate("SendWaybill")}
                                    unpadded={true}
                                    wrapperStyle={{marginTop: 22}}
                                />
                            </View>
                        }
                        contentContainerStyle={{paddingBottom: 90}}
                        style={style.listWrapper}
                        keyExtractor={item => item.id}
                        data={waybill}
                        renderItem={({ item, index }) => {
                            if (item.id === "sticky") {
                                return (
                                    <Animated.View 
                                        style={[
                                            style.stickyHeader,
                                            {elevation: shadowElevation},
                                        ]}
                                    >
                                        <View style={style.recentOrderHeading}>
                                            <Text style={style.recentOrderHeadingText}>Recent Waybills</Text>
                                            <View style={style.actionWrapper}>
                                                {/* trigger search modal */}
                                                <TouchableOpacity 
                                                    style={style.menuIcon}
                                                    onPress={openModal}
                                                >
                                                    <SearchIcon />
                                                </TouchableOpacity>
                                                {/* trigger filter modal */}
                                                <TouchableOpacity
                                                    style={style.menuIcon}
                                                    onPress={openFilter}
                                                >
                                                    <FilterIcon />
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                        {/* page tabs */}
                                        <View style={style.tabContainer}>
                                            <TouchableOpacity 
                                                style={tab === "outgoing" ? style.tabButtonSelected : style.tabButton}
                                                onPress={() => setTab("outgoing")}
                                            >
                                                <Text style={tab === "outgoing" ? style.tabButtonTextSelected : style.tabButtonText} >Outgoing</Text>
                                                <Badge number={getNumberOfUnreadMessages("increment")} />
                                            </TouchableOpacity>
                                            <TouchableOpacity 
                                                style={tab === "incoming" ? style.tabButtonSelected : style.tabButton}
                                                onPress={() => setTab("incoming")}
                                            >
                                                <Text style={tab === "incoming" ? style.tabButtonTextSelected : style.tabButtonText} >Incoming</Text>
                                                <Badge number={getNumberOfUnreadMessages("decrement")} />
                                            </TouchableOpacity>
                                        </View>
                                        {/* check if any filter has been applied, i.e it is not in its default value */}
                                        {filter.filterType === "outgoing" && outgoingFilter.find(filterParam => filterParam.default === false) && (
                                            <View style={style.filterPillWrapper}>
                                                {outgoingFilter.map(filterParam => {
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

                                        {/* check if any filter has been applied, i.e it is not in its default value */}
                                        {filter.filterType === "incoming" && incomingFilter.find(filterParam => filterParam.default === false) && (
                                            <View style={style.filterPillWrapper}>
                                                {incomingFilter.map(filterParam => {
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
                                    </Animated.View>
                                )
                            } else {
                                return (
                                    <View style={style.waybillListWrapper}>
                                        <WaybillListItem 
                                            item={item} 
                                            index={index}
                                            lastWaybill={waybill.length - 1}
                                            firstWaybill={1}
                                        />
                                    </View>
                                ) 
                            }
                        }}
                    />
                </TouchableWithoutFeedback>
            </> : <WaybillSkeleton />}
            {/* bottomsheet */}
            <CustomBottomSheet 
                bottomSheetModalRef={modalRef}
                showOverlay={modal.overlay}
                closeModal={() => closeModal()}
                snapPointsArray={["100%"]}
                autoSnapAt={0}
                sheetTitle={"Waybills"}
                disablePanToClose={true}
            >
                {/* {modal.modalContent} */}
                <SearchBar 
                    placeholder={"Search Waybill"}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    backgroundColor={background}
                    openFilter={openFilter}
                />
                {/* check if any filter has been applied, i.e it is not in its default value */}
                {searchFilter.find(filterParam => filterParam.default === false) && (
                    <View style={style.searchOrderPillWrapper}>
                        {searchFilter.map(filterParam => {
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
                <BottomSheetScrollView showsVerticalScrollIndicator={false} style={style.orderSearchResults}>
                    {searchedWaybill.map((item, index) => (
                        <WaybillListItem 
                            key={item.id}
                            item={item}
                            index={index}
                            lastWaybill={searchedWaybill.length - 1}
                            firstWaybill={0}
                            searchQuery={searchQuery}
                        />
                    ))}
                </BottomSheetScrollView>
            </CustomBottomSheet>
            {/* filter bottom sheet */}
            <FilterBottomSheet 
                fiterSheetRef={filterSheetRef}
                closeFilter={closeFilter}
                clearFilterFunction={handleClearAllFilter}
                applyFilterFunction={() => {
                    if (filter.filterType === "search") {
                        return handleApplyFilter("search");
                    } else if (filter.filterType === "incoming") {
                        return handleApplyFilter("incoming");
                    } else if (filter.filterType === "outgoing") {
                        return handleApplyFilter("outgoing");
                        
                    }
                }}
                height={"80%"}
            >
                {filter.filterType === "incoming" && incomingFilter.map(item => (
                    <FilterButtonGroup
                        buttons={item.buttons}
                        title={item.title}
                        key={item.title}
                    />
                ))}

                {filter.filterType === "outgoing" && outgoingFilter.map(item => (
                    <FilterButtonGroup
                        buttons={item.buttons}
                        title={item.title}
                        key={item.title}
                    />
                ))}

                {filter.filterType === "search" && searchFilter.map(item => (
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
                calendarRef={calendarRef} 
            />
        </>
    );
}

const style = StyleSheet.create({
    listWrapper: {
        width: "100%",
        height: "100%",
        backgroundColor: background,
    },
    headerWrapper: {
        width: "100%",
        paddingHorizontal: 20,
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
    stickyHeader: {
        backgroundColor: background,
        shadowColor: blackOut,
        // elevation: 2,
        paddingHorizontal: 20,
    },
    waybillListWrapper: {
        paddingHorizontal: 20,
    },
    recentOrderHeading: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        height: 24,
        marginTop: 8,
        marginBottom: 20,
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
    tabContainer: {
        width: "100%",
        display: "flex",
        flexDirection: 'row',
        height: 32,
        marginBottom: 20,
        alignItems: "center",
        justifyContent: "space-between",
    },
    tabButton: {
        width: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: '100%',
        flexDirection: "row",
        gap: 10,
    },
    tabButtonSelected: {
        width: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: '100%',
        borderBottomWidth: 2,
        borderBottomColor: primaryColor,
        flexDirection: "row",
        gap: 10,
    },
    tabButtonText: {
        fontFamily: 'mulish-semibold',
        fontSize: 14,
        color: neutral,
    },
    tabButtonTextSelected: {
        fontFamily: 'mulish-semibold',
        fontSize: 14,
        color: black,
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
    filterPillWrapper: {
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
 
export default Waybill;