// react native components
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
} from 'react-native';
// calenderPicker component
import CalendarPicker from 'react-native-calendar-picker'; 
// colors
import { primaryColor, white, bodyText, subText } from '../style/colors';
// import icons
import PrevArrowIcon from '../assets/icons/PrevArrowIcon';
import NextArrowIcon from '../assets/icons/NextArrowIcon';
// components
import ModalButton from '../components/ModalButton';
import ActionButton from '../components/ActionButton';

// get windows width
const windwoWidth = Dimensions.get('window').width;

// get windows height
const windowHeight = Dimensions.get('window').height;

// calender padding
const paddingHorizontal = 40;

const calendatWidth = windwoWidth - paddingHorizontal;

const Calender = ({open, closeCalender, date, setDate}) => {

    // update date variable
    const onDateChange = (date) => {
        setDate(date);
        // console.log(date);
    }

    const calendarActionButtons = [
        {id: 1, name: "Today", selected: false, onPress: () => {}},
        {id: 2, name: "Yesterday", selected: false, onPress: () => {}},
        {id: 3, name: "This week", selected: true, onPress: () => {}},
        {id: 4, name: "Last week", selected: false, onPress: () => {}},
        {id: 5, name: "This month", selected: false, onPress: () => {}},
        {id: 6, name: "Last month", selected: false, onPress: () => {}},
        {id: 7, name: "This Year", selected: false, onPress: () => {}},
        {id: 8, name: "All time", selected: false, onPress: () => {}},
    ];

    const handleSelectedDate = () => {
        closeCalender();
    }

    return open && (
        <>
            <TouchableOpacity
                style={style.overlay}
                onPress={closeCalender}
            />
            <View style={style.container}>
                <View style={style.calenderWrapper}>
                    <CalendarPicker
                        textStyle={calenderStyles.textStyle}
                        selectedDayStyle={calenderStyles.selectedDayStyle}
                        selectedDayTextColor={"#ffffff"}
                        selectedDayColor={primaryColor}
                        dayLabelsWrapper={calenderStyles.dayLabelsWrapper}
                        startFromMonday={true}
                        allowBackwardRangeSelect={true}
                        scrollable={true}
                        width={calendatWidth}
                        previousComponent={<PrevArrowIcon />}
                        nextComponent={<NextArrowIcon />}
                        onDateChange={onDateChange}
                        todayBackgroundColor={white}
                        todayTextStyle={{color: bodyText}}
                        selectedStartDate={date}
                        customDayHeaderStyles={customDayHeaderStyles}
                        monthTitleStyle={calenderStyles.monthTitleStyle}
                        yearTitleStyle={calenderStyles.yearTitleStyle}
                        // maxDate={new Date()}
                        // minDate={new Date()}
                    />
                    <View style={style.calendarBaseContainer}>
                        <View style={style.actionButtonsWrapper}>
                            { calendarActionButtons.map((button) => (
                                <ActionButton
                                    key={button.id}
                                    onPress={button.onPress}
                                    name={button.name}
                                    removeBottomMargin={true}
                                    selected={button.selected}
                                />
                            ))}
                        </View>
                        <ModalButton 
                            name={"Apply"}
                            onPress={handleSelectedDate}
                        />
                    </View>
                </View>
            </View>
        </>
    );
}

const style = StyleSheet.create({
    overlay: {
        width: "100%",
        height: "100%",
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        zIndex: 2
    },
    container: {
        // width: "100%",
        // height: "100%",
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [
            { translateX: -windwoWidth/2 }, 
            { translateY: -windowHeight/3 }
        ],
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        zIndex: 2,
    },
    calenderWrapper: {
        backgroundColor: white,
        borderRadius: 24,
        paddingTop: 20,
        width: calendatWidth,
        zIndex: 3,
    },
    calendarBaseContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
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
})

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


 
export default Calender;