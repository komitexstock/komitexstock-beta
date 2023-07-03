// react native components
import { 
    View, 
    Text, 
    TextInput, 
    TouchableOpacity, 
    ScrollView, 
    TouchableWithoutFeedback, 
    StyleSheet, 
    Image,
} from "react-native";
// icons
import SendIcon from '../assets/icons/SendIcon';
import PaperClipIcon from "../assets/icons/PaperClipIcon";
import MenuIcon from "../assets/icons/MenuIcon";
// components
import ActionButton from "../components/ActionButton";
import Header from "../components/Header";
// import react hooks
import { useState } from "react";
// colors
import { background, black, bodyText, primaryColor, secondaryColor, white } from "../style/globalStyleSheet";

const Chat = ({navigation, route}) => {

    // chat rout parameters
    const {id, type, order, name, imageUrl} = route.params;

    // accoutntype, retreived from global variables
    const accountType = "Merchant";

    // order buttons
    const orderButtons = [
        {
            id: 1,
            name: "Reschedule",
            onPress: () => {}
        },
        {
            id: 2,
            name: "Cancel",
            onPress: () => {}
        },
        {
            id: 3,
            name: "Dispatch",
            onPress: () => {}
        },
        {
            id: 4,
            name: "Deliver",
            onPress: () => {}
        },
    ]

    // waybill buttons
    const waybillButton = {
        name: "Picked Up",
        onPress: () => {}
    }

    // chat header component
    const ChatHeader = (
        <View style={style.headerInfoWrapper}>
            <Image 
                source={imageUrl ? imageUrl : require("../assets/images/default.png")}
                style={style.headerImage}
            />
            <View style={style.headerTextWrapper}>
                <Text style={style.headerPrimaryText}>{name}</Text>
                <Text style={style.headerSecondaryText}>Order ID: Y5lq3xgCK9rkKRD7oJ4Q</Text>
            </View>
        </View>
    )

    return (
        <TouchableWithoutFeedback>
            <View style={style.container}>
                {/* fixed header container */}
                <View style={style.headerContainer}>
                    {/* header component */}
                    <Header
                        navigation={navigation}
                        stackName={ChatHeader}
                        iconFunction={() => {}}
                        icon={<MenuIcon />}
                        removeBackArrow={true}
                        inlineArrow={true}
                        backgroundColor={white}
                    />
                </View>
                {/* chat scroll view */}
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={style.messagesContainer}
                >

                </ScrollView>
                {/* text field wrapper */}
                <View style={style.textFieldWrapper}>
                    <View style={style.actionButtonsWrapper}>

                        { type === "order" ? orderButtons.map((button) => {
                            if (accountType === "Merchant"){
                                if (button.id === 1 || button.id === 2){
                                    return (<ActionButton
                                        key={button.id}
                                        name={button.name}
                                        onPress={button.onPress}
                                    />)
                                }
                            } else {
                                return (<ActionButton
                                    key={button.id}
                                    name={button.name}
                                    onPress={button.onPress}
                                    />)
                                }
                            }) : (<ActionButton 
                                name={waybillButton.name}
                                onPress={waybillButton.onPress}
                            />
                        )}
                    </View>
                    <View style={style.inputGroupWrapper}>
                        <View style={style.textInputContainer}>
                            <TextInput 
                                style={style.textInput}
                                placeholder="Write a message..."
                                placeholderTextColor={bodyText}
                                multiline={true}
                                numberOfLines={1}
                            />
                            <TouchableOpacity
                                style={[style.attachButton, style.fixedButton]}
                            >
                                <PaperClipIcon />
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity
                            style={style.sendButton}
                        >
                            <SendIcon />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        backgroundColor: background,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        height: "100%",
    },
    headerContainer: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        borderBottomWidth: 1,
        borderColor: background,
        zIndex: 1,
    }, 
    headerInfoWrapper: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: "100%",
        gap: 10,
    },  
    headerImage: {
        width: 30,
        height: 30,
        borderRadius: 6,
    },
    headerPrimaryText: {
        fontSize: 14,
        fontFamily: 'mulish-medium',
        color: black,
    },  
    headerSecondaryText: {
        fontSize: 8,
        fontFamily: 'mulish-regular',
        color: bodyText,
    },
    imageBackground: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    messagesContainer: {
        flex: 1,
        width: "100%",
        backgroundColor: white,
    },
    textFieldWrapper: {
        width: "100%",
        minHeight: 64,
        backgroundColor: white,
        paddingHorizontal: 20,
        paddingVertical: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        borderTopWidth: 1,
        borderColor: background,
        justifyContent: 'center',
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
    },
    inputGroupWrapper: {
        width: "100%",
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'flex-end',
        gap: 10,
    },
    textInputContainer: {
        minHeight: 44,
        maxHeight: 100,
        flex: 1,
        backgroundColor: background,
        // backgroundColor: "red",
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 5,
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative',
    },
    textInput: {
        fontFamily: 'mulish-regular',
        flex: 1,
        fontSize: 12,
        paddingRight: 20,
        minHeight: 20,
    },
    attachButton: {
       height: 20,
       display: 'flex',
       justifyContent: 'center',
       alignItems: 'flex-end',
       flexDirection: 'row',
    },
    fixedButton: {
        position: 'absolute',
        right: 16,
        bottom: 12,
    },
    sendButton: {
        width: 44,
        height: 44,
        backgroundColor: background,
        borderRadius: 12,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    actionButtonsWrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: "100%",
        gap: 10,
    },
})
 
export default Chat;