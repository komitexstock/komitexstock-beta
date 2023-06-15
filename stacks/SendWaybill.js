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
import AddProductsModalContent from "../components/AddProductsModalContent";
import AddSummaryModalContent from "../components/AddSummaryModalContent";
import AddLogisticsModalContent from "../components/AddLogisticsModalContent";
import CustomButton from "../components/CustomButton";
import Product from "../components/Product";
import ArrowDown from "../assets/icons/ArrowDown";
import InfoIcon from "../assets/icons/InfoIcon";
import { useState, useRef } from "react";
import { primaryColor } from "../style/globalStyleSheet";

const SendWaybill = ({navigation}) => {

    // state to store order details
    const [ waybillDetails, setWaybilldetails] = useState(null);
    
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
        setSelectLogisticsActive(true);
    }

    const isAnyFieldEmpty = [
            logistics, 
            waybillDetails, 
            products, 
        ].some((item) => {
            return item === null || item === '' || item === undefined || item === 0 || item === NaN || (Array.isArray(item) && item.length === 0);
        }
    );

    // console.log(products);
    
    const showWaybillSummary = () => {
        openModal("Summary", "Waybill Summary", "Review your waybill details", 1);    
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

    // function to update waybilldetails
    const updateWaybillDetails = (text) => {
        setWaybilldetails(text)
    }

    
    const handleSelectedLogistics = (data) => {
        closeModal();
        setLogistics(data);
    }

    // state to indicate error in waybill details
    const [errorWaybillDetails, setErrorWaybillDetails] = useState(false);
    
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
                                navigation={navigation} 
                                stackName={"Send Waybill"} 
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
                                    { logistics && <View style={style.productsWrapper}>
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
                                    </View>}
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
            <CustomBottomSheet
                bottomSheetModalRef={bottomSheetModalRef}
                showOverlay={showOverlay}
                closeModal={closeModal}
                snapPointsArray={["40%", "60%"]}
                autoSnapAt={modal.openAtIndex}
                sheetTitle={modal.title}
                sheetSubtitle={modal.subtitle}
            >
                {modal.type === "Logistics" && (
                    <AddLogisticsModalContent 
                        handleSelectedLogistics={handleSelectedLogistics}
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
                        products={products}
                        waybillDetails={waybillDetails}
                        type={"waybill"}
                    />
                )}
            </CustomBottomSheet>
            <CustomButton 
                name="Continue" 
                onPress={showWaybillSummary}
                backgroundColor={"#f8f8f8"}
                inactive={isAnyFieldEmpty}
                fixed={true}
            />
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
 
export default SendWaybill;