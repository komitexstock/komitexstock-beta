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

const WaybillSkeleton = () => {
    return (
        <ScrollView 
            showsVerticalScrollIndicator={false}
            style={skeleton.container}
        >   
            <View style={skeleton.header}>
                <Skeleton 
                    height={25}
                    width={73}
                    shimmerColors={shimmerColorArray}
                    style={{borderRadius: 2}}
                />
                <Skeleton 
                    height={25}
                    width={25}
                    shimmerColors={shimmerColorArray}
                    style={{borderRadius: 2}}
                />
            </View>

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
            <Skeleton 
                height={44}
                width={windowWidth - 40}
                shimmerColors={shimmerColorArray}
                style={{borderRadius: 12}}
            />

            <View style={skeleton.orderListHeader}>
                <Skeleton 
                    height={24}
                    width={102}
                    shimmerColors={shimmerColorArray}
                    style={{borderRadius: 2}}
                />
                <View style={skeleton.iconsWrapper}>
                    <Skeleton 
                        height={24}
                        width={20}
                        shimmerColors={shimmerColorArray}
                        style={{borderRadius: 2}}
                    />
                    <Skeleton 
                        height={24}
                        width={20}
                        shimmerColors={shimmerColorArray}
                        style={{borderRadius: 2}}
                    />
                </View>
            </View>

            <View style={skeleton.tabsWrapper}>
                <Skeleton 
                    height={22}
                    width={62}
                    shimmerColors={shimmerColorArray}
                    style={{borderRadius: 2}}
                />

                <Skeleton 
                    height={22}
                    width={62}
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
            {/* <Skeleton 
                height={100}
                width={100}
                // style={{borderRadius: 5}}
            /> */}

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
        marginBottom: 20,
    },
    iconsWrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 10,
    },
    tabsWrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginBottom: 30,
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
 
export default WaybillSkeleton;