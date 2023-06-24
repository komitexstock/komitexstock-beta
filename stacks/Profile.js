import Header from "../components/Header";
import { 
    View, 
    Text, 
    ScrollView, 
    TouchableWithoutFeedback, 
    TouchableOpacity, 
    StyleSheet 
} from "react-native";
import AccountButtons from "../components/AccountButtons";

const Profile = ({navigation}) => {

    const profileButtons = [
        {
            id: 1,
            title: "Full Name",
            mainInfoText: "Raymond Reddington",
            onPress: () => {},
            disabled: false
        },
        {
            id: 2,
            title: "Business Name",
            mainInfoText: "Mega Enterprise Ltd",
            onPress: () => {},
            disabled: true
        },
        {
            id: 3,
            title: "Phone Number",
            mainInfoText: "08012345678",
            onPress: () => {},
            disabled: false
        },
        {
            id: 4,
            title: "Email Address",
            mainInfoText: "raymondreddington@gmail.com",
            onPress: () => {},
            disabled: true
        },
    ]

    return (
        <TouchableWithoutFeedback>
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={style.container}
            >
                <View style={style.main}>
                    <Header 
                        navigation={navigation} 
                        stackName={"Profile"} 
                        iconFunction={null} 
                        icon={null} 
                    />
                    <Text style={style.paragraph}>
                        You can only change your full name and phone number. To change other information, please contact 
                        <TouchableOpacity style={style.link}>
                            <Text style={style.linkText}>support</Text>
                        </TouchableOpacity>
                    </Text>
                    { profileButtons.map((button, index) => (
                        <AccountButtons 
                            key={button.id}
                            title={button.title}
                            mainInfoText={button.mainInfoText}
                            length={profileButtons.length - 1}
                            index={index}
                            onPress={button.onPress}
                            disabled={button.disabled}
                        />
                    )) }
                </View>
            </ScrollView>
        </TouchableWithoutFeedback>
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        backgroundColor: "#f8f8f8",
        padding: 20,
        minHeight: "100%",
    },
    main: {
        paddingBottom: 90,
        display: "flex",
        width: "100%",
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'column',
        // gap: 8,
    },
    paragraph: {
        fontSize: 12,
        fontFamily: "mulish-regular",
        color: "rgba(34, 34, 34, 0.60)",
        flex: 1,
        marginBottom: 24,
    },
    link: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center',
        height: "100%",
        alignSelf: 'baseline',
    },
    linkText: {
        marginBottom: -3,
        marginLeft: 3,
        color: "rgba(34, 34, 34, 1)",
        fontFamily: "mulish-regular",
        fontSize: 12,
        textDecorationLine: 'underline',
    }
})
 
export default Profile;