import { 
    Text, 
    View, 
    TouchableOpacity, 
    StyleSheet,
    Image 
} from "react-native";
import { primaryColor } from "../style/globalStyleSheet";

const ProductCard = ({product_name, quantity, price, imageUrl, lowStock}) => {

    // console.log(index);

    return (
        <View style={style.productCard}>
            { quantity === 0 && <View style={style.emptyStockIndicator}>
                <Text style={style.emptyStock}>Empty Stock</Text>
            </View>}
            { quantity !== 0 && lowStock && <View style={style.lowStockIndicator}>
                   <Text style={style.lowStock}>Low Stock</Text>
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
        </View>
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
    lowStockIndicator: {
        position: "absolute",
        top: 8,
        right: 8,
        minHeight: 16,
        minWidth: 60,
        backgroundColor: "rgba(254, 240, 199, 1)",
        borderRadius: 20,
        display: "flex",    
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1,
    },
    lowStock: {
        fontFamily: "mulish-regular",
        fontSize: 8,
        color: "rgba(220, 104, 3, 1)",
    },
    emptyStockIndicator: {
        position: "absolute",
        top: 8,
        right: 8,
        minHeight: 16,
        minWidth: 60,
        backgroundColor: "rgba(254, 243, 242, 1)",
        borderRadius: 20,
        display: "flex",    
        alignItems: "center",
        justifyContent: "center",
        zIndex: 3,
    },
    emptyStock: {
        fontFamily: "mulish-regular",
        fontSize: 8,
        color: "rgba(180, 35, 24, 1)",
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