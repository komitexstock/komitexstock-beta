// react native components
import { TouchableOpacity, StyleSheet, View, Text } from "react-native";
// bottomsheet components
import { BottomSheetModal, BottomSheetBackdrop } from "@gorhom/bottom-sheet";
// react hooks
import { useMemo, useCallback } from "react";
// modal Handle component
import ModalHandle from "./ModalHandle";
// icons
import CloseIcon from "../assets/icons/CloseIcon";
// colors
import { black, bodyText, white } from "../style/colors";
// globals
import { useGlobals } from "../context/AppContext";
// components
import CautionPrompt from './CautionPrompt';
import SuccessPrompt from './SuccessPrompt';
import CustomButton from './CustomButton';

const SuccessSheet = ({successSheetRef, caution, height, heading, paragraph, secondaryFunction, primaryFunction, secondaryButtonText, primaryButtonText, isLoadingPrimary, isLoadingSecondary}) => {
    // bottomsheet modal ref => useRef variable for bottomsheet modal ref
    // hideCloseButton, centered => boolean
    // closeModal => function
    // snapPointsArray => array
    // autoSnapAt => int
    // children => jsx
    // sheetSubtitle, sheetTitle => string

    const { setSuccessSheetOpen } = useGlobals()

    // return default height of 320 if height prop is not given
    const modalHeight = useMemo(() => height ? height : 320, [height]);
    // const snapPoints = snapPointsArray;

    // render popup bottomsheet modal backdrop 
    const renderBackdrop = useCallback(
        props => (
            <BottomSheetBackdrop
                {...props}
                disappearsOnIndex={-1}
                appearsOnIndex={0}
                opacity={0.3}
                onPress={primaryFunction}
            />
        ),
        []
    );
   
    // render PopUpBottomSheet component
    return (
        <View style={style.container}>
            <BottomSheetModal
                ref={successSheetRef}
                index={0}
                snapPoints={[modalHeight]}
                enablePanDownToClose={false}
                // push stackbehaviour to allow popup modal to display
                // over other bottomsheet
                stackBehavior="push"
                backdropComponent={renderBackdrop}
                backgroundStyle={{
                    borderRadius: 24,
                    backgroundColor: white,
                }}
                containerStyle={{
                    borderRadius: 24,
                    marginHorizontal: 20,
                    marginBottom: 15,
                    marginTop: -15,
                }}
                handleComponent={() => (
                    <ModalHandle />
                )}
                onChange={(index) => {
                    if (index === -1) return setSuccessSheetOpen(false)
                    return setSuccessSheetOpen(true);
                }}
            >
                {/* sheetitle */}
                <View style={style.sheetTitle}>
                    {/* display close icon by default */}
                    <TouchableOpacity 
                        style={style.closeButtonWrapper} 
                        onPress={primaryFunction}
                    >
                        <CloseIcon />
                    </TouchableOpacity>
                </View>
                <View style={style.modalWrapper}>
                    <View style={style.popUpContent}>
                        {caution ? <CautionPrompt /> : <SuccessPrompt />}
                        <Text style={style.popUpHeading}>
                            {heading}
                        </Text>
                        <Text style={style.popUpParagraph}>
                            {paragraph}
                        </Text>
                        <View style={style.popUpButtonWrapper}>
                            <CustomButton
                                name={primaryButtonText ? primaryButtonText : "Done"}
                                shrinkWrapper={true}
                                onPress={primaryFunction}
                                unpadded={true}
                                isLoading={isLoadingPrimary}
                            />
                            { secondaryFunction && (
                                <CustomButton
                                    secondaryButton={true}
                                    name={secondaryButtonText}
                                    shrinkWrapper={true}
                                    onPress={secondaryFunction}
                                    unpadded={true}
                                    isLoading={isLoadingSecondary}
                                />
                            )}
                        </View>
                    </View>
                </View>
            </BottomSheetModal>
        </View>
    );
}
 
// stylesheet
const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        backgroundColor: "transparent",
    },
    sheetTitle: {
        width: "100%",
        minHeight: 20,
        maxHeight: 40,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
    },
    closeButtonWrapper: {
        width: 20,
        height: 20,
        position: "absolute",
        right: 20,
        top: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    modalWrapper: {
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "column",
        flex: 1,
        width: "100%",
    },
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
    },
    popUpButtonWrapper: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: '100%',
        gap: 16,
    }
});

export default SuccessSheet;