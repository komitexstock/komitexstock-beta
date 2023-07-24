// react native components
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
// colors
import { accent, background, black, bodyText, primaryColor, white } from "../style/colors";
// icons
import InfoIconWhite from "../assets/icons/InfoIconWhite";
// components
import ModalButton from "../components/ModalButton";
// bottomsheet component
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";

const AddSummaryModalContent = ({logistics, products, customerName, location, phoneNumber, price, address, waybillDetails, shipperLocation, receiverLocation, type, onPress}) => {
    // logisitcs => object | business_name(string), company_id(string), verified(boolean), imageUrl
    // products => array of object | product_name, quantity
    // customerName, location, address, waybillDetails, shipperLocation, receiverLocation => string
    // phoneNumber => array 
    // price => float
    // tyep => string | order or waybill

    // amount receivable for merchants
    const receivable = price ? price - location.charge : null;

    // total quantity
    const totalQuantity = products.reduce((accumulator, product) => accumulator + product.quantity, 0);

    return (
        <View style={style.mainContainer}>
            <View style={style.listContainer}>
                <View style={style.detailsWrapper}>
                    {/* order summary */}
                    {type === "order" && <>
                        <View style={style.leftAlignedText}>
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
                            <Text style={style.detailDescription}>Merchant</Text>
                            <Text style={style.detail}>{"Mega Enterprise Ltd"}</Text>
                        </View>
                    </>}
                    {/* wabill summary */}
                    {type === "waybill" && <>
                        <View style={style.leftAlignedText}>
                            <Text style={style.detailDescription}>Waybill Details</Text>
                            <Text style={style.detail}>{waybillDetails}</Text>
                            <Text style={style.detailDescription}>Shipper's Location</Text>
                            <Text style={style.detail}>{shipperLocation}</Text>
                        </View>
                        <View style={style.rightAlignedText}>
                            <Text style={style.detailDescription}>Date</Text>
                            <Text style={style.detail}>{"20 Dec, 2023 10.04am"}</Text>
                            <Text style={style.detailDescription}>Logistics</Text>
                            <Text style={style.detail}>{logistics.business_name}</Text>
                            <Text style={style.detailDescription}>Receiver's Location</Text>
                            <Text style={style.detail}>{receiverLocation}</Text>
                        </View>
                    </>}
                </View>
                <View style={style.productHeadingWrapper}>
                    <Text style={style.productHeading}>Product Details</Text>
                </View>
                <View 
                    style={style.listWrapper}  
                >   
                    {/* list of products */}
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
                    {/* total quantity and price */}
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

                    {type === "waybill" && <>
                        <View style={style.totalWrapper}>
                            <Text style={style.totalText}>Total Quantity</Text>
                            <Text style={style.totalText}>{totalQuantity}</Text>
                        </View>
                    </>}
                </View>
            </View>
            { type === "order" ? (
                <ModalButton 
                    name={"Confirm Order"}
                    onPress={onPress}
                />
            ) : (
                <ModalButton 
                    name={"Confirm Waybill"}
                    onPress={onPress}
                />
            )}
        </View>
    );
}

// stylesheet
const style = StyleSheet.create({
    mainContainer: {
        height: '100%',
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
        color: bodyText,
    },
    detail: {
        fontFamily: "mulish-semibold",
        color: black,
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
        color: bodyText,
    },
    listWrapper: {
        width: '100%',
        backgroundColor: background,
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
        fontFamily: "mulish-semibold",
        color: black,
    },
    listText: {
        fontFamily: "mulish-regular",
        fontSize: 12,
        flex: 1,
        color: black,
    },
    priceContainer: {
        width: '100%',
        maxHeight: 90,
        minHeight: 40,
        backgroundColor: accent,
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
        color: white,
        fontSize: 10,
    },
    leftAlignedText: {
        display: 'flex',
        flexDirection:  'column',
        justifyContent: 'flex-start',
        height: '100%',
        width: '50%',
        alignItems: 'flex-start',
    },
    rightAlignedText: {
        width: '50%',
        display: 'flex',
        flexDirection:  'column',
        justifyContent: 'flex-start',
        height: '100%',
        alignItems: 'flex-end',
    },
    priceDescriptionText: {
        fontFamily: "mulish-semibold",
        color: white,
        fontSize: 10,
    },
    deliveryFee: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    totalWrapper: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    totalText: {
        fontFamily: "mulish-semibold",
        color: white,
        fontSize: 12,
    }
})
 
export default AddSummaryModalContent;