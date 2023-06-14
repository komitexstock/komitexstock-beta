import { 
    View, 
    StyleSheet, 
    ScrollView, 
    TouchableWithoutFeedback,
    Keyboard,
    Text,
    TouchableOpacity,
    Image,
    TextInput
} from "react-native";
import Header from "../components/Header";
import Input from "../components/Input";
import SelectInput from "../components/SelectInput";
import CustomBottomSheet from "../components/CustomBottomSheet";
import AddLogisticsModalContent from "../components/AddLogisticsModalContent";
import AddLocationModalContent from "../components/AddLocationModalContent";
import AddProductsModalContent from "../components/AddProductsModalContent";
import AddSummaryModalContent from "../components/AddSummaryModalContent";
import ArrowDown from "../assets/icons/ArrowDown";
import Info from "../assets/icons/Info";
import CustomButton from "../components/CustomButton";
import { useState, useRef } from "react";
import { primaryColor } from "../style/globalStyleSheet";
import ClearSearch from "../assets/icons/ClearSearch";

const CreatNewOrderStack = ({navigation}) => {

    // state to store order details
    const [ orderDetails, setOrderdetails] = useState(null);
    
    // state to store selected logistics
    const [logistics, setLogistics] = useState(null);
    // state to store selected location
    const [location, setLocation] = useState({
        id: Math.random(),
        location: "Warri",
        charge: 3500,
    });
    // response from ChatGPT after extracting order details
    const [products, setProducts] = useState([
        {
            id: 2,
            product_name: "Phoenix Sneakers",
            quantity: 1,
            imageUrl: require("../assets/images/sneakers.png"),
            checked: true,
        },
    ]);
    // customer name
    const [customerName, setCustomerName] = useState("Richard Idana");
    // customer phone number
    const [phoneNumber, setPhoneNumber] = useState([
        "08012345678",
        "09078945612",
    ]);
    // customer address
    const [address, setAddress] = useState("No 3 Izomo street Udu road Warri");

    // price
    const [price, setPrice] = useState(20000);
    

    const [processOrderResponse, setProcessOrderResponse] = useState(false);

    // state to indicate if select logistics input is active
    const [selectLogisticsActive, setSelectLogisticsActive] = useState(false);
    // state to indicate if select logistics input is active
    const [selectLocationActive, setSelectLocationActive] = useState(false);
    // other input active states are handled within the components
    // logistics and location are custom select input thats why their active states needs to be handled differently
    

    // state to control the type of modal to show in the bottom sheet
    const [modal, setModal] = useState({
        type: "Logistics",
        title: "Select Logistcs",
        subtitle: null,
    });
    
    // state to control modal overlay
    const [showOverlay, setShowOverlay] = useState(false);
    
    // modal ref
    const bottomSheetModalRef = useRef(null);

    const closeModal = () => {
      bottomSheetModalRef.current?.close();
      setShowOverlay(false);
      if (modal.type === "Logistics") setSelectLogisticsActive(false);
      else if (modal.type === "Location") setSelectLocationActive(false);
    };

    // function to open bottom sheet modal
    const openModal = (type, title, subtitle) => {
        bottomSheetModalRef.current?.present();
        setShowOverlay(true);
        Keyboard.dismiss();
        setModal({
            type: type,
            title: title,
            subtitle: subtitle,
        });
        if (type === "Logistics") setSelectLogisticsActive(true);
        else if (type === "Location") setSelectLocationActive(true);
        
    }

    
    const handleOrderDetails = () => {
        
    }

    const processOrderDetails = async () => {
        setProcessOrderResponse("Response from ChatGPT");
    }

    const showOrderSummary = () => {
        openModal("Summary", "Order Summary", "Review your order details");    
    }


    const handleSelectedLogistics = (data) => {
        closeModal();
        setLogistics(data);
    }

    const handleSelectedLocation = (data) => {
        closeModal();
        setLocation(data);
    }

    const decreaseQuantity = (index) => {
        setProducts((prev) => {
            const newProducts = [...prev];
            if (newProducts[index].quantity !== 1) {
                newProducts[index].quantity -= 1;
            } 
            return newProducts;
        })
    }

    // increase product quanityt
    const increaseQuantity = (index) => {
        setProducts((prev) => {
            const newProducts = [...prev];
            newProducts[index].quantity += 1;
            return newProducts;
        })
    }

    const removeProduct = (id) => {
        const newProduct = products.filter((product) => product.id !== id);
        setProducts(newProduct);
    }

    const addProducts = (productsList) => {
        setProducts(productsList);
        closeModal();
        // console.log(productsList)
    }

    const updateName = (text) => {
        setCustomerName(text);
    }
    
    // console.log(phoneNumber);
    
    const updatePhoneNumber = (text) => {
        let newText = text.replace(new RegExp(' ', 'g'), '');
        // remove all occurrence of the space character ' ' in text gloablly
        // where 'g' means global
        setPhoneNumber(newText.split(','));
    }
    
    const updateAddress = (text) => {
        setAddress(text);
    }
    
    const updatePrice = (text) => {
        setPrice(parseFloat(text));
    }

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
            adornment: false,
        },
        {
            id: 2,
            editable: true,
            maxRows: 1,
            multiline: false,
            value: phoneNumber,
            onChange: updatePhoneNumber,
            placeholder: "Customer's Phone Number",
            label: "Customer's Phone Number",
            textAlign: "center",
            height: 44,
            keyboardType: "phone-pad",
            adornment: false,
        },
        {
            id: 3,
            editable: true,
            maxRows: 1,
            multiline: false,
            value: address,
            onChange: updateAddress,
            placeholder: "Address",
            label: "Delivery Address",
            textAlign: "center",
            height: 44,
            keyboardType: "default",
            adornment: false,
        },
        {
            id: 4,
            editable: true,
            maxRows: 1,
            multiline: false,
            maxRows: 1,
            value: String(price),
            onChange: updatePrice,
            placeholder: "Price",
            label: "Price",
            textAlign: "center",
            height: 44,
            keyboardType: "numeric",
            adornment: "₦",
        },
    ];
    
    return (
        <>
            <TouchableWithoutFeedback
                onPress={() => {
                    Keyboard.dismiss();
                }}
                style={{backgroundColor: "pink"}}
            >
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{
                        minHeight: "100%",
                        width: "100%",
                        backgroundColor: "#f8f8f8",
                    }}
                >
                    <View style={style.main}>
                        <View style={style.mainContent}>
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
                                        onPress={() => openModal("Logistics", "Select Logistics", null)}
                                        icon={<ArrowDown />}
                                        active={selectLogisticsActive}
                                        inputFor={"Logistics"}
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
                                    {processOrderResponse && (<>
                                        <SelectInput 
                                            label={"Delivery Location"}
                                            labelIcon={<Info />}
                                            placeholder={"Delivery Location"} 
                                            value={location}
                                            onPress={() => openModal("Location", "Delivery Location", null)}
                                            icon={<ArrowDown />}
                                            active={selectLocationActive}
                                            inputFor={"Location"}
                                        />
                                        <View style={style.productsWrapper}>
                                            <View style={style.productsHeading}>
                                                <Text style={style.producPlaceholder}>Products Selected</Text>
                                                <TouchableOpacity
                                                    onPress={() => openModal("Products", "Select Products", null)}
                                                >
                                                    <Text style={style.addProduct}>+Add Product</Text>
                                                </TouchableOpacity>
                                            </View>
                                            { products.map((product, index) => (
                                                <View key={index} style={style.productItem}>
                                                    
                                                    <View style={style.productDetailsWrapper}>
                                                        <Image
                                                            style={style.productImage}
                                                            source={product.imageUrl}
                                                        />
                                                        <Text style={style.productName}>
                                                            {product.product_name}
                                                        </Text>
                                                    </View>

                                                    <View style={style.productQuantityWrapper}>
                                                        <View style={style.productQuantityContainer}>
                                                            {/* reduce quantity button */}
                                                            <TouchableOpacity 
                                                                style={style.quantityButton}
                                                                onPress={() => {
                                                                    decreaseQuantity(index);
                                                                }}
                                                            >
                                                                <Text style={style.quantityButtonText}>-</Text>
                                                            </TouchableOpacity>
                                                            <TextInput 
                                                                keyboardType="numeric"
                                                                defaultValue={String(product.quantity)}
                                                                style={style.quantityInput}
                                                            />
                                                            {/* increase quantity button */}
                                                            <TouchableOpacity 
                                                                style={style.quantityButton}
                                                                onPress={() => {
                                                                    increaseQuantity(index);
                                                                }}
                                                            >
                                                                <Text style={style.quantityButtonText}>+</Text>
                                                            </TouchableOpacity>
                                                        </View>
                                                        <TouchableOpacity
                                                            onPress={() => removeProduct(product.id)}
                                                        >
                                                            <ClearSearch />
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                            ))}
                                        </View>
                                        {inputs.map((input) => (
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
                                                adornment={input.adornment}
                                            />
                                        ))}
                                    </>)}
                                </View>
                            </View>
                        </View>
                        { processOrderResponse && (
                            <CustomButton 
                                name="Continue" 
                                onPress={showOrderSummary}
                                backgroundColor={"#ffffff"}
                            />
                        )}
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
                sheetSubtitle={modal.subtitle}
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
                {modal.type === "Products" && (
                    <AddProductsModalContent 
                        addProducts={addProducts} selectedProducts={products}
                    />
                )}
                {modal.type === "Summary" && (
                    <AddSummaryModalContent 
                        logistics={logistics}
                        customerName={customerName}
                        products={products}
                        location={location}
                        phoneNumber={phoneNumber}
                        price={price}
                        address={address}
                    />
                )}
            </CustomBottomSheet>
            { !processOrderResponse && (
                <CustomButton 
                    name="Continue" 
                    onPress={processOrderDetails}
                    backgroundColor={"#f8f8f8"}
                    fixed={true}
                />
            )}
        </>
    );
}

const style = StyleSheet.create({

    productsWrapper: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        justifyContent: "flex-start",
        alignContent: "center", 
        gap: 10,       
    },
    productsHeading: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",  
    },
    producPlaceholder:  {
        fontFamily: "mulish-bold",
        fontSize: 12,
        color: "#222222",
    },
    addProduct: {
        fontFamily: "mulish-semibold",
        color: primaryColor,
        textDecorationLine: "underline",
        fontSize: 12,
    },
    productItem: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        justifyContent: 'space-between',
        alignItems: "center",
        padding: 12,
        borderRadius: 12,
        backgroundColor: "#ffffff",
        gap: 10,
    },
    productDetailsWrapper: {
        display: "flex",
        flexDirection: "row",
        width: "55%",
        flexWrap: "nowrap",
        alignItems: "center",
        gap: 10,
    },
    productImage: {
        width: 40,
        height: 40,
        borderRadius: 8,
    },
    productName: {
        fontFamily: "mulish-semibold",
        color: "#222222",
        flexWrap: "wrap",
    },
    productQuantityWrapper: {
        display: "flex",
        flexDirection: "row",
        width: "35%",
        justifyContent: "flex-end",
        alignItems: "center",
        gap: 7.5,
    },
    productQuantityContainer: {
        display: "flex",
        flexDirection: "row",  
        height: 30,
        backgroundColor: "#f8f8f8",
        width: 70,
        justifyContent: "space-between",
        alignItems: "center",
    },
    quantityButton: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 20,
        height: 20,
    },
    quantityButtonText: {
        fontFamily: "mulish-bold",
        color: "#222222",
    },
    quantityInput: {
        fontFamily: "mulish-regular",
        textAlign: "center",
    },


    main: {
        minHeight: "100%",
        width: "100%",
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    mainContent: {
        display: 'flex',
        flex: 1,
        width: "100%",
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        padding: 20,
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