import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TouchableWithoutFeedback,
    ScrollView,
    Keyboard,
} from 'react-native'
// react hooks
import React, {useState, useEffect, useMemo, useRef} from 'react'
// icons
import DeleteBlackLargeIcon from "../assets/icons/DeleteBlackLargeIcon";
import EditBlackLargeIcon from '../assets/icons/EditBlackLargeIcon';
import LocationLightIcon from '../assets/icons/LocationLightIcon';
// components
import Header from '../components/Header';
import SelectInput from '../components/SelectInput';
import Input from '../components/Input';
import CustomButton from '../components/CustomButton';
import CustomBottomSheet from '../components/CustomBottomSheet';
import Menu from '../components/Menu';
import LocationListItem from '../components/LocationListItem';
// colors
import { background, black, bodyText, listSeparator, locationItemOverlay, primaryColor, subText, white } from '../style/colors';
// globals
import { useGlobals } from '../context/AppContext';
// helpers
import { windowHeight, windowWidth } from '../utils/helpers'
// bottom sheet components
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';


const EditLocation = ({navigation, route}) => {

    const {stateLocations} = route?.params;

    // state
    const state = stateLocations?.name;

    // globals
    const { bottomSheetRef, stackedSheetRef, stackedSheetOpen, setToast } = useGlobals();

    // location state, to store list of locations
    const [sublocations, setSublocations] = useState([]);

    useEffect(() => {
        const groupedByWarehouse = stateLocations?.locations.reduce((acc, location) => {
            const {id, warehouse_id, warehouse_name, location: town, delivery_charge } = location;
        
            // Check if the warehouse_id exists in the accumulator array
            const warehouseIndex = acc.findIndex(item => item.warehouse_id === warehouse_id);
        
            if (warehouseIndex !== -1) {
                // If the warehouse_id exists, push the town details to its towns array
                acc[warehouseIndex].towns.push({
                    id,
                    town,
                    delivery_charge,
                    editing: false,
                    disabled: false,
                });
            } else {
                // If the warehouse_id doesn't exist, create a new warehouse object
                acc.push({
                    warehouse_id,
                    warehouse_name,
                    towns: [{
                        id,
                        town,
                        delivery_charge,
                        editing: false,
                        disabled: false,
                    }],
                });
            }
        
            return acc;
        }, []);

        setSublocations(groupedByWarehouse)
    }, [])

    // get total town insublocation
    const totalTownCount = sublocations.reduce((totalCount, location) => {
        // For each location, add the count of towns to the totalCount
        return totalCount + location.towns.length;
    }, 0);

    // get maximum charge
    const maximumCharge = sublocations.reduce((maxCharge, location) => {
        // Extract charges from all towns in each location and find the maximum charge
        const maxLocationCharge = location.towns.reduce((max, town) => {
            return Math.max(max, town.delivery_charge);
        }, Number.NEGATIVE_INFINITY); // Initialize with the smallest possible value
        return Math.max(maxCharge, maxLocationCharge);
    }, Number.NEGATIVE_INFINITY); // Initialize with the smallest possible value

    // get minimum charge
    const minimumCharge = sublocations.reduce((minCharge, location) => {
        // Extract charges from all towns in each location and find the minimum charge
        const minLocationCharge = location.towns.reduce((min, town) => {
            return Math.min(min, town.delivery_charge);
        }, Number.POSITIVE_INFINITY); // Initialize with the largest possible value
        return Math.min(minCharge, minLocationCharge);
    }, Number.POSITIVE_INFINITY); // Initialize with the largest possible value
    

    // id of selected town
    const [selectedTownId, setSelectedTownId] = useState(null);
    
    // id of selected warehouse
    const [selectedWarehouseId, setSelectedWarehouseId] = useState(null);

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

    // update warehouse function
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
        else setChargeInput("");
    }
    
    // console.log(townInput);

    // open bottom sheet function
    const openModal = () => {
        // present bottomsheet
        bottomSheetRef?.current?.present();

        // close menu if open, close menu
        if (menu.open) closeMenu();
    }

    // close bottom sheet function
    const closeModal = () => {
        bottomSheetRef?.current?.close();
    }

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

        // dismiss keyboard
        Keyboard.dismiss();
    }

    // list of warehouse
    const warehouses = [
        {id:  6, name: "Abraka"},
        {id:  4, name: "Agbor"},
        {id:  2, name: "Asaba"},
        {id:  3, name: "Benin"},
        {id:  8, name: "Kwale"},
        {id:  7, name: "Isoko"},
        {id:  5, name: "Sapele"},
        {id:  1, name: "Warri"},
    ];

    // close stacked bottom sheet function
    const closeStackedModal = () => {
        stackedSheetRef?.current?.close();
    }

    const [menu, setMenu] = useState({
        open: false,
        // position the menu initially off screen
        top: 2 * windowHeight,
    });


    // warehouse offsets
    const [warehouseOffsets, setWarehouseOffsets] = useState([]);
    // town offsets
    const [townOffsets, setTownOffsets] = useState([]);
    // scroll view Height
    const scrollViewHeight = useRef(0);

    // Use onLayout to update warehouse refs
    const handleWarehouseLayout = (warehouse_id, e) => {

        const yOffset = e.nativeEvent.layout.y;

        setWarehouseOffsets(prevOffsets => {
            if (prevOffsets.some(offset => offset.id === warehouse_id)) {
                return prevOffsets.map(offset => {
                    if (offset.id === warehouse_id) {
                        return {
                            ...offset,
                            y: yOffset
                        }
                    }
                    return offset
                })
            }
            return [
                ...prevOffsets,
                {
                    id: warehouse_id,
                    y: yOffset,
                }

            ]
        });
    };

    // on layout update town refs
    const handleTownLayout = (town_id, e) => {

        const yOffset = e.nativeEvent.layout.y;

        setTownOffsets(prevOffsets => {
            if (prevOffsets.some(offset => offset.id === town_id)) {
                return prevOffsets.map(offset => {
                    if (offset.id === town_id) {
                        return {
                            ...offset,
                            y: yOffset
                        }
                    }
                    return offset
                })
            }
            return [
                ...prevOffsets,
                {
                    id: town_id,
                    y: yOffset,
                }

            ]
        });
    };

    // function to get top offset of options menu
    const getTopOffset = (warehouse_id, town_id) => {
        // offset of the warehouse container from the top of the screen
        const topOffset = 205;
        // warehouse offset
        const warehouseOffset = warehouseOffsets.find((item) => item.id === warehouse_id)?.y;

        // town offset
        const townOffset = townOffsets.find((item) => item.id === town_id)?.y;
        // offset of menu from the top of location component
        // console.log("town offset: ", townOffset);
        const menuOffset = 49;
        // menu height
        const menuHeight = 124;
        // evaluate the top value of menu rendered below option button
        const renderMenuBelow = topOffset + warehouseOffset + townOffset + menuOffset;
        // evaluate the top value of menu rendered above option button
        const renderMenuAbove = topOffset + warehouseOffset + townOffset - menuHeight;

        // evaluate final value
        const finalValue = scrollViewHeight.current - renderMenuBelow <= 300 ? renderMenuAbove : renderMenuBelow;

        return finalValue;
    }

    // console.log(warehouseComponentRef.current);

    // open menu function
    const openMenu = (warehouse_id, town_id) => {

        // get top offset
        const top = getTopOffset(warehouse_id, town_id);
        // set menu
        setMenu({
            open: true,
            top: top,
        });

        // set selected warehouse id
        setSelectedWarehouseId(warehouse_id);

        // set selected town id
        setSelectedTownId(town_id);
    }

    // close menu function
    const closeMenu = () => {
        // console.log("CLose Menu Function called");
        setMenu(prveMenu => {
            return {
                ...prveMenu,
                open: false
            }
        });
    }

    const defaultChargeInput = useMemo(() => {
        return sublocations.find((item) => item.warehouse_id === selectedWarehouseId)
        ?.towns.find((item) => item.id === selectedTownId).charge;
    }, [selectedTownId, selectedWarehouseId]);

    const defaultWarehouseInput = useMemo(() => {
        return warehouses.find((item) => item.id === selectedWarehouseId);
    }, [selectedTownId, selectedWarehouseId]);

    // inactive save button
    const inactiveSaveButton = warehouseInput?.id === defaultWarehouseInput?.id && chargeInput === defaultChargeInput;

    // handle add locations function
    const handleAddLocations = () => {

        // dismiss keyboard
        Keyboard.dismiss();

        // fujnction to check if town exist in sublocations array
        const checkTownExist = sublocations.some(sublocation => {
            return sublocation.towns.some(town => town.town.toLowerCase() === townInput.toLowerCase());
        });

        if (checkTownExist) {
            // show error toast
            setToast({
                visible: true,
                type: "Error",
                text: "Town already exist",
            });

            // set town input error
            setTownInputError(true);
            // return from function
            return;
        }

        // close add sub location bottom sheet
        closeModal();

        const generatedTownId = Math.random();

        // check if warehouse in sub locations
        const warehouseExistInSublocations = sublocations.some(sublocation => sublocation.warehouse_id === warehouseInput.id);

        // set sublocation
        setSublocations(prevSubLocations => {
            // if warehouse exist in sublocation, push into town array
            if (warehouseExistInSublocations) {
                return prevSubLocations.map(sublocation => {
                    if (sublocation.warehouse_id === warehouseInput.id) {
                        return {
                            ...sublocation,
                            towns: [
                                {
                                    id: generatedTownId,
                                    town: townInput,
                                    charge: chargeInput,
                                    editing: false,
                                    disabled: false,
                                },
                                ...sublocation.towns,
                            ],
                        }
                    }
                    return {
                        ...sublocation,
                        towns: sublocation.towns.map(town => {
                            return {
                                ...town,
                                disabled: false,
                                editing: false,
                            }
                        }),
                    }
                });
            }
            // spread prev warehouses and add the selected town
            return [
                {
                    warehouse_id: warehouseInput.id,
                    warehouse_name: warehouseInput.name,
                    towns: [
                        {
                            id: generatedTownId,
                            town: townInput,
                            charge: chargeInput,
                            editing: false,
                            disabled: false,
                        }
                    ],
                },
                ...prevSubLocations,
            ]
        });

        // reset input states
        setChargeInput("");
        setTownInput("");
        setWarehouseInput(null);
    }

    // handle save location edits
    const handleSaveEditTown = () => {
        // check if warehouse in sub locations
        const warehouseExistInSublocations = sublocations.some(sublocation => sublocation.warehouse_id === warehouseInput.id);

        // set sublocation
        setSublocations(prevSubLocations => {
            // if warehouse exist in sublocation, push into town array

            // get warehouse group from sublocations
            const subLocationWarehouseGroup = prevSubLocations.find((item) => item.warehouse_id === selectedWarehouseId);
            // check if multiple towns exist
            const oneTownsExist = subLocationWarehouseGroup.towns.length === 1;
            // warehouse changed boolean
            const warehouseChanged = selectedWarehouseId !== warehouseInput.id;
            // if only one town exist in warehouse group adjust the array
            const modSubLocations = oneTownsExist && warehouseChanged ? prevSubLocations.filter(sublocation => sublocation.warehouse_id !== selectedWarehouseId) : prevSubLocations;

            if (oneTownsExist && warehouseChanged) {
                setWarehouseOffsets(prevOffsets => {
                    return prevOffsets.filter(offset => offset.id !== selectedWarehouseId);
                });
            }

            if (warehouseExistInSublocations) {
                return modSubLocations.map(sublocation => {
                    // when warehouse id matches warehouse input id
                    if (sublocation.warehouse_id === warehouseInput.id) {
                        // if the original warehouse wasnt changed during edit
                        if (!warehouseChanged) {
                            return {
                                ...sublocation,
                                towns: sublocation?.towns.map(town => {
                                    if (town.id === selectedTownId) {
                                        return {
                                            ...town,
                                            charge: chargeInput,
                                            editing: false,
                                            disabled: false,
                                        }
                                    } else {
                                        return {
                                            ...town,
                                            disabled: false,
                                        }
                                    }
                                }),
                            }
                        }
                        // if the warehouse was changed 
                        return {
                            ...sublocation,
                            towns: [
                                ...sublocation?.towns.map(town => {
                                    return {
                                        ...town,
                                        disabled: false,
                                    }
                                }),
                                {
                                    id: selectedTownId,
                                    town: sublocations.find((item) => item.warehouse_id === selectedWarehouseId)
                                    .towns.find((item) => item.id === selectedTownId).town,
                                    charge: chargeInput,
                                    editing: false,
                                    disabled: false,
                                }
                            ]
                        }
                    }

                    // spread other warehouse
                    return {
                        ...sublocation,
                        // remove that town if it exist in another warehouse
                        towns: sublocation?.towns.filter(town => town.id !== selectedTownId).map(town => {
                            return {
                                ...town,
                                disabled: false,
                            }
                        }),
                    }
                });
            }
            // spread prev warehouses and add the selected town
            return [
                ...modSubLocations.map(sublocation => {
                    return {
                        ...sublocation,
                        // remove that town if it exist in another warehouse
                        towns: sublocation.towns.filter(town => town.id !== selectedTownId).map(town => {
                            return {
                                ...town,
                                disabled: false,
                            }
                        }),
                    }
                }),
                {
                    warehouse_id: warehouseInput.id,
                    warehouse_name: warehouseInput.name,
                    towns: [
                        {
                            id: selectedTownId,
                            town: sublocations.find((item) => item.warehouse_id === selectedWarehouseId)
                            .towns.find((item) => item.id === selectedTownId).town,
                            charge: chargeInput,
                            editing: false,
                            disabled: false,
                        }
                    ],
                }
            ]
        });

        // reset input states
        setWarehouseInput(null);
        setChargeInput("");

        // reset selected ids
        setSelectedTownId(null);
        setSelectedWarehouseId(null);
    }

    // finction to swicth location to edit state
    const handleEditTown = () => {

        // set ware house input
        setWarehouseInput(warehouses.find((item) => item.id === selectedWarehouseId));

        // set charge input
        setChargeInput(sublocations.find((item) => item.warehouse_id === selectedWarehouseId)
        .towns.find((item) => item.id === selectedTownId).charge);

        setSublocations(prevSubLocations => {
            return prevSubLocations.map(sublocation => {
                return {
                    warehouse_id: sublocation.warehouse_id,
                    warehouse_name: sublocation.warehouse_name,
                    towns: sublocation.towns.map(town => {
                        if (town.id === selectedTownId) {
                            return {
                                ...town,
                                editing: true
                            }
                        } else {
                            return {
                                ...town,
                                disabled: true,
                            }
                        }
                    }),
                }
            });
        });

        closeMenu();
    }

    // function to cancel edit
    const handleCancelEditTown = () => {
        setSublocations(prevSubLocations => {
            return prevSubLocations.map(sublocation => {
                return {
                    warehouse_id: sublocation.warehouse_id,
                    warehouse_name: sublocation.warehouse_name,
                    towns: sublocation.towns.map(town => {
                        return {
                            ...town,
                            editing: false,
                            disabled: false,
                        }
                    }),
                }
            });
        });
    
        closeMenu();
        // reset input states
        setWarehouseInput(null);
        setChargeInput("");
    }

    // handle delete town
    const handleDeleteTown = () => {
        setSublocations(prevSubLocations => {
            // get warehouse group from sublocations
            const subLocationWarehouseGroup = prevSubLocations.find((item) => item.warehouse_id === selectedWarehouseId);
            // check if multiple towns exist
            const multipleTownsExist = subLocationWarehouseGroup.towns.length > 1;
            // if only one town exist in warehouse group
            if (!multipleTownsExist) {
                // if warehouse no longer exist, delete warehouse ref from components refs
                setWarehouseOffsets(prevOffsets => {
                    return prevOffsets.filter(offset => offset.id !== selectedWarehouseId);
                });

                return prevSubLocations.filter(sublocation => sublocation.warehouse_id !== selectedWarehouseId);
            }
            // if multiple towns exist
            return prevSubLocations.map(sublocation => {
                // delete town from component refs
                setTownOffsets(prevOffsets => {
                    return prevOffsets.filter(offset => offset.id !== selectedTownId);
                });

                return {
                    warehouse_id: sublocation.warehouse_id,
                    warehouse_name: sublocation.warehouse_name,
                    towns: sublocation.towns.filter(town => town.id !== selectedTownId),
                }
            });

        });
        // reset selected ids
        setSelectedTownId(null);
        setSelectedWarehouseId(null);

        // close menu
        closeMenu();
    }

    // menu buttons
    const menuButtons = [
        {
            id: 1,
            text: "Edit",
            onPress: handleEditTown,
            icon: <EditBlackLargeIcon />
        },
        {
            id: 2,
            text: "Delete",
            onPress: handleDeleteTown,
            icon: <DeleteBlackLargeIcon />
        },
    ];

    return (<>
        <ScrollView 
            style={styles.container}
            showsVerticalScrollIndicator={false}
            onContentSizeChange={(contentWidth, contentHeight) => {
                scrollViewHeight.current = contentHeight;
            }}
        >
            {/* header component */}
            <Header
                navigation={navigation} 
                stackName={"Edit Location"}
                unpadded={true}
            />
            {/* main containers */}
            <View style={styles.main}>
                <View style={styles.stateInfoWrapper}>
                    <View style={styles.stateNameWrapper}>
                        <LocationLightIcon />
                        <Text style={styles.stateName}>{state}</Text>
                    </View>
                    <View>
                        <Text style={styles.priceRangeText}>
                            ₦ {minimumCharge.toLocaleString()} - ₦ {maximumCharge.toLocaleString()}
                        </Text>
                    </View>
                </View>
                <View>
                    <View style={styles.titleBar}>
                        <Text style={styles.sublocationsCount}>Sub locations ({totalTownCount})</Text>
                        <TouchableOpacity 
                            style={styles.buttonLink}
                            onPress={() => openModal()}
                        >
                            <Text style={styles.linkText}>+ Add New Sub-location</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.sublocationsWrapper}>
                        {sublocations.map((sublocation) => (
                            <LocationListItem 
                                key={sublocation.warehouse_id}
                                warehouseId={sublocation.warehouse_id}
                                warehouseName={sublocation.warehouse_name}
                                towns={sublocation.towns}
                                warehouseInput={warehouseInput}
                                warehouseInputActive={warehouseInputActive}
                                chargeInput={chargeInput}
                                updateChargeInput={updateChargeInput}
                                chargeInputError={chargeInputError}
                                setChargeInputError={setChargeInputError}
                                inactiveSaveButton={inactiveSaveButton}
                                openMenu={openMenu}
                                openStackedModal={openStackedModal}
                                handleSaveEditTown={handleSaveEditTown}
                                handleWarehouseLayout={handleWarehouseLayout}
                                handleTownLayout={handleTownLayout}
                                handleCancelEditTown={handleCancelEditTown}
                            />
                        ))}
                    </View>
                </View>
            </View>
            {/* menu */}
            {menu.open && (
                <Menu
                    top={menu.top}
                    right={20}
                    menuButtons={menuButtons}
                    closeMenu={closeMenu}
                />
            )}
        </ScrollView>
        {/* bottomsheet */}
        <CustomBottomSheet
            bottomSheetModalRef={bottomSheetRef}
            snapPointsArray={["100%"]}
            autoSnapAt={0}
            sheetTitle={"Add New Sub-location"}
            closeModal={closeModal}
        >
            <TouchableWithoutFeedback
                // onPress={Keyboard.dismiss}
            >
                <View style={styles.modalWrapper}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalParagraph}>
                            Add new sub-loction an it's corresponding delivery charge
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
                                placeholder={"Select Warehouse"}
                                inputFor={"String"}
                                onPress={openStackedModal}
                                value={warehouseInput?.name}
                                active={warehouseInputActive}
                            />
                            <Input 
                                label={"Charge"}
                                placeholder={"Charge"}
                                value={chargeInput?.toLocaleString()}
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
                        unpadded={true}
                        inactive={warehouseInput === null || chargeInput === "" || townInput === ""}
                        onPress={handleAddLocations}
                    />
                </View>
            </TouchableWithoutFeedback>
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
            <BottomSheetScrollView
                showsVerticalScrollIndicator={false}
                style={styles.stackedModalWrapper}
            >
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
    </>)
}

export default EditLocation

const styles = StyleSheet.create({
    container: {
        backgroundColor: background,
        width: "100%",
        minHeight: "100%",
        paddingHorizontal: 20,
        position: 'relative',
    },
    main: {
        marginTop: 24,
        width: "100%",
        paddingBottom: 20,
    },
    stateInfoWrapper: {
        marginBottom: 32,
        width: "100%",
        height: 45,
        display: "flex",
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: white,
        borderRadius: 12,
        padding: 9,
        opacity: 0.8,
    },
    stateNameWrapper: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 8,
    },
    stateName: {
        fontSize: 12,
        fontFamily: "mulish-medium",
        color: bodyText,
    },
    priceRangeText: {
        fontSize: 12,
        fontFamily: "mulish-semibold",
        color: black,
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
    titleBar: {
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
        width: "100%",
    },
    sublocationsCount: {
        fontFamily: "mulish-bold",
        fontSize: 12,
        color: black,
    },
    sublocationsWrapper: {
        width: "100%",
        display: "flex",
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 10,
    },
    locationItemOverlay: {
        height: 74,
        width: windowWidth,
        backgroundColor: locationItemOverlay,
        position: "absolute",
        top: windowHeight/2 - 50,
        left: 0,
    },


    // bottomsheet list styles
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