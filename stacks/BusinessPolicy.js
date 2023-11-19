// react native components
import {
    ScrollView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Keyboard,
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
//  useAuth
import { useAuth } from "../context/AuthContext";
// globals
import { useGlobals } from "../context/AppContext";
// react hoooks
import { useState, useMemo } from "react";
import { windowHeight } from "../utils/helpers";

const BusinessPolicy = ({navigation}) => {

    // useAuth
    const { authData } = useAuth();

    // bottomsheet varaibels
    const { bottomSheetRef } = useGlobals();

    // const indicate lodaing state for buttons
    const [isLoading, setIsLoading] = useState(false);

    // remittance policy
    const [remittancePolicy, setRemittancePolicy] = useState("");

    // failed delivery policy
    const [failedDeliveryPolicy, setFailedDeliveryPolicy] = useState("");

    // inactive inventory policy
    const [inactiveInventoryPolicy, setInactiveInventoryPolicy] = useState("");

    // additional policy
    const [additionalPolicy, setAdditionalPolicy] = useState("");

    // remittance input
    const [remittanceInput, setRemittanceInput] = useState("");
    
    // error state for remit period input
    const [errorRemittanceInput, setErrorRemittanceInput] = useState("");


    // update remittance input function, triggered onnchange in Input component
    const updateRemittanceInput = (text) => {
        setRemittanceInput(text);
    }

    // update remittance policy
    const handleUpdateRemittancePolicy = () => {
        // indicate loading state i button
        setIsLoading(true);

        // dismiss keyborad
        Keyboard.dismiss()

        setTimeout(() => {
            setRemittancePolicy(remittanceInput);

            setRemittanceInput("");
            closeModal();
            setIsLoading(false)
        }, 2000);
    }

    // failedDelivery input
    const [failedDeliveryInput, setFailedDeliveryInput] = useState("");
    
    // error state for remit period input
    const [errorFailedDeliveryInput, setErrorFailedDeliveryInput] = useState("");

    // update failedDelivery input function, triggered onnchange in Input component
    const updateFailedDeliveryInput = (text) => {
        setFailedDeliveryInput(text);
    }

    // update failedDelivery policy
    const handleUpdateFailedDeliveryPolicy = () => {
        // indicate loading state i button
        setIsLoading(true);

        // dismiss keyborad
        Keyboard.dismiss();

        setTimeout(() => {
            setFailedDeliveryPolicy(failedDeliveryInput);

            setFailedDeliveryInput("");
            closeModal();
            setIsLoading(false)
        }, 2000);
    }

    // inactiveInventory input
    const [inactiveInventoryInput, setInactiveInventoryInput] = useState("");
    
    // error state for remit period input
    const [errorInactiveInventoryInput, setErrorInactiveInventoryInput] = useState("");

    // update inactiveInventory input function, triggered onnchange in Input component
    const updateInactiveInventoryInput = (text) => {
        setInactiveInventoryInput(text);
    }

    // update inactiveInventory policy
    const handleUpdateInactiveInventoryPolicy = () => {
        // indicate loading state i button
        setIsLoading(true);

        // dismiss keyborad
        Keyboard.dismiss();

        setTimeout(() => {
            setInactiveInventoryPolicy(inactiveInventoryInput);

            setInactiveInventoryInput("");
            closeModal();
            setIsLoading(false)
        }, 2000);
    }

    // additional input
    const [additionalInput, setAdditionalInput] = useState("");
    
    // error state for remit period input
    const [errorAdditionalInput, setErrorAdditionalInput] = useState("");

    // update additional input function, triggered onnchange in Input component
    const updateAdditionalInput = (text) => {
        setAdditionalInput(text);
    }

    // update additional policy
    const handleUpdateAdditionalPolicy = () => {
        // indicate loading state i button
        setIsLoading(true);

        // dismiss keyborad
        Keyboard.dismiss();

        setTimeout(() => {
            setAdditionalPolicy(additionalInput);

            setAdditionalInput("");
            closeModal();
            setIsLoading(false)
        }, 2000);
    }

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

    // modal type
    const [modalType, setModalType] = useState("Remittance");

    // const bottomSheetParameters = useMemo(() => {
    //     switch (modalType) {
    //         case "Remittance":
                
    //             break;
        
    //         default:
    //             break;
    //     }
    // }, [modalType]);

    // open bottomsheet modal function
    const openModal = (type, enableEdit)  => {
        if (enableEdit && type === "Additional Policy") {
            setAdditionalInput(additionalPolicy);
        }
        setModalType(type);
        bottomSheetRef.current?.present();
    }

    // close bottomsheet modal function
    const closeModal = () => {
        bottomSheetRef.current?.close();
    }

    // console.log(additionalPolicy);

    return (
        <>
            <ScrollView style={style.container} showsHorizontalScrollIndicator={false}>
                <View style={style.main}>
                    <Header 
                        stackName={'Business Policy'}
                        navigation={navigation}
                        unpadded={true}
                    />
                    {authData.account_type === "Merchant" && (<>
                        <Text style={style.paragraph}>
                            Get to understand how we operate in order to serve you better
                        </Text>
                        <View style={style.policyContainer}>
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
                    {authData.account_type === "Logistics" && (<>
                        <View style={style.mainWrapper}>
                            <Text style={style.paragraph}>Let your clients know how you operate</Text>
                            <View style={style.policyGroup}>
                                <Text style={style.groupHeading}>Delivery</Text>
                                <View style={style.policyButtonGroup}>

                                    <TouchableOpacity 
                                        style={style.policyButton}
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

                                    <TouchableOpacity 
                                        style={style.policyButton}
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
                                                        How will the percentage of a failed delivery bes shared
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

                                    <TouchableOpacity 
                                        style={style.policyButton}
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
                                    {additionalPolicy && (
                                        <TouchableOpacity 
                                            style={style.buttonLink}
                                            onPress={() => {
                                                const enableEdit = true;
                                                openModal("Additional Policy", enableEdit)
                                            }}
                                        >
                                            <Text style={style.linkText}>Edit</Text>
                                        </TouchableOpacity>
                                    )}
                                </View>
                                {!additionalPolicy && (
                                    <TouchableOpacity 
                                        style={style.buttonLink}
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
            <CustomBottomSheet
                bottomSheetModalRef={bottomSheetRef}
                sheetTitle={modalType}
                autoSnapAt={0}
                snapPointsArray={[windowHeight * 0.6]}
            >
                
                {/* modal content for Remittance policy */}
                {modalType === "Remittance" && <>
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
                            />
                        </View>
                    </TouchableWithoutFeedback>
                </>}
                {/* Modal content for cost of failed delivery */}
                {modalType === "Cost for failed delivery" && <>
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
                            />
                        </View>
                    </TouchableWithoutFeedback>
                </>}
                {/* Modal content for Incative Inventory */}
                {modalType === "Inactive Inventory" && <>
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
                            />
                        </View>
                    </TouchableWithoutFeedback>
                </>}
                {/* Modal content for additional policy */}
                {modalType === "Additional Policy" && <>
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
                            />
                        </View>
                    </TouchableWithoutFeedback>
                </>}
            </CustomBottomSheet>
        </>
    );
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