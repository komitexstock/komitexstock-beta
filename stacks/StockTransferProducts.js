import { StyleSheet, TouchableWithoutFeedback, Text, View } from 'react-native'
import React from 'react'
// import 
import Header from '../components/Header';
import SelectInput from '../components/SelectInput';
import Input from '../components/Input';
import CustomButton from '../components/CustomButton';
import CustomBottomSheet from '../components/CustomBottomSheet';
// globals
import { useGlobals } from '../context/AppContext';
import { background, bodyText } from '../style/colors';
import { windowHeight } from '../utils/helpers';

const StockTransferProducts = ({navigation}) => {

    // bottomsheet refs
    const { bottomSheetRef } = useGlobals();

    return (
        <TouchableWithoutFeedback>
            <View style={style.container}>
                <View style={style.mainWrapper}>
                    <Header
                        stackName={"Select product you want to transfer"}
                        navigation={navigation}
                        unpadded={true}
                    />
                    <Text style={style.paragraph}>
                        Set your transfer preferences
                    </Text>
                    <View style={style.inputWrapper}>
                        <SelectInput
                            label={"Select Origin"}
                            placeholder={"Select origin"}
                            value={""}
                            inputFor={"String"}
                        />
                        <SelectInput
                            label={"Select Destination"}
                            placeholder={"Select destiination"}
                            value={""}
                            inputFor={"String"}
                        />
                        <Input 
                            label={"Additional Details"}
                            multiline={true}
                            height={64}
                            textAlign={"top"}
                            minRows={3}
                            placeholder={"Input additional details here..."}
                        />
                    </View>
                </View>
                <CustomButton
                    name={"Continue"}
                    unpadded={true}
                    backgroundColor={background}
                />
            </View>
        </TouchableWithoutFeedback>
    )
}

export default StockTransferProducts

const style = StyleSheet.create({
    container: {
        backgroundColor: background,
        paddingHorizontal: 20,
        display: 'flex',
        justifyContent: "space-between",
        flexDirection: 'column',
        alignItems: 'center',
        height: windowHeight,
        width: "100%",
    },
    mainWrapper: {
        width: "100%",
    },
    paragraph: {
        fontFamily: 'mulish-regular',
        fontSize: 12,
        color: bodyText,
        marginTop: 8,
        width: "100%",
        marginBottom: 30,
    },
    inputWrapper: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: "flex-start",
        alignItems: 'center',
        gap: 20,
    }
})