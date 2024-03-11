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
import CustomButton from "../components/CustomButton";
import Product from "../components/Product";
import SelectLogisticsModal from "../components/SelectLogisticsModal";
import SelectWarehouseModal from "../components/SelectWarehouseModal";

// icon
import ArrowDown from "../assets/icons/ArrowDown";

// react hooks
import { useState, useEffect } from "react";

// colors
import { accentLight, background, black, primaryColor } from "../style/colors";

// globals
import { useGlobals } from "../context/AppContext";

// skeleton screen
import SendWaybillSkeleton from "../skeletons/SendWaybillSkeleton";

// auth
import { useAuth } from "../context/AuthContext"

// firebase
import {
    database,
} from "../Firebase";

// firestore functions
import {
    collection,
    getDoc,
    getDocs,
    onSnapshot,
    where,
    query,
    orderBy,
    doc,
} from "firebase/firestore";

const SendWaybill = ({navigation, route}) => {

    // auth data
    const { authData } = useAuth();

    // route parameters
    const { default_logistics_id } = route.params || {};
    
    // page loding state
    const [pageLoading, setPageLoading] = useState(true);

    // state to store search queries
    const [searchQuery, setSearchQuery] = useState(null);

    // bottom sheet ref
    const { bottomSheetRef, bottomSheetOpen, setToast } = useGlobals();

    // state to store selected logistics
    const [logistics, setLogistics] = useState([]);

    // selected logistics
    const [ selectedLogistics, setSelectedLogistics ] = useState(null);
    
    // state to store chosen warehouse
    const [warehouses, setWarehouses] = useState(null);

    // const selected warehouse
    const [ selectedWarehouse, setSelectedWarehouse ] = useState(null);

    // state to store order details
    const [ waybillDetails, setWaybilldetails] = useState(null);

    // products array
    const [products, setProducts] = useState([]);

    // selected products array
    const [selectedProducts, setSelectedProducts] = useState([]);

    // state to indicate if select logistics input is active
    const [selectLogisticsActive, setSelectLogisticsActive] = useState(false);
    
    // state to indicate if select warehouse input is active
    const [selectWarehouseActive, setSelectWarehouseActive] = useState(false);

    // function to select logistics
    const handleSelectedLogistics = (id) => {
        // update logistics
        setSelectedLogistics(() => {
            return logistics.find(item => item.business_id === id);
        })
        // close bottomsheet
        closeModal();
    }

    // get products, logistics and merchants
    useEffect(() => {

        // fetch logistics/merchant business details
        const fetchBusiness = async (businessId) => {
            try {
                const docRef = doc(database, "businesses", businessId);
                const docSnap = await getDoc(docRef);
                return {
                    banner_image: docSnap.data().banner_image,
                    business_name: docSnap.data().business_name,
                    verified: docSnap.data().verified,
                };
            } catch (error) {
                console.log("fetchBusiness Error: ", error.message);
                setToast({
                    text: error.message,
                    visible: true,
                    type: "error",
                });
            }
        }

        // fetch product name
        const fetchProductName = async (productId) => {
            try {
                const docRef = doc(database, "products", productId);
                const docSnap = await getDoc(docRef);
                return docSnap.data().product_name;
            } catch (error) {
                console.log("Error: ", error.message);
                setToast({
                    text: error.message,
                    visible: true,
                    type: "error",
                });
            }
        }

        // fetch products
        const fetchProducts = async (businessId) => {
            try {
                const collectionRef = collection(database, "merchant_products");
                let q = query(
                    collectionRef,
                    where("business_id", "==", businessId),
                    orderBy("created_at")
                );
                
                const unsubscribe = onSnapshot(q, async (querySnapshot) => {
                    let productsArray = [];

                    for (const doc of querySnapshot.docs) {
                        // product data
                        const productData = doc.data();

                        // Fetch product name
                        const productName = await fetchProductName(productData?.product_id);
                        
                        const product = {
                            id: doc?.id,
                            product_name: productName,
                            product_image: productData.product_image, // produc
                        };
                        productsArray.push(product);
                    }

                    // set products
                    setProducts(productsArray);

                    // disable page loading state
                    // setPageLoading(false);

                }, (error) => { //handle errors
                    console.log("Error: ", error.message);
                    setToast({
                        text: error.message,
                        visible: true,
                        type: "error",
                    });
                    // setPageLoading(false);
                });
    
                return unsubscribe;
            } catch (error) {
                console.log("Caught Error: ", error.message);
                setToast({
                    text: error.message,
                    visible: true,
                    type: "error",
                });

                // disable page loading state
                // setPageLoading(false);
            }
        };

        // fetch logistics
        const fetchLogistics = (businessId) => {
            return new Promise((resolve, reject) => {
                try {
                    const collectionRef = collection(database, "business_partners");
                    let q = query(
                        collectionRef,
                        where("merchant_business_id", "==", businessId),
                        orderBy("created_at")
                    );
                    
                    // Subscribe to real-time updates
                    const unsubscribe = onSnapshot(q, async (querySnapshot) => {
                        const logisticsArray = [];
                        const promises = querySnapshot.docs.map(async (doc) => {
                            const data = doc.data();
                            if (!data.deactivated) {
                                const logistics_business_id = data.logistics_business_id;
                                
                                // Fetch all business information, stock, and total locations in parallel
                                const business = await fetchBusiness(logistics_business_id);
                                
                                const logisticsItem = {
                                    business_id: logistics_business_id,
                                    business_name: business?.business_name,
                                    banner_image: business.banner_image,
                                    verified: business?.verified,
                                };
                                
                                logisticsArray.push(logisticsItem);
                            }
                        });
                        
                        // Wait for all promises to resolve
                        await Promise.all(promises);
                        
                        // Set logistics
                        setLogistics(logisticsArray);
                        
                        // check length of logistics array
                        if (logisticsArray.length === 1) {
                            setSelectedLogistics(logisticsArray[0]);
                        } else {
                            setSelectedLogistics(() => {
                                return logisticsArray.find(item => item.business_id === default_logistics_id)
                            });
                        }
                        
                        // disable page loading state
                        // setPageLoading(false);

                        resolve(unsubscribe); // Resolve with unsubscribe function
                    }, (error) => { //handle errors
                        console.log("Error: ", error.message);
                        setToast({
                            text: error.message,
                            visible: true,
                            type: "error",
                        });
                        // setPageLoading(false);
                        reject(error); // Reject with error
                    });
                } catch (error) {
                    console.log("Fetch Logistics Caught Error: ", error.message);
                    setToast({
                        text: error.message,
                        visible: true,
                        type: "error",
                    });
                    reject(error); // Reject with error
                }
            });
        };

        // fecth products
        fetchProducts(authData?.business_id);

        // fetch logistics
        fetchLogistics(authData?.business_id);

    }, []);


    // function to select warehouse
    const handleSelectedWarehouse = (id) => {
        // update warehouse
        setSelectedWarehouse(() => {
            return warehouses.find(item => item.id === id);
        })
        // close bottomsheet
        closeModal();
    }

    // get warehouse
    useEffect(() => {
        
        // fetch warehouses
        const fetchWarehouses = async (business_id) => {
            try {
                // if no business id is received return from function
                if (!business_id) return;
                
                const collectionRef = collection(database, "warehouses");
                const q = query(
                    collectionRef,
                    where("business_id", "==", business_id),
                    orderBy("created_at")
                );

                const querySnapshot = await getDocs(q);
                
                let warehouseList = [];

                querySnapshot.forEach((doc) => {
                    const warehouseData = doc.data();
                    // only add warehouses that have a waybill receivable
                    if (warehouseData.waybill_receivable) {
                        const warehouse = {
                            id: doc.id,
                            warehouse_name: warehouseData.warehouse_name,
                        };
                        warehouseList.push(warehouse);
                    }
                });

                // if search query is empty
                setWarehouses(warehouseList);

                if (warehouseList.length === 1) {
                    setSelectedWarehouse(warehouseList[0]);
                }

                // disable page loading state
                setPageLoading(false);
            } catch (error) {
                console.log("Caught Error: ", error.message);
                setToast({
                    text: error.message,
                    visible: true,
                    type: "error",
                });

                // disable page loading state
                setPageLoading(false);
            }
        };

        // fetch warehouses
        fetchWarehouses(selectedLogistics?.business_id);

    }, [selectedLogistics]);


    // state to control the type of modal to show in the bottom sheet
    const [modal, setModal] = useState({
        type: "Logistics",
        title: "Select Logistcs",
        subtitle: null,
        openAtIndex: 0,
    });
    
    // close modal function
    const closeModal = () => {
        bottomSheetRef.current?.close();
        setSelectLogisticsActive(false);
        setSelectWarehouseActive(false);
    };

    // function to open bottom sheet modal
    const openModal = (type, title, subtitle, openAtIndex) => {
        bottomSheetRef.current?.present();
        Keyboard.dismiss();
        setModal({
            type: type,
            title: title,
            subtitle: subtitle,
            openAtIndex: openAtIndex
        });
        if (type === "Logistics") return setSelectLogisticsActive(true);
        if (type === "Warehouse") return setSelectWarehouseActive(true);
    }

    // check if any field is empty
    const isAnyFieldEmpty = [
            logistics, 
            waybillDetails,
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
    
    // state to indicate error in waybill details
    const [errorWaybillDetails, setErrorWaybillDetails] = useState(false);

    const handleConfirmWaybill = () => {
        closeModal();
        navigation.navigate("Chat", {
            id: "abc123",
            type: "Waybill",
            name: "Komitex",
            imageUrl: '../assets/images/komitex.png',
            newChat: true,
        })
    }
    
    return (
        <>
            {!pageLoading ? <>
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
                                            value={selectedLogistics?.business_name}
                                            onPress={() => openModal("Logistics", "Select Logistics", null, 0)}
                                            icon={<ArrowDown />}
                                            active={selectLogisticsActive}
                                            inputFor={"String"}
                                        />
                                        {/* select warehouse input */}
                                        <SelectInput 
                                            label={"Select Warehouse"} 
                                            placeholder={"Choose a destination warehouse"} 
                                            value={selectedWarehouse?.warehouse_name}
                                            onPress={() => openModal("Warehouse", "Select Warehouse")}
                                            icon={<ArrowDown />}
                                            active={selectWarehouseActive}
                                            inputFor={"String"}
                                        />
                                        {/* waybill details */}
                                        <Input 
                                            label={"Waybill Details"} 
                                            placeholder={"Driver's number or Waybill number"} 
                                            onChange={updateWaybillDetails}
                                            value={waybillDetails}
                                            multiline={true}
                                            maxRows={5}
                                            textAlign={"top"}
                                            height={64}
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
                                                        <Text style={style.addProduct}>+Select Product</Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity
                                                        onPress={() => navigation.navigate("AddProduct")}
                                                    >
                                                        <Text style={style.addProduct}>+New Product</Text>
                                                    </TouchableOpacity>
                                                </View>
                                                { selectedProducts.length !== 0 ? selectedProducts.map((product) => (
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
                {/* show waybill summary */}
                <CustomButton 
                    name="Continue" 
                    onPress={showWaybillSummary}
                    backgroundColor={background}
                    inactive={isAnyFieldEmpty}
                    fixed={true}
                />
            </> : <SendWaybillSkeleton />}
            {/* bottom sheet */}
            <CustomBottomSheet
                bottomSheetModalRef={bottomSheetRef}
                closeModal={closeModal}
                snapPointsArray={["40%", "80%"]}
                autoSnapAt={modal.openAtIndex}
                sheetTitle={modal.title}
                sheetSubtitle={modal.subtitle}
            >
                {/* logistics modal content */}
                {modal?.type === "Logistics" && (
                    <SelectLogisticsModal
                        logistics={logistics}
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        onPress={handleSelectedLogistics}
                    />
                )}
                {/* warehouse modal content */}
                {modal?.type === "Warehouse" && (
                    <SelectWarehouseModal
                        warehouses={warehouses}
                        onPress={handleSelectedWarehouse}
                    />
                )}
                {/* products modal content */}
                {modal?.type === "Products" && (
                    <AddProductsModalContent 
                        addProducts={addProducts} selectedProducts={products}
                    />
                )}
                {/* waybill summary modal content */}
                {modal?.type === "Summary" && (
                    <AddSummaryModalContent 
                        logistics={logistics}
                        products={products}
                        waybillDetails={waybillDetails}
                        type={"waybill"}
                        onPress={handleConfirmWaybill}
                    />
                )}
            </CustomBottomSheet>
            
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