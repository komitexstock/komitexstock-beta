import Header from "../components/Header";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import LogisticsCard from "../components/LogisticsCard";
import { useState, useRef } from "react";
import CustomBottomSheet from "../components/CustomBottomSheet";
import ModalButton from "../components/ModalButton";
import TeamMemberCard from "../components/TeamMemberCard";
const Team = ({navigation}) => {

    // state to control modal overlay
    const [showOverlay, setShowOverlay] = useState(false);

    // modal ref
    const bottomSheetModalRef = useRef(null);

    const closeModal = () => {
        bottomSheetModalRef.current?.close();
        setShowOverlay(false);
    };

    // function to open bottom sheet modal
    const openModal = () => {
        bottomSheetModalRef.current?.present();
        setShowOverlay(true);
    }

    const memberList = [
        {
            id: 1,
            imageUrl: require('../assets/profile/profile.jpg'),
            admin: true,
            fullname: "Raymond Reddington",
            role: "Manager",
            onPress: openModal,
            addNew: false 
        },
        {
            id: 2,
            imageUrl: require('../assets/profile/profile1.jpg'),
            admin: false,
            fullname: "John Doe",
            role: "Sales Rep",
            onPress: openModal,
            addNew: false,
        },
        {
            id: 3,
            imageUrl: null,
            admin: false,
            fullname: "Felix Johnson",
            role: "Sales Rep",
            onPress: openModal,
            addNew: false,
        },
        {
            id: 4,
            imageUrl: null,
            admin: false,
            role: "Sales Rep",
            onPress: () => {
                navigation.navigate("AddLogistics");
            },
            addNew: true
        }
    ];
    
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
                snapPointsArray={["80%", "100%"]}
                autoSnapAt={0}
                sheetTitle={""}
                sheetSubtitle={""}
            >   
                
            </CustomBottomSheet>
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
    }
})
 
export default Team;