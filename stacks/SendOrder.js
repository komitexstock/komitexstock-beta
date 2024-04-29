// react native components
import { 
    View, 
    StyleSheet, 
    ScrollView, 
    TouchableWithoutFeedback,
    Keyboard,
    Text,
    TouchableOpacity,
    Platform,
} from "react-native";
// components
import Header from "../components/Header";
import Input from "../components/Input";
import SelectInput from "../components/SelectInput";
import CustomBottomSheet from "../components/CustomBottomSheet";
import AddLogisticsModalContent from "../components/AddLogisticsModalContent";
import AddLocationModalContent from "../components/AddLocationModalContent";
import AddProductsModalContent from "../components/AddProductsModalContent";
import SummaryModal from "../components/SummaryModal";
import CustomButton from "../components/CustomButton";
import Product from "../components/Product";
import AlertNotice from "../components/AlertNotice";
// icon
import ArrowDown from "../assets/icons/ArrowDown";
import InfoIcon from "../assets/icons/InfoIcon";
// react hooks
import { useState, useEffect, useRef } from "react";
// colors
import { accentLight, background, black, primaryColor, white } from "../style/colors";
// globals
import { useGlobals } from "../context/AppContext";

const SendOrder = ({navigation, route}) => {

    // sheet ref
    const sheetRef = useRef(null);

    // bottom sheet ref
    const { bottomSheet, setBottomSheet, isLoading, setIsLoading } = useGlobals();

    const [sheetParameters, setSheetParameters] = useState({
        content: '',
        sheetSubtitle: '',
        sheetTitle: '',
    })

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
            id: 5,
            product_name: "Maybach Sunglasses",
            quantity: 1,
            imageUrl: "../assets/images/maybach-sunglasses.png",
            checked: false,
        },
        {
            id: 6,
            product_name: "Accurate Watch",
            quantity: 1,
            imageUrl: "../assets/images/accurate-watch.png",
            checked: false,
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
    const [price, setPrice] = useState(50000);
    
    // response from chatGPT
    const [processOrderResponse, setProcessOrderResponse] = useState(false);

    // state to indicate if select logistics input is active
    const [selectLogisticsActive, setSelectLogisticsActive] = useState(false);
    
    // state to indicate if select logistics input is active
    const [selectLocationActive, setSelectLocationActive] = useState(false);
    // other input active states are handled within the components
    // logistics and location are custom select input thats why their active states needs to be handled differently

    // update botomsheet global states
    useEffect(() => {
        // set bottomsheet state
        setBottomSheet(prevState=> {
            return {...prevState, close: () => {
                // close bottomsheet 
                sheetRef.current?.close()
                // disable inputs active states
                setSelectLogisticsActive(false);
                setSelectLocationActive(false);
            }}
        });
    }, []);
    
    // open modal function
    const openModal = (type) => {
        // dismiss keyboard
        Keyboard.dismiss();

        // set sheet parameters
        setSheetParameters({
            content: type,
            sheetTitle: type === "Summary" ? `Order ${type}` : `Select ${type}`,
            sheetSubtitle: type !== "Summary" ? undefined : "Review your order details",
        })

        // set active state for corresponding input
        if (type === "Logistics") setSelectLogisticsActive(true);
        else if (type === "Location") setSelectLocationActive(true); 

        // open bottomsheet
        sheetRef?.current?.present();

        // update bottomsheet global state
        setBottomSheet(prevState => {
            return {
                ...prevState,
                opened: true,
            }
        });
    }
    
    // close modal function
    const closeModal = () => {
        // close bottomsheet
        sheetRef?.current?.close();

        // deactiavte active states for select inputs
        //   deactivate logistics input
        setSelectLogisticsActive(false);
        // deactivate location input
        setSelectLocationActive(false);

        // update bottomsheet global state
        setBottomSheet(prevState => {
            return {
                ...prevState,
                opened: false,
            }
        });
    };

    // function to check if logistics or orderdetails are empty
    const emptyLogisticsAndOrderDetails = [
        logistics, 
        orderDetails
        ].some(
            (item) => item === null || item === ''
    );

    // variable to check for empty fields
    const isAnyFieldEmpty = [
            logistics, 
            orderDetails, 
            location, 
            products, 
            phoneNumber, 
            address, 
            price
        ].some((item) => {
            return [null, '', undefined, 0, NaN].includes(item) || 
            (Array.isArray(item) && item.length === 0);
        }
    );

    // function to process order, would send a request to ChatGPT 3.5
    const processOrderDetails = async () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setProcessOrderResponse("Response from ChatGPT");
        }, 1500);
    }

    // function to show order summary
    const showOrderSummary = () => {
        openModal("Summary");    
    }

    // function to select logistics
    const handleSelectedLogistics = (data) => {
        closeModal();
        setLogistics(data);
    }

    // function to select location
    const handleSelectedLocation = (data) => {
        closeModal();
        setLocation(data);
    }

    // decrease product quantity
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

    // increase product quantity
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

    // function to remove product
    const removeProduct = (id) => {
        const newProduct = products.filter((product) => product.id !== id);
        setProducts(newProduct);
    }

    // function to addProducts, the function is called in the select product modal
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

    // state to highlight error in customer name
    const [errorCustomerName, setErrorCustomerName] = useState(false);

    // state to highlight error in phone number
    const [errorPhoneNumber, setErrorPhoneNumber] = useState(false);
    
    // state to highlight error in address
    const [errorAddress, setErrorAddress] = useState(false);
    
    // state to highlight error in price
    const [errorPrice, setErrorPrice] = useState(false);

    // order inputs
    const inputs = [
        {
            id: 1,
            value: customerName,
            onChange: updateName,
            placeholder: "Customer Name",
            label: "Customer Name",
            keyboardType: "default",
            adornment: false,
            helperText: false,
            error: errorCustomerName,
            setError: setErrorCustomerName,
        },
        {
            id: 2,
            value: phoneNumber,
            onChange: updatePhoneNumber,
            placeholder: "Customer's Phone Number",
            label: "Customer's Phone Number",
            keyboardType: "phone-pad",
            adornment: false,
            helperText: "Seperate multiple phone number with \",\"",
            error: errorPhoneNumber,
            setError: setErrorPhoneNumber,
        },
        {
            id: 3,
            value: address,
            onChange: updateAddress,
            placeholder: "Address",
            label: "Delivery Address",
            keyboardType: "default",
            adornment: false,
            helperText: false,
            error: errorAddress,
            setError: setErrorAddress,
        },
        {
            id: 4,
            maxRows: 1,
            value: price ? price.toLocaleString() : '',
            onChange: updatePrice,
            placeholder: "Price",
            label: "Price",
            keyboardType: "numeric",
            adornment: "₦",
            helperText: false,
            error: errorPrice,
            setError: setErrorPrice,
        },
    ];

    const [alert, setAlert] = useState({
        show: false,
        type: "Success",
        text: ""
    });

    const closeAlert = () => {
        setAlert(prevAlert => {
            return {
                ...prevAlert,
                show: false
            }
        });
    };

    
    // use effect to remove add product propmt after 3 seconds
    useEffect(() => {
        if (route.params) {
            setAlert({
                show: true,
                type: route.params.type,
                text: route.params.text,
            })
        }
        
        setTimeout(() => {
            closeAlert();
        }, 3000);

    }, [route.params]);

    const handleConfirmOrder = () => {
        closeModal();
        navigation.navigate("Chat", {
            id: "abc123",
            type: "Order",
            name: "Komitex",
            imageUrl: '../assets/images/komitex.png',
            newChat: true,
        })
    }

    // listen for keyboard opening or closing
    useEffect(() => {
        // if keyboard is open
        const keyboardDidShowListener = Keyboard.addListener(
            Platform.OS === 'android' ? 'keyboardDidShow' : 'keyboardWillShow', () => {
                if (!bottomSheet.opened) return;
                // set bottomsheet paramteres
                sheetRef.current?.snapToIndex(2);
            }
        );
        
        // keyboard is closed
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            // run any desired function here
            // if wareehouse address is empty
            // set bottomsheet paramteres

        });

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, [bottomSheet.opened]);
    
    // render send order page
    return (<>
        <TouchableWithoutFeedback
            onPress={() => {
                Keyboard.dismiss();
                // onclick dismiss keyboard
            }}
        >
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{
                    minHeight: "100%",
                    width: "100%",
                    backgroundColor: background,
                }}
            >
                <View style={style.main}>
                    <View style={style.mainContent}>
                        {/* Header component */}
                        <Header 
                            navigation={navigation} 
                            stackName={"Send an Order"} 
                            iconFunction={null} 
                            icon={null} 
                            unpadded={true}
                        />
                        <View style={style.container}>
                            <View style={style.inputWrapper}>
                                {/* Select Logistics */}
                                <SelectInput 
                                    label={"Select Logistics"} 
                                    placeholder={"Choose a logistics"} 
                                    value={logistics}
                                    onPress={() => openModal("Logistics")}
                                    icon={<ArrowDown />}
                                    active={selectLogisticsActive}
                                    inputFor={"Logistics"}
                                />

                                {/* Order Details */}
                                <Input 
                                    label={"Order Details"} 
                                    placeholder={"Paste order details here..."} 
                                    onChange={updateOrderDetails}
                                    value={orderDetails}
                                    multiline={true}
                                    maxRows={5}
                                    textAlign={"top"}
                                    height={100}
                                    keyboardType={"default"}
                                    error={false}
                                    setError={() => {}}
                                />

                                {processOrderResponse && (<>
                                    {/* select location */}
                                    <SelectInput 
                                        label={"Delivery Location"}
                                        labelIcon={<InfoIcon />}
                                        placeholder={"Delivery Location"} 
                                        value={location}
                                        onPress={() => openModal("Location")}
                                        icon={<ArrowDown />}
                                        active={selectLocationActive}
                                        inputFor={"Location"}
                                    />
                                    {/* Selected Products Container */}
                                    <View style={style.productsWrapper}>
                                        <View style={style.productsHeading}>
                                            <Text style={style.producPlaceholder}>Products Selected</Text>
                                            <TouchableOpacity
                                                onPress={() => openModal("Products")}
                                            >
                                                <Text style={style.addProduct}>+Select Product</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                onPress={() => navigation.navigate("AddProduct", {
                                                    origin: "SendOrder",
                                                })}
                                            >
                                                <Text style={style.addProduct}>+New Product</Text>
                                            </TouchableOpacity>
                                        </View>
                                        { products.length !== 0 ? products.map((product) => (
                                            // map through selected products
                                            <Product 
                                                key={product.id} 
                                                product={product} 
                                                removeProduct={removeProduct}
                                                increaseQuantity={increaseQuantity}
                                                decreaseQuantity={decreaseQuantity}
                                            />
                                        )) : (
                                            // show no product selected component
                                            <View style={style.noProductWrapper}>
                                                <Text style={style.noProductText}>
                                                    No product selected. Kindly add a new product 
                                                    or select one from your inventory
                                                </Text>
                                            </View>
                                        )}
                                    </View>
                                    {inputs.map((input) => (
                                        // map through other relevant inputs
                                        <Input 
                                            key={input.id}
                                            label={input.label} 
                                            placeholder={input.placeholder} 
                                            onChange={input.onChange}
                                            value={input.value}
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
                        // action button to send order
                        <CustomButton 
                            name="Continue" 
                            onPress={showOrderSummary}
                            backgroundColor={white}
                            inactive={isAnyFieldEmpty}
                        />
                    )}
                </View>
            </ScrollView>
        </TouchableWithoutFeedback>
        {/* bottom sheet  */}
        <CustomBottomSheet
            index={1}
            sheetRef={sheetRef}
            closeModal={closeModal}
            sheetTitle={sheetParameters.sheetTitle}
            snapPointsArray={["50%", "75%", "100%"]}
            sheetSubtitle={sheetParameters.sheetSubtitle}
        >   
            {/* if modal type is logistics, render logistics modal content */}
            {sheetParameters.content === "Logistics" && (
                <AddLogisticsModalContent 
                    handleSelectedLogistics={handleSelectedLogistics}
                />
            )}
            {/* if modal type is location, render location modal content */}
            {sheetParameters.content === "Location" && (
                <AddLocationModalContent 
                    handleSelectedLocation={handleSelectedLocation}
                />
            )}
            {/* if modal type is products, render products modal content */}
            {sheetParameters.content === "Products" && (
                <AddProductsModalContent 
                    addProducts={addProducts} selectedProducts={products}
                />
            )}
            {/* if modal type is summary, render summary modal content */}
            {sheetParameters.content === "Summary" && (
                <SummaryModal 
                    logistics={logistics}
                    customerName={customerName}
                    products={products}
                    location={location}
                    phoneNumber={phoneNumber}
                    price={price}
                    address={address}
                    type={"order"}
                    onPress={handleConfirmOrder}
                    isLoading={isLoading && processOrderResponse}
                />
            )}
        </CustomBottomSheet>
        {/* button to process order */}
        { !processOrderResponse && (
            <CustomButton 
                name="Process Order" 
                onPress={processOrderDetails}
                backgroundColor={background}
                inactive={emptyLogisticsAndOrderDetails}
                fixed={true}
                isLoading={isLoading}
            />
        )}
        {/* success alert to display on addproduct or edit product */}
        { alert.show && (
            <AlertNotice 
                type={alert.type}
                text={alert.text}
                closeAlert={closeAlert}
                show={alert.show}
            />
        )}
    </>);
}

// stylesheet
const style = StyleSheet.create({
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
        paddingTop: 0,
    },
    container: {
        flex: 1,
        width: "100%",
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        marginTop: 24,
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
        gap: 12,
    },
    producPlaceholder:  {
        fontFamily: "mulish-bold",
        fontSize: 12,
        color: black,
        flex: 1,
    },
    addProduct: {
        fontFamily: "mulish-semibold",
        color: primaryColor,
        textDecorationLine: "underline",
        fontSize: 12,
    },
    noProductWrapper: {
        minHeight: 50,
        width: "100%",
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: accentLight,
        padding: 10,
        borderRadius: 12,

    },
    noProductText: {
        fontSize: 10,
        fontFamily: 'mulish-medium',
        color: black,
    }

})
 
export default SendOrder;