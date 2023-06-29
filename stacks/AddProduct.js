import Header from "../components/Header";
import { 
    View, 
    Text, 
    ScrollView, 
    TouchableWithoutFeedback, 
    StyleSheet, 
    TouchableOpacity,
    Image
} from "react-native";
import Input from "../components/Input";
import { useState } from "react";
import CameraPrimaryIcon from '../assets/icons/CameraPrimaryIcon';
import * as ImagePicker from "expo-image-picker";
import CustomButton from "../components/CustomButton";

const AddProduct = ({navigation}) => {
    
    // state to store product name
    const [productName, setProductName] = useState("");
    // state to store price value
    const [price, setPrice] = useState("");

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

    const navigateToProducts = () => {
        navigation.navigate("Products", {
            success: true,
        });
    }

    return (
        <>
            <TouchableWithoutFeedback>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={style.container}
                >
                    <View style={style.main}>
                        <Header 
                            navigation={navigation} 
                            stackName={"Add Product"} 
                            iconFunction={null} 
                            icon={null} 
                        />
                        <Text style={style.headingText}>
                            Create a new product that will be added to your inventory with Komitex.
                        </Text>
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
            <CustomButton 
                name={"Add Product"}
                onPress={navigateToProducts}
                backgroundColor={"#f8f8f8"}
                fixed={false}
                inactive={emptyFields}
            />
        </>
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        backgroundColor: "#f8f8f8",
        padding: 20,
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
        color: "rgba(34, 34, 34, 0.6)",
        width: "100%",
        marginBottom: 24,
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
        color: "rgba(131, 127, 127, 1)"
    },
    imageContainer: {
        width: "100%",
        height: 103,
        backgroundColor: "#ffffff",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "rgba(231, 229, 229, 1)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
    },
    imagePlaceholder: {
        fontFamily: "mulish-regular",
        fontSize: 10,
        color: "rgba(131, 127, 127, 1)",
    },
    uploadButton: {
        width: 40,
        height: 40,
        backgroundColor: "rgba(7, 66, 124, 0.05)",
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