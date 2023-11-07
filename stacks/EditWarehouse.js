import {
    StyleSheet,
    TouchableWithoutFeedback,
    Text,
    View,
    Keyboard,
    TouchableOpacity,
    Modal,
} from 'react-native'
// react hooks
import React, { useEffect, useState, useRef } from 'react'
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

const EditWarehouse = ({navigation, route}) => {

    // loading state for buttons
    const [isLoading, setIsLoading] = useState(false);

    const { warehouse_name, warehouse_address, warehouse_manager, receive_waybill } = route?.params;

    // bottomsheet refs
    const { stackedSheetRef, stackedSheetOpen, successSheetRef } = useGlobals();

    // warehouse name 
    const [warehouseName, setWarehouseName] = useState(warehouse_name);
    // warehouse name input error
    const [errorWarehouseName, setErrorWarehouseName] = useState(false);
    
    // warehouse address 
    const [warehouseAddress, setWarehouseAddress] = useState(warehouse_address);
    // warehouse address input error
    const [errorWarehouseAddress, setErrorWarehouseAddress] = useState(false);

    const managers = [
        {
            id: 1,
            full_name: "Abiodun Johnson"
        },
        {
            id: 2,
            full_name: "John Doe"
        },
        {
            id: 3,
            full_name: "Jon Snow"
        },
        {
            id: 5,
            full_name: "Felix Ibru"
        },
    ];

    // origin warehouse state
    const [warehouseManager, setWarehouseManager] = useState(warehouse_manager);
    // active input state
    const [activeWarehouseManager, setActiveWarehouseManager] = useState(false);

    // reacieve waybill state
    const [receiveWaybill, setReceiveWaybill] = useState(receive_waybill);
    
    const handleWarehouseSelection = (id) => {
        setWarehouseManager(() => {
            return managers.find(manager => manager.id === id);
        });
        closeModal();
    }

    // search query
    const [searchQuery, setSearchQuery] = useState(null);

    const openModal = () => {
        stackedSheetRef?.current?.present();
        Keyboard.dismiss();
        setActiveWarehouseManager(true);
    }

    // close modal function
    const closeModal = () => {
        stackedSheetRef?.current?.close();
        setActiveWarehouseManager(false);
    }
    
    // disable active states for select input if back button is pressed
    useEffect(() => {
        if (!stackedSheetOpen) {
            setActiveWarehouseManager(false);
        }
    }, [stackedSheetOpen])


    // handle save changes
    const handleSaveChanges = () => {
        setIsLoading(true);
        
        setTimeout(() => {
            setIsLoading(false);
            openSuccessModal();
        }, 3000);
    }

    // open pop up modal
    const openSuccessModal = () => {
        successSheetRef?.current?.present();
    }

    // close pop up modal
    const closeSuccessModal = () => {
        successSheetRef?.current?.close();
    }

    const handleConfirmEditWarehouse = () => {
        closeSuccessModal();
        navigation.navigate("Warehouse");
    }

    const detectAnyChanges = warehouseName !== warehouse_name || 
    warehouseAddress !== warehouse_address || 
    warehouseManager !== warehouse_manager || 
    receiveWaybill !== receive_waybill;

    // console.log(detectAnyChanges);

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
                                onChange={setWarehouseName}
                                error={errorWarehouseName}
                                setError={setErrorWarehouseName}
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
                                onPress={openModal}
                                active={activeWarehouseManager}
                            />
                            {/* receive waybill check box */}
                            <View style={style.receiveWaybillWrapper}>
                                <CheckBox
                                    value={receiveWaybill}
                                    onPress={() => setReceiveWaybill(prevValue => !prevValue)}
                                />
                                <Text style={style.receiveWaybillText}>Receive waybill in this warehouse</Text>
                            </View>
                        </View>
                    </View>
                    <CustomButton
                        name={"Save Changes"}
                        unpadded={true}
                        backgroundColor={background}
                        isLoading={isLoading}
                        inactive={!detectAnyChanges}
                        onPress={handleSaveChanges}
                    />
                </View>
            </TouchableWithoutFeedback>
            <CustomBottomSheet
                bottomSheetModalRef={stackedSheetRef}
                sheetTitle={"Select Warehouse"}
                snapPointsArray={["50%", "75%", "100%"]}
                autoSnapAt={0}
                closeModal={closeModal}
            >
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
                    <View style={style.listWrapper}>
                        {managers.filter(manager => manager.id !== warehouseManager?.id).map(manager => (
                                <TouchableOpacity
                                    key={manager.id}
                                    style={style.listItemButton}
                                    onPress={() => handleWarehouseSelection(manager.id)}
                                >
                                    <Text style={style.listItemText}>
                                        {manager?.full_name}
                                    </Text>
                                </TouchableOpacity>
                            ))
                        }
                    </View>
                </BottomSheetScrollView>
            </CustomBottomSheet>
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