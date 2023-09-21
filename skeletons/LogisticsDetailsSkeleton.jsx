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

const LogisticsDetailsSkeleton = () => {
    return (
        <View 
            style={skeleton.container}
        >   
            <View style={skeleton.header}>
                <Skeleton 
                    height={40}
                    width={150}
                    shimmerColors={shimmerColorArray}
                    style={{borderRadius: 2}}
                />
                <Skeleton 
                    height={24}
                    width={24}
                    shimmerColors={shimmerColorArray}
                    style={{borderRadius: 2}}
                />
            </View>

            <View style={skeleton.details}>
                <Skeleton 
                    height={16}
                    width={100}
                    shimmerColors={shimmerColorArray}
                    style={{borderRadius: 2}}
                />

                <Skeleton 
                    height={16}
                    width={100}
                    shimmerColors={shimmerColorArray}
                    style={{borderRadius: 2}}
                />

            </View>

            <View style={skeleton.details}>
                <Skeleton 
                    height={16}
                    width={100}
                    shimmerColors={shimmerColorArray}
                    style={{borderRadius: 2}}
                />

                <Skeleton 
                    height={16}
                    width={100}
                    shimmerColors={shimmerColorArray}
                    style={{borderRadius: 2}}
                />

            </View>

            <View style={skeleton.cardsWrapper}>
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

            <View style={skeleton.locationsWrapper}>
                <Skeleton 
                    height={200}
                    width={windowWidth - 40}
                    shimmerColors={shimmerColorArray}
                    style={{borderRadius: 12}}
                />
            </View>

            <View style={skeleton.locationsWrapper}>
                <Skeleton 
                    height={200}
                    width={windowWidth - 20}
                    shimmerColors={shimmerColorArray}
                    style={{borderRadius: 12}}
                />
            </View>

            <View style={skeleton.locationsWrapper}>
                <Skeleton 
                    height={200}
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
        overflow: 'visible'
    },
    header: {
        width: "100%",
        display: 'flex',
        flexDirection: 'column-reverse',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        gap: 20,
        marginBottom: 8,
    },
    details: {
        width: "100%",
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    cardsWrapper: {
        marginTop: 16,
        width: "100%",
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        gap: 16,
    },
    locationsWrapper: {
        marginTop: 20,
    }
})
 
export default LogisticsDetailsSkeleton;