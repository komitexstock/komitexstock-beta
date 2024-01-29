import { StyleSheet, TouchableWithoutFeedback, Text, View, Keyboard, TouchableOpacity } from 'react-native'
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

const AddWarehouse = ({navigation}) => {

    // isloading state
    const [isLoading, setIsLoading] = useState(false);

    // bottomsheet refs
    const { bottomSheetRef, bottomSheetOpen, successSheetRef } = useGlobals();

    // warehouse name 
    const [warehouseName, setWarehouseName] = useState("");
    // warehouse name input error
    const [errorWarehouseName, setErrorWarehouseName] = useState(false);
    
    // warehouse address 
    const [warehouseAddress, setWarehouseAddress] = useState("");
    // warehouse address input error
    const [errorWarehouseAddress, setErrorWarehouseAddress] = useState(false);

    // list of managers
    const managers = [
        {
            id: 1,
            fullname: "Okomite-Iffie Ovie"
        },
        {
            id: 2,
            fullname: "John Doe"
        },
        {
            id: 3,
            fullname: "Jon Snow"
        },
        {
            id: 5,
            fullname: "Felix Ibru"
        },
    ];

    // origin warehouse state
    const [warehouseManager, setWarehouseManager] = useState(null);
    // active input state
    const [activeWarehouseManager, setActiveWarehouseManager] = useState(false);
    
    // reacieve waybill state
    const [receiveWaybill, setReceiveWaybill] = useState(false);
    
    // handle selected warehouse, function runs when a warehouse is clicked in select warehouse nottomsheet
    const handleWarehouseSelection = (id) => {
        setWarehouseManager(() => {
            return managers.find(manager => manager.id === id);
        });
        closeModal();
    }

    // search query
    const [searchQuery, setSearchQuery] = useState(null);

    // open bottomsheet modal function
    const openModal = () => {
        bottomSheetRef?.current?.present();
        setActiveWarehouseManager(true);
        Keyboard.dismiss();
    }

    // close bottomsheet modal modal function
    const closeModal = () => {
        bottomSheetRef?.current?.close();
        setActiveWarehouseManager(false);
    }
    
    // open success pop up bottomsheet modal
    const openPopUpModal = () => {
        successSheetRef?.current?.present();
    }

    // close success pop up bottomsheet modal
    const closePopUpModal = () => {
        successSheetRef?.current?.present();
    }

    // handle create new warehouse
    const handleCreateWarehouse = () => {
        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);
            openPopUpModal();
        }, 3000);
    }

    // handle confirm add warehouse
    const handleConfirmAddWarehouse = () => {
        closePopUpModal();
        navigation.navigate("Warehouse");
    }
    
    // disable active states for select input if back button is pressed
    useEffect(() => {
        if (!bottomSheetOpen) {
            setActiveWarehouseManager(false);
        }
    }, [bottomSheetOpen])


    return (
        <>
            <TouchableWithoutFeedback
                onPress={Keyboard.dismiss}
            >
                <View style={style.container}>
                    <View style={style.mainWrapper}>
                        <Header
                            stackName={"Add New Warehouse"}
                            navigation={navigation}
                            unpadded={true}
                        />
                        <Text style={style.paragraph}>
                            Create a new warehouse for your business
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
                                value={warehouseManager?.fullname}
                                inputFor={"String"}
                                onPress={() => openModal()}
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
                        {managers.filter(manager => manager.id !== warehouseManager?.id).map(manager => (
                            <TouchableOpacity
                                key={manager.id}
                                style={style.listItemButton}
                                onPress={() => handleWarehouseSelection(manager.id)}
                            >
                                <Text style={style.listItemText}>
                                    {manager.fullname}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </BottomSheetScrollView>
            </CustomBottomSheet>
            {/* success bottom sheet to indicate warehouse was created successfully */}
            <SuccessSheet
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