import { TouchableOpacity, StyleSheet, View, Text } from "react-native";
import { BottomSheetModal, BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { useMemo, useCallback } from "react";
import ModalHandle from "./ModalHandle";
import CloseIcon from "../assets/icons/CloseIcon";

const PopUpBottomSheet = ({bottomSheetModalRef, showOverlay, closeModal, snapPointsArray, autoSnapAt, children, sheetTitle, sheetSubtitle}) => {

    const snapPoints = useMemo(() => snapPointsArray, []);

    const handleGestureEnd = (event) => {
        // console.log(event);
        if (event === -1) closeModal();
    };

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
   

    return (
        <View style={styles.container}>
            <BottomSheetModal
                ref={bottomSheetModalRef}
                index={autoSnapAt}
                snapPoints={snapPoints}
                enablePanDownToClose={true}
                onChange={event => handleGestureEnd(event)}
                backgroundStyle={{
                    borderRadius: 24,
                }}
                containerStyle={{
                    borderRadius: 24,
                    marginHorizontal: 20,
                }}
                handleComponent={() => (
                    <ModalHandle />
                )}
                stackBehavior="push"
                backdropComponent={renderBackdrop}
            >
                <View style={styles.sheetTitle}>
                    <TouchableOpacity 
                        style={styles.closeButtonWrapper} 
                        onPress={closeModal}
                    >
                        <CloseIcon />
                    </TouchableOpacity>
                    {!sheetSubtitle ? (
                        sheetTitle && <Text style={styles.sheetTitleText}>
                            {sheetTitle}
                        </Text>
                        ) : (
                            <View style={styles.titleWrapper}>
                                <Text style={styles.sheetTitleText}>{sheetTitle}</Text>
                                <Text style={styles.sheetSubtitleText}>{sheetSubtitle}</Text>
                            </View>
                        )}
                </View>
                <View style={styles.modalWrapper}>
                    {children}
                </View>
            </BottomSheetModal>
        </View>
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
    },
    backdrop: {
        backgroundColor: 'black',
        height: "100%"
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
        color: "rgba(34, 34, 34, 0.6)",
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
    }
});

export default PopUpBottomSheet;