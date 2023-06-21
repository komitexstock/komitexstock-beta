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
import { useState, useRef } from "react";
import SearchIcon from '../assets/icons/SearchIcon'
import FilterIcon from '../assets/icons/FilterIcon';
import CustomBottomSheet from "../components/CustomBottomSheet";
import FilterButtonGroup from "../components/FilterButtonGroup";
import SearchBar from "../components/SearchBar";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";

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

    const [searchQuery, setSearchQuery] = useState("");

    // filter modal reference
    const filterModalRef = useRef(null);

    // search modal refernce
    const searchModalRef = useRef(null);

    // filter modal state
    const [filterModal, setFilterModal] = useState({
        snapPointsArray: ["50%"],
        autoSnapAt: 0,
        sheetTitle: "Filter by",
        overlay: false,
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
    })

    // search modal state
    const [searchModal, setSearchModal] = useState({
        snapPointsArray: ["50%", "90%"],
        autoSnapAt: 1,
        sheetTitle: "",
        overlay: false,
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
    })

    const closeModal = (type) => {
        if (type === "filter") {
            setFilterModal(prevModal => {
                return {
                    ...prevModal,
                    overlay: false,
                }
            });
            filterModalRef.current?.close();
        } else {
            setSearchModal(prevModal => {
                return {
                    ...prevModal,
                    overlay: false,
                }
            });
            searchModalRef.current?.close();
        }
    };

    const openModal = (type) => {
        if (type === "filter") {
            setFilterModal(prevModal => {
                return {
                    ...prevModal,
                    overlay: true,
                }
            });
            filterModalRef.current?.present();
        } else {
            setSearchModal(prevModal => {
                return {
                    ...prevModal,
                    overlay: true,
                }
            });
            searchModalRef.current?.present();
        }
    }

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
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    style={tab === "Incoming" ? style.tabButtonSelected : style.tabButton}
                                    onPress={() => setTab("Incoming")}
                                >
                                    <Text style={tab === "Incoming" ? style.tabButtonTextSelected : style.tabButtonText} >Incoming</Text>
                                    <View style={style.badge}>
                                        <Text style={style.badgeText}>1</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    }
                    contentContainerStyle={{paddingBottom: 90}}
                    style={style.listWrapper}
                    // keyExtractor={item => item.id}
                    // data={orderList}
                    // renderItem={({ item, index }) => (
                    //     <Order item={item} index={index} length={orderList.length} />
                    // )}
                />
            </TouchableWithoutFeedback>
            <CustomBottomSheet 
                bottomSheetModalRef={filterModalRef}
                showOverlay={filterModal.overlay}
                closeModal={() => closeModal("filter")}
                snapPointsArray={filterModal.snapPointsArray}
                autoSnapAt={filterModal.autoSnapAt}
                sheetTitle={filterModal.sheetTitle}
            >
                {filterModal.modalContent}
            </CustomBottomSheet>

            <CustomBottomSheet 
                bottomSheetModalRef={searchModalRef}
                showOverlay={searchModal.overlay}
                closeModal={() => closeModal("search")}
                snapPointsArray={searchModal.snapPointsArray}
                autoSnapAt={searchModal.autoSnapAt}
                sheetTitle={searchModal.sheetTitle}
            >
                {searchModal.modalContent}
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
    badge: {
        width: 16,
        height: 16,
        borderRadius: 8,
        backgroundColor: "rgba(254, 243, 242, 1)",
        display: 'flex',
        flexDirection: 'row',
        textAlign: 'center',
        justifyContent: 'center',
    },
    badgeText: {
        color: "rgba(180, 35, 24, 1)",
        fontFamily: 'mulish-regular',
        fontSize: 10,
        lineHeight: 16,
        height: 16,
        textAlign: 'center',
        width: 16,
        
    },
})
 
export default Waybill;