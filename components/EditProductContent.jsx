// react native component
import {
    View,
    Image,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    StyleSheet,
    Keyboard
} from "react-native";
// bottomsheet component
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
// color
import { black, bodyText, primaryColor, secondaryColor, white } from "../style/colors";
// components
import Input from "../components/Input";
// react hook
import { useState, useRef } from "react";
// image picker method
import * as ImagePicker from 'expo-image-picker';
// icon
import GalleryBlackIcon from "../assets/icons/GalleryBlackIcon";
import InfoIcon from "../assets/icons/InfoIcon";

// Edit product modal content
const EditProductContent = ({product_name, initialPrice, quantity, imageUrl, handleUpdateProduct}) => {

    // state to store product name
    const [productName, setProductName] = useState(product_name);

    // state to store price value
    const [price, setPrice] = useState(initialPrice);

    // product name error
    const [errorProductName, setErrorProductName] = useState(false);
    
    // price error
    const [errorPrice, setErrorPrice] = useState(false);

    // state to hold selected image
    const [selectedImage, setSelectedImage] = useState(null);

    // empty fields
    const emptyFields = [
        productName, 
        price,
        selectedImage
        ].some(
            (item) => item === null || item === ''
    );

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

        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri);
        } 
    };

    // return EditProductContent component
    return (
        <TouchableWithoutFeedback 
            style={{height: "100%"}}
            onPress={() => Keyboard.dismiss()}
        >

            <BottomSheetScrollView
                // style={style.main} 
                contentContainerStyle={style.main}
            >
                <View style={style.main}>
                    <View style={style.productOldDetails}>
                        {/* product image button */}
                        <Image 
                            style={style.productImage}
                            source={!selectedImage ? 
                                imageUrl : 
                                {uri: selectedImage}
                            }
                        />
                        {/* upload image button, position absolute */}
                        <TouchableOpacity 
                            style={style.editImageButton}
                            onPress={pickImageAsync}
                        >
                            <GalleryBlackIcon />
                        </TouchableOpacity>
                        {/* product details */}
                        <View style={style.productTextWrapper}>
                            <View>
                                <Text style={style.productName}>
                                    {product_name}
                                </Text>
                                <Text style={style.productStock}>
                                    {quantity}
                                    <Text style={style.faintText}> in stock</Text>
                                </Text>
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
                            <Text style={style.productPrice}>₦{initialPrice.toLocaleString()}</Text>
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
                            />

                            {/* price input */}
                            <Input 
                                label={"Price"}
                                placeholder={"Price"}
                                onChange={updatePrice}
                                value={price ? price.toLocaleString() : ''}
                                adornment={"₦"}
                                error={errorPrice}
                                setError={setErrorPrice}
                                keyboardType={"numeric"}
                            />
                        </View>
                    </View>
                    <View style={style.actionButtonsWrapper}>
                        {/* delete product */}
                        <TouchableOpacity style={style.delete}>
                            <Text style={style.deleteText}>Delete</Text>
                        </TouchableOpacity>
                        {/* save product changes */}
                        <TouchableOpacity style={[style.save]} onPress={handleUpdateProduct}>
                            <Text style={style.saveText}>Save</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </BottomSheetScrollView>
        </TouchableWithoutFeedback>
    );
}

// stylesheet
const style = StyleSheet.create({
    main: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    productOldDetails: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        width: '100%',
        gap: 20,
        marginBottom: 20,
    },
    editImageButton: {
        width: 40,
        height: 24,
        position: "absolute",
        top: 12,
        right: 12,
        borderRadius: 6,
        zIndex: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: white,
    },
    productImage: {
        width: '100%',
        height: 186,
        borderRadius: 12,
        resizeMode: 'cover',
    },
    productTextWrapper: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    productName: {
        fontFamily: 'mulish-semibold',
        fontSize: 14,
        color: black,
    },
    productStock: {
        fontFamily: 'mulish-medium',
        fontSize: 12,
        color: black,
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
    },
    actionButtonsWrapper: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 16,
    },
    delete: {
        height: 44,
        minWidth: "40%",
        display: 'flex',
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: secondaryColor,
        borderRadius: 12,
    },
    deleteText: {
        fontFamily: 'mulish-semibold',
        color: primaryColor,
    },
    saveText: {
        fontFamily: 'mulish-semibold',
        color: white,
    },
    save: {
        height: 44,
        minWidth: "40%",
        display: 'flex',
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: primaryColor,
        borderRadius: 12,
    },
})
 
export default EditProductContent;