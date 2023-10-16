import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
// components
import PopUpBottomSheet from './PopUpBottomSheet';
import CautionPrompt from './CautionPrompt';
import SuccessPrompt from './SuccessPrompt';
import CustomButton from './CustomButton';
// colors
import { black, bodyText } from '../style/colors';


const SuccessPopUp = ({caution, height, closeModal, popUpSheetRef, heading, paragraph, secondaryFunction, primaryFunction, secondaryButtonText, primaryButtonText}) => {
  return (
        <PopUpBottomSheet
            bottomSheetModalRef={popUpSheetRef}
            closeModal={closeModal}
            snapPointsArray={[height]}
            autoSnapAt={0}
        >   
            <View style={style.popUpContent}>
                {caution ? <CautionPrompt /> : <SuccessPrompt />}
                <Text style={style.popUpHeading}>
                    {heading}
                </Text>
                <Text style={style.popUpParagraph}>
                    {paragraph}
                </Text>
                <View style={style.popUpButtonWrapper}>
                    { secondaryFunction && (
                        <CustomButton
                            secondaryButton={true}
                            name={secondaryButtonText}
                            shrinkWrapper={true}
                            onPress={secondaryFunction}
                            unpadded={true}
                        />
                    )}
                    <CustomButton
                        name={primaryButtonText ? primaryButtonText : "Done"}
                        shrinkWrapper={true}
                        onPress={primaryFunction}
                        unpadded={true}
                    />
                </View>
            </View>
        </PopUpBottomSheet>
  )
}

export default SuccessPopUp

const style = StyleSheet.create({
    popUpContent: {
        flex: 1,
        height: "100%",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    popUpHeading: {
        fontSize: 16,
        fontFamily: 'mulish-bold',
        textAlign: 'center',
        color: black,
    },
    popUpParagraph: {
        fontSize: 12,
        fontFamily: 'mulish-regular',
        textAlign: 'center',
        color: bodyText,
        maxWidth: 205,
        lineHeight: 15,
    },
    popUpButtonWrapper: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: '100%',
        gap: 16,
    }
})