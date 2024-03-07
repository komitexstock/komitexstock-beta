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

// icons
import CameraPrimaryIcon from '../assets/icons/CameraPrimaryIcon';

// globals variables
import { useGlobals } from '../context/AppContext';

// expo image picker method
import * as ImagePicker from "expo-image-picker";

// colors
import {
    background,
    bodyText,
    inputBorder,
    inputLabel,
    secondaryColor,
    white
} from "../style/colors";

// useAuth
import { useAuth } from "../context/AuthContext";

// firebase
import {
    database,
} from "../Firebase";

// firestore functions
import {
    addDoc,
    collection,
    getDocs,
    where,
    query,
    orderBy,
    serverTimestamp,
} from "firebase/firestore";

// upload file function
import { uploadFile } from "../database/common/storage";

const AddProduct = ({navigation}) => {

    // auth data
    const { authData } = useAuth();

    // toast function
    const { setToast } = useGlobals();
    
    // state to store product name
    const [productName, setProductName] = useState("");

    // button loading state
    const [isLoading, setIsLoading] = useState(false);
    
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
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                quality: 1,
                allowsMultipleSelection: false, // allow user to select just one image
            });

            // if no image is selected return early
            if (result.assets === null) return;
         
            if (!result.assets[0].canceled) {
                // set image state
                return setSelectedImage(result.assets[0]);
            }

            // else throw error
            throw new Error("Image not found");


        } catch (error) {
            console.log("Error:", error.message);
            // show error toast
            setToast({
                visible: true,
                type: "error",
                text: error.message,
            });                    
        }
    };

    // function to handle adding a new products
    const handleAddProduct = async () => {
        try {
            // initiate loadimg state
            setIsLoading(true);
            
            // check for empty fields
            if (productName === '' || price === '' || selectedImage === null) {
                // throw error
                throw new Error("Empty fields!");
            }

            // function variables
            let productId; // productId
            let products = []; // products array
            let q; // query
            let querySnapshot; // query snapshot

            // ref to products collection
            const productsRef = collection(database, "products");

            // check if product_name exist in products collection
            q = query(
                productsRef, 
                where("product_name", "==", productName.trim().toLowerCase()), 
            );

            // get docs
            querySnapshot = await getDocs(q);
            // if results exist
            if (querySnapshot.size > 0) {
                setIsLoading(false);
                // throw error, if warehouse already exist
                console.log(querySnapshot);
                querySnapshot.forEach((doc) => {
                    // product id
                    productId = doc.id;
                    const product = {
                        id: doc.id,
                        product_name: doc.data().product_name,
                    };
                    products.push(product);
                });
            } else {
                // save data in database
                const docRef = await addDoc(productsRef, {
                    product_name: productName.trim().toLowerCase(),
                    createdAt: serverTimestamp(), 
                });

                // product id
                productId = docRef.id;
            }

            // merchant_products collection
            const merchantProductsRef = collection(database, "merchant_products");

            // check if product_id exist in merchant_products collection
            q = query(
                merchantProductsRef,
                where("product_id", "==", productId),
            )

            // get docs
            querySnapshot = await getDocs(q);

            // check for results
            if (querySnapshot.size > 0) {
                // throw error, if warehouse already exist
                throw new Error("Product already exist");
            }

            // save data in database, merchant_products collection
            const docRef = await addDoc(collection(database, "merchant_products"), {
                product_id: productId,
                price: price,
                product_image: null, // product image would be updated after image is uploaded to firestore storage
                created_at: serverTimestamp(),
                edited_at: serverTimestamp(),
                created_by: authData?.uid,
                edited_by: authData?.uid,
                business_id: authData?.business_id,
            });

            // upload image type
            const imageType = "Product";

            // upload image
            const upload = await uploadFile(
                selectedImage,
                imageType,
                docRef.id,
            );

            console.log("Upload:", upload);
            
            // navigate to Inventory Products tab with success toast parammeter
            navigation.navigate("Inventory", {
                tab: "Products",
                toastType: "Success",
                toastText: "Product successfully created and saved!"
            });
            
            setIsLoading(false);

        } catch (error) {
            // disable loading state
            setIsLoading(false);
            // log errors
            console.log("Error:", error.message);
            setToast({
                visible: true,
                type: "error",
                text: error.message,
            });  
        }
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
                            Create a new product that will be added to your store’s inventory. 
                        </Text>
                        <View style={style.inputContainer}>
                            {/* product name input */}
                            <Input 
                                label={"Product Name"}
                                placeholder={"Type the name of the product"}
                                onChange={(text) => setProductName(text)}
                                value={productName}
                                adornment={false}
                                error={errorProductName}
                                setError={setErrorProductName}
                            />
                            {/* price input */}
                            <Input 
                                label={"Price"}
                                placeholder={"Price"}
                                onChange={updatePrice}
                                value={price ? price.toLocaleString() : ''}
                                keyboardType={"numeric"}
                                adornment={"₦"}
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
                                                source={{uri: selectedImage.uri}}
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
                isLoading={isLoading}
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
        borderRadius: 8,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    productImage: {
        width: 40,
        height: 40,
        borderRadius: 8,
    },
    camera: {
        width: "100%",
        height: "100%",
        position: "absolute",
    }
})
 
export default AddProduct;