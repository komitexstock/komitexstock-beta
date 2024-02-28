// react native components
import { StyleSheet, View } from "react-native";
// skeleton components
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import { LinearGradient } from "expo-linear-gradient";
// helper functions
import { windowWidth } from "../utils/helpers";
// colors
import { background, white } from "../style/colors";

const shimmerColorArray = ["#ebebeb", "#d9d9d9", "#ebebeb",];

const Skeleton = createShimmerPlaceholder(LinearGradient);

const EditLocationsSkeleton = () => {
    return (
        <View 
            style={skeleton.container}
        >   
            {/* header */}
            <View style={skeleton.header}>
                <Skeleton 
                    height={25}
                    width={125}
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

            {/* search bar */}
            <View style={{marginBottom: 32}}>
                <Skeleton
                    height={45}
                    width={windowWidth - 40}
                    shimmerColors={shimmerColorArray}
                    style={{borderRadius: 12}}
                />
            </View>

            <View style={skeleton.warehouseListWrapper}>
                <Skeleton
                    height={15}
                    width={97}
                    shimmerColors={shimmerColorArray}
                />
                <Skeleton
                    height={15}
                    width={139}
                    shimmerColors={shimmerColorArray}
                />
            </View>

            <View style={skeleton.cardWrapper}>
                {/* warehouse card */}
                <View style={skeleton.wrehouseWrapper}>
                    <View style={skeleton.warehouseHeader}>
                        <Skeleton
                            height={15}
                            width={76}
                            shimmerColors={shimmerColorArray}
                        />
                        <Skeleton
                            height={13}
                            width={50}
                            shimmerColors={shimmerColorArray}
                        />
                    </View>
                    <Skeleton
                        height={64}
                        width={windowWidth - 60}
                        shimmerColors={shimmerColorArray}
                        style={{borderRadius: 12}}
                    />
                    <Skeleton
                        height={64}
                        width={windowWidth - 60}
                        shimmerColors={shimmerColorArray}
                        style={{borderRadius: 12}}
                    />
                    <Skeleton
                        height={64}
                        width={windowWidth - 60}
                        shimmerColors={shimmerColorArray}
                        style={{borderRadius: 12}}
                    />
                </View>

                {/* warehouse card */}
                <View style={skeleton.wrehouseWrapper}>
                    <View style={skeleton.warehouseHeader}>
                        <Skeleton
                            height={15}
                            width={76}
                            shimmerColors={shimmerColorArray}
                        />
                        <Skeleton
                            height={13}
                            width={50}
                            shimmerColors={shimmerColorArray}
                        />
                    </View>
                    <Skeleton
                        height={64}
                        width={windowWidth - 60}
                        shimmerColors={shimmerColorArray}
                        style={{borderRadius: 12}}
                    />
                    <Skeleton
                        height={64}
                        width={windowWidth - 60}
                        shimmerColors={shimmerColorArray}
                        style={{borderRadius: 12}}
                    />
                    <Skeleton
                        height={64}
                        width={windowWidth - 60}
                        shimmerColors={shimmerColorArray}
                        style={{borderRadius: 12}}
                    />
                    <Skeleton
                        height={64}
                        width={windowWidth - 60}
                        shimmerColors={shimmerColorArray}
                        style={{borderRadius: 12}}
                    />
                </View>
                
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
        marginTop: 10,
        marginBottom: 24,
        display: 'flex',
        width: "100%",
        flexDirection: 'column-reverse',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        gap: 20,
    },
    warehouseListWrapper: {
        width: '100%',
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    cardWrapper: {
        width: "100%",
        display: "flex",
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 10,
    },
    wrehouseWrapper: {
        width: "100%",
        display: "flex",
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 5,
        backgroundColor: white,
        padding: 12,
        borderRadius: 12,
    },
    warehouseHeader: {
        marginTop: 3,
        marginBottom: 5,
        width: "100%",
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
})
 
export default EditLocationsSkeleton;