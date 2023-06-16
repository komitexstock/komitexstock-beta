import { 
    View, 
    Text, 
    FlatList, 
    TouchableOpacity, 
    TouchableWithoutFeedback,
    StyleSheet
} from "react-native";
import MenuIcon from "../assets/icons/MenuIcon";
import { primaryColor } from "../style/globalStyleSheet";
import StatWrapper from "../components/StatWrapper";
import StatCard from "../components/StatCard";
import { useState } from "react";
import SearchIcon from '../assets/icons/SearchIcon'
import FilterIcon from '../assets/icons/FilterIcon';
import Order from "../components/Order";

const Orders = ({navigation}) => {

    const [stats, setStats] = useState([
        {
            id: 1,
            title: "Total Earnings",
            presentValue: 200000,
            oldValue: 185500,
            decimal: true,
            reversedLogic: false
        },
        {
            id: 2,
            title: "Total Orders",
            presentValue: 40,
            oldValue: 36,
            decimal: false,
            reversedLogic: false
        },
        {
            id: 3,
            title: "Total Delivered",
            presentValue: 29,
            oldValue: 33,
            decimal: false,
            reversedLogic: false
        },
        {
            id: 4,
            title: "Total Cancelled",
            presentValue: 1,
            oldValue: 3,
            decimal: false,
            reversedLogic: true
        },
    ]);

    const orderList = [
        {
            name: "John Doe",
            location: "New York",
            products: [
                { product_name: "Shirt", quantity: 2 },
                { product_name: "Jeans", quantity: 1 },
            ],
            datetime: "2023-03-15 09:30",
            id: "abc123",
            price: 15000,
            status: "Delivered",
            imageUrl: require('../assets/images/komitex.png'),
            navigateToChat: () => {
                navigation.navigate("Chat", {
                    id: "abc123",
                    type: "order",
                    order: "Chat Message",
                    name: "Komitex",
                    imageUrl: require('../assets/images/komitex.png'),
                })
            },
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
            navigateToChat: () => {
                navigation.navigate("Chat", {
                    id: "def456",
                    type: "order",
                    order: "Chat Message",
                    name: "Fedex",
                    imageUrl: require('../assets/images/fedex.png'),
                })
            },
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
            navigateToChat: () => {
                navigation.navigate("Chat", {
                    id: "ghi789",
                    type: "order",
                    order: "Chat Message",
                    name: "Komitex",
                    imageUrl: require('../assets/images/komitex.png'),
                })
            },
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
            navigateToChat: () => {
                navigation.navigate("Chat", {
                    id: "mno345",
                    type: "order",
                    order: "Chat Message",
                    name: "Dhl",
                    imageUrl: require('../assets/images/dhl.png'),
                })
            },
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
            navigateToChat: () => {
                navigation.navigate("Chat", {
                    id: "pqr678",
                    type: "order",
                    order: "Chat Message",
                    name: "Ups",
                    imageUrl: require('../assets/images/ups.png'),
                })
            },
        },
        {
            name: "Emily Wilson",
            location: "Paris",
            products: [
                { product_name: "Dress", quantity: 1 },
                { product_name: "Scarf", quantity: 2 },
            ],
            datetime: "2023-05-03 10:20",
            id: "stu901",
            price: 25000,
            status: "Delivered",
            imageUrl: require('../assets/images/komitex.png'),
            navigateToChat: () => {
                navigation.navigate("Chat", {
                    id: "stu901",
                    type: "order",
                    order: "Chat Message",
                    name: "Komitex",
                    imageUrl: require('../assets/images/komitex.png'),
                })
            },
        },
        {
            name: "David Johnson",
            location: "New York",
            products: [
                { product_name: "Pants", quantity: 2 },
            ],
            datetime: "2023-04-01 09:45",
            id: "vwx234",
            price: 18000,
            status: "Pending",
            imageUrl: require('../assets/images/fedex.png'),
            navigateToChat: () => {
                navigation.navigate("Chat", {
                    id: "vwx234",
                    type: "order",
                    order: "Chat Message",
                    name: "Fedex",
                    imageUrl: require('../assets/images/fedex.png'),
                })
            },
        },
        {
            name: "Olivia Taylor",
            location: "London",
            products: [
                { product_name: "Sweater", quantity: 1 },
            ],
            datetime: "2023-05-21 15:30",
            id: "yz0123",
            price: 19000,
            status: "Dispatched",
            imageUrl: require('../assets/images/komitex.png'),
            navigateToChat: () => {
                navigation.navigate("Chat", {
                    id: "yz0123",
                    type: "order",
                    order: "Chat Message",
                    name: "Komitex",
                    imageUrl: require('../assets/images/komitex.png'),
                })
            },
        },
        {
            name: "Ethan Wilson",
            location: "Los Angeles",
            products: [
                { product_name: "Jacket", quantity: 1 },
            ],
            datetime: "2023-04-11 13:20",
            id: "bcd345",
            price: 22000,
            status: "Cancelled",
            imageUrl: require('../assets/images/dhl.png'),
            navigateToChat: () => {
                navigation.navigate("Chat", {
                    id: "bcd345",
                    type: "order",
                    order: "Chat Message",
                    name: "Dhl",
                    imageUrl: require('../assets/images/dhl.png'),
                })
            },
        },
        {
            name: "Emma Davis",
            location: "Berlin",
            products: [
                { product_name: "Watch", quantity: 1 },
            ],
            datetime: "2023-05-07 10:50",
            id: "efg567",
            price: 28000,
            status: "Delivered",
            imageUrl: require('../assets/images/ups.png'),
            navigateToChat: () => {
                navigation.navigate("Chat", {
                    id: "efg567",
                    type: "order",
                    order: "Chat Message",
                    name: "Ups",
                    imageUrl: require('../assets/images/ups.png'),
                })
            },
        },
        {
            name: "William Smith",
            location: "Tokyo",
            products: [
                { product_name: "Trousers", quantity: 2 },
            ],
            datetime: "2023-04-25 16:15",
            id: "ghi678",
            price: 20000,
            status: "Rescheduled",
            imageUrl: require('../assets/images/komitex.png'),
            navigateToChat: () => {
                navigation.navigate("Chat", {
                    id: "ghi678",
                    type: "order",
                    order: "Chat Message",
                    name: "Komitex",
                    imageUrl: require('../assets/images/komitex.png'),
                })
            },
        },
        {
            name: "Isabella Johnson",
            location: "Paris",
            products: [
                { product_name: "Blouse", quantity: 1 },
                { product_name: "Skirt", quantity: 1 },
            ],
            datetime: "2023-06-01 11:30",
            id: "jkl901",
            price: 30000,
            status: "Pending",
            imageUrl: require('../assets/images/fedex.png'),
            navigateToChat: () => {
                navigation.navigate("Chat", {
                    id: "jkl901",
                    type: "order",
                    order: "Chat Message",
                    name: "Fedex",
                    imageUrl: require('../assets/images/fedex.png'),
                })
            },
        },
        {
            name: "Mia Taylor",
            location: "London",
            products: [
                { product_name: "Coat", quantity: 1 },
            ],
            datetime: "2023-05-17 14:50",
            id: "mno234",
            price: 26000,
            status: "Dispatched",
            imageUrl: require('../assets/images/komitex.png'),
            navigateToChat: () => {
                navigation.navigate("Chat", {
                    id: "mno234",
                    type: "order",
                    order: "Chat Message",
                    name: "Komitex",
                    imageUrl: require('../assets/images/komitex.png'),
                })
            },
        },
        {
            name: "James Brown",
            location: "Los Angeles",
            products: [
                { product_name: "Gloves", quantity: 1 },
            ],
            datetime: "2023-04-05 12:05",
            id: "pqr345",
            price: 23000,
            status: "Cancelled",
            imageUrl: require('../assets/images/dhl.png'),
            navigateToChat: () => {
                navigation.navigate("Chat", {
                    id: "pqr345",
                    type: "order",
                    order: "Chat Message",
                    name: "Dhl",
                    imageUrl: require('../assets/images/dhl.png'),
                })
            },
        },
        {
            name: "Alexander Davis",
            location: "Berlin",
            products: [
                { product_name: "Belt", quantity: 1 },
            ],
            datetime: "2023-06-03 09:40",
            id: "stu567",
            price: 32000,
            status: "Delivered",
            imageUrl: require('../assets/images/ups.png'),
            navigateToChat: () => {
                navigation.navigate("Chat", {
                    id: "stu567",
                    type: "order",
                    order: "Chat Message",
                    name: "Ups",
                    imageUrl: require('../assets/images/ups.png'),
                })
            },
        },
        {
            name: "Charlotte Wilson",
            location: "Tokyo",
            products: [
                { product_name: "Sweatshirt", quantity: 1 },
            ],
            datetime: "2023-05-11 15:55",
            id: "vwx678",
            price: 24000,
            status: "Rescheduled",
            imageUrl: require('../assets/images/komitex.png'),
            navigateToChat: () => {
                navigation.navigate("Chat", {
                    id: "vwx678",
                    type: "order",
                    order: "Chat Message",
                    name: "Komitex",
                    imageUrl: require('../assets/images/komitex.png'),
                })
            },
        },
        {
            name: "Henry Johnson",
            location: "Paris",
            products: [
                { product_name: "Jeans", quantity: 1 },
                { product_name: "T-Shirt", quantity: 2 },
            ],
            datetime: "2023-06-09 11:15",
            id: "yz0124",
            price: 35000,
            status: "Pending",
            imageUrl: require('../assets/images/fedex.png'),
            navigateToChat: () => {
                navigation.navigate("Chat", {
                    id: "yz0124",
                    type: "order",
                    order: "Chat Message",
                    name: "Fedex",
                    imageUrl: require('../assets/images/fedex.png'),
                })
            },
        },
        {
            name: "Amelia Taylor",
            location: "London",
            products: [
                { product_name: "Shirt", quantity: 1 },
            ],
            datetime: "2023-05-26 16:40",
            id: "bcd456",
            price: 27000,
            status: "Dispatched",
            imageUrl: require('../assets/images/komitex.png'),
            navigateToChat: () => {
                navigation.navigate("Chat", {
                    id: "bcd456",
                    type: "order",
                    order: "Chat Message",
                    name: "Komitex",
                    imageUrl: require('../assets/images/komitex.png'),
                })
            },
        },
        {
            name: "Benjamin Davis",
            location: "Los Angeles",
            products: [
                { product_name: "Socks", quantity: 2 },
            ],
            datetime: "2023-04-15 11:55",
            id: "efg789",
            price: 30000,
            status: "Cancelled",
            imageUrl: require('../assets/images/dhl.png'),
            navigateToChat: () => {
                navigation.navigate("Chat", {
                    id: "efg789",
                    type: "order",
                    order: "Chat Message",
                    name: "Dhl",
                    imageUrl: require('../assets/images/dhl.png'),
                })
            },
        },
        {
            name: "Victoria Smith",
            location: "Berlin",
            products: [
                { product_name: "Sunglasses", quantity: 1 },
            ],
            datetime: "2023-06-13 10:25",
            id: "ghi901",
            price: 38000,
            status: "Delivered",
            imageUrl: require('../assets/images/ups.png'),
            navigateToChat: () => {
                navigation.navigate("Chat", {
                    id: "ghi901",
                    type: "order",
                    order: "Chat Message",
                    name: "Ups",
                    imageUrl: require('../assets/images/ups.png'),
                })
            },
        },
    ];


    return (
        <TouchableWithoutFeedback style={{flex: 1}}>
            <View style={style.main}>
                <FlatList 
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={
                        <View style={style.headerWrapper}>
                            <View style={style.header}>
                                <Text style={style.headerText}>Orders</Text>
                                <TouchableOpacity style={style.menuIcon}>
                                    <MenuIcon />
                                </TouchableOpacity>
                            </View>
                            <StatWrapper>
                                {stats.map(stat => (
                                    <StatCard
                                        key={stat.id}
                                        title={stat.title}
                                        presentValue={stat.presentValue}
                                        oldValue={stat.oldValue}
                                        decimal={stat.decimal}
                                    />
                                ))}
                            </StatWrapper>
                            <TouchableOpacity 
                                style={style.sendOrderButton}
                                onPress={() => navigation.navigate("SendOrder")}
                            >
                                <Text style={style.orderButtonText}>Send an Order</Text>
                            </TouchableOpacity>
                            <View style={style.recentOrderHeading}>
                                <Text style={style.recentOrderHeadingText}>Recent Orders</Text>
                                <View style={style.actionWrapper}>
                                    <TouchableOpacity style={style.menuIcon}>
                                        <SearchIcon />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={style.menuIcon}>
                                        <FilterIcon />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    }
                    style={style.listWrapper}
                    keyExtractor={item => item.id}
                    data={orderList}
                    renderItem={({ item, index }) => (
                        <Order item={item} index={index} length={orderList.length} />
                    )}
                />
            </View>
        </TouchableWithoutFeedback>
    );
}

const style = StyleSheet.create({
    main: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: "#f8f8f8",
        minheight: "100%",
        alignItems: 'center',
        display: 'flex',
        flexDirection:  'column',
        justifyContent: 'flex-start',
        width: "100%",
        paddingBottom: 90
    },
    listWrapper: {
        width: "100%",
        height: "100%",
    },
    headerWrapper: {
        width: "100%",
    },
    header: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        height: 50,
    },
    headerText: {
        fontFamily: "mulish-bold",
        fontSize: 20,
    },
    menuIcon: {
        width: 24,
        height: 24,
        backgroundColor: "#ffffff",
        borderRadius: 6,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    sendOrderButton: {
        height: 44,
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: 'center',
        backgroundColor: "rgba(7, 66, 124, 0.05)",
        borderRadius: 12,
        marginVertical: 22,
    },
    orderButtonText: {
        fontFamily: "mulish-semibold",
        fontSize: 16,
        color: primaryColor,
    },
    recentOrderHeading: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        height: 24,
        marginTop: 8,
        marginBottom: 20,
    },
    recentOrderHeadingText: {
        fontFamily: "mulish-bold",
        color: "rgba(34, 34, 34, 0.6)",
        fontSize: 10,
    },
    actionWrapper: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
    }
})
 
export default Orders;