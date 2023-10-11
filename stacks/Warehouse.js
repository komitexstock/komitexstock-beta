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
// component
import Header from '../components/Header'
import CustomButton from '../components/CustomButton'
import SearchBar from '../components/SearchBar';
import Badge from '../components/Badge'
import StatCard from '../components/StatCard';
import StatWrapper from '../components/StatWrapper';
import OpenFilterButton from '../components/OpenFilterButton'
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

    const warehouses = [
        {id: 1},
        {id: 2},
        {id: 3},
        {id: 4},
        {id: 5},
        {id: 6},
        {id: 7},
        {id: 8},
        {id: 9},
    ]

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
                    stickyHeaderIndices={[1]}
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
                            {/* <SearchBar
                                disableFilter={true}
                                searchQuery={searchQuery}
                                setSearchQuery={setSearchQuery}
                                backgroundColor={white}
                                placeholder={"Search"}
                            /> */}
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
                    renderItem={(item) => (
                        <View style={styles.warehouseCard}></View>
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
        backgroundColor: 'red',
        display: "flex",
        flexDirection: "row",
        gap: 16,
        alignItems: "flex-start",
        justifyContent: "flex-start",
        marginTop: 16,
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
        backgroundColor: "teal",
        borderRadius: 12,
    }
})