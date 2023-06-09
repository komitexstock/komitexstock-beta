import { View, Text, StyleSheet } from "react-native";
import Header from "../components/Header";
import { globalStyleSheet } from "../style/globalStyleSheet";
import SelectInput from "../components/SelectInput";
import ArrowDown from "../assets/icons/ArrowDown";

const CreatNewOrderStack = ({navigation}) => {

    const selectLogisticsModal = () => {

    }

    return (
        <View style={globalStyleSheet.main}>
            <Header 
                navigation={navigation} 
                stackName={"Create New Order"} 
                iconFunction={null} 
                icon={null} 
                iconExist={false} 
            />
            <View style={style.inputWrapper}>
                <SelectInput 
                    label={"Select Logistics"} 
                    placeholder={null} 
                    value={"Komitex Logistics"}
                    onPress={selectLogisticsModal}
                    icon={<ArrowDown />}
                />
            </View>
        </View>
    );
}

const style = StyleSheet.create({
    main: {
        flex: 1,
    },
    inputWrapper: {
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
        width: "100%",
        flex: 1,
        justifyContent: 'flex-start',
    }
})
 
export default CreatNewOrderStack;