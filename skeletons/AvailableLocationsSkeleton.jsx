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

const AvailableLocationsSkeleton = () => {
    return (
        <View 
            style={skeleton.container}
        >   
            <View style={skeleton.header}>
                <Skeleton 
                    height={25}
                    width={187}
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

            <View style={skeleton.cardWrapper}>
                <Skeleton
                    height={18}
                    width={windowWidth - 40}
                    shimmerColors={shimmerColorArray}
                    style={{marginBottom: 22}}
                />
                <Skeleton
                    height={40}
                    width={windowWidth - 40}
                    shimmerColors={shimmerColorArray}
                    style={{borderRadius: 10}}
                />
                <View style={skeleton.statesWrapper}>
                    <Skeleton
                        height={15}
                        width={windowWidth - 80}
                        shimmerColors={shimmerColorArray}
                    />
                    <Skeleton
                        height={15}
                        width={windowWidth - 80}
                        shimmerColors={shimmerColorArray}
                    />
                    <Skeleton
                        height={15}
                        width={windowWidth - 80}
                        shimmerColors={shimmerColorArray}
                    />
                    <Skeleton
                        height={15}
                        width={windowWidth - 80}
                        shimmerColors={shimmerColorArray}
                    />
                    <Skeleton
                        height={15}
                        width={windowWidth - 80}
                        shimmerColors={shimmerColorArray}
                    />
                    <Skeleton
                        height={15}
                        width={windowWidth - 80}
                        shimmerColors={shimmerColorArray}
                    />
                </View>
            </View>

            <View style={skeleton.buttonWrapper}>
                <Skeleton 
                    height={44}
                    width={windowWidth - 40}
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
        marginTop: 10,
        marginBottom: 8,
        display: 'flex',
        width: "100%",
        flexDirection: 'column-reverse',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        gap: 20,
    },
    cardWrapper: {
        marginBottom: 20,
        width: "100%",
        display: "flex",
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 20,
    },
    statesWrapper: {
        width: "100%",
        display: "flex",
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 20,
        backgroundColor: white,
        padding: 20,
        borderRadius: 12,
    },
    buttonWrapper: {
        position: "absolute",
        bottom: 0,
        left: 0,
        width: windowWidth,
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
        height: 100,
        padding: 20,
        paddingBottom: 30,
        backgroundColor: white,
    }
})
 
export default AvailableLocationsSkeleton;