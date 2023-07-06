// react native component
import { 
    View, 
    StyleSheet, 
    ScrollView, 
    TouchableWithoutFeedback,
    Keyboard,
    Text,
    TouchableOpacity,
    BackHandler
} from "react-native";
// components
import Header from "../components/Header";
import Input from "../components/Input";
import SelectInput from "../components/SelectInput";
import CustomBottomSheet from "../components/CustomBottomSheet";
import AddProductsModalContent from "../components/AddProductsModalContent";
import AddSummaryModalContent from "../components/AddSummaryModalContent";
import AddLogisticsModalContent from "../components/AddLogisticsModalContent";
import CustomButton from "../components/CustomButton";
import Product from "../components/Product";
// icon
import ArrowDown from "../assets/icons/ArrowDown";
// react hooks
import { useState, useRef, useEffect } from "react";
// colors
import { accentLight, background, black, primaryColor } from "../style/colors";

const SendWaybill = ({navigation}) => {

    // state to store order details
    const [ waybillDetails, setWaybilldetails] = useState(null);
    
    // state to store shipper location
    const [ shipperLocation, setShipperLocation] = useState(null);
    
    // state to store shipper location
    const [ receiverLocation, setReceiverLocation] = useState(null);
    
    // state to store selected logistics
    const [logistics, setLogistics] = useState(null);

    const [products, setProducts] = useState([]);

    // state to indicate if select logistics input is active
    const [selectLogisticsActive, setSelectLogisticsActive] = useState(false);
    // state to indicate if select logistics input is active
    

    // state to control the type of modal to show in the bottom sheet
    const [modal, setModal] = useState({
        type: "Logistics",
        title: "Select Logistcs",
        subtitle: null,
        openAtIndex: 0,
    });
    
    // state to control modal overlay
    const [showOverlay, setShowOverlay] = useState(false);

    // use effect to close modal onPress of back button if modal is open
    useEffect(() => {
        // function to run if back button is pressed
        const backAction = () => {
            // Run your function here
            if (showOverlay) {
                // if modal is open, close modal
                closeModal();
                return true;
            } else {
                // if modal isnt open simply navigate back
                return false;
            }
        };
    
        // listen for onPress back button
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction
        );
    
        return () => backHandler.remove();

    }, [showOverlay]);
    
    // modal ref
    const bottomSheetModalRef = useRef(null);

    // close modal function
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
        if (type === "Logistics") {
            setSelectLogisticsActive(true);
        }
    }

    // check if any field is empty
    const isAnyFieldEmpty = [
            logistics, 
            waybillDetails,
            shipperLocation,
            receiverLocation,
            products, 
        ].some((item) => {
            return item === null || item === '' || item === undefined || item === 0 || item === NaN || (Array.isArray(item) && item.length === 0);
        }
    );

    // function to show waybill summary bottomsheet modal
    const showWaybillSummary = () => {
        openModal("Summary", "Waybill Summary", "Review your waybill details", 1);    
    }

    // function to decrease quantity of a selected products
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

    // function to remove products
    const removeProduct = (id) => {
        const newProduct = products.filter((product) => product.id !== id);
        setProducts(newProduct);
    }

    // function to add products
    const addProducts = (productsList) => {
        setProducts(productsList);
        closeModal();
        // console.log(productsList)
    }

    // function to update waybilldetails
    const updateWaybillDetails = (text) => {
        setWaybilldetails(text)
    }
    
    // function to update shipperLocation
    const updateShipperLocation = (text) => {
        setShipperLocation(text)
    }

    // function to update receiverLocation
    const updateReceiverLocation = (text) => {
        setReceiverLocation(text)
    }

    // function to handle selected logistics
    const handleSelectedLogistics = (data) => {
        closeModal();
        setLogistics(data);
    }

    // state to indicate error in waybill details
    const [errorWaybillDetails, setErrorWaybillDetails] = useState(false);

    // state to indicate error in shipper location
    const [errorShipperLocation, setErrorShipperLocation] = useState(false);

    // state to indicate error in shipper location
    const [errorReceiverLocation, setErrorReceiverLocation] = useState(false);
    
    return (
        <>
            <TouchableWithoutFeedback
                onPress={() => {
                    Keyboard.dismiss();
                    // dismiss keyboard onPress anywhere on the screen
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
                            {/* header component */}
                            <Header 
                                navigation={navigation} 
                                stackName={"Send Waybill"} 
                                iconFunction={null} 
                                icon={null}
                                unpadded={true}
                            />
                            <View style={style.container}>
                                <View style={style.inputWrapper}>
                                    {/* select logistics input */}
                                    <SelectInput 
                                        label={"Select Logistics"} 
                                        placeholder={"Choose a logistics"} 
                                        value={logistics}
                                        onPress={() => openModal("Logistics", "Select Logistics", null, 0)}
                                        icon={<ArrowDown />}
                                        active={selectLogisticsActive}
                                        inputFor={"Logistics"}
                                    />
                                    {/* shippers location */}
                                    <Input 
                                        label={"Shipper's Location"} 
                                        placeholder={"Waybill origin e.g Jibowu"} 
                                        onChange={updateShipperLocation}
                                        value={shipperLocation}
                                        error={errorShipperLocation}
                                        setError={setErrorShipperLocation}
                                    />
                                    {/* receivers location */}
                                    <Input 
                                        label={"Receiver's Location"} 
                                        placeholder={"Waybill destination e.g Warri"} 
                                        onChange={updateReceiverLocation}
                                        value={receiverLocation}
                                        error={errorReceiverLocation}
                                        setError={setErrorReceiverLocation}
                                    />
                                    {/* waybill details */}
                                    <Input 
                                        label={"Waybill Details"} 
                                        placeholder={"Driver's number or Waybill number"} 
                                        onChange={updateWaybillDetails}
                                        value={waybillDetails}
                                        multiline={true}
                                        maxRows={5}
                                        editable={true}
                                        textAlign={"top"}
                                        height={100}
                                        keyboardType={"default"}
                                        error={errorWaybillDetails}
                                        setError={setErrorWaybillDetails}
                                    />
                                    { logistics && // if logistics has been selected, allow selection of products
                                        <View style={style.productsWrapper}>
                                            <View style={style.productsHeading}>
                                                <Text style={style.producPlaceholder}>Products Selected</Text>
                                                <TouchableOpacity
                                                    onPress={() => openModal("Products", "Select Products", null, 0)}
                                                >
                                                    <Text style={style.addProduct}>+Selected Product</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    onPress={() => navigation.navigate("AddProduct")}
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
                                                // indicate no products selected
                                                <View style={style.noProductWrapper}>
                                                    <Text style={style.noProductText}>
                                                        No product selected. Kindly add a new 
                                                        product or select one from your inventory
                                                    </Text>
                                                </View>
                                            )}
                                        </View>
                                    }
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
            {/* bottom sheet */}
            <CustomBottomSheet
                bottomSheetModalRef={bottomSheetModalRef}
                showOverlay={showOverlay}
                closeModal={closeModal}
                snapPointsArray={["40%", "80%"]}
                autoSnapAt={modal.openAtIndex}
                sheetTitle={modal.title}
                sheetSubtitle={modal.subtitle}
            >
                {/* logistics modal content */}
                {modal.type === "Logistics" && (
                    <AddLogisticsModalContent 
                        handleSelectedLogistics={handleSelectedLogistics}
                    />
                )}
                {/* products modal content */}
                {modal.type === "Products" && (
                    <AddProductsModalContent 
                        addProducts={addProducts} selectedProducts={products}
                    />
                )}
                {/* waybill summary modal content */}
                {modal.type === "Summary" && (
                    <AddSummaryModalContent 
                        logistics={logistics}
                        products={products}
                        waybillDetails={waybillDetails}
                        shipperLocation={shipperLocation}
                        receiverLocation={receiverLocation}
                        type={"waybill"}
                    />
                )}
            </CustomBottomSheet>
            {/* show waybill summary */}
            <CustomButton 
                name="Continue" 
                onPress={showWaybillSummary}
                backgroundColor={background}
                inactive={isAnyFieldEmpty}
                fixed={true}
            />
        </>
    );
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
        marginBottom: 100,
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
        justifyContent: 'space-between',
        marginTop: 24,
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
        fontFamily: 'mulish-regular',
        color: black,
    }
})
 
export default SendWaybill;