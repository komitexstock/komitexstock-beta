import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { useState } from 'react';
// components
import Header from '../components/Header';
import { State } from 'react-native-gesture-handler';

const EditLocation = ({navigation, route}) => {

    const { stateLocations } = route?.params;

    console.log(state);

    const [sublocations, setSublocations] = useState({
        id: 1,
        name: "Delta",
        opened: false,
        locations: [
            {
                id: 1,
                location: "Asaba",
                charge: 4000,
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
                id: 14,
                location: "Eku",
                charge: 4000,
            }
        ]
    });

    return (<>
        <ScrollView 
            style={styles.container}
        >
            <View style={styles.mainWrapper}>
                <Header
                    navigation={navigation} 
                    stackName={"Edit Location"} 
                    unpadded={true}
                />
            </View>
        </ScrollView>
    </>)
}

export default EditLocation

const styles = StyleSheet.create({})