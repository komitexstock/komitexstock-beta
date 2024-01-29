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
// components
import Header from '../components/Header';
import SelectInput from '../components/SelectInput';
import Input from '../components/Input';
import CustomButton from '../components/CustomButton';
import CustomBottomSheet from '../components/CustomBottomSheet';
import Menu from '../components/Menu';
import LocationListItem from '../components/LocationListItem';
// colors
import { background, black, listSeparator, locationItemOverlay, primaryColor, subText, white } from '../style/colors';
// globals
import { useGlobals } from '../context/AppContext';
// helpers
import { windowHeight, windowWidth } from '../utils/helpers'
// bottom sheet components
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';


const AddLocation = ({navigation}) => {

    // gloabsl
    const { bottomSheetRef, stackedSheetRef, stackedSheetOpen, setToast } = useGlobals();

    // location state, to store list of locations
    const [sublocations, setSublocations] = useState([
        // {
        //     warehouse_id: 1,
        //     warehouse_name: "Warri",
        //     towns: [
        //         {
        //             id: 1,
        //             town: "Warri",
        //             charge: 3000,
        //             editing: false,
        //             disabled: false,
        //         },
        //         {
        //             id: 2,
        //             town: "Udu",
        //             charge: 3500,
        //             editing: false,
        //             disabled: false,
        //         },
        //         {
        //             id: 3,
        //             town: "Agbarho",
        //             charge: 3500,
        //             editing: false,
        //             disabled: false,
        //         },
        //         {
        //             id: 4,
        //             town: "Ughelli",
        //             charge: 4000,
        //             editing: false,
        //             disabled: false,
        //         },
        //         {
        //             id: 5,
        //             town: "Jeddo",
        //             charge: 3500,
        //             editing: false,
        //             disabled: false,
        //         }
        //     ]
        // },
        // {
        //     warehouse_id: 2,
        //     warehouse_name: "Asaba",
        //     towns: [
        //         {
        //             id: 6,
        //             town: "Asaba",
        //             charge: 4000,
        //             editing: false,
        //             disabled: false,
        //         },
        //         {
        //             id: 7,
        //             town: "Ibusa",
        //             charge: 4500,
        //             editing: false,
        //             disabled: false,
        //         },
        //         {
        //             id: 8,
        //             town: "Ogwashi-Uku",
        //             charge: 5000,
        //             editing: false,
        //             disabled: false,
        //         },
        //         {
        //             id: 9,
        //             town: "Ugbolu",
        //             charge: 5000,
        //             editing: false,
        //             disabled: false,
        //         }
        //     ]
        // },
    ]);

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

    // state input
    const [stateInput, setStateInput] = useState("");

    // warehosue input active
    const [stateInputActive, setStateInputActive] = useState(false);

    // states of nigeria
    const states = [
        "Abia",
        "Adamawa",
        "Akwa Ibom",
        "Anambra",
        "Bauchi",
        "Bayelsa",
        "Benue",
        "Borno",
        "Cross River",
        "Delta",
        "Ebonyi",
        "Edo",
        "Ekiti",
        "Enugu",
        "Gombe",
        "Imo",
        "Jigawa",
        "Kaduna",
        "Kano",
        "Katsina",
        "Kebbi",
        "Kogi",
        "Kwara",
        "Lagos",
        "Nasarawa",
        "Niger",
        "Ogun",
        "Ondo",
        "Osun",
        "Oyo",
        "Plateau",
        "Rivers",
        "Sokoto",
        "Taraba",
        "Yobe",
        "Zamfara",
    ];

    // function to select a state where delivery location is to be added to
    const handleSelectState = (selectedState) => {
        setStateInput(selectedState);
        // close state select bottomsheet after state has been selected
        closeModal();
    }

    // update warehouse function
    const updateWarehouse = (id) => {
        // close stacked bottomsheet
        closeStackedModal();
        // set warehouse input
        setWarehouseInput(warehouses.find((item) => item.id === id));
        // disable input active state
        setWarehouseInputActive(false);
    }

    // update charge state on text change in input component
    const updateChargeInput = (text) => {
        let newText = text.replace(new RegExp(',', 'g'), '');
        // remove all occurrence of the comma character ',' in text gloablly
        if (newText) setChargeInput(parseFloat(newText));
        else setChargeInput("");
    }
    
    // open bottom sheet function
    const openModal = (type) => {
        bottomSheetRef?.current?.present();
        // set modal type
        setModalType(type);

        // set state select input active if select bottomsheet is triggered
        if (type === "Select") setStateInputActive(true);
    }

    // close bottom sheet function
    const closeModal = () => {
        bottomSheetRef?.current?.close();
        // deactivate active state in state input
        setStateInputActive(false);
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

    // state to store modaltype, which controls some of the bottomsheet parameters
    const [modalType, setModalType] = useState("")

    // memorize the bottomsheet paramters according to the modal type
    const bottomSheetProps = useMemo(() => {
        return {
            snapPointsArray: modalType === "Select" ? ["50%", "75%", "100%"] : ["100%"],
            autoSnapAt: modalType === "Select" ? 1 : 0,
            sheetTitle: modalType === "Select" ? "Select State" : `Add${sublocations.length !== 0 ? " New" : ""} Sub-Location`,
        }
    }, [modalType]);

    // handle confirm location
    const handleConfirmLocations = () => {
        navigation.navigate("Locations", {
            toastType: "Success",
            toastMessage: "Location successfully added",
        })
    }

    // state to store menu
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

    // function to get top offset of options menu (i.e the height from the top of the screen)
    const getTopOffset = (warehouse_id, town_id) => {
        // offset of the warehouse container from the top of the screen
        const topOffset = 231;
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

    // default values of charge input when a sublocation is about to be edited
    const defaultChargeInput = useMemo(() => {
        // get the charge value where the selected warehouse and selected town id match
        return sublocations.find((item) => item.warehouse_id === selectedWarehouseId)
        ?.towns.find((item) => item.id === selectedTownId).charge;
    }, [selectedTownId, selectedWarehouseId]);

    // default values of warehouse input when a sublocation is about to be edited
    const defaultWarehouseInput = useMemo(() => {
        // get the warehouse value where a particular sublocation is about to be edited
        return warehouses.find((item) => item.id === selectedWarehouseId);
    }, [selectedTownId, selectedWarehouseId]);

    // inactive save button
    const inactiveSaveButton = warehouseInput?.id === defaultWarehouseInput?.id && chargeInput === defaultChargeInput;

    // handle add locations function
    const handleAddLocations = () => {

        // dismiss keyboard
        Keyboard.dismiss();

        // function to check if town exist in sublocations array
        const checkTownExist = sublocations.some(sublocation => {
            return sublocation.towns.some(town => town.town.toLowerCase() === townInput.toLowerCase());
        });

        // if town exist, return early with an error message
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

        // generate a random id for that newly added town
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
            // if warehouse doesn't exist create new warehouse group
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
            // parameter to detect if a warehouse was changed when a sublocation was edited
            const warehouseChanged = selectedWarehouseId !== warehouseInput.id;
            // if only one town exist in warehouse and warehouse was changed filter that warehouse out otherwise keep it
            const modSubLocations = oneTownsExist && warehouseChanged ? prevSubLocations.filter(sublocation => sublocation.warehouse_id !== selectedWarehouseId) : prevSubLocations;

            // remove offset of warehouse if it doesnt exist anymore
            if (oneTownsExist && warehouseChanged) {
                setWarehouseOffsets(prevOffsets => {
                    return prevOffsets.filter(offset => offset.id !== selectedWarehouseId);
                });
            }

            // if edited warehouse of sublocation exist in the current sublocation array
            if (warehouseExistInSublocations) {
                // map through sublocations
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

    // function to swicth location list item from readonly state to edit state
    // triggered when the edit button is clicked in the town options menu
    const handleEditTown = () => {

        // set ware house input
        setWarehouseInput(warehouses.find((item) => item.id === selectedWarehouseId));

        // set charge input
        setChargeInput(sublocations.find((item) => item.warehouse_id === selectedWarehouseId)
        .towns.find((item) => item.id === selectedTownId).charge);

        // swicth chosen town to edit state an other towns to diabled
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

        // close menu after swicthing states
        closeMenu();
    }

    // function to cancel edit
    // switch location list item from editing state to readonly state
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
            // edit button
            id: 1,
            text: "Edit",
            onPress: handleEditTown,
            icon: <EditBlackLargeIcon />
        },
        {
            // delete button
            id: 2,
            text: "Delete",
            onPress: handleDeleteTown,
            icon: <DeleteBlackLargeIcon />
        },
    ];

    // function to return true is any editing field in town is true
    const editingLocation = sublocations?.some(location => {
        return location?.towns?.some(town => town?.editing)
    });


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
                stackName={"Add Location"}
                unpadded={true}
            />
            {/* main containers */}
            <View style={styles.main}>
                <SelectInput
                    // state input
                    label={"State/Province"}
                    placeholder={"Select State"}
                    inputFor={"String"}
                    onPress={() => openModal("Select")}
                    active={stateInputActive}
                    value={stateInput}
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
                            Locations you've added an their respective delivery charges would appear here
                        </Text>
                    ) : (
                        <View style={styles.sublocationsWrapper}>
                            {/* location list items */}
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
                    )}
                </View>
            </View>
            {/* option menu for edit and delete option of sublocation */}
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
            snapPointsArray={bottomSheetProps.snapPointsArray}
            autoSnapAt={bottomSheetProps.autoSnapAt}
            sheetTitle={bottomSheetProps.sheetTitle}
            closeModal={closeModal}
        >
            {/* select state buttom sheet */}
            {modalType === "Select" ? (
                <BottomSheetScrollView 
                    showsVerticalScrollIndicator={false}
                    style={styles.stackedModalWrapper}
                >
                    <View style={styles.listWrapper}>
                        {states.map((state) => (
                            <TouchableOpacity 
                                key={state} 
                                style={styles.listItem}
                                onPress={() => handleSelectState(state)}
                            >
                                <Text style={styles.listText}>{state}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </BottomSheetScrollView>
            ) : (
                <TouchableWithoutFeedback
                    // onPress={Keyboard.dismiss}
                >
                    <View style={styles.modalWrapper}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalParagraph}>
                                Add sub-loction an it's corresponding delivery charge
                            </Text>
                            <View style={styles.modalInputWrapper}>
                                {/*Delivery Town/City input */}
                                <Input 
                                    label={"City/Town"}
                                    placeholder={"City/Town"}
                                    value={townInput}
                                    onChange={setTownInput}
                                    error={townInputError}
                                    setError={setTownInputError}
                                />
                                {/* select warehouse input */}
                                <SelectInput
                                    label={"Select Warehouse"}
                                    placeholder={"Select Warehouse for The City Above"}
                                    inputFor={"String"}
                                    onPress={openStackedModal}
                                    value={warehouseInput?.name}
                                    active={warehouseInputActive}
                                />
                                {/* delivery charge input */}                                
                                <Input 
                                    label={"Charge"}
                                    placeholder={"Delivery Charge"}
                                    value={chargeInput?.toLocaleString()}
                                    onChange={updateChargeInput}
                                    error={chargeInputError}
                                    setError={setChargeInputError}
                                    keyboardType={"numeric"}
                                />
                            </View>
                        </View>
                        {/* save date button */}
                        <CustomButton
                            shrinkWrapper={true}
                            name={"Save"}
                            unpadded={true}
                            inactive={warehouseInput === null || chargeInput === "" || townInput === ""}
                            onPress={handleAddLocations}
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
            <BottomSheetScrollView
                showsVerticalScrollIndicator={false}
                style={styles.stackedModalWrapper}
            >
                <View style={styles.listWrapper}>
                    {warehouses.map((warehouse) => (
                        <TouchableOpacity 
                            key={warehouse.id} 
                            style={styles.listItem}
                            onPress={() => updateWarehouse(warehouse.id)}
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
            inactive={sublocations.length === 0 || editingLocation || stateInput === ""} 
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
        position: 'relative',
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
        width: 140,
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