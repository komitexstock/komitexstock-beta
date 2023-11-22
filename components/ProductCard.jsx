// react native components
import { 
    Text, 
    View, 
    TouchableOpacity, 
    StyleSheet,
    Image 
} from "react-native";
// colors
import { black, bodyText, primaryColor, secondaryColor, white } from "../style/colors";
// components
import Indicator from '../components/Indicator';
import { windowWidth } from "../utils/helpers";

const maxCardWidth = windowWidth/2 - 28;

const ProductCard = ({product_name, quantity, price, imageUrl, onPress}) => {
    // imageUrl => string | imagePath
    // quantity => int
    // price => float
    // lowStock => boolean
    // onPress => function
    // product_name => string


    // render ProductCard component
    return (
        <TouchableOpacity style={style.productCard} onPress={onPress}>
            {/* empty stock indicator */}
            { quantity === 0 && <View style={style.indicatorWrapper}>
                    <Indicator text={"Empty Stock"} type={"Cancelled"} />
                </View>}
            {/* low stock indicator */}
            { quantity !== 0 && quantity <= 3 && <View style={style.indicatorWrapper}>
                    <Indicator text={"Low Stock"} type={"Pending"} />
                </View>
            }
            {/* product image */}
            <View style={style.imageWrapper}>
                <Image 
                    style={style.productImage}
                    source={{uri: imageUrl}}
                />
            </View>
            {/* product details */}
            <View style={style.textWrapper}>
                <View style={style.productMainDetailsWrapper}>
                    <Text style={style.productName}>{product_name}</Text>
                    <Text style={style.quantity}>{quantity} <Text style={style.stock}>in stock</Text></Text>
                </View>
                {/* display price as a string with comma seperations */}
                <Text style={style.price}>₦{price?.toLocaleString()}</Text>
            </View>
        </TouchableOpacity>
    );
}

// stylesheet
const style = StyleSheet.create({
    productCard: {
        // minWidth: "40%",
        // maxWidth: "50%",
        width: "100%",
        height: 150,
        backgroundColor: white,
        borderRadius: 12,
        flex: 1,
        position: "relative",
    },
    indicatorWrapper: {
        position: "absolute",
        top: 8,
        right: 8,
        display: "flex",    
        alignItems: "center",
        justifyContent: "center",
        zIndex: 3,
    },
    imageWrapper: {
        height: 70,
        width: "100%",
        backgroundColor: secondaryColor,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
    },
    productImage: {
        width: "100%",
        height: "100%",
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        resizeMode: "cover",
    },
    textWrapper: {
        padding: 10,    
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        flex: 1,
    },
    productMainDetailsWrapper: {
        display: "flex",
        flexFlow: "column",
        flexWrap: "wrap",
    },  
    productName: {
        fontFamily: "mulish-semibold",
        color: black,
        fontSize: 12,
        flexWrap: "wrap",   
        width: "100%",
    },
    quantity: {
        fontFamily: "mulish-regular",
        color: black,
        fontSize: 10,
    },
    stock: {
        color: bodyText,
    },
    price: {
        fontFamily: "mulish-semibold",
        color: primaryColor,
        fontSize: 12,
    }
})
 
export default ProductCard;