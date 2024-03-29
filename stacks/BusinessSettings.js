import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
// components
import Header from '../components/Header'
import AccountButtons from '../components/AccountButtons'
import { background } from '../style/colors'
// use auth
import { useAuth } from '../context/AuthContext'


const BusinessSettings = ({navigation}) => {

    // auth data
    const { authData } = useAuth();

    // business button list
    const businessButtons = [
        {
            id: 1,
            title: "Locations",
            mainInfoText: "Manage all your delivery locations and fees",
            onPress: () => navigation.navigate("AvailableLocations", {
                business_id: authData.business_id,
                business_name: authData.business_name,
            }),
        },
        {
            id: 2,
            title: "Business Policy",
            mainInfoText: "Let your merchants know how you operate",
            onPress: () => navigation.navigate("BusinessPolicy", {
                business_id: authData.business_id,
            }),
        },
        {
            id: 3,
            title: "Reviews",
            mainInfoText: "See how well you are performing",
            onPress: () => navigation.navigate("Reviews", {
                business_id: authData.business_id,
            }),
        },
    ];

    return (
        <View style={styles.container}>
            {/* header component */}
            <Header
                navigation={navigation}
                stackName={"Business Settings"}
                unpadded={true}
            />
            <View style={styles.buttonsWrapper}>
                {/* buttons list */}
                {businessButtons.map((button, index) => (
                    <AccountButtons
                        index={index}
                        length={businessButtons.length - 1}
                        key={button.id}
                        title={button.title}
                        subtitle={button.mainInfoText}
                        onPress={button.onPress}
                    />
                ))

                }
            </View>
        </View>
    )
}

export default BusinessSettings

const styles = StyleSheet.create({
    container: {
        width:  "100%",
        minHeight: "100%",
        backgroundColor: background,
        paddingHorizontal: 20,
    },
    buttonsWrapper: {
        marginTop: 30,
    }
})