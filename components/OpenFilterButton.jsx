import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
// filter icon
import FilterIcon from '../assets/icons/FilterIcon';
import { background, filterIndicator, white } from '../style/colors';


const OpenFilterButton = ({onPress, filterParams, background, filterSearch}) => {
  return (
    <TouchableOpacity
        onPress={onPress}
        style={[
            styles.menuIcon,
            {backgroundColor: background ? background : white},
            filterSearch && styles.filterSearchButton,
        ]}
    >   
        {/* if there is an active filter, show indicator */}
        {filterParams?.find(item => !item.default) && (
            <View 
                style={[
                    styles.indicator,
                    {borderColor: background ? background : white},
                    filterSearch && styles.searchIndicator,
                ]}
            />
        )}
        <FilterIcon />
    </TouchableOpacity>
  )
}

export default OpenFilterButton

const styles = StyleSheet.create({
    menuIcon: {
        width: 24,
        height: 24,
        backgroundColor: white,
        borderRadius: 6,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: 'relative',
    },
    filterSearchButton : {
        width: 40, 
        height: 40, 
        borderRadius: 12
    },
    indicator: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: filterIndicator,
        borderWidth: 1,
        borderColor: background,
        position: 'absolute',
        top: 4,
        right: 3,
        zIndex: 2,
    },
    searchIndicator: {
        top: 13,
        right: 11,
    }

})