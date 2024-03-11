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

const SendWaybillSkeleton = () => {
    return (
        <View 
            style={skeleton.container}
        >   
            <View style={skeleton.header}>
                <Skeleton 
                    height={24}
                    width={24}
                    shimmerColors={shimmerColorArray}
                    style={{borderRadius: 2}}
                />
                <Skeleton 
                    height={24}
                    width={127}
                    shimmerColors={shimmerColorArray}
                    style={{borderRadius: 2}}
                />
            </View>

            <View style={skeleton.inputsWrapper}>
                <View style={skeleton.inputContainer}>
                    <Skeleton 
                        height={13}
                        width={72}
                        shimmerColors={shimmerColorArray}
                        style={{borderRadius: 2}}
                    />
                    <Skeleton 
                        height={40}
                        width={windowWidth - 40}
                        shimmerColors={shimmerColorArray}
                        style={{borderRadius: 12}}
                    />
                </View>
                <View style={skeleton.inputContainer}>
                    <Skeleton 
                        height={13}
                        width={72}
                        shimmerColors={shimmerColorArray}
                        style={{borderRadius: 2}}
                    />
                    <Skeleton 
                        height={40}
                        width={windowWidth - 40}
                        shimmerColors={shimmerColorArray}
                        style={{borderRadius: 12}}
                    />
                </View>
                <View style={skeleton.inputContainer}>
                    <Skeleton 
                        height={13}
                        width={72}
                        shimmerColors={shimmerColorArray}
                        style={{borderRadius: 2}}
                    />
                    <Skeleton 
                        height={64}
                        width={windowWidth - 40}
                        shimmerColors={shimmerColorArray}
                        style={{borderRadius: 12}}
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
        paddingTop: 10,
        width: "100%",
        minHeight: "100%",
    },
    header: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: 20,
        marginBottom: 24,
    },
    inputsWrapper: {
        width: "100%",
        display: "flex",
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        gap: 20,
    },
    inputContainer: {
        width: "100%",
        display: "flex",
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        gap: 4,
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
 
export default SendWaybillSkeleton;