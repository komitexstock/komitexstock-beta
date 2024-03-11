import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { black, listSeparator } from '../style/colors';

const SelectWarehouseModal = ({warehouses, onPress}) => {
    return (
        <BottomSheetScrollView
            showsVerticalScrollIndicator={false}
        >
            <View style={styles.listWrapper}>
                {warehouses.map((warehouse) => (
                    <TouchableOpacity 
                        key={warehouse.id} 
                        style={styles.listItem}
                        onPress={() => onPress(warehouse.id)}
                    >
                        <Text style={styles.listText}>{warehouse.warehouse_name}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </BottomSheetScrollView>
    )
}

export default SelectWarehouseModal

const styles = StyleSheet.create({
    // bottomsheet list styles
    listWrapper: {
        width: "100%",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 10,
    },
    listItem: {
        width: "100%",
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: 40,
        paddingVertical: 6,
        borderBottomWidth: 1,
        borderBottomColor: listSeparator,
    },
    listText: {
        fontSize: 14,
        fontFamily: 'mulish-semibold',
        color: black,
        textTransform: 'capitalize'
    },
})