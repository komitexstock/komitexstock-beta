import { TouchableOpacity, View, Image } from "react-native";
const BottomNav = () => {
    return (
        <View>
            <TouchableOpacity>
                <Image source={require("../assets/icons/home.svg")} />
            </TouchableOpacity>
        </View>
    );
}
 
export default BottomNav;