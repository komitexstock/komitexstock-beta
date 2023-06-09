import { TouchableOpacity, StyleSheet, View } from "react-native";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useMemo } from "react";
import ModalHandle from "./ModalHandle";

const CustomBottomSheet = ({bottomSheetModalRef, setShowOverlay, showOverlay, closeModal, snapPointsArray, autoSnapAt, children}) => {

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
                    {children}
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
      }
});

export default CustomBottomSheet;