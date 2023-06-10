import { 
    View, 
    StyleSheet, 
    ScrollView, 
    TouchableWithoutFeedback,
    Keyboard,
} from "react-native";
import Header from "../components/Header";
import Input from "../components/Input";
import SelectInput from "../components/SelectInput";
import CustomBottomSheet from "../components/CustomBottomSheet";
import AddLogisticsModalContent from "../components/AddLogisticsModalContent";
import AddLocationModalContent from "../components/AddLocationModalContent";
import ArrowDown from "../assets/icons/ArrowDown";
import Info from "../assets/icons/Info";
import CustomButton from "../components/CustomButton";
import { useState, useRef } from "react";

const CreatNewOrderStack = ({navigation}) => {

    // state to store order details
    const [orderDetails, setOrderdetails] = useState(null);
    // state to store selected logistics
    const [logistics, setLogistics] = useState(null);
    // state to store selected location
    const [location, setLocation] = useState("Warri (₦3,500)");
    // response from ChatGPT after extracting order details
    const [processOrderResponse, setProcessOrderResponse] = useState(false);

    // state to indicate if select logistics input is active
    const [selectLogisticsActive, setSelectLogisticsActive] = useState(false);
    // state to indicate if select logistics input is active
    const [selectLocationActive, setSelectLocationActive] = useState(false);

    // state to control the type of modal to show in the bottom sheet
    const [modal, setModal] = useState({
        type: "Logistics",
        title: "Select Logistcs",
    });
    
    // state to control modal overlay
    const [showOverlay, setShowOverlay] = useState(false);
    
    // modal ref
    const bottomSheetModalRef = useRef(null);

    const handleOrderDetails = () => {
        
    }

    const processOrderDetails = async () => {
        setProcessOrderResponse("any response");
    }

    const closeModal = () => {
      bottomSheetModalRef.current?.close();
      setShowOverlay(false);
      if (modal.type === "Logistics") setSelectLogisticsActive(false);
      else if (modal.type === "Location") setSelectLocationActive(false);
    };

    const openModal = (type, title) => {
        bottomSheetModalRef.current?.present();
        setShowOverlay(true);
        Keyboard.dismiss();
        setModal({
            type: type,
            title: title,
        });
        if (type === "Logistics") setSelectLogisticsActive(true);
        else if (type === "Location") setSelectLocationActive(true);
        
    }

    const handleSelectedLogistics = (data) => {
        closeModal();
        setLogistics(data);
    }

    const handleSelectedLocation = (data) => {
        closeModal();
        setLocation(data);
    }

    const updateName = (text) => {
        console.log(text);

    }

    const updatePhoneNumber = (text) => {
        console.log(text);
    }
    
    const updateAddress = (text) => {
        console.log(text);
        
    }
    
    const updatePrice = (text) => {
        console.log(text);
        
    }

    const [customerName, setCustomerName] = useState("Richard Idana");

    const inputs = [
        {
            id: 1,
            editable: true,
            maxRows: 1,
            multiline: false,
            value: customerName,
            onChange: updateName,
            placeholder: "Customer Name",
            label: "Customer Name",
            textAlign: "center",
            height: 44,
            keyboardType: "default",
        },
        {
            id: 2,
            editable: true,
            maxRows: 1,
            multiline: false,
            value: "08012345678",
            onChange: updatePhoneNumber,
            placeholder: "Customer's Phone Number",
            label: "Customer's Phone Number",
            textAlign: "center",
            height: 44,
            keyboardType: "phone-pad",
        },
        {
            id: 3,
            editable: true,
            maxRows: 1,
            multiline: false,
            value: "No 3 Izomo street Udu road Warri",
            onChange: updateAddress,
            placeholder: "Address",
            label: "Delivery Address",
            textAlign: "center",
            height: 44,
            keyboardType: "default",
        },
        {
            id: 4,
            editable: true,
            maxRows: 1,
            multiline: false,
            maxRows: 1,
            value: "20000",
            onChange: updatePrice,
            placeholder: "Price",
            label: "Price",
            textAlign: "center",
            height: 44,
            keyboardType: "numeric",
        },
    ]
    
    return (
        <>
            <TouchableWithoutFeedback
                onPress={() => {
                    Keyboard.dismiss();
                }}
                style={{backgroundColor: "pink"}}
            >
                <ScrollView
                    style={{
                        display: "flex",
                        minHeight: "100%",
                        width: "100%",
                        backgroundColor: "#f8f8f8",
                    }}
                >
                    <View style={style.main}>
                        <Header 
                            iconExist={false} 
                            navigation={navigation} 
                            stackName={"Create New Order"} 
                            iconFunction={null} 
                            icon={null} 
                        />
                        <View style={style.container}>
                            <View style={style.inputWrapper}>
                                <SelectInput 
                                    label={"Select Logistics"} 
                                    placeholder={"Choose a logistics"} 
                                    value={logistics}
                                    onPress={() => openModal("Logistics", "Select Logistics")}
                                    icon={<ArrowDown />}
                                    active={selectLogisticsActive}
                                />

                                <Input 
                                    label={"Order Details"} 
                                    placeholder={"Paste order details here..."} 
                                    onChange={handleOrderDetails}
                                    value={orderDetails}
                                    multiline={true}
                                    maxRows={5}
                                    editable={true}
                                    textAlign={"top"}
                                    height={100}
                                    keyboardType={"default"}
                                />
                                { processOrderDetails && (
                                    <SelectInput 
                                        label={"Delivery Location"}
                                        labelIcon={<Info />}
                                        placeholder={"Delivery Location"} 
                                        value={location}
                                        onPress={() => openModal("Location", "Delivery Location")}
                                        icon={<ArrowDown />}
                                        active={selectLocationActive}
                                    />
                                )}
                                { processOrderDetails && inputs.map(
                                    (input) => (
                                        <Input 
                                            key={input.id}
                                            label={input.label} 
                                            placeholder={input.placeholder} 
                                            onChange={input.onChange}
                                            value={input.value}
                                            multiline={input.multiline}
                                            maxRows={input.maxRows}
                                            editable={input.editable}
                                            textAlign={input.textAlign}
                                            height={input.height}
                                            keyboardType={input.keyboardType}
                                        />
                                    )
                                ) }
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
            <CustomBottomSheet
                bottomSheetModalRef={bottomSheetModalRef}
                setShowOverlay={setShowOverlay}
                showOverlay={showOverlay}
                closeModal={closeModal}
                snapPointsArray={["40%", "80%"]}
                autoSnapAt={0}
                sheetTitle={modal.title}
            >   
                {modal.type === "Logistics" && (
                    <AddLogisticsModalContent 
                        handleSelectedLogistics={handleSelectedLogistics}
                    />
                )}
                {modal.type === "Location" && (
                    <AddLocationModalContent 
                        handleSelectedLocation={handleSelectedLocation}
                    />
                )}
            </CustomBottomSheet>
            { !processOrderResponse && (
                <CustomButton 
                    name="Continue" 
                    onPress={processOrderDetails}
                    backgroundColor={"#ffffff"}
                />
            )}
        </>
    );
}

const style = StyleSheet.create({
    main: {
        minHeight: "100%",
        display: 'flex',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        padding: 20,
        paddingBottom: 150,
        flex: 1,
    },
    container: {
        flex: 1,
        width: "100%",
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },  
    inputWrapper: {
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
        width: "100%",
        flex: 1,
        justifyContent: 'flex-start',
    },
})
 
export default CreatNewOrderStack;