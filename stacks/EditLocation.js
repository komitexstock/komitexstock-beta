import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react';
// components
import Header from '../components/Header';

const EditLocation = ({navigation}) => {
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