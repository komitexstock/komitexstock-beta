// react native components
import { 
    View, 
    Text, 
    TouchableWithoutFeedback,
    TouchableOpacity,
    StyleSheet,
    Keyboard,
    ScrollView,
} from "react-native";

// react hooks
import { useState, useEffect } from "react";

// components
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import Accordion from "../components/Accordion";
import Mark from "../components/Mark";
import CustomButton from "../components/CustomButton";

// colors
import { bodyText, black, white, background } from "../style/colors";

// icons
import AddLocationIcon from "../assets/icons/AddLocationIcon";

// globals
import { useGlobals } from '../context/AppContext';

// auth
import { useAuth } from "../context/AuthContext";

// skeleton screen
import AvailableLocationsSkeleton from "../skeletons/AvailableLocationsSkeleton";

// firebase
import {
    database,
} from "../Firebase";

// firestore functions
import {
    doc,
    collection,
    onSnapshot,
    where,
    query,
    getDoc,
} from "firebase/firestore";

const AvailableLocations = ({navigation, route}) => {

    // get auth date
    const { authData } = useAuth();

    // page loading state
    const [pageLoading, setPageLoading] = useState(true);

    // state to store search query
    const [searchQuery, setSearchQuery] = useState("");

    // business id and business name of logistics company
    const {business_id, business_name} = route?.params || {};

    // parameter to determine if location is read only or writeable
    const writable = authData.business_id === business_id && authData.account_type === "Logistics" && authData?.role === "Manager";

    // globals
    const { setToast } = useGlobals();

    // states and delivery locations 
    const [states, setStates] = useState([])

    // get states
    useEffect(() => {
        // fetch warehouse name
        const fetchWarehouseName = async (id) => {
            try {
                const docRef = doc(database, "warehouses", id);
                const docSnap = await getDoc(docRef);
                // return warehouse name
                return docSnap.data().warehouse_name;

            } catch (error) {
                setToast({
                    text: error.message,
                    visible: true,
                    type: "error",
                });
            }
        }

        // fetch locations
        const fetchLocations = async (businessId) => {
            try {
                const collectionRef = collection(database, "locations");
                let q = query(
                    collectionRef,
                    where("business_id", "==", businessId),
                );

                const unsubscribe = onSnapshot(q, (querySnapshot) => {
                    let locationList = [];

                    // Create an array to hold promises for fetching warehouse names
                    const fetchWarehouseNamePromises = querySnapshot.docs.map(async (doc) => {
                        // Fetch warehouse name
                        const warehouse_name = await fetchWarehouseName(doc.data().warehouse_id);
                        return warehouse_name;
                    });

                    // Wait for all promises to resolve
                    Promise.all(fetchWarehouseNamePromises).then((warehouseNames) => {
                        // Iterate over the query snapshot again to construct locationList
                        querySnapshot.docs.forEach((doc, index) => {
                            const location = {
                                id: doc.id,
                                delivery_charge: doc.data().delivery_charge,
                                region: doc.data().region,
                                state: doc.data().state,
                                warehouse_id: doc.data().warehouse_id,
                                warehouse_name: warehouseNames[index], // Use the corresponding warehouse name
                            };
                            locationList.push(location);
                        });

                        // group locations by state
                        const groupByState = (locations) => {
                            const groupedByState = locations?.reduce((acc, obj) => {
                                const { state, ...rest } = obj;
                                // Check if state is defined and not null
                                if (state !== undefined && state !== null) {
                                    if (!acc[state]) {
                                        acc[state] = { name: state, opened: false, locations: [] };
                                    }
                                    acc[state].locations.push(rest);
                                }
                                return acc;
                            }, {});

                            return Object.values(groupedByState);
                        }

                        // sort locations by regions
                        const sortLocationsByRegion = (locations) => {
                            return locations.sort((a, b) => {
                                const regionA = a.region.toUpperCase();
                                const regionB = b.region.toUpperCase();
                                
                                if (regionA < regionB) {
                                    return -1;
                                }
                                if (regionA > regionB) {
                                    return 1;
                                }
                                return 0;
                            });
                        }

                        // sort locations by regions
                        const sortLocationsByState = (states) => {
                            return states.sort((a, b) => {
                                const stateA = a.name.toUpperCase();
                                const stateB = b.name.toUpperCase();
                                
                                if (stateA < stateB) {
                                    return -1;
                                }
                                if (stateA > stateB) {
                                    return 1;
                                }
                                return 0;
                            });
                        }

                        // group locations by state
                        const states_ = groupByState(locationList);

                        const sortedStates = sortLocationsByState(states_);

                        // sort regions function
                        const sortRegions = sortedStates.map(state => {
                            // console.log(state);
                            return {
                                ...state,
                                locations: sortLocationsByRegion(state.locations),
                            }
                        })

                        // set states
                        setStates(sortRegions);

                        setPageLoading(false);
                    }).catch(error => {
                        console.log("Error: ", error.message);
                        setToast({
                            text: error.message,
                            visible: true,
                            type: "error",
                        })
                    });

                });

                return unsubscribe;

            } catch (error) {
                console.log("Caught this Error: ", error.message);
                setToast({
                    text: error.message,
                    visible: true,
                    type: "error",
                });
            }
        };


        // fetch warehouses
        const unsubscribePromise = fetchLocations(business_id);

        // Cleanup function to unsubscribe from snapshot listener
        return () => {
            // Unsubscribe from snapshot listener once unsubscribePromise is resolved
            unsubscribePromise.then(unsubscribe => {
                if (unsubscribe) {
                    unsubscribe();
                }
            });
        };
    }, []);


    // console.log(states);

    // state to store search results
    const [searchResults, setSearchResults] = useState(states);

    const filterStatesAndLocations = (inputString) => {
        const filteredStates = states.filter((state) => {
          const isMatch = state.name.toLowerCase().includes(inputString.toLowerCase()) ||
            state.locations.some((location) => {      
                return location.region.toLowerCase().includes(inputString.toLowerCase())
            });
      
            if (isMatch) {
                state.opened = true;
                state.name = (() => { // self invoking function
                    const searchIndex = state.name.toLowerCase().indexOf(inputString.toLowerCase());

                    if (searchIndex !== -1) {
                        let textArray = state.name.toLowerCase().split(inputString.toLowerCase());
                        const fullString = textArray.join(`%!#${inputString}%!#`)
    
                        textArray = fullString.split('%!#');
                        // console.log(textArray);
    
                        return textArray.map((text, index) => {
                            if (index % 2 === 0) {
                                return (
                                    <Text 
                                        key={index} 
                                        style={index === 0 && {textTransform: 'capitalize'}}
                                        >
                                        {text}
                                    </Text>
                                ) 
                            } else {
                                return (
                                    <Text
                                        key={index}
                                        style={textArray[0] === "" && index === 1 && {textTransform: 'capitalize'}}
                                    >
                                        <Mark key={index}>{text.toLowerCase()}</Mark>
                                    </Text>
                                )
                            }
                        })
                    } else {
                        return state.name
                    }

                })(); 
                state.locations = state.locations.map((location) => {
                    const searchIndex = location.region.toLowerCase().indexOf(inputString.toLowerCase());
                    if (searchIndex !== -1) {

                        let textArray = location.region.toLowerCase().split(inputString.toLowerCase());
                        const fullString = textArray.join(`%!#${inputString}%!#`)
    
                        textArray = fullString.split('%!#');
                        return {
                            ...location,
                            location: textArray.map((text, index) => {
                                if (index % 2 === 0) {
                                    return (
                                        <Text 
                                            key={index} 
                                            style={index === 0 && {textTransform: 'capitalize'}}
                                            >
                                            {text}
                                        </Text>
                                    ) 
                                } else {
                                    return (
                                        <Text
                                            key={index}
                                            style={textArray[0] === "" && index === 1 && {textTransform: 'capitalize'}}
                                        >
                                            <Mark key={index}>{text.toLowerCase()}</Mark>
                                        </Text>
                                    )
                                }
                            }) 
                        }

                    } else {
                        return location;
                    }
                })
            }
      
          return isMatch;
        });
      
        return filteredStates;
    }

    useEffect(() => {
        // console.log(searchQuery);
        if (searchQuery === "") return setSearchResults(states);
        else return setSearchResults(filterStatesAndLocations(searchQuery));
    }, [searchQuery]);

    // function to highlight string
    const highlightString = (originalString, stringToAppend, index) => {

        // capitalize first character
        const capitalizeFirstCharacter = (str) => {
            return str.charAt(0).toUpperCase() + str.slice(1);
        }
        
        const prefix = index !== 0 ? originalString.slice(0, index) : "";
        const suffix = index !== originalString.length ? originalString.slice(index + stringToAppend.length, originalString.length) : "";
        // return prefix;
        return <>
            {prefix}
                <Mark>
                    {index === 0 ? capitalizeFirstCharacter(stringToAppend) : stringToAppend.toLowerCase()} 
                </Mark> 
            {suffix}
        </>
    }


    // function to split parent string at indices provided
    const splitAtIndices = (referenceString, indices) => {
        const substrings = [];
        
        let startIndex = 0;
        for (let i = 0; i < indices.length; i++) {
            const endIndex = indices[i];
            const substring = referenceString.substring(startIndex, endIndex);
            substrings.push(substring);
            startIndex = endIndex;
        }
        
        // Add the remaining part of the string after the last index
        const lastSubstring = referenceString.substring(startIndex);
        substrings.push(lastSubstring);
        
        return substrings;
    }

    // check of route params
    useEffect(() => {
        if (route.params?.toastType) {
            setToast({
                visible: true,
                type: route.params?.toastType,
                text: route.params?.toastMessage,
            })
        }
    }, [route.params])


    // console.log(searchResults)
    // render AddLogistics page
    return (
        <>
            {!pageLoading ? (
                <TouchableWithoutFeedback 
                    style={{
                        flex: 1, 
                    }}
                    // onclick dismiss keyboard
                    onPress={() => Keyboard.dismiss()}
                >   
                    <ScrollView 
                        style={style.container}
                        contentContainerStyle={style.contentContainer}
                        showsVerticalScrollIndicator={false}
                    >
                        <View style={style.main}>
                            {/* header component */}
                            <Header
                                navigation={navigation} 
                                stackName={"Available Locations"} 
                                unpadded={true}
                            />
                            <View style={style.paragraphWrapper}>
                                <Text style={style.headingText}>
                                    {writable ? <>
                                        Merchants will be able to see all your listed locations
                                    </> : <>
                                        Find all available locations and the associated fees {business_name} offers 
                                    </>}
                                </Text>
                                {/* check if any location has been added to data base */}
                                {states.length !== 0 && <>
                                    {/* location search bar */}
                                    <SearchBar
                                        placeholder={"Search for a location"}
                                        searchQuery={searchQuery}
                                        setSearchQuery={setSearchQuery}
                                        backgroundColor={white}
                                        disableFilter={true}
                                    />
                                </>}
                            </View>
                            {states.length !== 0 ? <>
                                {/* locations accordion, grouped by states */}
                                <View style={style.locationsWrapper}>
                                    { states.map(state => (
                                        <Accordion
                                            key={state.name}
                                            states={states}
                                            state={state.name}
                                            locations={state.locations}
                                            opened={state.opened}
                                            showEditButton={true}
                                            navigation={navigation}
                                        />
                                    ))}
                                </View>
                            </> : <>
                                <View style={style.noLocationWrapper}>
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate("AddLocation")}
                                    >
                                        <AddLocationIcon />
                                    </TouchableOpacity>
                                    <Text style={style.noLocationHeading}>
                                        You haven’t added any location yet
                                    </Text>
                                    <Text style={style.noLocationParagraph}>
                                        Add locations and their associated charge 
                                    </Text>
                                </View>
                            </>}
                        </View>
                    </ScrollView>
                </TouchableWithoutFeedback>
            ) : <AvailableLocationsSkeleton />}
            {/* show add location button if its a logistics account and a manager */}
            {!pageLoading && writable && (
                <CustomButton 
                    fixed={true}
                    backgroundColor={white}
                    name={"Add Location"}
                    onPress={() => navigation.navigate("AddLocation")}
                />
            )}
        </>
    );
}

// stylesheet
const style = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        padding: 20,
        paddingTop: 0,
        backgroundColor: background,
    },
    contentContainer: {
        paddingBottom: 100,
        minHeight: "100%",
    },
    main: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        marginBottom: 20,
    },
    paragraphWrapper: {
        width: "100%",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
    },
    headingText: {
        fontFamily: "mulish-medium",
        fontSize: 12,
        color: bodyText,
        marginBottom: 42,
        marginTop: 8,
    },
    locationsWrapper: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        width: '100%',
        gap: 20,
        backgroundColor: white,
        borderRadius: 12,
        padding: 20
    },
    noLocationWrapper: {
        width: "100%",
        height: "70%",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    noLocationHeading: {
        fontFamily: 'mulish-semibold',
        fontSize: 14,
        color: black,
        lineHeight: 18,
        marginBottom: 8,
        marginTop: 12,
    },
    noLocationParagraph: {
        fontFamily: 'mulish-regular',
        fontSize: 12,
        color: bodyText,
        lineHeight: 15,
        maxWidth: 150,
        textAlign: 'center',
    },
})
 
export default AvailableLocations;