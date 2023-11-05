import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
// components
import Header from '../components/Header'
import AccountButtons from '../components/AccountButtons'
import { background } from '../style/colors'

const BusinessSettings = ({navigation}) => {

    // business button list
    const businessButtons = [
        {
            id: 1,
            title: "Locations",
            mainInfoText: "Manage all your delivery locations and fees",
            onPress: () => navigation.navigate("Locations"),
        },
        {
            id: 2,
            title: "Business Policy",
            mainInfoText: "Let your merchants know how you operate",
            onPress: () => {},
        },
        {
            id: 3,
            title: "Reviews",
            mainInfoText: "See how well you are performing",
            onPress: () => navigation.navigate("Reviews"),
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