import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView
} from 'react-native'
import React, {useState, useEffect, } from 'react'
// components
import Header from '../components/Header';
import SelectInput from '../components/SelectInput';
import Input from '../components/Input';
import CustomButton from '../components/CustomButton';
import CustomBottomSheet from '../components/CustomBottomSheet';
import { useGlobals } from '../context/AppContext';
import { background, white } from '../style/colors';
// globals

const AddLocation = ({navigation}) => {

    // gloabsl
    const { bottomSheetRef } = useGlobals();

    const handleAddLocations = () => {

    }

    return (<>
        <ScrollView style={styles.container}>
            {/* header component */}
            <Header
                navigation={navigation} 
                stackName={"Add Location"} 
                unpadded={true}
            />
            <View style={styles.main}>
                {/* state select input */}
                <SelectInput
                    label={"State/Province"}
                    placeholder={"Select State"}
                    inputFor={"String"}
                />
            </View>
        </ScrollView>
        <CustomButton 
            fixed={true}
            backgroundColor={white}
            name={"Done"}
            onPress={handleAddLocations}
        />
    </>)
}

export default AddLocation

const styles = StyleSheet.create({
    container: {
        backgroundColor: background,
        width: "100%",
        minHeight: "100%",
        paddingHorizontal: 20,
    },
    main: {
        marginTop: 32,
        width: "100%",
    }
})