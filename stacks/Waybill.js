import { 
    View, 
    Text, 
    FlatList, 
    TouchableOpacity, 
    TouchableWithoutFeedback,
    StyleSheet,
    BackHandler
} from "react-native";
import MenuIcon from "../assets/icons/MenuIcon";
import { primaryColor } from "../style/globalStyleSheet";
import StatWrapper from "../components/StatWrapper";
import StatCard from "../components/StatCard";
import { useState, useRef, useEffect } from "react";
import SearchIcon from '../assets/icons/SearchIcon'
import FilterIcon from '../assets/icons/FilterIcon';
import CustomBottomSheet from "../components/CustomBottomSheet";
import FilterButtonGroup from "../components/FilterButtonGroup";
import SearchBar from "../components/SearchBar";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import WaybillListItem from "../components/WaybillListItem";
import Badge from "../components/Badge";

const Waybill = ({navigation}) => {

    const stats = [
        {
            id: 1,
            title: "Total Waybill Sent",
            presentValue: 30,
            oldValue: 28,
            decimal: false,
            unit: "",
            unitPosition: "start",
        },
        {
            id: 2,
            title: "Total Waybill Recived",
            presentValue: 5,
            oldValue: 4,
            decimal: false,
            unit: "",
            unitPosition: "end",
        },
        {
            id: 3,
            title: "Total Items Sent",
            presentValue: 74,
            oldValue: 63,
            decimal: false,
            unit: "",
            unitPosition: "end",
        },
        {
            id: 4,
            title: "Total Delivered",
            presentValue: 57,
            oldValue: 55,
            decimal: false,
            unit: "",
            unitPosition: "end",
        },
    ];

    const [tab, setTab] = useState("Outgoing");

    // filterButtons
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
            title: "Logistics",
            buttons: [
                {
                id: 1,
                text: "All",
                selected: true,
                },
                {
                id: 2,
                text: "Komitex",
                selected: false,
                },
                {
                id: 3,
                text: "Fedex",
                selected: false,
                },
                {
                id: 4,
                text: "DHL",
                selected: false,
                },
            ]
        },
        {
            id: 3,
            title: "Date",
            buttons: [
                {
                id: 1,
                text: "Today",
                selected: true,
                },
                {
                id: 2,
                text: "Yesterday",
                selected: false,
                },
                {
                id: 3,
                text: "Manual Selection",
                selected: false,
                },
            ]
        }
    ]

    // state to store searchQuery
    const [searchQuery, setSearchQuery] = useState("");

    // search modal refernce
    const modalRef = useRef(null);

    const [modal, setModal] = useState({
        snapPointsArray: ["50%"],
        autoSnapAt: 0,
        sheetTitle: "",
        overlay: false,
        clearFilterFunction: false,
        modalContent: <></>,
    });

    // use effect to close modal
    useEffect(() => {
        // function to run if back button is pressed
        const backAction = () => {
            // Run your function here
            if (modal.overlay) {
                // if modal is open, close modal
                closeModal();
                return true;
            } else {
                // if modal isnt open simply navigate back
                return false;
            }
        };
    
        // listen for onPress back button
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction
        );
    
        return () => backHandler.remove();

    }, [modal.overlay]);

    // filter modal state
    const filterModal = {
        snapPointsArray: ["50%"],
        autoSnapAt: 0,
        sheetTitle: "Filter by",
        overlay: true,
        clearFilterFunction: () => {},
        modalContent: <>
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
        </>
    };

    // search modal state
    const searchModal = {
        snapPointsArray: ["50%", "90%"],
        autoSnapAt: 1,
        sheetTitle: "",
        overlay: true,
        clearFilterFunction: false,
        modalContent: <>
            <SearchBar 
                placeholder={"Search Waybills"}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                backgroundColor={"#f8f8f8"}
            />
            <BottomSheetScrollView style={style.orderSearchResults}>
                
            </BottomSheetScrollView>
        </>
    };

    // close modal button
    const closeModal = (type) => {
        setModal(prevModal => {
            return {
                ...prevModal,
                overlay: false,
            }
        });
        modalRef.current?.close();
    };

    // open modal function
    const openModal = (type) => {
        if (type === "filter") {
            setModal(filterModal);
        } else {
            setModal(searchModal);
        }
        modalRef.current?.present();
    }

    const outGoingWaybills = [
        {
            products: [
                { product_name: "Shirt", quantity: 12 },
                { product_name: "Jeans", quantity: 4 },
            ],
            datetime: "2023-03-15 09:30",
            id: "abc123",
            status: "Delivered",
            imageUrl: require('../assets/images/komitex.png'),
            newMessage: true,
            navigateToChat: () => {
                navigation.navigate("Chat", {
                    id: "abc123",
                    type: "waybill",
                    order: "Chat Message",
                    name: "Komitex",
                    imageUrl: require('../assets/images/komitex.png'),
                })
            },
        },
        {
            products: [
                { product_name: "Shoes", quantity: 10 },
                { product_name: "Socks", quantity: 5 },
            ],
            datetime: "2023-02-22 14:45",
            id: "def456",
            status: "Pending",
            imageUrl: require('../assets/images/fedex.png'),
            newMessage: false,
            navigateToChat: () => {
                navigation.navigate("Chat", {
                    id: "def456",
                    type: "waybill",
                    order: "Chat Message",
                    name: "Fedex",
                    imageUrl: require('../assets/images/fedex.png'),
                })
            },
        },
        {
            products: [
                { product_name: "Hat", quantity: 8 },
            ],
            datetime: "2023-01-10 12:15",
            id: "ghi789",
            status: "Delivered",
            imageUrl: require('../assets/images/komitex.png'),
            newMessage: false,
            navigateToChat: () => {
                navigation.navigate("Chat", {
                    id: "ghi789",
                    type: "waybill",
                    order: "Chat Message",
                    name: "Komitex",
                    imageUrl: require('../assets/images/komitex.png'),
                })
            },
        },
        {
            products: [
                { product_name: "Sunglasses", quantity: 4 },
            ],
            datetime: "2023-03-01 11:10",
            id: "mno345",
            status: "Pending",
            imageUrl: require('../assets/images/dhl.png'),
            newMessage: true,
            navigateToChat: () => {
                navigation.navigate("Chat", {
                    id: "mno345",
                    type: "waybill",
                    order: "Chat Message",
                    name: "Dhl",
                    imageUrl: require('../assets/images/dhl.png'),
                })
            },
        },
        {
            products: [
                { product_name: "T-Shirt", quantity: 6 },
            ],
            datetime: "2023-02-14 16:55",
            id: "pqr678",
            status: "Pending",
            imageUrl: require('../assets/images/ups.png'),
            newMessage: false,
            navigateToChat: () => {
                navigation.navigate("Chat", {
                    id: "pqr678",
                    type: "waybill",
                    order: "Chat Message",
                    name: "Ups",
                    imageUrl: require('../assets/images/ups.png'),
                })
            },
        }
    ];

    const inComingWaybills = [
        {
            products: [
                { product_name: "Dress", quantity: 3 },
                { product_name: "Scarf", quantity: 1 },
            ],
            datetime: "2023-05-03 10:20",
            id: "stu901",
            status: "Pending",
            imageUrl: require('../assets/images/komitex.png'),
            newMessage: false,
            navigateToChat: () => {
                navigation.navigate("Chat", {
                    id: "stu901",
                    type: "waybill",
                    order: "Chat Message",
                    name: "Komitex",
                    imageUrl: require('../assets/images/komitex.png'),
                })
            },
        },
        {
            products: [
                { product_name: "Pants", quantity: 2 },
            ],
            datetime: "2023-04-01 09:45",
            id: "vwx234",
            status: "Delivered",
            imageUrl: require('../assets/images/fedex.png'),
            newMessage: false,
            navigateToChat: () => {
                navigation.navigate("Chat", {
                    id: "vwx234",
                    type: "waybill",
                    order: "Chat Message",
                    name: "Fedex",
                    imageUrl: require('../assets/images/fedex.png'),
                })
            },
        },
        {
            products: [
                { product_name: "Sweater", quantity: 3 },
            ],
            datetime: "2023-05-21 15:30",
            id: "yz0123",
            status: "Pending",
            imageUrl: require('../assets/images/komitex.png'),
            newMessage: false,
            navigateToChat: () => {
                navigation.navigate("Chat", {
                    id: "yz0123",
                    type: "waybill",
                    order: "Chat Message",
                    name: "Komitex",
                    imageUrl: require('../assets/images/komitex.png'),
                })
            },
        },
    ]

    return (
        <>
            <TouchableWithoutFeedback style={{flex: 1, width: "100%", height: "100%"}}>
                <FlatList 
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={
                        <View style={style.headerWrapper}>
                            <View style={style.header}>
                                <Text style={style.headerText}>Waybill</Text>
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
                                        unit={stat.unit}
                                        unitPosition={stat.unitPosition}
                                    />
                                ))}
                            </StatWrapper>
                            <TouchableOpacity 
                                style={style.sendOrderButton}
                                onPress={() => navigation.navigate("SendWaybill")}
                            >
                                <Text style={style.orderButtonText}>Send Waybill</Text>
                            </TouchableOpacity>
                            <View style={style.recentOrderHeading}>
                                <Text style={style.recentOrderHeadingText}>Recent Waybills</Text>
                                <View style={style.actionWrapper}>
                                    <TouchableOpacity 
                                        style={style.menuIcon}
                                        onPress={() => openModal("search")}
                                    >
                                        <SearchIcon />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={style.menuIcon}
                                        onPress={() => openModal("filter")}
                                    >
                                        <FilterIcon />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={style.tabContainer}>
                                <TouchableOpacity 
                                    style={tab === "Outgoing" ? style.tabButtonSelected : style.tabButton}
                                    onPress={() => setTab("Outgoing")}
                                    >
                                    <Text style={tab === "Outgoing" ? style.tabButtonTextSelected : style.tabButtonText} >Outgoing</Text>
                                    <Badge number={2} />
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    style={tab === "Incoming" ? style.tabButtonSelected : style.tabButton}
                                    onPress={() => setTab("Incoming")}
                                >
                                    <Text style={tab === "Incoming" ? style.tabButtonTextSelected : style.tabButtonText} >Incoming</Text>
                                    <Badge number={0} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    }
                    contentContainerStyle={{paddingBottom: 90}}
                    style={style.listWrapper}
                    keyExtractor={item => item.id}
                    data={tab === "Outgoing" ? outGoingWaybills : inComingWaybills}
                    renderItem={({ item, index }) => (
                        <WaybillListItem item={item} index={index} length={outGoingWaybills.length} />
                    )}
                />
            </TouchableWithoutFeedback>
            <CustomBottomSheet 
                bottomSheetModalRef={modalRef}
                showOverlay={modal.overlay}
                closeModal={() => closeModal("filter")}
                snapPointsArray={modal.snapPointsArray}
                autoSnapAt={modal.autoSnapAt}
                sheetTitle={modal.sheetTitle}
                clearFilterFunction={modal.clearFilterFunction}
            >
                {modal.modalContent}
            </CustomBottomSheet>
        </>
    );
}

const style = StyleSheet.create({
    listWrapper: {
        width: "100%",
        height: "100%",
        paddingHorizontal: 20,
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
    },
    modalContent: {
        display: "flex",
        flexDirection: 'column',
        alignItems: "center",
        justifyContent: "flex-start",
        width: "100%",
        // backgroundColor: "pink",
        flex: 1,
    },
    footerButtonWrapper: {
      width: "100%",
      position: "absolute",
      bottom: 0,
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
    },
    tabContainer: {
        width: "100%",
        display: "flex",
        flexDirection: 'row',
        height: 32,
        marginBottom: 20,
        alignItems: "center",
        justifyContent: "space-between",
    },
    tabButton: {
        width: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: '100%',
        flexDirection: "row",
        gap: 10,
    },
    tabButtonSelected: {
        width: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: '100%',
        borderBottomWidth: 2,
        borderBottomColor: primaryColor,
        flexDirection: "row",
        gap: 10,
    },
    tabButtonText: {
        fontFamily: 'mulish-semibold',
        fontSize: 14,
        color: "rgba(177, 178, 178, 1)",
    },
    tabButtonTextSelected: {
        fontFamily: 'mulish-semibold',
        fontSize: 14,
        color: "rgba(34, 34, 34, 1)",
    },
})
 
export default Waybill;