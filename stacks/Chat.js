import { 
    View, 
    Text, 
    TextInput, 
    TouchableOpacity, 
    ScrollView, 
    TouchableWithoutFeedback, 
    StyleSheet, 
    Image
} from "react-native";
import SendIcon from '../assets/icons/SendIcon';
import PaperClipIcon from "../assets/icons/PaperClipIcon";
import ActionButton from "../components/ActionButton";
import ArrowLeft from "../assets/icons/ArrowLeft";
import MenuIcon from "../assets/icons/MenuIcon";
import CalendarPicker from 'react-native-calendar-picker';  
import { useState } from "react";
import { primaryColor, secondaryColor } from "../style/globalStyleSheet";

const Chat = ({navigation, route}) => {

    // console.log(id, chat);

    const {id, type, order, name, imageUrl} = route.params;

    const accountType = "Merchant";

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

    const waybillButton = {
        name: "Picked Up",
        onPress: () => {}
    }

    // selected date variable
    const [selectedStartDate, setSelectedStartDate] = useState(null);

    // update date variaBLE 
    const onDateChange = (date) => {
        setSelectedStartDate(date);
    }

    return (
        <TouchableWithoutFeedback>
            <View style={style.container}>
                <View style={style.header}>
                    <View style={style.headerDetails}>
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                        >
                            <ArrowLeft />
                        </TouchableOpacity>
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
                    </View>
                    <TouchableOpacity>
                        <MenuIcon />
                    </TouchableOpacity>
                </View>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={style.messagesContainer}
                >
                    <CalendarPicker 
                        textStyle={calenderStyles.textStyle}
                        selectedDayStyle={calenderStyles.selectedDayStyle}
                        selectedDayTextColor={"#ffffff"}
                        selectedDayColor={primaryColor}
                        todayBackgroundColor={secondaryColor}
                        todayTextStyle={calenderStyles.todayTextStyle}
                        dayLabelsWrapper={calenderStyles.dayLabelsWrapper}
                        allowRangeSelection={true}
                        startFromMonday={true}
                        // minDate={new Date()}
                        showDayStragglers={true}
                        allowBackwardRangeSelect={true}
                        // maxDate={new Date()}
                        scrollable={true}
                    />
                </ScrollView>
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
                                placeholderTextColor={"rgba(34, 34, 34, 0.6)"}
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

export const calenderStyles = {
    textStyle: {
        fontFamily: "mulish-regular",
        color: "rgba(34, 34, 34, 1)",
    },
    todayTextStyle: {
        color: "rgba(34, 34, 34, 1)",  
    },
    selectedDayStyle: {
        backgroundColor: primaryColor,
        color: "#ffffff",
    },
    dayLabelsWrapper: {
        borderBottomWidth: 0,
        borderTopWidth: 0,
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        backgroundColor: "#f8f8f8",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        height: "100%",
    },
    header: {
        width: "100%",
        height: 45,
        backgroundColor: "#ffffff",
        paddingHorizontal: 20,
        display: "flex",
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: "space-between",
    },
    headerDetails: {
        flex: 1,
        display: 'flex',
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: "flex-start",
        gap: 10,
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
        fontFamily: 'mulish-regular',
        color: "#222222",
    },  
    headerSecondaryText: {
        fontSize: 8,
        fontFamily: 'mulish-regular',
        color: "rgba(34, 34, 34, 0.6)",
    },  
    messagesContainer: {
        flex: 1,
        width: "100%",
    },
    textFieldWrapper: {
        width: "100%",
        minHeight: 64,
        backgroundColor: "#ffffff",
        paddingHorizontal: 20,
        paddingVertical: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
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
        backgroundColor: "#f8f8f8",
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
        backgroundColor: "#f8f8f8",
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