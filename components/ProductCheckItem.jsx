// react native components
import { View, TouchableOpacity, Image, Text, StyleSheet } from "react-native";
//  components
import CheckBox from "./CheckBox";
// colors
import { primaryColor, listSeparator, checkBoxBorder, black } from "../style/colors";

const ProductCheckItem = ({data, onPress, unpadded}) => {
    return (
        <View style={[style.listItemWrapper, unpadded && {paddingRight: 0}]}>
            {/* product */}
            <TouchableOpacity
                style={style.list}
                onPress={() => onPress(data.id)}
            >   
                {/* product image */}
                <Image
                    style={style.logisticsImage}
                    source={data.imageUrl}
                />
                <Text style={style.listText}>{data.product_name}</Text>
            </TouchableOpacity>
            {/* checkbox */}
            <CheckBox      
                value={data.checked}
                onPress={() => onPress(data.id)}
            />
        </View>
    );
}

const style = StyleSheet.create({
    listItemWrapper: {
        display: 'flex',
        flexDirection: "row",
        width: '100%',
        alignItems: 'center',
        borderBottomColor: listSeparator,
        borderBottomWidth: 1,
        paddingVertical: 6,
        paddingRight: 12,
        height: 42,
        marginBottom: 10,
    },
    list: {
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 10,
    },
    logisticsImage: {
        width: 30,
        height: 30,
        borderRadius: 6,
    },
    listText: {
        fontFamily: "mulish-medium",
        fontSize: 12,
        flex: 1,
        color: black,
    },
    checkBox: {
        width: 16,
        height: 16,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: checkBoxBorder,
    },
})
 
export default ProductCheckItem;