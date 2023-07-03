// calenderPicker component
import CalendarPicker from 'react-native-calendar-picker'; 
// react hooks
import { useState } from 'react';

const Calender = () => {

    // selected date variable
    const [selectedStartDate, setSelectedStartDate] = useState(null);

    // update date variable
    const onDateChange = (date) => {
        setSelectedStartDate(date);
    }

    return (
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
    );
}

// date styling
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
        color: white,
    },
    dayLabelsWrapper: {
        borderBottomWidth: 0,
        borderTopWidth: 0,
    }
}
 
export default Calender;