import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
// colors
import { black, bodyText, listSeparator, subText } from '../style/colors'

const WarehouseListItem = ({warehouse_name, warehouse_address, stock}) => {
    return (
        <View style={style.warehousesListItemWrapper}>
            <View style={style.warehouseDetailsWrapper}>
                <Text style={style.warehouseName}>
                    {warehouse_name}
                </Text>
                <Text style={style.warehouseAddress}>
                    {warehouse_address}
                </Text>
            </View>
            <View style={style.stockInfoWrapper}>
                <Text style={style.stockText}>
                    {stock}&nbsp;
                    <Text style={{color: bodyText}}>
                        in stock
                    </Text>
                </Text>
            </View>
        </View>
    )
}

export default WarehouseListItem

const style = StyleSheet.create({
    warehousesListItemWrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: "100%",
        height: 57,
        borderBottomWidth: 1,
        borderBottomColor: listSeparator,
        paddingVertical: 6,
    },
    warehouseDetailsWrapper: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        gap: 4,
    },
    warehouseName: {
        fontFamily: 'mulish-bold',
        fontSize: 12,
        color: black,
    },
    warehouseAddress: {
        fontFamily: 'mulish-regular',
        fontSize: 10,
        color: subText,
    },
    stockText: {
        color: black,
        fontSize: 12,
        fontFamily: 'mulish-semibold',
    }
})