// react native components
import { TouchableOpacity, Image, View, Text, StyleSheet } from 'react-native';
// colors
import { black, bodyText, white } from '../style/colors';
// helpers
import { windowWidth } from '../utils/helpers';
// components
import Mark from './Mark';
import Avatar from './Avatar';

// product list item that shows up in search results
const ProductListItem = ({product_name, quantity, price, imageUrl, onPress, searchQuery}) => {
    // product_name => string
    // quantity => int
    // price => float
    // imageUrl => string | pathToImage
    // onPress => function

    const highlightSearchtext = (text) => {
        if (!searchQuery) return text;

        const searchIndex = text.toLowerCase().indexOf(searchQuery.toLowerCase());

        if (searchIndex !== -1) {
            let textArray = text.toLowerCase().split(searchQuery.toLowerCase());
            const fullString = textArray.join(`%!#${searchQuery}%!#`)

            textArray = fullString.split('%!#');
            // console.log(textArray);

            return textArray.map((text, index) => {
                if (index % 2 === 0) {
                    return (
                        <Text 
                            key={index} 
                            style={index === 0 && {textTransform: 'capitalize'}}
                            >
                            {text}
                        </Text>
                    ) 
                } else {
                    return (
                        <Text
                            key={index}
                            style={textArray[0] === "" && index === 1 && {textTransform: 'capitalize'}}
                        >
                            <Mark key={index}>{text.toLowerCase()}</Mark>
                        </Text>
                    )
                }
            })
        } else {
            return text
        }
    }

    // render ProductListItem component
    return (
        <TouchableOpacity 
            style={[
                style.orderWrapper, 
            ]}
            // on press open edit product bottomsheet
            onPress={onPress}
        >
            {/* product image */}
            <Avatar 
                imageUrl={imageUrl}
                squared={true}
            />
            {/* product information */}
            <View style={style.orderInfo}>
                <Text style={style.orderMainText}>
                    {highlightSearchtext(product_name)}
                </Text>
                <Text style={style.orderSubText}>
                    {quantity} &nbsp;
                    <Text style={style.decimal}>
                        in stock
                    </Text>
                </Text>
            </View>
            <View style={style.orderPriceContainer}>
                  <Text style={style.orderPrice}>
                    ₦{price.toLocaleString()}.<Text style={style.decimal}>00</Text>
                </Text>
            </View>
        </TouchableOpacity>
    );
}

// stylesheet
const style = StyleSheet.create({
    orderWrapper: {
        padding: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: "100%",
        minHeight: 60,
        gap: 10,
        backgroundColor: white,
        paddingVertical: 15,
    },
    orderImage: {
        width: 40,
        height: 40,
        borderRadius: 8,
    },
    orderInfo: {
        width: windowWidth - 194,
    },
    orderMainText: {
        fontFamily: 'mulish-regular',
        fontSize: 12,
        color: black,
        marginBottom: 4,
    },
    orderSubText: {
        fontFamily: 'mulish-regular',
        fontSize: 10,
        color: black,
    },
    orderPrice: {
        fontFamily: 'mulish-semibold',
        fontSize: 12,
    },
    decimal: {
        color: bodyText,
    },
    orderPriceContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: 5,
        alignItems: 'flex-end',
        justifyContent: 'center',
        width: 70,
    },
})
 
export default ProductListItem;
