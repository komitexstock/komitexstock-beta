import { 
    View, 
    StyleSheet, 
    ScrollView, 
    TouchableWithoutFeedback,
    Keyboard,
    Text,
    TouchableOpacity,
} from "react-native";
import Header from "../components/Header";
import Input from "../components/Input";
import SelectInput from "../components/SelectInput";
import CustomBottomSheet from "../components/CustomBottomSheet";
import AddLogisticsModalContent from "../components/AddLogisticsModalContent";
import AddLocationModalContent from "../components/AddLocationModalContent";
import AddProductsModalContent from "../components/AddProductsModalContent";
import AddSummaryModalContent from "../components/AddSummaryModalContent";
import CustomButton from "../components/CustomButton";
import Product from "../components/Product";
import ArrowDown from "../assets/icons/ArrowDown";
import InfoIcon from "../assets/icons/InfoIcon";
import { useState, useRef } from "react";
import { primaryColor } from "../style/globalStyleSheet";

const SendOrderStack = ({navigation}) => {

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
        openAtIndex: 0,
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
    const openModal = (type, title, subtitle, openAtIndex) => {
        bottomSheetModalRef.current?.present();
        setShowOverlay(true);
        Keyboard.dismiss();
        setModal({
            type: type,
            title: title,
            subtitle: subtitle,
            openAtIndex: openAtIndex
        });
        if (type === "Logistics") setSelectLogisticsActive(true);
        else if (type === "Location") setSelectLocationActive(true);   
    }

    const emptyLogisticsAndOrderDetails = [
            logistics, 
            orderDetails
        ].some(
            (item) => item === null || item === ''
    );

    const isAnyFieldEmpty = [
            logistics, 
            orderDetails, 
            location, 
            products, 
            phoneNumber, 
            address, 
            price
        ].some((item) => {
            return item === null || item === '' || item === undefined || item === 0 || item === NaN || (Array.isArray(item) && item.length === 0);
        }
    );

    // console.log(products);
    
    const processOrderDetails = async () => {
        setProcessOrderResponse("Response from ChatGPT");
    }

    const showOrderSummary = () => {
        openModal("Summary", "Order Summary", "Review your order details", 2);    
    }


    const handleSelectedLogistics = (data) => {
        closeModal();
        setLogistics(data);
    }

    const handleSelectedLocation = (data) => {
        closeModal();
        setLocation(data);
    }

    const decreaseQuantity = (id) => {
        setProducts(prevProducts => {
            return prevProducts.map(product => {
                if (product.id === id) {
                    let decrement;
                    if (product.quantity === 1) decrement = 0;
                    else decrement = 1
                    return {
                        ...product,
                        quantity: product.quantity -= decrement,
                    }
                } else {
                    return product
                }
            })
        })
    }

    // increase product quanityt
    const increaseQuantity = (id) => {
        setProducts(prevProducts => {
            return prevProducts.map(product => {
                if (product.id === id) {
                    return {
                        ...product,
                        quantity: product.quantity += 1,
                    }
                } else {
                    return product
                }
            })
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

    // function to update orderdetails
    const updateOrderDetails = (text) => {
        setOrderdetails(text)
    }

    const updateName = (text) => {
        setCustomerName(text);
    }
    
    // function to update phone number
    const updatePhoneNumber = (text) => {
        let newText = text.replace(new RegExp(' ', 'g'), '');
        // remove all occurrence of the space character ' ' in text gloablly
        // where 'g' means global
        setPhoneNumber(newText.split(','));
    }
    
    // function to update address
    const updateAddress = (text) => {
        setAddress(text);
    }
    
    // function to update price
    const updatePrice = (text) => {
        let newText = text.replace(new RegExp(',', 'g'), '');
        // remove all occurrence of the comma character ',' in text gloablly
        if (newText) setPrice(parseFloat(newText));
        else setPrice(0);
        
    }

    // console.log(price)

    const [errorCustomerName, setErrorCustomerName] = useState(false);
    const [errorPhoneNumber, setErrorPhoneNumber] = useState(false);
    const [errorAddress, setErrorAddress] = useState(false);
    const [errorPrice, setErrorPrice] = useState(false);

    // inputs
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
            helperText: false,
            error: errorCustomerName,
            setError: setErrorCustomerName,
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
            helperText: "Seperate multiple phone number with \",\"",
            error: errorPhoneNumber,
            setError: setErrorPhoneNumber,
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
            helperText: false,
            error: errorAddress,
            setError: setErrorAddress,
        },
        {
            id: 4,
            editable: true,
            maxRows: 1,
            multiline: false,
            maxRows: 1,
            value: price ? price.toLocaleString() : '',
            onChange: updatePrice,
            placeholder: "Price",
            label: "Price",
            textAlign: "center",
            height: 44,
            keyboardType: "numeric",
            adornment: "₦",
            helperText: false,
            error: errorPrice,
            setError: setErrorPrice,
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
                                stackName={"Send an Order"} 
                                iconFunction={null} 
                                icon={null} 
                            />
                            <View style={style.container}>
                                <View style={style.inputWrapper}>
                                    <SelectInput 
                                        label={"Select Logistics"} 
                                        placeholder={"Choose a logistics"} 
                                        value={logistics}
                                        onPress={() => openModal("Logistics", "Select Logistics", null, 0)}
                                        icon={<ArrowDown />}
                                        active={selectLogisticsActive}
                                        inputFor={"Logistics"}
                                    />

                                    <Input 
                                        label={"Order Details"} 
                                        placeholder={"Paste order details here..."} 
                                        onChange={updateOrderDetails}
                                        value={orderDetails}
                                        multiline={true}
                                        maxRows={5}
                                        editable={true}
                                        textAlign={"top"}
                                        height={100}
                                        keyboardType={"default"}
                                        error={false}
                                        setError={() => {}}
                                    />
                                    {processOrderResponse && (<>
                                        <SelectInput 
                                            label={"Delivery Location"}
                                            labelIcon={<InfoIcon />}
                                            placeholder={"Delivery Location"} 
                                            value={location}
                                            onPress={() => openModal("Location", "Delivery Location", null, 0)}
                                            icon={<ArrowDown />}
                                            active={selectLocationActive}
                                            inputFor={"Location"}
                                        />
                                        <View style={style.productsWrapper}>
                                            <View style={style.productsHeading}>
                                                <Text style={style.producPlaceholder}>Products Selected</Text>
                                                <TouchableOpacity
                                                    onPress={() => openModal("Products", "Select Products", null, 0)}
                                                >
                                                    <Text style={style.addProduct}>+Add Product</Text>
                                                </TouchableOpacity>
                                            </View>
                                            { products.map((product) => (
                                                <Product 
                                                    key={product.id} 
                                                    product={product} 
                                                    removeProduct={removeProduct}
                                                    increaseQuantity={increaseQuantity}
                                                    decreaseQuantity={decreaseQuantity}
                                                />
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
                                                helperText={input.helperText}
                                                error={input.error}
                                                setError={input.setError}
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
                                inactive={isAnyFieldEmpty}
                            />
                        )}
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
            <CustomBottomSheet
                bottomSheetModalRef={bottomSheetModalRef}
                showOverlay={showOverlay}
                closeModal={closeModal}
                snapPointsArray={["40%", "60%", "80%"]}
                autoSnapAt={modal.openAtIndex}
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
                        type={"order"}
                    />
                )}
            </CustomBottomSheet>
            { !processOrderResponse && (
                <CustomButton 
                    name="Process Order" 
                    onPress={processOrderDetails}
                    backgroundColor={"#f8f8f8"}
                    inactive={emptyLogisticsAndOrderDetails}
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
        borderRadius: 5,

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
 
export default SendOrderStack;