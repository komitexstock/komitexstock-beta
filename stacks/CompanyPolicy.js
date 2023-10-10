// react native components
import { ScrollView, View, Text, StyleSheet } from "react-native";
// components
import Header from "../components/Header";
// colors
import { background, black, bodyText, white } from "../style/colors";
// icons
import RemittanceIcon from "../assets/icons/RemittanceIcon";
import FailedDeliveryIcon from "../assets/icons/FailedDeliveryIcon";
import InactiveInventoryIcon from "../assets/icons/InactiveInventoryIcon";

const CompanyPolicy = ({navigation}) => {

    const policies = [
        {
            name: "Delivery",
            policyList: [
                {
                    id: 1,
                    policyText: 'Remittance Period: 24hrs after delivery',
                    icon: <RemittanceIcon />,
                },
                {
                    id: 2,
                    policyText: 'Cost for failed delivery: 50% of Delivery Charges',
                    icon: <FailedDeliveryIcon />,
                }
            ]  
        },
        {
            name: "Inventory",
            policyList: [
                {
                    id: 1,
                    policyText: 'Maximun Inactive Inventory Period: 30 Days',
                    icon: <InactiveInventoryIcon />,
                },
            ]  
        },
        {
            name: "Additional Policy",
            policyList: [
                {
                    id: 1,
                    policyText: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.' + 
                    'Atque, voluptatibus necessitatibus exercitationem aut consectetur odio nemo praesentium!',
                    icon: false,
                },
            ]  
        },
    ];  

    return (
        <ScrollView style={style.container} showsHorizontalScrollIndicator={false}>
            <View style={style.main}>
                <Header 
                    stackName={'Company Policy'}
                    navigation={navigation}
                    unpadded={true}
                />
                <Text style={style.paragraph}>
                    Get to understand how we operate in order to serve you better
                </Text>
                <View style={style.policyContainer}>
                    { policies.map((policy) => (
                        <View key={policy.name} style={style.policyWrapper}>
                            <Text style={style.policyTitle}>
                                {policy.name}
                            </Text>
                            {policy.policyList.map((policyItem) => (
                                <View key={policyItem.id} style={style.policyContent}>
                                    {policyItem.icon && policyItem.icon}
                                    <Text style={style.policyText}>{policyItem.policyText}</Text>
                                </View>
                            ))}
                        </View>
                    ))}
                </View>
            </View>
        </ScrollView>
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: background,
        padding: 20,
        paddingTop: 0,
    },
    main: {
        display: 'flex',
        width: '100%',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        marginBottom: 20,
    },
    paragraph: {
        marginTop: 8,
        fontSize: 12,
        fontFamily: 'mulish-medium',
        color: bodyText,
    },
    policyContainer: {
        display: 'flex',
        width: '100%',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        gap: 20,
        paddingVertical: 20,
    },
    policyWrapper: {
        display: 'flex',
        width: '100%',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        gap: 12,
        padding: 20,
        backgroundColor: white,
        borderRadius: 12,
    },
    policyTitle: {
        fontFamily: "mulish-semibold",
        fontSize: 14,
        color: black,
    },
    policyContent: {
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 12,
    },
    policyText: {
        fontSize: 12,
        fontFamily: 'mulish-medium',
        color: bodyText,
        lineHeight: 18,
    },
})
 
export default CompanyPolicy;