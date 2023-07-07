// react native components
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    Image
} from "react-native";
// colors
import {
    background,
    black,
    white,
} from "../style/colors";
// components
import Header from "../components/Header";
import StatWrapper from "../components/StatWrapper";
import StatCard from "../components/StatCard";
import LogisticsLocations from "../components/LogisticsLocations";
// icons
import VerifiedIcon from '../assets/icons/VerifiedIcon';
// react hooks


const LogisticsDetails = ({navigation}) => {

    // location list
    const locationsList = [
        {
            id: 1,
            location: "Asaba",
            charge: 4000,
        },
        {
            id: 2,
            location: "Benin City",
            charge: 5000,
        },
        {
            id: 3,
            location: "Sapele",
            charge: 3500,
        },
        {
            id: 4,
            location: "Ughelli",
            charge: 4000,
        },
        {
            id: 5,
            location: "Agbor",
            charge: 3500,
        },
        {
            id: 6,
            location: "Warri",
            charge: 4500,
        },
        {
            id: 7,
            location: "Abraka",
            charge: 4000,
        },
        {
            id: 8,
            location: "Ibusa",
            charge: 3500,
        },
        {
            id: 9,
            location: "Okpanam",
            charge: 3000,
        },
        {
            id: 10,
            location: "Uromi",
            charge: 4000,
        },
        {
            id: 11,
            location: "Ogwashi-Uku",
            charge: 3500,
        },
        {
            id: 12,
            location: "Auchi",
            charge: 4500,
        },
        {
            id: 13,
            location: "Agbor",
            charge: 3500,
        },
        {
            id: 14,
            location: "Eku",
            charge: 4000,
        }
    ];

    // stats array
    const stats = [
        {
            id: 1,
            title: "Total Deliveries",
            presentValue: 500,
            oldValue: 495,
            decimal: false,
            unit: "",
            unitPosition: "end",
        },
        {
            id: 2,
            title: "Delivery Success Rate",
            presentValue: 80,
            oldValue: 82,
            decimal: false,
            unit: "%",
            unitPosition: "end",
        },
    ];

    
    // render LogisticsDetails page
    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            style={style.container}
        >
            <View style={style.main}>
                {/* header component */}
                <Header 
                    navigation={navigation} 
                    stackName={
                        <View style={style.headerWrapper}>
                            <Image 
                                source={require('../assets/images/komitex.png')}
                                style={style.logisticsImage}
                            />
                            <Text style={style.headerText} >Komitex Logistics</Text>
                            <VerifiedIcon />
                        </View>
                    } 
                    iconFunction={null} 
                    icon={null} 
                    unpadded={true}
                />

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
                            backgroundColor={white}
                        />
                    ))}
                </StatWrapper>
                <LogisticsLocations
                    locations={locationsList}
                    backgroundColor={white}
                />
            </View>
        </ScrollView>
    );
}

// stylesheet
const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: background,
        padding: 20,
        paddingTop: 0,
    },
    headerWrapper: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 8,
    },
    main: {
        display: 'flex',
        hieght: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20,
        marginBottom: 20,
    },
    logisticsImage: {
        width: 40,
        height: 40,
        borderRadius: 8,
        marginRight: 4,
    },
    headerText: {
        fontFamily: 'mulish-semibold',
        color: black,
        fontSize: 12,
    },
})
 
export default LogisticsDetails;