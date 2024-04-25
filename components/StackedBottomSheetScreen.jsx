import { TouchableOpacity, StyleSheet, View, Text } from "react-native";
import { BottomSheetModal, BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { useMemo, useCallback } from "react";
import ModalHandle from "./ModalHandle";
import CloseIcon from "../assets/icons/CloseIcon";
import { background, bodyText, primaryColor } from "../style/colors";
// import globals
import { useGlobals } from "../context/AppContext";

const StackedBottomSheetScreen = () => {

    
    const { stackedBottomSheetScreenRef, stackedBottomSheetParameters, setStackedBottomSheetParameters } = useGlobals();
    
    const snapPoints = useMemo(() => stackedBottomSheetParameters.snapPointsArray, [stackedBottomSheetParameters.snapPointsArray]);

    // render popup bottomsheet modal backdrop 
    const renderBackdrop = useCallback(
        props => (
            <BottomSheetBackdrop
                {...props}
                disappearsOnIndex={-1}
                appearsOnIndex={0}
                opacity={0.3}
                // onPress={stackedBottomSheetParameters.closeModal}
            />
        ),
        []
    );

    const handleOpenSheetStates = (index) => {
        // if sheet is closed
        if (index === -1) {
            // update sheet state
            setStackedBottomSheetParameters(prevParamaters => {
                return {
                    ...prevParamaters,
                    sheetOpened: false,
                }
            })
            // close modal
            stackedBottomSheetParameters.closeModal();
        }
    }

    return (
        <BottomSheetModal
            ref={stackedBottomSheetScreenRef}
            index={stackedBottomSheetParameters?.index}
            snapPoints={snapPoints}
            enablePanDownToClose={stackedBottomSheetParameters?.enablePanDownToClose}
            backgroundStyle={styles.backgroundStyle}
            // over other bottomsheet
            stackBehavior={"push"}
            backdropComponent={renderBackdrop}
            onChange={(index) => handleOpenSheetStates(index)}
            handleComponent={() => (
                <ModalHandle />
            )}
        >
            <View style={styles.sheetTitle}>
                <TouchableOpacity 
                    style={styles.closeButtonWrapper} 
                    onPress={stackedBottomSheetParameters.closeModal}
                >
                    <CloseIcon />
                </TouchableOpacity>
                <View style={styles.titleWrapper}>
                    { stackedBottomSheetParameters?.sheetTitle && (
                        <Text style={styles.sheetTitleText}>
                            {stackedBottomSheetParameters?.sheetTitle}
                        </Text>
                    )}
                    { stackedBottomSheetParameters?.sheetSubtitle && ( 
                        <Text style={styles.sheetSubtitleText}>
                            {stackedBottomSheetParameters?.sheetSubtitle}
                        </Text>
                    )}
                </View>
            </View>
            <View 
                style={[
                    styles.modalWrapper, 
                    stackedBottomSheetParameters?.contentContainerStyle,
                ]}
            >
                {stackedBottomSheetParameters.content}
            </View>
        </BottomSheetModal>
    );
}
 
const styles = StyleSheet.create({
    backgroundStyle: {
        borderRadius: 24,
        backgroundColor: background,
    },
    sheetTitle: {
        width: "100%",
        minHeight: 20,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
    },
    sheetTitleText: {
        fontFamily: "mulish-bold",
        fontSize: 16,
        position: "relative",
    },
    titleWrapper: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    sheetSubtitleText: {
        fontFamily: "mulish-regular",
        fontSize: 12,
        color: bodyText,
        marginTop: 4,
    },
    closeButtonWrapper: {
        width: 20,
        height: 20,
        position: "absolute",
        right: 20,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    clearFilterButton: {
        position: "absolute",
        right: 20,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    clearFilterText: {
        color: primaryColor,
        fontSize: 12,
        fontFamily: 'mulish-bold',  
        textDecorationLine: 'underline',
        textDecorationColor: primaryColor
    },
    modalWrapper: {
        display: "flex",
        flexDirection: "column",
        flex: 1,
        padding: 20,
    }
});

export default StackedBottomSheetScreen;