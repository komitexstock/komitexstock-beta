// react native components
import { StyleSheet, View, Dimensions, Modal, TouchableWithoutFeedback } from "react-native";
// bottomsheet components
import { BottomSheetModal, BottomSheetBackdrop } from "@gorhom/bottom-sheet";
// react hooks
import {useCallback, useState } from "react";
// calendarPicker component
import CalendarPicker from 'react-native-calendar-picker'; 
// colors
import { primaryColor, white, bodyText, subText, neutral } from '../style/colors';
// import icons
import PrevArrowIcon from '../assets/icons/PrevArrowIcon';
import NextArrowIcon from '../assets/icons/NextArrowIcon';
// components
import CustomButton from "./CustomButton";
import ActionButton from './ActionButton';
// gloabl variables from App context

const windowWidth = Dimensions.get("window").width;

// get windows height
const windowHeight = Dimensions.get('window').height;

// calender padding
const paddingHorizontal = 40;

const calendarWidth = windowWidth - paddingHorizontal;

const Calendar = ({visible, closeCalendar, setDate, disableActionButtons, minDate, maxDate}) => {

    // render popup bottomsheet modal backdrop 
    const renderBackdrop = useCallback(
        props => (
            <BottomSheetBackdrop
                {...props}
                disappearsOnIndex={-1}
                appearsOnIndex={0}
                opacity={0.3}
                onPress={closeCalendar}
            />
        ),
        []
    );

    // temporary date variable
    const [tempDate, setTempDate] = useState("");

    // update date variable
    const onDateChange = (date) => {
        // log type of date
        setTempDate(date);
        // console.log(date.format("DD-MM-YYYY"));
        // console.log(getCurrentDate());
    }

    const onRangeSelected = (date) => {
        setTempDate(date);
    }

    const calendarActionButtons = [
        {
            id: 1, 
            name: "Today", 
            selected: false, 
        },
        {
            id: 2, 
            name: "Yesterday", 
            selected: false, 
        },
        {
            id: 3, 
            name: "Last 7 days", 
            selected: true, 
        },
        {
            id: 4, 
            name: "Last week", 
            selected: false, 
        },
        {
            id: 5, 
            name: "This month", 
            selected: false, 
        },
        {
            id: 6, 
            name: "Last month", 
            selected: false, 
        },
        {
            id: 7, 
            name: "This Year", 
            selected: false, 
        },
        {
            id: 8, 
            name: "All time", 
            selected: false, 
        },
    ];

    const handleSelectedDate = () => {
        if (tempDate) {
            const selectedDate = new Date(tempDate);
            setDate(selectedDate);
            closeCalendar();
        } else {
            console.log("No date selected.");
        }
    }

    const handleOnSheetChange = (index) => {
        if (index === -1) {
            closeCalendar();
            setTempDate("");
            return;
        }
    }
   
    // render calendar sheet component
    return (
        <Modal
            visible={visible}
            transparent={true}
            onRequestClose={closeCalendar}
            animationType="fade"
        >
            <TouchableWithoutFeedback
                onPress={closeCalendar}
            >
                <View style={style.modal}>
                    <View style={style.calenderWrapper}>
                        <CalendarPicker
                            textStyle={calenderStyles.textStyle}
                            selectedDayStyle={calenderStyles.selectedDayStyle}
                            selectedDayTextColor={white}
                            selectedDayColor={primaryColor}
                            dayLabelsWrapper={calenderStyles.dayLabelsWrapper}
                            startFromMonday={true}
                            allowBackwardRangeSelect={true}
                            scrollable={true}
                            width={calendarWidth}
                            previousComponent={<PrevArrowIcon />}
                            nextComponent={<NextArrowIcon />}
                            onDateChange={onDateChange}
                            todayBackgroundColor={white}
                            todayTextStyle={{}}
                            customDayHeaderStyles={customDayHeaderStyles}
                            monthTitleStyle={calenderStyles.monthTitleStyle}
                            yearTitleStyle={calenderStyles.yearTitleStyle}
                            minDate={minDate && minDate}
                            maxDate={maxDate && maxDate}
                            disabledDatesTextStyle={{color: neutral}}
                        />
                        <View style={style.calendarBaseContainer}>
                            { !disableActionButtons && (
                                <View style={style.actionButtonsWrapper}>
                                    { calendarActionButtons.map((button) => (
                                        <ActionButton
                                            key={button.id}
                                            onPress={() => onRangeSelected(button.name)}
                                            name={button.name}
                                            removeBottomMargin={true}
                                            selected={button.selected}
                                        />
                                    ))}
                                </View>
                            )}
                            {/* modal button to apply calendar selected date */}
                            <CustomButton
                                name={"Apply"}
                                shrinkWrapper={true}
                                onPress={handleSelectedDate}
                                unpadded={true}
                                inactive={tempDate === ""}
                            />
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
}
 
// stylesheet
const style = StyleSheet.create({
    modal: {
        flex: 1,
        backgroundColor: 'red',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    calenderWrapper: {
        backgroundColor: white,
        borderRadius: 24,
        paddingTop: 20,
        width: calendarWidth,
        zIndex: 3,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: 350,
    },
    calendarBaseContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 10,
        padding: 20,
        width: '100%',
    },
    actionButtonsWrapper: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        gap: 10,
        marginBottom: 14,
    }
});


const customDayHeaderStyles = () => {
    return {
        textStyle: {
            fontFamily: 'mulish-regular',
            color: subText,
        },
        headerStyle: {
            style: 'lightblue',
        },
    };
};

// date styling
const calenderStyles = {
    textStyle: {
        fontFamily: "mulish-medium",
        color: bodyText,
        fontSize: 10,
    },
    todayTextStyle: {
        color: white,  
    },
    selectedDayStyle: {
        backgroundColor: primaryColor,
        color: white,
    },
    dayLabelsWrapper: {
        borderBottomWidth: 0,
        borderTopWidth: 0,
    },
    monthTitleStyle: {
        fontFamily: 'mulish-bold',
        fontSize: 16,
    },
    yearTitleStyle: {
        fontFamily: 'mulish-bold',
        fontSize: 16,
    },
}



export default Calendar;