import { TouchableOpacity, StyleSheet, View, Text } from "react-native";
import { BottomSheetModal, BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { useMemo, useCallback } from "react";
import ModalHandle from "./ModalHandle";
import CloseIcon from "../assets/icons/CloseIcon";
import { bodyText, primaryColor } from "../style/colors";
// import globals

const CustomBottomSheet = ({sheetRef, closeModal, snapPointsArray, index, setIndex, stackBehavior, children, sheetTitle, sheetSubtitle, enablePanDownToClose, contentContainerStyle}) => {

    const snapPoints = useMemo(() => snapPointsArray, [snapPointsArray]);

    // render popup bottomsheet modal backdrop 
    const renderBackdrop = useCallback(
        props => (
            <BottomSheetBackdrop
                {...props}
                disappearsOnIndex={-1}
                appearsOnIndex={0}
                opacity={0.3}
            />
        ),
        []
    );

    const handleOpenSheetStates = (index) => {
        // if set index is ont undefined
        if (setIndex !== undefined) setIndex(index);
        
        // if sheet is closed
        if (index === -1 && typeof closeModal === 'function') return closeModal();
    }

    return (
        <BottomSheetModal
            ref={sheetRef}
            index={index === undefined ? 0 : index}
            snapPoints={snapPoints}
            enablePanDownToClose={enablePanDownToClose === undefined || enablePanDownToClose}
            backgroundStyle={{ borderRadius: 24}}
            handleComponent={() => <ModalHandle />}
            stackBehavior={stackBehavior ===  undefined ? "push" : stackBehavior} // stacked ? "push" : "replace"
            backdropComponent={renderBackdrop}
            onChange={(index) => handleOpenSheetStates(index)}
        >
            <View style={styles.sheetTitle}>
                <TouchableOpacity 
                    style={styles.closeButtonWrapper} 
                    onPress={closeModal}
                >
                    <CloseIcon />
                </TouchableOpacity>
                <View style={styles.titleWrapper}>
                    {sheetTitle && <Text style={styles.sheetTitleText}>{sheetTitle}</Text>}
                    {sheetSubtitle && <Text style={styles.sheetSubtitleText}>{sheetSubtitle}</Text>}
                </View>
            </View>
            <View style={[styles.modalWrapper, contentContainerStyle]}>
                {children}
            </View>
        </BottomSheetModal>
    );
}
 
const styles = StyleSheet.create({
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

export default CustomBottomSheet;