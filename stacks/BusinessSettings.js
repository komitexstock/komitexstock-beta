// recat native components
import { StyleSheet, View } from 'react-native';

// react hooks
import React, { useMemo, useState, useEffect } from 'react'

// components
import Header from '../components/Header'
import AccountButtons from '../components/AccountButtons'
import { background } from '../style/colors'

// use auth
import { useAuth } from '../context/AuthContext'

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

const BusinessSettings = ({navigation, route}) => {

    // auth data
    const { authData } = useAuth();

    // local database
    const db = useSQLiteContext();

    // preload states
    const [preloadStates, setPreloadStates] = useState([]);

    // most recent states obtained
    const [recent, setRecent] = useState(false);

    // get states from local db
    useEffect(() => {
        // function to fetch locations
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

        // fetch locations
        fetchLocations().then((locations) => {
            // group regions by states
            const grougState = groupByState(locations)
            
            // set states 
            setPreloadStates(grougState);

        }).catch((error) => {
            // show error message
            console.log("fetch local locations eror", error.message);   
            
            // show toast
            setToast({
                text: error.message,
                visible: true,
                type: "error",
            });
        })

    }, [recent, route]);

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

                // most recent iteration of data
                setRecent(true);

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
    }, [route]);
    

    // business button list
    const businessButtons = useMemo(() => {
        return [
        {
            id: 1,
            title: "Locations",
            mainInfoText: "Manage all your delivery locations and fees",
            onPress: () => navigation.navigate("AvailableLocations", {
                business_id: authData.business_id,
                business_name: authData.business_name,
                preload_states: preloadStates,
                recent: recent,
            }),
        },
        {
            id: 2,
            title: "Business Policy",
            mainInfoText: "Let your merchants know how you operate",
            onPress: () => navigation.navigate("BusinessPolicy", {
                business_id: authData.business_id,
            }),
        },
        {
            id: 3,
            title: "Reviews",
            mainInfoText: "See how well you are performing",
            onPress: () => navigation.navigate("Reviews", {
                business_id: authData.business_id,
            }),
        },
        ];
    }, [preloadStates]);


    return (
        <View style={styles.container}>
            {/* header component */}
            <Header
                navigation={navigation}
                stackName={"Business Settings"}
                unpadded={true}
            />
            <View style={styles.buttonsWrapper}>
                {/* buttons list */}
                {businessButtons.map((button, index) => (
                    <AccountButtons
                        index={index}
                        length={businessButtons.length - 1}
                        key={button.id}
                        title={button.title}
                        subtitle={button.mainInfoText}
                        onPress={button.onPress}
                    />
                ))

                }
            </View>
        </View>
    )
}

export default BusinessSettings

const styles = StyleSheet.create({
    container: {
        width:  "100%",
        minHeight: "100%",
        backgroundColor: background,
        paddingHorizontal: 20,
    },
    buttonsWrapper: {
        marginTop: 30,
    }
})