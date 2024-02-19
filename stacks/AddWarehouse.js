import {
    StyleSheet,
    TouchableWithoutFeedback,
    Text,
    View,
    Keyboard,
    TouchableOpacity
} from 'react-native'
// react hooks
import React, { useEffect, useState } from 'react'
// components 
import Header from '../components/Header';
import SelectInput from '../components/SelectInput';
import Input from '../components/Input';
import CustomButton from '../components/CustomButton';
import CustomBottomSheet from '../components/CustomBottomSheet';
import SearchBar from '../components/SearchBar';
import SuccessSheet from '../components/SuccessSheet';
import CheckBox from '../components/CheckBox'
// bottomsheet components
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
// globals
import { useGlobals } from '../context/AppContext';
// colors
import { background, black, bodyText, listSeparator } from '../style/colors';
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
    addDoc,
    collection,
    getDocs,
    where,
    query,
    orderBy,
    serverTimestamp,
} from "firebase/firestore";

const AddWarehouse = ({navigation}) => {

    // auth data
    const { authData } = useAuth();

    // isloading state for buttons
    const [isLoading, setIsLoading] = useState(false);

    // state to store progress of obtaining managers list
    const [obtainedManagers, setObtainedManagers] = useState(false);

    // bottomsheet refs
    const { bottomSheetRef, bottomSheetOpen, successSheetRef, setToast } = useGlobals();

    // warehouse name 
    const [warehouseName, setWarehouseName] = useState("");

    // warehouse name input error
    const [errorWarehouseName, setErrorWarehouseName] = useState(false);

    // function to update warehouse name
    const updateWarehouseName = (text) => {
        // set new warehouse name value
        setWarehouseName(text);
    }
    
    // warehouse address, string
    const [warehouseAddress, setWarehouseAddress] = useState("");
    // warehouse address input error, boolean
    const [errorWarehouseAddress, setErrorWarehouseAddress] = useState(false);

    // state to store members array
    const [managers, setManagers] = useState([]);

    // console.log(managers)

    // get managers
    useEffect(() => {
        // fetch team members data
        // const fetchTeamMembers = async (business_id) => {
        //     try {
        //         const collectionRef = collection(database, "users");
        //         let q = query(
        //                 collectionRef, 
        //                 where("business_id", "==", business_id),
        //                 where("role", "==", "Manager"),
        //                 where("deactivated", "==", false),
        //                 orderBy("created_at"),
        //             );
            
        //         const unsubscribe = onSnapshot(q, (querySnapshot) => {
        //             let managersList = [];
        //             querySnapshot.forEach((doc) => {
        //                 const manager = {
        //                     id: doc.id,
        //                     full_name: doc.data().full_name,
        //                 };
        //                 managersList.push(manager);
        //             });

        //             setManagers(managersList);
        //             setObtainedManagers(true);
        //         }, (error) => { //handle errors
        //             console.log("Error: ", error.message);
        //             setToast({
        //                 text: error.message,
        //                 visible: true,
        //                 type: "error",
        //             })
        //         }, (data) => {
        //             console.log(data)
        //         });
    
        //         return unsubscribe;
        //     } catch (error) {
        //         console.log("Caught Error: ", error.message)
        //         setToast({
        //             text: error.message,
        //             visible: true,
        //             type: "error",
        //         })
        //     }
        // };
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
    

    // warehouse manager state, an object of format { id, full_name }
    const [warehouseManager, setWarehouseManager] = useState(null);
    // active input state for warehouse manager
    const [activeWarehouseManager, setActiveWarehouseManager] = useState(false);
    
    // reacieve waybill state, boolean
    const [waybillReceivable, setWaybillReceivable] = useState(false);
    
    // handle selected warehouse, function runs when a warehouse is clicked in select warehouse bottomsheet
    const handleWarehouseSelection = (id) => {
        // update the choseb warehouse
        setWarehouseManager(() => {
            return managers.find(manager => manager.id === id);
        });
        // close select warehouse bottomsheet modal
        closeModal();
    }

    // search query
    const [searchQuery, setSearchQuery] = useState('');

    // open bottomsheet modal function
    const openModal = () => {
        // present/open bottom sheet
        bottomSheetRef?.current?.present();
        // set warehouseManager select input as active
        // this is the only component on the screen running the openModal function
        setActiveWarehouseManager(true);
        // dismiss keyboard if opened
        Keyboard.dismiss();
    }

    // close bottomsheet modal modal function
    const closeModal = () => {
        // close bottom sheet
        bottomSheetRef?.current?.close();
        // disable active input state for warehouse manager select component
        setActiveWarehouseManager(false);
    }
    
    // open success pop up bottomsheet modal
    const openSuccessModal = () => {
        // present succes bottom sheet
        successSheetRef?.current?.present();
    }

    // close success pop up bottomsheet modal
    const closeSuccessModal = () => {
        // close success bottomsheet
        successSheetRef?.current?.close();
    }

    // handle create new warehouse
    const handleCreateWarehouse = async () => {
        // dismiss keyboard first
        Keyboard.dismiss();
        // signify loading state for main button
        setIsLoading(true);
        try {
            // check for empty fields
            if (warehouseName === "" || warehouseManager === null || warehouseAddress === "") {
                // throw error if fields are empty
                throw new Error("Please fill in all fields");
            }

            // ref to warehouses collection
            const warehousesRef = collection(database, "warehouses");

            // check if they exist a wreahouse_name in warehouses collection
            // where warehouse_name = warehouseName and business_id = authData.business_id
            const q = query(
                warehousesRef, 
                where("business_id", "==", authData?.business_id), 
                where("warehouse_name", "==", warehouseName.toLowerCase())
            );

            // get docs
            const querySnapshot = await getDocs(q);
            // if data exist throw error, warehouse already exist
            if (querySnapshot.size > 0) {
                setIsLoading(false);
                // throw error, if warehouse already exist
                throw new Error("Warehouse already exist");
            }
            
            // save data in database
            await addDoc(warehousesRef, {
                business_id: authData?.business_id, // business id
                warehouse_name: warehouseName.toLowerCase(), // convert to lowercase
                warehouse_manager: warehouseManager?.id, // save just manager id
                warehouse_address: warehouseAddress, // save address in nomral input format 
                waybill_receivable: waybillReceivable, 
                created_at: serverTimestamp(), // timestamp
                edited_at: serverTimestamp(), // timestamp
            });

            // disable button loading state
            setIsLoading(false);

            // indicate success modal
            openSuccessModal();

        } catch (error) { // handke errors
            console.log(error.message);
            // show error toast
            setToast({
                visible: true,
                type: "error",
                text: error.message,
            });
            // disable loading state
            setIsLoading(false);
        }
    }

    // handle confirm add warehouse
    const handleConfirmAddWarehouse = () => {
        // close success modal bottomsheet
        closeSuccessModal();
        // navigate back to warehouse screen
        navigation.navigate("Warehouse");
    }
    
    // disable active states for select input if back button is pressed
    // this is useful if the select warehouse bottomsheet is closed 
    // without selecting a warehouse
    useEffect(() => {
        if (!bottomSheetOpen) {
            setActiveWarehouseManager(false);
        }
    }, [bottomSheetOpen]) // depends on bottomSheetOpen state


    return (
        <>
            <TouchableWithoutFeedback
                onPress={Keyboard.dismiss}
                // onclick anywhere else on screen besides the input and keyboard, dismiss keyboard
            >
                <View style={style.container}>
                    <View style={style.mainWrapper}>
                        {/* Header Compnent */}
                        <Header
                            stackName={"Add New Warehouse"}
                            navigation={navigation}
                            unpadded={true}
                        />
                        {/* paragraph text */}
                        <Text style={style.paragraph}>
                            Create a new warehouse for your business
                        </Text>
                        {/* input container/wrapper */}
                        <View style={style.inputWrapper}>
                            {/* warehouse name Input*/}
                            <Input 
                                label={"Warehouse Name"}
                                placeholder={"Warehouse name"}
                                value={warehouseName}
                                onChange={updateWarehouseName}
                                error={errorWarehouseName}
                                setError={setErrorWarehouseName}
                            />
                            {/* warehouse address Inpput*/}
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
                                onPress={obtainedManagers ? openModal : () => {}}
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
                    {/* create warehouse button, disabled if inputs are empty */}
                    <CustomButton
                        name={"Create Warehouse"}
                        unpadded={true}
                        isLoading={isLoading}
                        backgroundColor={background}
                        inactive={warehouseManager === null || warehouseName === "" || warehouseAddress === ""}
                        onPress={handleCreateWarehouse}
                    />
                </View>
            </TouchableWithoutFeedback>
            {/* bottomsheet to select managers */}
            <CustomBottomSheet
                bottomSheetModalRef={bottomSheetRef}
                sheetTitle={"Select Warehouse"}
                snapPointsArray={["50%", "75%", "100%"]}
                autoSnapAt={0}
                closeModal={closeModal}
            >
                {/* search bar to search for managers */}
                <SearchBar
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    placeholder={"Search warehouse"}
                    backgroundColor={background}
                    disableFilter={true}
                />
                <BottomSheetScrollView style={style.sheetScroll} showsVerticalScrollIndicator={false}>
                    <Text style={style.headingText}>
                        Managers in your team
                    </Text>
                    {/* list of managers */}
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
            </CustomBottomSheet>
            {/* success bottom sheet to indicate warehouse was created successfully */}
            <SuccessSheet
                closeSuccessModal={closeSuccessModal}
                successSheetRef={successSheetRef}
                heading={"New warehouse created"}
                height={320}
                paragraph={<>
                    You have successfully created a new warehouse: 
                    <Text style={style.boldText}> {warehouseName}</Text>
                </>}
                primaryFunction={handleConfirmAddWarehouse}
            />
        </>
    )
}

export default AddWarehouse

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