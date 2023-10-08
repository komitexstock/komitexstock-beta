import { TouchableOpacity, StyleSheet, View, Text } from "react-native";
import { BottomSheetModal, BottomSheetBackdrop, BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { useCallback } from "react";
import ModalHandle from "./ModalHandle";
import CloseIcon from "../assets/icons/CloseIcon";
import { bodyText, primaryColor, secondaryColor, white } from "../style/colors";
// window height
import { windowHeight } from "../utils/helpers";
// globals
import { useGlobals } from "../context/AppContext";

const FilterBottomSheet = ({fiterSheetRef, height, closeFilter, children, clearFilterFunction, applyFilterFunction}) => {

    // set filter bottomsheet state
    const { setFilterSheetOpen } = useGlobals();

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
        <View style={style.container}>
            <BottomSheetModal
                ref={fiterSheetRef}
                index={0}
                snapPoints={[height]}
                enableContentPanningGestures={false}
                enablePanDownToClose={false}
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
                    if (index === -1) return setFilterSheetOpen(false)
                    return setFilterSheetOpen(true);
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
                    <TouchableOpacity onPress={clearFilterFunction} style={style.clearFilterButton}>
                        <Text style={style.clearFilterText}>
                            Clear All
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={applyFilterFunction} style={style.applyFilterButton}>
                        <Text style={style.applyFilterText}>
                            Apply
                        </Text>
                    </TouchableOpacity>
                </View>
            </BottomSheetModal>
        </View>
    );
}
 
const style = StyleSheet.create({
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