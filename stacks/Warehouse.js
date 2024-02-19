import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Keyboard,
} from 'react-native'
// react hooks
import React, { useEffect, useMemo, useRef, useState } from 'react'
// icons
import EditBlackLargeIcon from '../assets/icons/EditBlackLargeIcon';
import CalendarIcon from "../assets/icons/CalendarIcon";
// component
import Header from '../components/Header'
import CustomButton from '../components/CustomButton'
import SearchBar from '../components/SearchBar';
import Badge from '../components/Badge'
import StatCard from '../components/StatCard';
import StatWrapper from '../components/StatWrapper';
import StockTransferListItem from '../components/StockTransferListItem'
import WarehouseCard from '../components/WarehouseCard';
import CustomBottomSheet from '../components/CustomBottomSheet';
import FilterBottomSheet from "../components/FilterBottomSheet";
import FilterButtonGroup from "../components/FilterButtonGroup";
import SelectInput from "../components/SelectInput";
import CalendarSheet from "../components/CalendarSheet";
import FilterPill from "../components/FilterPill";
// bottom sheet components
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
// colors
import { background, black, neutral, primaryColor, white } from '../style/colors';
// utils
import { windowHeight, windowWidth } from '../utils/helpers';
// globals
import { useGlobals } from '../context/AppContext';
// data
import { stockTransferList } from '../data/stockTransferList';

const Warehouse = ({navigation, route}) => {

    const { bottomSheetRef, filterSheetRef, calendarSheetRef, calendarSheetOpen } = useGlobals();

    // tab state
    const [tab, setTab] = useState("warehouse")
    
    useEffect(() => {
        // if no tab pramameter is passed, return ealry
        if (!route?.params?.tab) return;

        // else setTabs
        setTab(route?.params?.tab);
    }, [route?.params?.tab])

    // stats array
    const stats = [
        {
            id: 1,
            title: "Total Items Transferred",
            presentValue: 10,
            oldValue: 8,
            decimal: false,
        },
        {
            id: 2,
            title: "Total Stock Transfers",
            presentValue: 5,
            oldValue: 6,
            decimal: false,
        },
    ];

    const warehouseList = [
        {
            id: 1,
            warehouse_name: "Warri",
            inventories_count: 12,
            warehouse_address: "276 PTI road",
            warehouse_manager: {
                id: 1,
                full_name: "Abiodun Johnson"
            },
            onPress: () => navigation.navigate("Inventory"),
            onPressMenu: () => openModal("Edit", 1),      
            receive_waybill: true,
            add_new: false,
        },
        {
            id: 2,
            warehouse_name: "Isoko",
            inventories_count: 3,
            warehouse_address: "123 Isoko Street",
            warehouse_manager: {
                id: 1,
                full_name: "Abiodun Johnson"
            },
            onPress: () => navigation.navigate("Inventory"),
            onPressMenu: () => openModal("Edit", 2),
            receive_waybill: true,
            add_new: false,
        },
        {
            id: 3,
            warehouse_name: "Asaba",
            inventories_count: 7,
            warehouse_address: "456 Asaba Avenue",
            warehouse_manager: {
                id: 1,
                full_name: "Abiodun Johnson"
            },
            onPress: () => navigation.navigate("Inventory"),
            onPressMenu: () => openModal("Edit", 3),
            receive_waybill: false,
            add_new: false,
        },
        {
            id: 4,
            warehouse_name: "Kwale",
            inventories_count: 4,
            warehouse_address: "789 Kwale Road",
            warehouse_manager: {
                id: 1,
                full_name: "Abiodun Johnson"
            },
            onPress: () => navigation.navigate("Inventory"),
            onPressMenu: () => openModal("Edit", 4),
            receive_waybill: false,
            add_new: false,
        },
        {
            id: 5,
            warehouse_name: "Agbor",
            inventories_count: 6,
            warehouse_address: "101 Agbor Lane",
            warehouse_manager: {
                id: 1,
                full_name: "Abiodun Johnson"
            },
            onPress: () => navigation.navigate("Inventory"),
            onPressMenu: () => openModal("Edit", 5),
            receive_waybill: false,
            add_new: false,
        },
        {
            id: 6,
            warehouse_name: "Benin",
            inventories_count: 8,
            warehouse_address: "654 Benin Street",
            warehouse_manager: {
                id: 1,
                full_name: "Abiodun Johnson"
            },
            onPress: () => navigation.navigate("Inventory"),
            onPressMenu: () => openModal("Edit", 6),
            receive_waybill: false,
            add_new: false,
        },
        {
            id: 7,
            warehouse_name: "Auchi",
            inventories_count: 2,
            warehouse_address: "222 Auchi Road",
            warehouse_manager: {
                id: 1,
                full_name: "Abiodun Johnson"
            },
            onPress: () => navigation.navigate("Inventory"),
            onPressMenu: () => openModal("Edit", 7),
            receive_waybill: false,
            add_new: false,
        },
        {
            id: 8,
            warehouse_name: "Ekpoma",
            inventories_count: 3,
            warehouse_address: "333 Ekpoma Street",
            warehouse_manager: {
                id: 1,
                full_name: "Abiodun Johnson"
            },
            onPress: () => navigation.navigate("Inventory"),
            onPressMenu: () => openModal("Edit", 8),
            receive_waybill: false,
            add_new: false,
        },
    ];


    // warehouses
    const [warehouses, setWarehouses] = useState([
        { id: "stickyLeft" },
        { id: "stickyRight" },
        ...warehouseList,
        {
            id: 10,
            add_new: true,
            onPress: () => navigation.navigate("AddWarehouse"),
        },
    ]);

    // stock transfer data
    const [stockTransfer, setStockTransfer] = useState([
        { id: "stickyLeft" },
        ...stockTransferList,
    ]);



    // warehouse id to be edited
    const [editWarehouseId, setEditWarehouseId] = useState(null);

    // selected warehouse
    const selectedWarehouse = useMemo(() => {
        return warehouses.find(warehouse => warehouse.id === editWarehouseId)
    }, [editWarehouseId])

    // search Query
    const [searchQuery, setSearchQuery] = useState("");

    // return order.name.toLowerCase().includes(searchQuery.toLowerCase()) || order.location.toLowerCase().includes(searchQuery.toLowerCase()) || order.logistics.toLowerCase().includes(searchQuery.toLowerCase()) || order.products.some(product => product.product_name.toLowerCase().includes(searchQuery.toLowerCase())) || order.phone_number.some(phone_number => phone_number.toLowerCase().includes(searchQuery.toLowerCase()));

    useEffect(() => {
        if (!searchQuery) {
            return setWarehouses([
                { id: "stickyLeft" },
                { id: "stickyRight" },
                ...warehouseList,
                {
                    id: 10,
                    add_new: true,
                    onPress: () => navigation.navigate("AddWarehouse"),
                },
            ])
        }

        setWarehouses(prevWarehouses => {
            const searchResult = prevWarehouses.filter(warehouse => {
                return warehouse?.warehouse_name?.toLowerCase().includes(searchQuery.toLowerCase());
            });

            return [
                { id: "stickyLeft" },
                { id: "stickyRight" },
                ...searchResult,
                {
                    id: 10,
                    add_new: true,
                    onPress: () => navigation.navigate("AddWarehouse"),
                },
            ]
        })
    }, [searchQuery])

    // sticky header offset
    const stickyHeaderOffset = useRef(0);
    const [scrollOffset, setScrollOffset] = useState(0);

    // animated shadow when scroll height reaches sticky header
    const animateHeaderOnScroll = (e) => {
        const yOffset = e.nativeEvent.contentOffset.y;
        setScrollOffset(yOffset);
    }

    const [modalType, setModalType] = useState("Edit");

    // function to open BottomSheet
    const openModal = (type, id) => {
        bottomSheetRef?.current?.present();
        
        // set modal type
        setModalType(type);

        if (type === "Edit") return setEditWarehouseId(id);
    }

    const closeModal = () => {
        bottomSheetRef?.current?.close()
    }

    const scrollRef = useRef(null);

    // function to navigate to edit warehouse screen
    const handleEditWarehouse = () => {
        // close bottom sheet modal
        closeModal();

        // navigate to edit warehouse screen
        navigation.navigate("EditWarehouse", {
            id: selectedWarehouse?.id,
            warehouse_name: selectedWarehouse?.warehouse_name,
            warehouse_address: selectedWarehouse?.warehouse_address,
            warehouse_manager: selectedWarehouse?.warehouse_manager,
            receive_waybill: selectedWarehouse?.receive_waybill,
        });
    }

    // remove sticky header shadow if scroll height hasn't crossed the required offset
    useEffect(() => {
        if (scrollRef.current) {
            const scrollHeight = scrollRef.current?.scrollHeight;
            setScrollOffset(scrollHeight);
        } 
    }, [tab])

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
            ],
        },
        {
            title: "Origin Warehouse",
            value: "All",
            default: true,
            buttons: [
                {
                    text: "All",
                    selected: true,
                    onPress: () => {
                        handleFilterParameters("Origin Warehouse", "All")
                    }
                },
                {
                    text: "Warri",
                    selected: false,
                    onPress: () => {
                        handleFilterParameters("Origin Warehouse", "Warri")
                    }
                },
                {
                    text: "Benin",
                    selected: false,
                    onPress: () => {
                        handleFilterParameters("Origin Warehouse", "Benin")
                    }
                },
                {
                    text: "Asaba",
                    selected: false,
                    onPress: () => {
                        handleFilterParameters("Origin Warehouse", "Asaba")
                    }
                },
            ],
        },
        {
            title: "Destination Warehouse",
            value: "All",
            default: true,
            buttons: [
                {
                    text: "All",
                    selected: true,
                    onPress: () => {
                        handleFilterParameters("Destination Warehouse", "All")
                    }
                },
                {
                    text: "Warri",
                    selected: false,
                    onPress: () => {
                        handleFilterParameters("Destination Warehouse", "Warri")
                    }
                },
                {
                    text: "Benin",
                    selected: false,
                    onPress: () => {
                        handleFilterParameters("Destination Warehouse", "Benin")
                    }
                },
                {
                    text: "Asaba",
                    selected: false,
                    onPress: () => {
                        handleFilterParameters("Destination Warehouse", "Asaba")
                    }
                },
            ],
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
    
    // close filter
    const closeFilter = () => {
        // close filter bottomsheet
        filterSheetRef.current?.close()
    }

    // function to apply filter
    const handleApplyFilter = () => {
        setFilterParameters(prevParamters => {
            return prevParamters.map(filterParam => {
                const selectedButton = filterParam.buttons.find(button => button.selected === true);
                // console.log(selectedButton);
                if (filterParam.title  !== "Period") {
                    return {
                        ...filterParam,
                        value: selectedButton?.text,
                        default: selectedButton?.text === "All" ? true : false, 
                    }
                } else {
                    return {
                        ...filterParam,
                        value: selectedButton?.text,
                        default: selectedButton?.text === "Today" ? true : false, 
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
                            if (filterButton?.text === button) {
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
        handleRemoveFilter("Destination Warehouse");
        handleRemoveFilter("Origin Warehouse");
        // close filter bottomsheet
        closeFilter();
    }

    // function to get filtervlaue
    // const getFilterValue = (title) => {
    //     return filterParameters.find(filterParam => filterParam.title === title).value
    // }

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

        // to disable avtive states for date inputs if back button is pressed
    // ...when calendar sheet if open
    useEffect(() => {
        if (!calendarSheetOpen) {
            setActiveEndDate(false);
            setActiveStartDate(false);
        }

    }, [calendarSheetOpen])


    

    return (
        <>
            {/* header */}
            <Header
                stackName={"Warehouse"}
                removeBackArrow={true}
                backgroundColor={background}
                // unpadded={true}
            />
            <TouchableWithoutFeedback
                onPress={() => Keyboard.dismiss()}
            >
                <FlatList
                    ref={scrollRef}
                    style={styles.container}
                    contentContainerStyle={styles.contentContainer}
                    showsVerticalScrollIndicator={false}
                    columnWrapperStyle={tab === "warehouse" ? styles.columnWrapper : null}
                    onScroll={animateHeaderOnScroll}
                    stickyHeaderIndices={[1]}
                    numColumns={tab === "warehouse" ? 2 : 1}
                    data={tab === "warehouse" ? warehouses : stockTransfer}
                    key={tab}
                    keyExtractor={item => {
                        if (tab === "warehouse") return item.warehouse_name;
                        return item.id;
                    }}
                    ListHeaderComponent={(
                        <View 
                            style={styles.headerComponent}
                            onLayout={e => {
                                stickyHeaderOffset.current = e.nativeEvent.layout.height;
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
                                    />
                                ))}
                            </StatWrapper>
                            <View style={styles.mainButtonWrapper}>
                                <CustomButton 
                                    name={"Stock Transfer"}
                                    shrinkWrapper={true}
                                    secondaryButton={true}
                                    onPress={() => {navigation.navigate("StockTransfer")}}
                                    unpadded={true}
                                />
                            </View>
                        </View>
                    )}
                    renderItem={({item, index}) => {
                        if (item.id === "stickyLeft") {
                            return (
                                <View 
                                    style={[
                                        styles.stickyHeader,
                                        {elevation: scrollOffset > stickyHeaderOffset.current ? 3 : 0},
                                        tab === "warehouse" && {marginBottom: -16}
                                    ]}
                                >
                                    {/* search */}
                                    <SearchBar 
                                        placeholder={`Search ${tab}`}
                                        searchQuery={searchQuery}
                                        setSearchQuery={setSearchQuery}
                                        backgroundColor={white}
                                        disableFilter={true}
                                        // if tab is switched to stock transfer, turn search input into a button
                                        button={tab !== "warehouse" ? true : false}
                                        onPress={() => openModal("Search")}
                                    />
                                    {/* page tabs */}
                                    <View style={styles.tabContainer}>
                                        <TouchableOpacity 
                                            style={tab === "warehouse" ? styles.tabButtonSelected : styles.tabButton}
                                            onPress={() => setTab("warehouse")}
                                        >
                                            <Text style={tab === "warehouse" ? styles.tabButtonTextSelected : styles.tabButtonText}>Warehouse</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity 
                                            style={tab === "stock transfer" ? styles.tabButtonSelected : styles.tabButton}
                                            onPress={() => setTab("stock transfer")}
                                        >
                                            <Text style={tab === "stock transfer" ? styles.tabButtonTextSelected : styles.tabButtonText}>Stock Transfer</Text>
                                            <Badge number={3} />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.filterPillWrapper}></View>
                                </View>
                            )
                        } else if (item.id === "stickyRight") {
                            return (
                                <></>
                            )
                        } else {
                            // console.log(index)
                            if (tab === "warehouse") {
                                return (
                                    <View 
                                        style={[
                                            index % 2 === 0 ? styles.leftCard : styles.rightCard,
                                        ]}
                                    >
                                        <WarehouseCard
                                            warehouseName={item?.warehouse_name}
                                            inventoriesCount={item?.inventories_count}
                                            address={item?.warehouse_address}
                                            onPress={item?.onPress}
                                            onPressMenu={item?.onPressMenu}
                                            addNew={item?.add_new}
                                        />
                                    </View>
                                )
                            } else {
                                return (
                                    <View style={styles.stockTransferItemWrapper}>
                                        <StockTransferListItem 
                                            item={item} 
                                            index={index} 
                                            lastOrder={stockTransfer.length - 1}
                                            firstOrder={1}
                                            navigation={navigation}
                                            extraVerticalPadding={true} 
                                        />
                                    </View>
                                )
                            }
                        }
                    }}
                />
            </TouchableWithoutFeedback>
            {/* bottomsheet */}
            <CustomBottomSheet
                bottomSheetModalRef={bottomSheetRef}
                snapPointsArray={modalType === "Edit" ? [124] : ["100%"]}
                autoSnapAt={0}
                closeModal={closeModal}
                sheetTitle={modalType === "Edit" ? "" : "Stock Transfers"} 
                disablePanToClose={modalType === "Edit" ? false : true}
            >
                {modalType === "Edit" && (
                    <View style={styles.modalWrapper}>
                        <TouchableOpacity
                            style={styles.sheetButton}
                            onPress={handleEditWarehouse}
                        >
                            <EditBlackLargeIcon />
                            <Text style={styles.sheetButtonText}>
                                Edit warehouse
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}
                {modalType === "Search" && <>
                    {/* text input search bar */}
                    <SearchBar 
                        placeholder={"Search stock transfers"}
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        backgroundColor={background}
                        openFilter={openFilter}
                        filterParams={filterParameters}
                    />
                    {/* check if any filter has been applied, i.e it is not in its default value */}
                    {filterParameters.find(filterParam => filterParam.default === false) && (
                        <View style={styles.searchOrderPillWrapper}>
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
                        style={styles.orderSearchResults}
                        showsVerticalScrollIndicator={false}
                    >
                        {stockTransferList.map((item, index) => (
                            <StockTransferListItem 
                                item={item} 
                                key={item.id}
                                index={index} 
                                lastOrder={stockTransfer.length - 1}
                                firstOrder={1}
                                extraVerticalPadding={true} 
                            />
                        ))}
                    </BottomSheetScrollView>
                </>}
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

                <View style={styles.inputContainer}>
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
    )
}

export default Warehouse

const styles = StyleSheet.create({
    container: {
        width: "100%",
        minHeight: windowHeight - 70,
        backgroundColor: background,
    },
    contentContainer: {
        paddingBottom: 90,
    },
    columnWrapper: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        gap: 16,
        alignItems: "center",
        justifyContent: "flex-start",
        marginBottom: 16,
        // paddingHorizontal: 20,
    },
    headerComponent: {
        paddingHorizontal: 20,
    },
    mainButtonWrapper: {
        paddingVertical: 30,
    },
    stickyHeader: {
        backgroundColor: background,
        width: "100%",
        paddingHorizontal: 20,
        // marginBottom: -16,
    },
    iconsWrapper: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        gap: 10,
        marginBottom: 20,
    },
    iconButton: {
        backgroundColor: white,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: 24,
        height: 24,
        borderRadius: 5,
    },
    tabContainer: {
        width: "100%",
        display: "flex",
        flexDirection: 'row',
        height: 32,
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 20,
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
    filterPillWrapper: {
        // marginVertical: 10,
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 8,
        width: "100%",
    },
    leftCard: {
        width: (windowWidth - 16)/2,
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    rightCard: {
        width: (windowWidth - 16)/2,
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    stockTransferItemWrapper: {
        paddingHorizontal: 20,
    },
    modalWrapper: {
        width: "100%",
        height: "100%",
    },
    sheetButton: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: 10,
        paddingVertical: 16,
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