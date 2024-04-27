import { StyleSheet, TouchableWithoutFeedback, Text, View, Keyboard, TouchableOpacity, Platform } from 'react-native'
// react hooks
import React, { useEffect, useRef, useState } from 'react'
// import 
import Header from '../components/Header';
import SelectInput from '../components/SelectInput';
import Input from '../components/Input';
import CustomButton from '../components/CustomButton';
import CustomBottomSheet from '../components/CustomBottomSheet';
import SearchBar from '../components/SearchBar';
// bottomsheet components
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
// globals
import { useGlobals } from '../context/AppContext';
// colors
import { background, black, bodyText, listSeparator } from '../style/colors';
// utils
import { windowHeight } from '../utils/helpers';

const StockTransfer = ({navigation}) => {

    // sheet ref
    const sheetRef = useRef(null);

    // bottomsheet refs
    const {
        bottomSheet,
        setBottomSheet,
    } = useGlobals();

    // sheet parameters
    const [sheetParameters,setSheetParameters] = useState({
        content: '',
    })

    // additional details
    const [additionalDetails, setAdditionalDetails] = useState("");

    const [additionalDetailsError, setAdditionalDetailsError] = useState(false);

    const warehouses = [
        {
            id: 1,
            warehouse_name: "Warri"
        },
        {
            id: 2,
            warehouse_name: "Benin"
        },
        {
            id: 3,
            warehouse_name: "Asaba"
        },
        {
            id: 4,
            warehouse_name: "Agbor"
        },
        {
            id: 5,
            warehouse_name: "Sapele"
        },
        {
            id: 6,
            warehouse_name: "Auchi"
        },
    ];

    // origin warehouse state
    const [originWarehouse, setOriginWarehouse] = useState(null);
    // active input state
    const [activeOriginWarehouse, setActiveOriginWarehouse] = useState(false);
    
    // destination warehouse state
    const [destinationWarehouse, setDestinationWarehouse] = useState(null);
    // active input state
    const [activeDestinationWarehouse, setActiveDestinationWarehouse] = useState(false);

    // update botomsheet global states
    useEffect(() => {
        // set bottomsheet state
        setBottomSheet(prevState=> {
            return {...prevState, close: () => {
                // close bottomsheet 
                sheetRef.current?.close()
                // disable inputs active states
                setActiveDestinationWarehouse(false);
                setActiveOriginWarehouse(false);
            }}
        });
    }, []);

    const handleWarehouseSelection = (id, type) => {
        if (type === "origin") {
            setOriginWarehouse(() => {
                return warehouses.find(warehouse => warehouse.id === id);
            });
        } else {
            setDestinationWarehouse(() => {
                return warehouses.find(warehouse => warehouse.id === id);
            });
        }
        closeModal();
    }

    // search query
    const [searchQuery, setSearchQuery] = useState(null);

    // open modal function
    const openModal = (type) => {
        // dismiss keyboard
        Keyboard.dismiss();

        // set sheet parameters
        setSheetParameters({
            content: type,
        })

        // set active state for corresponding input
        if (type === "origin") setActiveOriginWarehouse(true);
        else if (type === "destination") setActiveDestinationWarehouse(true); 

        // open bottomsheet
        sheetRef?.current?.present();

        // update bottomsheet global state
        setBottomSheet(prevState => {
            return {
                ...prevState,
                opened: true,
            }
        });
    }
    
    // close modal function
    const closeModal = () => {
        // close bottomsheet
        sheetRef?.current?.close();

        // deactiavte active states for select inputs
        setActiveDestinationWarehouse(false);
        setActiveOriginWarehouse(false);

        // update bottomsheet global state
        setBottomSheet(prevState => {
            return {
                ...prevState,
                opened: false,
            }
        });
    };

    // listen for keyboard opening or closing
    useEffect(() => {
        // if keyboard is open
        const keyboardDidShowListener = Keyboard.addListener(
            Platform.OS === 'android' ? 'keyboardDidShow' : 'keyboardWillShow', () => {
                if (!bottomSheet.opened) return;
                // set bottomsheet paramteres
                sheetRef.current?.snapToIndex(2);
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
    }, [bottomSheet.opened]);


    return (<>
        <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}
        >
            <View style={style.container}>
                <View style={style.mainWrapper}>
                    <Header
                        stackName={"Stock transfer"}
                        navigation={navigation}
                        unpadded={true}
                    />
                    <Text style={style.paragraph}>
                        Set your transfer preferences
                    </Text>
                    <View style={style.inputWrapper}>
                        
                        {/* origin warehouse */}
                        <SelectInput
                            label={"Select Origin"}
                            placeholder={"Select origin"}
                            value={originWarehouse?.warehouse_name}
                            inputFor={"String"}
                            onPress={() => openModal("origin")}
                            active={activeOriginWarehouse}
                        />

                        {/* destination warehouse */}
                        <SelectInput
                            label={"Select Destination"}
                            placeholder={"Select destination"}
                            value={destinationWarehouse?.warehouse_name}
                            inputFor={"String"}
                            onPress={() => openModal("destination")}
                            active={activeDestinationWarehouse}
                        />

                        {/* additional details */}
                        <Input 
                            label={"Additional Details"}
                            multiline={true}
                            height={64}
                            textAlign={"top"}
                            minRows={4}
                            placeholder={"Input additional details here..."}
                            value={additionalDetails}
                            onChange={setAdditionalDetails}
                            error={additionalDetailsError}
                            setError={setAdditionalDetailsError}
                        />
                    </View>
                </View>
                <CustomButton
                    name={"Continue"}
                    unpadded={true}
                    backgroundColor={background}
                    inactive={originWarehouse === null || destinationWarehouse === null}
                    onPress={() => navigation.navigate("StockTransferProducts", {
                        originWarehouse,
                        destinationWarehouse,
                        additionalDetails,
                    })}
                />
            </View>
        </TouchableWithoutFeedback>
        <CustomBottomSheet
            sheetRef={sheetRef}
            closeModal={closeModal}
            sheetTitle={"Select Warehouse"}
            snapPointsArray={["50%", "75%", "100%"]}
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
                    Available Warehouses
                </Text>
                <View style={style.listWrapper}>
                    {sheetParameters.content === "origin" && 
                        warehouses.filter(warehouse => warehouse.id !== destinationWarehouse?.id).map(warehouse => (
                            <TouchableOpacity
                                key={warehouse.id}
                                style={style.listItemButton}
                                onPress={() => handleWarehouseSelection(warehouse.id, sheetParameters.content)}
                            >
                                <Text style={style.listItemText}>
                                    {warehouse.warehouse_name}
                                </Text>
                            </TouchableOpacity>
                        ))
                    }

                    {sheetParameters.content === "destination" && 
                        warehouses.filter(warehouse => warehouse.id !== originWarehouse?.id).map(warehouse => (
                            <TouchableOpacity
                                key={warehouse.id}
                                style={style.listItemButton}
                                onPress={() => handleWarehouseSelection(warehouse.id, sheetParameters.content)}
                            >
                                <Text style={style.listItemText}>
                                    {warehouse.warehouse_name}
                                </Text>
                            </TouchableOpacity>
                        ))
                    }
                </View>
            </BottomSheetScrollView>
        </CustomBottomSheet>
    </>)
}

export default StockTransfer

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
})