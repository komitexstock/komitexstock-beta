import { TouchableOpacity, StyleSheet, View, Text } from "react-native";
import { BottomSheetModal, BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { useMemo, useCallback } from "react";
import ModalHandle from "./ModalHandle";
import CloseIcon from "../assets/icons/CloseIcon";
import { background, bodyText, primaryColor } from "../style/colors";
// import globals
import { useGlobals } from "../context/AppContext";

const BottomSheetScreen = () => {

    
    const { bottomSheetScreenRef, bottomSheetParameters, setBottomSheetParameters } = useGlobals();
    
    const snapPoints = useMemo(() => bottomSheetParameters.snapPointsArray, [bottomSheetParameters.snapPointsArray]);

    // render popup bottomsheet modal backdrop 
    const renderBackdrop = useCallback(
        props => (
            <BottomSheetBackdrop
                {...props}
                disappearsOnIndex={-1}
                appearsOnIndex={0}
                opacity={0.3}
                // onPress={bottomSheetParameters.closeModal}
            />
        ),
        []
    );

    const handleOpenSheetStates = (index) => {
        // if sheet is closed
        if (index === -1) {
            // update sheet state
            setBottomSheetParameters(prevParamaters => {
                return {
                    ...prevParamaters,
                    sheetOpened: false,
                }
            })
            // close modal
            bottomSheetParameters.closeModal();
        }
    }

    return (
        <BottomSheetModal
            ref={bottomSheetScreenRef}
            index={bottomSheetParameters?.index}
            snapPoints={snapPoints}
            enablePanDownToClose={bottomSheetParameters?.enablePanDownToClose}
            backgroundStyle={styles.backgroundStyle}
            // over other bottomsheet
            stackBehavior={"replace"}
            backdropComponent={renderBackdrop}
            onChange={(index) => handleOpenSheetStates(index)}
            handleComponent={() => (
                <ModalHandle />
            )}
        >
            <View style={styles.sheetTitle}>
                <TouchableOpacity 
                    style={styles.closeButtonWrapper} 
                    onPress={bottomSheetParameters.closeModal}
                >
                    <CloseIcon />
                </TouchableOpacity>
                <View style={styles.titleWrapper}>
                    { bottomSheetParameters?.sheetTitle && (
                        <Text style={styles.sheetTitleText}>
                            {bottomSheetParameters?.sheetTitle}
                        </Text>
                    )}
                    { bottomSheetParameters?.sheetSubtitle && ( 
                        <Text style={styles.sheetSubtitleText}>
                            {bottomSheetParameters?.sheetSubtitle}
                        </Text>
                    )}
                </View>
            </View>
            <View 
                style={[
                    styles.modalWrapper, 
                    bottomSheetParameters?.contentContainerStyle,
                ]}
            >
                {bottomSheetParameters.content}
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

export default BottomSheetScreen;