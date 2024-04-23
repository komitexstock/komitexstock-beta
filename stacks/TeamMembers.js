// react native components
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableWithoutFeedback,
    Keyboard,
    Platform,
} from "react-native";

// react hooks
import { useState, useEffect, useMemo } from "react";

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
import SuccessSheet from "../components/SuccessSheet";

// colors
import { background, black, bodyText, white } from "../style/colors";

// bottomsheet components
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";

// skeleton screen
import TeamMembersSkeleton from "../skeletons/TeamMembersSkeleton";

// globals
import { useGlobals } from "../context/AppContext";

// useAuth
import { useAuth } from "../context/AuthContext";

// firebase
import {
    database,
    functions,
} from "../Firebase";

// firestore functions
import {
    doc,
    setDoc,
    updateDoc,
    onSnapshot,
    collection,
    where,
    query,
    getDocs,
    orderBy,
    serverTimestamp,
} from "firebase/firestore";

// firebase functions
import { httpsCallable } from "firebase/functions";

//local database
import { handleUsers } from "../sql/handleUsers";
import { useSQLiteContext } from "expo-sqlite/next";

const TeamMembers = ({ navigation, route }) => {

    // local database
    const db = useSQLiteContext();

    // state to trigger getting data from local database
    const [triggerReload, setTriggerReload] = useState(1);

    // auth data
    const { authData } = useAuth();

    // route params
    // const { preloaded_data } = route?.params || {};

    const { preloaded_data } = useMemo(() => {
        return route?.params || {};
    }, [route?.params]);

    // page loading state
    const [pageLoading, setPageLoading] = useState(preloaded_data.length === 1);

    // state to check if online data has been loaded
    const [onlineDataFetched, setOnlineDataFetched] = useState(false);

    // button loading state
    const [isLoading, setIsLoading] = useState(false);
    
    // bottoms sheef refs
    const {
        bottomSheetRef,
        bottomSheetOpen,
        successSheetRef,
        popUpSheetRef,
        popUpSheetOpen,
        setToast,
    } = useGlobals();


    // members from local database
    const [members, setMembers] = useState(preloaded_data);

    // fetch members from local database
    useEffect(() => {
        const fetchMembers = async () => {
            try {
                // Usage
                // const startDate = new Date('2024-04-08T14:22:09.487Z').toISOString();
                // const endDate = new Date('2024-12-31T23:59:59.999Z').toISOString();
                // const users = await handleUsers.getUsersRange(db, startDate, endDate);
                const users = await handleUsers.getUsers(db);
                return users;
            } catch (error) {
                console.log("Fetch local members error:", error.message);            
            }
        };

        fetchMembers().then((users) => {
            // modify users array 
            const modifyUsers = users.map(user => {
                return {
                    ...user,
                    admin: user?.admin === 1,
                    deactivated: user?.deactivated === 1,
                }
            });

            // add new member card
            const addNewCard = { 
                id: "addNew",
                add_new: true,
            }

            setMembers(() => {
                return [
                    ...modifyUsers,
                    addNewCard,
                ]
            });
            // disable loading state
            // setPageLoading(false);
        }).catch((error) => {
            console.log("Fetch local members error:", error.message);
            setToast({
                text: error.message,
                visible: true,
                type: "error",
            })
        }).finally(() => {
            // if online data has been loaded, disable page loadin state
            if (onlineDataFetched) setPageLoading(false);
        });

    }, [triggerReload])

    // get team members
    useEffect(() => {
        // fetch team members data
        const fetchTeamMembers = async (business_id) => {
            try {
                const collectionRef = collection(database, "users");
                let q = query(
                    collectionRef, 
                    where("business_id", "==", business_id),
                    orderBy("created_at"),
                );

                const unsubscribe = onSnapshot(q, (querySnapshot) => {
                    let users = [];
                    querySnapshot.forEach(async (doc) => {
                        try {
                            const userData = doc.data();
                            // members
                            const user = {
                                id: doc.id,
                                admin: userData?.admin,
                                created_at: userData?.created_at,
                                deactivated: userData?.deactivated,
                                email: userData?.email,
                                full_name: userData?.full_name,
                                phone: userData?.phone,
                                profile_image: userData?.profile_image,
                                role: userData.role,
                            };
                            users.push(user);
            
                            // active user logged in
                            const activeUser = authData?.uid === user.id;

                            // user data
                            // create local data clone
                            await handleUsers.createUser(db, user, activeUser);
                            // reload team member local data
                            setTriggerReload((prev) => prev + 1);
                        } catch (error) {
                            console.log("Error:", error.message);
                            throw error;
                        }    
                    });

                    }, (error) => { //handle errors
                        console.log("Error: ", error.message);
                        setToast({
                            text: error.message,
                            visible: true,
                            type: "error",
                        });
                        throw error;
                    }
                );
    
                return unsubscribe;
            } catch (error) {
                console.log("Caught Error: ", error.message);
                setToast({
                    text: error.message,
                    visible: true,
                    type: "error",
                })
            } finally {
                // indicate online data has been fetched
                setOnlineDataFetched(true);
            }
        };
    
        // fetch team members data
        const unsubscribePromise = fetchTeamMembers(authData?.business_id);

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

    // selected member id
    const [selectedId, setSelectedId] = useState(null);

    // selected member
    const selectedMember = useMemo(() => {
        // if no member seleted, return null
        if (!selectedId) return null;
        return members?.find((member) => member?.id === selectedId);
    }, [selectedId, members]);


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
    const [bottomSheetSnapPoints, setBottomSheetSnapPoints] = useState([484]);

    // function to close modal
    const closeModal = () => {
        bottomSheetRef.current?.close();

        setSelectedId(null);
    };

    // function to open bottom sheet modal
    const openModal = (type, id) => {
        bottomSheetRef.current?.present();
        setModal(type);

        // console.log("ID: ", id);
        // console.log("Type: ", type);
        
        if (type === "Edit") {
            // console.log(type);
            setBottomSheetSnapPoints([484])
            // const chosenMember = ;
            setSelectedId(id);
        } else {
            setBottomSheetSnapPoints([582])
        }
    }

    // function to know if member can be deactivated
    const handleCantDeactivate = useMemo(() => {
        // if no account is selected return true
        if (selectedId === null) return true;
        const member = members?.find((member) => member?.id === selectedId);
        // admins can't be deactivated
        if (member.admin) return true;
        // if users are not managers
        if (member.deactivated) return true;
        if (authData?.role !== "Manager") return true;
        // else return false
        return false;
    }, [selectedId])

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
                    heading: 'Deactivate User',
                    height: 381,
                    paragragh: <>
                        Are you sure you want to deactivate 
                        <Text style={style.boldText}> {selectedMember.full_name}</Text>
                    </>,
                    caution: true,
                    primaryFunction: handleDeactivateUser,
                    primaryButtonText: 'Yes, deactivate',
                    secondaryFunction: closeSuccessModal,
                    secondaryButtonText: 'No, cancel',
                })
                break;
        
            case "Activate":
                setSuccessModal({
                    heading: 'Activate User',
                    height: 381,
                    paragragh: <>
                        Are you sure you want to activate 
                        <Text style={style.boldText}> {selectedMember.full_name}</Text>
                    </>,
                    caution: true,
                    primaryFunction: handleDeactivateUser,
                    primaryButtonText: 'Yes, activate',
                    secondaryFunction: closeSuccessModal,
                    secondaryButtonText: 'No, cancel',
                })
                break;
        
            case "Confirmed Deactivation":
                setSuccessModal({
                    heading: `${selectedMember.full_name} Succesfully Deactivated`,
                    height: 320,
                    paragragh: <>
                        You have successfully deactivated 
                        <Text style={style.boldText}> {selectedMember.full_name}</Text>
                    </>,
                    primaryFunction: closeAllModal,
                })
                break;

            case "Confirmed Activation":
                setSuccessModal({
                    heading: `${selectedMember.full_name} Succesfully Activated`,
                    height: 320,
                    paragragh: <>
                        You have successfully activated 
                        <Text style={style.boldText}> {selectedMember.full_name}</Text>
                    </>,
                    primaryFunction: closeAllModal,
                })
                break;

            case "UpdateSuccess":
                setSuccessModal({
                    heading: 'Role Updated Succesfully',
                    height: 320,
                    paragragh: <>
                        You have successfully updated {selectedMember.full_name} role to a
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
            placeholder: "Full Name",
            label: "Full Name",
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
    const handleUpdateRole = async () => {

        try {
            // indicate loadind state
            setIsLoading(true);
    
            // if selected member is a manager
            if (selectedMember?.role === "Manager") {
                //  check if this user manages any warehouse
                
                const collectionRef = collection(database, "warehouses");
                
                // query
                let q = query(
                    collectionRef,
                    where("business_id", "==", authData?.business_id),
                    where("warehouse_manager", "==", selectedMember?.id),
                    orderBy("created_at")
                );
          
                // get docs
                const querySnapshot = await getDocs(q);
                
                // if any result exist
                if (querySnapshot.size > 0) {
                    let warehouseList = [];
                    querySnapshot.forEach((doc) => {
                        const id = doc.id;
                        warehouseList.push(id);
                    });
                    // team admin
                    const adminUser = members.find(member => member.admin);

                    // foor all warehouses that target user manages
                    await Promise.all(warehouseList.map(async (id) => {
                        // update warehouse
                        // update warehouses collection where id === id of target warehouse
                        // set all warehouse manager as the admin user
                        await updateDoc(doc(database, "warehouses", id), {
                            warehouse_manager: adminUser.id,
                            edited_at: serverTimestamp(), // timestamp
                            edited_by: authData?.uid, // uid
                        })
                    }))
                }
            }
    
            // ref to users collection
            const usersRef = doc(database, "users", selectedMember.id);
    
            // get setRole cloud functions
            const setRole = httpsCallable(functions, "setRole");
                
            // setRole and token
            await setRole({ 
                email: selectedMember.email, 
                role: editRole, 
                account_type: authData?.account_type,
                business_id: authData?.business_id,
            });
    
            // save data in database
            await updateDoc(usersRef, {
                role: editRole,
            });

            // trigger refresh of data from local db
            setTriggerReload(prevValue => prevValue + 1);
    
            // end loadind state
            setIsLoading(false);
            
            // open success modal
            openSuccessModal("UpdateSuccess");

            // reset edited role
            setEditRole("");
            
        } catch (error) {
            console.log("Caught Error: ", error);
            setToast({
                text: error.message,
                visible: true,
                type: "error",
            });

            // end loadind state
            setIsLoading(false);
    
        }
    }

    // function to confirm deactivation
    const handleDeactivateUser = async () => {
        try {
            // indicate loading state
            setIsLoading(true);
            // console.log(selectedMember);

            // if selected member is a manager and is being deactivated
            if (selectedMember?.role === "Manager" && !selectedMember.deactivated) {
                //  check if this user manages any warehouse
                const collectionRef = collection(database, "warehouses");
                
                // query
                let q = query(
                    collectionRef,
                    where("business_id", "==", authData?.business_id),
                    where("warehouse_manager", "==", selectedMember?.id),
                    orderBy("created_at")
                );
          
                // get docs
                const querySnapshot = await getDocs(q);
                
                // if any result exist
                if (querySnapshot.size > 0) {
                    let warehouseList = [];
                    querySnapshot.forEach((doc) => {
                        const id = doc.id;
                        warehouseList.push(id);
                    });

                    // team admin
                    const adminUser = members.find(member => member.admin);

                    // foor all warehouses that target user manages
                    await Promise.all(warehouseList.map(async (id) => {
                        // update warehouse
                        // update warehouses collection where id === id of target warehouse
                        // set all warehouse manager as the admin user
                        await updateDoc(doc(database, "warehouses", id), {
                            warehouse_manager: adminUser.id,
                            edited_at: serverTimestamp(), // timestamp
                            edited_by: authData?.uid, // uid
                        })
                    }))
                }
            }
    
            // ref to users collection
            const usersRef = doc(database, "users", selectedMember.id);
    
            // get setRole cloud functions
            const setRole = httpsCallable(functions, "setRole");
    
            // setRole and token
            await setRole({ 
                email: selectedMember.email, 
                role: selectedMember.role, 
                account_type: authData?.account_type,
                business_id: authData?.business_id,
                deactivated: !selectedMember.deactivated,
            });
    
            // save data in database
            await updateDoc(usersRef, {
                deactivated: !selectedMember.deactivated,
            });

            // trigger refresh of data from local db
            setTriggerReload(prevValue => prevValue + 1);
    
            // end loading state
            setIsLoading(false);
    
            // open success pop up modal
            openSuccessModal(selectedMember.deactivated ? "Confirmed Activation" : "Confirmed Deactivation")

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

    const defaultPassword = "komitex1234";

    // function to add new team member
    const handleAddNewMember = async () => {
        // dismiss keyboard first
        Keyboard.dismiss()
        setIsLoading(true);
        try {
            // get createUser cloud functions
            const createUser = httpsCallable(functions, "createUser");
            
            // sign up user
            const authResponse = await createUser({
                email: workEmail,
                password: defaultPassword,
            });

            // console.log(authResponse);

            // ref to users collection
            const usersRef = doc(database, "users", authResponse?.data?.uid);
            
            // save data in database
            await setDoc(usersRef, {
                business_id: authData?.business_id,
                email: workEmail.trim(),
                created_at: serverTimestamp(),
                deactivated: false,
                face_id: false,
                fingerprint: false,
                full_name: fullName.trim(),
                notification: false,
                profile_image: null,
                phone: null,
                role: role,
                admin: false,
            });

            // get setRole cloud functions
            const setRole = httpsCallable(functions, "setRole");
            
            // setRole and token
            const response = await setRole({ 
                email: workEmail,
                role: role, 
                account_type: authData?.account_type,
                business_id: authData?.business_id,
            });

            // console.log(response);

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

    // listen for keyboard opening or closing
    useEffect(() => {
        // if keyboard is open
        const keyboardDidShowListener = Keyboard.addListener(
            Platform.OS === 'android' ? 'keyboardDidShow' : 'keyboardWillShow', () => {
                // if keyboard is open, make bottomheet occupy the rest of the screen
                return setBottomSheetSnapPoints(["100%"])
            }
        );
        
        // keyboard is closed
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            // if keyboard is closed reset modal height
            if (modal === "Edit") {
                // console.log(type);
                setBottomSheetSnapPoints([484])
            } else {
                setBottomSheetSnapPoints([582])
            }
        });
    
        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, [bottomSheetOpen ]);


    // render TeamMember page
    return (<>
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
                        onPress={() => openModal("Edit", item.id)}
                        onPressAddNew={() => openModal("Add")}
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
                            inactive={editRole === "" || editRole === selectedMember?.role || handleCantDeactivate}
                            isLoading={isLoading}
                        />
                        <CustomButton
                            secondaryButton={true}
                            name={selectedMember?.deactivated ? "Activate User" : "Deactivate User"}
                            shrinkWrapper={true}
                            onPress={() => openSuccessModal(selectedMember?.deactivated ? "Activate" : "Deactivate")}
                            unpadded={true}
                            inactive={selectedMember?.deactivated ? false : handleCantDeactivate}
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
            isLoadingPrimary={isLoading}
        />
    </>);
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