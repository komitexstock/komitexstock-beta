// react native components
import {
    ScrollView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Keyboard,
    Platform,
    TouchableWithoutFeedback,
} from "react-native";

// components
import Header from "../components/Header";
import Input from '../components/Input';
import CustomButton from '../components/CustomButton';
import CustomBottomSheet from '../components/CustomBottomSheet';

// colors
import { background, black, bodyText, listSeparator2, primaryColor, subText, white } from "../style/colors";

// icons
import RemittanceIcon from "../assets/icons/RemittanceIcon";
import FailedDeliveryIcon from "../assets/icons/FailedDeliveryIcon";
import InactiveInventoryIcon from "../assets/icons/InactiveInventoryIcon";
import RemittanceLargeIcon from "../assets/icons/RemittanceLargeIcon";
import FailedDeliveryLargeIcon from "../assets/icons/FailedDeliveryLargeIcon";
import InactiveInventoryLargeIcon from "../assets/icons/InactiveInventoryLargeIcon";
import RightArrowIcon from "../assets/icons/RightArrowIcon";

// skeleton screen
import BusinessPolicySkeleton from "../skeletons/BusinessPolicySkeleton";

//  useAuth
import { useAuth } from "../context/AuthContext";

// globals
import { useGlobals } from "../context/AppContext";

// react hoooks
import { useState, useEffect, useMemo, useRef } from "react";

// utilities
import { windowHeight } from "../utils/helpers";

// firebase
import {
    database,
} from "../Firebase";

// firestore functions
import {
    getDoc,
    updateDoc,
    setDoc,
    doc,
    serverTimestamp,
} from "firebase/firestore";

// local database
import { handleBusinessPolicies } from '../sql/handleBusinessPolicies';
import { useSQLiteContext } from "expo-sqlite/next";

const BusinessPolicy = ({navigation, route}) => {

    // useAuth
    const { authData } = useAuth();

    // local database
    const db = useSQLiteContext();
    
    // business id retreived from route parameters
    const { business_id, preloaded_data } = useMemo(() => {
        return route.params || {};
    }, [route]);

    // state to indicate some policies has already been added
    const [policiesExist, setPoliciesExist] = useState(!preloaded_data);

    // page loading state
    const [pageLoading, setPageLoading] = useState(preloaded_data === null|| preloaded_data?.length === 0);

    // bottom sheet ref
    const sheetRef = useRef(null);

    // bottomsheet varaibels
    const {
        bottomSheet,
        setBottomSheet,
        setToast,
        isLoading, 
        setIsLoading,
    } = useGlobals();

    // update bottomsheet close function
    useEffect(() => {
        setBottomSheet(prevState=> {
            return {...prevState, close: () => sheetRef.current?.close()}
        });
    }, []);

    // botomsheet parameters 
    const [sheetParameters, setSheetParameters] = useState({
        sheetTitle: "Remittance",
        snapPointsArray: [386],
    })
    
    // open bottomsheet modal function
    const openModal = (type, enableEdit)  => {
        // enable active state for input
        if (enableEdit && type === "Additional Policy") {
            setAdditionalInput(additionalPolicy);
        }

        // set sheet parameters
        setSheetParameters(prevParameters => {
            return {
                ...prevParameters,
                sheetTitle: type,
            }
        });

        // open bottom sheet modal
        sheetRef.current?.present();

        // update bottmsheet global state
        setBottomSheet(prevValue => {
            return {
                ...prevValue,
                opened: true,
            }
        });
    }

    // close bottomsheet modal function
    const closeModal = () => {
        // close bottomsheet modal
        sheetRef.current?.close();

        // update bottmsheet global state
        setBottomSheet(prevValue => {
            return {
                ...prevValue,
                opened: false,
            }
        });
    }

    // remittance policy
    const [remittancePolicy, setRemittancePolicy] = useState(preloaded_data?.max_remittance_duration || "");

    // failed delivery policy
    const [failedDeliveryPolicy, setFailedDeliveryPolicy] = useState(preloaded_data?.failed_delivery_percentage || "");

    // inactive inventory policy
    const [inactiveInventoryPolicy, setInactiveInventoryPolicy] = useState(preloaded_data?.max_inactive_inventory || "");

    // additional policy
    const [additionalPolicy, setAdditionalPolicy] = useState(preloaded_data?.additional_policy || "");

    // remittance input
    const [remittanceInput, setRemittanceInput] = useState(preloaded_data?.max_remittance_duration || "");
    
    // error state for remit period input
    const [errorRemittanceInput, setErrorRemittanceInput] = useState(false);

    // listen for keyboard opening or closing
    useEffect(() => {
        // if keyboard is open
        const keyboardDidShowListener = Keyboard.addListener(
            Platform.OS === 'android' ? 'keyboardDidShow' : 'keyboardWillShow', () => {
                if (!bottomSheet.opened) return;
                // set bottomsheet paramteres
                setSheetParameters(prevValue => {
                    return {
                        ...prevValue,
                        snapPointsArray: [windowHeight],
                    }
                })
            }
        );
        
        // keyboard is closed
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            // run any desired function here
            // if wareehouse address is empty
            // set bottomsheet paramteres
            setSheetParameters(prevValue => {
                return {
                    ...prevValue,
                    snapPointsArray: [386],
                }
            })

        });

        // this is useful if the bottomsheet is closed 
        // without performing an action
        if (!bottomSheet.opened) {
            // set bottomsheet paramteres
            setSheetParameters(prevValue => {
                return {
                    ...prevValue,
                    snapPointsArray: [386],
                }
            })
        }

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, [bottomSheet.opened]);

    // update remittance input function, triggered onnchange in Input component
    const updateRemittanceInput = (text) => {
        setRemittanceInput(text);
    }

    // update remittance policy
    const handleUpdateRemittancePolicy =  async () => {
        try {
            // dismiss keyborad
            Keyboard.dismiss();

            // indicate loading state in button
            setIsLoading(true);
    
            // business ref
            const businessPoliciesRef = doc(database, "business_policies", business_id);
            
            if (policiesExist) {
                // save data in business_policies collection
                await updateDoc(businessPoliciesRef, {
                    max_remittance_duration: remittanceInput,
                    editedAt: serverTimestamp(),
                });
            } else {
                // save data in business_policies collection
                await setDoc(businessPoliciesRef, {
                    max_remittance_duration: remittanceInput,
                    createdAt: serverTimestamp(),
                });

                // acknowledge policy exist
                setPoliciesExist(true);
            }

            // update local db
            await handleBusinessPolicies.createBusinessPolicy(
                db, 
                { 
                    max_remittance_duration: remittanceInput,
                    id: business_id,
                }
            );

            // update policy state
            setRemittancePolicy(remittanceInput);
    
            // close bottomsheet
            closeModal();

            // disable loading state
            setIsLoading(false)
            
        } catch (error) {
            // disable loading state
            setIsLoading(false);

            console.log("Caught Error: ", error.message);
            setToast({
                text: error.message,
                visible: true,
                type: "error",
            });
        }
    }

    // failedDelivery input
    const [failedDeliveryInput, setFailedDeliveryInput] = useState(preloaded_data?.failed_delivery_percentage || "");
    
    // error state for remit period input
    const [errorFailedDeliveryInput, setErrorFailedDeliveryInput] = useState(false);

    // update failedDelivery input function, triggered onnchange in Input component
    const updateFailedDeliveryInput = (text) => {
        setFailedDeliveryInput(text);
    }

    // update failedDelivery policy
    const handleUpdateFailedDeliveryPolicy = async () => {
        
        try {
            // dismiss keyborad
            Keyboard.dismiss();

            // indicate loading state in button
            setIsLoading(true);
    
            // business ref
            const businessPoliciesRef = doc(database, "business_policies", business_id);
            
            if (policiesExist) {
                // save data in business_policies collection
                await updateDoc(businessPoliciesRef, {
                    failed_delivery_percentage: failedDeliveryInput,
                    editedAt: serverTimestamp(),
                });
            } else {
                // save data in business_policies collection
                await setDoc(businessPoliciesRef, {
                    failed_delivery_percentage: failedDeliveryInput,
                    createdAt: serverTimestamp(),
                });

                // acknowledge policy exist
                setPoliciesExist(true);
            }

            // update local db
            await handleBusinessPolicies.createBusinessPolicy(
                db, 
                { 
                    failed_delivery_percentage: failedDeliveryInput,
                    id: business_id,
                }
            );

            // update policy state
            setFailedDeliveryPolicy(failedDeliveryInput);

            // close bottomsheet
            closeModal();

            // disable loading state
            setIsLoading(false);
            
        } catch (error) {
            // disable loading state
            setIsLoading(false);

            console.log("Caught Error: ", error.message);
            setToast({
                text: error.message,
                visible: true,
                type: "error",
            });
        }
    }

    // inactiveInventory input
    const [inactiveInventoryInput, setInactiveInventoryInput] = useState(preloaded_data?.max_inactive_inventory || "");
    
    // error state for remit period input
    const [errorInactiveInventoryInput, setErrorInactiveInventoryInput] = useState(false);

    // update inactiveInventory input function, triggered onnchange in Input component
    const updateInactiveInventoryInput = (text) => {
        setInactiveInventoryInput(text);
    }

    // update inactiveInventory policy
    const handleUpdateInactiveInventoryPolicy = async () => {
        try {
            // dismiss keyborad
            Keyboard.dismiss();

            // indicate loading state in button
            setIsLoading(true);
    
            // business ref
            const businessPoliciesRef = doc(database, "business_policies", business_id);
            
            if (policiesExist) {
                // save data in business_policies collection
                await updateDoc(businessPoliciesRef, {
                    max_inactive_inventory: inactiveInventoryInput,
                    editedAt: serverTimestamp(),
                });
            } else {
                // save data in business_policies collection
                await setDoc(businessPoliciesRef, {
                    max_inactive_inventory: inactiveInventoryInput,
                    createdAt: serverTimestamp(),
                });

                // acknowledge policy exist
                setPoliciesExist(true);
            }

            // update local db
            await handleBusinessPolicies.createBusinessPolicy(
                db, 
                { 
                    max_inactive_inventory: inactiveInventoryInput,
                    id: business_id,
                },
            )

            // set local state
            setInactiveInventoryPolicy(inactiveInventoryInput);

            // close bottomsheet
            closeModal();

            // disable loading state
            setIsLoading(false);
            
        } catch (error) {
            // disable loading state
            setIsLoading(false);;

            console.log("Caught Error: ", error.message);
            setToast({
                text: error.message,
                visible: true,
                type: "error",
            });
        }
    }

    // additional input
    const [additionalInput, setAdditionalInput] = useState(preloaded_data?.additional_policy || "");
    
    // error state for remit period input
    const [errorAdditionalInput, setErrorAdditionalInput] = useState(false);

    // update additional input function, triggered onnchange in Input component
    const updateAdditionalInput = (text) => {
        setAdditionalInput(text);
    }

    // update additional policy
    const handleUpdateAdditionalPolicy = async () => {
        try {
            // dismiss keyborad
            Keyboard.dismiss();

            // indicate loading state in button
            setIsLoading(true);
    
            // business ref
            const businessPoliciesRef = doc(database, "business_policies", business_id);
            
            if (policiesExist) {
                // save data in business_policies collection
                await updateDoc(businessPoliciesRef, {
                    additional_policy: additionalInput,
                    editedAt: serverTimestamp(),
                });
            } else {
                // save data in business_policies collection
                await setDoc(businessPoliciesRef, {
                    additional_policy: additionalInput,
                    createdAt: serverTimestamp(),
                });

                // acknowledge policy exist
                setPoliciesExist(true);
            }

            // update local db
            await handleBusinessPolicies.createBusinessPolicy(
                db, 
                {
                    additional_policy: additionalInput,
                    id: business_id,
                }
            )

            // update local state
            setAdditionalPolicy(additionalInput);

            // close bottomsheet
            closeModal();

            // disable loading state
            setIsLoading(false);
            
        } catch (error) {
            // disable loading state
            setIsLoading(false);;

            console.log("Caught Error: ", error.message);
            setToast({
                text: error.message,
                visible: true,
                type: "error",
            });
        }
    }

    // fetch business policies
    useEffect(() => {

        // function to set states related to failed delivery
        const handleFailedDeliveryData = (fetchedData) => {
            const data = fetchedData ? fetchedData : "";
            // set states
            setFailedDeliveryInput(data);
            setFailedDeliveryPolicy(data);
            // return data
            return fetchedData;
        }

        // function to set states related to additional policies
        const handleAdditionalPolicyData = (fetchedData) => {
            const data = fetchedData ? fetchedData : "";
            // set states
            setAdditionalInput(data);
            setAdditionalPolicy(data);
            // return data
            return fetchedData;
        }

        // function to set states related to inactive inventory policy
        const handleInactiveInventoryData = (fetchedData) => {
            const data = fetchedData ? fetchedData : "";
            // set states
            setInactiveInventoryInput(data);
            setInactiveInventoryPolicy(data);
            // return data
            return fetchedData;
        }

        // function to set states related to Remittance policy
        const handleRemittanceData = (fetchedData) => {
            const data = fetchedData ? fetchedData : "";
            // set states
            setRemittanceInput(data);
            setRemittancePolicy(data);
            // return data
            return fetchedData;
        }
        
        // fetch business policies
        const fetchBusinessPolicies = async (id) => {
            try {
                const docRef = doc(database, 'business_policies', id);
                const policies = await getDoc(docRef);

                // date
                const policiesData = policies?.data();

                // handle failed deliveries policy
                handleFailedDeliveryData(
                    policiesData?.failed_delivery_percentage
                );

                // handle additional policy
                handleAdditionalPolicyData(
                    policiesData?.additional_policy
                );
                
                // handle additional policy
                handleInactiveInventoryData(
                    policiesData?.max_inactive_inventory
                );
                
                // handle remittance policy
                handleRemittanceData(
                    policiesData?.max_remittance_duration
                );

                setPoliciesExist(() => {
                    return policiesData; 
                });

                // send data to local db if data is available
                if (policiesData) {
                    await handleBusinessPolicies.createBusinessPolicy(
                        db, 
                        {...policiesData, id: policies.id}
                    )
                }

                
            } catch (error) {
                console.log("Caught Error: ", error.message);
                setToast({
                    text: error.message,
                    visible: true,
                    type: "error",
                });

            } finally {
                // update page loading state
                setPageLoading(false);
            }
        }

        fetchBusinessPolicies(business_id);
    }, [])

    // policies
    const policies = [
        {
            name: "Delivery",
            policyList: [
                {
                    id: 1,
                    policyText: 'Remittance Period: 24hrs after delivery',
                    icon: <RemittanceIcon />,
                },
                {
                    id: 2,
                    policyText: 'Cost for failed delivery: 50% of Delivery Charges',
                    icon: <FailedDeliveryIcon />,
                }
            ]  
        },
        {
            name: "Inventory",
            policyList: [
                {
                    id: 1,
                    policyText: 'Maximun Inactive Inventory Period: 30 Days',
                    icon: <InactiveInventoryIcon />,
                },
            ]  
        },
        {
            name: "Additional Policy",
            policyList: [
                {
                    id: 1,
                    policyText: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.' + 
                    'Atque, voluptatibus necessitatibus exercitationem aut consectetur odio nemo praesentium!',
                    icon: false,
                },
            ]  
        },
    ];

    // render business policy screen
    return (<>
        {!pageLoading ? <>
            <ScrollView style={style.container} showsHorizontalScrollIndicator={false}>
                <View style={style.main}>
                    <Header 
                        stackName={'Business Policy'}
                        navigation={navigation}
                        unpadded={true}
                    />
                    {/* if account is a Merchant render a readonly business policy */}
                    {authData.account_type === "Merchant" && (<>
                        <Text style={style.paragraph}>
                            Get to understand how we operate in order to serve you better
                        </Text>
                        <View style={style.policyContainer}>
                            {/* show list of logistics policies */}
                            { policies.map((policy) => (
                                <View key={policy.name} style={style.policyWrapper}>
                                    <Text style={style.policyTitle}>
                                        {policy.name}
                                    </Text>
                                    {policy.policyList.map((policyItem) => (
                                        <View key={policyItem.id} style={style.policyContent}>
                                            {policyItem.icon && policyItem.icon}
                                            <Text style={style.policyText}>{policyItem.policyText}</Text>
                                        </View>
                                    ))}
                                </View>
                            ))}
                        </View>
                    </>)}
                    {/* if account is a logistics render a reable business policy screen */}
                    {authData.account_type === "Logistics" && (<>
                        <View style={style.mainWrapper}>
                            <Text style={style.paragraph}>Let your clients know how you operate</Text>
                            <View style={style.policyGroup}>
                                <Text style={style.groupHeading}>Delivery</Text>
                                <View style={style.policyButtonGroup}>

                                    {/* button to open remittance policy bottom sheet */}
                                    <TouchableOpacity 
                                        style={style.policyButton}
                                        disabled={!authData?.admin}
                                        onPress={() => openModal("Remittance")}
                                    >
                                        <View style={style.policyButtonContent}>
                                            <RemittanceLargeIcon />
                                            <View style={style.policyButtonTextWrapper}>
                                                <Text style={style.policyButtonHeading}>Remittance</Text>
                                                <Text style={style.policyButtonParagraph}>
                                                    { remittancePolicy && <>
                                                        {remittancePolicy}hrs after delivery
                                                    </>}
                                                    { !remittancePolicy && <>
                                                        How long will it take before your send funds to the merchant
                                                    </>}
                                                </Text>
                                            </View>
                                        </View>
                                        <RightArrowIcon />
                                    </TouchableOpacity>

                                    {/* button to failed delivery policy bottom sheet */}
                                    <TouchableOpacity 
                                        style={style.policyButton}
                                        disabled={!authData?.admin}
                                        onPress={() => openModal("Cost for failed delivery")}
                                    >
                                        <View style={style.policyButtonContent}>
                                            <FailedDeliveryLargeIcon />
                                            <View style={style.policyButtonTextWrapper}>
                                                <Text style={style.policyButtonHeading}>Cost for failed delivery</Text>
                                                <Text style={style.policyButtonParagraph}>
                                                    { failedDeliveryPolicy && <>
                                                        {failedDeliveryPolicy}% of delivery charges
                                                    </>}
                                                    { !failedDeliveryPolicy && <>
                                                        How will the percentage of a failed delivery be shared
                                                    </>}
                                                </Text>
                                            </View>
                                        </View>
                                        <RightArrowIcon />
                                    </TouchableOpacity>
                                
                                </View>
                            </View>
                            <View style={style.policyGroup}>
                                <Text style={style.groupHeading}>Inventory</Text>
                                <View style={style.policyButtonGroup}>

                                    {/* button to open inactive inventory policy bottom sheet */}
                                    <TouchableOpacity 
                                        style={style.policyButton}
                                        disabled={!authData?.admin}
                                        onPress={() => openModal("Inactive Inventory")}
                                    >
                                        <View style={style.policyButtonContent}>
                                            <InactiveInventoryLargeIcon />
                                            <View style={style.policyButtonTextWrapper}>
                                                <Text style={style.policyButtonHeading}>Inactive Inventory</Text>
                                                <Text style={style.policyButtonParagraph}>
                                                {inactiveInventoryPolicy && <>
                                                    {inactiveInventoryPolicy}months of warehousing inactive products
                                                </>}
                                                {!inactiveInventoryPolicy && <>
                                                    How long will it take before your send funds to the merchant
                                                </>}
                                            </Text>
                                            </View>
                                        </View>
                                        <RightArrowIcon />
                                    </TouchableOpacity>

                                </View>
                            </View>
                            <View style={style.policyGroup}>
                                <View style={style.policyGroupHeader}>
                                    <Text style={style.groupHeading}>Additional policy</Text>
                                    {/* edit aditional policy button, only visible if there's a policy present to be edited */}
                                    {additionalPolicy && (
                                        <TouchableOpacity 
                                            style={style.buttonLink}
                                            disabled={!authData?.admin}
                                            onPress={() => {
                                                const enableEdit = true;
                                                openModal("Additional Policy", enableEdit)
                                            }}
                                        >
                                            <Text style={style.linkText}>Edit</Text>
                                        </TouchableOpacity>
                                    )}
                                </View>
                                {/* additional policy button, only visible if no additional policy has been added */}
                                {!additionalPolicy && (
                                    <TouchableOpacity 
                                        style={style.buttonLink}
                                        disabled={!authData?.admin}
                                        onPress={() => openModal("Additional Policy")}
                                    >
                                        <Text style={style.linkText}>+ Add Policy</Text>
                                    </TouchableOpacity>
                                )}
                                {additionalPolicy && (
                                    <Text style={style.additionalPolicyText}>
                                        {additionalPolicy}
                                    </Text>
                                )}
                            </View>
                        </View>
                    </>)}
                </View>
            </ScrollView>
        </> : <BusinessPolicySkeleton />}
        <CustomBottomSheet
            index={0}
            sheetRef={sheetRef}
            closeModal={closeModal}
            snapPointsArray={sheetParameters.snapPointsArray}
            sheetTitle={sheetParameters.sheetTitle}
        >
            {/* modal content for Remittance policy */}
            {sheetParameters.sheetTitle === "Remittance" && <>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={style.modalWrapper}>
                        <View style={style.modalContent}>
                            <Text style={[style.paragraph, style.modalParagraph]}>
                                Let your customers know how long it will take for funds to be sent after each successful delivery.
                            </Text>
                            <Input 
                                label={"Remittance period (Hrs)"}
                                keyboardType={"numeric"}
                                placeholder={"24"}
                                value={remittanceInput}
                                onChange={updateRemittanceInput}
                                error={errorRemittanceInput}
                                setError={setErrorRemittanceInput}
                            />
                            <Text style={style.modalFooterText}>
                                This will be the minimum time in hours it will take for disbursement of funds
                            </Text>
                        </View>
                        <CustomButton
                            isLoading={isLoading}
                            name={"Save"}
                            shrinkWrapper={true}
                            onPress={handleUpdateRemittancePolicy}
                            unpadded={true}
                            inactive={remittanceInput === remittancePolicy}
                        />
                    </View>
                </TouchableWithoutFeedback>
            </>}
            {/* Modal content for cost of failed delivery */}
            {sheetParameters.sheetTitle === "Cost for failed delivery" && <>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={style.modalWrapper}>
                        <View style={style.modalContent}>
                            <Text style={[style.paragraph, style.modalParagraph]}>
                                Let your customers know how the cost for failed deliveries would be shared.
                            </Text>
                            <Input 
                                label={"Failed delivery charge rate (%)"}
                                keyboardType={"numeric"}
                                placeholder={"50"}
                                value={failedDeliveryInput}
                                onChange={updateFailedDeliveryInput}
                                error={errorFailedDeliveryInput}
                                setError={setErrorFailedDeliveryInput}
                            />
                            <Text style={style.modalFooterText}>
                                This will be the rate you charge Merchants for failed deliveries
                            </Text>
                        </View>
                        <CustomButton
                            isLoading={isLoading}
                            name={"Save"}
                            shrinkWrapper={true}
                            onPress={handleUpdateFailedDeliveryPolicy}
                            unpadded={true}
                            inactive={failedDeliveryInput === failedDeliveryPolicy}
                        />
                    </View>
                </TouchableWithoutFeedback>
            </>}
            {/* Modal content for Incative Inventory */}
            {sheetParameters.sheetTitle === "Inactive Inventory" && <>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={style.modalWrapper}>
                        <View style={style.modalContent}>
                            <Text style={[style.paragraph, style.modalParagraph]}>
                                Let your customers know how long their products can be incative in your warehouse.
                            </Text>
                            <Input 
                                label={"Inative inventory period (months)"}
                                keyboardType={"numeric"}
                                placeholder={"3"}
                                value={inactiveInventoryInput}
                                onChange={updateInactiveInventoryInput}
                                error={errorInactiveInventoryInput}
                                setError={setErrorInactiveInventoryInput}
                            />
                            <Text style={style.modalFooterText}>
                                This will be the the maximum time a product can spend in your warehouse without being delivered
                            </Text>
                        </View>
                        <CustomButton
                            isLoading={isLoading}
                            name={"Save"}
                            shrinkWrapper={true}
                            onPress={handleUpdateInactiveInventoryPolicy}
                            unpadded={true}
                            inactive={inactiveInventoryInput === inactiveInventoryPolicy}
                        />
                    </View>
                </TouchableWithoutFeedback>
            </>}
            {/* Modal content for additional policy */}
            {sheetParameters.sheetTitle === "Additional Policy" && <>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={style.modalWrapper}>
                        <View style={style.modalContent}>
                            <Text style={[style.paragraph, style.modalParagraph]}>
                                Any other policy? Write it down
                            </Text>
                            <Input 
                                label={"Details"}
                                placeholder={"Leave a note for your merchants on your policy"}
                                multiline={true}
                                height={100}
                                textAlign={"top"}
                                value={additionalInput}
                                onChange={updateAdditionalInput}
                                error={errorAdditionalInput}
                                setError={setErrorAdditionalInput}
                            />
                        </View>
                        <CustomButton
                            isLoading={isLoading}
                            name={"Save"}
                            shrinkWrapper={true}
                            onPress={handleUpdateAdditionalPolicy}
                            unpadded={true}
                            inactive={additionalInput === additionalPolicy}
                        />
                    </View>
                </TouchableWithoutFeedback>
            </>}
        </CustomBottomSheet>
    </>);
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: background,
        padding: 20,
        paddingTop: 0,
        minHeight: "100%",
    },
    main: {
        display: 'flex',
        width: '100%',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        marginBottom: 20,
    },
    paragraph: {
        marginTop: 8,
        fontSize: 12,
        fontFamily: 'mulish-medium',
        color: bodyText,
    },
    policyContainer: {
        display: 'flex',
        width: '100%',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        gap: 20,
        paddingVertical: 20,
    },
    policyWrapper: {
        display: 'flex',
        width: '100%',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        gap: 12,
        padding: 20,
        backgroundColor: white,
        borderRadius: 12,
    },
    policyTitle: {
        fontFamily: "mulish-semibold",
        fontSize: 14,
        color: black,
    },
    policyContent: {
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 12,
    },
    policyText: {
        fontSize: 12,
        fontFamily: 'mulish-medium',
        color: bodyText,
        lineHeight: 18,
    },

    mainWrapper: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        width: '100%',
        gap: 32,
    },
    policyGroup: {
        width: "100%",
    },
    policyGroupHeader: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        width: '100%',
    },
    groupHeading: {
        fontFamily: 'mulish-semibold',
        fontSize: 14,
        color: black,
        marginBottom: 10,
    },
    policyButtonGroup: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        width: '100%',
        gap: 12,      
    },
    policyButton: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        width: '100%',
        paddingVertical: 6,
        borderBottomColor: listSeparator2,
        borderBottomWidth: 1,
    },
    policyButtonContent: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        gap: 12,
    },
    policyButtonTextWrapper: {
        display: 'flex',
        gap: 4,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        maxWidth: 168,
    },
    policyButtonHeading: {
        color: bodyText,
        fontSize: 12,
        fontFamily: 'mulish-medium',
        lineHeight: 18,
    },
    policyButtonParagraph: {
        color: subText,
        fontSize: 10,
        fontFamily: 'mulish-medium',
        lineHeight: 15,
    },
    linkText: {
        color: primaryColor,
        fontSize: 12,
        fontFamily: "mulish-semibold",
        textDecorationColor: primaryColor,
        textDecorationLine: 'underline',
    },
    additionalPolicyText: {
        width: "100%",
        backgroundColor: white,
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 12,
        fontFamily: "mulish-regular",
        color: bodyText,
        fontSize: 12,
    },


    // bottomsheet modal
    modalWrapper: {
        width: "100%",
        height: "100%",
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: "center",
        flexDirection: 'column',
    },
    modalParagraph: {
        textAlign: 'center', 
        maxWidth: 280,
        marginBottom: 20,
    },
    modalContent: {
        width: "100%",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 12,
    },
    modalFooterText: {
        fontSize: 10,
        fontFamily: 'mulish-regular',
        color: subText,
        width: "100%",
    }
})
 
export default BusinessPolicy;