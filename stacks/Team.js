import Header from "../components/Header";
import { View, Text, FlatList, StyleSheet, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useState, useRef } from "react";
import CustomBottomSheet from "../components/CustomBottomSheet";
import ModalButton from "../components/ModalButton";
import TeamMemberCard from "../components/TeamMemberCard";
import Input from "../components/Input";
import SelectInput from "../components/SelectInput";
import Avatar from "../components/Avatar";
import Indicator from "../components/Indicator";
import PopUpBottomSheet from "../components/PopUpBottomSheet";
import SelectRolePopUpContent from "../components/SelectRolePopUpContent";
import SuccessPrompt from "../components/SuccessPrompt";
import CautionPrompt from "../components/CautionPrompt";

const Team = ({navigation}) => {

    // state to control modal overlay
    const [showOverlay, setShowOverlay] = useState(false);

    // state to control modal type
    const [modal, setModal] = useState("");

    // state to control popUp type
    const [popUp, setPopUp] = useState({
        type: "",
        title: "",
        snapPoints: ["45%"],
        centered: false,
        closeModal: closePopUpModal,
    });

    // state to prompt user to confirm deactivation
    const [roleInputActive, setRoleInputActive] = useState(false);

    // modal ref
    const bottomSheetModalRef = useRef(null);

    // bottomsheet snap points
    const [bottomSheetSnapPoints, setBottomSheetSnapPoints] = useState(["60%"]);

    // popUp modal ref
    const popUpBottomSheetModalRef = useRef(null);

    // function to close modal
    const closeModal = () => {
        bottomSheetModalRef.current?.close();
        setShowOverlay(false);
    };

    // function to open bottom sheet modal
    const openModal = (type) => {
        bottomSheetModalRef.current?.present();
        setShowOverlay(true);
        setModal(type);

        type === "Add" ? setBottomSheetSnapPoints(["75%"]) : setBottomSheetSnapPoints(["60%"]);
    }

    const closePopUpModal = () => {
        popUpBottomSheetModalRef.current?.close();
        setRoleInputActive(false);
    };

    // function to close all bottomsheet moda;
    const closeAllModal = () => {
        closeModal();
        closePopUpModal();
    }

    // function to open bottom sheet popup
    const openPopUpModal = (type) => {
        popUpBottomSheetModalRef.current?.present();
        if (type === "Add" || type === "Edit") {
            setRoleInputActive(true);
            setPopUp({
                type: type,
                title: "Select Role",
                snapPoints: ["30%"],
                centered: true,
                closeModal: closePopUpModal,
            });
        } else if (type === "AddSuccess" || type === "UpdateSuccess") {
            setPopUp({
                type: type,
                title: "",
                snapPoints: ["38%"],
                centered: false,
                closeModal: closeAllModal,
            });
        } else if (type === "Deactivate") {
            setPopUp({
                type: type,
                title: "",
                snapPoints: ["45%"],
                centered: false,
                closeModal: closePopUpModal,
            })
        }
    }

    // list of members
    const memberList = [
        {
            id: 1,
            imageUrl: require('../assets/profile/profile.jpg'),
            admin: true,
            fullname: "Raymond Reddington",
            role: "Manager",
            onPress: () => {openModal("Edit")},
            addNew: false 
        },
        {
            id: 2,
            imageUrl: require('../assets/profile/profile1.jpg'),
            admin: false,
            fullname: "John Doe",
            role: "Sales Rep",
            onPress: () => {openModal("Edit")},
            addNew: false,
        },
        {
            id: 3,
            imageUrl: null,
            admin: false,
            fullname: "Felix Johnson",
            role: "Sales Rep",
            onPress: () => {openModal("Edit")},
            addNew: false,
        },
        {
            id: 4,
            imageUrl: null,
            admin: false,
            role: "Sales Rep",
            onPress: () => {openModal("Add")},
            addNew: true
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

    // function to update work email
    const updateWorkEmail = (text) => {
        setWorkEmail(text);
    }

    // state to store role select input value
    const [role, setRole] = useState("");

    const hanldeRoleSelect = (text) => {
        setRole(text);
        closePopUpModal();
    }

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
            onChange: updateFirstName,
            error: errorFirstName,
            setError: setErrorFirstName
        },
        {
            id: 2,
            placeholder: "Last Name",
            label: "Last Name",
            value: lastName,
            onChange: updateLastName,
            error: errorLastName,
            setError: setErrorLastName
        },
        {
            id: 3,
            placeholder: "Work Email",
            label: "Email address",
            value: workEmail,
            onChange: updateWorkEmail,
            error: errorWorkEmail,
            setError: setErrorWorkEmail
        },
    ];

    const emptyFields = [
        firstName, 
        lastName,
        workEmail,
        role
        ].some(
            (item) => item === null || item === ''
    );

    const handleDeactivation = () => {
        setPopUp({
            type: "Confirmed",
            title: "",
            centered: false,
            snapPoints: ["38%"],
            closeModal: closeAllModal,
        })
    }

    
    return (
        <>
            <FlatList 
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={
                    <Header 
                        navigation={navigation} 
                        stackName={"Team Members"} 
                        iconFunction={null} 
                        icon={null} 
                    />
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
                    />
                )}
            />
            <CustomBottomSheet
                bottomSheetModalRef={bottomSheetModalRef}
                showOverlay={showOverlay}
                closeModal={closeModal}
                snapPointsArray={bottomSheetSnapPoints}
                autoSnapAt={0}
                sheetTitle={modal === "Add" ? "Add New Team Memner" : ""}
                sheetSubtitle={""}
            >   
                {modal === "Add" && (
                    <TouchableWithoutFeedback
                        onPress={() => Keyboard.dismiss()}
                    >
                        <View style={style.modalWrapper}>
                            <View style={style.modalContent}>
                                <Text style={style.modalText}>We will email your team member an invite</Text>
                                {newMemberInputs.map(input => (
                                    <Input
                                        key={input.id}
                                        placeholder={input.placeholder}
                                        label={input.label}
                                        value={input.value}
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
                            <ModalButton
                                name={"Add New Team Member"}
                                onPress={() => {
                                    openPopUpModal("AddSuccess")
                                }}
                                emptyFeilds={emptyFields}
                            />
                        </View>
                    </TouchableWithoutFeedback>
                )}

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
                            <ModalButton
                                name={"Update Role"}
                                onPress={() => {
                                    openPopUpModal("UpdateSuccess")
                                }}
                            />
                            <ModalButton
                                name={"Deactivate User"}
                                onPress={() => {
                                    openPopUpModal("Deactivate");
                                }}
                                secondaryButton={true}
                            />

                        </View>
                    </View>
                )}
            </CustomBottomSheet>
            <PopUpBottomSheet
                bottomSheetModalRef={popUpBottomSheetModalRef}
                hideCloseButton={false}
                closeModal={popUp.closeModal}
                snapPointsArray={popUp.snapPoints}
                autoSnapAt={0}
                sheetTitle={popUp.title}
                centered={popUp.centered}
            >   
                { popUp.type === "Edit" && 
                    <SelectRolePopUpContent
                        hanldeRoleSelect={hanldeRoleUpdate}
                    />
                }

                { popUp.type === "Add" && 
                    <SelectRolePopUpContent
                        hanldeRoleSelect={hanldeRoleSelect}
                    />
                }

                { popUp.type === "Deactivate" &&
                    <View style={style.popUpContent}>
                        <CautionPrompt />
                        <Text style={style.popUpHeading}>
                            Deactivate Logistics
                        </Text>
                        <Text style={style.popUpParagraph}>
                            Are you sure you want to deactivate Komitex Logistics
                        </Text>
                        <View style={style.popUpButtonWrapper}>
                            <ModalButton
                                name={"Yes, deactivate"}
                                onPress={handleDeactivation}
                            />
                            <ModalButton
                                name={"No, cancel"}
                                onPress={closePopUpModal}
                                secondaryButton={true}
                            />
                        </View>
                    </View>
                }

                { popUp.type === "Confirmed" &&  
                    <View style={style.popUpContent}>
                        <SuccessPrompt />
                        <Text style={style.popUpHeading}>
                            Komitex Succesfully Deactivated
                        </Text>
                        <Text style={style.popUpParagraph}>
                            You have successfully deactivated Komitex Logistics
                        </Text>
                        <ModalButton
                            name={"Done"}
                            onPress={closeAllModal}
                        />
                    </View>
                }

                { popUp.type === "AddSuccess" &&  
                    <View style={style.popUpContent}>
                        <SuccessPrompt />
                        <Text style={style.popUpHeading}>
                            {firstName + ' ' + lastName } Succesfully Added
                        </Text>
                        <Text style={style.popUpParagraph}>
                            Hi Raymond, you have successfully added {firstName + ' ' + lastName } to your team
                        </Text>
                        <ModalButton
                            name={"Done"}
                            onPress={closeAllModal}
                        />
                    </View>
                }

                { popUp.type === "UpdateSuccess" &&  
                    <View style={style.popUpContent}>
                        <SuccessPrompt />
                        <Text style={style.popUpHeading}>
                            Role Updated Succesfully
                        </Text>
                        <Text style={style.popUpParagraph}>
                            You have successfully updated Felix Johnson role to a {editRole}
                        </Text>
                        <ModalButton
                            name={"Done"}
                            onPress={closeAllModal}
                        />
                    </View>
                }
            </PopUpBottomSheet>
        </>
    );
}



const style = StyleSheet.create({
    listWrapper: {
        width: "100%",
        height: "100%",
        paddingHorizontal: 20,
        marginBottom: 70,
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
        backgroundColor: "#ffffff",
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
        color: "#222222",
        marginBottom: 4,
    },
    modalEmailText: {
        fontFamily: "mulish-regular",
        fontSize: 10,
        color: "#22222299",
        marginBottom: 24,
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
        color: "#22222299",
        marginBottom: 4,
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
        color: 'rgba(34, 34, 34, 1)',
    },
    popUpParagraph: {
        fontSize: 12,
        fontFamily: 'mulish-regular',
        textAlign: 'center',
        color: 'rgba(34, 34, 34, 0.8)',
    },
    popUpButtonWrapper: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: '100%',
    }
})
 
export default Team;