import { View, Text, StyleSheet } from "react-native";
import Header from "../components/Header";
import { globalStyleSheet } from "../style/globalStyleSheet";
import SelectInput from "../components/SelectInput";
import ArrowDown from "../assets/icons/ArrowDown";
import Input from "../components/Input";
import { useState } from "react";
import CustomBottomSheet from "../components/CustomBottomSheet";
import { useRef } from "react";

const CreatNewOrderStack = ({navigation}) => {

    const selectLogisticsModal = () => {

    }

    const handleOrderDetails = () => {
        
    }

    const [orderDetails, setOrderdetails] = useState("");
    const [Logistics, selectLogistics] = useState("");

    const [showOverlay, setShowOverlay] = useState(false);
    
    const bottomSheetModalRef = useRef(null);

    const closeModal = () => {
      bottomSheetModalRef.current?.close();
      setShowOverlay(false);
    };

    const openModal = () => {
        bottomSheetModalRef.current?.present();
        setShowOverlay(true);
    }

    return (
        <>
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
                        placeholder={"Choose a Logistics"} 
                        value={Logistics}
                        onPress={openModal}
                        icon={<ArrowDown />}
                    />

                    <Input 
                        label={"Order Details"} 
                        placeholder={"Paste order details here..."} 
                        onChange={handleOrderDetails}
                        value={orderDetails}
                        multiline={true}
                        maxRows={5}
                    />
                </View>
            </View>
            <CustomBottomSheet
                bottomSheetModalRef={bottomSheetModalRef}
                setShowOverlay={setShowOverlay}
                showOverlay={showOverlay}
                closeModal={closeModal}
                snapPointsArray={["50%", "70%"]}
                autoSnapAt={0}
            >
            </CustomBottomSheet>
        </>
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