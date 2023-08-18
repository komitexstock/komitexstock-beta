// react native components
import { View, Image, Text, StyleSheet } from "react-native";
// colors
import { black } from "../style/colors";


const ProductListSummary = ({product_name, quantity, imageUrl}) => {
    return (
        <View 
            style={style.listItemWrapper}
        >
            <View
                style={style.list}
            >   
                <Image
                    style={style.logisticsImage}
                    source={imageUrl}
                />
                <Text style={style.listText}>{product_name}</Text>
                <Text style={style.productQuantity}>Qty {quantity}</Text>
            </View>
        </View>
    );
}

const style = StyleSheet.create({
    
    listItemWrapper: {
        display: 'flex',
        flexDirection: "row",
        width: '100%',
        alignItems: 'center',
    },
    list: {
        height: 40,
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 10,
    },
    logisticsImage: {
        width: 40,
        height: 40,
        borderRadius: 6,
    },
    productQuantity: {
        fontSize: 10,
        fontFamily: "mulish-semibold",
        color: black,
    },
    listText: {
        fontFamily: "mulish-regular",
        fontSize: 12,
        flex: 1,
        color: black,
    },
})
 
export default ProductListSummary;