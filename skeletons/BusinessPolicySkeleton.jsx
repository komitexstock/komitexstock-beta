// react native components
import { StyleSheet, View } from "react-native";
// skeleton components
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import { LinearGradient } from "expo-linear-gradient";
// helper functions
import { windowWidth } from "../utils/helpers";
// colors
import { background, listSeparator2, white } from "../style/colors";

const shimmerColorArray = ["#ebebeb", "#d9d9d9", "#ebebeb",];

const Skeleton = createShimmerPlaceholder(LinearGradient);

const BusinessPolicySkeleton = () => {
    return (
        <View 
            style={skeleton.container}
        >   
            {/* header */}
            <View style={skeleton.header}>
                <Skeleton 
                    height={25}
                    width={146}
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

            {/* paragraph */}
            <View>
                <Skeleton
                    height={18}
                    width={windowWidth - 80}
                    shimmerColors={shimmerColorArray}
                    style={{borderRadius: 2}}
                />
            </View>

            <View style={skeleton.cardWrapper}>
                {/* warehouse card */}
                <View style={skeleton.wrehouseWrapper}>
                    <View style={skeleton.warehouseHeader}>
                        <Skeleton
                            height={15}
                            width={54}
                            shimmerColors={shimmerColorArray}
                            style={{borderRadius: 2}}
                        />
                    </View>
                    <View style={skeleton.policyWrapper}>
                        <Skeleton
                            height={20}
                            width={20}
                            shimmerColors={shimmerColorArray}
                            style={{borderRadius: 2}}
                        />
                        <View style={skeleton.policyNameWrapper}>
                            <Skeleton
                                height={18}
                                width={64}
                                shimmerColors={shimmerColorArray}
                                style={{borderRadius: 2}}
                            />
                            <Skeleton
                                height={30}
                                width={168}
                                shimmerColors={shimmerColorArray}
                                style={{borderRadius: 2}}
                            />
                        </View>
                        <Skeleton
                            height={16}
                            width={16}
                            shimmerColors={shimmerColorArray}
                            style={{borderRadius: 2}}
                        />
                    </View>
                    <View style={skeleton.policyWrapper}>
                        <Skeleton
                            height={20}
                            width={20}
                            shimmerColors={shimmerColorArray}
                            style={{borderRadius: 2}}
                        />
                        <View style={skeleton.policyNameWrapper}>
                            <Skeleton
                                height={18}
                                width={64}
                                shimmerColors={shimmerColorArray}
                                style={{borderRadius: 2}}
                            />
                            <Skeleton
                                height={30}
                                width={168}
                                shimmerColors={shimmerColorArray}
                                style={{borderRadius: 2}}
                            />

                        </View>
                        <Skeleton
                            height={16}
                            width={16}
                            shimmerColors={shimmerColorArray}
                            style={{borderRadius: 2}}
                        />
                    </View>
                </View>

                {/* inventory */}
                <View style={skeleton.wrehouseWrapper}>
                    <View style={skeleton.warehouseHeader}>
                        <Skeleton
                            height={15}
                            width={54}
                            shimmerColors={shimmerColorArray}
                            style={{borderRadius: 2}}
                        />
                    </View>
                    <View style={skeleton.policyWrapper}>
                        <Skeleton
                            height={20}
                            width={20}
                            shimmerColors={shimmerColorArray}
                            style={{borderRadius: 2}}
                        />
                        <View style={skeleton.policyNameWrapper}>
                            <Skeleton
                                height={18}
                                width={64}
                                shimmerColors={shimmerColorArray}
                                style={{borderRadius: 2}}
                            />
                            <Skeleton
                                height={30}
                                width={168}
                                shimmerColors={shimmerColorArray}
                                style={{borderRadius: 2}}
                            />

                        </View>
                        <Skeleton
                            height={16}
                            width={16}
                            shimmerColors={shimmerColorArray}
                            style={{borderRadius: 2}}
                        />
                    </View>
                </View>

                {/* additional policy */}
                <View style={skeleton.wrehouseWrapper}>
                    <View style={skeleton.warehouseHeader}>
                        <Skeleton
                            height={15}
                            width={54}
                            shimmerColors={shimmerColorArray}
                            style={{borderRadius: 2}}
                        />
                        <Skeleton
                            height={15}
                            width={22}
                            shimmerColors={shimmerColorArray}
                            style={{borderRadius: 2}}
                        />
                    </View>
                    <View style={skeleton.additionalPolicyWrapper}>
                        <Skeleton
                            height={64}
                            width={windowWidth - 72}
                            shimmerColors={shimmerColorArray}
                            style={{borderRadius: 2}}
                        />
                    </View>
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
        marginBottom: 8,
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
        gap: 32,
        paddingTop: 32,
    },
    wrehouseWrapper: {
        width: "100%",
        display: "flex",
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 10,
    },
    warehouseHeader: {
        marginBottom: 2,
        width: "100%",
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    policyWrapper: {
        width: '100%',
        height: 64,
        display: `flex`,
        justifyContent: `space-between`,
        flexDirection: `row`,
        alignItems: 'flex-start',
        paddingVertical: 6,
        gap: 12,
        borderBottomColor: listSeparator2,
        borderBottomWidth: 1,
    },
    policyNameWrapper : {
        height: "100%",
        display: "flex",
        flexDirection: 'column',
        alignSelf: 'stretch',
        flexGrow: 1,
        gap: 4,
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    additionalPolicyWrapper: {
        width: '100%',
        paddingVertical: 10,
        paddingHorizontal: 16,
        backgroundColor: white,
        borderRadius: 12,
        height: 84,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
})
 
export default BusinessPolicySkeleton;