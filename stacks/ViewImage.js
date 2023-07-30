// react native components
import {
    View,
    TouchableWithoutFeedback,
    StyleSheet,
    Image,
    Text,
    Dimensions
} from "react-native";
// react hooks
// icons
import MenuIcon from "../assets/icons/MenuIcon";
// components
import Header from "../components/Header";
// colors
import { black, bodyText, white } from "../style/colors";
// helpers
import { convertUTCToTime } from "../utils/convertUTCToTime";

const windowHeight = Dimensions.get("window").height;

const ViewImage = ({navigation, route}) => {

    const image = route.params.image;
    const imageTimestamp = route.params.timestamp
    const imageUserId = route.params.userId
    const imageFullname = route.params.fullname
    const imageCompanyName = route.params.companyName
    const imageAccountType = route.params.accountType

    const accountType = "Merchant";
    const userId = "hjsdjkji81899";

    // 
    const myTeamHeader = (
        <View style={style.headerWrapper}>
            <Text style={style.user}>
                {imageUserId === userId ? "You" : imageFullname}
            </Text>
            <Text style={style.time}>{convertUTCToTime(imageTimestamp)}</Text>
        </View>
    );

    // other team header
    const otherTeamHeader = (
        <View style={style.headerWrapper}>
            <Text style={style.user}>
                {imageCompanyName}
            </Text>
            <Text style={style.time}>{convertUTCToTime(imageTimestamp)}</Text>
        </View>
    )


    // render ViewImage Page
    return (
        <TouchableWithoutFeedback>
            <View style={style.container}>
                <View style={style.main}>
                    {/* header component */}
                    <Header 
                        navigation={navigation} 
                        stackName={accountType === imageAccountType ? myTeamHeader : otherTeamHeader} 
                        iconFunction={null} 
                        icon={<MenuIcon />}
                        backgroundColor={white} 
                        unpadded={true}
                        removeBackArrow={true}
                        inlineArrow={true}
                    />
                    <View style={style.imageWrapper}>
                        <Image
                            source={image}
                            style={style.postedImage}
                            resizeMethod="auto"
                            resizeMode="cover"
                        />
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}

// stylesheet
const style = StyleSheet.create({
    container: {
        width: "100%",
        backgroundColor: white,
        padding: 20,
        paddingTop: 0,
        height: "100%"
    },
    main: {
        flex: 1,
        display: 'flex',
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 24,
    },
    user: {
        fontFamily: 'mulish-bold',
        fontSize: 14,
        color: black,
    },
    time: {
        fontFamily: 'mulish-regular',
        fontSize: 10,
        color: bodyText,
    },
    imageWrapper: {
        flex: 1,
        width: "100%", 
        height: windowHeight - 80,
        display: 'flex',
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    postedImage: {
        width: "100%",
        minHeight: '50%',
        aspectRatio: 3/4,
        maxHeight: '100%',
        borderRadius: 12,
    }
})
 
export default ViewImage;