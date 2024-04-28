// recat native components
import { TouchableOpacity, StyleSheet, View, Text } from "react-native";
// bottom sheet components
import { BottomSheetModal, BottomSheetBackdrop, BottomSheetScrollView } from "@gorhom/bottom-sheet";
// react hooks
import { useCallback } from "react";
// components
import ModalHandle from "./ModalHandle";
import CustomButton from "./CustomButton";
// icons
import CloseIcon from "../assets/icons/CloseIcon";
// colors
import { bodyText, primaryColor, secondaryColor, white } from "../style/colors";
// window height
import { windowHeight, windowWidth } from "../utils/helpers";
// globals

const FilterBottomSheet = ({fiterSheetRef, height, closeFilter, children, clearFilterFunction, applyFilterFunction}) => {

    // render popup bottomsheet modal backdrop 
    const renderBackdrop = useCallback(
        props => (
            <BottomSheetBackdrop
                {...props}
                disappearsOnIndex={-1}
                appearsOnIndex={0}
                opacity={0.3}
                onPress={closeFilter}
            />
        ),
        []
    );

    return (
        <BottomSheetModal
            ref={fiterSheetRef}
            index={0}
            snapPoints={[height]}
            enablePanDownToClose={true}
            backgroundStyle={{
                borderRadius: 32,
                paddingBottom: 90,
            }}
            handleComponent={() => (
                <ModalHandle />
            )}
            stackBehavior={"push"}
            backdropComponent={renderBackdrop}
            onChange={(index) => {
                if (index === -1) return closeFilter()
            }}
        >
            <View style={style.sheetTitle}>
                <TouchableOpacity 
                    style={style.closeButtonWrapper} 
                    onPress={closeFilter}
                >
                    <CloseIcon />
                </TouchableOpacity>
                <Text style={style.sheetTitleText}>
                    Filter by
                </Text>
            </View>
            <BottomSheetScrollView 
                style={[
                    style.modalWrapper, 
                ]}
            >
                {children}
            </BottomSheetScrollView>
            <View style={style.filterButtonsWrapper}>
                {/* clear all */}
                <CustomButton
                    secondaryButton={true}
                    name={"Clear All"}
                    shrinkWrapper={true}
                    onPress={clearFilterFunction}
                    unpadded={true}
                    wrapperStyle={{width: (windowWidth - 56) / 2}}
                />
                {/* apply */}
                <CustomButton
                    name={"Apply"}
                    shrinkWrapper={true}
                    onPress={applyFilterFunction}
                    unpadded={true}
                    wrapperStyle={{width: (windowWidth - 56) / 2}}
                />
            </View>
        </BottomSheetModal>
    );
}
 
const style = StyleSheet.create({
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
    modalWrapper: {
        display: "flex",
        flexDirection: "column",
        padding: 20,
        paddingRight: 0,
        width: '100%',
        minHeight: (windowHeight * 0.75) - 104,
    },
    filterButtonsWrapper: {
        padding: 20,
        display: 'flex',
        flexDirection: 'row',
        gap: 16,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    clearFilterButton: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: secondaryColor,
        height: 44,
        flex: 1,
        borderRadius: 12,
        padding: 10,
    },
    clearFilterText: {
        color: primaryColor,
        fontSize: 16,
        fontFamily: 'mulish-semibold',  
    },
    applyFilterButton: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: primaryColor,
        height: 44,
        flex: 1,
        borderRadius: 12,
        padding: 10,
    },
    applyFilterText: {
        color: white,
        fontSize: 16,
        fontFamily: 'mulish-semibold',  
    },
});

export default FilterBottomSheet;