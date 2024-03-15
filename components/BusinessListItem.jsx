import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react';
// icons
import VerifiedIcon from '../assets/icons/VerifiedIcon';
// components
import Avatar from './Avatar';
import { black, bodyText, listSeparator } from '../style/colors';
import HighlightSearchedText from './HighlightSearchedText';

const BusinessListItem = ({onPress, business_name, verified, banner_image, searchQuery, disableClick, stock}) => {
    return (
        <TouchableOpacity
            style={style.listItem}
            onPress={disableClick ? () => {} : onPress}
            activeOpacity={disableClick ? 1 : 0.3}
        >   
            <View style={style.businessDetailsWrapper}>
                <Avatar
                    fullname={business_name}
                    imageUrl={banner_image}
                    diameter={30}
                    squared={true}
                />
                {!searchQuery ? (
                    <Text style={style.businessName}>{business_name}</Text>
                    ) : (
                    <HighlightSearchedText targetText={business_name} searchQuery={searchQuery} containerStyle={{marginLeft: 8}} />
                )}
                {verified && <VerifiedIcon />}
            </View>
            {stock && (
                <View style={style.stockInfoWrapper}>
                    <Text style={style.stockText}>
                        {stock}&nbsp;
                        <Text style={{color: bodyText}}>
                            in stock
                        </Text>
                    </Text>
                </View>
            )}
        </TouchableOpacity>
    )
}

export default BusinessListItem

const style = StyleSheet.create({
    listItem: {
        height: 42,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomColor: listSeparator,
        borderBottomWidth: 1,
        paddingVertical: 6,
        width: "100%",
    },
    businessDetailsWrapper: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 4,
    },
    logisticsImage: {
        width: 30,
        height: 30,
        borderRadius: 6,
    },
    businessName: {
        fontFamily: "mulish-medium",
        fontSize: 12,
        color: black,
        marginLeft: 8,
    },
    stockText: {
        color: black,
        fontSize: 12,
        fontFamily: 'mulish-semibold',
    },
})