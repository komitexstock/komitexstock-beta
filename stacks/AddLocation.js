import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TouchableWithoutFeedback,
    TouchableWithoutFeedbackBase,
    ScrollView,
    Keyboard,
} from 'react-native'
import React, {useState, useEffect, useMemo, useRef} from 'react'
// icons
import MenuIcon from "../assets/icons/MenuIcon";
import ClearSearch from "../assets/icons/ClearSearch";
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
import { background, black, bodyText, listSeparator, primaryColor, subText, white } from '../style/colors';
// globals
import { useGlobals } from '../context/AppContext';
// helpers
import { windowHeight } from '../utils/helpers'
// bottom sheet components
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';


const AddLocation = ({navigation}) => {

    // gloabsl
    const { bottomSheetRef, stackedSheetRef, stackedSheetOpen, setToast } = useGlobals();

    const disable = false;

    // location state, to store list of locations
    const [sublocations, setSublocations] = useState([
        {
            warehouse_id: 1,
            warehouse_name: "Warri",
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
            warehouse_id: 2,
            warehouse_name: "Asaba",
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

    const handleSelectState = (selectedState) => {
        setStateInput(selectedState);
        closeModal();
    }

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
    const openModal = (type) => {
        bottomSheetRef?.current?.present();
        // set modal type
        setModalType(type);

        // close menu if open, close menu
        if (menu.open) closeMenu();

        // set state select input active if select bottomsheet is triggered
        if (type === "Select") setStateInputActive(true);
    }

    // close bottom sheet function
    const closeModal = () => {
        bottomSheetRef?.current?.close();
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
        {id:  1, name: "Warri"},
        {id:  2, name: "Asaba"},
        {id:  3, name: "Benin"},
        {id:  4, name: "Agbor"},
        {id:  5, name: "Sapele"},
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

    // const showLocationOptions = (id) => {
    //     setMenuOpen(true);
    // }

    // handle confirm location
    const handleConfirmLocations = () => {
        navigation.navigate("Locations", {
            toastType: "Success",
            toastMessage: "Location successfully added",
        })
    }

    const [menu, setMenu] = useState({
        open: false,
        // position the menu initially off screen
        top: 2 * windowHeight,
    });


    // ref for the warehouses
    const warehouseComponentRef = useRef([]);
    // ref for the towns/cities
    const townComponentRef = useRef([]);
    // scroll view Height
    const scrollViewHeight = useRef(0);
    // ref of the scroll view component
    const scrollRef = useRef(null);
    // scroo view y offset
    const [scrollYOffset, setScrollYOffset] = useState(0);

    // handle scroll
    const handleScroll = (offsetY) => {
        setScrollYOffset(offsetY)
    }

    // console.log(scrollYOffset);

    // function to scroll to a component
    const scrollToPosition = (height) => {
        scrollRef.current?.scrollTo({ y: height, animated: true, duration: 500 });
    };
    

    // Use onLayout to update warehouse refs
    const handleWarehouseLayout = (warehouse_id, e) => {
        const index = warehouseComponentRef.current.findIndex(item => item.id === warehouse_id);
        // console.log(e.nativeEvent.layout);
        if (index !== -1) {
            warehouseComponentRef.current[index] = {
                id: warehouse_id,
                y: e.nativeEvent.layout.y,
                height: e.nativeEvent.layout.height,
            };
        } else {
            warehouseComponentRef.current.push({
                id: warehouse_id,
                y: e.nativeEvent.layout.y,
                height: e.nativeEvent.layout.height,
            });
        }

    };

    // on layout update town refs
    const handleTownLayout = (town_id, e) => {
        const index = townComponentRef.current.findIndex(item => item.id === town_id);
        if (index !== -1) {
            townComponentRef.current[index] = {
                id: town_id,
                y: e.nativeEvent.layout.y,
            };
        } else {
            townComponentRef.current.push({
                id: town_id,
                y: e.nativeEvent.layout.y,
            });
        }
    };

    // function to get top offset of options menu
    const getTop = (warehouse_id, town_id) => {
        // offset of the warehouse container from the top of the screen
        const topOffset = 231;
        // warehouse offset
        const warehouseOffset = warehouseComponentRef.current.find((item) => item.id === warehouse_id)?.y;
        const warehouseHeight = warehouseComponentRef.current.find((item) => item.id === warehouse_id)?.height;
        // console.log("warehouse offset: ", warehouseOffset);
        // town offset
        const townOffset = townComponentRef.current.find((item) => item.id === town_id)?.y;
        // offset of menu from the top of location component
        // console.log("town offset: ", townOffset);
        const menuOffset = 49;
        // menu height
        const menuHeight = 124;
        // evaluate the top value of menu rendered below option button
        const renderMenuBelow = topOffset + warehouseOffset + townOffset + menuOffset;
        // evaluate the top value of menu rendered above option button
        const renderMenuAbove = topOffset + warehouseOffset + townOffset - menuHeight;

        const finalValue = scrollViewHeight.current - renderMenuBelow <= 300 ? renderMenuAbove : renderMenuBelow;

        // evaluate final value
        if (warehouseOffset === undefined) return scrollViewHeight.current;
        if (townOffset === undefined) return warehouseOffset + warehouseHeight;
        return finalValue;
    }

    // console.log(warehouseComponentRef.current);

    // open menu function
    const openMenu = (warehouse_id, town_id) => {

        // get top offset
        const top = getTop(warehouse_id, town_id);
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

        const checkTownExist = sublocations.some(sublocation => sublocation.towns.some(town => town.town.toLowerCase() === townInput.toLowerCase()));

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
                                ...sublocation.towns,
                                {
                                    id: generatedTownId,
                                    town: townInput,
                                    charge: chargeInput,
                                    editing: false,
                                    disabled: false,
                                },
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
            // spread prve warehouses and add the selected town
            return [
                ...prevSubLocations,
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
                }
            ]
        });

        // reset input states
        setChargeInput("");
        setTownInput("");

        setTimeout(() => {
            // get top offset required for auto scrolling
            const scrollTargetHeight = getTop(warehouseInput.id, generatedTownId);
            // reset warehouse input
            setWarehouseInput(null);

            // check if component is within the current view
            if (scrollYOffset - windowHeight < scrollTargetHeight && scrollYOffset + windowHeight > scrollTargetHeight) {
                // if within view, return auto scroll not required
                return
            }
            // scroll to poition
            scrollToPosition(scrollTargetHeight);
            
        }, 1000);
    }

    const handleSaveEditTown = () => {
        // check if warehouse in sub locations
        const warehouseExistInSublocations = sublocations.some(sublocation => sublocation.warehouse_id === warehouseInput.id);

        // set sublocation
        setSublocations(prevSubLocations => {
            // if warehouse exist in sublocation, push into town array
            if (warehouseExistInSublocations) {
                return prevSubLocations.map(sublocation => {
                    if (sublocation.warehouse_id === selectedWarehouseId) {
                        return {
                            ...sublocation,
                            towns: sublocation.towns.map(town => {
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
                    return {
                        ...sublocation,
                        towns: sublocation.towns.map(town => {
                            return {
                                ...town,
                                disabled: false,
                            }
                        }),
                    }
                });
            }
            // spread prve warehouses and add the selected town
            return [
                ...prevSubLocations,
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
                return prevSubLocations.filter(sublocation => sublocation.warehouse_id !== selectedWarehouseId);
            }
            // if multiple towns exist
            return prevSubLocations.map(sublocation => {
                return {
                    warehouse_id: sublocation.warehouse_id,
                    warehouse_name: sublocation.warehouse_name,
                    towns: sublocation.towns.filter(town => town.id !== selectedTownId),
                }
            });

        });
        setSelectedTownId(null);
        setSelectedWarehouseId(null);
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

    // function to return true is any editing field in town is true
    const editingLocation = sublocations?.some(location => {
        return location?.towns?.some(town => town?.editing)
    });


    return (<>
        <ScrollView 
            style={styles.container}
            showsVerticalScrollIndicator={false}
            ref={scrollRef}
            onScroll={(e) => handleScroll(e.nativeEvent.contentOffset.y)}
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
            snapPointsArray={bottomSheetProps.snapPointsArray}
            autoSnapAt={bottomSheetProps.autoSnapAt}
            sheetTitle={bottomSheetProps.sheetTitle}
            closeModal={closeModal}
        >
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