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
import { useState, useEffect } from "react";
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

const TeamMembers = ({navigation}) => {

    // bottoms sheef refs
    const { bottomSheetRef, popUpSheetRef, popUpSheetOpen } = useGlobals();

    // page loading state
    const [pageLoading, setPageLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setPageLoading(false);
        }, 500);
    })

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
    };

    // function to open bottom sheet modal
    const openModal = (type) => {
        bottomSheetRef.current?.present();
        setModal(type);

        type === "Add" ? setBottomSheetSnapPoints([0.7 * windowHeight]) : setBottomSheetSnapPoints(["60%"]);
    }

    // function to close Popup modal
    const closePopUpModal = () => {
        popUpSheetRef.current?.close();
        setRoleInputActive(false);
    };

    // function to close all bottomsheet moda;
    const closeAllModal = () => {
        closeModal();
        closePopUpModal();
        // reset all inputs
        setFirstName("");
        setLastName("");
        setWorkEmail("");
        setRole("");
    }

    // function to open bottom sheet popup
    const openPopUpModal = (type) => {
        setForceBlur(true);
        popUpSheetRef.current?.present();
        if (type === "Add" || type === "Edit") {
            setRoleInputActive(true);
            setPopUp({
                type: type,
                title: "Select Role",
                snapPoints: ["30%"],
                centered: true,
                closeModal: closePopUpModal,
                hideCloseButton: true,
            });
        } else if (type === "AddSuccess" || type === "UpdateSuccess") {
            setPopUp({
                type: type,
                title: "",
                snapPoints: ["38%"],
                centered: false,
                closeModal: closeAllModal,
                hideCloseButton: false,
            });
        } else if (type === "Deactivate") {
            setPopUp({
                type: type,
                title: "",
                snapPoints: ["45%"],
                centered: false,
                closeModal: closePopUpModal,
                hideCloseButton: false,
            })
        }
    }

    // set role select button as inactive if back button is pressed and role modal is opened
    useEffect(() => {
        if (!popUpSheetOpen) {
            setRoleInputActive(false);
        }
    }, [popUpSheetOpen])

    // list of members
    const memberList = [
        {
            id: 1,
            imageUrl: require('../assets/profile/profile.jpg'),
            admin: true,
            fullname: "Raymond Reddington",
            role: "Manager",
            onPress: () => {openModal("Edit")},
            addNew: false,
            deactivated: false,
        },
        {
            id: 2,
            imageUrl: require('../assets/profile/profile1.jpg'),
            admin: false,
            fullname: "John Doe",
            role: "Sales Rep",
            onPress: () => {openModal("Edit")},
            addNew: false,
            deactivated: true,
        },
        {
            id: 3,
            imageUrl: null,
            admin: false,
            fullname: "Felix Johnson",
            role: "Sales Rep",
            onPress: () => {openModal("Edit")},
            addNew: false,
            deactivated: false,
        },
        {
            id: 4,
            imageUrl: null,
            admin: false,
            role: "Sales Rep",
            onPress: () => {openModal("Add")},
            addNew: true,
            deactivated: false,
        }
    ];

    // state to store first name input value
    const [firstName, setFirstName] = useState("");

    // state to store error in first name input value
    const [errorFirstName, setErrorFirstName] = useState(false);

    // function to update first name
    const updateFirstName = (text) => {
        setFirstName(text);
    }

    // state to store last name input value
    const [lastName, setLastName] = useState("");

    // state to store error in last name input value
    const [errorLastName, setErrorLastName] = useState(false);

    // function to update last name
    const updateLastName = (text) => {
        setLastName(text);
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
    const [editRole, setEditRole] = useState("Sales Rep");
    
    // member inputs
    const newMemberInputs = [
        {
            id: 1,
            placeholder: "First Name",
            label: "First Name",
            value: firstName,
            forceBlur: forceBlur,
            onChange: updateFirstName,
            error: errorFirstName,
            setError: setErrorFirstName
        },
        {
            id: 2,
            placeholder: "Last Name",
            label: "Last Name",
            value: lastName,
            forceBlur: forceBlur,
            onChange: updateLastName,
            error: errorLastName,
            setError: setErrorLastName
        },
        {
            id: 3,
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
        firstName, 
        lastName,
        workEmail,
        role
        ].some(
            (item) => item === null || item === ''
    );

    // function confirm deactivation
    const handleDeactivation = () => {
        setPopUp({
            type: "Confirmed",
            title: "",
            centered: false,
            snapPoints: ["38%"],
            closeModal: closeAllModal,
            popUpVisible: true
        })
    }

    const handleUpdateRole = () => {
        openPopUpModal("UpdateSuccess");
    }

    const handleDeactivateUser = () => {
        openPopUpModal("Deactivate");
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
                    data={memberList}
                    numColumns={2}
                    renderItem={({ item }) => (
                        <TeamMemberCard
                            imageUrl={item.imageUrl}
                            admin={item.admin}
                            fullname={item.fullname}
                            role={item.role}
                            onPress={item.onPress}
                            addNew={item.addNew}
                            deactivated={item.deactivated}
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
                            onPress={() => {
                                openPopUpModal("AddSuccess")
                            }}
                            inactive={emptyFields}
                            unpadded={true}
                        />
                    </>
                )}
                {/* edit existing member role modal content */}
                {modal === "Edit" && (
                    <View style={style.modalWrapper}>
                        <View style={style.modalContainer}>
                            <View style={style.infoWrapper}>
                                <Avatar 
                                    fullname={"Felix Johnson"}
                                />
                                <Indicator
                                    type={"Dispatched"}
                                    text={"Sales Rep"}
                                />
                            </View>
                            <Text style={style.modalFullnameText}>Felix Johnson</Text>
                            <Text style={style.modalEmailText}>felixjohnson@gmail.com</Text>
                            <SelectInput 
                                label={"Role"}
                                placeholder={"Role"}
                                onPress={() => openPopUpModal("Edit")}
                                value={editRole}
                                active={roleInputActive}
                                inputFor={"String"}
                            />
                        </View>
                        <View style={style.modalButtonsWrapper}>
                            <CustomButton
                                name={"Update Role"}
                                shrinkWrapper={true}
                                onPress={handleUpdateRole}
                                unpadded={true}
                            />
                            <CustomButton
                                secondaryButton={true}
                                name={"Deactivate User"}
                                shrinkWrapper={true}
                                onPress={handleDeactivateUser}
                                unpadded={true}
                            />
                        </View>
                    </View>
                )}
            </CustomBottomSheet>
            {/* popup bottom sheet */}
            <PopUpBottomSheet
                bottomSheetModalRef={popUpSheetRef}
                closeModal={popUp.closeModal}
                snapPointsArray={popUp.snapPoints}
                autoSnapAt={0}
                sheetTitle={popUp.title}
                hideCloseButton={popUp.hideCloseButton}
                centered={popUp.centered}
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

                {/* deactivation confirmation popup */}
                { popUp.type === "Deactivate" &&
                    <View style={style.popUpContent}>
                        <CautionPrompt />
                        <Text style={style.popUpHeading}>
                            Deactivate User
                        </Text>
                        <Text style={style.popUpParagraph}>
                            Are you sure you want to deactivate Felix Jones
                        </Text>
                        <View style={style.popUpButtonWrapper}>
                            <CustomButton
                                name={"Yes, deactivate"}
                                shrinkWrapper={true}
                                onPress={handleDeactivation}
                                unpadded={true}
                            />
                            <CustomButton
                                secondaryButton={true}
                                name={"No, cancel"}
                                shrinkWrapper={true}
                                onPress={closePopUpModal}
                                unpadded={true}
                            />
                        </View>
                    </View>
                }

                {/* deactivation confirmed popup */}
                { popUp.type === "Confirmed" &&  
                    <View style={style.popUpContent}>
                        <SuccessPrompt />
                        <Text style={style.popUpHeading}>
                            Felix Jones Succesfully Deactivated
                        </Text>
                        <Text style={style.popUpParagraph}>
                            You have successfully deactivated Felix Jones
                        </Text>
                        <CustomButton
                            name={"Done"}
                            shrinkWrapper={true}
                            onPress={closeAllModal}
                            unpadded={true}
                        />
                    </View>
                }

                {/* new member added successfully modal popup */}
                { popUp.type === "AddSuccess" &&  
                    <View style={style.popUpContent}>
                        <SuccessPrompt />
                        <Text style={style.popUpHeading}>
                            {firstName + ' ' + lastName } Succesfully Added
                        </Text>
                        <Text style={style.popUpParagraph}>
                            Hi Raymond, you have successfully added {firstName + ' ' + lastName } to your team
                        </Text>
                        <CustomButton
                            name={"Done"}
                            shrinkWrapper={true}
                            onPress={closeAllModal}
                            unpadded={true}
                        />
                    </View>
                }

                {/* existing member role updated successfully modal popup */}
                { popUp.type === "UpdateSuccess" &&  
                    <View style={style.popUpContent}>
                        <SuccessPrompt />
                        <Text style={style.popUpHeading}>
                            Role Updated Succesfully
                        </Text>
                        <Text style={style.popUpParagraph}>
                            You have successfully updated Felix Johnson role to a {editRole}
                        </Text>
                        <CustomButton
                            name={"Done"}
                            shrinkWrapper={true}
                            onPress={closeAllModal}
                            unpadded={true}
                        />
                    </View>
                }
            </PopUpBottomSheet>
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
    }
})
 
export default TeamMembers;