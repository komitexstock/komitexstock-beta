// react native component
import { 
    View, 
    Text, 
    StyleSheet,
    TouchableOpacity, 
} from "react-native";
// components
import Header from "../components/Header";
import CustomButton from "../components/CustomButton";
import SuccessPrompt from "../components/SuccessPrompt";
import SelectInput from "../components/SelectInput";
import CalendarSheet from "../components/CalendarSheet";
import CustomBottomSheet from "../components/CustomBottomSheet";
import PopUpBottomSheet from "../components/PopUpBottomSheet";
import SuccessSheet from "../components/SuccessSheet";
// colors
import { background, black, bodyText} from "../style/colors";
// icons
import ArrowDown from "../assets/icons/ArrowDown";
import CalendarIcon from "../assets/icons/CalendarIcon";
// react hooks
import { useState, useEffect } from "react";
// import moment
import moment from "moment";
// helpers
import { windowHeight } from "../utils/helpers";
// globals
import { useGlobals } from "../context/AppContext";

const GenerateBusinessReport = ({navigation}) => {

    // bottomsheets refs
    const { bottomSheetRef, popUpSheetRef, successSheetRef, calendarSheetRef, calendarSheetOpen, bottomSheetOpen } = useGlobals();

    const [isLoading, setIsLoading] = useState(false);

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


    // calendar state
    const [calendar, setCalendar] = useState({
        setDate: setStartDate,
        maxDate: false,
        minDate: false,
    });

    const openCalendar = (inputType) => {
        if (inputType === "StartDate") {
            setActiveStartDate(true);
            setCalendar({
                setDate: setStartDate,
                maxDate: endDate ? moment(endDate).subtract(1, 'days') : prevDate,
                minDate: false
            });
        } else {
            setActiveEndDate(true);
            setCalendar({
                setDate: setEndDate,
                maxDate: today,
                minDate: startDate ? moment(startDate).add(1, 'days') : startDate,
            });
        }
        calendarSheetRef.current?.present();
    }

    const closeCalendar = () => {
        setActiveEndDate(false);
        setActiveStartDate(false);
        calendarSheetRef.current?.close();
    }

    // check for empty fields
    const emptyFields = [
        startDate, 
        endDate,
        format
        ].some(
            (item) => item === null || item === ''
    );

    // close modal function
    const closeModal = () => {
        bottomSheetRef.current?.close();
        setActiveFormat(false);
    };

    // open modal function
    const openModal = () => {
        // open bottomsheet modal
        bottomSheetRef.current?.present();
        setActiveFormat(true);
    }

    // close popup modal bottomsheet function
    const closeSuccessModal = () => {
        successSheetRef.current?.close();
    };
    // function to open bottom sheet modal
    const openSuccessModal = () => {
        successSheetRef.current?.present();
    }

    const handleGenerateBusinessReport = () => {
        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);
            openSuccessModal();
        }, 3000);
    }

    // check if calendar sheet is closed and disable active state for date inputs
    useEffect(() => {
        if (!calendarSheetOpen) {
            setActiveEndDate(false);
            setActiveStartDate(false);
        }

        if (!bottomSheetOpen) {
            setActiveFormat(false);
        }

    }, [calendarSheetOpen, bottomSheetOpen])
    
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
                            onPress={() => {openCalendar("StartDate")}}
                            icon={<CalendarIcon />}
                            active={activeStartDate}
                            inputFor={"Date"}
                        />

                        {/* End date */}
                        <SelectInput
                            label={"End Date"}
                            placeholder={"DD MMMM, YYYY"}
                            value={endDate}
                            onPress={() => {openCalendar("EndDate")}}
                            icon={<CalendarIcon />}
                            active={activeEndDate}
                            inputFor={"Date"}
                        />

                        {/* Format */}
                        <SelectInput
                            label={"Format"}
                            placeholder={"Select Format"}
                            value={format}
                            onPress={openModal}
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
                onPress={handleGenerateBusinessReport}
                isLoading={isLoading}
                backgroundColor={background}
                fixed={false}
                inactive={emptyFields}
            />
            {/* calendar */}
            <CalendarSheet 
                closeCalendar={closeCalendar}
                setDate={calendar.setDate}
                disableActionButtons={true}
                snapPointsArray={["60%"]}
                minDate={calendar.minDate}
                maxDate={calendar.maxDate}
                calendarRef={calendarSheetRef} 
            />

            {/* custome bottom sheet */}
            <CustomBottomSheet 
                bottomSheetModalRef={bottomSheetRef}
                setShowOverlay={setShowOverlay}
                showOverlay={showOverlay}
                closeModal={closeModal}
                snapPointsArray={["25%"]}
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

            {/* success up modal */}
            <SuccessSheet
                successSheetRef={successSheetRef}
                heading={"Report Generated Successfully"}
                height={320}
                paragraph={<>
                    Your report has been sent to &nbsp;
                    <Text  style={style.boldParagraph}>
                        raymondreddington@komitex.ng
                    </Text>
                </>}
                primaryFunction={closeSuccessModal}
            />
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
        minHeight: windowHeight - 100,
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
        justifyContent: 'center',
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
        color:  black,
    },
    popUpParagraph: {
        fontSize: 12,
        fontFamily: 'mulish-medium',
        textAlign: 'center',
        color: bodyText,
        lineHeight: 15,
    },
    boldParagraph: {
        fontFamily: 'mulish-bold',
    }
})
 
export default GenerateBusinessReport;