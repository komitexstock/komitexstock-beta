import { TouchableOpacity, StyleSheet, View, Text } from "react-native";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useMemo } from "react";
import ModalHandle from "./ModalHandle";
import Add from "../assets/icons/Add";

const CustomBottomSheet = ({bottomSheetModalRef, setShowOverlay, showOverlay, closeModal, snapPointsArray, autoSnapAt, children, sheetTitle}) => {

    const snapPoints = useMemo(() => snapPointsArray, []);

    const handleGestureEnd = (event) => {
        // console.log(event);
        if (event === -1) setShowOverlay(false);
    };

    return (
        <>
            {showOverlay && (
                <View
                style={styles.overlay}
                >
                    <TouchableOpacity
                        style={styles.closeOverlay}
                        onPress={closeModal}
                    >
                    </TouchableOpacity>
                </View>
            )}
            <View style={styles.container}>
                <BottomSheetModal
                    ref={bottomSheetModalRef}
                    index={autoSnapAt}
                    snapPoints={snapPoints}
                    enablePanDownToClose={true}
                    onChange={event => handleGestureEnd(event)}
                    backgroundStyle={{
                        borderRadius: 32,
                    }}
                    handleComponent={() => (
                        <ModalHandle />
                    )}
                >
                    <View style={styles.sheetTitle}>
                        <TouchableOpacity 
                            style={styles.closeButtonWrapper} 
                            onPress={closeModal}
                        >
                            <Add />
                        </TouchableOpacity>
                        <Text style={styles.sheetTitleText}>
                            {sheetTitle}
                        </Text>
                    </View>
                    <View style={styles.modalWrapper}>
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
    }, 
    closeOverlay: {
        widyth: "100%",
        height: "100%",
    },
    sheetTitle: {
        width: "100%",
        height: 40,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    sheetTitleText: {
        fontFamily: "mulish-bold",
        fontSize: 16,
        position: "relative",
    },
    closeButtonWrapper: {
        width: 20,
        height: 20,
        position: "absolute",
        left: 20,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    modalWrapper: {
        display: "flex",
        flexDirection: "column",
        flex: 1,
        padding: 20,
    }
});

export default CustomBottomSheet;