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

const WarehouseSkeleton = ({tab}) => {
    return (
        <View 
            style={skeleton.container}
        >   
            <View style={skeleton.header}>
                <Skeleton 
                    height={25}
                    width={100}
                    shimmerColors={shimmerColorArray}
                    style={{borderRadius: 2}}
                />
            </View>
            {/* states wrapper */}
            <View style={skeleton.statsWrapper}>
                <Skeleton 
                    height={62}
                    width={(windowWidth - 56) / 2}
                    shimmerColors={shimmerColorArray}
                    style={{borderRadius: 12}}
                />
                <Skeleton 
                    height={62}
                    width={(windowWidth - 56) / 2}
                    shimmerColors={shimmerColorArray}
                    style={{borderRadius: 12}}
                />
            </View>
            {/* secondary button */}
            <Skeleton 
                height={44}
                width={windowWidth - 40}
                shimmerColors={shimmerColorArray}
                style={{borderRadius: 12, marginBottom: 30}}
            />
            {/* search bar */}
            <Skeleton 
                height={40}
                width={windowWidth - 40}
                shimmerColors={shimmerColorArray}
                style={{borderRadius: 12, marginBottom: 30}}
            />

            <View style={skeleton.tabWrapper}>
                <View style={skeleton.tabContainer}>
                    <Skeleton
                        height={22}
                        width={76}
                        shimmerColors={shimmerColorArray}
                    />
                </View>
                <View style={skeleton.tabContainer}>
                    <Skeleton
                        height={22}
                        width={83}
                        shimmerColors={shimmerColorArray}
                    />
                </View>
            </View>

            {/* warehouse cards */}
            <View style={skeleton.productList}>
                <Skeleton 
                    height={120}
                    width={(windowWidth - 56) / 2}
                    shimmerColors={shimmerColorArray}
                    style={{borderRadius: 12}}
                />
                <Skeleton 
                    height={120}
                    width={(windowWidth - 56) / 2}
                    shimmerColors={shimmerColorArray}
                    style={{borderRadius: 12}}
                />
                <Skeleton 
                    height={120}
                    width={(windowWidth - 56) / 2}
                    shimmerColors={shimmerColorArray}
                    style={{borderRadius: 12}}
                />
                <Skeleton 
                    height={120}
                    width={(windowWidth - 56) / 2}
                    shimmerColors={shimmerColorArray}
                    style={{borderRadius: 12}}
                />
                <Skeleton 
                    height={120}
                    width={(windowWidth - 56) / 2}
                    shimmerColors={shimmerColorArray}
                    style={{borderRadius: 12}}
                />
                <Skeleton 
                    height={120}
                    width={(windowWidth - 56) / 2}
                    shimmerColors={shimmerColorArray}
                    style={{borderRadius: 12}}
                />
            </View>
        </View>
    );
}

// skeleton style
const skeleton = StyleSheet.create({
    container: {
        backgroundColor: background,
        paddingHorizontal: 20,
        width: "100%",
        minHeight: "100%",
    },
    header: {
        marginTop: 12,
        display: 'flex',
        width: "100%",
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 4,
        marginBottom: 20,
    },
    statsWrapper: {
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
        marginTop: 30,
        marginBottom: 26,
    },
    iconsWrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 10,
    },
    tabWrapper: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginBottom: 20,
    },
    tabContainer: {
        width: "50%",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    productList: {
        width: "100%",
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        gap: 16,
    }
})
 
export default WarehouseSkeleton;