// react native components
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
//  components
import CheckBox from "./CheckBox";
import Avatar from "./Avatar";
// colors
import { listSeparator, checkBoxBorder, black } from "../style/colors";

const ProductCheckItem = ({productImage, productName, onPress, checked, unpadded}) => {
    return (
        <View style={[style.listItemWrapper, unpadded && {paddingRight: 0}]}>
            {/* product */}
            <TouchableOpacity
                style={style.list}
                onPress={onPress}
            >   
                <Avatar 
                    fullname={productName}
                    imageUrl={productImage}
                    squared={true}
                    diameter={30}
                />
                <Text style={style.listText}>{productName}</Text>
            </TouchableOpacity>
            {/* checkbox */}
            <CheckBox      
                value={checked}
                onPress={onPress}
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
        textTransform: 'capitalize',
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