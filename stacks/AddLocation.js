import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TouchableWithoutFeedback,
    ScrollView,
    Keyboard,
} from 'react-native'
import React, {useState, useEffect, useMemo, useRef} from 'react'
// icons
import MenuIcon from "../assets/icons/MenuIcon";
import ClearSearch from "../assets/icons/ClearSearch";
// components
import Header from '../components/Header';
import SelectInput from '../components/SelectInput';
import Input from '../components/Input';
import CustomButton from '../components/CustomButton';
import CustomBottomSheet from '../components/CustomBottomSheet';
// colors
import { background, black, bodyText, listSeparator, primaryColor, subText, white } from '../style/colors';
// globals
import { useGlobals } from '../context/AppContext';
// helpers
import { windowWidth } from '../utils/helpers'
// bottom sheet components
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';


const AddLocation = ({navigation}) => {

    // gloabsl
    const { bottomSheetRef, stackedSheetRef, stackedSheetOpen } = useGlobals();

    const townComponentRef = useRef([]);

    const disable = false;

    // location state, to store list of locations
    const sublocations = [
        {
            warehouse: "Warri",
            towns: [
                {
                    id: 1,
                    town: "Warri",
                    charge: 3000,
                    editing: false,
                    disabled: disable,
                },
                {
                    id: 2,
                    town: "Udu",
                    charge: 3500,
                    editing: false,
                    disabled: disable,
                },
                {
                    id: 3,
                    town: "Agbarho",
                    charge: 3500,
                    editing: false,
                    disabled: disable,
                },
                {
                    id: 4,
                    town: "Ughelli",
                    charge: 4000,
                    editing: false,
                    disabled: disable,
                },
                {
                    id: 5,
                    town: "Jeddo",
                    charge: 3500,
                    editing: false,
                    disabled: disable,
                }
            ]
        },
        {
            warehouse: "Asaba",
            towns: [
                {
                    id: 6,
                    town: "Asaba",
                    charge: 4000,
                    editing: false,
                    disabled: disable,
                },
                {
                    id: 7,
                    town: "Ibusa",
                    charge: 4500,
                    editing: false,
                    disabled: disable,
                },
                {
                    id: 8,
                    town: "Ogwashi-Uku",
                    charge: 5000,
                    editing: false,
                    disabled: disable,
                },
                {
                    id: 9,
                    town: "Ugbolu",
                    charge: 5000,
                    editing: false,
                    disabled: disable,
                }
            ]
        },
    ];

    // town value
    const [townInput, setTownInput] = useState("");

    // state to indicate error in town input
    const [townInputError, setTownInputError] = useState(false);
    
    // charge input
    const [chargeInput, setChargeInput] = useState("");

    // state to indicate error in charge input
    const [chargeInputError, setChargeInputError] = useState(false);

    // warehouse input
    const [warehouseInput, setWarehouseInput] = useState(null);

    // warehosue input active
    const [warehouseInputActive, setWarehouseInputActive] = useState(false);

    const updateWarehouse = (id, setWarehouse) => {
        closeStackedModal();
        setWarehouse(warehouses.find((item) => item.id === id));
        setWarehouseInputActive(false);
    }

    // update charge
    const updateChargeInput = (text) => {
        let newText = text.replace(new RegExp(',', 'g'), '');
        // remove all occurrence of the comma character ',' in text gloablly
        if (newText) setChargeInput(parseFloat(newText));
        else setChargeInput(0);
    }
    
    // console.log(townInput);

    // open bottom sheet function
    const openModal = (type) => {
        bottomSheetRef?.current?.present();
        // set modal type
        setModalType(type);
    }

    // close bottom sheet function
    const closeModal = () => {
        bottomSheetRef?.current?.close();
    }

    // console.log(stackedSheetOpen);

    // check if back button is pressesd when stacked sheet is opne
    useEffect(() => {
        if (!stackedSheetOpen) {
            setWarehouseInputActive(false);
        }
    }, [stackedSheetOpen])

    // open stacked bottom sheet function
    const openStackedModal = () => {
        stackedSheetRef?.current?.present();
        // set modal type
        setWarehouseInputActive(true);
    }

    // list of warehouse
    const warehouses = [
        {id:  1, name: "Warri"},
        {id:  2, name: "Sapele"},
        {id:  3, name: "Benin"},
        {id:  4, name: "Agbor"},
        {id:  5, name: "Asaba"},
        {id:  6, name: "Abraka"},
    ];

    // close stacked bottom sheet function
    const closeStackedModal = () => {
        stackedSheetRef?.current?.close();
    }

    const [modalType, setModalType] = useState("")

    const bottomSheetProps = useMemo(() => {
        return {
            snapPointsArray: modalType === "Select" ? ["50%", "75%", "100%"] : ["100%"],
            autoSnapAt: modalType === "Select" ? 1 : 0,
            sheetTitle: modalType === "Select" ? "Select State" : `Add${sublocations.length !== 0 ? " New" : ""} Sub-Location`,
        }
    }, [modalType]);

    const showLocationOptions = (id) => {
        console.log(townComponentRef.current);
    }

    // handle add locations function
    const handleAddLocations = () => {

    }

    // handle confirm location
    const handleConfirmLocations = () => {

    }

    return (<>
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false} >
            {/* header component */}
            <Header
                navigation={navigation} 
                stackName={"Add Location"} 
                unpadded={true}
            />
            <View style={styles.main}>
                <SelectInput
                    // state input
                    label={"State/Province"}
                    placeholder={"Select State"}
                    inputFor={"String"}
                    onPress={() => openModal("Select")}
                />
                <View style={styles.locationsWrapper}>
                    <TouchableOpacity 
                        style={styles.buttonLink}
                        onPress={() => openModal("Add")}
                    >
                        <Text style={styles.linkText}>+ Add{sublocations.length !== 0 ? " New" : ""} Sub-location</Text>
                    </TouchableOpacity>
                    {sublocations.length === 0 ? (
                        <Text style={styles.paragraph}>
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                        </Text>
                    ) : (
                        <View style={styles.sublocationsWrapper}>
                            {sublocations.map((sublocation) => (
                                <View key={sublocation.warehouse} style={styles.warehouseWrapper}>
                                    <View style={styles.warehouseInfoWrapper}>
                                        <Text style={styles.warehouseName}>{sublocation.warehouse}</Text>
                                        <Text style={styles.warehouseLocationCount}>
                                            {sublocation.towns.length} 
                                            {sublocation.towns.length > 1 ? " locations" : " location"} 
                                        </Text>
                                    </View>
                                    {sublocation.towns.map((town) => {
                                        if (town?.editing) return (
                                            <View key={town.town} style={styles.editTownContainer}>
                                                <View 
                                                    style={
                                                        [styles.townWrapper, 
                                                        {
                                                            paddingHorizontal: 16,
                                                            marginBottom: 4,
                                                        }
                                                    ]}
                                                >
                                                    <View style={styles.townDetailsWrapper}>
                                                        <Text style={styles.townNameBold}>{town.town}</Text>
                                                        <Text style={styles.townEditInstructions}>
                                                            Edit your sub location details
                                                        </Text>
                                                    </View>
                                                    <TouchableOpacity
                                                        style={styles.optionButton}
                                                    >
                                                        <ClearSearch />
                                                    </TouchableOpacity>
                                                </View>
                                                <SelectInput
                                                    label={"Select Warehouse"}
                                                    placeholder={"Select State"}
                                                    inputFor={"String"}
                                                    onPress={openStackedModal}
                                                    value={warehouseInput?.name}
                                                    active={warehouseInputActive}
                                                />
                                                <Input 
                                                    label={"Charge"}
                                                    placeholder={"Charge"}
                                                    value={chargeInput}
                                                    onChange={updateChargeInput}
                                                    error={chargeInputError}
                                                    setError={setChargeInputError}
                                                    keyboardType={"numeric"}
                                                />
                                                <CustomButton 
                                                    name={"Save"}
                                                    shrinkWrapper={true}
                                                    buttonStyle={{width: 152}}
                                                    wrapperStyle={{        
                                                        justifyContent: "flex-end",
                                                        padding: 0,
                                                    }}
                                                    onPress={() => {}}
                                                />
                                            </View>
                                        )
                                        return (
                                            <View 
                                                key={town.town} 
                                                style={[
                                                    styles.townWrapper,
                                                    town.disabled && {opacity: 0.5}
                                                ]}
                                                onLayout={(e) => {
                                                    // console.log(e);
                                                    townComponentRef.current.push({
                                                        id: town.id, 
                                                        y: e.nativeEvent.layout.y,
                                                    })
                                                }}
                                            >
                                                <View style={styles.townDetailsWrapper}>
                                                    <Text style={styles.townName}>{town.town}</Text>
                                                    <Text style={styles.townCharge}>
                                                        ₦ {town.charge}.
                                                        <Text style={styles.decimal}>
                                                            00
                                                        </Text>
                                                    </Text>
                                                </View>
                                                <TouchableOpacity
                                                    style={styles.optionButton}
                                                    onPress={town?.disabled ? () => {} : () => showLocationOptions(town.id)}
                                                >
                                                    <MenuIcon />
                                                </TouchableOpacity>
                                            </View>
                                        )
                                    })}
                                </View>
                            ))}
                        </View>
                    )}
                </View>
            </View>
        </ScrollView>
        {/* bottomsheet */}
        <CustomBottomSheet
            bottomSheetModalRef={bottomSheetRef}
            snapPointsArray={bottomSheetProps.snapPointsArray}
            autoSnapAt={bottomSheetProps.autoSnapAt}
            sheetTitle={bottomSheetProps.sheetTitle}
            closeModal={closeModal}
        >
            {modalType === "Select" ? (
                <></>
            ) : (
                <TouchableWithoutFeedback
                    onPress={Keyboard.dismiss}
                >
                    <View style={styles.modalWrapper}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalParagraph}>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            </Text>
                            <View style={styles.modalInputWrapper}>
                                <Input 
                                    label={"City/Town"}
                                    placeholder={"City/Town"}
                                    value={townInput}
                                    onChange={setTownInput}
                                    error={townInputError}
                                    setError={setTownInputError}
                                />
                                <SelectInput
                                    label={"Select Warehouse"}
                                    placeholder={"Select State"}
                                    inputFor={"String"}
                                    onPress={openStackedModal}
                                    value={warehouseInput?.name}
                                    active={warehouseInputActive}
                                />
                                <Input 
                                    label={"Charge"}
                                    placeholder={"Charge"}
                                    value={chargeInput}
                                    onChange={updateChargeInput}
                                    error={chargeInputError}
                                    setError={setChargeInputError}
                                    keyboardType={"numeric"}
                                />
                            </View>
                        </View>
                        <CustomButton
                            shrinkWrapper={true}
                            name={"Save"}
                            onPress={handleAddLocations}
                            unpadded={true}
                        />
                    </View>
                </TouchableWithoutFeedback>
            )}
        </CustomBottomSheet>
        {/* stacked bottomsheet */}
        <CustomBottomSheet
            bottomSheetModalRef={stackedSheetRef}
            snapPointsArray={["50%", "75%"]}
            autoSnapAt={0}
            sheetTitle={"Select Warehouse"}
            closeModal={closeStackedModal}
            stacked={true}
        >
            <BottomSheetScrollView style={styles.stackedModalWrapper}>
                <View style={styles.listWrapper}>
                    {warehouses.map((warehouse) => (
                        <TouchableOpacity 
                            key={warehouse.id} 
                            style={styles.listItem}
                            onPress={() => updateWarehouse(warehouse.id, setWarehouseInput)}
                        >
                            <Text style={styles.listText}>{warehouse.name}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </BottomSheetScrollView>
        </CustomBottomSheet>
        {/* fixed buttons */}
        <CustomButton 
            fixed={true}
            backgroundColor={white}
            name={"Done"}
            onPress={handleConfirmLocations}
            inactive={true}
        />
    </>)
}

export default AddLocation

const styles = StyleSheet.create({
    container: {
        backgroundColor: background,
        width: "100%",
        minHeight: "100%",
        paddingHorizontal: 20,
    },
    main: {
        marginTop: 32,
        width: "100%",
        paddingBottom: 120,
    },
    locationsWrapper: {
        marginTop: 24,
    },
    buttonLink: {
        marginBottom: 20,
    },
    linkText: {
        color: primaryColor,
        fontSize: 12,
        fontFamily: "mulish-semibold",
        textDecorationColor: primaryColor,
        textDecorationLine: 'underline',
    },
    paragraph: {
        color: subText,
        fontSize: 12,
        fontFamily: 'mulish-regular',
    },
    sublocationsWrapper: {
        width: "100%",
        display: "flex",
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 10,
    },
    warehouseWrapper: {
        width: "100%",
        display: "flex",
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 5,
        padding: 12,
        backgroundColor: white,
        borderRadius: 12,
    },
    warehouseInfoWrapper: {
        marginTop: 3,
        marginBottom: 5,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: "100%",
    },
    warehouseName: {
        fontFamily: 'mulish-semibold',
        fontSize: 12,
        color: subText,
    },  
    warehouseLocationCount: {
        fontFamily: 'mulish-semibold',
        fontSize: 10,
        color: black,
    },  
    townWrapper: {
        width: "100%",
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        paddingLeft: 16,
        paddingRight: 12,
        backgroundColor: background,
        borderRadius: 12,
    },
    editTownContainer: {
        width: "100%",
        display: "flex",
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 12,
        marginBottom: 15,
    },
    townName: {
        fontSize: 12,
        fontFamily: 'mulish-medium',
        color: bodyText,
        marginBottom: 4,
    },
    townNameBold: {
        fontSize: 12,
        fontFamily: 'mulish-bold',
        color: black,
        marginBottom: 4,
    },
    townEditInstructions: {
        fontSize: 12,
        fontFamily: 'mulish-regular',
        color: bodyText,
    },
    townCharge: {
        fontSize: 12,
        fontFamily: 'mulish-semibold',
        color: black,
    },
    decimal: {
        fontSize: 12,
        fontFamily: 'mulish-semibold',
        color: subText,
    },
    optionButton: {
        transform: [
            {
                rotate: '90deg'
            }
        ]
    },
    listWrapper: {
        width: "100%",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 10,
    },
    listItem: {
        width: "100%",
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: 40,
        paddingVertical: 6,
        borderBottomWidth: 1,
        borderBottomColor: listSeparator,
    },
    listText: {
        fontSize: 14,
        fontFamily: 'mulish-semibold',
        color: black,
    },


    // bottoms sheet style
    modalWrapper: {
        width: "100%",
        flex: 1,
        height: "100%",
        display: "flex",
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    modalContent: {
        width: "100%",
        display: "flex",
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    modalParagraph: {
        marginBottom: 30,
        fontFamily: 'mulish-regular',
        color: subText,
        fontSize: 12,
        textAlign: 'center',
        maxWidth: 255,
    },
    modalInputWrapper: {
        width: "100%",
        display: "flex",
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        gap: 20,
    },
    
})