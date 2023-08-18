// react native component
import { 
    View, 
    Text, 
    StyleSheet,
    TouchableOpacity, 
    BackHandler,
    Dimensions
} from "react-native";
// components
import Header from "../components/Header";
import CustomButton from "../components/CustomButton";
import SelectInput from "../components/SelectInput";
import Calendar from "../components/Calendar";
import CustomBottomSheet from "../components/CustomBottomSheet";
// colors
import { background, black, bodyText} from "../style/colors";
// icons
import ArrowDown from "../assets/icons/ArrowDown";
import CalendarIcon from "../assets/icons/CalendarIcon";
// react hooks
import { useState, useEffect, useRef } from "react";
// import moment
import moment from "moment";


// get windows height
const windowsHeight = Dimensions.get("window").height;

const GenerateBusinessReport = ({navigation}) => {

    // modal overlay
    const [showOverlay, setShowOverlay] = useState(false);

    // variable to store start date
    const [startDate, setStartDate] = useState("");

    // variable to indicate start date input active state
    const [activeStartDate, setActiveStartDate] = useState(false);
    
    // variable to store end date
    const [endDate, setEndDate] = useState("");
    // variable to indicate end date input active state
    const [activeEndDate, setActiveEndDate] = useState(false);
    
    // variable to store format
    const [format, setFormat] = useState(null);
    // variable to indicate format input active state
    const [activeFormat, setActiveFormat] = useState(false);

    const handleSelectedFormat = (option) => {
        setFormat(option);
        setActiveFormat(false);
        closeModal();
    }

    // previous date
    const prevDate = new Date();
    prevDate.setDate(prevDate.getDate() - 1);

    // previous date
    const today = new Date();
    // today.setDate(today.getDate());


    const [calendar, setCalendar] = useState({
        open: false,
        close: hanldeCloseCalendar,
        setDate: setStartDate,
        maxDate: false,
        minDate: false,
    });

    const hanldeOpenCalendar = (inputType) => {
        if (inputType === "StartDate") {
            setActiveStartDate(true);
            setCalendar({
                open: true,
                close: hanldeCloseCalendar,
                setDate: setStartDate,
                maxDate: endDate ? moment(endDate).subtract(1, 'days') : prevDate,
                minDate: false
            });
        } else {
            setActiveEndDate(true);
            setCalendar({
                open: true,
                close: hanldeCloseCalendar,
                setDate: setEndDate,
                maxDate: today,
                minDate: startDate ? moment(startDate).add(1, 'days') : startDate,
            });
        }
    }

    const hanldeCloseCalendar = () => {
        setActiveEndDate(false);
        setActiveStartDate(false);
        setCalendar({
            ...calendar,
            open: false,
        })
    }

    // check for empty fields
    const emptyFields = [
        startDate, 
        endDate,
        format
        ].some(
            (item) => item === null || item === ''
    );

    // use effect to close modal
    useEffect(() => {
        // function to run if back button is pressed
        const backAction = () => {
            // Run your function here
            if (showOverlay) {
                // if modal is open, close modal
                closeModal();
                return true;
            } else {
                // if modal isnt open simply navigate back
                return false;
            }
        };
    
        // listen for onPress back button
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction
        );
    
        return () => backHandler.remove();

    }, [showOverlay]);
    
    // bottom sheet ref
    const bottomSheetModalRef = useRef(null);

    // close modal function
    const closeModal = () => {
        bottomSheetModalRef.current?.close();
        setShowOverlay(false);
        setActiveFormat(false);
    };

    // open modal function
    const openModal = (type) => {
        // open bottomsheet modal
        bottomSheetModalRef.current?.present();
        // set overlay
        setShowOverlay(true);
    }
    
    // render GenerateBusinessReport page
    return (
        <>
            <View
                style={style.container}
            >
                <View style={style.main}>
                    {/* header component */}
                    <Header 
                        navigation={navigation} 
                        stackName={"Generate Business Report"} 
                        iconFunction={null} 
                        icon={null} 
                        unpadded={true}
                    />
                    <Text style={style.headingText}>
                        Select your preferred timeframe and choose the desired format.
                    </Text>
                    <View style={style.inputContainer}>
                        {/* Start date */}
                        <SelectInput 
                            label={"Start Date"} 
                            placeholder={"DD MMMM, YYYY"} 
                            value={startDate}
                            onPress={() => {hanldeOpenCalendar("StartDate")}}
                            icon={<CalendarIcon />}
                            active={activeStartDate}
                            inputFor={"Date"}
                        />

                        {/* End date */}
                        <SelectInput
                            label={"End Date"}
                            placeholder={"DD MMMM, YYYY"}
                            value={endDate}
                            onPress={() => {hanldeOpenCalendar("EndDate")}}
                            icon={<CalendarIcon />}
                            active={activeEndDate}
                            inputFor={"Date"}
                        />

                        {/* Format */}
                        <SelectInput
                            label={"Format"}
                            placeholder={"Select Format"}
                            value={format}
                            onPress={() => {
                                openModal();
                                setActiveFormat(true);
                            }}
                            icon={<ArrowDown />}
                            active={activeFormat}
                            inputFor={"String"}
                        />
                    </View>
                </View>
            </View>
            {/* Add Product button, disables on empty fields */}
            <CustomButton 
                name={"Generate"}
                onPress={() => {}}
                backgroundColor={background}
                fixed={false}
                inactive={emptyFields}
            />
            <Calendar 
                open={calendar.open}
                closeCalender={calendar.close}
                setDate={calendar.setDate}
                disableActionButtons={true}
                minDate={calendar.minDate}
                maxDate={calendar.maxDate}
            />
            <CustomBottomSheet 
                bottomSheetModalRef={bottomSheetModalRef}
                setShowOverlay={setShowOverlay}
                showOverlay={showOverlay}
                closeModal={closeModal}
                snapPointsArray={["26%"]}
                autoSnapAt={0}
                sheetTitle={"Select Format"}
            >
                <View style={style.selectContainer}>
                    <TouchableOpacity 
                        style={style.selectButton}
                        onPress={() => {
                            handleSelectedFormat("PDF");
                        }}
                    >
                        <Text style={style.selectButtonText}>PDF</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={style.selectButton}
                        onPress={() => {
                            handleSelectedFormat("Excel");
                        }}
                    >
                        <Text style={style.selectButtonText}>Excel</Text>
                    </TouchableOpacity>
                </View>
            </CustomBottomSheet>
        </>
    );
}

// stylesheet
const style = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        backgroundColor: background,
        padding: 20,
        paddingTop: 0,
        minHeight: windowsHeight - 100,
    },
    main: {
        paddingBottom: 90,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
    },
    headingText: {
        fontFamily: "mulish-regular",
        fontSize: 12,
        color: bodyText,
        width: "100%",
        marginBottom: 24,
        marginTop: 8,
    },
    inputContainer: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: 20,
    },
    selectContainer: {
        width: "100%",
        height: "100%",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 10,
    },
    selectButton: {
        height: 35,
        width: '100%',
        paddingVertical: 10,
    },
    selectButtonText: {
        color: black,
        fontSize: 12,
        fontFamily: 'mulish-medium',
    }
})
 
export default GenerateBusinessReport;