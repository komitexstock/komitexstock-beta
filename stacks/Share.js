// react native components
import { View, TouchableWithoutFeedback, Text, ScrollView, StyleSheet } from "react-native";
// components
import SearchBar from "../components/SearchBar";
import Header from "../components/Header";
import OrderListItem from "../components/OrderListItem";
import CustomButton from "../components/CustomButton";
// colors
import { background, bodyText, white } from "../style/colors";
// react hooks
import { useState } from "react";

const Share = ({navigation}) => {

    // order list
    const [orders, setOrders] = useState([
        {
            name: "Richard Idana",
            location: "Warri",
            products: [
                { product_name: "Maybach Sunglasses", quantity: 2 },
            ],
            datetime: "2023-03-15 09:30",
            id: "abc123",
            price: 38000,
            status: "Delivered",
            imageUrl: require('../assets/images/komitex.png'),
            newMessage: true,
            navigateToChat: () => {
                navigation.navigate("Chat", {
                    id: "abc123",
                    type: "Order",
                    order: "Chat Message",
                    name: "Komitex",
                    imageUrl: require('../assets/images/komitex.png'),
                })
            },
            selected: false,
            time: 'recent',
        },
        {
            name: "Jane Smith",
            location: "London",
            products: [
                { product_name: "Shoes", quantity: 1 },
                { product_name: "Socks", quantity: 3 },
            ],
            datetime: "2023-02-22 14:45",
            id: "def456",
            price: 13000,
            status: "Pending",
            imageUrl: require('../assets/images/fedex.png'),
            newMessage: false,
            navigateToChat: () => {
                navigation.navigate("Chat", {
                    id: "def456",
                    type: "Order",
                    order: "Chat Message",
                    name: "Fedex",
                    imageUrl: require('../assets/images/fedex.png'),
                })
            },
            selected: false,
            time: 'recent',
        },
        {
            name: "Michael Johnson",
            location: "Los Angeles",
            products: [
                { product_name: "Hat", quantity: 1 },
            ],
            datetime: "2023-01-10 12:15",
            id: "ghi789",
            price: 14000,
            status: "Dispatched",
            imageUrl: require('../assets/images/komitex.png'),
            newMessage: true,
            navigateToChat: () => {
                navigation.navigate("Chat", {
                    id: "ghi789",
                    type: "Order",
                    order: "Chat Message",
                    name: "Komitex",
                    imageUrl: require('../assets/images/komitex.png'),
                })
            },
            selected: false,
            time: 'recent',
        },
        {
            name: "Robert Davis",
            location: "Berlin",
            products: [
                { product_name: "Sunglasses", quantity: 1 },
            ],
            datetime: "2023-03-01 11:10",
            id: "mno345",
            price: 16000,
            status: "Cancelled",
            imageUrl: require('../assets/images/dhl.png'),
            newMessage: true,
            navigateToChat: () => {
                navigation.navigate("Chat", {
                    id: "mno345",
                    type: "Order",
                    order: "Chat Message",
                    name: "Dhl",
                    imageUrl: require('../assets/images/dhl.png'),
                })
            },
            selected: false,
            time: 'recent',
        },
        {
            name: "Sophia Brown",
            location: "Tokyo",
            products: [
                { product_name: "T-Shirt", quantity: 3 },
            ],
            datetime: "2023-02-14 16:55",
            id: "pqr678",
            price: 12000,
            status: "Rescheduled",
            imageUrl: require('../assets/images/ups.png'),
            newMessage: false,
            navigateToChat: () => {
                navigation.navigate("Chat", {
                    id: "pqr678",
                    type: "Order",
                    order: "Chat Message",
                    name: "Ups",
                    imageUrl: require('../assets/images/ups.png'),
                })
            },
            selected: false,
            time: 'recent',
        },
        {
            name: "John Doe",
            location: "New York",
            products: [
                { product_name: "Shirt", quantity: 2 },
                { product_name: "Jeans", quantity: 1 },
            ],
            datetime: "2023-03-15 09:30",
            id: "abz123",
            price: 15000,
            status: "Delivered",
            imageUrl: require('../assets/images/komitex.png'),
            newMessage: true,
            navigateToChat: () => {
                navigation.navigate("Chat", {
                    id: "abc123",
                    type: "order",
                    order: "Chat Message",
                    name: "Komitex",
                    imageUrl: require('../assets/images/komitex.png'),
                })
            },
            selected: false,
            time: 'older',
        },
        {
            name: "Jane Smith",
            location: "London",
            products: [
                { product_name: "Shoes", quantity: 1 },
                { product_name: "Socks", quantity: 3 },
            ],
            datetime: "2023-02-22 14:45",
            id: "dzf456",
            price: 13000,
            status: "Pending",
            imageUrl: require('../assets/images/fedex.png'),
            newMessage: true,
            navigateToChat: () => {
                navigation.navigate("Chat", {
                    id: "def456",
                    type: "order",
                    order: "Chat Message",
                    name: "Fedex",
                    imageUrl: require('../assets/images/fedex.png'),
                })
            },
            selected: false,
            time: 'older',
        },
        {
            name: "Michael Johnson",
            location: "Los Angeles",
            products: [
                { product_name: "Hat", quantity: 1 },
            ],
            datetime: "2023-01-10 12:15",
            id: "gzi789",
            price: 14000,
            status: "Dispatched",
            imageUrl: require('../assets/images/komitex.png'),
            newMessage: true,
            navigateToChat: () => {
                navigation.navigate("Chat", {
                    id: "ghi789",
                    type: "order",
                    order: "Chat Message",
                    name: "Komitex",
                    imageUrl: require('../assets/images/komitex.png'),
                })
            },
            selected: false,
            time: 'older',
        },
        {
            name: "Robert Davis",
            location: "Berlin",
            products: [
                { product_name: "Sunglasses", quantity: 1 },
            ],
            datetime: "2023-03-01 11:10",
            id: "mxo345",
            price: 16000,
            status: "Cancelled",
            imageUrl: require('../assets/images/dhl.png'),
            newMessage: true,
            navigateToChat: () => {
                navigation.navigate("Chat", {
                    id: "mno345",
                    type: "order",
                    order: "Chat Message",
                    name: "Dhl",
                    imageUrl: require('../assets/images/dhl.png'),
                })
            },
            selected: false,
            time: 'older',
        },
        {
            name: "Sophia Brown",
            location: "Tokyo",
            products: [
                { product_name: "T-Shirt", quantity: 3 },
            ],
            datetime: "2023-02-14 16:55",
            id: "pkr678",
            price: 12000,
            status: "Rescheduled",
            imageUrl: require('../assets/images/ups.png'),
            newMessage: false,
            navigateToChat: () => {
                navigation.navigate("Chat", {
                    id: "pqr678",
                    type: "order",
                    order: "Chat Message",
                    name: "Ups",
                    imageUrl: require('../assets/images/ups.png'),
                })
            },
            selected: false,
            time: 'older',
        },
        {
            name: "Emily Wilson",
            location: "Paris",
            products: [
                { product_name: "Dress", quantity: 1 },
                { product_name: "Scarf", quantity: 2 },
            ],
            datetime: "2023-05-03 10:20",
            id: "ztu901",
            price: 25000,
            status: "Delivered",
            imageUrl: require('../assets/images/komitex.png'),
            newMessage: false,
            navigateToChat: () => {
                navigation.navigate("Chat", {
                    id: "stu901",
                    type: "order",
                    order: "Chat Message",
                    name: "Komitex",
                    imageUrl: require('../assets/images/komitex.png'),
                })
            },
            selected: false,
            time: 'older',
        },
        {
            name: "David Johnson",
            location: "New York",
            products: [
                { product_name: "Pants", quantity: 2 },
            ],
            datetime: "2023-04-01 09:45",
            id: "vwj234",
            price: 18000,
            status: "Pending",
            imageUrl: require('../assets/images/fedex.png'),
            newMessage: false,
            navigateToChat: () => {
                navigation.navigate("Chat", {
                    id: "vwx234",
                    type: "order",
                    order: "Chat Message",
                    name: "Fedex",
                    imageUrl: require('../assets/images/fedex.png'),
                })
            },
            selected: false,
            time: 'older',
        },
    ]);

    const [searchQuery, setSearchQuery] = useState("");

    const selectOrder = (id) => {
        setOrders(prevOrders => {
            return prevOrders.map(order => {
                return order.id === id ? {...order, selected: !order.selected} : order
            })
        })
    } 

    // share screen
    return (
        <>
            <TouchableWithoutFeedback>
                <ScrollView style={style.container} showsHorizontalScrollIndicator={false}>
                    <View 
                        style={[
                            style.mainWrapper,
                            orders.filter(order => order.selected).length > 0 && {marginBottom: 100}
                        ]}
                    >
                        <Header
                            stackName={"Send to"}
                            inlineArrow={true}
                            removeBackArrow={true}
                            unpadded={true}
                            navigation={navigation}
                        />
                        <SearchBar 
                            backgroundColor={white}
                            placeholder={"Search order"}
                            searchQuery={searchQuery}
                            setSearchQuery={setSearchQuery}
                        />
                        <View style={style.titleWrapper}>
                            <Text style={style.heading}>Recent</Text>
                        </View>
                        <View style={style.ordersWrapper}>
                            {/* order list max 5 items */}
                            {orders.map((order) => {
                                return order.time === 'recent' && (
                                    <OrderListItem
                                        key={order.id}
                                        item={order}
                                        selectable={true}
                                        selected={order.selected}
                                        selectFunction={selectOrder}  
                                    />
                                )
                            })}
                        </View>
                        <View style={style.titleWrapper}>
                            <Text style={style.heading}>Others</Text>
                        </View>
                        <View style={style.ordersWrapper}>
                            {/* order list max 5 items */}
                            {orders.map((order) => {
                                return order.time === 'older' && (
                                    <OrderListItem
                                        key={order.id}
                                        item={order}
                                        selectable={true}
                                        selected={order.selected}
                                        selectFunction={selectOrder}  
                                    />
                                )
                            })}
                        </View>
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
            {/* show send button only if an order has been selected */}
            {orders.filter(order => order.selected).length > 0 && (
                <CustomButton 
                    name={`Send (${orders.filter(order => order.selected).length})`} 
                    onPress={() => {}}
                    backgroundColor={white}
                    inactive={false}
                    fixed={true}
                />
            )}
        </>

    );
}

const style = StyleSheet.create({
    container: {
        width: "100%",
        eight: "100%",
        backgroundColor: background,
        paddingHorizontal: 20,
        paddingBottom: 150,
    },
    ordersWrapper: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: white,
        gap: 10,
        paddingVertical: 5,
        borderRadius: 12,
        marginBottom: 24,
    },
    titleWrapper: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%',
        marginBottom: 12,
    },
    heading: {
        color: bodyText,
        fontFamily: 'mulish-bold',
        fontSize: 10,
    }
})
 
export default Share;