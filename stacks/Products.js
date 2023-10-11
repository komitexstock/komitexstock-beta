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
import MenuIcon from "../assets/icons/MenuIcon";
import SearchIcon from '../assets/icons/SearchIcon'
import FilterIcon from '../assets/icons/FilterIcon';
import AddProduct from "../assets/icons/AddProduct";
import VerifiedIcon from "../assets/icons/VerifiedIcon";
// colors
import { background, black, bodyText, primaryColor, secondaryColor, white } from "../style/colors";
// components
import StatWrapper from "../components/StatWrapper";
import StatCard from "../components/StatCard";
import CustomBottomSheet from "../components/CustomBottomSheet";
import SearchBar from "../components/SearchBar";
import ProductCard from "../components/ProductCard";
import AlertNotice from "../components/AlertNotice";
import EditProductContent from "../components/EditProductContent";
import ProductListItem from "../components/ProductListItem";
import Header from "../components/Header";
import FilterBottomSheet from "../components/FilterBottomSheet";
import FilterButtonGroup from "../components/FilterButtonGroup";
import FilterPill from "../components/FilterPill";
import Menu from "../components/Menu";
import ImportInventory from "../assets/icons/ImportInventory";
import CustomButton from "../components/CustomButton";
import OpenFilterButton from "../components/OpenFilterButton";
// bottomsheet component
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
// helpers
import { windowHeight } from "../utils/helpers";
// skeleton screen
import ProductsSkeleton from "../skeletons/ProductsSkeleton";
// globals
import { useGlobals } from "../context/AppContext";


const Products = ({navigation, route}) => {

    // bottomsheet ref
    const { bottomSheetRef, filterSheetRef } = useGlobals();

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
            imageUrl: require('../assets/images/maybach-sunglasses.png'),
            onPress: () => handleEditProduct(1),
        },
        {
            id: 2,
            product_name: "Accurate Watch",
            quantity: 3,
            price: 33000,
            imageUrl: require('../assets/images/accurate-watch.png'),
            onPress: () => handleEditProduct(2),
        },
        {
            id: 3,
            product_name: "Black Sketchers",
            quantity: 0,
            price: 35000,
            imageUrl: require('../assets/images/black-sketchers.png'),
            onPress: () => handleEditProduct(3),
        },
        {
            id: 4,
            product_name: "Brown Clarks",
            quantity: 11,
            price: 40000,
            imageUrl: require('../assets/images/brown-clarks.png'),
            onPress: () => handleEditProduct(4),
        },
        {
            id: 5,
            product_name: "Pheonix Sneakers",
            quantity: 2,
            price: 25000,
            imageUrl: require('../assets/images/sneakers.png'),
            onPress: () => handleEditProduct(5),
        },
        {
            id: 6,
            product_name: "Perfectly Useless Morning Watch",
            quantity: 9,
            price: 32000,
            imageUrl: require('../assets/images/perfectly-useless-mornig-watch.png'),
            onPress: () => handleEditProduct(6),
        },
        {
            id: 7,
            product_name: "Chaos Watch",
            quantity: 15,
            price: 30000,
            imageUrl: require('../assets/images/Chaos-Window-Watch.jpg'),
            onPress: () => handleEditProduct(7),
        },
        {
            id: 8,
            product_name: "Clarks Phantom",
            quantity: 10,
            price: 25000,
            imageUrl: require('../assets/images/Clarks.jpg'),
            onPress: () => handleEditProduct(8),
        },
        {
            id: 9,
            product_name: "Timberland",
            quantity: 10,
            price: 35000,
            imageUrl: require('../assets/images/Timberland.jpg'),
            onPress: () => handleEditProduct(9),
        },
        {
            id: 10,
            product_name: "Useless Afternoon Watch",
            quantity: 19,
            price: 32000,
            imageUrl: require('../assets/images/useless-afternoon-watch.png'),
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

    const [editProduct, setEditProduct] = useState({
        id: "",
        product_name: "",
        quantity: 0,
        price: 0,
        imageUrl: "",
    });

    // console.log(editProduct);

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
    }

    const openAlert = (type, text) => {
        setAlert({
            show: true,
            type: type,
            text: text
        });

        // auto close alert after 4 seconds
        setTimeout(() => {
            closeAlert();
        }, 4000);
    }

    // modal state
    const [modal, setModal] = useState({
        snapPointsArray: ["100%"],
        autoSnapAt: 0,
        sheetTitle: "Edit Product",
        modalContent: 'edit'
    });

    // use effect to remove add product or edit product success propmt after 3 seconds
    useEffect(() => {

        if (route.params) {
            setMenu(false);
            openAlert(route.params.type, route.params.text);
        }

    }, [route.params]);

    // state to store search query
    const [searchQuery, setSearchQuery] = useState("");

    // close modal function
    const closeModal = () => {
        bottomSheetRef.current?.close();
    };

    // open modal function
    const openModal = (type) => {
        // console.log("here");
        setModal(prevModal => {
            return {
                ...prevModal,
                sheetTitle: type === "search" ? "Products" : "Edit Product",
                modalContent: type
            }
        });
        bottomSheetRef.current?.present();
    }

    const handleEditProduct = (id) => {
        // console.log("right here");
        setEditProduct(() => {
            return products.filter(product => product.id === id)[0];
        }); // return first element of corresponding array
        openModal("edit");

    }

    // console.log(editProduct);

    // function to update selected product
    const handleUpdateProduct = () => {
        closeModal();

        openAlert("Success", "Product edited successfully!");
    }

    // const menu state
    const [menu, setMenu] = useState(false);

    // close Menu function
    const closeMenu = () => {
        setMenu(false);
    }
    
    // open Menu function
    const openMenu = () => {
        setMenu(true);
    }
    

    const menuButtons = [
        {
            id: 1,
            icon: <ImportInventory />,
            text: "Import Inventory",
            onPress: () => navigation.navigate("ImportInventory"),
        }
    ]

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
        Keyboard.dismiss();
        setFilterType(type)
        filterSheetRef.current?.present()
    }
    
    const closeFilter = () => {
        // close filter bottomsheet
        filterSheetRef.current?.close()
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
    return (
        <>
            {!pageLoading ? <>
                {/* header */}
                <Header 
                    navigation={navigation}
                    stackName={
                        <View style={style.header}>
                            <Text style={style.headerText}>Komitex</Text>
                            <VerifiedIcon />
                        </View>
                    }
                    removeBackArrow={true}
                    inlineArrow={true}
                    icon={<MenuIcon />}
                    iconFunction={openMenu}
                    backgroundColor={background}
                />
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
                                {/* Navigate to addproducts page/stack */}
                                {products.length !== 0 && (
                                    <CustomButton
                                        secondaryButton={true}
                                        name={"Add product"}
                                        shrinkWrapper={true}
                                        onPress={() => navigation.navigate("AddProduct")}
                                        unpadded={true}
                                        wrapperStyle={{marginTop: 22}}
                                    />
                                )}
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
                                                    onPress={() => openModal("search")}
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
                                    <View style={style.emptyView}/>   
                                )
                            } else {
                                return (
                                    <View 
                                        style={[
                                            index % 2 === 0 && style.productCardWrapperLeft,
                                            index % 2 === 1 && style.productCardWrapperRight,
                                        ]}
                                    >
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
                            // product card
                        }}
                        ListFooterComponent={products.length <= 2 && (
                            <View style={style.noProductsContainer}>
                                <View style={style.noProductTextWrapper}>
                                    <AddProduct />
                                    <Text style={style.noProductHeading}>No products in inventory... yet!</Text>
                                    <Text style={style.noProductParagraph}>
                                        Start by adding your first product. You could as well import from an already existing inventory
                                    </Text>
                                </View>
                                <CustomButton
                                    name={"Add product"}
                                    shrinkWrapper={true}
                                    onPress={() => navigation.navigate("AddProduct")}
                                    unpadded={true}
                                />
                                <CustomButton
                                    secondaryButton={true}
                                    name={"Import Inventory"}
                                    shrinkWrapper={true}
                                    onPress={() => navigation.navigate("ImportInventory")}
                                    unpadded={true}
                                />
                            </View>
                        )}
                    />
                </TouchableWithoutFeedback>
            </> : <ProductsSkeleton />}
            {/* custom bottomsheet modal */}
            <CustomBottomSheet 
                bottomSheetModalRef={bottomSheetRef}
                closeModal={closeModal}
                snapPointsArray={modal.snapPointsArray}
                autoSnapAt={modal.autoSnapAt}
                sheetTitle={ modal.sheetTitle }
                disablePanToClose={modal.modalContent === "search" ? true : false}
            >
                { modal.modalContent === "search" && (
                    <>
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
                        <BottomSheetScrollView showsVerticalScrollIndicator={false} style={style.orderSearchResults}>
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
                    </>
                )}

                { modal.modalContent === "edit" && (
                    <>
                        <EditProductContent 
                            handleUpdateProduct={handleUpdateProduct}
                            product_name={editProduct.product_name}
                            quantity={editProduct.quantity}
                            imageUrl={editProduct.imageUrl}
                            initialPrice={editProduct.price}
                        />
                    </>
                )}
                    
            </CustomBottomSheet>
            {/* filter bottom sheet */}
            <FilterBottomSheet 
                fiterSheetRef={filterSheetRef}
                closeFilter={closeFilter}
                clearFilterFunction={handleClearAllFilter}
                applyFilterFunction={filterType === "search" ? () => handleApplyFilter("search") : handleApplyFilter}
                height={"60%"}
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

            {/* success alert to display on addproduct or edit product */}
            { alert.show && (
                <AlertNotice 
                    show={alert.show}
                    type={alert.type}
                    text={alert.text}
                    closeAlert={closeAlert}
                />
            )}

            {/* menu */}
            {menu && (
                <Menu
                    closeMenu={closeMenu}
                    menuButtons={menuButtons}
                />
            )}
        </>
    );
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
    addProductButton: {
        height: 44,
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: 'center',
        backgroundColor: secondaryColor,
        borderRadius: 12,
        marginTop: 22,
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