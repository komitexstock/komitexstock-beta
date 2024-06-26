// react native components
import { 
    View, 
    Text, 
    FlatList, 
    TouchableOpacity, 
    TouchableWithoutFeedback,
    StyleSheet,
    Animated,
    Keyboard
} from "react-native";
// react hooks
import { useState, useRef, useEffect } from "react";
// icons
import SearchIcon from '../assets/icons/SearchIcon'
import VerifiedIcon from "../assets/icons/VerifiedIcon";
// colors
import { background, black, bodyText, primaryColor, subText, white } from "../style/colors";
// components
import StatWrapper from "../components/StatWrapper";
import StatCard from "../components/StatCard";
import CustomBottomSheet from "../components/CustomBottomSheet";
import SearchBar from "../components/SearchBar";
import ProductCard from "../components/ProductCard";
import ProductListItem from "../components/ProductListItem";
import Header from "../components/Header";
import FilterBottomSheet from "../components/FilterBottomSheet";
import FilterButtonGroup from "../components/FilterButtonGroup";
import FilterPill from "../components/FilterPill";
import Avatar from "../components/Avatar";
import OpenFilterButton from "../components/OpenFilterButton";
// bottomsheet component
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
// helpers
import { windowHeight } from "../utils/helpers";
// skeleton screen
import ProductsSkeleton from "../skeletons/ProductsSkeleton";
// globals
import { useGlobals } from "../context/AppContext";
// auth data
import { useAuth } from "../context/AuthContext";


const Products = ({navigation, route}) => {

    // business details
    const { business_id, business_name, verified } = route?.params || {};

    // auth data
    const { authData } = useAuth();

    // sheet ref
    const sheetRef = useRef(null);
    const filterSheetRef = useRef(null);

    // bottomsheet ref
    const {
        setBottomSheet,
        setFilterBottomSheet,
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

    // stats array
    const stats = [
        {
            id: 1,
            title: "Total Products",
            presentValue: 6,
            oldValue: 4,
            decimal: false,
        },
        {
            id: 2,
            title: "Total Items",
            presentValue: 26,
            oldValue: 15,
            decimal: false,
        },
        {
            id: 3,
            title: "Items out of Stock",
            presentValue: 1,
            oldValue: 1,
            decimal: false,
        },
        {
            id: 4,
            title: "Items with Low Stock",
            presentValue: 3,
            oldValue: 4,
            decimal: false,
        },
    ];

    // list of products
    const productsList = [
        {
            id: 1,
            product_name: "Maybach Sunglasses",
            quantity: 7,
            price: 20000,
            imageUrl: 'https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/products%2Fmaybach-sunglasses.jpg?alt=media&token=95200745-ada8-4787-9779-9d00c56a18a5',
            onPress: () => handleEditProduct(1),
        },
        {
            id: 2,
            product_name: "Accurate Watch",
            quantity: 3,
            price: 33000,
            imageUrl: 'https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/products%2Faccurate-watch.png?alt=media&token=4330bcd1-e843-434c-97cb-bf84c49b82b0',
            onPress: () => handleEditProduct(2),
        },
        {
            id: 3,
            product_name: "Black Sketchers",
            quantity: 0,
            price: 35000,
            imageUrl: 'https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/products%2Fblack-sketchers.png?alt=media&token=a07e02ac-610d-4da0-9527-2b6e9e85d56d',
            onPress: () => handleEditProduct(3),
        },
        {
            id: 4,
            product_name: "Brown Clarks",
            quantity: 11,
            price: 40000,
            imageUrl: 'https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/products%2FClarks.jpg?alt=media&token=70431e2c-fbcd-4e1c-9cf3-3d35861f98d3',
            onPress: () => handleEditProduct(4),
        },
        {
            id: 5,
            product_name: "Pheonix Sneakers",
            quantity: 2,
            price: 25000,
            imageUrl: 'https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/products%2Fsneakers.png?alt=media&token=fbb14f47-c2b7-4d2a-b54a-8485ccf7a648',
            onPress: () => handleEditProduct(5),
        },
        {
            id: 6,
            product_name: "Perfectly Useless Morning Watch",
            quantity: 9,
            price: 32000,
            imageUrl: 'https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/products%2Fperfectly-useless-mornig-watch.png?alt=media&token=edb35f3a-deb6-498b-9c94-d9392745442c',
            onPress: () => handleEditProduct(6),
        },
        {
            id: 7,
            product_name: "Ricochet Watch",
            quantity: 15,
            price: 30000,
            imageUrl: 'https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/products%2Fricochet-watch.png?alt=media&token=fbf05657-e511-4d1f-a0db-3b9419d4ba5a',
            onPress: () => handleEditProduct(7),
        },
        {
            id: 9,
            product_name: "Timberland",
            quantity: 10,
            price: 35000,
            imageUrl: 'https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/products%2FTimberland.jpg?alt=media&token=29480738-8990-45c9-9b74-b2d24c0fa722',
            onPress: () => handleEditProduct(9),
        },
        {
            id: 10,
            product_name: "Useless Afternoon Watch",
            quantity: 19,
            price: 32000,
            imageUrl: 'https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/products%2Fuseless-afternoon-watch.png?alt=media&token=42f68679-4627-4846-a37e-87a1ff4a2a66',
            onPress: () => handleEditProduct(10),
        },
    ];

    const [products, setProducts] = useState([
        {id: "stickyLeft"},
        {id: "stickyRight"},
        ...productsList,
    ]);

    useEffect(() => {
        setTimeout(() => {
            setPageLoading(false);
        }, 500);
    })

    // state to indicate loading state
    const [pageLoading, setPageLoading] = useState(true);

    const [searchedProducts, setSearchedProducts] = useState([]);

    // state to store search query
    const [searchQuery, setSearchQuery] = useState("");

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

    const handleEditProduct = (id) => {
        // console.log("right here");

        const selectedProduct = products.find(product => product.id === id);

        // product Scope, variable to control whether a product is being viewed
        // accross multiple logistics or across a single logistics with multiple warehouses
        const productScope = "Warehouses";

        navigation.navigate("EditProduct", {
            id: selectedProduct.id,
            product_name: selectedProduct.product_name,
            initial_price: selectedProduct.price,
            quantity: selectedProduct.quantity,
            image_uri: selectedProduct.imageUrl,
            product_scope: productScope,
        });

    }

    // sticky header offset
    const stickyHeaderOffset = useRef(0);

    const shadowElevation = useRef(new Animated.Value(0)).current;

    // animated shadow when scroll height reaches sticky header
    const animateHeaderOnScroll = (e) => {
        // console.log(stickyHeaderOffset.current);
        const yOffset = e.nativeEvent.contentOffset.y;
        // console.log(yOffset);
        Animated.timing(shadowElevation, {
            toValue: yOffset > stickyHeaderOffset.current ? 3 : 0,
            duration: 200,
            useNativeDriver: false,
        }).start();
    }

    // filter state
    const [filterType, setFilterType] = useState("products")

    // open filter function
    const openFilter = (type) => {
        // dismmis keyboard
        Keyboard.dismiss();

        // set filter type
        setFilterType(type);

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
        if (filterType !== "search") {
            setFilterParameters(prevParamters => {
                return prevParamters.map(filterParam => {
                    const selectedButton = filterParam.buttons.filter(button => button.selected === true);
                    // console.log(selectedButton);
                    return {
                        ...filterParam,
                        value: selectedButton[0].text,
                        default: selectedButton[0].text === "All" ? true : false, 
                    }
                })
            });
        } else {
            setSearchFilterParameters(prevParamters => {
                return prevParamters.map(filterParam => {
                    const selectedButton = filterParam.buttons.filter(button => button.selected === true);
                    // console.log(selectedButton);
                    return {
                        ...filterParam,
                        value: selectedButton[0].text,
                        default: selectedButton[0].text === "All" ? true : false, 
                    }
                })
            });
        }

        closeFilter(); // pass true to not reset filter
    }

    const handleFilterParameters = (title, button, filterType) => {
        if (filterType !== "search") {
            setFilterParameters(prevParamters => {
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
        } else {
            setSearchFilterParameters(prevParamters => {
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
    
    const handleRemoveFilter = (title, filterType) => {
        if (filterType !== "search") {
            setFilterParameters(prevParamters => {
                return prevParamters.map(filterParam => {
                    if (filterParam.title === title) {
                        return {
                            ...filterParam,
                            default: true,
                            value: "All",
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
        } else {
            setSearchFilterParameters(prevParamters => {
                return prevParamters.map(filterParam => {
                    if (filterParam.title === title) {
                        return {
                            ...filterParam,
                            default: true,
                            value: "All",
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
    }

    // function to clearAll fiter
    const handleClearAllFilter = (filterType) => {
        if (filterType !== "search") {
            // clear all filter
            handleRemoveFilter("Period");
            handleRemoveFilter("Status");
            handleRemoveFilter("Logistics");
        } else {
            // clear all filter
            handleRemoveFilter("Period", "search");
            handleRemoveFilter("Status", "search");
            handleRemoveFilter("Logistics", "search");
        }
        // close filter bottomsheet
        closeFilter();
    };

    // filter order bottom sheet parameters
    const [filterParameters, setFilterParameters] = useState([
        {
            title: "Warehouse",
            value: "All",
            default: true,
            buttons: [
                {
                    text: "All",
                    selected: true,
                    onPress: () => {
                        handleFilterParameters("Warehouse", "All")
                    }
                },
                {
                    text: "Warri",
                    selected: false,
                    onPress: () => {
                        handleFilterParameters("Warehouse", "Warri")
                    }
                },
                {
                    text: "Asaba",
                    selected: false,
                    onPress: () => {
                        handleFilterParameters("Warehouse", "Asaba")
                    }
                },
                {
                    text: "Benin",
                    selected: false,
                    onPress: () => {
                        handleFilterParameters("Warehouse", "Benin")
                    }
                },
                {
                    text: "Sapele",
                    selected: false,
                    onPress: () => {
                        handleFilterParameters("Warehouse", "Sapele")
                    }
                },
                {
                    text: "Abraka",
                    selected: false,
                    onPress: () => {
                        handleFilterParameters("Warehouse", "Abraka")
                    }
                },
            ]
        },
        {
            title: "Quantity",
            value: "All",
            default: true,
            buttons: [
                {
                    text: "All",
                    selected: true,
                    onPress: () => {
                        handleFilterParameters("Quantity", "All")
                    }
                },
                {
                    text: "Healthy stock",
                    selected: false,
                    onPress: () => {
                        handleFilterParameters("Quantity", "Healthy stock")
                    }
                },
                {
                    text: "Low stock",
                    selected: false,
                    onPress: () => {
                        handleFilterParameters("Quantity", "Low stock")
                    }
                },
                {
                    text: "Empty stock",
                    selected: false,
                    onPress: () => {
                        handleFilterParameters("Quantity", "Empty stock")
                    }
                },
            ]
        },
        {
            title: "Activity",
            value: "All",
            default: true,
            buttons: [
                {
                    text: "All",
                    selected: true,
                    onPress: () => {
                        handleFilterParameters("Activity", "All")
                    }
                },
                {
                    text: "Active products",
                    selected: false,
                    onPress: () => {
                        handleFilterParameters("Activity", "Active products")
                    }
                },
                {
                    text: "Dormant products",
                    selected: false,
                    onPress: () => {
                        handleFilterParameters("Activity", "Dormant products")
                    }
                },
            ]
        },
    ]);

    // filter order bottom sheet parameters
    const [searchFilterParameters, setSearchFilterParameters] = useState([
        {
            title: "Warehouse",
            value: "All",
            default: true,
            buttons: [
                {
                    text: "All",
                    selected: true,
                    onPress: () => {
                        handleFilterParameters("Warehouse", "All", "search")
                    }
                },
                {
                    text: "Warri",
                    selected: false,
                    onPress: () => {
                        handleFilterParameters("Warehouse", "Warri", "search")
                    }
                },
                {
                    text: "Asaba",
                    selected: false,
                    onPress: () => {
                        handleFilterParameters("Warehouse", "Asaba", "search")
                    }
                },
                {
                    text: "Benin",
                    selected: false,
                    onPress: () => {
                        handleFilterParameters("Warehouse", "Benin", "search")
                    }
                },
                {
                    text: "Sapele",
                    selected: false,
                    onPress: () => {
                        handleFilterParameters("Warehouse", "Sapele", "search")
                    }
                },
                {
                    text: "Abraka",
                    selected: false,
                    onPress: () => {
                        handleFilterParameters("Warehouse", "Abraka", "search")
                    }
                },
            ]
        },
        {
            title: "Quantity",
            value: "All",
            default: true,
            buttons: [
                {
                    text: "All",
                    selected: true,
                    onPress: () => {
                        handleFilterParameters("Quantity", "All", "search")
                    }
                },
                {
                    text: "Healthy stock",
                    selected: false,
                    onPress: () => {
                        handleFilterParameters("Quantity", "Healthy stock", "search")
                    }
                },
                {
                    text: "Low stock",
                    selected: false,
                    onPress: () => {
                        handleFilterParameters("Quantity", "Low stock", "search")
                    }
                },
                {
                    text: "Empty stock",
                    selected: false,
                    onPress: () => {
                        handleFilterParameters("Quantity", "Empty stock", "search")
                    }
                },
            ]
        },
        {
            title: "Activity",
            value: "All",
            default: true,
            buttons: [
                {
                    text: "All",
                    selected: true,
                    onPress: () => {
                        handleFilterParameters("Activity", "All", "search")
                    }
                },
                {
                    text: "Active products",
                    selected: false,
                    onPress: () => {
                        handleFilterParameters("Activity", "Active products", "search")
                    }
                },
                {
                    text: "Dormant products",
                    selected: false,
                    onPress: () => {
                        handleFilterParameters("Activity", "Dormant products", "search")
                    }
                },
            ]
        },
    ]);


    // get filtervlaue
    const getFilterValue = (title, filterType) => {
        if (filterType !== "search") {
            return filterParameters.find(filterParam => filterParam.title === title).value
        } else {
            return searchFilterParameters.find(filterParam => filterParam.title === title).value
        }
    }

    useEffect(() => {
        if (searchQuery === '') {
            return setSearchedProducts([]);
        }

        const searchResult = productsList.filter(product => {
            return product.product_name.toLowerCase().includes(searchQuery.toLowerCase());
        });

        setSearchedProducts(searchResult);

    }, [searchQuery])

    // render Products page
    return (<>
        {!pageLoading ? <>
            {/* header */}
            <Header 
                navigation={navigation}
                stackName={ authData.account_type === "Merchant" && (
                    <View style={style.header}>
                        <Text style={style.headerText}>{business_name}</Text>
                        { verified && <VerifiedIcon /> }
                    </View>
                )}
                removeBackArrow={true}
                inlineArrow={true}
                component={true}
                backgroundColor={background}
            />
            {/* Merchant Banner */}
            {authData.account_type !== "Merchant" && (
                <View style={style.warehouseBannerWrapper}>
                    <View style={style.warehouseBanner}>
                        <Avatar 
                            fullname={"Abiodun Johnson"}
                            imageUrl={'../assets/images/style_bazaar.png'}
                            smallerSize={true}
                        />
                        <View style={style.managerText}>
                            <View style={style.merchantBusinessNameWrapper}>
                                <Text style={style.merchantBusinessName}>
                                    Style Bazaar
                                </Text>
                                <VerifiedIcon />
                            </View>
                            <Text style={style.merchantFullname}>
                                Jon Snow
                            </Text>
                        </View>
                    </View>
                </View>
            )}
            <TouchableWithoutFeedback style={{flex: 1}}>
                <FlatList
                    onScroll={animateHeaderOnScroll}
                    showsVerticalScrollIndicator={false}
                    stickyHeaderIndices={[1]}
                    // list header component
                    ListHeaderComponent={
                        <View 
                            style={style.headerWrapper}
                            onLayout={e => {
                                stickyHeaderOffset.current = e.nativeEvent.layout.height + 57;
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
                                    />
                                ))}
                            </StatWrapper>
                        </View>
                    }
                    contentContainerStyle={style.contentContainer}
                    columnWrapperStyle={products.length !== 0 ? style.listContainer : null}
                    style={style.listWrapper}
                    keyExtractor={item => item.id}
                    data={products}
                    // render items in two rows if theres data, else one row
                    numColumns={products.length !== 0 ? 2 : 1}
                    renderItem={({ item, index }) => {
                        if (item.id === "stickyLeft") {
                            return (
                                <Animated.View 
                                    style={[
                                        style.recentOrderHeading,
                                        {elevation: shadowElevation}
                                    ]}
                                >
                                    <View style={style.headingWrapper}>
                                        <Text style={style.recentOrderHeadingText}>Products</Text>
                                        <View style={style.iconsContainer}>
                                            {/* open bottomsheet search modal */}
                                            <TouchableOpacity 
                                                style={style.menuIcon}
                                                onPress={openModal}
                                            >
                                                <SearchIcon />
                                            </TouchableOpacity>
                                            {/* open bottomsheet filter modal */}
                                            <OpenFilterButton
                                                onPress={() => {openFilter("products")}}
                                                filterParams={filterParameters}
                                            />
                                        </View>
                                    </View>
                                    {filterParameters.find(filterParam => filterParam.default === false) && (
                                        <View style={style.filterPillWrapper}>
                                            {filterParameters.map(filterParam => {
                                                if (!filterParam.default) {
                                                    if (filterParam.value !== "Custom period") {
                                                        return (
                                                            <FilterPill
                                                                key={filterParam.title}
                                                                text={filterParam.value}
                                                                onPress={() => handleRemoveFilter(filterParam.title)}
                                                                background={white}
                                                            />
                                                        )
                                                    }
                                                }
                                            })}
                                        </View>
                                    )}
                                </Animated.View>
                            )
                        } else if (item.id === "stickyRight") {
                            return (
                                <></>   
                            )
                        } else {
                            return (
                                <View 
                                    style={[
                                        index % 2 === 0 && style.productCardWrapperLeft,
                                        index % 2 === 1 && style.productCardWrapperRight,
                                    ]}
                                >
                                    {/* Product card */}
                                    <ProductCard
                                        product_name={item.product_name}
                                        quantity={item.quantity}
                                        price={item.price}
                                        imageUrl={item.imageUrl}
                                        onPress={item.onPress}
                                    />
                                </View>
                            )
                        }
                    }}
                />
            </TouchableWithoutFeedback>
        </> : <ProductsSkeleton />}
        {/* search products bottomsheet */}
        <CustomBottomSheet 
            sheetRef={sheetRef}
            closeModal={closeModal}
            snapPointsArray={["100%"]}
            sheetTitle={"Products"}
        >
            <SearchBar 
                placeholder={"Search prodcuts"}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                backgroundColor={background}
                openFilter={() => openFilter("search")}
                filterParams={searchFilterParameters}
            />
            
            {searchFilterParameters.find(filterParam => filterParam.default === false) && (
                <View style={style.searchFilterPillWrapper}>
                    {searchFilterParameters.map(filterParam => {
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
            <BottomSheetScrollView 
                showsVerticalScrollIndicator={false} 
                style={style.orderSearchResults}
            >
                {searchedProducts.map(item => (
                    <ProductListItem 
                        key={item.id}
                        product_name={item.product_name}
                        quantity={item.quantity}
                        price={item.price}
                        imageUrl={item.imageUrl}
                        onPress={item.onPress}
                        searchQuery={searchQuery}
                    />
                ))}
            </BottomSheetScrollView>

        </CustomBottomSheet>
        {/* filter bottom sheet */}
        <FilterBottomSheet 
            height={450}
            closeFilter={closeFilter}
            fiterSheetRef={filterSheetRef}
            clearFilterFunction={handleClearAllFilter}
            applyFilterFunction={filterType === "search" ? 
                () => handleApplyFilter("search") : 
                handleApplyFilter
            }
        >
            {filterType === "products" && filterParameters.map(item => (
                <FilterButtonGroup
                    buttons={item.buttons}
                    title={item.title}
                    key={item.title}
                />
            ))}

            {filterType === "search" && searchFilterParameters.map(item => (
                <FilterButtonGroup
                    buttons={item.buttons}
                    title={item.title}
                    key={item.title}
                />
            ))}
        </FilterBottomSheet>
    </>);
}

// stylesheet
const style = StyleSheet.create({
    contentContainer: {
        minHeight: windowHeight - 70,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    listWrapper: {
        width: "100%",
        height: "100%",
        marginBottom: 70,
        backgroundColor: background,
    },
    listContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-between",
        marginBottom: 16,
    },
    headerWrapper: {
        width: "100%",
        paddingBottom: 30,
        paddingHorizontal: 20,
    },
    header: {
        display: "flex",
        justifyContent: 'flex-start',
        alignItems: "center",
        flexDirection: "row",
        width: '100%',
        gap: 4,
    },
    headerText: {
        fontFamily: "mulish-bold",
        fontSize: 20,
        color: black,
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
    warehouseBannerWrapper: {
        backgroundColor: background,
        paddingBottom: 16,
    },
    warehouseBanner: {
        height: 63,
        width: "100%",
        backgroundColor: white,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 12,
        gap: 8,
    },
    managerText: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        gap: 4,
    },
    merchantFullname: {
        color: subText,
        fontSize: 10,
        fontFamily: 'mulish-medium',
        marginBottom: 4,
    },
    merchantBusinessNameWrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: 15,
        gap: 2,
    },
    merchantBusinessName: {
        color: black,
        fontSize: 12,
        fontFamily: 'mulish-semibold',
    },

    orderButtonText: {
        fontFamily: "mulish-semibold",
        fontSize: 16,
        color: primaryColor,
    },
    recentOrderHeading: {
        paddingHorizontal: 20,
        width: '100%',
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        marginBottom: -16,
        paddingBottom: 10,
        backgroundColor: background,
    },
    filterPillWrapper: {
        width: '100%',
        display: "flex",
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: "center",
        justifyContent: "flex-start",
        gap: 8,
    },
    searchFilterPillWrapper: {
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
    headingWrapper: {
        width: "100%",
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center",
        height: 24,
        marginBottom: 10,
    },
    recentOrderHeadingText: {
        fontFamily: "mulish-bold",
        color: bodyText,
        fontSize: 12,
    },
    emptyView: {
        display: 'none',
    },
    iconsContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
        gap: 10,
        height: 24,
    },
    productCardWrapperLeft: {
        width: "50%",
        paddingRight: 8,
        paddingLeft: 20,
    },
    productCardWrapperRight: {
        width: "50%",
        paddingRight: 20,
        paddingLeft: 8,
    },
    modalContent: {
        display: "flex",
        flexDirection: 'column',
        alignItems: "center",
        justifyContent: "flex-start",
        width: "100%",
        flex: 1,
    },
    noProductsContainer: {
        width: "100%",
        alignSelf: 'auto',
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        gap: 16,
        minHeight: "50%",
        paddingHorizontal: 20,
    },
    noProductTextWrapper: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        marginBottom: 14,
    },
    noProductHeading: {
        marginTop: 12,
        fontFamily: 'mulish-bold',
        fontSize: 16,
        textAlign: 'center',
        color: black,
    },
    noProductParagraph: {
        width: "80%",
        fontFamily: 'mulish-regular',
        fontSize: 10,
        color: bodyText,
        textAlign: 'center',
    }
})
 
export default Products;