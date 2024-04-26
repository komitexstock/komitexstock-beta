// react native component
import {
    View,
    Image,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    StyleSheet,
    Keyboard,
    ScrollView,
    Linking
} from "react-native";
// bottomsheet component
import { black, bodyText, inputLabel, listSeperator3, primaryColor, secondaryColor, white } from "../style/colors";
// components
import Input from "../components/Input";
import CustomButton from "../components/CustomButton";
import AccountButtons from "../components/AccountButtons";
import CustomBottomSheet from "../components/CustomBottomSheet";
import WarehouseListItem from "../components/WarehouseListItem";
import BusinessListItem from "../components/BusinessListItem";
// bottomsheet components
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
// react hook
import { useRef, useState, useEffect } from "react";
// image picker method
import * as ImagePicker from 'expo-image-picker';
// icon
import GalleryBlackIcon from "../assets/icons/GalleryBlackIcon";
import InfoIcon from "../assets/icons/InfoIcon";
import ArrowLeftSmallIcon from "../assets/icons/ArrowLeftSmallIcon";
import EmailIcon from "../assets/icons/EmailIcon";
import SmsIcon from "../assets/icons/SmsIcon";
import PhoneIcon from "../assets/icons/PhoneIcon";
// helpers
import { windowHeight, windowWidth } from "../utils/helpers";
// globals
import { useGlobals } from "../context/AppContext";
// shadow
import { Shadow } from "react-native-shadow-2";


const EditProduct = ({navigation, route}) => {
    
    // route paramsa
    const {id, product_name, quantity, initial_price, image_uri, product_scope} = route?.params;

    // sheet ref
    const sheetRef = useRef(null);

    const [sheetParameters, setSheetParameters] = useState({
        sheetTitle: "Support",
        snapPointsArray: [280],
        content: "Help & Support",
    });

    // global variables
    const {
        setBottomSheet,
        bottomSheetRef,
        setToast,
    } = useGlobals();

    // update botomsheet global states
    useEffect(() => {
        // set bottomsheet state
        setBottomSheet(prevState=> {
            return {...prevState, close: () => sheetRef.current?.close()}
        });
    }, []);

    // warehouses
    const warehouses = [
        {
            id: 1,
            warehouse_name: "Warri",
            warehouse_address: "276 PTI road",
            stock: 3,
        },
        {
            id: 2,
            warehouse_name: "Isoko",
            warehouse_address: "123 Isoko Street",
            stock: 2,
        },
        {
            id: 3,
            warehouse_name: "Asaba",
            warehouse_address: "456 Asaba Avenue",
            stock: 1,
        },
        {
            id: 4,
            warehouse_name: "Kwale",
            warehouse_address: "789 Kwale Road",
            stock: 1,
        },
        {
            id: 5,
            warehouse_name: "Agbor",
            warehouse_address: "101 Agbor Lane",
            stock: 1,
        },
        {
            id: 6,
            warehouse_name: "Benin",
            warehouse_address: "654 Benin Street",
            stock: 3,
        },
    ];

    // logistics list
    const logistics = [
        {
            business_id: "E3F7J1g4X6r9L2Y",
            business_name: "Komitex Logistics",
            imageUrl: "https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/banners%2Fkomitex.png?alt=media&token=a8039272-66b6-4e24-8ab1-a4dfd40503f8",
            verified: true,
            stock: 3,
        },
        {
            business_id: "H9i2L4t6R3d7K1w",
            business_name: "Fedex",
            imageUrl: "https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/banners%2Ffedex.png?alt=media&token=d943aea6-37ec-4f61-a589-01ad7bdd1299",
            verified: true,
            stock: 5,
        },
        {
            business_id: "X7y2G4z9Q1a3w6J",
            business_name: "UPS",
            imageUrl: "https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/banners%2Fups.png?alt=media&token=37224ee1-4460-4fec-a39b-3af040b65fe0",
            verified: false,
            stock: 2,
        },
        {
            business_id: "N5o8V2s6W3D1r4E",
            business_name: "DHL",
            imageUrl: "https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/banners%2Fdhl.png?alt=media&token=e113f106-0eaf-420e-9fe4-488cb8e6c26d",
            verified: true,
            stock: 8,
        },
    ];

    // total stock
    const totalStock = warehouses.reduce((acc, curr) => {
        return acc + curr.stock;
    }, 0);

    // total warehouses
    const totalWarehouses = warehouses.length;

    // total logistics
    const totalLogistics = logistics.length;

    // state to store product name
    const [productName, setProductName] = useState(product_name);
    
    // state to store price value
    const [price, setPrice] = useState(initial_price);

    // product name error
    const [errorProductName, setErrorProductName] = useState(false);
    
    // price error
    const [errorPrice, setErrorPrice] = useState(false);

    // state to hold selected image
    const [selectedImage, setSelectedImage] = useState(null);

    // update price function
    const updatePrice = (text) => {
        let newText = text.replace(new RegExp(',', 'g'), '');
        // remove all occurrence of the comma character ',' in text gloablly
        if (newText) setPrice(parseFloat(newText));
        else setPrice(0);
        
    }

    // upload image function
    const pickImageAsync = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 1,
        });

        try {
            if (!result.canceled) {
                setSelectedImage(!result.canceled[0].uri);
            } 
            
        } catch (error) {
            // handle error
        }
    };

    // open bottom sheet modal
    const openModal = (type) => {
        // set sheet parameters
        setSheetParameters({
            content: type,
            snapPointsArray: (() => {
                if (type === "Support") {
                    return [280];
                } else if (type === "Logistics" || type === "Warehouses") {
                    return ["50%", "75%"];
                }
                // else just return a height of 50% by default
                return ["50%"];
            })(),
            sheetTitle: (() => {
                if (type === "Support") { // support
                    return "Help & Support";
                } else if (type === "Logistics") { // logistic
                    return totalLogistics + " Logistics";
                } else if (type === "Warehouses") { // warehouse sheet
                    return totalWarehouses + `${totalWarehouses > 1 ? " Warehouses" : " Warehouse"}`
                }
                // else just return a height of 50% by default
                return "";
            })()
        })

        // open bottomsheet 
        sheetRef.current?.present();

        // update bottomsheet global state
        setBottomSheet(prevState => {
            return {
                ...prevState,
                opened: true,
            }
        });
    }

    const closeModal = () => {
        // close bottom sheet
        sheetRef.current?.close();

        // update bottomsheet global state
        setBottomSheet(prevState => {
            return {
                ...prevState,
                opened: false,
            }
        });
    }

    // buttons in support bottom sheet modal
    const supportButtons = [
        {
            id: 1,
            title: "Call Us on +234 811 632 0575",
            icon: <PhoneIcon />,
            onPress: () => Linking.openURL('tel:+2348116320575'),
        },
        {
            id: 2,
            title: "Chat with us",
            icon: <SmsIcon />,
            onPress: () => Linking.openURL('https://wa.me/+2348116320575'),
        },
        {
            id: 3,
            title: "Contact us via email",
            icon: <EmailIcon />,
            onPress: () => Linking.openURL('mailto:komitexstock@gmail.com'),
        },
    ];

    const handleUpdateProduct = () => {
    }

    return (
        <>
            <TouchableWithoutFeedback 
                onPress={Keyboard.dismiss}
            >
                <ScrollView
                    style={style.container} 
                    showsVerticalScrollIndicator={false}
                >
                    <View style={style.main}>
                        <View style={style.productImageWrapper}>
                            {/* product image button */}
                            <Image 
                                style={style.productImage}
                                source={{uri: selectedImage ? selectedImage : image_uri}}
                            />
                            {/* upload image button, position absolute */}
                            <TouchableOpacity 
                                style={style.editImageButton}
                                onPress={pickImageAsync}
                            >
                                <GalleryBlackIcon />
                            </TouchableOpacity>
                            {/* navigate to previous screen button, position absolute */}
                            <TouchableOpacity 
                                style={[style.editImageButton, {left: 20}]}
                                onPress={navigation.goBack}
                            >
                                <ArrowLeftSmallIcon />
                            </TouchableOpacity>
                            {/* product details */}
                        </View>
                        <View style={style.productDetailsWrapper}>
                            <View style={style.productDetailsContent}>

                                <View style={style.productTextWrapper}>
                                    <View>
                                        <Text style={style.productName}>
                                            {product_name}
                                        </Text>
                                        <Text style={style.productStock}>
                                            {totalStock}
                                            <Text style={style.faintText}> in stock</Text>
                                        </Text>
                                        <TouchableOpacity 
                                            style={style.linkButton}
                                            onPress={() => openModal(product_scope)}
                                        >
                                            {product_scope === "Warehouses" && (
                                                <Text style={style.linkText}>
                                                    {   
                                                        totalWarehouses > 1 ? 
                                                        totalWarehouses + " Warehouses" : 
                                                        totalWarehouses + " Warehouse"
                                                    }
                                                </Text>
                                            )}
                                            {product_scope === "Logistics" && (
                                                <Text style={style.linkText}>
                                                    {totalLogistics} Logistics
                                                </Text>
                                            )}
                                        </TouchableOpacity>
                                        <View style={style.lastDeliveryWrapper}>
                                            <TouchableOpacity>
                                                <InfoIcon />
                                            </TouchableOpacity>
                                            <Text style={style.productStock}>
                                                <Text style={style.faintText}>Last delivered </Text>
                                                yesterday
                                            </Text>
                                        </View>
                                    </View>
                                    <Text style={style.productPrice}>₦{initial_price?.toLocaleString()}</Text>
                                </View>


                                <View style={style.inputContainer}>
                                    {/* Product name input */}
                                    <Input 
                                        label={"Product Name"}
                                        placeholder={"Type the name of the product"}
                                        onChange={(text) => setProductName(text)}
                                        value={productName}
                                        error={errorProductName}
                                        setError={setErrorProductName}
                                        disabled={true}
                                        helperComponent={<>
                                            <View style={style.helperComponent}>
                                                <Text style={style.helperText}>
                                                    Contact&nbsp;
                                                </Text>
                                                <TouchableOpacity 
                                                    style={style.linkButton}
                                                    onPress={() => openModal("Support")}
                                                >
                                                    <Text style={style.linkText}>support</Text>
                                                </TouchableOpacity>
                                                <Text style={style.helperText}>
                                                    &nbsp;to edit product name
                                                </Text>
                                            </View>
                                        </>}
                                    />

                                    {/* price input */}
                                    <Input 
                                        label={"Price"}
                                        placeholder={"Price"}
                                        onChange={updatePrice}
                                        value={price ? price?.toLocaleString() : ''}
                                        adornment={"₦"}
                                        error={errorPrice}
                                        setError={setErrorPrice}
                                        keyboardType={"numeric"}
                                    />
                                </View>
                            </View>
                            <View style={style.actionButtonsWrapper}>
                                <CustomButton
                                    secondaryButton={true}
                                    name={"Delete"}
                                    shrinkWrapper={true}
                                    onPress={() => {}}
                                    unpadded={true}
                                    wrapperStyle={{width: (windowWidth - 56) / 2, height: 44}}
                                />
                                <CustomButton
                                    name={"Save"}
                                    shrinkWrapper={true}
                                    onPress={() => {}}
                                    unpadded={true}
                                    wrapperStyle={{width: (windowWidth - 56) / 2}}
                                    inactive={price?.toLocaleString() === initial_price?.toLocaleString()}
                                />
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
            <CustomBottomSheet
                index={0}
                sheetRef={sheetRef}
                closeModal={closeModal}
                snapPointsArray={sheetParameters.snapPointsArray}
                sheetTitle={sheetParameters.sheetTitle}
            >
                { sheetParameters.content === "Support" && supportButtons.map((item, index) => (
                    <AccountButtons
                        key={item.id}
                        title={item.title}
                        subtitle={false}
                        icon={item.icon}
                        length={supportButtons.length - 1}
                        index={index}
                        onPress={item.onPress}
                        unpadded={true}
                    />
                ))}

                { sheetParameters.content === "Warehouses" && (
                    <BottomSheetScrollView 
                        showsVerticalScrollIndicator={false}
                    >
                        <View style={style.warehouseListWrapper}>
                            {warehouses.map((item) => (
                                <WarehouseListItem
                                    warehouse_address={item.warehouse_address}
                                    warehouse_name={item.warehouse_name}
                                    stock={item.stock}
                                    key={item.id}
                                />
                            ))}
                        </View>
                    </BottomSheetScrollView>
                )}

                { sheetParameters.content === "Logistics" && (
                    <BottomSheetScrollView 
                        showsVerticalScrollIndicator={false}
                    >
                        <View style={style.warehouseListWrapper}>
                            {logistics.map((item) => (
                                <BusinessListItem
                                    key={item.business_id}
                                    banner_image={item.imageUrl}
                                    verified={item.verified}
                                    business_name={item.business_name}
                                    stock={item.stock}
                                    disableClick={true}
                                />
                            ))}
                        </View>
                    </BottomSheetScrollView>
                )}
            </CustomBottomSheet>
        </>
    );
}

// stylesheet
const style = StyleSheet.create({
    container: {
        width: '100%',
    },
    main: {
        width: '100%',
        minHeight: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    productImageWrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        width: '100%',
        height: 186,
        backgroundColor: secondaryColor,
    },
    productImage: {
        width: '100%',
        height: 186,
        resizeMode: 'cover',
    },
    editImageButton: {
        width: 32,
        height: 32,
        position: "absolute",
        top: 12,
        right: 20,
        zIndex: 10,
        borderRadius: 28,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: white,
        shadowColor: black,
        elevation: 1,
    },
    shadowStyle: {
        width: 32, 
        height: 32, 
        position: "absolute",
        top: 12,
        right: 20,
        zIndex: 10,
        borderRadius: 16,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 16,
        // display: "flex",
        // alignItems: "center",
        // justifyContent: "center",
        // backgroundColor: white,
    },
    productDetailsWrapper: {
        width: "100%",
        minHeight: windowHeight - 186,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'column',
        padding: 20,
        paddingBottom: 90,
        position: 'relative',
    },
    productDetailsContent: {
        width: "100%",
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'column',
    },
    productTextWrapper: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: listSeperator3,
    },
    productName: {
        fontFamily: 'mulish-semibold',
        fontSize: 14,
        color: black,
        marginBottom: 4,
    },
    productStock: {
        fontFamily: 'mulish-medium',
        fontSize: 12,
        color: black,
        marginBottom: 8,
    },
    faintText: {
        fontSize: 12,
        color: bodyText,
    },
    lastDeliveryWrapper: {
        display: 'flex',
        flexDirection: 'row',
        gap: 8,
        justifyContent: 'flex-start',
        marginTop: 8,
    },
    productPrice: {
        fontFamily: 'mulish-semibold',
        fontSize: 14,
        color: primaryColor,
    },
    inputContainer: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: 20,
        paddingTop: 30,
    },
    helperComponent: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    helperText: {
        fontFamily: 'mulish-semibold',
        fontSize: 12,
        color: inputLabel,
    },
    linkText: {
        color: primaryColor,
        textDecorationColor: primaryColor,
        textDecorationLine: 'underline',
        fontSize: 12,
        fontFamily: 'mulish-semibold',
    },
    actionButtonsWrapper: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 16,
        position: "absolute",
        bottom: 30,
        // marginTop: 50,
    },
    warehouseListWrapper: {
        width: "100%",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        gap: 10,
    },

})


export default EditProduct
