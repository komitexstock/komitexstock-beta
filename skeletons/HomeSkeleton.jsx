// react native components
import { StyleSheet, View } from "react-native";
// skeleton components
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import { LinearGradient } from "expo-linear-gradient";
// helper functions
import { windowWidth } from "../utils/helpers";
// colors
import { background } from "../style/colors";

const shimmerColorArray = ["#ebebeb", "#d9d9d9", "#ebebeb",];

const Skeleton = createShimmerPlaceholder(LinearGradient);

const HomeSkeleton = () => {
    return (
        <View 
            style={skeleton.container}
        >   
            <View style={skeleton.header}>
                <Skeleton 
                    height={13}
                    width={71}
                    shimmerColors={shimmerColorArray}
                    style={{borderRadius: 2}}
                    />
                <Skeleton 
                    height={15}
                    width={92}
                    shimmerColors={shimmerColorArray}
                    style={{borderRadius: 2}}
                />
            </View>

            <View style={skeleton.searchBarWrapper}>
                <Skeleton 
                    height={40}
                    width={windowWidth - 40}
                    shimmerColors={shimmerColorArray}
                    style={{borderRadius: 10}}
                />
            </View>

            <Skeleton 
                height={15}
                width={182}
                shimmerColors={shimmerColorArray}
                style={{borderRadius: 2}}
            />

            <View style={skeleton.quickButtonsWrapper}>
                <Skeleton 
                    height={100}
                    width={(windowWidth - 56) / 2}
                    shimmerColors={shimmerColorArray}
                    style={{borderRadius: 12}}
                />
                <Skeleton 
                    height={100}
                    width={(windowWidth - 56) / 2}
                    shimmerColors={shimmerColorArray}
                    style={{borderRadius: 12}}
                />
                <Skeleton 
                    height={100}
                    width={(windowWidth - 56) / 2}
                    shimmerColors={shimmerColorArray}
                    style={{borderRadius: 12}}
                />
                <Skeleton 
                    height={100}
                    width={(windowWidth - 56) / 2}
                    shimmerColors={shimmerColorArray}
                    style={{borderRadius: 12}}
                />
            </View>

            <View style={skeleton.orderListHeader}>
                <Skeleton 
                    height={13}
                    width={68}
                    shimmerColors={shimmerColorArray}
                    style={{borderRadius: 2}}
                />
                <Skeleton 
                    height={13}
                    width={50}
                    shimmerColors={shimmerColorArray}
                    style={{borderRadius: 2}}
                />
            </View>

            <View style={skeleton.orderList}>
                <Skeleton 
                    height={50}
                    width={windowWidth - 60}
                    shimmerColors={shimmerColorArray}
                    style={{borderRadius: 2}}
                />
                <Skeleton 
                    height={50}
                    width={windowWidth - 60}
                    shimmerColors={shimmerColorArray}
                    style={{borderRadius: 2}}
                />
                <Skeleton 
                    height={50}
                    width={windowWidth - 60}
                    shimmerColors={shimmerColorArray}
                    style={{borderRadius: 2}}
                />
                <Skeleton 
                    height={50}
                    width={windowWidth - 60}
                    shimmerColors={shimmerColorArray}
                    style={{borderRadius: 2}}
                />
            </View>
            {/* <Skeleton 
                height={100}
                width={100}
                // style={{borderRadius: 5}}
            /> */}

        </View>
    );
}

// skeleton style
const skeleton = StyleSheet.create({
    container: {
        backgroundColor: background,
        paddingHorizontal: 20,
        paddingTop: 10,
        width: "100%",
        minHeight: "100%",
    },
    header: {
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        marginBottom: 20,
    },
    searchBarWrapper: {
        marginBottom: 30,
    },
    quickButtonsWrapper: {
        marginTop: 12,
        marginBottom: 30,
        width: "100%",
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        gap: 16,
    },
    orderListHeader: {
        width: "100%",
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 26,
    },
    orderList: {
        width: "100%",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 30,
    }
})
 
export default HomeSkeleton;