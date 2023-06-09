import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useMemo } from "react";

const FilterNotifications = ({bottomSheetModalRef, setShowOverlay}) => {

    const snapPoints = useMemo(() => ["30%", "50%"], []);

    const handleGestureEnd = (event) => {
        // console.log(event);
        if (event === -1) setShowOverlay(false);
    };

    return (
        <View style={styles.container}>
            <BottomSheetModal
                ref={bottomSheetModalRef}
                index={0}
                snapPoints={snapPoints}
                enablePanDownToClose={true}
                onChange={event => handleGestureEnd(event)}
                backgroundStyle={{
                    borderRadius: 32,
                }}
                handleComponent={() => (
                    <View style={styles.modalHandleWrapper}>
                        <View style={styles.modalHandle}></View>
                    </View>
                )}
            >
                <View style={styles.modalContent}>
                    <Text style={styles.text}>Filter Results</Text>
                </View>
            </BottomSheetModal>
        </View>
    );
}
 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "red",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        backgroundColor: 'red',
    },
    modalContent: {
        display: "flex",
        flexDirection: 'row',
        alignItems: "flex-start",
        justifyContent: "center",
        flex: 1,
        padding: 20,
    },
    text: {
        fontSize: 25,
        fontFamily: 'mulish-semibold',
    },
    modalHandleWrapper: {
        height: 15,
        width: "100%",
        // backgroundColor: "blue",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'center' ,       
    },
    modalHandle: {
        width: 100,
        height: 4,
        borderRadius: 30,
        backgroundColor: '#F5F5F5',

    },
});

export default FilterNotifications;