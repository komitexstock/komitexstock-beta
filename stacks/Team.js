import Header from "../components/Header";
import { View, Text, ScrollView, TouchableWithoutFeedback, StyleSheet } from "react-native";

const Team = ({navigation}) => {
    return (
        <TouchableWithoutFeedback>
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={style.container}
            >
                <View style={style.main}>
                    <Header 
                        navigation={navigation} 
                        stackName={"Team Members"} 
                        iconFunction={null} 
                        icon={null} 
                    />
                </View>
            </ScrollView>
        </TouchableWithoutFeedback>
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        backgroundColor: "#f8f8f8",
        padding: 20,
    },
    main: {
        paddingBottom: 90,
    }
})
 
export default Team;