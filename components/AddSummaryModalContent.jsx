import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { primaryColor } from "../style/globalStyleSheet";
import InfoIconWhite from "../assets/icons/InfoIconWhite";

const AddSummaryModalContent = ({logistics, products, customerName, location, phoneNumber, price, address, waybillDetails, type}) => {

    const receivable = price ? price - location.charge : null;

    return (
        <View style={style.mainContainer}>
            <View style={style.listContainer}>
                <View style={style.detailsWrapper}>
                    {type === "order" && <>
                        <View>
                            <Text style={style.detailDescription}>Customer's Name</Text>
                            <Text style={style.detail}>{customerName}</Text>
                            <Text style={style.detailDescription}>Delivery Address</Text>
                            <Text style={style.detail}>{address}</Text>
                            <Text style={style.detailDescription}>Logistics</Text>
                            <Text style={style.detail}>{logistics.business_name}</Text>
                        </View>
                        <View style={style.rightAlignedText}>
                            <Text style={style.detailDescription}>Date</Text>
                            <Text style={style.detail}>{"20 Dec, 2023 10.04am"}</Text>
                            <Text style={style.detailDescription}>Phone Number</Text>
                            <Text style={style.detail}>{phoneNumber.join(", ")}</Text>
                        </View>
                    </>}
                    {type === "waybill" && <>
                        <View>
                            <Text style={style.detailDescription}>Logistics</Text>
                            <Text style={style.detail}>{logistics.business_name}</Text>
                            <Text style={style.detailDescription}>Waybill Details</Text>
                            <Text style={style.detail}>{waybillDetails}</Text>
                        </View>
                        <View style={style.rightAlignedText}>
                            <Text style={style.detailDescription}>Date</Text>
                            <Text style={style.detail}>{"20 Dec, 2023 10.04am"}</Text>
                        </View>
                    </>}
                </View>
                <View style={style.productHeadingWrapper}>
                    <Text style={style.productHeading}>Product Details</Text>
                </View>
                <View 
                    style={style.listWrapper}  
                >
                    {products.map(data => (
                        <View 
                            key={data.id}
                            style={style.listItemWrapper}
                        >

                            <View
                                style={style.list}
                            >   
                                <Image
                                    style={style.logisticsImage}
                                    source={data.imageUrl}
                                />
                                <Text style={style.listText}>{data.product_name}</Text>
                                <Text style={style.productQuantity}>Qty {data.quantity}</Text>
                            </View>
                        </View>
                    ))}
                </View>
                <View style={style.priceContainer}>
                    {type === "order" && <>
                        <View style={style.priceWrapper}>
                            <Text style={style.priceDescriptionText}>Price</Text>
                            <View style={style.deliveryFee}>
                                <Text style={style.priceDescriptionText}>
                                    Delivery Fee ({location.location})
                                </Text>
                                <TouchableOpacity>
                                    <InfoIconWhite />
                                </TouchableOpacity>
                            </View>
                            <Text style={style.priceDescriptionText}>Total Receivable</Text>
                        </View>
                        <View style={style.priceWrapper}>
                            <Text style={style.priceText}>₦{price.toLocaleString() }</Text>
                            <Text style={style.priceText}>-₦{location.charge.toLocaleString()}</Text>
                            <Text style={style.priceText}>₦{receivable.toLocaleString()}</Text>
                        </View>
                    </>}
                </View>
            </View>
            <View style={style.fixedButton}>
                <TouchableOpacity 
                    style={style.button}
                >
                    <Text style={style.buttonText}>Done</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const style = StyleSheet.create({
    mainContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        flex: 1,
    },  
    listContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
        flex: 1,
    },  
    detailsWrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 10,
        width: '100%',
        marginBottom: 30,
    },
    detailDescription: {
        fontFamily: "mulish-regular",
        fontSize: 10,
        color: "rgba(34, 34, 34, 0.6)",
    },
    detail: {
        fontFamily: "mulish-semibold",
        color: "rgba(34, 34, 34, 1)",
        fontSize: 10,
        flexWrap: "wrap",
        marginBottom: 10,
    },
    productHeadingWrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        width: '100%',
        alignItems: 'flex-start',
    },
    productHeading: {
        fontFamily: "mulish-semibold",
        fontSize: 10,
    },
    listWrapper: {
        width: '100%',
        backgroundColor: "#f8f8f8",
        borderTopRightRadius: 12,
        borderTopLeftRadius: 12,
        gap: 10,
        padding: 10,
    },
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
        fontFamily: "mulish-regular",
        color: "#5C5C5C",
    },
    listText: {
        fontFamily: "mulish-regular",
        fontSize: 12,
        flex: 1
    },
    priceContainer: {
        width: '100%',
        height: 86,
        backgroundColor: "#E66D1C",
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        gap: 10
    },
    priceWrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        height: '100%',
        justifyContent: 'space-between',
        gap: 10
    },
    priceText: {
        fontFamily: "mulish-bold",
        color: "#ffffff",
        fontSize: 10,
    },
    rightAlignedText: {
        display: 'flex',
        flexDirection:  'column',
        justifyContent: 'flex-start',
        height: '100%',
        alignItems: 'flex-end',
    },
    priceDescriptionText: {
        fontFamily: "mulish-regular",
        color: "#ffffff",
        fontSize: 10,
    },
    deliveryFee: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    button: {
        width: "100%",
        backgroundColor: primaryColor,
        height: 44,
        borderRadius: 12,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    }, 
    buttonText: {
        fontFamily: "mulish-semibold",
        color: "#ffffff",
        fontSize: 16,
    },
    fixedButton: {
        width: "100%",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#ffffff",
    }
})
 
export default AddSummaryModalContent;