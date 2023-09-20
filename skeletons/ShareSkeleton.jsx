// react native components
import { ScrollView, StyleSheet, View } from "react-native";
// skeleton components
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import { LinearGradient } from "expo-linear-gradient";
// helper functions
import { windowWidth } from "../utils/helpers";
// colors
import { background } from "../style/colors";

const shimmerColorArray = ["#ebebeb", "#d9d9d9", "#ebebeb",];

const Skeleton = createShimmerPlaceholder(LinearGradient);

const ShareSkeleton = () => {
    return (
        <ScrollView 
            showsVerticalScrollIndicator={false}
            style={skeleton.container}
        >   
            <View style={skeleton.header}>
                <Skeleton 
                    height={25}
                    width={110}
                    shimmerColors={shimmerColorArray}
                    style={{borderRadius: 2}}
                />
            </View>

            <View style={skeleton.searchBarWrapper}>
                <Skeleton 
                    height={40}
                    width={windowWidth - 92}
                    shimmerColors={shimmerColorArray}
                    style={{borderRadius: 12}}
                />
                <Skeleton 
                    height={40}
                    width={40}
                    shimmerColors={shimmerColorArray}
                    style={{borderRadius: 12}}
                />
            </View>

            <View style={skeleton.headingContainer}>
                <Skeleton 
                    height={13}
                    width={33}
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
            </View>

            <View style={skeleton.headingContainer}>
                <Skeleton 
                    height={13}
                    width={33}
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

        </ScrollView>
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
    searchBarWrapper: {
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 12,
    },
    headingContainer: {
        marginTop: 24,
        marginBottom: 12,
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
 
export default ShareSkeleton;