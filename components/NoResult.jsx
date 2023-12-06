import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { subText } from '../style/colors'

const NoResult = () => {
    return (
        <View style={styles.noSearchResults}>
            <Text style={styles.noSearchResultsText}>
                No result found
            </Text>
        </View>
    )
}

export default NoResult

const styles = StyleSheet.create({
    noSearchResults: {
        height: 160,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    noSearchResultsText: {
        fontSize: 16,
        fontFamily: 'mulish-medium',
        color: subText,
    },
})