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

const AddLogisticsSkeleton = () => {
    return (
        <View 
            style={skeleton.container}
        >   
            <View style={skeleton.header}>
                <Skeleton 
                    height={24}
                    width={103}
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


            <View style={skeleton.paragraphWrapper}>
                <Skeleton 
                    height={30}
                    width={windowWidth - 40}
                    shimmerColors={shimmerColorArray}
                    style={{borderRadius: 2}}
                />
            </View>

            {/* search bar */}
            <Skeleton 
                height={40}
                width={windowWidth - 40}
                shimmerColors={shimmerColorArray}
                style={{borderRadius: 10}}
            />

            <View style={skeleton.cardsWrapper}>
                <Skeleton 
                    height={112}
                    width={(windowWidth - 56) / 2}
                    shimmerColors={shimmerColorArray}
                    style={{borderRadius: 12}}
                />
                <Skeleton 
                    height={112}
                    width={(windowWidth - 56) / 2}
                    shimmerColors={shimmerColorArray}
                    style={{borderRadius: 12}}
                />
                <Skeleton 
                    height={112}
                    width={(windowWidth - 56) / 2}
                    shimmerColors={shimmerColorArray}
                    style={{borderRadius: 12}}
                />
                <Skeleton 
                    height={112}
                    width={(windowWidth - 56) / 2}
                    shimmerColors={shimmerColorArray}
                    style={{borderRadius: 12}}
                />
                <Skeleton 
                    height={112}
                    width={(windowWidth - 56) / 2}
                    shimmerColors={shimmerColorArray}
                    style={{borderRadius: 12}}
                />
                <Skeleton 
                    height={112}
                    width={(windowWidth - 56) / 2}
                    shimmerColors={shimmerColorArray}
                    style={{borderRadius: 12}}
                />
                <Skeleton 
                    height={112}
                    width={(windowWidth - 56) / 2}
                    shimmerColors={shimmerColorArray}
                    style={{borderRadius: 12}}
                />
                <Skeleton 
                    height={112}
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
        paddingTop: 10,
        width: "100%",
        minHeight: "100%",
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
    paragraphWrapper: {
        marginBottom: 24,
    },
    cardsWrapper: {
        marginTop: 30,
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
 
export default AddLogisticsSkeleton;