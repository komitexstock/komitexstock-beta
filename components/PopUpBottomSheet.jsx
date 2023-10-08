// react native components
import { TouchableOpacity, StyleSheet, View, Text, Dimensions } from "react-native";
// bottomsheet components
import { BottomSheetModal, BottomSheetBackdrop } from "@gorhom/bottom-sheet";
// react hooks
import { useMemo, useCallback } from "react";
// modal Handle component
import ModalHandle from "./ModalHandle";
// icons
import CloseIcon from "../assets/icons/CloseIcon";
// colors
import { bodyText } from "../style/colors";
// gloabls
import { useGlobals } from "../context/AppContext";

const windowWidth = Dimensions.get("window").width;

const PopUpBottomSheet = ({bottomSheetModalRef, hideCloseButton, closeModal, snapPointsArray, autoSnapAt, children, sheetTitle, sheetSubtitle, centered}) => {
    // bottomsheet modal ref => useRef variable for bottomsheet modal ref
    // hideCloseButton, centered => boolean
    // closeModal => function
    // snapPointsArray => array
    // autoSnapAt => int
    // children => jsx
    // sheetSubtitle, sheetTitle => string

    const { setPopUpSheetOpen } = useGlobals()

    // snapPoints
    const snapPoints = useMemo(() => snapPointsArray, [snapPointsArray]);
    // const snapPoints = snapPointsArray;

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
   
    // render PopUpBottomSheet component
    return (
        <View style={styles.container}>
            <BottomSheetModal
                ref={bottomSheetModalRef}
                index={autoSnapAt}
                snapPoints={snapPoints}
                enablePanDownToClose={true}
                backgroundStyle={{
                    borderRadius: 24,
                }}
                containerStyle={{
                    borderRadius: 24,
                    marginHorizontal: 20,
                    // styling to center modal
                    marginTop: centered ? -windowWidth/1.3 : 0,
                    marginBottom: centered ? windowWidth/1.3 : 0,
                }}
                style={{
                }}
                // change the default bottomsheet handle
                handleComponent={() => (
                    <ModalHandle />
                )}
                // push stackbehaviour to allow popup modal to display
                // over other bottomsheet
                stackBehavior="push"
                backdropComponent={renderBackdrop}
                onChange={(index) => {
                    if (index === -1) return setPopUpSheetOpen(false)
                    return setPopUpSheetOpen(true);
                }}
            >
                {/* sheetitle */}
                <View style={styles.sheetTitle}>
                    {/* display close icon by default */}
                    { !hideCloseButton && 
                        <TouchableOpacity 
                            style={styles.closeButtonWrapper} 
                            onPress={closeModal}
                        >
                            <CloseIcon />
                        </TouchableOpacity>
                    }
                    {/* modal subtitle */}
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
                    {/* render children */}
                    {children}
                </View>
            </BottomSheetModal>
        </View>
    );
}
 
// stylesheet
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
        color: bodyText,
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
});

export default PopUpBottomSheet;