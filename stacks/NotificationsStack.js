import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import ArrowLeft from "../assets/icons/ArrowLeft";
import FilterIcon from "../assets/icons/FilterIcon";
import Orders from "../components/Orders";
import FilterNotifications from "../BottomSheets/FilterNotifications";
import { useRef } from "react";
import { useState } from "react";
import { ScrollView } from "react-native";

const NotificationsStack = ({navigation}) => {

    const orders = [
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
          status: "Canceled",
        },
    ];

    const orders1 = [
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
        },
        {
          name: "Sarah Johnson",
          location: "Chicago",
          products: [
            { product_name: "Tennis Shoes", quantity: 1 },
          ],
          datetime: "2023-06-01 11:20",
          id: "789def",
          price: 15500,
          status: "Delivered",
        },
        {
          name: "Matthew Wilson",
          location: "Sydney",
          products: [
            { product_name: "Backpack", quantity: 1 },
            { product_name: "Water Bottle", quantity: 1 },
          ],
          datetime: "2023-05-20 14:30",
          id: "012ghi",
          price: 17000,
          status: "Pending",
        },
        {
          name: "Sophie Lee",
          location: "Seoul",
          products: [
            { product_name: "Sneakers", quantity: 1 },
          ],
          datetime: "2023-06-03 16:10",
          id: "345jkl",
          price: 12500,
          status: "Dispatched",
        },
        {
          name: "Daniel Brown",
          location: "London",
          products: [
            { product_name: "Joggers", quantity: 1 },
            { product_name: "Hoodie", quantity: 1 },
          ],
          datetime: "2023-05-12 09:45",
          id: "678mno",
          price: 19500,
          status: "Delivered",
        },
        {
          name: "Emma Davis",
          location: "Paris",
          products: [
            { product_name: "Skateboard", quantity: 1 },
          ],
          datetime: "2023-06-02 13:15",
          id: "901pqr",
          price: 8000,
          status: "Canceled",
        },
    ];

    const [showOverlay, setShowOverlay] = useState(false);

    const bottomSheetModalRef = useRef(null);

    const closeModal = () => {
      bottomSheetModalRef.current?.close();
      setShowOverlay(false);
    };
    const handlePresentModal = () => {
      bottomSheetModalRef.current?.present();
      setShowOverlay(true);
    }

    return (
        <ScrollView>
          <View style={style.main}>
              <View style={style.header}>
                  <TouchableOpacity
                      onPress={() => {
                          navigation.goBack();
                      }}
                  >
                      <ArrowLeft />
                  </TouchableOpacity>
                  <View style={style.headerBar}>
                      <Text style={style.headerText}>Notifications</Text>
                      <TouchableOpacity
                          style={style.filter}
                          onPress={() => handlePresentModal()}
                      >
                          <FilterIcon />
                      </TouchableOpacity>
                  </View>
              </View>
              <View style={style.dateWrapper}>
                <Text style={style.date}>Today</Text>
              </View>
              <View style={style.notificationWrapper}>
                {orders.map((item, index) => (
                    <Orders item={item} index={index} key={index} orders={orders} />
                ))}
              </View>
              <View style={style.dateWrapper}>
                <Text style={style.date}>Tues, May 09, 2023</Text>
              </View>
              <View style={style.notificationWrapper}>
                {orders1.map((item, index) => (
                    <Orders item={item} index={index} key={index} orders={orders} />
                ))}
              </View>
          </View>
          {showOverlay && (
            <View
              style={style.overlay}
            >
              <TouchableOpacity
                style={style.closeOverlay}
                onPress={closeModal}
              >
              </TouchableOpacity>
            </View>
          )}
          <FilterNotifications 
            bottomSheetModalRef={bottomSheetModalRef}
            setShowOverlay={setShowOverlay}
          />
        </ScrollView>
    );
}

const style = StyleSheet.create({
    main: {
        minHeight: "100%",
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#f8f8f8',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        padding: 20,
    },
    header: {
        height: 150,
        width: "100%",
        display: 'flex',
        gap: 25,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    headerBar: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between', 
        width: "100%",       
    },
    headerText: {
        fontFamily: 'mulish-bold',
        fontSize: 20,
        color: '#222222',
    },
    filter: {
        width: 24,
        height: 24,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderRadius: 5
    },
    notificationWrapper: {
        width: "100%",
        flex: 1,
    },
    date: {
      color: 'rgba(34, 34, 34, 0.8)',
      fontSize: 12,
      fontFamily: 'mulish-semibold',
    },
    dateWrapper: {
      display: 'flex',
      justifyContent: 'flex-start',
      flexDirection: 'row',
      width: "100%",
      paddingVertical: 10,
    },
    overlay: {
      position: 'absolute',
      width: "100%",
      height: "100%",
      bottom: 0,
      left: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.3)',

    }, 
    closeOverlay: {
      widyth: "100%",
      height: "100%",
    }
});
 
export default NotificationsStack;