// react native components
import { TouchableOpacity } from "react-native";
// import icons
import CheckBoxUncheckedIcon from "../assets/icons/CheckBoxUncheckedIcon";
import CheckBoxCheckedIcon from "../assets/icons/CheckBoxCheckedIcon";

const CheckBox = ({value, onPress}) => {
    return (
        <TouchableOpacity onPress={onPress} activeOpacity={1}>
            {value ? <CheckBoxCheckedIcon/> : <CheckBoxUncheckedIcon/>}
        </TouchableOpacity>
    );
}
 
export default CheckBox;