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
import SearchIcon from "../assets/icons/SearchIcon";
import QuickOrderIcon from "../assets/icons/QuickOrderIcon";
import QuickAnalyticsIcon from "../assets/icons/AnalyticsIcon";
import QuickInventoryIcon from "../assets/icons/QuickInventoryIcon";
import QuickWaybiillIcon from "../assets/icons/QuickWaybillIcon";
import QuickStockTransferIcon from "../assets/icons/QuickStockTransferIcon";
import CalendarIcon from "../assets/icons/CalendarIcon";
// components
import OrderListItem from "../components/OrderListItem";
import CustomBottomSheet from "../components/CustomBottomSheet";
import SearchBar from "../components/SearchBar";
import Header from "../components/Header";
import CustomButton from "../components/CustomButton";
import FilterBottomSheet from "../components/FilterBottomSheet";
import FilterButtonGroup from "../components/FilterButtonGroup";
import SelectInput from "../components/SelectInput";
import CalendarSheet from "../components/CalendarSheet";
import FilterPill from "../components/FilterPill";
// react hooks
import { useState, useEffect } from "react";
// bottomsheet component
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
// colors
import { accentLight, background, black, bodyText, greenLight, primaryColor, secondaryColor, white, yellowLight } from "../style/colors";
// moment
import moment from "moment";
// home skeleton
import HomeSkeleton from "../skeletons/HomeSkeleton";
// globals
import { useGlobals } from "../context/AppContext";
// auth data
import { useAuth } from "../context/AuthContext";
// data
import { homeOrders } from "../data/homeOrders";
import { orderList } from "../data/orderList";

const Home = ({navigation}) => {

    const { authData, authLoading } = useAuth();

    // console.log("Auth Data:", authData);
      
    // sheef refs
    const { bottomSheetRef, filterSheetRef, calendarSheetRef, calendarSheetOpen } = useGlobals();

    // page loading state
    const [pageLoading, setPageLoading] = useState(false);

    // searched orders
    const [searchedOrders, setSearchedOrders] = useState([]);

    // state to hold search query
    const [searchQuery, setSearchQuery] = useState("");

    // close bottom sheet functiom
    const closeModal = () => {
        bottomSheetRef.current?.close();
    };
    
    // open bottom sheet functiom
    const openModal = () => {
        // reset modal parameters
        setModal({
            type: "Search",
            title: "",
            snapPointsArray: ["100%"],
            autoSnapAt: 0,
        });
        bottomSheetRef.current?.present();
    }

    const [modal, setModal] = useState({
        type: "Search",
        title: "",
        snapPointsArray: ["100%"],
        autoSnapAt: 0,
    })

    // useEffect to open portal to review Bottomsheet
    // useEffect(() => {
    //     setTimeout(() => {
    //         setModal({
    //             type: "Review",
    //             title: "",
    //             snapPointsArray: ["45%"],
    //             autoSnapAt: 0,
    //         });
    //         bottomSheetRef.current?.present();
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
        Keyboard.dismiss();
        filterSheetRef.current?.present()
    }
    
    const closeFilter = () => {
        // close filter bottomsheet
        filterSheetRef.current?.close()
    }

    // function to setEnd date as today if start date is selected as today
    useEffect(() => {
        // console.log(startDate);
        // console.log(today);
        if (moment(startDate).format('DD MMMM, YYYY') === moment(today).format('DD MMMM, YYYY')) {
            setEndDate(today);
        }
    }, [startDate])

    // to disable avtive states for date inputs if back button is pressed
    // ...when calendar sheet if open
    useEffect(() => {
        if (!calendarSheetOpen) {
            setActiveEndDate(false);
            setActiveStartDate(false);
        }

    }, [calendarSheetOpen])

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
            icon: <QuickWaybiillIcon />,
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
            icon: <QuickWaybiillIcon />,
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

    const quickButtons = authData?.account_type === "Merchant" ? merchantQuickButtons : logisticsQuickButtons;

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
                            <View style={style.homeWrapper}>
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
                                <View style={style.searchWrapper}>
                                    <SearchIcon />
                                    <TouchableOpacity 
                                        style={style.searchInput}
                                        onPress={openModal}
                                    >
                                        <Text style={style.searchPlaceholder}>Search Komitex</Text>
                                    </TouchableOpacity>
                                </View>
                                <View>
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
                                {/* recent orders */}
                                <View style={style.homeOrders}>
                                    <View style={style.homeOrdersHeader}>
                                        <Text style={style.homeOrdersHeading}>Recent Orders</Text>
                                        <TouchableOpacity
                                            // onPress={() => {navigation.navigate("Orders")}}
                                            onPress={() => {navigation.navigate("OrderDetails")}}
                                            // onPress={() => {navigation.navigate("Share")}}
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
                                    {homeOrders.map((order, index) => (
                                        <OrderListItem 
                                            key={order.id}
                                            navigation={navigation}
                                            item={order}
                                            index={index}
                                            lastOrder={homeOrders.length - 1} 
                                            firstOrder={0}
                                            extraVerticalPadding={true}
                                        />
                                    ))}
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </TouchableWithoutFeedback>
            ) : <HomeSkeleton />}
            {/* bottomsheet */}
            <CustomBottomSheet
                bottomSheetModalRef={bottomSheetRef}
                closeModal={closeModal}
                snapPointsArray={modal.snapPointsArray}
                autoSnapAt={modal.autoSnapAt} // search bottomsheet auto snap at fullscreen
                sheetTitle={modal.title}
                disablePanToClose={true}
            >
                {modal.type === "Search" && 
                    <>
                        {/* text input search bar */}
                        <SearchBar 
                            placeholder={"Search Komitex Stocks"}
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
                        <BottomSheetScrollView style={style.orderSearchResults}>
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
                height={"80%"}
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

// stylesheet
const style = StyleSheet.create({
    container: {
        backgroundColor: background,
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
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
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