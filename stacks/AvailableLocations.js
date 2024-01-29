// react native components
import { 
    View, 
    Text, 
    TouchableWithoutFeedback,
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
// globals
import { useGlobals } from '../context/AppContext';
// auth
import { useAuth } from "../context/AuthContext";

const AvailableLocations = ({navigation, route}) => {

    // get auth date
    const { authData } = useAuth();

    // state to store search query
    const [searchQuery, setSearchQuery] = useState("");

    // business id of logistics company
    const business_id = route?.params?.business_id;

    // business id of logistics company
    const business_name = route?.params?.business_name;

    // parameter to determine if location is read only or writeable
    const writable = authData.business_id === business_id && authData.account_type === "Logistics" && authData?.role === "Manager";

    // globals
    const { setToast } = useGlobals();


    // states and delivery locations 43456709--UIJKNM TY6T VFT5RXC W3W` 
    const states = [
        {
            id: 1,
            name: "Delta",
            opened: false,
            locations: [
                {
                    id: 1,
                    location: "Asaba",
                    charge: 4000,
                    warehouse_id: 2,
                    warehouse_name: "Asaba,"
                },
                {
                    id: 3,
                    location: "Sapele",
                    charge: 3500,
                    warehouse_id: 5,
                    warehouse_name: "Sapele,"
                },
                {
                    id: 10,
                    location: "Oghara",
                    charge: 3500,
                    warehouse_id: 5,
                    warehouse_name: "Sapele,"
                },
                {
                    id: 4,
                    location: "Ughelli",
                    charge: 4000,
                    warehouse_id: 1,
                    warehouse_name: "Warri,"
                },
                {
                    id: 5,
                    location: "Agbor",
                    charge: 3500,
                    warehouse_id: 4,
                    warehouse_name: "Agbor,"
                },
                {
                    id: 6,
                    location: "Warri",
                    charge: 3000,
                    warehouse_id: 1,
                    warehouse_name: "Warri,"
                },
                {
                    id: 7,
                    location: "Abraka",
                    charge: 4000,
                    warehouse_id: 6,
                    warehouse_name: "Abraka,"
                },
                {
                    id: 11,
                    location: "Obiarurku",
                    charge: 4000,
                    warehouse_id: 6,
                    warehouse_name: "Abraka,"
                },
                {
                    id: 8,
                    location: "Ibusa",
                    charge: 3500,
                    warehouse_id: 2,
                    warehouse_name: "Asaba,"
                },
                {
                    id: 9,
                    location: "Okpanam",
                    charge: 3000,
                    warehouse_id: 2,
                    warehouse_name: "Asaba,"
                },
                {
                    id: 14,
                    location: "Eku",
                    charge: 4000,
                    warehouse_id: 1,
                    warehouse_name: "Warri,"
                },
                {
                    id: 12,
                    location: "Ozoro",
                    charge: 4000,
                    warehouse_id: 7,
                    warehouse_name: "Isoko,"
                },
                {
                    id: 13,
                    location: "Oleh",
                    charge: 4000,
                    warehouse_id: 7,
                    warehouse_name: "Isoko,"
                },
            ]
        },
        {
            id: 2,
            name: "Edo",
            opened: false,
            locations: [
                {
                    id: 1,
                    location: "Benin City",
                    charge: 4000,
                    warehouse_id: 1,
                    warehouse_name: "Warri,"
                },
                {
                    id: 2,
                    location: "Auchi",
                    charge: 3500,
                    warehouse_id: 1,
                    warehouse_name: "Warri,"
                },
                {
                    id: 3,
                    location: "Igarra",
                    charge: 3000,
                    warehouse_id: 1,
                    warehouse_name: "Warri,"
                },
                {
                    id: 4,
                    location: "Okpella",
                    charge: 3500,
                    warehouse_id: 1,
                    warehouse_name: "Warri,"
                },
                {
                    id: 5,
                    location: "Ekpoma",
                    charge: 4000,
                    warehouse_id: 1,
                    warehouse_name: "Warri,"
                },
                {
                    id: 6,
                    location: "Usen",
                    charge: 3500,
                    warehouse_id: 1,
                    warehouse_name: "Warri,"
                },
                {
                    id: 7,
                    location: "Irrua",
                    charge: 3000,
                    warehouse_id: 1,
                    warehouse_name: "Warri,"
                },
                {
                    id: 8,
                    location: "Sabongida-Ora",
                    charge: 4000,
                    warehouse_id: 1,
                    warehouse_name: "Warri,"
                }
            ]
        },
        {
            id: 3,
            name: "Lagos",
            opened: false,
            locations: [
                {
                    id: 1,
                    location: "Ikeja",
                    charge: 4000,
                    warehouse_id: 1,
                    warehouse_name: "Warri,"
                },
                {
                    id: 2,
                    location: "Victoria Island",
                    charge: 5000,
                    warehouse_id: 1,
                    warehouse_name: "Warri,"
                },
                {
                    id: 3,
                    location: "Surulere",
                    charge: 3500,
                    warehouse_id: 1,
                    warehouse_name: "Warri,"
                },
                {
                    id: 4,
                    location: "Lekki",
                    charge: 4500,
                    warehouse_id: 1,
                    warehouse_name: "Warri,"
                },
                {
                    id: 5,
                    location: "Yaba",
                    charge: 3500,
                    warehouse_id: 1,
                    warehouse_name: "Warri,"
                },
                {
                    id: 6,
                    location: "Ikorodu",
                    charge: 4000,
                    warehouse_id: 1,
                    warehouse_name: "Warri,"
                },
                {
                    id: 7,
                    location: "Apapa",
                    charge: 3500,
                    warehouse_id: 1,
                    warehouse_name: "Warri,"
                },
                {
                    id: 8,
                    location: "Epe",
                    charge: 4000,
                    warehouse_id: 1,
                    warehouse_name: "Warri,"
                }
            ]
        },
        {
            id: 4,
            name: "Anambra",
            opened: false,
            locations: [
                {
                    id: 1,
                    location: "Awka",
                    charge: 4000,
                    warehouse_id: 1,
                    warehouse_name: "Warri,"
                },
                {
                    id: 2,
                    location: "Onitsha",
                    charge: 3500,
                    warehouse_id: 1,
                    warehouse_name: "Warri,"
                },
                {
                    id: 3,
                    location: "Nnewi",
                    charge: 3000,
                    warehouse_id: 1,
                    warehouse_name: "Warri,"
                },
                {
                    id: 4,
                    location: "Ekwulobia",
                    charge: 3500,
                    warehouse_id: 1,
                    warehouse_name: "Warri,"
                },
                {
                    id: 5,
                    location: "Aguata",
                    charge: 4000,
                    warehouse_id: 1,
                    warehouse_name: "Warri,"
                },
                {
                    id: 6,
                    location: "Orumba",
                    charge: 3500,
                    warehouse_id: 1,
                    warehouse_name: "Warri,"
                },
                {
                    id: 7,
                    location: "Ogidi",
                    charge: 3000,
                    warehouse_id: 1,
                    warehouse_name: "Warri,"
                },
                {
                    id: 8,
                    location: "Otuocha",
                    charge: 4000,
                    warehouse_id: 1,
                    warehouse_name: "Warri,"
                }
            ]
        },
        {
            id: 5,
            name: "Rivers",
            opened: false, 
            locations: [
                {
                    id: 1,
                    location: "Port Harcourt",
                    charge: 4500,
                    warehouse_id: 1,
                    warehouse_name: "Warri,"
                },
                {
                    id: 2,
                    location: "Obio/Akpor",
                    charge: 4000,
                    warehouse_id: 1,
                    warehouse_name: "Warri,"
                },
                {
                    id: 3,
                    location: "Eleme",
                    charge: 3500,
                    warehouse_id: 1,
                    warehouse_name: "Warri,"
                },
                {
                    id: 4,
                    location: "Okrika",
                    charge: 4000,
                    warehouse_id: 1,
                    warehouse_name: "Warri,"
                },
                {
                    id: 5,
                    location: "Bonny",
                    charge: 5000,
                    warehouse_id: 1,
                    warehouse_name: "Warri,"
                },
                {
                    id: 6,
                    location: "Ahoada",
                    charge: 3500,
                    warehouse_id: 1,
                    warehouse_name: "Warri,"
                },
                {
                    id: 7,
                    location: "Degema",
                    charge: 4000,
                    warehouse_id: 1,
                    warehouse_name: "Warri,"
                },
                {
                    id: 8,
                    location: "Opobo",
                    charge: 3500,
                    warehouse_id: 1,
                    warehouse_name: "Warri,"
                }
            ]
        },
        {
            id: 6,
            name: "Bayelsa",
            opened: false,
            locations: [
                {
                    id: 1,
                    location: "Yenagoa",
                    charge: 4000,
                    warehouse_id: 1,
                    warehouse_name: "Warri,"
                },
                {
                    id: 2,
                    location: "Brass",
                    charge: 3500,
                    warehouse_id: 1,
                    warehouse_name: "Warri,"
                },
                {
                    id: 3,
                    location: "Nembe",
                    charge: 3000,
                    warehouse_id: 1,
                    warehouse_name: "Warri,"
                },
                {
                    id: 4,
                    location: "Ogbia",
                    charge: 3500,
                    warehouse_id: 1,
                    warehouse_name: "Warri,"
                },
                {
                    id: 5,
                    location: "Sagbama",
                    charge: 4000,
                    warehouse_id: 1,
                    warehouse_name: "Warri,"
                },
            ],
        },
        {
            id: 7,
            name: "Abuja",
            opened: false,
            locations: [
                {
                    id: 1,
                    location: "Central Area",
                    charge: 4500,
                    warehouse_id: 1,
                    warehouse_name: "Warri,"
                },
                {
                    id: 2,
                    location: "Garki",
                    charge: 4000,
                    warehouse_id: 1,
                    warehouse_name: "Warri,"
                },
                {
                    id: 3,
                    location: "Wuse",
                    charge: 3500,
                    warehouse_id: 1,
                    warehouse_name: "Warri,"
                },
                {
                    id: 4,
                    location: "Asokoro",
                    charge: 4000,
                    warehouse_id: 1,
                    warehouse_name: "Warri,"
                },
                {
                    id: 5,
                    location: "Maitama",
                    charge: 5000,
                    warehouse_id: 1,
                    warehouse_name: "Warri,"
                },
            ],
        },
        {
            id: 8,
            name: "Cross River",
            opened: false,
            locations: [
                {
                    id: 1,
                    location: "Calabar",
                    charge: 4000,
                    warehouse_id: 1,
                    warehouse_name: "Warri,"
                },
                {
                    id: 2,
                    location: "Ikom",
                    charge: 3500,
                    warehouse_id: 1,
                    warehouse_name: "Warri,"
                },
                {
                    id: 3,
                    location: "Ogoja",
                    charge: 3000,
                    warehouse_id: 1,
                    warehouse_name: "Warri,"
                },
                {
                    id: 4,
                    location: "Obudu",
                    charge: 3500,
                    warehouse_id: 1,
                    warehouse_name: "Warri,"
                },
                {
                    id: 5,
                    location: "Ugep",
                    charge: 4000,
                    warehouse_id: 1,
                    warehouse_name: "Warri,"
                },
            ],
        },
        {
            id: 9,
            name: "Oyo",
            opened: false,
            locations: [
                {
                    id: 1,
                    location: "Ibadan",
                    charge: 4000,
                    warehouse_id: 1,
                    warehouse_name: "Warri,"
                },
                {
                    id: 2,
                    location: "Ogbomosho",
                    charge: 3500,
                    warehouse_id: 1,
                    warehouse_name: "Warri,"
                },
                {
                    id: 3,
                    location: "Iseyin",
                    charge: 3000,
                    warehouse_id: 1,
                    warehouse_name: "Warri,"
                },
                {
                    id: 4,
                    location: "Oyo",
                    charge: 3500,
                    warehouse_id: 1,
                    warehouse_name: "Warri,"
                },
                {
                    id: 5,
                    location: "Eruwa",
                    charge: 4000,
                    warehouse_id: 1,
                    warehouse_name: "Warri,"
                },
            ],
        }
    ];

    // state to store search results
    const [searchResults, setSearchResults] = useState(states);

    const filterStatesAndLocations = (inputString) => {
        const filteredStates = states.filter((state) => {
          const isMatch = state.name.toLowerCase().includes(inputString.toLowerCase()) ||
            state.locations.some((location) => {      
                return location.location.toLowerCase().includes(inputString.toLowerCase())
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
                    const searchIndex = location.location.toLowerCase().indexOf(inputString.toLowerCase());
                    if (searchIndex !== -1) {

                        let textArray = location.location.toLowerCase().split(inputString.toLowerCase());
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
            <TouchableWithoutFeedback 
                style={{
                    flex: 1, 
                }}
                // onclick dismiss keyboard
                onPress={() => Keyboard.dismiss()}
            >   
                <ScrollView 
                    style={style.container}
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
                            {/* location search bar */}
                            <SearchBar
                                placeholder={"Search for a location"}
                                searchQuery={searchQuery}
                                setSearchQuery={setSearchQuery}
                                backgroundColor={white}
                                disableFilter={true}
                            />
                        </View>
                        {/* locations accordion, grouped by states */}
                        <View style={style.locationsWrapper}>
                            { searchResults.map(state => (
                                <Accordion
                                    key={state.id}
                                    states={states}
                                    state={state.name}
                                    locations={state.locations}
                                    opened={state.opened}
                                    showEditButton={true}
                                    navigation={navigation}
                                />
                            ))}
                        </View>
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
            {/* show add location button if its a logistics account and a manager */}
            {writable && (
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
    main: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 20,
    },
    headingText: {
        fontFamily: "mulish-medium",
        fontSize: 12,
        color: bodyText,
        marginBottom: 24,
        marginTop: 8,
    },
    popUpContent: {
        flex: 1,
        height: "100%",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    popUpHeading: {
        fontSize: 16,
        fontFamily: 'mulish-bold',
        textAlign: 'center',
        color: black,
    },
    popUpParagraph: {
        fontSize: 12,
        fontFamily: 'mulish-regular',
        textAlign: 'center',
        color: bodyText,
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
})
 
export default AvailableLocations;