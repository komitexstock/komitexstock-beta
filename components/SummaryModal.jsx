// react native components
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
// colors
import { accent, background, black, bodyText, white } from "../style/colors";
// icons
import InfoIconWhite from "../assets/icons/InfoIconWhite";
// components
import MerchantProduct from "./MerchantProduct";
import CustomButton from "./CustomButton";
// bottomsheet components
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
// import moment to handle time
import moment from "moment";


const SummaryModal = ({selectedLogistics, selectedMerchant, selectedProducts, customerName, location, phoneNumber, price, address, waybillDetails, selectedWarehouse, type, onPress, isLoading}) => {
    // logisitcs => object | business_name(string), company_id(string), verified(boolean), imageUrl
    // selectedProducts => array of object | product_name, quantity
    // customerName, location, address, waybillDetails, shipperLocation, receiverLocation => string
    // phoneNumber => array 
    // price => float
    // tyep => string | order or waybill

    // amount receivable for merchants
    const receivable = price ? price - location.charge : null;

    // today
    const today = new Date(); // Replace this with your date

    const formattedDate = moment(today).format("DD MMM, YYYY h:mm a")

    // total quantity
    const totalQuantity = selectedProducts.reduce((accumulator, product) => accumulator + product.quantity, 0);

    return (<>
        <BottomSheetScrollView 
            showsVerticalScrollIndicator={false} 
            style={style.container}
            contentContainerStyle={style.mainContainer}
        >
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
                            <Text style={style.detail}>{selectedLogistics}</Text>
                        </View>
                        <View style={style.rightAlignedText}>
                            <Text style={style.detailDescription}>Date</Text>
                            <Text style={style.detail}>{formattedDate}</Text>
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
                            <Text style={style.detailDescription}>Warehouse</Text>
                            <Text style={[style.detail, {textTransform: "capitalize"}]}>{selectedWarehouse}</Text>
                        </View>
                        <View style={style.rightAlignedText}>
                            <Text style={style.detailDescription}>Date</Text>
                            <Text style={style.detail}>{formattedDate}</Text>
                            {selectedLogistics && <>
                                <Text style={style.detailDescription}>Logistics</Text>
                                <Text style={[style.detail, {textTransform: "capitalize"}]}>{selectedLogistics}</Text>
                            </>}
                            {selectedMerchant && <>
                                <Text style={style.detailDescription}>Merchant</Text>
                                <Text style={[style.detail, {textTransform: "capitalize"}]}>{selectedMerchant}</Text>
                            </>}
                        </View>
                    </>}
                </View>
                <View style={style.productHeadingWrapper}>
                    <Text style={style.productHeading}>Product Details</Text>
                </View>
                <View 
                    style={style.listWrapper}  
                >   
                    {/* list of selectedProducts */}
                    {selectedProducts.map(data => (
                        <MerchantProduct
                            key={data.id}
                            productName={data.product_name}
                            quantity={data.quantity}
                            imageUrl={data?.product_image}
                            summary={true}
                            containerStyle={{
                                backgroundColor: background, 
                                height: 63,
                                gap: 0, 
                            }}
                        />
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
        </BottomSheetScrollView>
        <CustomButton
            name={type === "order" ? "Confirm Order" : "Confirm Waybill"}
            shrinkWrapper={true}
            onPress={onPress}
            unpadded={true}
            isLoading={isLoading}
        />
    </>);
}

// stylesheet
const style = StyleSheet.create({
    container: {
        width: '100%',
    },
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
        fontFamily: "mulish-bold",
        fontSize: 12,
        color: bodyText,
        marginBottom: 12,
    },
    listWrapper: {
        width: '100%',
        backgroundColor: background,
        borderTopRightRadius: 12,
        borderTopLeftRadius: 12,
        padding: 10,
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
        flexGrow: 1,
        alignItems: 'flex-start',
    },
    rightAlignedText: {
        display: 'flex',
        flexDirection:  'column',
        justifyContent: 'flex-start',
        height: '100%',
        flexGrow: 1,
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

export default SummaryModal;