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

// useAuth
import { useAuth } from "../context/AuthContext";

// firebase
import {
    database,
} from "../Firebase";

// firestore functions
import {
    collection,
    getDocs,
    where,
    query,
    orderBy,
    serverTimestamp,
    addDoc,
} from "firebase/firestore";

const AddLocation = ({navigation}) => {
        
    // auth data
    const { authData } = useAuth();

    // gloabsl
    const { bottomSheetRef, stackedSheetRef, stackedSheetOpen, setToast } = useGlobals();

    // main action button loadins state
    const [isLoading, setIsLoading] = useState(false);

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
        //     ]
        // },
    ]);

    // console.log('Sublocations', sublocations[0]);

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

    // country of user
    const country = "Nigeria";

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

    // warehouses
    const [warehouses, setWarehouses] = useState([]);

    // get warehouses
    useEffect(() => {
        // fetch warehouses
        const fetchWarehouses = async (business_id) => {
            try {
                const collectionRef = collection(database, "warehouses");
                let q = query(
                    collectionRef,
                    where("business_id", "==", business_id),
                    orderBy("warehouse_name")
                );
                // variable to stroe raw warehouse array
                
                const querySnapshot = await getDocs(q);
                let warehouseList = [];
                querySnapshot.forEach((doc) => {
                    const warehouse = {
                        id: doc.id,
                        warehouse_name: doc.data().warehouse_name,
                    };
                    // console.log(warehouse);
                    warehouseList.push(warehouse);
                });

                setWarehouses(warehouseList);
            } catch (error) {
                console.log("Caught Error: ", error.message);
                setToast({
                    text: error.message,
                    visible: true,
                    type: "error",
                });
            }
        };

        // fetch warehouses
        fetchWarehouses(authData?.business_id);
    }, []);

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
    const handleConfirmLocations = async () => {
        // signify loading state for main button
        setIsLoading(true);
        try {
            // check for empty fields
            if (sublocations.length === 0 || editingLocation || stateInput === "") {
                // throw error if fields are empty
                throw new Error("Please fill in all fields");
            }

            // if user isn't a manager
            if (authData?.role !== "Manager") {
                // unautorized to add locations
                throw new Error("Insufficient Permission");
            }
7
            // ref to warehouses collection
            const locationsRef = collection(database, "locations");

            // function to remove all occurence of the character space at the end of string
            const removeTrailingSpace = (str) => {
                return str.replace(/\s+$/, '');
            }

            // check if region, state and country combination  exist
            await Promise.all(sublocations.map(async (sublocation) => {
                await Promise.all(sublocation.locations.map(async (location) => {

                    // remove trailing space
                    const region = location.region.trim().toLowerCase();

                    const q = query(
                        locationsRef,
                        where("business_id", "==", authData?.business_id),
                        where("country", "==", country),
                        where("state", "==", stateInput),
                        where("region", "==", region)
                    );
              
                    // get docs
                    const querySnapshot = await getDocs(q);
                    
                    // if any result exist
                    if (querySnapshot.size > 0) {
                        // end loading state
                        setIsLoading(false);
                        // throw error
                        throw new Error(`${location.region} already exist amongst your locations in ${stateInput}, ${country}`);
                    }
                }));
            }));

            // add sublocations
            await Promise.all(sublocations.map(async (sublocation) => {
                await Promise.all(sublocation.locations.map(async (location) => {
                    
                    // remove trailing space
                    const region = location.region.trim().toLowerCase();

                    // save data in database
                    await addDoc(locationsRef, {
                        business_id: authData?.business_id, // business id
                        country: country, // country
                        state: stateInput, // state
                        region: region, // region
                        delivery_charge: location.delivery_charge, // delivery charge 
                        created_at: serverTimestamp(), // timestamp
                        created_by: authData?.uid, // uid
                        edited_at: serverTimestamp(), // timestamp
                        edited_by: authData?.uid, // uid
                        warehouse_id: sublocation.warehouse_id, // warehouse id
                    });
                    
                }));
            }));

            // disable button loading state
            setIsLoading(false);

            // navigate to available locations screen
            navigation.navigate("AvailableLocations", {
                toastType: "Success",
                toastMessage: "Location successfully added",
                business_id: authData.business_id,
                business_name: authData.business_name,
            });

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
        ?.locations.find((item) => item.id === selectedTownId).delivery_charge;
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
            return sublocation.locations.some(location => {
                return location.region.toLowerCase() === townInput.toLowerCase() && sublocation.warehouse_name.toLowerCase() === warehouseInput?.warehouse_name.toLowerCase();
            });
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
                            locations: [
                                {
                                    id: generatedTownId,
                                    region: townInput,
                                    delivery_charge: chargeInput,
                                    editing: false,
                                    disabled: false,
                                },
                                ...sublocation.locations,
                            ],
                        }
                    }
                    return {
                        ...sublocation,
                        locations: sublocation.locations.map(location => {
                            return {
                                ...location,
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
                    warehouse_name: warehouseInput.warehouse_name,
                    locations: [
                        {
                            id: generatedTownId,
                            region: townInput,
                            delivery_charge: chargeInput,
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
            // check if multiple locations exist
            const oneTownsExist = subLocationWarehouseGroup.locations.length === 1;
            // parameter to detect if a warehouse was changed when a sublocation was edited
            const warehouseChanged = selectedWarehouseId !== warehouseInput.id;
            // if only one location exist in warehouse and warehouse was changed filter that warehouse out otherwise keep it
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
                                locations: sublocation?.locations.map(location => {
                                    if (location.id === selectedTownId) {
                                        return {
                                            ...location,
                                            delivery_charge: chargeInput,
                                            editing: false,
                                            disabled: false,
                                        }
                                    } else {
                                        return {
                                            ...location,
                                            disabled: false,
                                        }
                                    }
                                }),
                            }
                        }
                        // if the warehouse was changed 
                        return {
                            ...sublocation,
                            locations: [
                                ...sublocation?.locations.map(location => {
                                    return {
                                        ...location,
                                        disabled: false,
                                    }
                                }),
                                {
                                    id: selectedTownId,
                                    region: sublocations.find((item) => item.warehouse_id === selectedWarehouseId)
                                    .locations.find(location => location.id === selectedTownId).region,
                                    delivery_charge: chargeInput,
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
                        locations: sublocation?.locations.filter(location => location.id !== selectedTownId).map(location => {
                            return {
                                ...location,
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
                        locations: sublocation.locations.filter(location => location.id !== selectedTownId).map(location => {
                            return {
                                ...location,
                                disabled: false,
                            }
                        }),
                    }
                }),
                {
                    warehouse_id: warehouseInput.id,
                    warehouse_name: warehouseInput.warehouse_name,
                    locations: [
                        {
                            id: selectedTownId,
                            region: sublocations.find((sublocation) => sublocation.warehouse_id === selectedWarehouseId)
                            .locations.find((location) => location.id === selectedTownId).region,
                            delivery_charge: chargeInput,
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
        setWarehouseInput(warehouses.find(warehouse => warehouse.id === selectedWarehouseId));

        // set charge input
        setChargeInput(sublocations.find(sublocation => sublocation.warehouse_id === selectedWarehouseId)
        .locations.find(location => location.id === selectedTownId).delivery_charge);

        // swicth chosen town to edit state an other towns to diabled
        setSublocations(prevSubLocations => {
            return prevSubLocations.map(sublocation => {
                return {
                    warehouse_id: sublocation.warehouse_id,
                    warehouse_name: sublocation.warehouse_name,
                    locations: sublocation.locations.map(location => {
                        if (location.id === selectedTownId) {
                            return {
                                ...location,
                                editing: true
                            }
                        } else {
                            return {
                                ...location,
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
                    locations: sublocation.locations.map(location => {
                        return {
                            ...location,
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
            const multipleTownsExist = subLocationWarehouseGroup.locations.length > 1;
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
                    locations: sublocation.locations.filter(location => location.id !== selectedTownId),
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
    const editingLocation = sublocations?.some(sublocation => {
        return sublocation?.locations?.some(location => location?.editing)
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
                    {stateInput !== "" && ( // display button only if state has been selected
                        <TouchableOpacity 
                            style={styles.buttonLink}
                            onPress={() => openModal("Add")}
                        >
                            <Text style={styles.linkText}>+ Add{sublocations.length !== 0 ? " New" : ""} Sub-location</Text>
                        </TouchableOpacity>
                    )}
                    {sublocations.length === 0 ? (<>
                        {/* only display text if a state has been selected */}
                        <Text style={styles.paragraph}>
                            {stateInput === "" ? "Select a state for your delivery locations" : "Locations you've added an their respective delivery charges would appear here"}
                            
                        </Text>
                    </>) : (
                        <View style={styles.sublocationsWrapper}>
                            {/* location list items */}
                            {sublocations.map((sublocation) => (
                                <LocationListItem 
                                    key={sublocation.warehouse_id}
                                    warehouseId={sublocation.warehouse_id}
                                    warehouseName={sublocation.warehouse_name}
                                    locations={sublocation.locations}
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
                                Add sub-location an it's corresponding delivery charge
                            </Text>
                            <View style={styles.modalInputWrapper}>
                                {/*Delivery Town/City input */}
                                <Input 
                                    label={"Region"}
                                    placeholder={"City or Town"}
                                    helperText={"Refers to a region grouped under one delivery charge"}
                                    value={townInput}
                                    onChange={setTownInput}
                                    error={townInputError}
                                    setError={setTownInputError}
                                />
                                {/* select warehouse input */}
                                <SelectInput
                                    label={"Select Warehouse"}
                                    placeholder={"Select warehouse for the city above"}
                                    inputFor={"String"}
                                    onPress={openStackedModal}
                                    value={warehouseInput?.warehouse_name}
                                    active={warehouseInputActive}
                                />
                                {/* delivery charge input */}                                
                                <Input 
                                    label={"Charge"}
                                    placeholder={"Delivery charge"}
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
                            <Text style={styles.listText}>{warehouse.warehouse_name}</Text>
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
            isLoading={isLoading}
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
        textTransform: 'capitalize'
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