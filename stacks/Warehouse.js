import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Keyboard,
} from 'react-native'
import React, { useEffect, useRef } from 'react'
// icons
import SearchIcon from '../assets/icons/SearchIcon'
// component
import Header from '../components/Header'
import CustomButton from '../components/CustomButton'
import SearchBar from '../components/SearchBar';
import Badge from '../components/Badge'
import StatCard from '../components/StatCard';
import StatWrapper from '../components/StatWrapper';
import StockTransferListItem from '../components/StockTransferListItem'
import WarehouseCard from '../components/WarehouseCard';
// react hooks
import { useState } from 'react';
// colors
import { background, black, neutral, primaryColor, white } from '../style/colors';
// utils
import { windowHeight, windowWidth } from '../utils/helpers';

const Warehouse = ({navigation}) => {

    // tab state
    const [tab, setTab] = useState("warehouse")

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
            address: "276 PTI road",
            onPress: () => {navigation.navigate("Inventory")},
            onPressMenu: () => {},
            add_new: false,
        },
        {
            id: 2,
            warehouse_name: "Isoko",
            inventories_count: 3,
            address: "123 Isoko Street",
            onPress: () => {navigation.navigate("Inventory")},
            onPressMenu: () => {},
            add_new: false,
        },
        {
            id: 3,
            warehouse_name: "Asaba",
            inventories_count: 7,
            address: "456 Asaba Avenue",
            onPress: () => {navigation.navigate("Inventory")},
            onPressMenu: () => {},
            add_new: false,
        },
        {
            id: 4,
            warehouse_name: "Kwale",
            inventories_count: 4,
            address: "789 Kwale Road",
            onPress: () => {navigation.navigate("Inventory")},
            onPressMenu: () => {},
            add_new: false,
        },
        {
            id: 5,
            warehouse_name: "Agbor",
            inventories_count: 6,
            address: "101 Agbor Lane",
            onPress: () => {navigation.navigate("Inventory")},
            onPressMenu: () => {},
            add_new: false,
        },
        {
            id: 6,
            warehouse_name: "Benin",
            inventories_count: 8,
            address: "654 Benin Street",
            onPress: () => {navigation.navigate("Inventory")},
            onPressMenu: () => {},
            add_new: false,
        },
        {
            id: 7,
            warehouse_name: "Auchi",
            inventories_count: 2,
            address: "222 Auchi Road",
            onPress: () => {navigation.navigate("Inventory")},
            onPressMenu: () => {},
            add_new: false,
        },
        {
            id: 8,
            warehouse_name: "Ekpoma",
            inventories_count: 3,
            address: "333 Ekpoma Street",
            onPress: () => {navigation.navigate("Inventory")},
            onPressMenu: () => {},
            add_new: false,
        },
        {
            id: 9,
            warehouse_name: "Ekpoma",
            inventories_count: 5,
            address: "333 Ekpoma Street",
            onPress: () => {navigation.navigate("Inventory")},
            onPressMenu: () => {},
            add_new: false,
        },
        {
            id: 10,
            warehouse_name: null,
            inventories_count: null,
            address: null,
            onPress: () => {navigation.navigate("Inventory")},
            onPressMenu: () => {},
            add_new: true,
        },
    ];

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
    const openModal = () => {

    }

    const scrollRef = useRef(null);

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
                                    onPress={() => {}}
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
                                            warehouseName={item.warehouse_name}
                                            inventoriesCount={item.inventories_count}
                                            address={item.address}
                                            onPress={item.onPress}
                                            onPressMenu={item.onPressMenu}
                                            addNew={item.add_new}
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
    }
})