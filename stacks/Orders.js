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
import { background, black, blackOut, bodyText, primaryColor, white } from "../style/colors";
// icons
import MenuIcon from "../assets/icons/MenuIcon";
import SearchIcon from '../assets/icons/SearchIcon'
import CalendarIcon from "../assets/icons/CalendarIcon";
import SendOrderIcon from "../assets/icons/SendOrderIcon";
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
// data
import { orderList } from "../data/orderList";

const Orders = ({navigation}) => {

    // sheet ref
    const sheetRef = useRef(null);
    const filterSheetRef = useRef(null);

    // global states
    const {
        setBottomSheet,
        setFilterBottomSheet,
        calendarSheetRef,
        calendarSheetOpen
    } = useGlobals();

    // update botomsheet global states
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

    // state to indicate page loading
    const [pageLoading, setPageLoading] = useState(true);

    // disbale loading state
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

    // open modal function
    const openModal = () => {
        // open bottomsheet
        sheetRef?.current?.present();

        // update bottomsheet global state
        setBottomSheet(prevState => {
            return {
                ...prevState,
                opened: true,
            }
        });
    }
    
    // close modal function
    const closeModal = () => {
        // close bottomsheet
        sheetRef?.current?.close();

        // update bottomsheet global state
        setBottomSheet(prevState => {
            return {
                ...prevState,
                opened: false,
            }
        });
    };

    // filter state
    const [filterType, setFilterType] = useState("home")

    // open filter function
    const openFilter = (type) => {
        // dismmis keyboard
        Keyboard.dismiss();

        // set filter type
        setFilterType(type);

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

    return (<>
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
                            return (<>
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
                                {orders.length === 1 && (
                                    <View style={style.emptyOrderWrapper}>
                                        <SendOrderIcon />
                                        <Text style={style.emptyOrderHeading}>Send your first order</Text>
                                        <Text style={style.emptyOrderParagraph}>
                                            Makes sales by sending orders to your logistics partners
                                        </Text>
                                    </View>
                                )}
                            </>)
                        }

                        // if order list is empty
                        return (
                            <View style={style.orderWrapper}>
                                <OrderListItem 
                                    item={item} 
                                    index={index} 
                                    lastOrder={orders.length - 1}
                                    firstOrder={1}
                                    navigation={navigation}
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
            sheetRef={sheetRef}
            sheetTitle={"Orders"}
            closeModal={closeModal}
            snapPointsArray={["100%"]}
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
            height={606}
            closeFilter={closeFilter}
            fiterSheetRef={filterSheetRef}
            clearFilterFunction={handleClearAllFilter}
            applyFilterFunction={filterType === "search" ? 
                () => handleApplyFilter("search") : 
                handleApplyFilter
            }
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
    </>);
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
 
export default Orders;