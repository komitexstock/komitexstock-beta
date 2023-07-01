import { View, Image, Text, TouchableOpacity, TouchableWithoutFeedback, StyleSheet, Keyboard } from "react-native";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { primaryColor } from "../style/globalStyleSheet";
import Input from "../components/Input";
import { useState } from "react";
import * as ImagePicker from 'expo-image-picker';
import GalleryBlackIcon from "../assets/icons/GalleryBlackIcon";

const EditProductContent = ({product}) => {

    // state to store product name
    const [productName, setProductName] = useState("Maybach Sunglasses");
    // state to store price value
    const [price, setPrice] = useState(20000);

    const [errorProductName, setErrorProductName] = useState(false);
    const [errorPrice, setErrorPrice] = useState(false);

    // state to hold selected image
    const [selectedImage, setSelectedImage] = useState(null);
    // console.log(selectedImage)

    const emptyFields = [
        productName, 
        price,
        selectedImage
        ].some(
            (item) => item === null || item === ''
    );

    const updatePrice = (text) => {
        let newText = text.replace(new RegExp(',', 'g'), '');
        // remove all occurrence of the comma character ',' in text gloablly
        if (newText) setPrice(parseFloat(newText));
        else setPrice(0);
        
    }

    const pickImageAsync = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri);
        } 
    };

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
                        <Image 
                            style={style.productImage}
                            source={!selectedImage ? 
                                require('../assets/images/maybach-sunglasses.png') : 
                                {uri: selectedImage}
                            }
                        />
                        <TouchableOpacity 
                            style={style.editImageButton}
                            onPress={pickImageAsync}
                        >
                            <GalleryBlackIcon />
                        </TouchableOpacity>
                        <View style={style.productTextWrapper}>
                            <View>
                                <Text style={style.productName}>
                                    Maybach Sunglasses
                                </Text>
                                <Text style={style.productStock}>
                                    7
                                    <Text style={style.faintText}> in stock</Text>
                                </Text>
                            </View>
                            <Text style={style.productPrice}>₦20,000</Text>
                        </View>
                        <View style={style.inputContainer}>
                            <Input 
                                label={"Product Name"}
                                placeholder={"Type the name of the product"}
                                onChange={(text) => setProductName(text)}
                                value={productName}
                                multiline={false}
                                editable={true}
                                minRows={1}
                                textAlign={"center"}
                                height={44}
                                keyboardType={"default"}
                                adornment={false}
                                helperText={false}
                                error={errorProductName}
                                setError={setErrorProductName}
                            />

                            <Input 
                                label={"Price"}
                                placeholder={"Price"}
                                onChange={updatePrice}
                                value={price ? price.toLocaleString() : ''}
                                multiline={false}
                                editable={true}
                                minRows={1}
                                textAlign={"center"}
                                height={44}
                                keyboardType={"numeric"}
                                adornment={"₦"}
                                helperText={false}
                                error={errorPrice}
                                setError={setErrorPrice}
                            />

                        </View>
                    </View>
                    <View style={style.actionButtonsWrapper}>
                        <TouchableOpacity style={style.delete}>
                            <Text style={style.deleteText}>Delete</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[style.save]}>
                            <Text style={style.saveText}>Save</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </BottomSheetScrollView>
        </TouchableWithoutFeedback>
    );
}

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
        backgroundColor: "#ffffff",
    },
    productImage: {
        width: '100%',
        height: 186,
        borderRadius: 12,
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
        color: "rgba(34, 34, 34, 1)",
    },
    productStock: {
        fontFamily: 'mulish-regular',
        fontSize: 12,
        color: "rgba(34, 34, 34, 1)",
    },
    faintText: {
        fontFamily: 'mulish-regular',
        fontSize: 12,
        color: "rgba(34, 34, 34, 0.6)",
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
        backgroundColor: "rgba(7, 66, 124, 0.05)",
        borderRadius: 12,
    },
    deleteText: {
        fontFamily: 'mulish-semibold',
        color: primaryColor,
    },
    saveText: {
        fontFamily: 'mulish-semibold',
        color: "#ffffff",
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