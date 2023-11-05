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
import EditBlackLargeIcon from '../assets/icons/EditBlackLargeIcon.jsx'
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
// colors
import { background, black, neutral, primaryColor, white } from '../style/colors';
// utils
import { windowHeight, windowWidth } from '../utils/helpers';
// globals
import { useGlobals } from '../context/AppContext';

const Warehouse = ({navigation, route}) => {

    const { bottomSheetRef } = useGlobals();

    // tab state
    const [tab, setTab] = useState(route.params?.tab ? route.params.tab : "warehouse")

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

    // warehouses
    const warehouses = [
        { id: "stickyLeft" },
        { id: "stickyRight" },
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
            onPressMenu: () => openModal(1),      
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
            onPressMenu: () => openModal(2),
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
            onPressMenu: () => openModal(3),
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
            onPressMenu: () => openModal(4),
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
            onPressMenu: () => openModal(5),
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
            onPressMenu: () => openModal(6),
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
            onPressMenu: () => openModal(7),
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
            onPressMenu: () => openModal(8),
            receive_waybill: false,
            add_new: false,
        },
        {
            id: 10,
            add_new: true,
        },
    ];

    // stock transfer data
    const stockTransfer = [
        { id: "stickyLeft" },
        {
            id: 1,
            onPress: () => navigation.navigate("Chat", {id: "1"}),
            origin_warehouse: "Warri",
            destination_warehouse: "Asaba",
            datetime: "12/12/2022",
            products: [
                {
                    product_name: "Shirt",
                    quantity: 2
                },
                {
                    product_name: "Shoe",
                    quantity: 5
                },
                {
                    product_name: "Maybach Sunglasses",
                    quantity: 3
                },
            ],
            newMessage: false,
            status: "Delivered",
        },
        {
            id: 2,
            onPress: () => navigation.navigate("Chat", {id: "1"}),
            origin_warehouse: "Warri",
            destination_warehouse: "Benin",
            datetime: "12/12/2022",
            products: [
                {
                    product_name: "Shirt",
                    quantity: 2
                },
                {
                    product_name: "Shoe",
                    quantity: 1
                },
                {
                    product_name: "Maybach Sunglasses",
                    quantity: 3
                }
            ],
            newMessage: false,
            status: "Pending",
        },
        {
            id: 3,
            onPress: () => navigation.navigate("Chat", {id: "1"}),
            origin_warehouse: "Warri",
            destination_warehouse: "Agbor",
            datetime: "12/13/2022",
            products: [
                {
                    product_name: "Laptop",
                    quantity: 1
                },
                {
                    product_name: "Tablet",
                    quantity: 2
                }
            ],
            newMessage: true,
            status: "Pending",
        },
        {
            id: 4,
            onPress: () => navigation.navigate("Chat", {id: "1"}),
            origin_warehouse: "Asaba",
            destination_warehouse: "Kwale",
            datetime: "12/14/2022",
            products: [
                {
                    product_name: "Phone",
                    quantity: 3
                }
            ],
            newMessage: false,
            status: "Delivered",
        },
        {
            id: 5,
            onPress: () => navigation.navigate("Chat", {id: "1"}),
            origin_warehouse: "Agbor",
            destination_warehouse: "Isoko",
            datetime: "12/15/2022",
            products: [
                {
                    product_name: "Headphones",
                    quantity: 2
                }
            ],
            newMessage: true,
            status: "Delivered",
        },
        {
            id: 6,
            onPress: () => navigation.navigate("Chat", {id: "1"}),
            origin_warehouse: "Kwale",
            destination_warehouse: "Warri",
            datetime: "12/16/2022",
            products: [
                {
                    product_name: "TV",
                    quantity: 1
                }
            ],
            newMessage: false,
            status: "Pending",
        },
        {
            id: 7,
            onPress: () => navigation.navigate("Chat", {id: "1"}),
            origin_warehouse: "Isoko",
            destination_warehouse: "Asaba",
            datetime: "12/17/2022",
            products: [
                {
                    product_name: "Camera",
                    quantity: 1
                },
                {
                    product_name: "Tripod",
                    quantity: 1
                }
            ],
            newMessage: false,
            status: "Delivered",
        }
    ];

    // warehouse id to be edited
    const [editWarehouseId, setEditWarehouseId] = useState(null);

    // selected warehouse
    const selectedWarehouse = useMemo(() => {
        return warehouses.find(warehouse => warehouse.id === editWarehouseId)
    }, [editWarehouseId])

    // search Query
    const [searchQuery, setSearchQuery] = useState("");

    // sticky header offset
    const stickyHeaderOffset = useRef(0);
    const [scrollOffset, setScrollOffset] = useState(0);

    // animated shadow when scroll height reaches sticky header
    const animateHeaderOnScroll = (e) => {
        const yOffset = e.nativeEvent.contentOffset.y;
        setScrollOffset(yOffset);
    }

    // function to open BottomSheet
    const openModal = (id) => {
        bottomSheetRef?.current?.present();

        setEditWarehouseId(id);
    }

    const closeModal = () => {
        bottomSheetRef?.current?.close()
    }

    const scrollRef = useRef(null);

    // function to navigate to edit warehouse screen
    const handleEditWarehouse = () => {
        // close modal
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
                                        onPress={openModal}
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
                snapPointsArray={[124]}
                autoSnapAt={0}
                closeModal={closeModal}
            >
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
            </CustomBottomSheet>
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
    }
})