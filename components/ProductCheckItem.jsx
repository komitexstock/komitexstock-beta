// react native components
import { View, TouchableOpacity, Image, Text, StyleSheet } from "react-native";
// expo checkbox components
import CheckBox from 'expo-checkbox';
// colors
import { primaryColor, inputBorder, checkBoxBorder, black } from "../style/colors";

const ProductCheckItem = ({data, onPress}) => {
    return (
        <View style={style.listItemWrapper}>
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
                color={data.checked ? primaryColor : undefined}
                style={style.checkBox}
                onValueChange={() => onPress(data.id)}
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
        borderBottomColor: inputBorder,
        borderBottomWidth: 1,
    },
    list: {
        height: 50,
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