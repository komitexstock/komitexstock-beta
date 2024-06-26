// react native components
import { 
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity, 
    TouchableWithoutFeedback, 
    Keyboard, 
    ScrollView,
} from "react-native";
// icons
import NotificationIcon from "../assets/icons/NotificationIcon";
import QuickOrderIcon from "../assets/icons/QuickOrderIcon";
import QuickAnalyticsIcon from "../assets/icons/AnalyticsIcon";
import QuickInventoryIcon from "../assets/icons/QuickInventoryIcon";
import QuickWaybillIcon from "../assets/icons/QuickWaybillIcon";
import TeamLargeIcon from "../assets/icons/TeamLargeIcon";
import QuickStockTransferIcon from "../assets/icons/QuickStockTransferIcon";
import CalendarIcon from "../assets/icons/CalendarIcon";
import RightArrowIcon from "../assets/icons/RightArrowIcon";
import CloseIcon from "../assets/icons/CloseIcon";
// components
import OrderListItem from "../components/OrderListItem";
import WaybillListItem from "../components/WaybillListItem";
import StockTransferListItem from "../components/StockTransferListItem";
import CustomBottomSheet from "../components/CustomBottomSheet";
import SearchBar from "../components/SearchBar";
import Header from "../components/Header";
import CustomButton from "../components/CustomButton";
import FilterBottomSheet from "../components/FilterBottomSheet";
import FilterButtonGroup from "../components/FilterButtonGroup";
import SelectInput from "../components/SelectInput";
import Calendar from "../components/Calendar";
import FilterPill from "../components/FilterPill";
import NoResult from "../components/NoResult";
// react hooks
import { useState, useEffect, useRef } from "react";
// bottomsheet component
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
// colors
import {
    accentLight,
    background,
    black,
    bodyText,
    greenLight,
    listSeperator4,
    primaryColor,
    secondaryColor,
    white,
    yellowLight,
} from "../style/colors";
// moment
import moment from "moment";
// home skeleton
import HomeSkeleton from "../skeletons/HomeSkeleton";
// globals
import { useGlobals } from "../context/AppContext";
// data
import { homeOrders } from "../data/homeOrders";
import { orderList } from "../data/orderList";
import { windowHeight, windowWidth } from "../utils/helpers";

// auth data
import { useAuth } from "../context/AuthContext";

// firebase
import {
    database,
} from "../Firebase";

// firestore functions
import {
    addDoc,
    collection,
    getDocs,
    where,
    query,
    orderBy,
    serverTimestamp,
} from "firebase/firestore";

// async storage
import AsyncStorage from "@react-native-async-storage/async-storage";

const Home = ({navigation}) => {

    const { authData, authLoading } = useAuth();

    // sheet refs
    const sheetRef = useRef(null);
    const filterSheetRef = useRef(null);

    // globals sates
    const {
        setFilterBottomSheet,
        setBottomSheet,
        setToast,
    } = useGlobals();

    const [sheetParameters, setSheetParameters] = useState({
        content: "Search",
        sheetTitle: "",
        snapPointsArray: ["100%"],
    })

    // update botomsheet global state
    useEffect(() => {
        // set bottomsheet state
        setBottomSheet(prevState=> {
            return {...prevState, close: () => sheetRef.current?.close()}
        });

        // set filter bottomsheet global state
        setFilterBottomSheet(prevState=> {
            return {...prevState, close: () => filterSheetRef.current?.close()}
        });
    }, []);

    // page loading state
    const [pageLoading, setPageLoading] = useState(true);

    // searched orders
    const [searchedOrders, setSearchedOrders] = useState([]);

    // state to hold search query
    const [searchQuery, setSearchQuery] = useState("");

    // setup guide array
    const [setupGuide, setSetupGuide] = useState([]);

    useEffect(() => {
        // check for setup guide
        const fetchSetupGuide = async () => {
            try {
                
                // if auth loadinf return early
                if (authLoading) return;

                // get seup guide value
                const showSetupGuideValue = await AsyncStorage.getItem("@showSetupGuide");
        
                const showSetupGuide = JSON.parse(showSetupGuideValue);    
                if (!showSetupGuide) {
                    // disable loading state
                    setPageLoading(false);
                    return setSetupGuide([]);
                };

                // products guide
                const products = {
                    title: "Set up your store",
                    subtitle: "Add products to your stores inventory",
                    icon: <QuickInventoryIcon />,
                    onPress: () => navigation.navigate("AddProduct"),
                };
    
                // team members guide
                const teamMembers = {
                    title: "Invite your staffs",
                    subtitle: "Send invites to your staffs (manager, sales representative)",
                    icon: <TeamLargeIcon />,
                    onPress: () => navigation.navigate("TeamMembers"),
                };
    
                // waybill guide
                const waybills = {
                    title: "Warehouse your products with Komitex",
                    subtitle: "Send waybill to your logistics partners for warehousing",
                    icon: <QuickWaybillIcon />,
                    onPress: () => navigation.navigate("SendOrder"),
                };
    
                // orders guide
                const orders = {
                    title: "Start earning with Komitex",
                    subtitle: "Make sales by sending orders to your logistics partners for delivery",
                    icon: <QuickOrderIcon />,
                    onPress: () => navigation.navigate("SendOrder"),
                }
    
                // array to store temporary values
                let setupArray = [];
                let q; // query
                let querySnapshot; // query result
    
                // ref to merchant_prodducts collection
                const merchantProductsRef = collection(database, "merchant_products");
                // check if they exist a product in merchant_products
                q = query(
                    merchantProductsRef, 
                    where("business_id", "==", authData?.business_id), 
                );
                // get docs
                querySnapshot = await getDocs(q);
                // if data does not exist push products setup guide
                if (querySnapshot.size === 0) {
                    // push products
                    setupArray.push(products);
                }

                // ref to users collection
                const usersRef = collection(database, "users");
                // check if they exist a product in merchant_products
                q = query(
                    usersRef, 
                    where("business_id", "==", authData?.business_id), 
                );
                // get docs
                querySnapshot = await getDocs(q);
                // if data does not exist push products setup guide
                if (querySnapshot.size === 1) {
                    // push team members
                    setupArray.push(teamMembers);
                }

                // ref to waybills collection
                const waybillsRef = collection(database, "waybills");
                // check if they exist a product in waybill
                q = query(
                    waybillsRef, 
                    where("merchant_id", "==", authData?.business_id), 
                );
                // get docs
                querySnapshot = await getDocs(q);
                // if data does not exist push products setup guide
                if (querySnapshot.size === 0) {
                    // push waybills
                    setupArray.push(waybills);
                }

                // ref to orders collection
                const ordersRef = collection(database, "orders");
                // check if they exist a product in order
                q = query(
                    ordersRef, 
                    where("merchant_id", "==", authData?.business_id), 
                );
                // get docs
                querySnapshot = await getDocs(q);
                // if data does not exist push products setup guide
                if (querySnapshot.size === 0) {
                    // push orders
                    setupArray.push(orders);
                }
    
                setSetupGuide(setupArray);

                // disable loading state
                setPageLoading(false);
            } catch (error) {
                // disable loading state
                setPageLoading(false);
                // log errors
                console.log(error.message);
                // show error toast
                setToast({
                    visible: true,
                    type: "error",
                    text: error.message,
                });
            }
        }

        fetchSetupGuide();
    }, [authLoading])

    const handleDisableSetupGuides = async () => {
        await AsyncStorage.setItem("@showSetupGuide", JSON.stringify(false));
        setSetupGuide([]);
    }
    
    // open bottom sheet functiom
    const openModal = (type) => {

        // update sheet parameters
        setSheetParameters({
            content: type,
            sheetTitle: type === "Search" ? "" : "Review",
            snapPointsArray: type === "Search" ? ["100%"] : [359],
        });

        // open bottomsheet
        sheetRef.current?.present();

        // update bottomsheet global state
        setBottomSheet(prevState => {
            return {
                ...prevState,
                opened: true,
            }
        });
    }

    // close bottom sheet functiom
    const closeModal = () => {
        // close bottmsheet
        sheetRef.current?.close();

        // update bottomsheet global state
        setBottomSheet(prevState => {
            return {
                ...prevState,
                opened: false,
            }
        });
    };

    // useEffect to open portal to review Bottomsheet
    // useEffect(() => {
    //     setTimeout(() => {
    //         openModal("Review");
    //     }, 5000);
    // }, [])

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

    // open filter function
    const openFilter = () => {
        // dismiss keyboard
        Keyboard.dismiss();

        // open filter bottomsheet
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

    // function to get filtervlaue
    const getFilterValue = (title) => {
        return filterParameters.find(filterParam => filterParam.title === title).value
    }

    // implement filter in home order list
    useEffect(() => {

        if (searchQuery === '') {
            return setSearchedOrders([]);
        }

        const searchResult = orderList.filter(order => {
            return order.name.toLowerCase().includes(searchQuery.toLowerCase()) || order.location.toLowerCase().includes(searchQuery.toLowerCase()) || order.logistics.toLowerCase().includes(searchQuery.toLowerCase()) || order.products.some(product => product.product_name.toLowerCase().includes(searchQuery.toLowerCase()))  || order.phone_number.some(phone_number => phone_number.toLowerCase().includes(searchQuery.toLowerCase()));
        });

        // console.log(searchResult);

        const newOrder = searchResult.filter(order => {
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

        setSearchedOrders([
            ...newOrder
        ]);
    }, [getFilterValue("Status"), getFilterValue("Logistics"), getFilterValue("Period"), searchQuery]);

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
        visible: false,
    });

    // function to open calendar
    const openCalendar = (inputType) => {
        // set calendar parameters for start date
        if (inputType === "StartDate") {
            setActiveStartDate(true);
            setCalendar({
                setDate: setStartDate,
                maxDate: endDate ? moment(endDate).subtract(1, 'days') : today,
                minDate: false,
                visible: true,
            });
        } else { // set calendar parameters for end date
            setActiveEndDate(true);
            setCalendar({
                setDate: setEndDate,
                maxDate: today,
                minDate: startDate ? moment(startDate).add(1, 'days') : startDate,
                visible: true,
            });
        }
    }

    // close calendar
    const closeCalendar = () => {
        // set all inputs as inactive
        setActiveEndDate(false);
        setActiveStartDate(false);


        // make calendar invisible
        setCalendar(prevCalendar => {
            return {
                ...prevCalendar,
                visible: false
            }
        });
    }

    const merchantQuickButtons = [
        {
            id: 1,
            icon: <QuickOrderIcon />,
            background: secondaryColor,
            mainText: "Send an Order",
            subText: "Make fast deliveries to your customers",
            onPress: () => navigation.navigate("SendOrder"),
        },
        {
            id: 2,
            icon: <QuickInventoryIcon />,
            background: accentLight,
            mainText: "Manage Inventory",
            subText: "Review and add to your stores inventory",
            onPress: () => navigation.navigate("Inventory"),
        },
        {
            id: 3,
            icon: <QuickWaybillIcon />,
            background: yellowLight,
            mainText: "Send Waybill",
            subText: "Restock your inventory with your preferred partner",
            onPress: () => navigation.navigate("SendWaybill"),
        },
        {
            id: 4,
            icon: <QuickAnalyticsIcon />,
            background: greenLight,
            mainText: "View Analytics",
            subText: "Easily view your business growth and analytics",
            onPress: () => navigation.navigate("Analytics"),
        },
    ];

    const logisticsQuickButtons = [
        {
            id: 1,
            icon: <QuickOrderIcon />,
            background: secondaryColor,
            mainText: "Pick up & Delivery",
            subText: "Easily schedule a pick up and drop off ",
            onPress: () => {}
        },
        {
            id: 2,
            icon: <QuickStockTransferIcon />,
            background: accentLight,
            mainText: "Stock Transfer",
            subText: "Manage warehouse inventory transfers",
            onPress: () => navigation.navigate("StockTransfer"),
        },
        {
            id: 3,
            icon: <QuickWaybillIcon />,
            background: yellowLight,
            mainText: "Send Waybill",
            subText: "Restock your inventory with your preferred partner",
            onPress: () => navigation.navigate("SendWaybill", {
                default_logistics_id: 'hKayAtQjkdIaCK2MpSEi',
            }),
        },
        {
            id: 4,
            icon: <QuickAnalyticsIcon />,
            background: greenLight,
            mainText: "View Analytics",
            subText: "Easily view your business growth and analytics",
            onPress: () => navigation.navigate("Analytics"),
        },
    ];

    const quickButtons = authData?.account_type === "Merchant" ? merchantQuickButtons : logisticsQuickButtons;

    // function to indicate the type of waybill
    const handleWaybillType = (inventoryAction) => {
        if (inventoryAction === "increment") {
            if (authData?.account_type === "Merchant") return "Outgoing";
            return "Incoming";
        }
        if (authData?.account_type === "Merchant") return "Incoming";
        return "Outcoming";
    }

    // render Home page
    return (
        <>
            {/* if screen is loading render skeleton else render screen */}
            {!pageLoading && !authLoading ? (
                <TouchableWithoutFeedback 
                    onPress={() => Keyboard.dismiss()}
                >
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        style={style.container}
                    >
                        <View
                            style={style.homeScrollView}
                        >
                            {/* Header Component */}
                            <Header
                                navigation={navigation}
                                stackName={
                                    <View style={style.headerTextContainer}>
                                        <Text style={style.paragraph}>Welcome back!</Text>
                                        <Text style={style.heading}>{authData?.full_name}</Text>
                                    </View>
                                }
                                removeBackArrow={true}
                                unpadded={true}
                                icon={<NotificationIcon />}
                                iconFunction={() => {navigation.navigate("Notifications")}}
                            />
                            {/* button search bar to open search modal bottomsheet */}
                            {setupGuide.length === 0 || authData?.account_type !== "Merchant" ? (
                                <SearchBar 
                                    placeholder={"Search Komitex"}
                                    backgroundColor={white}
                                    disableFilter={true}
                                    button={true}
                                    onPress={() => openModal("Search")}
                                />
                            ) : (
                                <View>
                                    <Text style={style.setupGuideHeading}>Setup guide</Text>
                                    <View style={style.setupGuideList}>
                                        <TouchableOpacity 
                                            style={style.closeSetupGuideButton}
                                            onPress={handleDisableSetupGuides}
                                        >
                                            <CloseIcon />
                                        </TouchableOpacity>
                                        {setupGuide.map((guide) => (
                                            <TouchableOpacity 
                                                style={style.setupGuideButton}
                                                key={guide.title}
                                                onPress={guide.onPress}
                                            >
                                                <View style={style.setupGuideTextWrapper}>
                                                    {guide.icon}
                                                    <View style={style.setupGuideTextContainer}>
                                                        <Text style={style.guideHeading}>{guide.title}</Text>
                                                        <Text style={style.guideParagraph}>{guide.subtitle}</Text>
                                                    </View>
                                                </View>
                                                <RightArrowIcon />
                                            </TouchableOpacity>
                                        ))}
                                    </View>
                                </View>
                            )}
                            <View style={style.callToActionTextWrapper}>
                                <Text style={style.callToActionText}>What do you want to do today?</Text>
                            </View>
                            {/* quick action buttons */}
                            <View style={style.quickAccessWrapper}>
                                {/* quick order */}
                                {quickButtons.map(button => (
                                    <TouchableOpacity 
                                        key={button.id}
                                        onPress={button.onPress}
                                        style={[
                                            style.quickActionButton,
                                            {backgroundColor: button.background}
                                        ]}
                                    >
                                        {button.icon}
                                        <Text style={style.quickActionHeading}>{button.mainText}</Text>
                                        <Text style={style.quickActionParagraph}>{button.subText}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                            {/* recent activities */}
                            <View style={style.homeOrders}>
                                <View style={style.homeOrdersHeader}>
                                    <Text style={style.homeOrdersHeading}>Recent Activities</Text>
                                    <TouchableOpacity
                                        // onPress={() => {navigation.navigate("RecentActivities")}}
                                        // onPress={() => {navigation.navigate("OrderDetails")}}
                                        // onPress={() => {navigation.navigate("WaybillDetails")}}
                                        // onPress={() => {navigation.navigate("TransferDetails")}}
                                        // onPress={() => {navigation.navigate("Share")}}
                                        onPress={() => {navigation.navigate("WriteReview")}}
                                        // onPress={bottomSheetParameters.openModal}
                                    >
                                        <Text style={style.seeMore} >
                                            See more
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            {/* day */}
                            <View style={style.dayWrapper}>
                                <Text style={style.dayText}>Today</Text>
                            </View>
                            {/* order, waybill and stock transfer list items */}
                            <View
                                style={style.ordersListWrapper}
                            >
                                {/* order list max 5 items */}
                                {homeOrders.map((order, index) => {
                                    // order list item
                                    if (order.activityType === "Order") return (
                                        <OrderListItem 
                                            key={order.id}
                                            navigation={navigation}
                                            item={order}
                                            index={index}
                                            lastOrder={homeOrders.length - 1} 
                                            firstOrder={0}
                                            extraVerticalPadding={true}
                                            showListType={true}
                                        />
                                    )
                                    // waybill list item
                                    if (order.activityType === "Waybill") return (
                                        <WaybillListItem 
                                            key={order.id}
                                            item={order} 
                                            navigation={navigation}
                                            index={index}
                                            lastWaybill={homeOrders.length - 1}
                                            firstWaybill={0}
                                            waybillType={handleWaybillType(order.inventory_action)}
                                        />
                                    )
                                    // stock tranfer list item
                                    if (order.activityType === "StockTransfer") return (
                                        <StockTransferListItem 
                                            key={order.id}
                                            item={order} 
                                            navigation={navigation}
                                            index={index}
                                            lastOrder={homeOrders.length - 1}
                                            firstOrder={0}
                                            extraVerticalPadding={true} 
                                            showListType={true}
                                        />
                                    )
                                })}

                                {/* no recent activotoes indication */}
                                {homeOrders.length === 0 && (
                                    <View style={style.noRecentActivities}>
                                        <Text style={style.setupGuideHeading}>No recent activities</Text>
                                        <Text style={style.noActivitiesParagraph}>
                                            When you send orders and waybill, you will see them here
                                        </Text>
                                    </View>
                                )}
                            </View>
                        </View>
                    </ScrollView>
                </TouchableWithoutFeedback>
            ) : <HomeSkeleton />}
            {/* bottomsheet */}
            <CustomBottomSheet
                sheetRef={sheetRef}
                closeModal={closeModal}
                sheetTitle={sheetParameters.sheetTitle}
                snapPointsArray={sheetParameters.snapPointsArray}
            >
                {sheetParameters.content === "Search" && <>
                    {/* text input search bar */}
                    <SearchBar 
                        placeholder={"Search Komitex"}
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        backgroundColor={background}
                        openFilter={openFilter}
                        filterParams={filterParameters}
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
                                                background={background}
                                            />
                                        )
                                    }
                                }
                            })}
                        </View>
                    )}

                    {/* search result order list */}
                    <BottomSheetScrollView 
                        style={style.orderSearchResults}
                        showsVerticalScrollIndicator={false}
                    >
                        {searchedOrders.map((order, index) => (
                            <OrderListItem 
                                key={order.id} 
                                item={order} 
                                index={index} 
                                firstOrder={0}
                                lastOrder={searchedOrders.length - 1}
                                searchQuery={searchQuery} 
                                sideFunctions={closeModal}
                            />
                        ))}

                        {searchQuery !== "" && searchedOrders.length === 0 && (
                            <NoResult />
                        )}
                    </BottomSheetScrollView>
                </>}

                {sheetParameters.content === "Review" && 
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
                            {/* navigate to write review screen buttton */}
                            <CustomButton
                                // secondaryButton={true}
                                name={"Write a Review"}
                                shrinkWrapper={true}
                                unpadded={true}
                                onPress={() => {
                                    closeModal();
                                    navigation.navigate("WriteReview");
                                }}
                            />
                            {/* maybe later button */}
                            <CustomButton
                                secondaryButton={true}
                                name={"Maybe Later"}
                                shrinkWrapper={true}
                                unpadded={true}
                                onPress={() => {
                                    closeModal();
                                }}
                            />
                        </View>
                    </View> 
                }
            </CustomBottomSheet>
            {/* filter bottom sheet */}
            <FilterBottomSheet 
                fiterSheetRef={filterSheetRef}
                closeFilter={closeFilter}
                clearFilterFunction={handleClearAllFilter}
                applyFilterFunction={handleApplyFilter}
                height={606}
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
            <Calendar
                visible={calendar.visible}
                closeCalendar={closeCalendar}
                setDate={calendar.setDate}
                disableActionButtons={true}
                minDate={calendar.minDate}
                maxDate={calendar.maxDate}
            />
        </>
    );
}

// stylesheet
const style = StyleSheet.create({
    container: {
        backgroundColor: background,
    },
    setupGuideHeading: {
        color: black,
        fontFamily: 'mulish-semibold',
        fontSize: 14,
    },
    setupGuideList: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingHorizontal: 12,
        paddingTop: 40,
        paddingBottom: 30,
        backgroundColor: white,
        borderRadius: 12,
        position: 'relative',
        width: windowWidth - 40,
        gap: 12,
        marginTop: 12,
        marginBottom: 20,
    },
    closeSetupGuideButton: {
        position: 'absolute',
        top: 0,
        right: 5,
    },
    setupGuideButton: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        flexDirection: 'row',
        paddingBottom: 8,
        borderBottomWidth: 1,
        borderBottomColor: listSeperator4,
        width: "100%",
    },
    setupGuideTextWrapper: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexDirection: 'row',
        width: "70%",
        gap: 10,
    },
    guideHeading: {
        color: black,
        fontFamily: 'mulish-semibold',
        fontSize: 12,
    },
    guideParagraph: {
        color: bodyText,
        fontFamily: 'mulish-regular',
        fontSize: 10,
    },
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
        minHeight:  windowHeight - 70,
        paddingHorizontal: 20,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        paddingBottom: 90,
        width: "100%",
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
    callToActionTextWrapper: {
        marginVertical: 10,
    },
    callToActionText: {
        color: bodyText,
        fontFamily: 'mulish-bold',
        fontSize: 12,
    },
    quickAccessWrapper: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 20,
        marginBottom: 30,
        width: '100%',
    },
    quickActionButton: {
        width: '45%',
        height: 100,
        flexGrow: 1,
        borderRadius: 12,
        display: 'flex',
        flexDirection: 'column',
        padding: 15,
        justifyContent: 'space-between',
        alignItems: 'flex-start',
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
        height: 15,
        marginBottom: 16,
    },
    homeOrdersHeader: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: "100%",
        // height: 50,
    },
    homeOrdersHeading: {
        fontFamily: 'mulish-bold',
        color: bodyText,
        fontSize: 10,
    },
    seeMore: {
        fontFamily: 'mulish-medium',
        color: primaryColor,
        fontSize: 12,
    },
    dayWrapper: {
        width: "100%",
        marginBottom: 12,
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        height: 15,
    },
    dayText: {
        fontFamily: 'mulish-semibold',
        color: bodyText,
        fontSize: 12,
    },
    ordersListWrapper: {
        height: "100%",
        width: "100%",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },

    noRecentActivities: {
        height: 100,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
    },
    noActivitiesParagraph: {
        width: 175,
        textAlign: 'center',
        color: bodyText,
        fontFamily: 'mulish-regular',
        fontSize: 12,
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
 
export default Home;