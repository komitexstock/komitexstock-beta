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

// import skeleton screen
import EditLocationsSkeleton from '../skeletons/EditLocationsSkeleton';

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
    updateDoc,
    doc,
} from "firebase/firestore";

// local database
import { handleLocations } from "../sql/handleLocations";
import { useSQLiteContext } from "expo-sqlite/next";

const EditLocation = ({navigation, route}) => {

    // auth data
    const { authData } = useAuth();

    // local database
    const db = useSQLiteContext();

    // page loading
    const [pageLoading, setPageLoading] = useState(true);

    // button loading state
    const [isLoading, setIsLoading] = useState(false);
    
    // state locations
    const {stateLocations} = route?.params || {};

    // state
    const state = stateLocations?.name;

    // country
    const country = "Nigeria";

    // globals
    const { bottomSheetRef, stackedSheetRef, setToast } = useGlobals();

    // location state, to store list of locations
    const [sublocations, setSublocations] = useState([]);

    // group state locations by warehouses
    useEffect(() => {
        const groupedByWarehouse = stateLocations?.locations.reduce((acc, stateLocation) => {
            const {id, warehouse_id, warehouse_name, region, delivery_charge } = stateLocation;
        
            // Check if the warehouse_id exists in the accumulator array
            const warehouseIndex = acc.findIndex(item => item.warehouse_id === warehouse_id);
        
            if (warehouseIndex !== -1) {
                // If the warehouse_id exists, push the town details to its towns array
                acc[warehouseIndex].locations.push({
                    id,
                    region,
                    delivery_charge,
                    editing: false,
                    disabled: false,
                });
            } else {
                // If the warehouse_id doesn't exist, create a new warehouse object
                acc.push({
                    warehouse_id,
                    warehouse_name,
                    locations: [{
                        id,
                        region,
                        delivery_charge,
                        editing: false,
                        disabled: false,
                    }],
                });
            }
        
            return acc;
        }, []);

        setSublocations(groupedByWarehouse);
        setPageLoading(false);
    }, [])

    // get total town insublocation
    const totalTownCount = sublocations.reduce((totalCount, sublocation) => {
        // For each sublocation, add the count of locations to the totalCount
        return totalCount + sublocation.locations.length;
    }, 0);

    // get maximum charge
    const maximumCharge = sublocations.reduce((maxCharge, sublocation) => {
        // Extract charges from all locations in each sublocation and find the maximum charge
        const maxLocationCharge = sublocation.locations.reduce((max, location) => {
            return Math.max(max, location.delivery_charge);
        }, Number.NEGATIVE_INFINITY); // Initialize with the smallest possible value
        return Math.max(maxCharge, maxLocationCharge);
    }, Number.NEGATIVE_INFINITY); // Initialize with the smallest possible value

    // get minimum charge
    const minimumCharge = sublocations.reduce((minCharge, sublocation) => {
        // Extract charges from all locations in each sublocation and find the minimum charge
        const minLocationCharge = sublocation.locations.reduce((min, location) => {
            return Math.min(min, location.delivery_charge);
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

    // open stacked bottom sheet function
    const openStackedModal = () => {
        stackedSheetRef?.current?.present();
        // set modal type
        setWarehouseInputActive(true);
        // dismiss keyboard
        Keyboard.dismiss();
    }

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

    // console.log("Warehouses:", warehouses);

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
        const menuHeight = 124 - 52;
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
        if (selectedTownId === null || selectedWarehouseId === null) return 0;
        return sublocations.find((item) => item.warehouse_id === selectedWarehouseId)
        ?.locations.find((item) => item.id === selectedTownId).delivery_charge;
    }, [selectedTownId, selectedWarehouseId]);

    const defaultWarehouseInput = useMemo(() => {
        return warehouses.find((item) => item.id === selectedWarehouseId);
    }, [selectedTownId, selectedWarehouseId]);

    // inactive save button
    const inactiveSaveButton = warehouseInput?.id === defaultWarehouseInput?.id && chargeInput === defaultChargeInput;

    // handle add locations function
    const handleAddLocations = async () => {
        try {

            // dismiss keyboard
            Keyboard.dismiss();

            // enable button loading state
            setIsLoading(true);

            // ref to warehouses collection
            const locationsRef = collection(database, "locations");

            // function to remove all occurence of the character space at the end of string
            const removeTrailingSpace = (str) => {
                return str.replace(/\s+$/, '');
            }

            // remove trailing space
            const region = removeTrailingSpace(townInput.toLowerCase());

            // query
            const q = query(
                locationsRef,
                where("business_id", "==", authData?.business_id),
                where("country", "==", country),
                where("state", "==", state),
                where("region", "==", region)
            );
      
            // get docs
            const querySnapshot = await getDocs(q);
            
            // if any result exist
            if (querySnapshot.size > 0) {
                // end loading state
                setIsLoading(false);
                // throw error
                throw new Error(`${townInput} already exist amongst your locations in ${state}, ${country}`);
            }

            // save data in database
            await addDoc(locationsRef, {
                business_id: authData?.business_id, // business id
                country: country, // country
                state: state, // state
                region: region, // region
                delivery_charge: chargeInput, // delivery charge 
                created_at: serverTimestamp(), // timestamp
                created_by: authData?.uid, // uid
                edited_at: serverTimestamp(), // timestamp
                edited_by: authData?.uid, // uid
                warehouse_id: warehouseInput?.id, // warehouse id
            });
            
    
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

            // show success toast
            setToast({
                text: "New location added successfully",
                visible: true,
                type: "success",
            });

        } catch (error) {
            console.log("Caught Error: ", error.message);
            setToast({
                text: error.message,
                visible: true,
                type: "error",
            });

        } finally {
            // enable button loading state
            setIsLoading(false);
        }
    }

    // handle save location edits
    const handleSaveEditTown = async (id) => {
        try {
            // initiate button loading state
            setIsLoading(true);

            // check for empty fields
            if (warehouseInput.id === undefined || chargeInput === "") {
                throw new Error("Please fill all required fields");
            }

            // check if charge is a number or not
            if (isNaN(chargeInput)) {
                throw new Error("Delivery charge must be a number");
            }

            // update warehouse
            // update warehouses collection where id === id from route params
            await updateDoc(doc(database, "locations", id), {
                warehouse_id: warehouseInput?.id,
                delivery_charge: chargeInput,
                edited_at: serverTimestamp(), // timestamp
                edited_by: authData?.uid, // uid
            });

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
    
            // // reset selected ids
            setSelectedTownId(null);
            setSelectedWarehouseId(null);

            // show success toast
            setToast({
                text: "Location edited successfully",
                visible: true,
                type: "success",
            });

        } catch (error) {
            console.log("Caught Error: ", error.message);
            setToast({
                text: error.message,
                visible: true,
                type: "error",
            });

        } finally {
            // disable button loading state
            setIsLoading(false);
        }
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

    // menu buttons
    const menuButtons = [
        {
            id: 1,
            text: "Edit",
            onPress: handleEditTown,
            icon: <EditBlackLargeIcon />
        },
        // {
        //     id: 2,
        //     text: "Delete",
        //     onPress: handleDeleteTown,
        //     icon: <DeleteBlackLargeIcon />
        // },
    ];

    // console.log("subloaction", sublocations.locations);
    // console.log("stateloaction", stateLocations);

    return (<>
        {!pageLoading ? (
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
                                    key={sublocation.warehouse_name}
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
                                    isLoading={isLoading}
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
        ) : <EditLocationsSkeleton />}
        {/* bottomsheet */}
        <CustomBottomSheet
            bottomSheetModalRef={bottomSheetRef}
            snapPointsArray={["100%"]}
            autoSnapAt={0}
            sheetTitle={"Add New Sub-location"}
            closeModal={closeModal}
        >
            <TouchableWithoutFeedback>
                <View style={styles.modalWrapper}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalParagraph}>
                            Add new sub-loction an it's corresponding delivery charge
                        </Text>
                        <View style={styles.modalInputWrapper}>
                            <Input 
                                label={"Region"}
                                placeholder={"City or Town"}
                                helperText={"Refers to a region grouped under one delivery charge"}
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
                                value={warehouseInput?.warehouse_name}
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
                        isLoading={isLoading}
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
                            <Text style={styles.listText}>{warehouse.warehouse_name}</Text>
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