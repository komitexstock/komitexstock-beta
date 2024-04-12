// recat native components
import { StyleSheet, View } from 'react-native';

// react hooks
import React, { useMemo, useState, useEffect } from 'react'

// components
import Header from '../components/Header'
import AccountButtons from '../components/AccountButtons'
import { background } from '../style/colors'

// globals
import { useGlobals } from "../context/AppContext";

// use auth
import { useAuth } from '../context/AuthContext'

// local database
import { handleLocations } from "../sql/handleLocations";
import { handleBusinessPolicies } from '../sql/handleBusinessPolicies';
import { useSQLiteContext } from "expo-sqlite/next";



const BusinessSettings = ({navigation}) => {

    // auth data
    const { authData } = useAuth();

    // local database
    const db = useSQLiteContext();

    // bottoms sheef refs
    const { currentStack, setToast } = useGlobals();

    // preloaded data
    const [preload, setPreload] = useState({
        locations: { 
            data: [] // data for AvailableLocations screen
        },
        businessPolicy: {
            data: [] // data for BusinessPolicy screen
        },
        reviews: {
            data: [] // data for Reviews screen
        }
    })

    // get locations and policies from local db
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

        // function to fetch locations
        const fetchBusinessPolicies = async () => {
            try {
                const businessPolicy = await handleBusinessPolicies.getBusinessPolicy(db, authData?.business_id);
                // await handleBusinessPolicies.createTableBusinessPolicy(db);
                // return 'success';
                return businessPolicy;
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
            // setPreloadStates(grougState);

            // set preloaded data fro locations
            setPreload((prevState) => {
                return {
                    ...prevState,
                    locations: {
                        data: grougState,
                    }
                }
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
        });

        // fetch business policies
        fetchBusinessPolicies().then((businessPolicy) => {
            // set preloaded data for businessPolicies
            setPreload((prevState) => {
                return {
                    ...prevState,
                    businessPolicy: {
                        data: businessPolicy,
                    }
                }
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
        });

    }, [currentStack]);
    
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
                preloaded_data: preload.locations.data,
            }),
        },
        {
            id: 2,
            title: "Business Policy",
            mainInfoText: "Let your merchants know how you operate",
            onPress: () => navigation.navigate("BusinessPolicy", {
                business_id: authData.business_id,
                preloaded_data: preload.businessPolicy.data,
            }),
        },
        {
            id: 3,
            title: "Reviews",
            mainInfoText: "See how well you are performing",
            onPress: () => navigation.navigate("Reviews", {
                business_id: authData.business_id,
                preloaded_data: preload.reviews.data,
            }),
        },
        ];
    }, [preload]);


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