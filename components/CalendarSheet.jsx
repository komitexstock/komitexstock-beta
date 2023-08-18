// react native components
import { StyleSheet, View, Dimensions } from "react-native";
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
import ModalButton from './ModalButton';
import ActionButton from './ActionButton';

const windowWidth = Dimensions.get("window").width;

// get windows height
const windowHeight = Dimensions.get('window').height;

// calender padding
const paddingHorizontal = 40;

const calendarWidth = windowWidth - paddingHorizontal;

const CalendarSheet = ({calendarRef, closeCalendar, snapPointsArray, setDate, disableActionButtons, minDate, maxDate}) => {

    // render popup bottomsheet modal backdrop 
    const renderBackdrop = useCallback(
        props => (
            <BottomSheetBackdrop
                {...props}
                disappearsOnIndex={-1}
                appearsOnIndex={0}
                opacity={0.3}
            />
        ),
        []
    );

    // temporary date variable
    const [tempDate, setTempDate] = useState("");


    // update date variable
    const onDateChange = (date) => {
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
        setDate(tempDate);
        closeCalendar();
    }

    // get current date  in "DD-MM-YYYY" format
    const getCurrentDate = () => {
        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        }).replace(/\//g, '-');
        
        return formattedDate;
    }
   
    // render PopUpBottomSheet component
    return (
        <View style={style.container}>
            <BottomSheetModal
                ref={calendarRef}
                index={0}
                snapPoints={snapPointsArray}
                backgroundStyle={{
                    borderRadius: 24,
                }}
                containerStyle={{
                    borderRadius: 24,
                    marginHorizontal: 20,
                    // transform move in x axis -50% and y axis -50%
                    transform: [
                        // {translateX: -windowWidth * 0.7},
                        {translateY: -windowHeight * 0.15},
                    ]
                    // styling to center modal
                    // marginTop: -windowWidth/1.3,
                    // marginBottom: windowWidth/1.3,
                }}
                handleComponent={() => (
                    <></>
                )}
                style={{
                }}
                // push stackbehaviour to allow popup modal to display
                // over other bottomsheet
                stackBehavior="push"
                backdropComponent={renderBackdrop}
            >
                <View style={style.modalWrapper}>
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
                            <ModalButton 
                                name={"Apply"}
                                onPress={handleSelectedDate}
                            />
                        </View>
                    </View>
                </View>
            </BottomSheetModal>
        </View>
    );
}
 
// stylesheet
const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        backgroundColor: "transparent",
    },
    modalWrapper: {
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "column",
        flex: 1,
        width: "100%",
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
        height: '100%',
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



export default CalendarSheet;