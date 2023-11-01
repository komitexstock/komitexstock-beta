// react native components
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableWithoutFeedback,
    Keyboard,
} from "react-native";
// react hooks
import { useState, useEffect, useLayoutEffect, useMemo } from "react";
// components
import Header from "../components/Header";
import CustomBottomSheet from "../components/CustomBottomSheet";
import CustomButton from "../components/CustomButton";
import Input from "../components/Input";
import SelectInput from "../components/SelectInput";
import Indicator from "../components/Indicator";
import PopUpBottomSheet from "../components/PopUpBottomSheet";
import Avatar from "../components/Avatar";
import SelectRolePopUpContent from "../components/SelectRolePopUpContent";
import TeamMemberCard from "../components/TeamMemberCard";
import SuccessPrompt from "../components/SuccessPrompt";
import CautionPrompt from "../components/CautionPrompt";
import SuccessSheet from "../components/SuccessSheet";
import Toast from "../components/Toast";
// colors
import { background, black, bodyText, white } from "../style/colors";
// bottomsheet components
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
// skeleton screen
import TeamMembersSkeleton from "../skeletons/TeamMembersSkeleton";
// utils
import { windowHeight } from "../utils/helpers";
// globals
import { useGlobals } from "../context/AppContext";
// useAuth
import { useAuth } from "../context/AuthContext";
// member functions
import { getTeamMembers } from "../database/common/teamMembers";
// firebase
import { database, functions, auth } from "../Firebase";
// firestore functions
import {
    doc,
    setDoc,
    onSnapshot,
    collection,
    where,
    query,
} from "firebase/firestore";
// firebase authentication
import { createUserWithEmailAndPassword } from "firebase/auth";
// firebase functions
import { httpsCallable } from "firebase/functions";

const TeamMembers = ({ navigation }) => {

    // auth data
    const { authData } = useAuth();

    // page loading state
    const [pageLoading, setPageLoading] = useState(true);

    // button loading state
    const [isLoading, setIsLoading] = useState(false);
    // reset data
    // let resetData = 0; 

    // bottoms sheef refs
    const { bottomSheetRef, successSheetRef, popUpSheetRef, popUpSheetOpen, setToast } = useGlobals();

    // state to store members array
    const [members, setMembers] = useState([]);
    
    // selected member id
    const [selectedId, setSelectedId] = useState(null);

    // selected member
    const selectedMember = useMemo(() => {
        return members.find((member) => member?.id === selectedId);
    }, [selectedId]);


    // console.log(members);

    // state to control modal type
    const [modal, setModal] = useState("");

    // state to control popUp type
    const [popUp, setPopUp] = useState({
        type: "",
        title: "",
        snapPoints: ["45%"],
        centered: false,
        closeModal: closePopUpModal,
        popUpVisible: false,
    });

    // state to prompt user to confirm deactivation
    const [roleInputActive, setRoleInputActive] = useState(false);

    // bottomsheet snap points
    const [bottomSheetSnapPoints, setBottomSheetSnapPoints] = useState(["60%"]);

    // function to close modal
    const closeModal = () => {
        bottomSheetRef.current?.close();

        setSelectedId(null);
    };

    // function to open bottom sheet modal
    const openModal = (type, id) => {
        bottomSheetRef.current?.present();
        setModal(type);

        console.log("ID: ", id);
        console.log("Type: ", type);
        
        if (type === "Edit") {
            console.log(type);
            setBottomSheetSnapPoints(["60%"])
            // const chosenMember = ;
            setSelectedId(id);
        } else {
            setBottomSheetSnapPoints([0.7 * windowHeight])
        }
    }

    // function to know if member can be deactivated
    const handleCantDeactivate = useMemo(() => {
        if (selectedId === null) return true;
        const member = members?.find((member) => member?.id === selectedId);
        if (authData?.uid === member.id) return true;
        if (member.admin) return true;
        return false;
    }, [selectedId])

    let membersList = [];

    // get team members
    useLayoutEffect(() => {
        // fetch team members data
        const fetchTeamMembers = async (business_id) => {
            try {
                const collectionRef = collection(database, "users");
                let q = query(collectionRef, where("business_id", "==", business_id));
            
                const unsubscribe = onSnapshot(q, (querySnapshot) => {
                    let members = [];
                    querySnapshot.forEach((doc) => {
                        const member = {
                            id: doc.id,
                            admin: doc.data().admin,
                            email: doc.data().email,
                            deactivated: doc.data().deactivated,
                            full_name: doc.data().full_name,
                            profile_image: doc.data().profile_image,
                            role: doc.data().role,
                        };
                        members.push(member);
                    });
                    // console.log("Members: ", members);
                    const adjustedArray = [
                        // add openModal function to each member card
                        ...members.map((member) => {
                            return {
                                id: member.id,
                                admin: member.admin,
                                email: member.email,
                                deactivated: member.deactivated,
                                full_name: member.full_name,
                                profile_image: member.profile_image,
                                role: member.role,
                                onPress: () => openModal("Edit", member.id),
                            }
                        }),
                        { //add new member card 
                            id: "addNew",
                            add_new: true,
                            onPress: () => openModal("Add"),
                        }
                    ];
                    setMembers(adjustedArray);
                });
                if (members.length <= 1) {
                    setPageLoading(false);
                }
                return unsubscribe;
            } catch (error) {
                console.log("Error: ", error.message);
                return [];
            }
        };
    
        // fetch team members data
        fetchTeamMembers(authData?.business_id);
    }, []);


    // function to close Popup modal
    const closePopUpModal = () => {
        popUpSheetRef.current?.close();
        setRoleInputActive(false);
    };

    // function to close all bottomsheet moda;
    const closeAllModal = () => {
        closeModal();
        closePopUpModal();
        closeSuccessModal();
        // reset all inputs
        setFullName("");
        setWorkEmail("");
        setRole("");
    }

    // function to open bottom sheet popup
    const openPopUpModal = (type) => {
        setForceBlur(true);
        popUpSheetRef.current?.present();
        setRoleInputActive(true);
        setPopUp({
            type: type,
        });
    }

    // succes modal state
    const [successModal, setSuccessModal] = useState({
        heading: '',
        height: 320,
        paragragh: <></>,
        caution: false,
        primaryFunction: () => {},
        primaryButtonText: '',
        secondaryFunction: () => {},
        secondaryButtonText: '',
    })

    // function to open success modal
    const openSuccessModal = (type) => {
        successSheetRef.current?.present();

        switch (type) {
            case "Deactivate":
                setSuccessModal({
                    heading: 'Deactivte User',
                    height: 381,
                    paragragh: <>
                        Are you sure you want to deactivate 
                        <Text style={style.boldText}> Felix Jones</Text>
                    </>,
                    caution: true,
                    primaryFunction: () => openSuccessModal("Confirmed"),
                    primaryButtonText: 'Yes, deactivate',
                    secondaryFunction: closeSuccessModal,
                    secondaryButtonText: 'No, cancel',
                })
                break;
        
            case "Confirmed":
                setSuccessModal({
                    heading: 'Felix Jones Succesfully Deactivated',
                    height: 320,
                    paragragh: <>
                        You have successfully deactivated 
                        <Text style={style.boldText}> Felix Jones</Text>
                    </>,
                    primaryFunction: closeAllModal,
                })
                break;

            case "UpdateSuccess":
                setSuccessModal({
                    heading: 'Role Updated Succesfully',
                    height: 320,
                    paragragh: <>
                        You have successfully updated Felix Johnson role to a
                        <Text style={style.boldText}> {editRole}</Text>
                    </>,
                    primaryFunction: closeAllModal,
                })
                break;

            case "AddSuccess":
                setSuccessModal({
                    heading: <>{fullName} Succesfully Added</>,
                    height: 320,
                    paragragh: <>
                        Hi {authData?.full_name}, you have successfully added   
                        <Text style={style.boldText}> {fullName} </Text>
                        to your team
                    </>,
                    primaryFunction: closeAllModal,
                })
                break;
        
            default:
                break;
        }
    }

    // function to close success modal
    const closeSuccessModal = () => {
        successSheetRef.current?.close();
    }

    // set role select button as inactive if back button is pressed and role modal is opened
    useEffect(() => {
        if (!popUpSheetOpen) {
            setRoleInputActive(false);
        }
    }, [popUpSheetOpen])

    // state to store first name input value
    const [fullName, setFullName] = useState("");

    // state to store error in first name input value
    const [errorFirstName, setErrorFirstName] = useState(false);

    // function to update first name
    const updateFirstName = (text) => {
        setFullName(text);
    }

    // state to store work email input value
    const [workEmail, setWorkEmail] = useState("");

    // state to store error in work email input value
    const [errorWorkEmail, setErrorWorkEmail] = useState(false);

    // const state to force all to be input out of focus when popup modal is clicked
    const [forceBlur, setForceBlur] = useState(false);

    // function to update work email
    const updateWorkEmail = (text) => {
        setWorkEmail(text);
    }

    // state to store role select input value
    const [role, setRole] = useState("");

    // function to save selected role for new team member
    const hanldeRoleSelect = (text) => {
        setRole(text);
        closePopUpModal();
    }

    // function to save updated role for existing team member
    const hanldeRoleUpdate = (text) => {
        setEditRole(text);
        closePopUpModal();
    }
    
    // state to store role select input value
    const [editRole, setEditRole] = useState("");
    
    // member inputs
    const newMemberInputs = [
        {
            id: 1,
            placeholder: "First Name",
            label: "First Name",
            value: fullName,
            forceBlur: forceBlur,
            onChange: updateFirstName,
            error: errorFirstName,
            setError: setErrorFirstName
        },
        {
            id: 2,
            placeholder: "Work Email",
            label: "Email address",
            value: workEmail,
            forceBlur: forceBlur,
            onChange: updateWorkEmail,
            error: errorWorkEmail,
            setError: setErrorWorkEmail
        },
    ];

    // check for empty fields
    const emptyFields = [
        fullName, 
        workEmail,
        role
        ].some(
            (item) => item === null || item === ''
    );

    // function to update role
    const handleUpdateRole = () => {
        openSuccessModal("UpdateSuccess");
    }

    // function to confirm deactivation
    const handleDeactivateUser = () => {
        openSuccessModal("Deactivate");
    }

    const defaultPassword = "komitex1234";

    // function to add new team member
    const handleAddNewMember = async () => {
        setIsLoading(true);
        try {
            // sign up user
            const authResponse = await createUserWithEmailAndPassword(auth, workEmail, defaultPassword);

            // get setRole cloud functions
            const setRole = httpsCallable(functions, "setRole");
            
            // setRole
            await setRole({ 
                email: workEmail, 
                admin: false, 
                role: role, 
                account_type: authData?.account_type,
            });
            
            // ref to users collection
            const usersRef = doc(database, "users", authResponse.user.uid);
            
            // save data in database
            await setDoc(usersRef, {
                business_id: authData?.business_id,
                email: workEmail,
                deactivated: false,
                face_id: false,
                fingerprint: false,
                full_name: fullName,
                notification: false,
                profile_image: null,
                phone: null,
                role: role,
                admin: false,
            });
            setIsLoading(false);
            openSuccessModal("AddSuccess");
        } catch (error) {
            console.log("Error: ", error.message);
            setToast({
                visible: true,
                type: "error",
                text: error.message,
            });
            setIsLoading(false);
        }
    }


    // render TeamMember page
    return (
        <>
            {!pageLoading ? (
                <FlatList 
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={
                        <View style={style.headerWrapper}>
                            <Header 
                                navigation={navigation} 
                                stackName={"Team Members"} 
                                iconFunction={null} 
                                icon={null}
                                unpadded={true}
                            />
                        </View>
                    }
                    columnWrapperStyle={style.listContainer}
                    style={style.listWrapper}
                    keyExtractor={item => item.id}
                    data={members}
                    numColumns={2}
                    renderItem={({ item }) => (
                        <TeamMemberCard
                            imageUrl={item?.profile_image}
                            admin={item?.admin}
                            fullname={item?.full_name}
                            role={item?.role}
                            onPress={item?.onPress}
                            addNew={item?.add_new}
                            deactivated={item?.deactivated}
                        />
                    )}
                />
            ) : <TeamMembersSkeleton />}
            {/* custom bottomsheet */}
            <CustomBottomSheet
                bottomSheetModalRef={bottomSheetRef}
                closeModal={closeModal}
                snapPointsArray={bottomSheetSnapPoints}
                autoSnapAt={0}
                sheetTitle={modal === "Add" ? "Add New Team Memner" : ""}
                sheetSubtitle={""}
            >    
                {/* Add new member modal content */}
                {modal === "Add" && (
                    <>
                        <BottomSheetScrollView contentContainerStyle={style.modalWrapper}>
                            <TouchableWithoutFeedback
                                onPress={() => Keyboard.dismiss()}
                            >
                                <View style={style.modalContent}>
                                    <Text style={style.modalText}>We will email your team member an invite</Text>
                                    {newMemberInputs.map(input => (
                                        <Input
                                            key={input.id}
                                            placeholder={input.placeholder}
                                            label={input.label}
                                            value={input.value}
                                            forceBlur={input.forceBlur}
                                            onChange={input.onChange}
                                            error={input.error}
                                            setError={input.setError}
                                        />
                                    ))}
                                    <SelectInput 
                                        label={"Role"}
                                        placeholder={"Role"}
                                        onPress={() => openPopUpModal("Add")}
                                        value={role}
                                        active={roleInputActive}
                                        inputFor={"String"}
                                    />
                                </View>
                            </TouchableWithoutFeedback>
                        </BottomSheetScrollView>
                        <CustomButton
                            name={"Add New Team Member"}
                            shrinkWrapper={true}
                            onPress={handleAddNewMember}
                            inactive={emptyFields}
                            unpadded={true}
                            isLoading={isLoading}
                        />
                    </>
                )}

                {/* edit existing member role modal content */}
                {modal === "Edit" && (
                    <View style={style.modalWrapper}>
                        <View style={style.modalContainer}>
                            <View style={style.infoWrapper}>
                                <Avatar 
                                    fullname={selectedMember?.full_name}
                                    imageUrl={selectedMember?.profile_image}
                                />
                                <Indicator
                                    type={"Dispatched"}
                                    text={selectedMember?.role}
                                />
                            </View>
                            <Text style={style.modalFullnameText}>{selectedMember?.full_name}</Text>
                            <Text style={style.modalEmailText}>{selectedMember?.email}</Text>
                            <SelectInput 
                                label={"Role"}
                                placeholder={"Role"}
                                onPress={() => openPopUpModal("Edit")}
                                value={!editRole ? selectedMember?.role : editRole}
                                active={roleInputActive}
                                inputFor={"String"}
                                disabled={handleCantDeactivate}
                            />
                        </View>
                        <View style={style.modalButtonsWrapper}>
                            <CustomButton
                                name={"Update Role"}
                                shrinkWrapper={true}
                                onPress={handleUpdateRole}
                                unpadded={true}
                                inactive={handleCantDeactivate}
                                isLoading={isLoading}
                            />
                            <CustomButton
                                secondaryButton={true}
                                name={"Deactivate User"}
                                shrinkWrapper={true}
                                onPress={handleDeactivateUser}
                                unpadded={true}
                                inactive={handleCantDeactivate}
                                isLoading={isLoading}
                            />
                        </View>
                    </View>
                )}

            </CustomBottomSheet>
            {/* popup bottom sheet */}
            <PopUpBottomSheet
                bottomSheetModalRef={popUpSheetRef}
                closeModal={closePopUpModal}
                snapPointsArray={[250]}
                autoSnapAt={0}
                sheetTitle={"Select Role"}
                hideCloseButton={true}
                centered={true}
            >   
                {/* select role pop up for editing team member role */}
                { popUp.type === "Edit" && 
                    <SelectRolePopUpContent
                        hanldeRoleSelect={hanldeRoleUpdate}
                    />
                }

                {/* select role pop up for adding new team member */}
                { popUp.type === "Add" && 
                    <SelectRolePopUpContent
                        hanldeRoleSelect={hanldeRoleSelect}
                    />
                }
            </PopUpBottomSheet>
            {/* success bottom sheet */}
            {/* success up modal */}
            <SuccessSheet
                successSheetRef={successSheetRef}
                heading={successModal?.heading}
                height={successModal?.height}
                paragraph={successModal?.paragragh}
                caution={successModal?.caution}
                primaryFunction={successModal?.primaryFunction}
                primaryButtonText={successModal?.primaryButtonText}
                secondaryFunction={successModal?.secondaryFunction}
                secondaryButtonText={successModal?.secondaryButtonText}
            />
        </>
    );
}

// stylesheet
const style = StyleSheet.create({
    headerWrapper: {
        paddingBottom: 20,
    },
    listWrapper: {
        width: "100%",
        minHeight: "100%",
        paddingHorizontal: 20,
        backgroundColor: background,
    },
    listContainer: {
        display: "flex",
        flexDirection: "row",
        gap: 16,
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 16,
    },
    addNewLogistics: {
        minWidth: "40%",
        maxWidth: "50%",
        height: 180,
        backgroundColor: white,
        borderRadius: 12,
        flex: 1,
        padding: 12,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "flex-start",
    },
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
        alignItems: 'flex-start',
        gap: 20,
    },
    infoWrapper: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 14,
    },
    modalFullnameText: {
        fontFamily: "mulish-semibold",
        fontSize: 12,
        color: black,
        marginBottom: 4,
    },
    modalEmailText: {
        fontFamily: "mulish-medium",
        fontSize: 10,
        color: bodyText,
        marginBottom: 24,
    },
    modalButtonsWrapper: {
        width: "100%",
        display: "flex",
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        gap: 16,
        background: 'red',
    },
    modalContainer: {
        width: "100%",
        display: "flex",
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    modalText: {
        fontFamily: "mulish-regular",
        fontSize: 12,
        color: bodyText,
        marginBottom: 4,
        textAlign: 'center',
        alignSelf: 'center'
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
    popUpButtonWrapper: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: '100%',
        gap: 16,
    },
    boldText: {
        fontFamily: "mulish-semibold",
    }

})
 
export default TeamMembers;