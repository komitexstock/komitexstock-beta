// react native component
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
import SummaryModal from "../components/SummaryModal";
import CustomButton from "../components/CustomButton";
import Product from "../components/Product";
import SelectBusinessModal from "../components/SelectBusinessModal";
import SelectWarehouseModal from "../components/SelectWarehouseModal";
import SelectProductsModal from "../components/SelectProductsModal";

// icon
import ArrowDown from "../assets/icons/ArrowDown";

// react hooks
import { useState, useEffect, useMemo, useRef } from "react";

// colors
import { accentLight, background, black, primaryColor, white } from "../style/colors";

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
    serverTimestamp,
    addDoc,
    updateDoc,
} from "firebase/firestore";
import { windowHeight } from "../utils/helpers";

const SendWaybill = ({navigation, route}) => {

    // auth data
    const { authData } = useAuth(); // authentication data stored

    // route parameters
    const { default_logistics_id } = route.params || {}; // string from route params
    
    // page loding state
    const [pageLoading, setPageLoading] = useState(true); // boolaen

    // fetching warehouse
    const [fetchingWarehouse, setFetchingWarehouse] = useState(true); // boolaen

    // fetching products
    const [fetchingProducts, setFetchingProducts] = useState(true); // boolean

    // disable page loading state, when all data is fetched
    useEffect(() => {
        // if all data has loaded
        if (!fetchingProducts && !fetchingWarehouse) setPageLoading(false); 
    }, [fetchingProducts, fetchingWarehouse]);

    // button loading state
    const [isLoading, setIsLoading] = useState(false); // boolean

    // state to store search queries
    const [searchQuery, setSearchQuery] = useState(null); // string

    // bottom sheet ref
    const { bottomSheetRef, bottomSheetOpen, setToast } = useGlobals(); // global variables

    // state to store selected logistics
    const [logistics, setLogistics] = useState([]); // array of objects
    /* {
        business_id, //string
        business_name, // string
        banner_image, // string
        verified, // boolean
    }*/

    // selected logistics
    const [selectedLogistics, setSelectedLogistics ] = useState(null); // object
    /* {
        business_id, //string
        business_name, // string
        banner_image, // string
        verified, // boolean
    }*/
    
    // state to store selected merchants
    const [merchants, setMerchants] = useState([]); // array of objects
    /* {
        business_id, //string
        business_name, // string
        banner_image, // string
        verified, // boolean
    }*/

    // selected merchants
    const [selectedMerchant, setSelectedMerchant ] = useState(null); // object
    /* {
        business_id, //string
        business_name, // string
        banner_image, // string
        verified, // boolean
    }*/
    
    // state to store chosen warehouse
    const [warehouses, setWarehouses] = useState([]); //array of objects
    /* {
        id, // string
        warehouse_name, // string
    }*/

    // const selected warehouse
    const [selectedWarehouse, setSelectedWarehouse ] = useState(null); // object
    /* {
        id, // string
        warehouse_name, // string
    }*/

    // state to store order details
    const [waybillDetails, setWaybilldetails] = useState(null); // string

    // ref for waybill detaisl input
    const inputRef = useRef(null);

    // products array
    const [products, setProducts] = useState([]); // array of obejcts
    /* {
        id, // string
        product_name, // string
        product_image, // string
        checked, // boolean
        quantity, // int
        available_quantity, // int
    }*/

    // state to indicate if select logistics input is active
    const [selectLogisticsActive, setSelectLogisticsActive] = useState(false); // boolean
    
    // state to indicate if select logistics input is active
    const [selectMerchantActive, setSelectMerchantActive] = useState(false); // boolean
    
    // state to indicate if select warehouse input is active
    const [selectWarehouseActive, setSelectWarehouseActive] = useState(false);  // boolean

    // function to select logistics
    const handleSelectedLogistics = (id) => {
        // update logistics
        setSelectedLogistics(() => {
            return logistics.find(item => item.business_id === id);
        })
        // close bottomsheet
        closeModal();
    }

    // function to select merchant
    const handleSelectedMerchant = (id) => {
        // update merchant
        setSelectedMerchant(() => {
            return merchants.find(item => item.business_id === id);
        })
        // close bottomsheet
        closeModal();
    }

    // selected products array
    const selectedProducts = useMemo(() => {
        return products.filter(item => item.checked === true);
    }, [products])
    /* {
        id, // string
        product_name, // string
        product_image, // string
        checked: true, // boolean
        quantity, // int
        available_quantity, // int
    }*/

    // get logistics and merchants
    useEffect(() => {
        // fetch logistics/merchant business details
        const fetchBusiness = async (businessId) => {
            try {
                // businessses collection
                const docRef = doc(database, "businesses", businessId);
                const docSnap = await getDoc(docRef);
                // return businesses object
                return {
                    banner_image: docSnap.data().banner_image,
                    business_name: docSnap.data().business_name,
                    verified: docSnap.data().verified,
                };
            } catch (error) {
                // indicate error
                console.log("fetchBusiness Error: ", error.message);
                setToast({
                    text: error.message,
                    visible: true,
                    type: "error",
                });
            }
        }

        // fetch logistics
        const fetchLogistics = (businessId) => {
            return new Promise((resolve, reject) => {
                try {
                    // get data from businesses_partners collection
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
                                
                                // Fetch all business information
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
                    // indicate error
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

        // fetch merchants
        const fetchMerchants = (businessId) => {
            return new Promise((resolve, reject) => {
                try {
                    // get data from businesses_partners collection
                    const collectionRef = collection(database, "business_partners");
                    let q = query(
                        collectionRef,
                        where("logistics_business_id", "==", businessId),
                        orderBy("created_at")
                    );
                    
                    // Subscribe to real-time updates
                    const unsubscribe = onSnapshot(q, async (querySnapshot) => {
                        const merchantsArray = [];
                        const promises = querySnapshot.docs.map(async (doc) => {
                            const data = doc.data();
                            if (!data.deactivated) {
                                const merchant_business_id = data.merchant_business_id;
                                
                                // Fetch all business information
                                const business = await fetchBusiness(merchant_business_id);
                                
                                const merchantItem = {
                                    business_id: merchant_business_id,
                                    business_name: business?.business_name,
                                    banner_image: business.banner_image,
                                    verified: business?.verified,
                                };
                                
                                merchantsArray.push(merchantItem);
                            }
                        });
                        
                        // Wait for all promises to resolve
                        await Promise.all(promises);
                        
                        // Set merchant
                        setMerchants(merchantsArray);
                        
                        // check length of merchant array
                        if (merchantsArray.length === 1) {
                            setSelectedMerchant(merchantsArray[0]);
                        }
                        
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
                    // indicate error
                    console.log("Fetch Merchant Caught Error: ", error.message);
                    setToast({
                        text: error.message,
                        visible: true,
                        type: "error",
                    });
                    reject(error); // Reject with error
                }
            });
        };

        // fetch logistics if account type is merchant
        // or fetch merchant is account type is logistics
        authData?.account_type === "Merchant" ? fetchLogistics(authData?.business_id) : fetchMerchants(authData?.business_id);

    }, []);

    // fetch products
    useEffect(() => {

        // fetch product name
        const fetchProductName = async (productId) => {
            try {
                // products colection to get product name
                const docRef = doc(database, "products", productId);
                const docSnap = await getDoc(docRef);
                return docSnap.data().product_name;
            } catch (error) {
                // indicate errror
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

                // if business id is undefined return
                if (!businessId) {
                    return;
                }

                // merchant products collection
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
                            product_image: productData.product_image, // product image
                            checked: false,
                            quantity: 1,
                        };
                        productsArray.push(product);
                    }

                    // set products
                    setProducts((prevProducts) => {

                        // check for entry in productsArray thats not in prevProducts
                        const newProducts = productsArray.filter(product => !prevProducts.some(prevProduct => prevProduct.id === product.id));

                        // if there was a lis of products existing before new products were added
                        if (prevProducts.length !== 0) return [
                            ...prevProducts, 
                            ...newProducts.map(product => {
                                return {
                                    ...product,
                                    checked: true,
                                }
                            })
                        ];

                        // if multiple products exist
                        if (productsArray.length !== 1) return productsArray;
                        
                        // if only one product exist auto select it
                        return productsArray.map(product => {
                            return {
                                ...product,
                                checked: true,
                            }
                        })
                    });

                    // disable page loading state
                    setFetchingProducts(false);

                }, (error) => { //handle errors
                    // disable page loading state
                    setFetchingProducts(false);

                    console.log("Error: ", error.message);
                    setToast({
                        text: error.message,
                        visible: true,
                        type: "error",
                    });
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
                setFetchingProducts(false);
            }
        };

        // fetch merchant products
        const fetchMerchantProduct = async (merchantProductId) => {
            try {
                const docRef = doc(database, "merchant_products", merchantProductId);
                const docSnap = await getDoc(docRef);
                const productId = docSnap.id;
                const productImage = docSnap.data().product_image;
                // Fetch product name
                const productName = await fetchProductName(productId);

                // return product information object
                return { productId, productImage, productName }

            } catch (error) {
                console.log("Merchant Product Error: ", error.message);
                setToast({
                    text: error.message,
                    visible: true,
                    type: "error",
                });
            }
        }

        // fetch products
        const fetchInventoryProducts = async (businessId, warehouseId) => {
            try {

                // if business id is undefined return
                if (!businessId || !warehouseId) {
                    // disable page loading state
                    return setFetchingProducts(false);
                }

                const collectionRef = collection(database, "inventories");
                let q = query(
                    collectionRef,
                    where("merchant_business_id", "==", businessId),
                    where("warehouse_id", "==", warehouseId),
                );
                
                const unsubscribe = onSnapshot(q, async (querySnapshot) => {
                    let productsArray = [];

                    for (const doc of querySnapshot.docs) {
                        // product data
                        const productData = doc.data();

                        // Fetch merchant product
                        const merchantProduct = await fetchMerchantProduct(productData?.merchant_product_id);
                        
                        const product = {
                            id: merchantProduct?.productId,
                            product_name: merchantProduct?.productName,
                            product_image: merchantProduct?.productImage, // product image
                            checked: false,
                            quantity: 1,
                            available_quantity: productData?.quantity
                        };
                        productsArray.push(product);
                    }

                    // set products
                    setProducts(() => {
                        // if multiple products exist
                        if (productsArray.length !== 1) return productsArray;
                        
                        // if only one product exist auto select it
                        return productsArray.map(product => {
                            return {
                                ...product,
                                checked: true,
                            }
                        })
                    });

                    // disable loading state
                    setFetchingProducts(false);

                }, (error) => { //handle errors
                    console.log("Error: ", error.message);
                    setToast({
                        text: error.message,
                        visible: true,
                        type: "error",
                    });

                    // disable loading state
                    setFetchingProducts(false);
                });
    
                return unsubscribe;
            } catch (error) {
                console.log("Caught Error: ", error.message);
                setToast({
                    text: error.message,
                    visible: true,
                    type: "error",
                });

                // disable loading state
                setFetchingProducts(false);
            }
        };

        // fecth products   
        authData?.account_type === "Merchant" ? 
        fetchProducts(authData?.business_id) : 
        fetchInventoryProducts(selectedMerchant?.business_id, selectedWarehouse?.id);


    }, [selectedMerchant, selectedWarehouse])


    // function to select warehouse
    const handleSelectedWarehouse = (id) => {

        // if account is a logistics, changing warehouses imply fetching products
        if (authData?.account_type !== "Merchant") setFetchingProducts(true);
        
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
                if (!business_id) {
                    return;
                }
                
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
                    if (authData?.account_type === "Merchant") {
                        // only add warehouses that have a waybill receivable
                        if (warehouseData.waybill_receivable) {
                            const warehouse = {
                                id: doc.id,
                                warehouse_name: warehouseData.warehouse_name,
                            };
                            warehouseList.push(warehouse);
                        } 
                    } else {
                        const warehouse = {
                            id: doc.id,
                            warehouse_name: warehouseData.warehouse_name,
                        };
                        warehouseList.push(warehouse);
                    }
                });

                // if search query is empty
                setWarehouses(() => {
                    // sort warehouse list alphabetically
                    return warehouseList.sort((a, b) => a.warehouse_name.localeCompare(b.warehouse_name));
                });

                if (warehouseList.length === 1) {
                    setSelectedWarehouse(warehouseList[0]);
                }

                // disable fetching warehouse state
                setFetchingWarehouse(false);

            } catch (error) {
                console.log("Caught Error: ", error.message);
                setToast({
                    text: error.message,
                    visible: true,
                    type: "error",
                });

                // disable fetching warehouse state
                setFetchingWarehouse(false);
            }
        };

        // fetch warehouses
        fetchWarehouses(
            authData?.account_type === "Merchant" ?
            selectedLogistics?.business_id :
            authData?.business_id
        );

    }, [selectedLogistics]);


    // state to control the type of modal to show in the bottom sheet
    const [modal, setModal] = useState({
        type: "Logistics",
        title: "Select Logistcs",
        subtitle: null,
        openAtIndex: 0,
        snapPoints: ["50%", "75%", "100%"],
    });
    
    // close modal function
    const closeModal = () => {
        // close bottom sheet modal
        bottomSheetRef.current?.close();
        // deactive active states for inputs
        setSelectLogisticsActive(false);
        setSelectWarehouseActive(false);
        setSelectMerchantActive(false);
    };

    // function to open bottom sheet modal
    const openModal = (type, title, subtitle, openAtIndex) => {
        // open bottom sheet
        bottomSheetRef.current?.present();
        Keyboard.dismiss();
        // set modal parameters
        setModal({
            type: type,
            title: title,
            subtitle: subtitle,
            openAtIndex: openAtIndex,
            snapPoints: ["50%", "75%", "100%"],
        });
        // set active state of dedicated input
        if (type === "Logistics") return setSelectLogisticsActive(true);
        if (type === "Merchant") return setSelectMerchantActive(true);
        if (type === "Warehouse") return setSelectWarehouseActive(true);
    }

    // check if any field is empty
    const isAnyFieldEmpty = [
        // choose variable o check for empty state based on account type
        authData?.account_type === "Merchant" ? selectedLogistics : selectedMerchant, 
        waybillDetails,
        selectedProducts, 
    ].some(item => {
        return item === null || 
        item === '' || 
        item === undefined || 
        item === 0 || 
        item === NaN || 
        // item?.quantity === 0 || 
        // item?.quantity === '' || 
        (Array.isArray(item) && item?.length === 0 ) ||
        (Array.isArray(item) && item.some(i => !i?.quantity));
    });

    // function to show waybill summary bottomsheet modal
    const showWaybillSummary = () => {
        // show waybill summary modal
        openModal("Summary", "Waybill Summary", "Review your waybill details", 2);    
    }

    // function to decrease quantity of a selected products
    const decreaseQuantity = (id) => {
        setProducts(prevProducts => {
            return prevProducts.map(product => {
                if (product.id === id) {
                    let decrement = 1;
                    if (product.quantity === 1) decrement = 0;
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
                let increment = 1;
                if (product.quantity === product?.available_quantity) increment = 0;
                if (product.id === id) {
                    return {
                        ...product,
                        quantity: product.quantity += increment,
                    }
                } else {
                    return product
                }
            })
        })
    }

    // function to set quantity if its typed by the user
    const handleQuantityChange = (text, id) => {
        setProducts(prevProducts => {
            return prevProducts.map(product => {
                let newQuantity = text;
                if (newQuantity !== '') {
                    newQuantity = parseInt(text);
                    // if new quantity is greater than available quantity, set max value
                    if (product?.available_quantity && newQuantity > product?.available_quantity) {
                        newQuantity = product?.available_quantity;
                    }
                }
                if (product.id === id) {
                    return {
                        ...product,
                        quantity: newQuantity,
                    }
                } else {
                    return product
                }
            })
        })

    }

    // function to remove products
    const removeProduct = (id) => {
        // const newProduct = products.filter((product) => product.id !== id);
        setProducts(prevProducts => {
            return prevProducts.map(product => {
                if (product.id === id) {
                    return {
                        ...product,
                        quantity: 1,
                        checked: false,
                    }
                }
                return product;
            })
        });
    }

    // function to update waybilldetails
    const updateWaybillDetails = (text) => {
        setWaybilldetails(text)
    }
    
    // state to indicate error in waybill details
    const [errorWaybillDetails, setErrorWaybillDetails] = useState(false);

    // refer of the ScrollView component
    const scrollRef = useRef(null);

    // scroll offfset
    const [scrollOffset, setScrollOffset] = useState(0);

    // animated shadow when scroll height reaches sticky header
    const handleScroll = (e) => {
        const yOffset = e.nativeEvent.contentOffset.y;
        setScrollOffset(yOffset);
    }

    // function to scrool to target offset
    const handleScrollToTarget = (offset) => {
        // scroll to target offset
        scrollRef.current.scrollTo({ y: offset, animated: true });
    };

    // listen for keyboard opening or closing
    useEffect(() => {
        // if keyboard is open
        const keyboardDidShowListener = Keyboard.addListener(
            Platform.OS === 'android' ? 'keyboardDidShow' : 'keyboardWillShow', () => {
                // if bottom sheet is open just return early
                if (bottomSheetOpen) {
                    return setModal(prevModal => {
                        return {
                            ...prevModal,
                            openAtIndex: 0,
                            snapPoints: ["100%"], //fullscreen
                        }
                    })
                };
                // if keyboard was opened to edit waybill details, retun
                if (inputRef.current.isFocused()) return;

                // just scroll to the show product inputs properly
                handleScrollToTarget(windowHeight);
            }
        );
        
        // keyboard is closed
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            // run any desired function here
        });
    
        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, [bottomSheetOpen ]);

    // reset inputs function
    const handleResetInputs = () => {
        // reset products
        setProducts(prevProducts => {
            return prevProducts.map(product => {
                return {
                    ...product,
                    checked: false,
                    quantity: 1,
                }
            })
        });

        // reset waybilldetails
        setWaybilldetails('');

        // reset warehouse
        setSelectedWarehouse(null);
    }

    // function to send new waybill
    const handleConfirmWaybill = async () => {
        try {
            // initiate loading state
            setIsLoading(true);

            // waybill doc response
            let waybillDocResponse;

            // chat doc response
            let chatDocResponse;

            // messsage doc response
            let messageDocResponse;

            // chat participants array
            let chatMembers = [];

            // chat type
            const chatType = "Waybill";

            // products listed
            let productsList = selectedProducts.map((product, index) => {
                // seperate list of products by commas ','
                return `${product.product_name} x ${product.quantity}`;
            });

            // get array of all quantities
            const quantityArray = selectedProducts.map(product => {
                return product.quantity;
            });

            // get array of all selectedProducts id
            const productArray = selectedProducts.map(product => {
                return product.id;
            });

            // merchnat business id
            const merchantBusinessId = authData?.account_type === "Merchant" ? 
            authData?.business_id : 
            selectedMerchant?.business_id;

            // merchnat business id
            const logisticsBusinessId = authData?.account_type === "Logistics" ? 
            authData?.business_id : 
            selectedLogistics?.business_id;

            // merchnat business id
            const merchantBusinessName = authData?.account_type === "Merchant" ? 
            authData?.business_name : 
            selectedMerchant?.business_name;

            // merchnat business name
            const logisticsBusinessName = authData?.account_type === "Logistics" ? 
            authData?.business_name : 
            selectedLogistics?.business_name;

            // add waybill doc
            waybillDocResponse = await addDoc(collection(database, "waybills"), {
                merchant_business_id: merchantBusinessId,
                logistics_business_id: logisticsBusinessId,
                warehouse_id: selectedWarehouse.id,
                is_increment: authData?.account_type === "Merchant",
                status: "Pending",
                created_at: serverTimestamp(),
                edited_at: serverTimestamp(),
                status_updated_at: serverTimestamp(),
                rescheduled_date: null,
                created_by: authData?.uid,
                merchant_products_id: productArray,
                quantity: quantityArray,
                chat_id: null,
            });

            // get all users where business_id is merchant id or logistics id
            const members = [authData?.business_id, selectedLogistics?.business_id || selectedMerchant?.business_id];
            const collectionRef = collection(database, "users");
            let q = query(
                collectionRef, 
                where("business_id", "in", members),
                orderBy("created_at"),
            );

            // documents snapshot
            const querySnapshot = await getDocs(q);

            querySnapshot.forEach((doc) => {
                const docId = doc.id;
                // Push the document ID to the membersArray
                chatMembers.push(docId);
            });

            // add chat doc
            chatDocResponse = await addDoc(collection(database, "chats"), {
                merchant_business_id: merchantBusinessId,
                logistics_business_id: logisticsBusinessId,
                waybill_id: waybillDocResponse.id,
                chat_type: chatType,
                chat_members: chatMembers,
            });

            // update waybill doc with chat id
            await updateDoc(waybillDocResponse, {
                chat_id: chatDocResponse.id,
            });

            // add messages doc
            messageDocResponse = await addDoc(collection(database, "messages"), {
                chat_id: chatDocResponse.id,
                user_id: authData?.uid,
                message_type: "text",
                file_uri: null,
                file_type: null,
                reply_id: null,
                rescheduled_date: null,
                created_at: serverTimestamp(),
                business_id: authData?.business_id,
                business_name: authData?.business_name,
                text: `Merchant: *${merchantBusinessName}*\nLogistics: *${logisticsBusinessName}*\nWarehouse Name: *${selectedWarehouse?.warehouse_name}*\nProduct: *${productsList}*\nWaybill Details: ${waybillDetails}`,
            });

            // add read_receipts doc
            await addDoc(collection(database, "read_receipts"), {
                chat_id: chatDocResponse.id,
                message_id: messageDocResponse.id,
                user_id: authData?.uid,
                created_at: serverTimestamp(),
            });

            // reset inputs
            handleResetInputs();

            // disable loading state
            setIsLoading(false);

            // close bottomsheet modal
            closeModal();

            // navigation.navigate("Chat", {
            //     chat_id: chatDocResponse?.id,
            //     chat_type: chatType,
            //     business_name: selectedLogistics?.business_name,
            //     banner_image: selectedLogistics?.banner_image,
            //     newChat: true,
            // });
            
        } catch (error) {
            // disable loading state
            setIsLoading(false);
            // indicte error
            console.log("Caught Error: ", error.message);
            setToast({
                text: error.message,
                visible: true,
                type: "error",
            });
        }
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
                        onScroll={handleScroll}
                        ref={scrollRef}
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
                                        {/* show merchants select logistics input */}
                                        { authData?.account_type !== "Logistics" && <SelectInput 
                                            label={"Select Logistics"} 
                                            placeholder={"Choose a logistics"} 
                                            value={selectedLogistics?.business_name}
                                            onPress={() => openModal("Logistics", "Select Logistics", null, 0)}
                                            icon={<ArrowDown />}
                                            active={selectLogisticsActive}
                                            inputFor={"String"}
                                        />}
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
                                        {/* select merchant input */}
                                        {/* show logistics select merchant input */}
                                        { authData?.account_type !== "Merchant" && <SelectInput 
                                            label={"Select Merchant"} 
                                            placeholder={"Choose a Merchant"} 
                                            value={selectedMerchant?.business_name}
                                            onPress={() => openModal("Merchant", "Select Merchant", null, 0)}
                                            icon={<ArrowDown />}
                                            active={selectMerchantActive}
                                            inputFor={"String"}
                                        />}
                                        {/* waybill details */}
                                        <Input 
                                            inputRef={inputRef}
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
                                                        onPress={() => openModal("Products", "Select Products", null, 2)}
                                                    >
                                                        <Text style={style.addProduct}>+Select Product</Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity
                                                        onPress={() => navigation.navigate("AddProduct", {originPath: "SendWaybill"})}
                                                    >
                                                        <Text style={style.addProduct}>+New Product</Text>
                                                    </TouchableOpacity>
                                                </View>
                                                { selectedProducts.length !== 0 ? selectedProducts.map((product) => (
                                                    // map through selected products
                                                    <Product 
                                                        key={product.id}
                                                        id={product?.id}
                                                        productName={product?.product_name}
                                                        productImage={product?.product_image}
                                                        quantity={product?.quantity}
                                                        availableQuantity={product?.available_quantity}
                                                        removeProduct={removeProduct}
                                                        increaseQuantity={increaseQuantity}
                                                        decreaseQuantity={decreaseQuantity}
                                                        handleQuantityChange={handleQuantityChange}
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
                    backgroundColor={white}
                    inactive={isAnyFieldEmpty}
                    fixed={true}
                />
            </> : <SendWaybillSkeleton />}
            {/* bottom sheet */}
            <CustomBottomSheet
                bottomSheetModalRef={bottomSheetRef}
                closeModal={closeModal}
                snapPointsArray={modal.snapPoints}
                autoSnapAt={modal.openAtIndex}
                sheetTitle={modal.title}
                sheetSubtitle={modal.subtitle}
            >
                {/* logistics modal content */}
                {["Logistics", "Merchant"].includes(modal?.type)  && (
                    <SelectBusinessModal
                        business={authData?.account_type === "Merchant" ? logistics : merchants}
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        onPress={authData?.account_type === "Merchant" ? handleSelectedLogistics : handleSelectedMerchant}
                        modalType={modal?.type}
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
                    <SelectProductsModal 
                        products={products}
                        setProducts={setProducts}
                        closeModal={closeModal}
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        fetchingProducts={fetchingProducts}
                    />
                )}
                {/* waybill summary modal content */}
                {modal?.type === "Summary" && (
                    <SummaryModal
                        type={"waybill"}
                        selectedLogistics={selectedLogistics?.business_name}
                        selectedMerchant={selectedMerchant?.business_name}
                        waybillDetails={waybillDetails}
                        selectedWarehouse={selectedWarehouse?.warehouse_name}
                        selectedProducts={selectedProducts}
                        onPress={handleConfirmWaybill}
                        isLoading={isLoading}
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