// react native component
import { 
    View, 
    Text, 
    ScrollView, 
    TouchableWithoutFeedback, 
    StyleSheet, 
    TouchableOpacity,
    Image
} from "react-native";
// components
import Input from "../components/Input";
import Header from "../components/Header";
import CustomButton from "../components/CustomButton";
// react hooks
import { useState } from "react";
// icon
import CameraPrimaryIcon from '../assets/icons/CameraPrimaryIcon';
// expo image picker method
import * as ImagePicker from "expo-image-picker";
import { background, bodyText, inputBorder, inputLabel, secondaryColor, white } from "../style/colors";

const AddProduct = ({navigation}) => {
    
    // state to store product name
    const [productName, setProductName] = useState("");
    
    // state to store price value
    const [price, setPrice] = useState("");

    // state to store error in product name
    const [errorProductName, setErrorProductName] = useState(false);
    
    // state to store error in price
    const [errorPrice, setErrorPrice] = useState(false);

    // state to hold selected image
    const [selectedImage, setSelectedImage] = useState(null);

    // variable to check for empty fields
    const emptyFields = [
        productName, 
        price,
        selectedImage
        ].some(
            (item) => item === null || item === ''
    );

    // variable to update price
    const updatePrice = (text) => {
        // remove commas from price
        let newText = text.replace(new RegExp(',', 'g'), '');
        // remove all occurrence of the comma character ',' in text gloablly
        if (newText) setPrice(parseFloat(newText));
        // set price to 0 if empty
        else setPrice(0);
        
    }

    // pick image from gallery function
    const pickImageAsync = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          quality: 1,
        });
    
        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri);
        }
    };

    // navigate to products with success parammeter
    // success parameter triggers a success prompt
    const handleAddProduct = () => {
        navigation.navigate("Products", {
            show: true,
            type: "Success",
            text: "Product successfully created and saved!"
        });
    }

    // render AddProduct page
    return (
        <>
            <TouchableWithoutFeedback>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={style.container}
                >
                    <View style={style.main}>
                        {/* header component */}
                        <Header 
                            navigation={navigation} 
                            stackName={"Add Product"} 
                            iconFunction={null} 
                            icon={null} 
                            unpadded={true}
                        />
                        <Text style={style.headingText}>
                            Create a new product that will 
                            be added to your inventory with Komitex.
                        </Text>
                        <View style={style.inputContainer}>
                            {/* product name input */}
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
                            {/* price input */}
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
                            {/* select product image */}
                            <TouchableOpacity 
                                style={style.selectImageWrapper}
                                onPress={pickImageAsync}
                            >
                                <Text style={style.selectImageLabel}>
                                    Product Image
                                </Text>
                                <View style={style.imageContainer}>
                                    <TouchableOpacity 
                                        style={style.uploadButton} 
                                        onPress={pickImageAsync}
                                    >
                                        { !selectedImage ? 
                                            <CameraPrimaryIcon /> : 
                                            <Image 
                                                source={{uri: selectedImage}}
                                                style={style.productImage}
                                            /> 
                                        }
                                        
                                    </TouchableOpacity>
                                    <Text style={style.imagePlaceholder}>
                                        Upload product image 
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
            {/* Add Product button, disables on empty fields */}
            <CustomButton 
                name={"Add Product"}
                onPress={handleAddProduct}
                backgroundColor={background}
                fixed={false}
                inactive={emptyFields}
            />
        </>
    );
}

// stylesheet
const style = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        backgroundColor: background,
        padding: 20,
        paddingTop: 0,
        height: "100%",
    },
    main: {
        paddingBottom: 90,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
    },
    headingText: {
        fontFamily: "mulish-regular",
        fontSize: 12,
        color: bodyText,
        width: "100%",
        marginBottom: 24,
        marginTop: 8,
    },
    inputContainer: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: 20,
    },
    selectImageWrapper: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        gap: 4,
    },
    selectImageLabel: {
        fontFamily: "mulish-semibold",
        fontSize: 10,
        color: inputLabel
    },
    imageContainer: {
        width: "100%",
        height: 103,
        backgroundColor: white,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: inputBorder,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
    },
    imagePlaceholder: {
        fontFamily: "mulish-regular",
        fontSize: 10,
        color: inputLabel,
    },
    uploadButton: {
        width: 40,
        height: 40,
        backgroundColor: secondaryColor,
        borderRadius: 20,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    productImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    camera: {
        width: "100%",
        height: "100%",
        position: "absolute",
    }
})
 
export default AddProduct;