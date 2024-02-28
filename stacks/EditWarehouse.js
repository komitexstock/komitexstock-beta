import {
    StyleSheet,
    TouchableWithoutFeedback,
    Text,
    View,
    Keyboard,
    TouchableOpacity,
    Linking,
    Platform
} from 'react-native';

// react hooks
import React, { useEffect, useState } from 'react';

// components 
import Header from '../components/Header';
import SelectInput from '../components/SelectInput';
import Input from '../components/Input';
import CustomButton from '../components/CustomButton';
import CustomBottomSheet from '../components/CustomBottomSheet';
import SearchBar from '../components/SearchBar';
import SuccessSheet from '../components/SuccessSheet';
import CheckBox from '../components/CheckBox';
import AccountButtons from '../components/AccountButtons';

// icons
import EmailIcon from "../assets/icons/EmailIcon";
import SmsIcon from "../assets/icons/SmsIcon";
import PhoneIcon from "../assets/icons/PhoneIcon";

// bottomsheet components
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';

// globals
import { useGlobals } from '../context/AppContext';

// colors
import { background, black, bodyText, listSeparator, primaryColor, inputLabel } from '../style/colors';

// utils
import { windowHeight } from '../utils/helpers';

// useAuth
import { useAuth } from "../context/AuthContext";

// firebase
import {
    database,
} from "../Firebase";

// firestore functions
import {
    doc,
    updateDoc,
    collection,
    getDocs,
    where,
    query,
    orderBy,
    serverTimestamp,
} from "firebase/firestore";

const EditWarehouse = ({navigation, route}) => {
    
    // auth data
    const { authData } = useAuth();

    // loading state for buttons
    const [isLoading, setIsLoading] = useState(false);

    // state to store progress of obtaining managers list
    const [obtainedManagers, setObtainedManagers] = useState(false);

    // navigation paramters
    const {
        id,
        warehouse_name,
        warehouse_address,
        warehouse_manager,
        waybill_receivable
    } = route?.params || {};

    // bottomsheet refs
    const { stackedSheetRef, stackedSheetOpen, successSheetRef, setToast } = useGlobals();

    // warehouse name
    const warehouseName = warehouse_name.charAt(0).toUpperCase() + warehouse_name.slice(1);

    // warehouse address
    const [warehouseAddress, setWarehouseAddress] = useState(warehouse_address);
    // warehouse address input error
    const [errorWarehouseAddress, setErrorWarehouseAddress] = useState(false);

    // state to store members array
    const [managers, setManagers] = useState([]);

    // warehouse manager
    const [warehouseManager, setWarehouseManager] = useState(warehouse_manager);

    // active input state
    const [activeWarehouseManager, setActiveWarehouseManager] = useState(false);

    // reacieve waybill state
    const [waybillReceivable, setWaybillReceivable] = useState(waybill_receivable);

    // get managers
    useEffect(() => {
        // fetch team members data
        const fetchTeamMembers = async (business_id) => {
            try {
                const collectionRef = collection(database, "users");
                let q = query(
                    collectionRef,
                    where("business_id", "==", business_id),
                    where("role", "==", "Manager"),
                    where("deactivated", "==", false),
                    orderBy("created_at")
                );

                const querySnapshot = await getDocs(q);
                let managersList = [];
                querySnapshot.forEach((doc) => {
                    const manager = {
                        id: doc.id,
                        full_name: doc.data().full_name,
                    };
                    managersList.push(manager);
                });

                setManagers(managersList);
                setObtainedManagers(true);
            } catch (error) {
                console.log("Caught Error: ", error.message);
                setToast({
                    text: error.message,
                    visible: true,
                    type: "error",
                });
            }
        };

        // fetch team members data
        fetchTeamMembers(authData?.business_id);
    }, []);
    
    // handle warehouse selection
    const handleWarehouseSelection = (id) => {
        setWarehouseManager(() => {
            return managers.find(manager => manager.id === id);
        });
        closeStackedModal();
    }

    // search query
    const [searchQuery, setSearchQuery] = useState(null);

    // modal type state, defaults as "managers"
    const [modalType, setModalType] = useState("managers");

    // state to control bottomsheet snap point
    const [snapPoint, setSnapPoint] = useState(0);

    const openModal = (type) => {
        setSnapPoint(0);
        // set modat type
        setModalType(type);
        // open bottom sheet
        stackedSheetRef?.current?.present();
        // dismiss keyboard
        Keyboard.dismiss();
        // set warehouse manager select input as active
        setActiveWarehouseManager(true);
    }

    // close modal function
    const closeStackedModal = () => {
        // close stacked modal
        stackedSheetRef?.current?.close();
        // set warehouse manager select input as inactive
        setActiveWarehouseManager(false);
    }
    
    // disable active states for select input if back button is pressed
    // if bottomsheet is closed without selecting a manager
    useEffect(() => {
        // if bottomsheet is close
        if (!stackedSheetOpen) {
            // set warehouse manager select input as inactive
            setActiveWarehouseManager(false);
        }
    }, [stackedSheetOpen])

    // handle save changes
    const handleSaveChanges = async () => {
        setIsLoading(true);

        try {
            // check for empty warehouse address
            // throw error is warehouse address is empty
            if (!warehouseAddress) {
                setErrorWarehouseAddress(true);
                setIsLoading(false);

                // throw error
                throw new Error("Please enter warehouse address");
            }

            // update warehouse
            // update warehouses collection where id === id from route params
            await updateDoc(doc(database, "warehouses", id), {
                warehouse_address: warehouseAddress,
                warehouse_manager: warehouseManager?.id,
                waybill_receivable: waybillReceivable,
                edited_at: serverTimestamp(), // timestamp
                edited_by: authData?.uid, // uid
            });

            setIsLoading(false);
            // open succes sheet modal
            openSuccessModal();

        } catch (error) {

            // indicate error
            setToast({
                text: error.message,
                visible: true,
                type: "error",
            })

            // disbale button loading state
            setIsLoading(false);

        }
        
    }

    // open success modal
    const openSuccessModal = () => {
        successSheetRef?.current?.present();
    }

    // close pop up modal
    const closeSuccessModal = () => {
        successSheetRef?.current?.close();
    }

    // handle eidt warehouse confimation
    const handleConfirmEditWarehouse = () => {
        closeSuccessModal();
        navigation.navigate("Warehouse");
    }

    // listen for keyboard opening or closing
    useEffect(() => {
        // if keyboard is open
        const keyboardDidShowListener = Keyboard.addListener(
            Platform.OS === 'android' ? 'keyboardDidShow' : 'keyboardWillShow', () => {
                if (!stackedSheetOpen) return;
                if (modalType !== "managers") return;
                setSnapPoint(2);
            }
        );
        
        // keyboard is closed
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            // run any desired function here
            // if wareehouse address is empty
        });
    
        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, [stackedSheetOpen, modalType]);

    // buttons in support bottom sheet modal
    const supportButtons = [
        {
            id: 1,
            title: "Call Us on +234 811 632 0575",
            icon: <PhoneIcon />,
            onPress: () => Linking.openURL('tel:+2348116320575'),
        },
        {
            id: 2,
            title: "Chat with us",
            icon: <SmsIcon />,
            onPress: () => Linking.openURL('https://wa.me/+2348116320575'),
        },
        {
            id: 3,
            title: "Contact us via email",
            icon: <EmailIcon />,
            onPress: () => Linking.openURL('mailto:komitexstock@gmail.com'),
        },
    ];

    const detectAnyChanges = warehouseAddress !== warehouse_address || // detect changes in address
    warehouseManager?.id !== warehouse_manager?.id ||  // detect changes in manager
    waybillReceivable !== waybill_receivable; // detect changes in waybill receivble state

    return (
        <>
            <TouchableWithoutFeedback
                onPress={Keyboard.dismiss}
            >
                <View style={style.container}>
                    <View style={style.mainWrapper}>
                        <Header
                            stackName={"Edit Warehouse"}
                            navigation={navigation}
                            unpadded={true}
                        />
                        <Text style={style.paragraph}>
                            Edit your warehouse details
                        </Text>
                        <View style={style.inputWrapper}>

                            {/* warehouse name */}
                            <Input 
                                label={"Warehouse Name"}
                                placeholder={"Warehouse name"}
                                value={warehouseName}
                                disabled={true}
                                helperComponent={<>
                                    <View style={style.helperComponent}>
                                        <Text style={style.helperText}>
                                            Contact&nbsp;
                                        </Text>
                                        <TouchableOpacity 
                                            style={style.linkButton}
                                            onPress={() => openModal("support")}
                                        >
                                            <Text style={style.linkText}>support</Text>
                                        </TouchableOpacity>
                                        <Text style={style.helperText}>
                                            &nbsp;to edit warehouse name
                                        </Text>
                                    </View>
                                </>}
                            />

                            {/* warehouse address */}
                            <Input 
                                label={"Warehouse Address"}
                                placeholder={"Warehouse address"}
                                value={warehouseAddress}
                                onChange={setWarehouseAddress}
                                error={errorWarehouseAddress}
                                setError={setErrorWarehouseAddress}
                            />

                            {/* warehouse manager select input */}
                            <SelectInput
                                label={"Warehouse Manager"}
                                placeholder={"Selecte a warehouse manager"}
                                value={warehouseManager?.full_name}
                                inputFor={"String"}
                                onPress={obtainedManagers ? () => openModal("managers") : () => {}}
                                active={activeWarehouseManager}
                            />

                            {/* receive waybill check box */}
                            <TouchableOpacity 
                                style={style.receiveWaybillWrapper}
                                onPress={() => setWaybillReceivable(prevValue => !prevValue)}
                            >
                                <CheckBox
                                    value={waybillReceivable}
                                    onPress={() => setWaybillReceivable(prevValue => !prevValue)}
                                />
                                <Text style={style.receiveWaybillText}>Receive waybill in this warehouse</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <CustomButton
                        name={"Save Changes"}
                        unpadded={true}
                        backgroundColor={background}
                        isLoading={isLoading}
                        // if changes hasn't been detected or managers list hasn't be obtained yet
                        inactive={!detectAnyChanges || !obtainedManagers}
                        onPress={handleSaveChanges}
                    />
                </View>
            </TouchableWithoutFeedback>
            <CustomBottomSheet
                bottomSheetModalRef={stackedSheetRef}
                sheetTitle={modalType === "managers" ? "Select Managers" : "Help & Support"}
                snapPointsArray={modalType === "managers" ? ["50%", "75%", "100%"] : [280]}
                autoSnapAt={snapPoint}
                closeModal={closeStackedModal}
                stacked={true}
            >
                {modalType === "managers" && <>
                    {/* search bar */}
                    <SearchBar
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        placeholder={"Search warehouse"}
                        backgroundColor={background}
                        disableFilter={true}
                    />
                    {/* bottomsheet scrollable content */}
                    <BottomSheetScrollView style={style.sheetScroll} showsVerticalScrollIndicator={false}>
                        <Text style={style.headingText}>
                            Managers in your team
                        </Text>
                        <View style={style.listWrapper}>
                            {/* if search query input is empty */}
                            {/* display all managers but already selected manager */}
                            {!searchQuery && managers.filter(manager => manager.id !== warehouseManager?.id).map(manager => (
                                <TouchableOpacity
                                    key={manager.id}
                                    style={style.listItemButton}
                                    onPress={() => handleWarehouseSelection(manager.id)}
                                >
                                    <Text style={style.listItemText}>
                                        {manager.full_name}
                                    </Text>
                                </TouchableOpacity>
                            ))}

                            {/* if search query input is not empty, filter according to search input */}
                            {/* display all not selected managers according to search keyword */}
                            {searchQuery && managers.filter(manager => manager.id !== warehouseManager?.id && 
                            manager.full_name.toLowerCase().includes(searchQuery.toLowerCase())).map(manager => (
                                <TouchableOpacity
                                    key={manager.id}
                                    style={style.listItemButton}
                                    onPress={() => handleWarehouseSelection(manager.id)}
                                >
                                    <Text style={style.listItemText}>
                                        {manager.full_name}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </BottomSheetScrollView>
                </>}
                {/* Help and supoort bottomsheet */}
                { modalType === "support" && supportButtons.map((item, index) => (
                    <AccountButtons
                        key={item.id}
                        title={item.title}
                        subtitle={false}
                        icon={item.icon}
                        length={supportButtons.length - 1}
                        index={index}
                        onPress={item.onPress}
                        unpadded={true}
                    />
                ))}

            </CustomBottomSheet>
            {/* success bottom sheet */}
            <SuccessSheet
                successSheetRef={successSheetRef}
                heading={"Warehouse updated successfully"}
                height={320}
                paragraph={<>
                    You have successfully updated your warehouse details
                </>}
                primaryFunction={handleConfirmEditWarehouse}
            />
        </>
    )
}

export default EditWarehouse

const style = StyleSheet.create({
    container: {
        backgroundColor: background,
        paddingHorizontal: 20,
        display: 'flex',
        justifyContent: "space-between",
        flexDirection: 'column',
        alignItems: 'center',
        height: windowHeight,
        width: "100%",
    },
    mainWrapper: {
        width: "100%",
    },
    paragraph: {
        fontFamily: 'mulish-regular',
        fontSize: 12,
        color: bodyText,
        marginTop: 8,
        width: "100%",
        marginBottom: 30,
    },
    inputWrapper: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: "flex-start",
        alignItems: 'center',
        gap: 20,
    },
    helperComponent: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    helperText: {
        fontFamily: 'mulish-semibold',
        fontSize: 12,
        color: inputLabel,
    },
    linkText: {
        color: primaryColor,
        textDecorationColor: primaryColor,
        textDecorationLine: 'underline',
        fontSize: 12,
        fontFamily: 'mulish-semibold',
    },
    headingText: {
        color: black,
        fontFamily: "mulish-semibold",
        fontSize: 12,
        marginTop: 4,
        marginBottom: 16,
    },
    sheetScroll: {
        width: "100%",
        height: "100%",
    },
    listWrapper: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: "flex-start",
        alignItems: 'flex-start',
        gap: 10,
    },
    listItemButton: {
        paddingVertical: 12,
        borderBottomColor: listSeparator,
        borderBottomWidth: 1,
        width: "100%",
    },
    listItemText: {
        color: black,
        fontFamily: "mulish-medium",
        fontSize: 12,
        lineHeight: 15,
    },
    boldText: {
        color: black,
        fontSize: 12,
        fontFamily: "mulish-bold",
    },
    modalWrapper: {
        width: "100%",
        height: 400,
        backgroundColor: 'red',
    },
    modal: {
        height: 500,
        backgroundColor: "transparent",
    },
    receiveWaybillWrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 10,
        width: "100%",
    },
    receiveWaybillText: {
        fontFamily: 'mulish-regular',
        fontSize: 12,
        color: bodyText,
    }
})