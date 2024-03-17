// react native components
import { 
    View, 
    Text, 
    FlatList, 
    TouchableOpacity, 
    TouchableWithoutFeedback,
    StyleSheet,
    Animated,
    Keyboard
} from "react-native";

// icons
import MenuIcon from "../assets/icons/MenuIcon";
import SearchIcon from '../assets/icons/SearchIcon'
import CalendarIcon from "../assets/icons/CalendarIcon";
import SendOrderIcon from "../assets/icons/SendOrderIcon";

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
import { useState, useRef, useEffect, useMemo } from "react";

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
import OpenFilterButton from "../components/OpenFilterButton";

// bottomsheet component
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";

// moment
import moment from "moment";

// skeleton screen
import WaybillSkeleton from "../skeletons/WaybillSkeleton";

// globals
import { useGlobals } from "../context/AppContext";

// data
import { waybillList } from "../data/waybillList";

// use auth context
import { useAuth } from "../context/AuthContext";

// firebase
import {
    database,
} from "../Firebase";

// firestore functions
import {
    collection,
    getDoc,
    onSnapshot,
    where,
    query,
    orderBy,
    doc,
} from "firebase/firestore";
import { windowHeight } from "../utils/helpers";
const Waybill = ({navigation}) => {

    // use auth
    const { authData } = useAuth();

    // global variables
    const {
        bottomSheetRef,
        filterSheetRef,
        calendarSheetRef,
        calendarSheetOpen,
        setToast
    } = useGlobals();

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
            title: "Total Items Received",
            presentValue: 57,
            oldValue: 55,
            decimal: false,
            unit: "",
            unitPosition: "end",
        },
    ];

    // page loading state
    const [pageLoading, setPageLoading] = useState(true);

    // tabs, default as Outgoing for Merchants
    const [tab, setTab] = useState(authData?.account_type === "Merchant" ? "outgoing" : "incoming");

    // state to store searchQuery
    const [searchQuery, setSearchQuery] = useState("");

    // waybill state
    const [waybills, setWaybills] = useState([]);

    // get outgoing waybill
    const outgoingWaybill = useMemo(() => {
        const incrementCondition = authData?.account_type === "Merchant";
        return waybills.filter(waybill => waybill.is_increment === incrementCondition);
    }, [waybills]);

    // get incoming waybill
    const incomingWaybill = useMemo(() => {
        const incrementCondition = authData?.account_type === "Logistics";
        return waybills.filter(waybill => waybill.is_increment === incrementCondition);
    }, [waybills]);

    // rendered data in flatlist component
    const renderData = useMemo(() => {
        if (tab === "outgoing") {
            return [
                {id: "sticky"},
                ...outgoingWaybill,
            ]
        }
        return [
            {id: "sticky"},
            ...incomingWaybill,
        ]
    }, [tab, outgoingWaybill, incomingWaybill])

    // get waybill
    useEffect(() => {
        // fetch logistics/merchant business details
        const fetchBusiness = async (businessId) => {
            try {
                // businessses collection
                const docRef = doc(database, "businesses", businessId);
                const docSnap = await getDoc(docRef);
                // return businesses object
                return {
                    banner_image: docSnap.data().banner_image,
                    business_name: docSnap.data().business_name,
                    verified: docSnap.data().verified,
                };
            } catch (error) {
                // indicate error
                console.log("fetchBusiness Error: ", error.message);
                setToast({
                    text: error.message,
                    visible: true,
                    type: "error",
                });
            }
        }

        // fetch product name
        const fetchProductName = async (productId) => {
            try {
                const docRef = doc(database, "products", productId);
                const docSnap = await getDoc(docRef);
                return docSnap.data().product_name;
            } catch (error) {
                console.log("fetchProductName Error: ", error.message);
                setToast({
                    text: error.message,
                    visible: true,
                    type: "error",
                });
            }
        }


        // fetch merchants products with id of array provided
        const fetchProducts = async (idArray, quantityArray) => {
            try {
                let productsArray = [];

                await Promise.all(idArray.map(async (id, index) => {
                    try {
                        const docRef = doc(database, "merchant_products", id);
                        const docSnap = await getDoc(docRef);

                        const productId = docSnap.data()?.product_id;
                        // console.log("productId: ", productId);
                        const productName = await fetchProductName(productId);

                        // console.log(productName);
                        // console.log(quantityArray);
        
                        productsArray.push({
                            product_name: productName,
                            quantity: quantityArray[index],
                        });
                    } catch (error) {
                        console.log("Error fetching product details: ", error.message);
                        // Handle the error here if needed
                        setToast({
                            text: error.message,
                            visible: true,
                            type: "error",
                        });
                    }
                }));

                return productsArray;
            } catch (error) {
                console.log("fetchProducts Error: ", error.message);
                setToast({
                    text: error.message,
                    visible: true,
                    type: "error",
                });
            }
        }

        // fetch warehouses
        const fetchWaybill = async (business_id) => {
            try {
                const collectionRef = collection(database, "waybills");

                const matchField = authData?.account_type === "Merchant" ? 
                "merchant_business_id" : 
                "logistics_business_id";

                // Create a Date object for today at 00:00:01 AM
                const today = new Date();
                today.setHours(0, 0, 1, 0);


                let q = query(
                    collectionRef,
                    where(matchField, "==", business_id),
                    where("edited_at", ">", today),
                    orderBy("edited_at")
                );
                
                const unsubscribe = onSnapshot(q, async (querySnapshot) => {
                    let waybillList = [];

                    for (const doc of querySnapshot.docs) {
                        const waybillData = doc.data();
                        // Fetch waybill data for the warehouse
                        const business = await fetchBusiness(
                            authData?.account_type === "Merchant" ? 
                            waybillData.logistics_business_id : 
                            waybillData.merchant_business_id
                        );

                        // of product id
                        const merchantProductIdArray = waybillData.merchant_products_id;
                        const quantityArray = waybillData.quantity;

                        const products = await fetchProducts(merchantProductIdArray, quantityArray);

                        // products listed
                        const productsListed = products.map(product => {
                            // seperate list of products by commas ','
                            return `${product.product_name} \u00D7 ${product.quantity}`;
                        }).join(", ");

                        const waybillItem = {
                            id: doc.id,
                            banner_image: business.banner_image,
                            business_name: business.business_name,
                            chat_id: waybillData.chat_id,
                            is_increment: waybillData.is_increment,
                            logistics_business_id: waybillData.logistics_business_id,
                            merchant_business_id: waybillData.merchant_business_id,
                            status: waybillData.status,
                            verified: business.verified,
                            products: productsListed,
                            created_at: waybillData.created_at,
                        };
                        waybillList.push(waybillItem);
                    }

                    // waybillList.unshift({id: "sticky"});

                    // set waybills
                    setWaybills(waybillList);

                    // disable page loading state
                    setPageLoading(false);

                    
                    }, (error) => { //handle errors
                        // indicate error
                        console.log("fetchWaybill Error: ", error.message);
                        setToast({
                            text: error.message,
                            visible: true,
                            type: "error",
                        });
                        // disable page loading state
                        setPageLoading(false);
                    }
                );
    
                return unsubscribe;
            } catch (error) {
                // indicate error
                console.log("fetchWaybill Error: ", error.message);
                setToast({
                    text: error.message,
                    visible: true,
                    type: "error",
                });

                // disable page loading state
                setPageLoading(false);
            }
        };

        // fetch waybill
        const unsubscribePromise = fetchWaybill(authData?.business_id);

        // Cleanup function to unsubscribe from snapshot listener
        return () => {
            // Unsubscribe from snapshot listener once unsubscribePromise is resolved
            unsubscribePromise.then(unsubscribe => {
                if (unsubscribe) {
                    unsubscribe();
                }
            });
        };

    }, []);

    // console.log(waybills);

    // close search modal bottomsheet function
    const closeModal = () => {
        bottomSheetRef.current?.close();
        // reset filter type
        setFilterType(tab)
    };
    
    // open search modal bottomsheet function
    const openModal = () => {
        // set filter as search filter
        setFilterType("search")
        bottomSheetRef.current?.present();
    }

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

    // scroll height
    const [scrollHeight, setScrollHeight] = useState(0);

    // animated shadow when scroll height reaches sticky header
    const animateHeaderOnScroll = (e) => {
        // console.log(stickyHeaderOffset.current);
        setScrollHeight(e.nativeEvent.contentOffset.y)
    }

    // filter state
    const [filterType, setFilterType] = useState("outgoing")

    // open filter function
    const openFilter = () => {
        Keyboard.dismiss();
        filterSheetRef.current?.present()
    }
    
    // close filter
    const closeFilter = () => {
        // close filter bottomsheet
        filterSheetRef.current?.close()
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
        if (filterType === "incoming") {
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
        } else if (filterType === "outgoing") {
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
        } else if (filterType === "search") {
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

    const [calendar, setCalendar] = useState({
        setDate: setStartDate,
        maxDate: false,
        minDate: false,
    });

    // function to setEnd date as today if start date is selected as today
    useEffect(() => {
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

    const updateWaybillList = (tab) => {
        if (tab === "outgoing") {
            const outgoingWaybill = waybillList.filter(waybill => waybill.inventory_action === `${authData?.account_type === "Merchant" ? "increment" : "decrement"}`);

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
            const incomingWaybill = waybillList.filter(waybill => waybill.inventory_action === `${authData?.account_type === "Merchant" ? "decrement" : "increment"}`);
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
        setFilterType(tab);
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
    }, [incomingFilter, outgoingFilter, searchFilter, searchQuery]);

    useEffect(() => {
        if (!calendarSheetOpen) {
            setActiveEndDate(false);
            setActiveStartDate(false);
        }
    }, [calendarSheetOpen])

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
                    // icon={<MenuIcon />}
                    // iconFunction={() => {}}
                />
                {/* screen content */}
                <TouchableWithoutFeedback>
                    <FlatList 
                        onScroll={animateHeaderOnScroll}
                        showsVerticalScrollIndicator={false}
                        stickyHeaderIndices={[1]}
                        ListHeaderComponent={
                            <View 
                                style={style.headerWrapper}
                                onLayout={e => {
                                    stickyHeaderOffset.current = e.nativeEvent.layout.height;
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
                                    wrapperStyle={{marginTop: 22, marginBottom: 20}}
                                />
                            </View>
                        }
                        contentContainerStyle={style.contentContainer}
                        style={style.container}
                        keyExtractor={item => item.id}
                        data={renderData}
                        key={waybills.length}
                        renderItem={({ item, index }) => {
                            if (item.id === "sticky") {
                                return (<>
                                    <View 
                                        style={[
                                            style.stickyHeader,
                                            scrollHeight > stickyHeaderOffset.current && style.shadow,
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
                                                <OpenFilterButton
                                                    onPress={openFilter}
                                                    filterParams={tab === "outgoing" ? outgoingFilter : incomingFilter}
                                                />
                                            </View>
                                        </View>
                                        {/* page tabs */}
                                        <View 
                                            style={[
                                                style.tabContainer,
                                                {flexDirection: authData?.account_type === "Merchant" ? 
                                                    "row" : // for merchant show outgoing tab first
                                                    "row-reverse" // for logistics show incoming tab first
                                                },
                                            ]}
                                        >
                                            <TouchableOpacity 
                                                style={tab === "outgoing" ? style.tabButtonSelected : style.tabButton}
                                                onPress={() => setTab("outgoing")}
                                            >
                                                <Text style={tab === "outgoing" ? style.tabButtonTextSelected : style.tabButtonText} >Outgoing</Text>
                                                <Badge number={getNumberOfUnreadMessages(authData?.account_type === "Merchant" ? "increment" : "decrement")} />
                                            </TouchableOpacity>
                                            <TouchableOpacity 
                                                style={tab === "incoming" ? style.tabButtonSelected : style.tabButton}
                                                onPress={() => setTab("incoming")}
                                            >
                                                <Text style={tab === "incoming" ? style.tabButtonTextSelected : style.tabButtonText} >Incoming</Text>
                                                <Badge number={getNumberOfUnreadMessages(authData?.account_type === "Merchant" ? "decrement" : "increment")} />
                                            </TouchableOpacity>
                                        </View>
                                        {/* check if any filter has been applied, i.e it is not in its default value */}
                                        {filterType === "outgoing" && outgoingFilter.find(filterParam => filterParam.default === false) && (
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
                                        {filterType === "incoming" && incomingFilter.find(filterParam => filterParam.default === false) && (
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
                                    </View>
                                </>)
                            } else {
                                return (
                                    <View style={style.waybillListWrapper}>
                                        <WaybillListItem 
                                            lastWaybill={index === renderData.length - 1}
                                            firstWaybill={index === 1}
                                            bannerImage={item?.banner_image}
                                            businesName={item?.business_name}
                                            status={item?.status}
                                            products={item?.products}
                                            newMessage={item?.new_message}
                                            createdAt={item?.created_at}
                                            onPress={() => navigation.navigate("Chat", {
                                                chatId: item?.chat_id,
                                                chatType: "Waybill",
                                                isIncrement: item?.is_increment,
                                                bannerImage: item?.banner_image,
                                                businessName: item?.business_name,
                                                verified: item?.verified
                                            })}
                                        />
                                    </View>
                                ) 
                            }
                        }}
                        ListEmptyComponent={<>
                            {waybills.length === 1 && (
                                <View style={style.emptyOrderWrapper}>
                                    <SendOrderIcon />
                                    <Text style={style.emptyOrderHeading}>No waybill yet</Text>
                                    <Text style={style.emptyOrderParagraph}>
                                        Store your products in your logistics  partner’s warehouse
                                    </Text>
                                </View>
                            )}
                        </>}
                    />
                </TouchableWithoutFeedback>
            </> : <WaybillSkeleton />}
            {/* bottomsheet */}
            <CustomBottomSheet 
                bottomSheetModalRef={bottomSheetRef}
                closeModal={closeModal}
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
                    filterParams={searchFilter}
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
                applyFilterFunction={() => {
                    if (filterType === "search") {
                        return handleApplyFilter("search");
                    } else if (filterType === "incoming") {
                        return handleApplyFilter("incoming");
                    } else if (filterType === "outgoing") {
                        return handleApplyFilter("outgoing");
                        
                    }
                }}
                height={"80%"}
            >
                {filterType === "incoming" && incomingFilter.map(item => (
                    <FilterButtonGroup
                        buttons={item.buttons}
                        title={item.title}
                        key={item.title}
                    />
                ))}

                {filterType === "outgoing" && outgoingFilter.map(item => (
                    <FilterButtonGroup
                        buttons={item.buttons}
                        title={item.title}
                        key={item.title}
                    />
                ))}

                {filterType === "search" && searchFilter.map(item => (
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
                calendarRef={calendarSheetRef} 
                closeCalendar={closeCalendar}
                setDate={calendar.setDate}
                disableActionButtons={true}
                snapPointsArray={["60%"]}
                minDate={calendar.minDate}
                maxDate={calendar.maxDate}
            />
        </>
    );
}

const style = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        backgroundColor: background,
    },
    contentContainer: {
        paddingBottom: 90,
        minHeight: windowHeight + 173,
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
    shadow: {
        elevation: 2,
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
        marginTop: 10,
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
    emptyOrderWrapper: {
        height: 150,
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        flexDirection: 'column',
    },
    emptyOrderHeading: {
        color: black,
        fontSize: 14,
        fontFamily: 'mulish-semibold',
        marginTop: 12,
        marginBottom: 8,
    },
    emptyOrderParagraph: {
        color: bodyText,
        fontSize: 12,
        fontFamily: 'mulish-regular',
        width: 178,
        textAlign: 'center',
    },
})
 
export default Waybill;