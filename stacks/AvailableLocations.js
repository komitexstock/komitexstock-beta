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
import { useState, useEffect, useMemo } from "react";

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
    getDocs,
    where,
    query,
    getDoc,
} from "firebase/firestore";

// local database
import { handleLocations } from "../sql/handleLocation";
import { useSQLiteContext } from "expo-sqlite/next";

const AvailableLocations = ({navigation, route}) => {

    // local database
    const db = useSQLiteContext();

    // sate to trigger reload of local db
    const [triggerReload, setTriggerReload] = useState(1);

    // get auth date
    const { authData } = useAuth();

    // business id and business name of logistics company
    const {business_id, business_name, preload_states, recent} = useMemo(() => {
        return route?.params || {};
    }, [route]);

    // page loading state
    const [pageLoading, setPageLoading] = useState(preload_states.length === 0);


    // state to store search query
    const [searchQuery, setSearchQuery] = useState("");


    // parameter to determine if location is read only or writeable
    const writable = authData.business_id === business_id && authData.account_type === "Logistics" && authData?.role === "Manager";

    // globals
    const { setToast, currentStack } = useGlobals();

    // states and delivery locations 
    const [states, setStates] = useState(preload_states)

    // get states from local db
    useEffect(() => {

        const fetchLocations = async () => {
            try {
                const locations = await handleLocations.getLocations(db);
                return locations;
            } catch (error) {
                console.log("fetch local locations eror", error.message);   
                throw error;             
            }
        }

        // group locations by state
        const groupByState = (locations) => {
            const groupedByState = locations?.reduce((acc, obj) => {
                const { state, ...rest } = obj;
                // Check if state is defined and not null
                if (state !== undefined && state !== null) {
                    if (!acc[state]) {
                        acc[state] = { id: state, name: state, opened: false, locations: [] };
                        // acc[state] = { name: state, opened: false, locations: [] };
                    }
                    acc[state].locations.push(rest);
                }
                return acc;
            }, {});

            return Object.values(groupedByState);
        }

        fetchLocations().then((locations) => {

            // if data is the most recent, retrun from function
            if (recent) {

                // preloaded data
                const preloadedStates = route?.params?.preload_states; 
                
                // set states
                setStates(prevStates => {
                    return [
                        ...preloadedStates.map(state => {
                            // get active state
                            const activeState = prevStates.find(prevState => prevState.id === state.id);
    
                            return {
                                ...state,
                                opened: activeState?.opened || false, // retain previous value, else set as false
                            }
                        }),
                    ]
                });
                // data already exist return
                return;
            }

            const groupState = groupByState(locations);
            
            // set states 
            setStates(prevStates => {
                return [
                    ...groupState.map(state => {
                        // get active state
                        const activeState = prevStates.find(prevState => prevState.id === state.id);

                        return {
                            ...state,
                            opened: activeState?.opened || false, // retain previous value, else set as false
                        }
                    }),
                ]
            });
            
        }).catch((error) => {
            // show error message
            console.log("fetch local locations eror", error.message);   
            
            // show toast
            setToast({
                text: error.message,
                visible: true,
                type: "error",
            });

        }).finally(() => {
            // disable page loading state
            setPageLoading(false);
        });

        console.log("CURRENT STACK:", currentStack);

    }, [triggerReload, currentStack])

    // get states from online db
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
                // if data is the most recent, return from function
                if (recent) return;

                // fetch locations
                const collectionRef = collection(database, "locations");
                const q = query(
                    collectionRef,
                    where("business_id", "==", businessId),
                );

                const querySnapshot = await getDocs(q);

                let locationList = [];

                for (const doc of querySnapshot.docs) {
                    const warehouse_name = await fetchWarehouseName(doc.data().warehouse_id);
                    const location = {
                        id: doc.id, // string
                        delivery_charge: doc.data().delivery_charge, // number
                        region: doc.data().region, // string
                        state: doc.data().state, // string
                        warehouse_id: doc.data().warehouse_id, // string
                        warehouse_name: warehouse_name, // Use the corresponding warehouse name
                    };
                    locationList.push(location);
                    // add data to local database
                    await handleLocations.createLocation(db, location);
                }

                // prune locations that dont exist any more
                await handleLocations.pruneLocations(db, locationList);

                // trigger reload of local db
                setTriggerReload(prevValue => prevValue++);

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
        const unsubscribePromise = fetchLocations(authData?.business_id);

        // Cleanup function to unsubscribe from snapshot listener
        return () => {
            // Unsubscribe from snapshot listener once unsubscribePromise is resolved
            unsubscribePromise.then(() => {});
        };
    }, []);


    // state to store searched results
    const [searchedStates, setSearchedStates] = useState([])

    useEffect(() => {
        // funcion to filter states and locations
        const filterStatesAndLocations = () => {
            // if (searchQuery === '') return states;

            const filteredStates = states.filter((state) => {

                const isMatch = state?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                state.locations.some((location) => {      
                    return location?.region?.toLowerCase()?.includes(searchQuery?.toLowerCase())
                });
                return isMatch;
            });

            return filteredStates;
        }

        setSearchedStates(() => {
            if (!searchQuery) return [];
            return filterStatesAndLocations()
        });

    }, [searchQuery]);

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
                                    {writable ? (
                                        'Merchants will be able to see all your listed locations'
                                    ) : (
                                        `Find all available locations and the associated fees ${business_name} offers` 
                                    )}
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
                            {/* if there exist already uploaded locations, that are grupoed by states */}
                            {states.length !== 0 ? <>
                                <View style={style.locationsWrapper}>
                                    {/* locations accordion, grouped by states, when search keyword is empty */}
                                    {searchQuery === "" && states.map(state => (
                                        <Accordion
                                            key={state.id}
                                            states={states}
                                            state={state.name}
                                            searchQuery={searchQuery}
                                            locations={state.locations}
                                            opened={state.opened}
                                            showEditButton={true}
                                            navigation={navigation}
                                        />
                                    ))}
                                    {/* searched locations accordion, grouped by states*/}
                                    {searchQuery !== "" && searchedStates.map(state => (
                                        <Accordion
                                            key={state.id}
                                            states={states}
                                            state={state.name}
                                            searchQuery={searchQuery}
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