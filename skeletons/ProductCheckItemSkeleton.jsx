// react native components
import { StyleSheet, View } from "react-native";
// skeleton components
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import { LinearGradient } from "expo-linear-gradient";
// helper functions
import { windowWidth } from "../utils/helpers";
import { listSeparator } from "../style/colors";

const shimmerColorArray = ["#ebebeb", "#d9d9d9", "#ebebeb",];

const Skeleton = createShimmerPlaceholder(LinearGradient);

const ProductCheckItemSkeleton = () => {
    return (<>
        <View style={skeleton.productWrapper}>
            <Skeleton 
                height={30}
                width={30}
                shimmerColors={shimmerColorArray}
                style={{borderRadius: 6}}
            />
            <Skeleton 
                height={15}
                width={122}
                shimmerColors={shimmerColorArray}
                style={{borderRadius: 2}}
            />
        </View>
        <View style={skeleton.productWrapper}>
            <Skeleton 
                height={30}
                width={30}
                shimmerColors={shimmerColorArray}
                style={{borderRadius: 6}}
            />
            <Skeleton 
                height={15}
                width={122}
                shimmerColors={shimmerColorArray}
                style={{borderRadius: 2}}
            />
        </View>
        <View style={skeleton.productWrapper}>
            <Skeleton 
                height={30}
                width={30}
                shimmerColors={shimmerColorArray}
                style={{borderRadius: 6}}
            />
            <Skeleton 
                height={15}
                width={122}
                shimmerColors={shimmerColorArray}
                style={{borderRadius: 2}}
            />
        </View>
        <View style={skeleton.productWrapper}>
            <Skeleton 
                height={30}
                width={30}
                shimmerColors={shimmerColorArray}
                style={{borderRadius: 6}}
            />
            <Skeleton 
                height={15}
                width={122}
                shimmerColors={shimmerColorArray}
                style={{borderRadius: 2}}
            />
        </View>
        <View style={skeleton.productWrapper}>
            <Skeleton 
                height={30}
                width={30}
                shimmerColors={shimmerColorArray}
                style={{borderRadius: 6}}
            />
            <Skeleton 
                height={15}
                width={122}
                shimmerColors={shimmerColorArray}
                style={{borderRadius: 2}}
            />
        </View>
    </>);
}

// skeleton style
const skeleton = StyleSheet.create({
    productWrapper: {
        width: windowWidth - 40,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 10,
        paddingVertical: 6,
        marginBottom: 10,
        height: 42,
        borderBottomColor: listSeparator,
        borderBottomWidth: 1,
    },
})
 
export default ProductCheckItemSkeleton;