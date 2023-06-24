import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { View, Text, StyleSheet, Image } from 'react-native';
import StatWrapper from './StatWrapper';
import StatCard from './StatCard';
import LogisticsLocation from './LogisticsLocations';

const LogisticsInfo = ({stats, locationsList, backgroundColor}) => {
    return (
        <BottomSheetScrollView
            showsVerticalScrollIndicator={false}
        >
            <View
                style={style.bottomSheetContainer}
            >
                <View style={style.logisticsMainInfo}>
                    <Image 
                        source={require('../assets/images/komitex.png')}
                        style={style.logisticsImage}
                    />
                    <Text style={style.logisticsName}>
                        Komitex Logistics
                    </Text>
                    <Text style={style.logisticsLocations}>17 Locations</Text>
                </View>
                <StatWrapper>
                    {stats.map(stat => (
                        <StatCard
                            key={stat.id}
                            title={stat.title}
                            presentValue={stat.presentValue}
                            oldValue={stat.oldValue}
                            decimal={stat.decimal}
                            unit={stat.unit}
                            unitPosition={stat.unitPosition}
                            backgroundColor={backgroundColor}
                        />
                    ))}
                </StatWrapper>
                <LogisticsLocation
                    locations={locationsList}
                    backgroundColor={backgroundColor}
                />
            </View>
        </BottomSheetScrollView>
    );
}

const style = StyleSheet.create({
    bottomSheetContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        width: "100%",
        height: "100%",
    },
    logisticsMainInfo: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        marginBottom: 20,
        width: "100%",
    },
    logisticsImage: {
        width: 40,
        height: 40,
        borderRadius: 8,
        marginBottom: 12
    },
    logisticsName: {
        fontFamily: "mulish-semibold",
        fontSize: 12,
        color: "rgba(34, 34, 34, 1)",
        marginBottom: 4,
    },
    logisticsLocations: {
        fontFamily: "mulish-regular",
        fontSize: 10,
        color: "rgba(34, 34, 34, 0.6)",
    },
})
 
export default LogisticsInfo;