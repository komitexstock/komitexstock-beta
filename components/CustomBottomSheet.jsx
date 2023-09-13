import { TouchableOpacity, StyleSheet, View, Text } from "react-native";
import { BottomSheetModal, BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { useMemo, useCallback } from "react";
import ModalHandle from "./ModalHandle";
import CloseIcon from "../assets/icons/CloseIcon";
import { bodyText, primaryColor } from "../style/colors";

const CustomBottomSheet = ({bottomSheetModalRef, showOverlay, closeModal, snapPointsArray, autoSnapAt, children, sheetTitle, sheetSubtitle, topContentPadding, stackBehavior, disablePanToClose}) => {

    const snapPoints = useMemo(() => snapPointsArray, [snapPointsArray]);

    const handleGestureEnd = (event) => {
        // console.log(event);
        if (event === -1) closeModal();
    };

    // render popup bottomsheet modal backdrop 
    const renderBackdrop = useCallback(
        props => (
            <BottomSheetBackdrop
                {...props}
                disappearsOnIndex={-1}
                appearsOnIndex={0}
                opacity={0.3}
                onPress={closeModal}
            />
        ),
        []
    );

    return (
        <>
            {/* {showOverlay && (
                <View
                    style={styles.overlay}
                >
                    <TouchableOpacity
                        style={styles.closeOverlay}
                        onPress={closeModal}
                    >
                    </TouchableOpacity>
                </View>
            )} */}
            <View style={styles.container}>
                <BottomSheetModal
                    ref={bottomSheetModalRef}
                    index={autoSnapAt}
                    snapPoints={snapPoints}
                    enablePanDownToClose={disablePanToClose ? false : true}
                    onChange={event => handleGestureEnd(event)}
                    backgroundStyle={{
                        borderRadius: 32,
                    }}
                    style={{
                        zIndex: 999,
                        // display: 'flex',
                        // flexDirection: 'column',
                        // justifyContent: 'flex-start'
                    }}
                    handleComponent={() => (
                        <ModalHandle />
                    )}
                    // push stackbehaviour to allow popup modal to display
                    // over other bottomsheet
                    stackBehavior={stackBehavior ? stackBehavior : "push"}
                    backdropComponent={renderBackdrop}
                >
                    <View style={styles.sheetTitle}>
                        <TouchableOpacity 
                            style={styles.closeButtonWrapper} 
                            onPress={closeModal}
                        >
                            <CloseIcon />
                        </TouchableOpacity>
                        { !sheetSubtitle ? (
                            <Text style={styles.sheetTitleText}>
                                {sheetTitle}
                            </Text>
                            ) : (
                                <View style={styles.titleWrapper}>
                                    <Text style={styles.sheetTitleText}>{sheetTitle}</Text>
                                    <Text style={styles.sheetSubtitleText}>{sheetSubtitle}</Text>
                                </View>
                            )}
                    </View>
                    <View style={[styles.modalWrapper, topContentPadding && {paddingTop: topContentPadding}]}>
                        {children}
                    </View>
                </BottomSheetModal>
            </View>
        </>
    );
}
 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        backgroundColor: "transparent",
        zIndex: 999,
    },
    overlay: {
        position: 'absolute',
        width: "100%",
        height: "100%",
        bottom: 0,
        left: 0,
        top: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        zIndex: 100,
    }, 
    closeOverlay: {
        widyth: "100%",
        height: "100%",
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

export default CustomBottomSheet;