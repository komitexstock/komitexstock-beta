// react native components
import { 
    View, 
    Text, 
    FlatList, 
    TouchableOpacity, 
    TouchableWithoutFeedback,
    StyleSheet,
    Keyboard
} from "react-native";

// icons
import SearchIcon from '../assets/icons/SearchIcon'
import CalendarIcon from "../assets/icons/CalendarIcon";
import SendOrderIcon from "../assets/icons/SendOrderIcon";

// colors
import {
    background,
    black,
    blackOut,
    bodyText,
    neutral,
    primaryColor,
    secondaryColor,
    white,
} from "../style/colors";

// react hooks
import { useState, useRef, useEffect, useMemo } from "react";

// skeleton imports
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import { LinearGradient } from "expo-linear-gradient";

// components
import StatWrapper from "../components/StatWrapper";
import StatCard from "../components/StatCard";
import CustomBottomSheet from "../components/CustomBottomSheet";
import CustomButton from "../components/CustomButton";
import SearchBar from "../components/SearchBar";
import WaybillListItem from "../components/WaybillListItem";
import FilterPill from "../components/FilterPill";
import Badge from "../components/Badge";
import Header from "../components/Header";
import FilterBottomSheet from "../components/FilterBottomSheet";
import SelectInput from "../components/SelectInput";
import FilterButtonGroup from "../components/FilterButtonGroup";
import CalendarSheet from "../components/CalendarSheet";
import OpenFilterButton from "../components/OpenFilterButton";
import ActionButton from "../components/ActionButton";

// bottomsheet component
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";

// moment
import moment from "moment";

// skeleton screen
import WaybillSkeleton from "../skeletons/WaybillSkeleton";

// globals
import { useGlobals } from "../context/AppContext";

// use auth context
import { useAuth } from "../context/AuthContext";

// firebase
import {
    database,
} from "../Firebase";

// firestore functions
import {
    collection,
    getDoc,
    onSnapshot,
    where,
    query,
    orderBy,
    doc,
} from "firebase/firestore";

// utilities
import { windowHeight, windowWidth } from "../utils/helpers";


const Waybill = ({navigation}) => {
    // colour array for skeleton loader
    const shimmerColorArray = ["#ebebeb", "#d9d9d9", "#ebebeb",];

    // skeleton component
    const Skeleton = createShimmerPlaceholder(LinearGradient);

    // use auth
    const { authData } = useAuth();

    // sheet refs
    const sheetRef = useRef(null);
    const filterSheetRef = useRef(null);

    // global variables
    const {
        bottomSheet,
        setFilterBottomSheet,
        setBottomSheet,
        calendarSheetRef,
        calendarSheetOpen,
        setToast,
    } = useGlobals();

    // update botomsheet global states
    useEffect(() => {
        // set bottomsheet state
        setBottomSheet(prevState=> {
            return {...prevState, close: () => sheetRef.current?.close()}
        });

        // set filter bottomsheet global state
        setFilterBottomSheet(prevState=> {
            return {...prevState, close: () => filterSheetRef.current?.close()}
        });
    }, []);

    // page loading state
    const [pageLoading, setPageLoading] = useState(true);

    // to indicate fetching waybill state
    const [fetchingWaybills, setFetchingWaybills] = useState(true);

    // fetching business and fetching products
    const [fetchingBusiness, setFetchingBusiness] = useState(true);
    const [fetchingProducts, setFetchingProducts] = useState(true);

    // previous period filter value
    const previousPeriodFilter = useRef(null);

    // console.log("fetching waybills:", fectchingWaybills);

    // tabs, default as Outgoing for Merchants
    const [tab, setTab] = useState(authData?.account_type === "Merchant" ? "outgoing" : "incoming");

    // state to store searchQuery
    const [searchQuery, setSearchQuery] = useState("");

    // previous date
    const today = new Date();

    // variable to store start date
    const [startDate, setStartDate] = useState(() => {
        const date = new Date();
        date.setHours(1, 0, 0, 1);
        return date;
    });

    // start datetime for query
    const [queryStartDateTime, setQueryStartDateTime] = useState(() => {
        const date = new Date();
        date.setHours(1, 0, 0, 1);
        return date;
    })

    // strt datetime for query
    const [queryEndDateTime, setQueryEndDateTime] = useState(() => {
        const date = new Date();
        date.setHours(23, 59, 59, 999);
        return date;
    })

    // variable to indicate start date input active state
    const [activeStartDate, setActiveStartDate] = useState(false);
    
    // variable to store end date
    const [endDate, setEndDate] = useState(() => {
        const date = new Date();
        date.setHours(23, 59, 59, 999);
        return date;
    });
    // variable to indicate end date input active state
    const [activeEndDate, setActiveEndDate] = useState(false);

    // waybill state
    const [waybills, setWaybills] = useState([]);

    // get waybill
    useEffect(() => {

        // fetch product name
        const fetchProductName = async (productId) => {
            try {
                const docRef = doc(database, "products", productId);
                const docSnap = await getDoc(docRef);
                return docSnap.data().product_name;
            } catch (error) {
                console.log("fetchProductName Error: ", error.message);
                throw error; // Re-throw the error to ensure it's propagated
            }
        }

        // fetch logistics/merchant business details
        const fetchBusiness = async (businessId, size, index) => {
            try {
                // businessses collection
                const docRef = doc(database, "businesses", businessId);
                const docSnap = await getDoc(docRef);
                // return businesses object
                const business = {
                    banner_image: docSnap.data().banner_image,
                    business_name: docSnap.data().business_name,
                    verified: docSnap.data().verified,
                };
                
                return business;
            } catch (error) {
                // indicate error
                console.log("fetchBusiness Error: ", error.message);
                throw error; // Re-throw the error to ensure it's propagated
            } finally {
                // Check if all businesses have been fetched
                if (index === size - 1) {
                    setFetchingBusiness(false);
                }
            }
        };

        // fetch merchants products with id of array provided
        const fetchProducts = async (idArray, quantityArray, size, index) => {
            try {
                let productsArray = [];

                const childSize = idArray.length;

                for (let childIndex = 0; childIndex < childSize; childIndex++) {
                    const id = idArray[childIndex];

                    try {
                        const docRef = doc(database, "merchant_products", id);
                        const docSnap = await getDoc(docRef);

                        const productId = docSnap.data()?.product_id;
                        const productName = await fetchProductName(productId);

                        productsArray.push({
                            id: id,
                            product_name: productName,
                            quantity: quantityArray[childIndex],
                        });

                    } catch (error) {
                        console.log("Error fetching product details: ", error.message);
                        throw error; // Re-throw the error to ensure it's propagated
                    }
                }

                return productsArray;
            } catch (error) {
                console.log("fetchProducts Error: ", error.message);
                throw error; // Re-throw the error to ensure it's propagated
            } finally {
                // Check if all products have been fetched
                if (index === size - 1) {
                    setFetchingProducts(false);
                }
            }
        };

        const fetchWaybill = async (business_id) => {

            try {
                const collectionRef = collection(database, "waybills");
                const matchField = authData?.account_type === "Merchant" ? 
                    "merchant_business_id" : 
                    "logistics_business_id";

                queryStartDateTime.setHours(1, 0, 0, 1); // set start date hours

                queryEndDateTime.setHours(23, 59, 59, 999); // set end date hours
        
                console.log("Start Date:", queryStartDateTime);
                console.log("End Date:", queryEndDateTime);
                console.log("");
        
                let q = query(
                    collectionRef,
                    where(matchField, "==", business_id),
                    where("edited_at", ">", queryStartDateTime),
                    where("edited_at", "<", queryEndDateTime),
                    orderBy("edited_at", "desc")
                );
        
                const unsubscribe = onSnapshot(q, async (querySnapshot) => {
                    try {
                        const waybillDocs = querySnapshot.docs;
                        if (waybillDocs === 0) {
                            // if no result, disable fetching states
                            setFetchingBusiness(false);
                            setFetchingProducts(false);
                        }
                        const promises = waybillDocs.map(async (doc, index) => {
                            try {
                                const waybillData = doc.data();
                                const merchantProductIdArray = waybillData.merchant_products_id;
                                const quantityArray = waybillData.quantity;
                            
                                const businessPromise = await fetchBusiness(
                                    authData?.account_type === "Merchant" ? 
                                    waybillData.logistics_business_id : 
                                    waybillData.merchant_business_id,
                                    waybillDocs.length, // Pass size
                                    index // Pass index
                                );
                            
                                const productsPromise = await fetchProducts(
                                    merchantProductIdArray, 
                                    quantityArray,
                                    waybillDocs.length, // Pass size
                                    index // Pass index
                                );
                            
                                return Promise.all([businessPromise, productsPromise])
                                    .then(([business, products]) => {
                                        const productsListed = products.map(product => {
                                            return `${product.product_name} \u00D7 ${product.quantity}`;
                                        }).join(", ");
                            
                                        const waybillItem = {
                                            id: doc.id,
                                            banner_image: business.banner_image,
                                            business_name: business.business_name,
                                            chat_id: waybillData.chat_id,
                                            is_increment: waybillData.is_increment,
                                            logistics_business_id: waybillData.logistics_business_id,
                                            merchant_business_id: waybillData.merchant_business_id,
                                            status: waybillData.status,
                                            verified: business.verified,
                                            products: productsListed,
                                            products_array: products,
                                            created_at: waybillData.created_at,
                                            quantity: quantityArray,
                                        };
                                        return waybillItem;
                                    }).catch((error) => {
                                        console.log("fetchWaybill Error: ", error.message);
                                        throw error;
                                    });
                            } catch (error) {
                                console.log("fetchWaybill Error: ", error.message);
                                throw error;
                            }
                        });
                        
                        const waybillList = await Promise.all(promises);
                        
                        setWaybills(waybillList);

                        
                    } catch (error) {
                        console.log("fetchWaybillSnapshot Error: ", error.message);
                        throw error;                      
                    } 
                });

                // disable page loading state
                if (!fetchingBusiness && !fetchingProducts) {
                    setPageLoading(false);
                    setFetchingWaybills(false)
                }

                return unsubscribe;
            } catch (error) {
                console.log("fetchWaybill Error: ", error.message);
                setToast({
                    text: error.message,
                    visible: true,
                    type: "error",
                });  
            } 
        };
        
        // fetch waybill
        const unsubscribePromise = fetchWaybill(authData?.business_id);

        // Cleanup function to unsubscribe from snapshot listener
        return () => {
            // Unsubscribe from snapshot listener once unsubscribePromise is resolved
            unsubscribePromise.then(unsubscribe => {
                if (unsubscribe) {
                    unsubscribe();
                }
            });
        };

    }, [queryEndDateTime, queryEndDateTime]);
    
    // get outgoing waybill
    const outgoingWaybill = useMemo(() => {
        const incrementCondition = authData?.account_type === "Merchant";
        return waybills.filter(waybill => waybill.is_increment === incrementCondition);
    }, [waybills]);

    // get incoming waybill
    const incomingWaybill = useMemo(() => {
        const incrementCondition = authData?.account_type === "Logistics";
        return waybills.filter(waybill => waybill.is_increment === incrementCondition);
    }, [waybills]);

    // filter incoming waybill bottom sheet parameters
    const [incomingFilter, setIncomingFilter] = useState([]);

    // filter outcoming waybill bottom sheet parameters
    const [outgoingFilter, setOutgoingFilter] = useState([]);

    // get filtervlaue
    const getFilterValue = (title) => {
        // if bottomsheets open, return search filter value
        if (bottomSheet.opened) {
            return searchFilter?.find(filterParam => filterParam?.title === title)?.value
        }
        // if tab is incoming return incoming filter value
        if (tab === "incoming") {
            return incomingFilter?.find(filterParam => filterParam?.title === title)?.value
        }
        // else for outgoing filter value
        return outgoingFilter?.find(filterParam => filterParam?.title === title)?.value
    }

    // if incoming waybill changes, get parameters for outgoing filter
    useEffect(() => {
        // return all unique business_id and business_names from incoming waybill
        const uniqueBusinesses = incomingWaybill.reduce((unique, waybill) => {
            const key = authData?.account_type === "Merchant" ? waybill.logistics_business_id : waybill.merchant_business_id;
            if (!unique.some(obj => obj.business_id === key)) {
                unique.push({
                    business_id: key,
                    business_name: waybill.business_name
                });
            }
            return unique;
        }, []);

        // unique products
        const uniqueProducts = [...new Map(incomingWaybill.flatMap(waybill => waybill.products_array.map(product => [`${product.product_name}_${product.id}`, product])))
        .values()];

        const statusFilter = {
            title: "Status",
            value: "All",
            default: true,
            buttons: [
                {
                    text: "All",
                    selected: true,
                    onPress: () => {
                        handleFilterParameters("Status", "All", "incoming")
                    }
                },
                {
                    text: "Pending",
                    selected: false,
                    onPress: () => {
                        handleFilterParameters("Status", "Pending", "incoming")
                    }
                },
                {
                    text: "Delivered",
                    selected: false,
                    onPress: () => {
                        handleFilterParameters("Status", "Delivered", "incoming")
                    }
                },
            ],
        };

        // target business account to be filtered
        const targetBusiness = authData?.account_type !== "Merchant" ? "Merchant" : "Logistics";

        // business filter
        const businessFilter = {
            title: targetBusiness,
            value: "All",
            default: true,
            buttons: [
                {
                    text: "All",
                    selected: true,
                    onPress: () => {
                        handleFilterParameters(targetBusiness, "All", "incoming")
                    }
                },
                ...uniqueBusinesses?.map(business => {
                    return {
                        text: business.business_name,
                        selected: false,
                        onPress: () => {
                            handleFilterParameters(targetBusiness, business.business_name, "incoming")
                        }
                    }
                }),
            ]
        }

        // products filter
        const productsFilter = {
            title: "Products",
            value: "All",
            default: true,
            buttons: [
                {
                    text: "All",
                    selected: true,
                    onPress: () => {
                        handleFilterParameters("Products", "All", "incoming")
                    }
                },
                ...uniqueProducts?.map(product => {
                    return {
                        text: product.product_name,
                        selected: false,
                        onPress: () => {
                            handleFilterParameters("Products", product.product_name, "incoming")
                        }
                    }
                }),
            ]
        }

        // period filter
        const periodFilter = {
            title: "Period",
            value: "Today",
            default: true,
            buttons: [
                {
                    text: "Today",
                    selected: true,
                    onPress: () => {
                        handleFilterParameters("Period", "Today", "incoming")
                    }
                },
                {
                    text: "Yesterday",
                    selected: false,
                    onPress: () => {
                        handleFilterParameters("Period", "Yesterday", "incoming")
                    }
                },
                {
                    text: "Current Week",
                    selected: false,
                    onPress: () => {
                        handleFilterParameters("Period", "Current Week", "incoming")
                    }
                },
                {
                    text: "Last Week",
                    selected: false,
                    onPress: () => {
                        handleFilterParameters("Period", "Last Week", "incoming")
                    }
                },
                
                {
                    text: "Current Month",
                    selected: false,
                    onPress: () => {
                        handleFilterParameters("Period", "Current Month", "incoming")
                    }
                },
                {
                    text: "Last Month",
                    selected: false,
                    onPress: () => {
                        handleFilterParameters("Period", "Last Month", "incoming")
                    }
                },
                {
                    text: "Custom period",
                    selected: false,
                    onPress: () => {
                        handleFilterParameters("Period", "Custom Period", "incoming")
                    }
                },
            ]
        }

        // set incoming filter
        setIncomingFilter((prevFilter) => {
            let filterArray = [statusFilter];
            // if there are more than 1 businesses
            if (uniqueBusinesses.length > 1) {
                filterArray.push(businessFilter);
            }
            // if there are more than 1 products
            if (uniqueProducts.length > 1) {
                filterArray.push(productsFilter);
            }
            // push period filter 
            filterArray.push(periodFilter);

            // target business for filter
            const targetBusiness = authData?.account_type !== "Merchant" ? "Merchant" : "Logistics";
            // prev status value
            const prevStatusValue = prevFilter.find(filterParam => filterParam?.title === "Status")?.value;
            // prev business value
            const prevBusinessValue = prevFilter.find(filterParam => filterParam?.title === targetBusiness)?.value;
            // prev products value
            const prevProductsValue = prevFilter.find(filterParam => filterParam?.title === "Products")?.value;
            // prev period value
            const prevPeriodValue = prevFilter.find(filterParam => filterParam?.title === "Period")?.value;

            // return filter array
            return filterArray.map(filterParam => {
                // handle status filter
                if (filterParam?.title === "Status") {
                    return {
                        ...filterParam,
                        default: ["All", undefined].includes(prevStatusValue) ? true : false,
                        value: ["All", undefined].includes(prevStatusValue) ? "All" : prevStatusValue,
                        buttons: filterParam.buttons.map(button => {
                            if (button.text === prevStatusValue) {
                                return {
                                    ...button,
                                    selected: true,
                                }
                            } else if (button.text === "All"){
                                return {
                                    ...button,
                                    selected: ["All", undefined].includes(prevStatusValue),
                                }
                            }
                            return {
                                ...button,
                                selected: false,
                            }
                        })
                    }
                }

                // handle business filter
                if (filterParam?.title === targetBusiness) {
                    return {
                        ...filterParam,
                        default: !["All", undefined].includes(prevBusinessValue) ? false : true,
                        value:["All", undefined].includes(prevBusinessValue) ? prevBusinessValue : "All",
                        buttons: filterParam.buttons.some(button => button.text === prevBusinessValue) ? filterParam.buttons.map(button => {
                            if (button.text === prevBusinessValue) {
                                return {
                                    ...button,
                                    selected: true,
                                }
                            } else if (button.text === "All"){
                                return {
                                    ...button,
                                    selected: ["All", undefined].includes(prevBusinessValue),
                                }
                            }
                            return {
                                ...button,
                                selected: false,
                            }
                        }) : [
                            ...filterParam.buttons.map(button => {
                                if (button.text === "All"){
                                    return {
                                        ...button,
                                        selected: prevBusinessValue === undefined,
                                    }
                                }
                                return {
                                    ...button,
                                    selected: false,
                                }                            
                            }),
                            prevBusinessValue !== undefined && {
                                text: prevBusinessValue,
                                selected: true,
                                onPress: () => {
                                    handleFilterParameters(targetBusiness, prevBusinessValue, "incoming")
                                }
                            },
                        ],
                    }
                }

                // handle products filter
                if (filterParam?.title === "Products") {
                    return {
                        ...filterParam,
                        default: !["All", undefined].includes(prevProductsValue) ? false : true,
                        value: !["All", undefined].includes(prevProductsValue) ? prevProductsValue : "All",
                        buttons: filterParam.buttons.some(button => button.text === prevProductsValue) ? filterParam.buttons.map(button => {
                            if (button.text === prevProductsValue) {
                                return {
                                    ...button,
                                    selected: true,
                                }
                            } else if (button.text === "All"){
                                return {
                                    ...button,
                                    selected: ["All", undefined].includes(prevProductsValue),
                                }
                            }
                            return {
                                ...button,
                                selected: false,
                            }
                        }) : [
                            ...filterParam.buttons.map(button => {
                                if (button.text === "All"){
                                    return {
                                        ...button,
                                        selected: prevProductsValue === undefined,
                                    }
                                }
                                return {
                                    ...button,
                                    selected: false,
                                }                            
                            }),
                            prevProductsValue !== undefined && {
                                text: prevProductsValue,
                                selected: true,
                                onPress: () => {
                                    handleFilterParameters("Products", prevProductsValue, "incoming")
                                }
                            },
                        ],
                    }
                }

                // handle period filter
                if (filterParam?.title === "Period") {
                    return {
                        ...filterParam,
                        default: !["Today", undefined].includes(prevPeriodValue) ? false : true,
                        value: !["Today", undefined].includes(prevPeriodValue) ? prevPeriodValue : "Today",
                        buttons: filterParam.buttons.map(button => {
                            if (button.text === prevPeriodValue) {
                                return {
                                    ...button,
                                    selected: true,
                                }
                            } else if (button.text === "All"){
                                return {
                                    ...button,
                                    selected: ["All", undefined].includes(prevPeriodValue),
                                }
                            }
                            return {
                                ...button,
                                selected: false,
                            }
                        })
                    }
                }

                return filterParam;
            });
        });
        
    }, [incomingWaybill])

    // if outgoing waybill changes, get parameters for imcoming filter
    useEffect(() => {
        // return all unique business_id and business_names from incoming waybill
        // unique businesses
        const uniqueBusinesses = outgoingWaybill.reduce((unique, waybill) => {
            const key = authData?.account_type === "Merchant" ? waybill.logistics_business_id : waybill.merchant_business_id;
            if (!unique.some(obj => obj.business_id === key)) {
                unique.push({
                    business_id: key,
                    business_name: waybill.business_name
                });
            }
            return unique;
        }, []);

        // unique products
        const uniqueProducts = [...new Map(outgoingWaybill.flatMap(waybill => waybill.products_array.map(product => [`${product.product_name}_${product.id}`, product])))
        .values()];

        // status filter parameters
        const statusFilter = {
            title: "Status",
            value: "All",
            default: true,
            buttons: [
                {
                    text: "All",
                    selected: true,
                    onPress: () => {
                        handleFilterParameters("Status", "All", "outgoing")
                    }
                },
                {
                    text: "Pending",
                    selected: false,
                    onPress: () => {
                        handleFilterParameters("Status", "Pending", "outgoing")
                    }
                },
                {
                    text: "Delivered",
                    selected: false,
                    onPress: () => {
                        handleFilterParameters("Status", "Delivered", "outgoing")
                    }
                },
            ],
        };

        // target business account to be filtered
        const targetBusiness = authData?.account_type !== "Merchant" ? "Merchant" : "Logistics";

        // business filter parameters
        const businessFilter = {
            title: targetBusiness,
            value: "All",
            default: true,
            buttons: [
                {
                    text: "All",
                    selected: true,
                    onPress: () => {
                        handleFilterParameters(targetBusiness, "All", "outgoing")
                    }
                },
                ...uniqueBusinesses?.map(business => {
                    return {
                        text: business.business_name,
                        selected: false,
                        onPress: () => {
                            handleFilterParameters(targetBusiness, business.business_name, "outgoing")
                        }
                    }
                }),
            ]
        }

        // products filter parameters
        const productsFilter = {
            title: "Products",
            value: "All",
            default: true,
            buttons: [
                {
                    text: "All",
                    selected: true,
                    onPress: () => {
                        handleFilterParameters("Products", "All", "outgoing")
                    }
                },
                ...uniqueProducts?.map(product => {
                    return {
                        text: product.product_name,
                        selected: false,
                        onPress: () => {
                            handleFilterParameters("Products", product.product_name, "outgoing")
                        }
                    }
                }),
            ]
        }

        // period filter parameters
        const periodFilter = {
            title: "Period",
            value: "Today",
            default: true,
            buttons: [
                {
                    text: "Today",
                    selected: true,
                    onPress: () => {
                        handleFilterParameters("Period", "Today", "outgoing")
                    }
                },
                {
                    text: "Yesterday",
                    selected: false,
                    onPress: () => {
                        handleFilterParameters("Period", "Yesterday", "outgoing")
                    }
                },
                {
                    text: "Current Week",
                    selected: false,
                    onPress: () => {
                        handleFilterParameters("Period", "Current Week", "outgoing")
                    }
                },
                {
                    text: "Last Week",
                    selected: false,
                    onPress: () => {
                        handleFilterParameters("Period", "Last Week", "outgoing")
                    }
                },
                {
                    text: "Current Month",
                    selected: false,
                    onPress: () => {
                        handleFilterParameters("Period", "Current Month", "outgoing")
                    }
                },
                {
                    text: "Last Month",
                    selected: false,
                    onPress: () => {
                        handleFilterParameters("Period", "Last Month", "outgoing")
                    }
                },
                {
                    text: "Custom Period",
                    selected: false,
                    onPress: () => {
                        handleFilterParameters("Period", "Custom Period", "outgoing")
                    }
                },
            ]
        }

        // set outgoing filter
        setOutgoingFilter((prevFilter) => {
            let filterArray = [statusFilter];

            // if there are more than 1 businesses
            if (uniqueBusinesses.length > 1) {
                filterArray.push(businessFilter);
            }

            // if there are more than 1 products
            if (uniqueProducts.length > 1) {
                filterArray.push(productsFilter);
            };

            // push period filter
            filterArray.push(periodFilter)

            // target business for filter
            const targetBusiness = authData?.account_type !== "Merchant" ? "Merchant" : "Logistics";

            // prev status value
            const prevStatusValue = prevFilter.find(filterParam => filterParam?.title === "Status")?.value;
            // prev business value
            const prevBusinessValue = prevFilter.find(filterParam => filterParam?.title === targetBusiness)?.value;
            // prev products value
            const prevProductsValue = prevFilter.find(filterParam => filterParam?.title === "Products")?.value;
            // prev period value
            const prevPeriodValue = prevFilter.find(filterParam => filterParam?.title === "Period")?.value;


            return filterArray.map(filterParam => {
                // handle status filter
                if (filterParam?.title === "Status") {
                    return {
                        ...filterParam,
                        default: ["All", undefined].includes(prevStatusValue) ? true : false,
                        value: ["All", undefined].includes(prevStatusValue) ? "All" : prevStatusValue,
                        buttons: filterParam.buttons.map(button => {
                            if (button.text === prevStatusValue) {
                                return {
                                    ...button,
                                    selected: true,
                                }
                            } else if (button.text === "All"){
                                return {
                                    ...button,
                                    selected: ["All", undefined].includes(prevStatusValue),
                                }
                            }
                            return {
                                ...button,
                                selected: false,
                            }
                        })
                    }
                }

                // handle business filter
                if (filterParam?.title === targetBusiness) {
                    return {
                        ...filterParam,
                        default: !["All", undefined].includes(prevBusinessValue) ? false : true,
                        value:["All", undefined].includes(prevBusinessValue) ? prevBusinessValue : "All",
                        buttons: filterParam.buttons.some(button => button.text === prevBusinessValue) ? filterParam.buttons.map(button => {
                            if (button.text === prevBusinessValue) {
                                return {
                                    ...button,
                                    selected: true,
                                }
                            } else if (button.text === "All"){
                                return {
                                    ...button,
                                    selected: ["All", undefined].includes(prevBusinessValue),
                                }
                            }
                            return {
                                ...button,
                                selected: false,
                            }
                        }) : [
                            ...filterParam.buttons.map(button => {
                                if (button.text === "All"){
                                    return {
                                        ...button,
                                        selected: prevBusinessValue === undefined,
                                    }
                                }
                                return {
                                    ...button,
                                    selected: false,
                                }                            
                            }),
                            prevBusinessValue !== undefined && {
                                text: prevBusinessValue,
                                selected: true,
                                onPress: () => {
                                    handleFilterParameters(targetBusiness, prevBusinessValue, "outgoing")
                                }
                            },
                        ],
                    }
                }

                // handle products filter
                if (filterParam?.title === "Products") {
                    return {
                        ...filterParam,
                        default: !["All", undefined].includes(prevProductsValue) ? false : true,
                        value: !["All", undefined].includes(prevProductsValue) ? prevProductsValue : "All",
                        buttons: filterParam.buttons.some(button => button.text === prevProductsValue) ? filterParam.buttons.map(button => {
                            if (button.text === prevProductsValue) {
                                return {
                                    ...button,
                                    selected: true,
                                }
                            } else if (button.text === "All"){
                                return {
                                    ...button,
                                    selected: ["All", undefined].includes(prevProductsValue),
                                }
                            }
                            return {
                                ...button,
                                selected: false,
                            }
                        }) : [
                            ...filterParam.buttons.map(button => {
                                if (button.text === "All"){
                                    return {
                                        ...button,
                                        selected: prevProductsValue === undefined,
                                    }
                                }
                                return {
                                    ...button,
                                    selected: false,
                                }                            
                            }),
                            prevProductsValue !== undefined && {
                                text: prevProductsValue,
                                selected: true,
                                onPress: () => {
                                    handleFilterParameters("Products", prevProductsValue, "outgoing")
                                }
                            },
                        ],
                    }
                }

                // handle period filter
                if (filterParam?.title === "Period") {
                    return {
                        ...filterParam,
                        default: !["Today", undefined].includes(prevPeriodValue) ? false : true,
                        value: !["Today", undefined].includes(prevPeriodValue) ? prevPeriodValue : "Today",
                        buttons: filterParam.buttons.map(button => {
                            if (button.text === prevPeriodValue) {
                                return {
                                    ...button,
                                    selected: true,
                                }
                            } else if (button.text === "All"){
                                return {
                                    ...button,
                                    selected: ["All", undefined].includes(prevPeriodValue),
                                }
                            }
                            return {
                                ...button,
                                selected: false,
                            }
                        })
                    }
                }

                return filterParam;
            });
        })
        
    }, [outgoingWaybill])

    // rendered data in flatlist component
    const renderData = useMemo(() => {
        // target business account to be filtered
        const targetBusiness = authData?.account_type !== "Merchant" ? "Merchant" : "Logistics";
        const targetFilter = tab === "outgoing" ? outgoingFilter : incomingFilter;
        const targetWaybill = tab === "outgoing" ? outgoingWaybill : incomingWaybill;
        
        // period filter value
        const periodFilterValue = getFilterValue("Period", tab);
        if (periodFilterValue !== previousPeriodFilter.current || startDate !== queryStartDateTime || endDate !== queryEndDateTime) {
            previousPeriodFilter.current = periodFilterValue;
        }

        // if target filter has a result
        if (targetFilter.length !== 0) {
            // query time was altered, indicated fetching waybill
            if (targetFilter?.find(item => item.title === "Period")?.default !== true) {
    
                let start;
                let end;
    
                if (periodFilterValue === "Yesterday") {
                    start = moment().subtract(1, 'days').startOf('day');
                    end = moment().subtract(1, 'days').endOf('day');
                } else if (periodFilterValue === "Current Week") {
                    start = moment().startOf('week');
                    end = moment().endOf('week');
                } else if (periodFilterValue === "Last Week") {
                    start = moment().startOf('week').subtract(1, 'week');
                    end = moment().endOf('week').subtract(1, 'week');
                } else if (periodFilterValue === "Current Month") {
                    start = moment().startOf('month');
                    end = moment().endOf('month');
                } else if (periodFilterValue === "Last Month") {
                    start = moment().subtract(1, 'month').startOf('month');
                    end = moment().subtract(1, 'month').endOf('month');
                } else if (periodFilterValue === "Custom Period") {
                    start = startDate;
                    end = endDate;
                }
    
                start = new Date(start)
                start.setHours(1, 0, 0, 1);
    
                end = new Date(end)
                end.setHours(23, 59, 59, 999);
    
                setStartDate(start);
                setEndDate(end);
    
                setQueryStartDateTime(start);
                setQueryEndDateTime(end);
    
            } else {
                
                // set calender sheet date input
                setStartDate(() => {
                    const start = new Date();
                    start.setHours(1, 0, 0, 1);
                    return start;
                });
                setEndDate(() => {
                    const end = new Date();
                    end.setHours(23, 59, 59, 999);
                    return end;
                });
    
                // set query datetime
                setQueryStartDateTime(() => {
                    const start = new Date();
                    start.setHours(1, 0, 0, 1);
                    return start;
                });
                setQueryEndDateTime(() => {
                    const end = new Date();
                    end.setHours(23, 59, 59, 999);
                    return end;
                });
            }
        }

        // if no filter parameter is set
        if (targetFilter?.every(item => item?.default)) {
            return [
                {id: "sticky"},
                ...targetWaybill,
            ]
        }

        // business filter value
        const businessFilterValue = getFilterValue(targetBusiness, tab);
        // status filter value
        const statusFilterValue = getFilterValue("Status", tab);
        // status filter value
        const productsFilterValue = getFilterValue("Products", tab);
        // filtered waybill
        const filteredWaybill = targetWaybill.filter(waybill => {
            // filter matched
            const filterMatch = []; // store array of boolean of matches
            // filter by business
            if (businessFilterValue !== "All" && businessFilterValue) {
                if (waybill.business_name !== businessFilterValue) {
                    // if no match push false
                    filterMatch.push(false);
                } else filterMatch.push(true); // else push true
            }
            // filter by status
            if (statusFilterValue !== "All" && statusFilterValue) {
                if (waybill.status !== statusFilterValue) {
                    filterMatch.push(false); // if no match push false
                } else filterMatch.push(true); // else push true
            }
            // filter by products
            if (productsFilterValue !== "All" && productsFilterValue) {
                if (!waybill.products_array.some(product => product.product_name === productsFilterValue)) {
                    filterMatch.push(false); // if no match push false
                } else filterMatch.push(true); // else push true
            }

            // return match
            return !filterMatch.includes(false);
        })

        // if (!fetchingBusiness && !fetchingProducts) setFetchingWaybills(false);

        // return filtered data
        return [
            {id: "sticky"},
            ...filteredWaybill,
        ];
    }, [tab, incomingWaybill, outgoingWaybill, incomingFilter, outgoingFilter]);

    // stata array
    const stats = useMemo(() => {

        // total outgoing quantity
        const totalOutgoingQuantity =outgoingWaybill.reduce((totalSum, obj) => {
            // Calculate the sum of quantities in the current object and add it to the total sum
            const sumOfCurrentQuantity = obj.quantity.reduce((subtotal, quantity) => subtotal + quantity, 0);
            return totalSum + sumOfCurrentQuantity;
        }, 0);

        // total incoming quantity
        const totalIncomingQuantity =incomingWaybill.reduce((totalSum, obj) => {
            // Calculate the sum of quantities in the current object and add it to the total sum
            const sumOfCurrentQuantity = obj.quantity.reduce((subtotal, quantity) => subtotal + quantity, 0);
            return totalSum + sumOfCurrentQuantity;
        }, 0);

        return [
            {
                id: 1,
                title: "Total Outgoing Waybill",
                presentValue: outgoingWaybill?.length,
                oldValue: 0,
                decimal: false,
                unit: "",
                unitPosition: "start",
            },
            {
                id: 3,
                title: "Total Incoming Waybill",
                presentValue: incomingWaybill?.length,
                oldValue: 0,
                decimal: false,
                unit: "",
                unitPosition: "end",
            },
            {
                id: 2,
                title: "Total Outgoing Quantity",
                presentValue: totalOutgoingQuantity,
                oldValue: 0,
                decimal: false,
                unit: "",
                unitPosition: "end",
            },
            {
                id: 4,
                title: "Total Incoming Quantity",
                presentValue: totalIncomingQuantity,
                oldValue: 0,
                decimal: false,
                unit: "",
                unitPosition: "end",
            },
        ];
    }, [outgoingWaybill, incomingWaybill]);
    
    const [calendar, setCalendar] = useState({
        setDate: setStartDate,
        maxDate: false,
        minDate: false,
    });

    const openCalendar = (inputType) => {
        handleFilterParameters("Period", "Custom Period", tab);
        if (inputType === "StartDate") {
            setActiveStartDate(true);
            setCalendar({
                setDate: setStartDate,
                startPoint: true,
                maxDate: today,
                minDate: false,
            });
        } else {
            setActiveEndDate(true);
            setCalendar({
                setDate: setEndDate,
                startPoint: false,
                maxDate: today,
                minDate: startDate,
            });
        }
        calendarSheetRef.current?.present();
    }

    const closeCalendar = () => {
        setActiveEndDate(false);
        setActiveStartDate(false);
        calendarSheetRef.current?.close();
    }

    // disable active calendar inputs
    useEffect(() => {
        if (!calendarSheetOpen) {
            setActiveEndDate(false);
            setActiveStartDate(false);
        }
    }, [calendarSheetOpen])

    // open modal function
    const openModal = () => {
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

        // update bottomsheet global state
        setBottomSheet(prevState => {
            return {
                ...prevState,
                opened: false,
            }
        });
    };

    // function to get number of unread messages
    const getNumberOfUnreadMessages = (inventory_action) => {
        if (inventory_action === "increment") {
            return 0;
            // return waybillList.filter(waybill => waybill.newMessage && waybill.inventory_action === "increment").length
        } else if (inventory_action === "decrement") {
            // return waybillList.filter(waybill => waybill.newMessage && waybill.inventory_action === "decrement").length
            return 0;
        }
    }

    // sticky header offset
    const stickyHeaderOffset = useRef(0);

    // scroll height
    const [scrollHeight, setScrollHeight] = useState(0);

    // animated shadow when scroll height reaches sticky header
    const animateHeaderOnScroll = (e) => {
        setScrollHeight(e.nativeEvent.contentOffset.y)
    }

    // open filter function
    const openFilter = () => {
        // dismmis keyboard
        Keyboard.dismiss();

        // open filtr botomsheet
        filterSheetRef.current?.present()

        // update filter bottomsheet global state
        setFilterBottomSheet(prevState => {
            return {
                ...prevState,
                opened: true,
            }
        });
    }
    
    const closeFilter = () => {
        // close filter bottomsheet
        filterSheetRef.current?.close();

        // update filter bottomsheet global state
        setFilterBottomSheet(prevState => {
            return {
                ...prevState,
                opened: false,
            }
        });
    }

    // function to apply filter
    const handleApplyFilter = (filterType) => {
        if (filterType === "incoming") {
            setIncomingFilter(prevParamters => {
                return prevParamters.map(filterParam => {
                    const selectedButton = filterParam.buttons.filter(button => button.selected === true);
                    if (filterParam.title  !== "Period") {
                        return {
                            ...filterParam,
                            value: selectedButton[0].text,
                            default: selectedButton[0].text === "All" ? true : false, 
                        }
                    } else {

                        // if a period filter was applied, set fetching data states
                        if (selectedButton[0].text !== "Today") {
                            setFetchingWaybills(true);
                            setFetchingBusiness(true);
                            setFetchingProducts(true);
                        }

                        // return period filter parameters
                        return {
                            ...filterParam,
                            value: selectedButton[0].text,
                            default: selectedButton[0].text === "Today" ? true : false, 
                        }
                    }
                })
            });
        } else if (filterType === "outgoing") {
            setOutgoingFilter(prevParamters => {
                return prevParamters.map(filterParam => {
                    const selectedButton = filterParam.buttons.filter(button => button.selected === true);
                    if (filterParam.title  !== "Period") {
                        return {
                            ...filterParam,
                            value: selectedButton[0].text,
                            default: selectedButton[0].text === "All" ? true : false, 
                        }
                    } else {

                        // if a period filter was applied, set fetching data states
                        if (selectedButton[0].text !== "Today") {
                            setFetchingWaybills(true);
                            setFetchingBusiness(true);
                            setFetchingProducts(true);
                        }

                        // return period filter parameters
                        return {
                            ...filterParam,
                            value: selectedButton[0].text,
                            default: selectedButton[0].text === "Today" ? true : false, 
                        }
                    }
                })
            });
        } else if (filterType === "search") {
            setSearchFilter(prevParamters => {
                return prevParamters.map(filterParam => {
                    const selectedButton = filterParam.buttons.filter(button => button.selected === true);
                    if (filterParam.title  !== "Period") {
                        return {
                            ...filterParam,
                            value: selectedButton[0].text,
                            default: selectedButton[0].text === "All" ? true : false, 
                        }
                    } else {
                        return {
                            ...filterParam,
                            value: selectedButton[0].text,
                            default: selectedButton[0].text === "Today" ? true : false, 
                        }
                    }
                })
            });
        }

        closeFilter(); // pass true to not reset filter
    }

    // function to set filter parameter, runc on click an action button in filter bottomsheet
    const handleFilterParameters = (title, button, filterType) => {

        if (filterType === "incoming") {
            setIncomingFilter(prevParamters => {
                return prevParamters.map(filterParam => {
                    if (filterParam.title === title) {
                        return {
                            ...filterParam,
                            buttons: filterParam.buttons.map(filterButton => {
                                if (filterButton.text === button) {
                                    return {
                                        ...filterButton,
                                        selected: true,
                                    }
                                } else {
                                    return {
                                        ...filterButton,
                                        selected: false,
                                    }
                                }
                            }),
                        }
                    } else {
                        return {...filterParam}
                    }
                })
            });
        } else if (filterType === "outgoing") {
            setOutgoingFilter(prevParamters => {
                return prevParamters.map(filterParam => {
                    if (filterParam.title === title) {
                        return {
                            ...filterParam,
                            buttons: filterParam.buttons.map(filterButton => {
                                if (filterButton.text === button) {
                                    return {
                                        ...filterButton,
                                        selected: true,
                                    }
                                } else {
                                    return {
                                        ...filterButton,
                                        selected: false,
                                    }
                                }
                            }),
                        }
                    } else {
                        return {...filterParam}
                    }
                })
            });
            
        } else if (filterType === "search") {
            setSearchFilter(prevParamters => {
                return prevParamters.map(filterParam => {
                    if (filterParam.title === title) {
                        return {
                            ...filterParam,
                            buttons: filterParam.buttons.map(filterButton => {
                                if (filterButton.text === button) {
                                    return {
                                        ...filterButton,
                                        selected: true,
                                    }
                                } else {
                                    return {
                                        ...filterButton,
                                        selected: false,
                                    }
                                }
                            }),
                        }
                    } else {
                        return {...filterParam}
                    }
                })
            });
        }

    }
    
    // function to remove filter
    const handleRemoveFilter = (title) => {
        // bottoms sheet is open so set search ilter
        if (bottomSheet.opened) {
            return setSearchFilter(prevParamters => {
                return prevParamters.map(filterParam => {
                    if (filterParam.title === title) {
                        return {
                            ...filterParam,
                            default: true,
                            value: title === "Period" ? "Today" : "All",
                            buttons: filterParam.buttons.map(filterButton => {
                                if (filterButton.text === "All") {
                                    return {
                                        ...filterButton,
                                        selected: true,
                                    }
                                } else {
                                    return {
                                        ...filterButton,
                                        selected: false,
                                    }
                                }
                            }),
                        }
                    } else {
                        return {...filterParam}
                    }
                })
            });
        }

        // if its a period filter being removed
        if (title === "Period") {
            // set all loading state as true
            setFetchingWaybills(true);
            setFetchingBusiness(true);
            setFetchingProducts(true);
        }

        // tab is incoming
        if (tab === "incoming") {
            return setIncomingFilter(prevParamters => {
                return prevParamters.map(filterParam => {
                    if (filterParam.title === title) {
                        return {
                            ...filterParam,
                            default: true,
                            value: title === "Period" ? "Today" : "All",
                            buttons: filterParam.buttons.map(filterButton => {
                                if (filterButton.text === "All") {
                                    return {
                                        ...filterButton,
                                        selected: true,
                                    }
                                } else {
                                    return {
                                        ...filterButton,
                                        selected: false,
                                    }
                                }
                            }),
                        }
                    } else {
                        return {...filterParam}
                    }
                })
            });
        }
        // else outgoing tab
        return setOutgoingFilter(prevParamters => {
            return prevParamters.map(filterParam => {
                if (filterParam.title === title) {
                    return {
                        ...filterParam,
                        default: true,
                        value: title === "Period" ? "Today" : "All",
                        buttons: filterParam.buttons.map(filterButton => {
                            if (filterButton.text === "All") {
                                return {
                                    ...filterButton,
                                    selected: true,
                                }
                            } else {
                                return {
                                    ...filterButton,
                                    selected: false,
                                }
                            }
                        }),
                    }
                } else {
                    return {...filterParam}
                }
            })
        });
    }

    // function to clearAll fiter
    const handleClearAllFilter = () => {
        // clear all filter
        handleRemoveFilter("Period");
        handleRemoveFilter("Status");
        handleRemoveFilter("Logistics");
        handleRemoveFilter("Merchant");
        // close filter bottomsheet
        closeFilter();
    }

    // filter order bottom sheet parameters
    const [searchFilter, setSearchFilter] = useState([
        {
            title: "Status",
            value: "All",
            default: true,
            buttons: [
                {
                    text: "All",
                    selected: true,
                    onPress: () => {
                        handleFilterParameters("Status", "All", "search")
                    }
                },
                {
                    text: "Pending",
                    selected: false,
                    onPress: () => {
                        handleFilterParameters("Status", "Pending", "search")
                    }
                },
                {
                    text: "Delivered",
                    selected: false,
                    onPress: () => {
                        handleFilterParameters("Status", "Delivered", "search")
                    }
                },
            ],
        },
        {
            title: "Logistics",
            value: "All",
            default: true,
            buttons: [
                {
                    text: "All",
                    selected: true,
                    onPress: () => {
                        handleFilterParameters("Logistics", "All", "search")
                    }
                },
                {
                    text: "Komitex",
                    selected: false,
                    onPress: () => {
                        handleFilterParameters("Logistics", "Komitex", "search")
                    }
                },
                {
                    text: "Fedex",
                    selected: false,
                    onPress: () => {
                        handleFilterParameters("Logistics", "Fedex", "search")
                    }
                },
                {
                    text: "DHL",
                    selected: false,
                    onPress: () => {
                        handleFilterParameters("Logistics", "DHL", "search")
                    }
                },
                {
                    text: "UPS",
                    selected: false,
                    onPress: () => {
                        handleFilterParameters("Logistics", "UPS", "search")
                    }
                },
            ]
        },
        {
            title: "Period",
            value: "Today",
            default: true,
            buttons: [
                {
                    text: "Today",
                    selected: true,
                    onPress: () => {
                        handleFilterParameters("Period", "Today", "search")
                    }
                },
                {
                    text: "Yesterday",
                    selected: false,
                    onPress: () => {
                        handleFilterParameters("Period", "Yesterday", "search")
                    }
                },
                {
                    text: "Current week",
                    selected: false,
                    onPress: () => {
                        handleFilterParameters("Period", "Current week", "search")
                    }
                },
                {
                    text: "Last week",
                    selected: false,
                    onPress: () => {
                        handleFilterParameters("Period", "Last week", "search")
                    }
                },
                {
                    text: "Custom period",
                    selected: false,
                    onPress: () => {
                        handleFilterParameters("Period", "Custom period", "search")
                        openCalendar("StartDate");
                    }
                },
                {
                    text: "Current month",
                    selected: false,
                    onPress: () => {
                        handleFilterParameters("Period", "Current month", "search")
                    }
                },
                {
                    text: "Last month",
                    selected: false,
                    onPress: () => {
                        handleFilterParameters("Period", "Last month", "search")
                    }
                },
            ]
        }
    ]);

    return (<>
        {/* header component */}
        {!pageLoading ? <>
            {/* fixed header */}
            <Header
                navigation={navigation}
                stackName={"Waybill"}
                removeBackArrow={true}
                backgroundColor={background}
                // icon={<MenuIcon />}
                // iconFunction={() => {}}
            />
            {/* screen content */}
            <TouchableWithoutFeedback>
                <FlatList 
                    onScroll={animateHeaderOnScroll}
                    showsVerticalScrollIndicator={false}
                    stickyHeaderIndices={[1]}
                    ListHeaderComponent={
                        <View 
                            style={style.headerWrapper}
                            onLayout={e => {
                                stickyHeaderOffset.current = e.nativeEvent.layout.height;
                                // where 57 is the height of the Header component
                            }}
                        >
                            {/* stats */}
                            <StatWrapper>
                                {stats.map(stat => (
                                    <StatCard
                                        key={stat.id}
                                        title={stat.title}
                                        presentValue={stat.presentValue}
                                        oldValue={stat.oldValue}
                                        decimal={stat.decimal}
                                        unit={stat.unit}
                                        unitPosition={stat.unitPosition}
                                        isLoading={fetchingBusiness || fetchingWaybills || fetchingProducts} 
                                    />
                                ))}
                            </StatWrapper>
                            {/* onPress navigate to send waybill page */}
                            <CustomButton
                                secondaryButton={true}
                                name={"Send Waybill"}
                                shrinkWrapper={true}
                                onPress={() => navigation.navigate("SendWaybill")}
                                unpadded={true}
                                wrapperStyle={{marginTop: 22, marginBottom: 20}}
                            />
                        </View>
                    }
                    contentContainerStyle={style.contentContainer}
                    style={style.container}
                    keyExtractor={item => item.id}
                    data={renderData}
                    renderItem={({ item, index }) => {
                        if (item.id === "sticky") {
                            return (<>
                                <View 
                                    style={[
                                        style.stickyHeader,
                                        scrollHeight > stickyHeaderOffset.current && style.shadow,
                                    ]}
                                >
                                    <View style={style.recentOrderHeading}>
                                        <Text style={style.recentOrderHeadingText}>Recent Waybills</Text>
                                        <View style={style.actionWrapper}>
                                            {/* trigger search modal */}
                                            <TouchableOpacity 
                                                style={style.menuIcon}
                                                onPress={openModal}
                                            >
                                                <SearchIcon />
                                            </TouchableOpacity>
                                            {/* trigger filter modal */}
                                            <OpenFilterButton
                                                onPress={openFilter}
                                                filterParams={tab === "outgoing" ? outgoingFilter : incomingFilter}
                                            />
                                        </View>
                                    </View>
                                    {/* page tabs */}
                                    <View 
                                        style={[
                                            style.tabContainer,
                                            {flexDirection: authData?.account_type === "Merchant" ? 
                                                "row" : // for merchant show outgoing tab first
                                                "row-reverse" // for logistics show incoming tab first
                                            },
                                        ]}
                                    >
                                        <TouchableOpacity 
                                            style={tab === "outgoing" ? style.tabButtonSelected : style.tabButton}
                                            onPress={() => setTab("outgoing")}
                                        >
                                            <Text style={tab === "outgoing" ? style.tabButtonTextSelected : style.tabButtonText} >Outgoing</Text>
                                            <Badge number={getNumberOfUnreadMessages(authData?.account_type === "Merchant" ? "increment" : "decrement")} />
                                        </TouchableOpacity>
                                        <TouchableOpacity 
                                            style={tab === "incoming" ? style.tabButtonSelected : style.tabButton}
                                            onPress={() => setTab("incoming")}
                                        >
                                            <Text style={tab === "incoming" ? style.tabButtonTextSelected : style.tabButtonText} >Incoming</Text>
                                            <Badge number={getNumberOfUnreadMessages(authData?.account_type === "Merchant" ? "decrement" : "increment")} />
                                        </TouchableOpacity>
                                    </View>
                                    {/* check if any filter has been applied, i.e it is not in its default value */}
                                    {tab === "outgoing" && outgoingFilter.find(filterParam => filterParam.default === false) && (
                                        <View style={style.filterPillWrapper}>
                                            {outgoingFilter.map(filterParam => {
                                                if (!filterParam.default) {
                                                    if (filterParam.value !== "Custom Period") {
                                                        return (
                                                            <FilterPill
                                                                key={filterParam.title}
                                                                text={filterParam.value}
                                                                onPress={() => handleRemoveFilter(filterParam.title)}
                                                                background={white}
                                                            />
                                                        )
                                                    }
                                                    return (
                                                        <FilterPill
                                                            key={filterParam.title}
                                                            text={moment(queryStartDateTime)?.format('DD MMM, YYYY') + " - " + moment(queryEndDateTime)?.format('DD MMM, YYYY')}
                                                            onPress={() => handleRemoveFilter(filterParam.title)}
                                                            background={white}
                                                        />
                                                    )
                                                }
                                            })}
                                        </View>
                                    )}

                                    {/* check if any filter has been applied, i.e it is not in its default value */}
                                    {tab === "incoming" && incomingFilter.find(filterParam => filterParam.default === false) && (
                                        <View style={style.filterPillWrapper}>
                                            {incomingFilter.map(filterParam => {
                                                if (!filterParam.default) {
                                                    if (filterParam.value !== "Custom Period") {
                                                        return (
                                                            <FilterPill
                                                                key={filterParam.title}
                                                                text={filterParam.value}
                                                                onPress={() => handleRemoveFilter(filterParam.title)}
                                                                background={white}
                                                            />
                                                        )
                                                    }
                                                    return (
                                                        <FilterPill
                                                            key={filterParam.title}
                                                            text={moment(queryStartDateTime)?.format('DD MMM, YYYY') + " - " + moment(queryEndDateTime)?.format('DD MMM, YYYY')}
                                                            onPress={() => handleRemoveFilter(filterParam.title)}
                                                            background={white}
                                                        />
                                                    )
                                                }
                                            })}
                                        </View>
                                    )}
                                </View>
                            </>)
                        } else {
                            // return list if user isn't fetching results
                            return !fetchingWaybills && !fetchingBusiness && !fetchingProducts && (
                                <View style={style.waybillListWrapper}>
                                    <WaybillListItem 
                                        lastWaybill={index === renderData.length - 1}
                                        firstWaybill={index === 1}
                                        bannerImage={item?.banner_image}
                                        businesName={item?.business_name}
                                        status={item?.status}
                                        products={item?.products}
                                        newMessage={item?.new_message}
                                        createdAt={item?.created_at}
                                        onPress={() => navigation.navigate("Chat", {
                                            chatId: item?.chat_id,
                                            chatType: "Waybill",
                                            isIncrement: item?.is_increment,
                                            bannerImage: item?.banner_image,
                                            businessName: item?.business_name,
                                            verified: item?.verified
                                        })}
                                    />
                                </View>
                            ) 
                        }
                    }}
                    ListFooterComponent={<>
                        {renderData.length === 1 && (
                            <View style={style.emptyOrderWrapper}>
                                <SendOrderIcon />
                                <Text style={style.emptyOrderHeading}>No Active Waybill</Text>
                                <Text style={style.emptyOrderParagraph}>
                                    {(() => {
                                        if (tab === "incoming") {
                                            if (authData?.account_type === "Merchant") return "Waybills returned by your logistics partners would appear here"
                                            return "Waybills sent to you by your Merchants would appear here"
                                        } else {
                                            if (authData?.account_type !== "Merchant") return "Waybills returned to your Merchants would appear here"
                                            return "Waybills you send to your logistics partners would appear here"
                                        }
                                    })()}
                                    
                                </Text>
                            </View>
                        )}
                        {renderData.length !== 1 && ( fetchingWaybills || fetchingBusiness || fetchingProducts )&& (
                            <View style={style.orderList}>
                                <Skeleton 
                                    height={50}
                                    width={windowWidth - 60}
                                    shimmerColors={shimmerColorArray}
                                    style={{borderRadius: 2}}
                                />
                                <Skeleton 
                                    height={50}
                                    width={windowWidth - 60}
                                    shimmerColors={shimmerColorArray}
                                    style={{borderRadius: 2}}
                                />
                                <Skeleton 
                                    height={50}
                                    width={windowWidth - 60}
                                    shimmerColors={shimmerColorArray}
                                    style={{borderRadius: 2}}
                                />
                                <Skeleton 
                                    height={50}
                                    width={windowWidth - 60}
                                    shimmerColors={shimmerColorArray}
                                    style={{borderRadius: 2}}
                                />
                                <Skeleton 
                                    height={50}
                                    width={windowWidth - 60}
                                    shimmerColors={shimmerColorArray}
                                    style={{borderRadius: 2}}
                                />
                                <Skeleton 
                                    height={50}
                                    width={windowWidth - 60}
                                    shimmerColors={shimmerColorArray}
                                    style={{borderRadius: 2}}
                                />
                            </View>
                        )}
                    </>}
                />
            </TouchableWithoutFeedback>
        </> : <WaybillSkeleton />}
        {/* bottomsheet */}
        <CustomBottomSheet 
            sheetRef={sheetRef}
            sheetTitle={"Waybills"}
            closeModal={closeModal}
            snapPointsArray={["100%"]}
        >
            {/* {modal.modalContent} */}
            <SearchBar 
                placeholder={"Search Waybill"}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                backgroundColor={background}
                openFilter={openFilter}
                filterParams={searchFilter}
            />
            {/* check if any filter has been applied, i.e it is not in its default value */}
            {searchFilter.find(filterParam => filterParam.default === false) && (
                <View style={style.searchOrderPillWrapper}>
                    {searchFilter.map(filterParam => {
                        if (!filterParam.default) {
                            if (filterParam.value !== "Custom period") {
                                return (
                                    <FilterPill
                                        key={filterParam.title}
                                        text={filterParam.value}
                                        onPress={() => handleRemoveFilter(filterParam.title, "search")}
                                        background={background}
                                    />
                                )
                            }
                        }
                    })}
                </View>
            )}
            <BottomSheetScrollView showsVerticalScrollIndicator={false} style={style.orderSearchResults}>
                {/* {searchedWaybill.map((item, index) => (
                    <WaybillListItem 
                        key={item.id}
                        item={item}
                        index={index}
                        lastWaybill={searchedWaybill.length - 1}
                        firstWaybill={0}
                        searchQuery={searchQuery}
                        sideFunctions={closeModal}
                    />
                ))} */}
            </BottomSheetScrollView>
        </CustomBottomSheet>
        {/* filter bottom sheet */}
        <FilterBottomSheet 
            height={606}
            closeFilter={closeFilter}
            fiterSheetRef={filterSheetRef}
            clearFilterFunction={handleClearAllFilter}
            applyFilterFunction={() => {
                if (bottomSheet.opened) {
                    return handleApplyFilter("search");
                }
                return tab === "incoming" ? handleApplyFilter("incoming") : handleApplyFilter("outgoing") 
            }}
        >
            {!bottomSheet.opened && tab === "incoming" && incomingFilter.map(item => (
                <FilterButtonGroup
                    title={item.title}
                    key={item.title}
                >
                    {/* filter button list */}
                    {item.buttons.map((button, index) => (
                        // filter button
                        <ActionButton
                            key={item.title + button.text + index}
                            name={button.text}
                            removeBottomMargin={true}
                            selected={button.selected}
                            onPress={()  => handleFilterParameters(item.title, button.text, tab)}
                        />
                    ))}
                </FilterButtonGroup>
            ))}

            {!bottomSheet.opened && tab === "outgoing" && outgoingFilter.map(item => (
                <FilterButtonGroup
                    title={item.title}
                    key={item.title}
                >
                    {/* filter button list */}
                    {item.buttons.map((button, index) => (
                        // filter button
                        <ActionButton
                            key={item.title + button.text + index}
                            name={button.text}
                            removeBottomMargin={true}
                            selected={button.selected}
                            onPress={()  => handleFilterParameters(item.title, button.text, tab)}
                        />
                    ))}
                </FilterButtonGroup>
            ))}

            {bottomSheet.opened && searchFilter.map(item => (
                <FilterButtonGroup
                    title={item.title}
                    key={item.title}
                >
                    {/* filter button list */}
                    {item.buttons.map(button => (
                        // filter button
                        <ActionButton
                            key={button.text}
                            name={button.text}
                            removeBottomMargin={true}
                            selected={button.selected}
                            onPress={()  => handleFilterParameters(item.title, button.text, "search")}
                        />
                    ))}
                </FilterButtonGroup>
            ))}
            
            <View style={style.inputContainer}>
                {/* Start date */}
                <SelectInput 
                    label={"Start Date"} 
                    placeholder={"DD MMMM, YYYY"} 
                    value={startDate}
                    onPress={() => openCalendar("StartDate")}
                    icon={<CalendarIcon />}
                    active={activeStartDate}
                    inputFor={"Date"}
                />

                {/* End date */}
                <SelectInput
                    label={"End Date"}
                    placeholder={"DD MMMM, YYYY"}
                    value={endDate}
                    onPress={() => openCalendar("EndDate")}
                    icon={<CalendarIcon />}
                    active={activeEndDate}
                    inputFor={"Date"}
                />
            </View>
        </FilterBottomSheet>
        {/* calnedar */}
        <CalendarSheet 
            calendarRef={calendarSheetRef} 
            closeCalendar={closeCalendar}
            disableActionButtons={true}
            snapPointsArray={["60%"]}
            minDate={calendar.minDate}
            maxDate={calendar.maxDate}
            setDate={calendar.setDate}
        />
    </>);
}

const style = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        backgroundColor: background,
    },
    contentContainer: {
        paddingBottom: 90,
        minHeight: windowHeight + 173,
    },
    headerWrapper: {
        width: "100%",
        paddingHorizontal: 20,
    },
    menuIcon: {
        width: 24,
        height: 24,
        backgroundColor: white,
        borderRadius: 6,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    sendOrderButton: {
        height: 44,
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: 'center',
        backgroundColor: secondaryColor,
        borderRadius: 12,
        marginVertical: 22,
    },
    orderButtonText: {
        fontFamily: "mulish-semibold",
        fontSize: 16,
        color: primaryColor,
    },
    stickyHeader: {
        backgroundColor: background,
        shadowColor: blackOut,
        // elevation: 2,
        paddingHorizontal: 20,
    },
    shadow: {
        elevation: 2,
    },
    waybillListWrapper: {
        paddingHorizontal: 20,
    },
    recentOrderHeading: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        height: 24,
        marginTop: 10,
        marginBottom: 20,
    },
    recentOrderHeadingText: {
        fontFamily: "mulish-bold",
        color: bodyText,
        fontSize: 12,
    },
    actionWrapper: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
    },
    modalContent: {
        display: "flex",
        flexDirection: 'column',
        alignItems: "center",
        justifyContent: "flex-start",
        width: "100%",
        flex: 1,
    },
    tabContainer: {
        width: "100%",
        display: "flex",
        flexDirection: 'row',
        height: 32,
        marginBottom: 20,
        alignItems: "center",
        justifyContent: "space-between",
    },
    tabButton: {
        width: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: '100%',
        flexDirection: "row",
        gap: 10,
    },
    tabButtonSelected: {
        width: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: '100%',
        borderBottomWidth: 2,
        borderBottomColor: primaryColor,
        flexDirection: "row",
        gap: 10,
    },
    tabButtonText: {
        fontFamily: 'mulish-semibold',
        fontSize: 14,
        color: neutral,
    },
    tabButtonTextSelected: {
        fontFamily: 'mulish-semibold',
        fontSize: 14,
        color: black,
    },
    searchOrderPillWrapper: {
        width: '100%',
        display: "flex",
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: "center",
        justifyContent: "flex-start",
        gap: 8,
        marginBottom: 14,
        marginTop: -4,
    },
    filterPillWrapper: {
        width: '100%',
        display: "flex",
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: "center",
        justifyContent: "flex-start",
        gap: 8,
        marginBottom: 14,
        marginTop: -4,
    },
    inputContainer: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: 20,
        paddingEnd: 20,
        paddingBottom: 90,
    },
    emptyOrderWrapper: {
        height: 150,
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        flexDirection: 'column',
    },
    emptyOrderHeading: {
        color: black,
        fontSize: 14,
        fontFamily: 'mulish-semibold',
        marginTop: 12,
        marginBottom: 8,
    },
    emptyOrderParagraph: {
        color: bodyText,
        fontSize: 12,
        fontFamily: 'mulish-regular',
        width: 178,
        textAlign: 'center',
    },
    orderList: {
        width: "100%",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 30,
    }
})
 
export default Waybill;