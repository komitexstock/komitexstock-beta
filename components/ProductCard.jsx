import { 
    Text, 
    View, 
    TouchableOpacity, 
    StyleSheet,
    Image 
} from "react-native";
import { primaryColor } from "../style/globalStyleSheet";
import Indicator from '../components/Indicator'

const ProductCard = ({product_name, quantity, price, imageUrl, lowStock, onPress}) => {

    // console.log(index);

    return (
        <TouchableOpacity style={style.productCard} onPress={onPress}>
            { quantity === 0 && <View style={style.indicatorWrapper}>
                <Indicator text={"Empty Stock"} type={"Cancelled"} />
            </View>}
            { quantity !== 0 && lowStock && <View style={style.indicatorWrapper}>
                <Indicator text={"Low Stock"} type={"Pending"} />
                </View>
            }
            <View style={style.imageWrapper}>
                <Image 
                    style={style.productImage}
                    source={imageUrl}
                />
            </View>
            <View style={style.textWrapper}>
                <View style={style.productMainDetailsWrapper}>
                    <Text style={style.productName}>{product_name}</Text>
                    <Text style={style.quantity}>{quantity} <Text style={style.stock}>in stock</Text></Text>
                </View>
                <Text style={style.price}>₦{price.toLocaleString()}</Text>
            </View>
        </TouchableOpacity>
    );
}

const style = StyleSheet.create({
    productCard: {
        minWidth: "40%",
        maxWidth: "50%",
        height: 150,
        backgroundColor: "#ffffff",
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
        backgroundColor: "rgba(7, 66, 124, 0.05)",
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
    },
    productImage: {
        width: "100%",
        height: "100%",
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        resizeMode: "contain",
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
        color: "#222222",
        fontSize: 12,
        flexWrap: "wrap",   
        width: "100%",
    },
    quantity: {
        fontFamily: "mulish-regular",
        color: "#222222",
        fontSize: 10,
    },
    stock: {
        color: "rgba(34, 34, 34, 0.6)",
    },
    price: {
        fontFamily: "mulish-semibold",
        color: primaryColor,
        fontSize: 12,
    }
})
 
export default ProductCard;