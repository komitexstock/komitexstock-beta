import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import FilterIcon from "../assets/icons/FilterIcon";
import Order from "../components/Order";
import CustomBottomSheet from "../components/CustomBottomSheet";
import { useRef } from "react";
import { useState } from "react";
import Header from "../components/Header";
import { globalStyleSheet, primaryColor } from "../style/globalStyleSheet";
import FilterButtonGroup from "../components/FilterButtonGroup";

const Notifications = ({navigation}) => {

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
          imageUrl: require('../assets/images/fedex.png'),
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
          imageUrl: require('../assets/images/komitex.png'),
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
          imageUrl: require('../assets/images/dhl.png'),
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
          imageUrl: require('../assets/images/komitex.png'),
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
          imageUrl: require('../assets/images/dhl.png'),
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
          imageUrl: require('../assets/images/ups.png'),
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
          imageUrl: require('../assets/images/komitex.png'),
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
          imageUrl: require('../assets/images/komitex.png'),
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
          imageUrl: require('../assets/images/komitex.png'),
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
          imageUrl: require('../assets/images/fedex.png'),
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

    const filterButtons = [
      {
        id: 1,
        title: "Status",
        buttons: [
          {
            id: 1,
            text: "All",
            selected: true,
          },
          {
            id: 2,
            text: "Pending",
            selected: false,
          },
          {
            id: 3,
            text: "Delivered",
            selected: false,
          },
          {
            id: 4,
            text: "Cancelled",
            selected: false,
          },
        ]
      },
      {
        id: 2,
        title: "Sort by",
        buttons: [
          {
            id: 1,
            text: "Time",
            selected: true,
          },
          {
            id: 2,
            text: "Logistics",
            selected: false,
          },
          {
            id: 3,
            text: "Customer Name",
            selected: false,
          },
        ]
      }
    ]

    return (
        <ScrollView>
            <View style={globalStyleSheet.main}>
                <Header 
                    navigation={navigation} 
                    stackName={"Notifications"} 
                    iconFunction={handlePresentModal} 
                    icon={<FilterIcon />} 
                    iconExist={true} 
                />
                <View style={style.dateWrapper}>
                    <Text style={style.date}>Today</Text>
                </View>
                <View style={style.notificationWrapper}>
                    {orders.map((item, index) => (
                        <Order item={item} index={index} key={index} length={orders.length} />
                    ))}
                </View>
                <View style={style.dateWrapper}>
                    <Text style={style.date}>Tues, May 09, 2023</Text>
                </View>
                <View style={style.notificationWrapper}>
                    {orders1.map((item, index) => (
                        <Order item={item} index={index} key={index} length={orders.length} />
                    ))}
                </View>
            </View>
            <CustomBottomSheet 
                bottomSheetModalRef={bottomSheetModalRef}
                setShowOverlay={setShowOverlay}
                showOverlay={showOverlay}
                closeModal={closeModal}
                snapPointsArray={["40%"]}
                autoSnapAt={0}
                sheetTitle={"Filter by"}
            >
                <View style={style.modalContent}>
                    {filterButtons.map(item => (
                        <FilterButtonGroup
                        buttons={item.buttons}
                        title={item.title}
                        key={item.id}
                        />
                    ))}
                    <View style={style.footerButtonWrapper}>
                    <TouchableOpacity style={style.footerButton}>
                        <Text style={style.footerButtonText}>Apply</Text>
                    </TouchableOpacity>
                    </View>
                </View>
            </CustomBottomSheet>
        </ScrollView>
    );
}

const style = StyleSheet.create({
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
    modalContent: {
      display: "flex",
      flexDirection: 'column',
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
      // backgroundColor: "pink",
      flex: 1,
    },
    footerButtonWrapper: {
      width: "100%",
    },
    footerButton: {
      width: "100%",
      height: 44,
      backgroundColor: primaryColor,
      borderRadius: 12,
      display: "flex",
      alignItems: "center",
      justifyContent: "center", 
    },
    footerButtonText: {
      color: "white",
      fontSize: 16,
      fontFamily: 'mulish-semibold',
    }
});
 
export default Notifications;