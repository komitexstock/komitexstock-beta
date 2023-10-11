import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react';
// icons
import AddIcon from '../assets/icons/AddIcon';
import MenuIcon from "../assets/icons/MenuIcon";
// colors
import { subText, bodyText, white, secondaryColor, black } from '../style/colors';
// utils
import { windowWidth } from '../utils/helpers';

const WarehouseCard = ({warehouseName, inventoryCount, address, addNew, onPress, onPressMenu}) => {
  return (
        <TouchableOpacity 
            style={styles.warehouseCard}
            activeOpacity={0.4}
            onPress={onPress}
        >
            <View style={styles.warehouseTopWrapper}>
                {addNew ? (
                    <TouchableOpacity 
                        style={styles.addNewButton} 
                        onPress={onPress}
                    >
                        <AddIcon />
                    </TouchableOpacity>
                ) : (
                    <>
                        <Text style={styles.warehouseName}>
                            {warehouseName}
                        </Text>
                        <Text style={styles.warehouseInventoryCount}>
                            {inventoryCount} Inventories
                        </Text>
                    </>
                )}
            </View>
            <View style={styles.warehouseBottomWrapper}>
                {addNew ? (
                    <Text style={styles.warehouseName}>
                        Add New Warehouse
                    </Text>
                ) : (
                    <Text style={styles.warehouseAddress}>
                        {address}
                    </Text>
                )}
            </View>
            {/* if addNew is false render menu button */}
            {!addNew && (
                <TouchableOpacity
                    style={styles.moreOptionsButton}
                    onPress={onPressMenu}
                >
                    <MenuIcon />
                </TouchableOpacity>
            )}
        </TouchableOpacity>
    )
}

export default WarehouseCard

const styles = StyleSheet.create({
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
    warehouseBottomWrapper: {
        display: "flex",
        flexDirection: 'row',
        justifyContent: "flex-start",
        alignItems: "flex-start",
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
    },
    addNewButton: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        width: 40,
        borderRadius: 20,
        backgroundColor: secondaryColor,
    },
})