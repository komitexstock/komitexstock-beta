import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Keyboard
} from 'react-native'
import React from 'react'
// icons
import SearchIcon from '../assets/icons/SearchIcon'
import MenuIcon from "../assets/icons/MenuIcon";
// component
import Header from '../components/Header'
import CustomButton from '../components/CustomButton'
import SearchBar from '../components/SearchBar';
import Badge from '../components/Badge'
import StatCard from '../components/StatCard';
import StatWrapper from '../components/StatWrapper';
import OpenFilterButton from '../components/OpenFilterButton';
import WarehouseCard from '../components/WarehouseCard';
// react hooks
import { useState } from 'react';
// colors
import { background, black, bodyText, neutral, primaryColor, subText, white } from '../style/colors';
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
        {
            id: 1,
            warehouse_name: "Warri",
            inventories_count: 12,
            address: "276 PTI road",
            onPress: () => {},
            onPressMenu: () => {},
            add_new: false,
        },
        {
            id: 2,
            warehouse_name: "Isoko",
            inventories_count: 3,
            address: "123 Isoko Street",
            onPress: () => {},
            onPressMenu: () => {},
            add_new: false,
        },
        {
            id: 3,
            warehouse_name: "Asaba",
            inventories_count: 7,
            address: "456 Asaba Avenue",
            onPress: () => {},
            onPressMenu: () => {},
            add_new: false,
        },
        {
            id: 4,
            warehouse_name: "Kwale",
            inventories_count: 4,
            address: "789 Kwale Road",
            onPress: () => {},
            onPressMenu: () => {},
            add_new: false,
        },
        {
            id: 5,
            warehouse_name: "Agbor",
            inventories_count: 6,
            address: "101 Agbor Lane",
            onPress: () => {},
            onPressMenu: () => {},
            add_new: false,
        },
        {
            id: 6,
            warehouse_name: "Benin",
            inventories_count: 8,
            address: "654 Benin Street",
            onPress: () => {},
            onPressMenu: () => {},
            add_new: false,
        },
        {
            id: 7,
            warehouse_name: "Auchi",
            inventories_count: 2,
            address: "222 Auchi Road",
            onPress: () => {},
            onPressMenu: () => {},
            add_new: false,
        },
        {
            id: 8,
            warehouse_name: "Ekpoma",
            inventories_count: 3,
            address: "333 Ekpoma Street",
            onPress: () => {},
            onPressMenu: () => {},
            add_new: false,
        },
        {
            id: 9,
            warehouse_name: "Ekpoma",
            inventories_count: 5,
            address: "333 Ekpoma Street",
            onPress: () => {},
            onPressMenu: () => {},
            add_new: false,
        },
        {
            id: 10,
            warehouse_name: null,
            inventories_count: null,
            address: null,
            onPress: () => {},
            onPressMenu: () => {},
            add_new: true,
        },
    ];

    // search Query
    const [searchQuery, setSearchQuery] = useState("");

    const animateHeaderOnScroll = () => {

    }

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
                    style={styles.container}
                    contentContainerStyle={styles.contentContainer}
                    showsVerticalScrollIndicator={false}
                    columnWrapperStyle={styles.columnWrapper}
                    onScroll={animateHeaderOnScroll}
                    // stickyHeaderIndices={[1]}
                    numColumns={2}
                    data={warehouses}
                    keyExtractor={item => item.id}
                    ListHeaderComponent={(
                        <View style={styles.headerComponent}>
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
                            <View style={styles.iconsWrapper}>
                                <TouchableOpacity 
                                    style={styles.iconButton}
                                    onPress={() => {}}
                                    >
                                    <SearchIcon />
                                </TouchableOpacity>
                                <OpenFilterButton
                                    onPress={() => {}}
                                    filterParams={[]}
                                />
                            </View>
                            {/* page tabs */}
                            <View style={styles.tabContainer}>
                                <TouchableOpacity 
                                    style={tab === "warehouse" ? styles.tabButtonSelected : styles.tabButton}
                                    onPress={() => setTab("warehouse")}
                                >
                                    <Text style={tab === "warehouse" ? styles.tabButtonTextSelected : styles.tabButtonText}>Warehouse</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    style={tab === "stock_transfer" ? styles.tabButtonSelected : styles.tabButton}
                                    onPress={() => setTab("stock_transfer")}
                                >
                                    <Text style={tab === "stock_transfer" ? styles.tabButtonTextSelected : styles.tabButtonText}>Stock Transfer</Text>
                                    <Badge number={3} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                    renderItem={({item}) => (
                        <WarehouseCard
                            warehouseName={item.warehouse_name}
                            inventoryCount={item.inventories_count}
                            address={item.address}
                            onPress={item.onPress}
                            onPressMenu={item.onPressMenu}
                            addNew={item.add_new}
                        />
                    )}
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
        alignItems: "flex-start",
        justifyContent: "flex-start",
        marginBottom: 16,
        paddingHorizontal: 20,
    },
    headerComponent: {
        paddingHorizontal: 20,
    },
    mainButtonWrapper: {
        paddingVertical: 30,
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
        marginBottom: 14,
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
    warehouseCard: {
        height: 120,
        width: (windowWidth - 56) / 2,
        backgroundColor: white,
        borderRadius: 12,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        flexDirection: 'column',
        padding: 12,
        position: 'relative',
    },
    warehouseTopWrapper: {
        display: "flex",
        flexDirection: 'column',
        justifyContent: "flex-start",
        alignItems: "flex-start",
        width: "100%",
        gap: 4,
    },
    warehouseAddress: {
        color: subText,
        fontSize: 10,
        fontFamily: "mulish-regular",
        lineHeight: 13,
    },
    warehouseName: {
        color: black,
        fontFamily: 'mulish-bold',
        fontSize: 12,
    },
    warehouseInventoryCount: {
        color: bodyText,
        fontFamily: "mulish-regular",
        fontSize: 10,
    },
    moreOptionsButton: {
        position: 'absolute',
        width: 20,
        height: 20,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        right: 16,
        top: 16,
        transform: [
            {
                rotate: '90deg'
            }
        ] 
    }
})