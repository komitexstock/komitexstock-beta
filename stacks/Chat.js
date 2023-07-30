// react native components
import { 
    View, 
    Text, 
    TextInput, 
    TouchableOpacity,
    ScrollView, 
    TouchableWithoutFeedback, 
    StyleSheet, 
    Image,
    Dimensions,
    BackHandler,
    Linking,
} from "react-native";
// icons
import SendIcon from '../assets/icons/SendIcon';
import PaperClipIcon from "../assets/icons/PaperClipIcon";
import MenuIcon from "../assets/icons/MenuIcon";
import EditIcon from "../assets/icons/EditIcon";
import CallPrimaryIcon from "../assets/icons/CallPrimaryIcon";
import CameraPrimaryLargeIcon from "../assets/icons/CameraPrimaryLargeIcon";
import GalleryIcon from "../assets/icons/GalleryIcon";
import DocumentIcon from "../assets/icons/DocumentIcon";
import SmsPrimaryIcon from "../assets/icons/SmsPrimaryIcon";
import WhatsAppIcon from "../assets/icons/WhatsAppIcon";
import RepliedImageIcon from "../assets/icons/RepliedImageIcon";
import RepliedDocumentIcon from "../assets/icons/RepliedDocumentIcon";
import CloseIcon from "../assets/icons/CloseIcon";
// components
import ActionButton from "../components/ActionButton";
import Header from "../components/Header";
import Indicator from "../components/Indicator";
import CustomBottomSheet from "../components/CustomBottomSheet";
import Calender from "../components/Calender";
import Product from "../components/Product";
import ModalButton from "../components/ModalButton";
import Input from "../components/Input";
import SelectInput from "../components/SelectInput";
import MessageContainer from "../components/MessageContainer";
// import react hooks
import React, { useState, useEffect, useRef } from "react";
// colors
import {
    accent,
    background,
    black,
    bodyText,
    linkText,
    primaryColor,
    receivedMessage,
    white,
    secondaryColor,
    accentLight,
    messageSenderColors,
    subText,
} from "../style/colors";
// bottomsheet components
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";


// screen height
const windowHeight = Dimensions.get("window").height;

const Chat = ({navigation, route}) => {

    // messages ref
    const messagesRefs = useRef([]);

    // scroll view ref
    const scrollViewRef = useRef();
    // has scrolled to bottom ref
    const hasScrolledToBottom = useRef(false);

    // message overlay to show when auto scroll to repluied message
    const [messageOverlay, setMessageOverlay] = useState({
        top: 0,
        height: 0,
    });

    // state to indicate replying message state in text field
    const [replying, setReplying] = useState(null);
    // state to indicate uploading image or doc state in text field
    const [uploading, setUploading] = useState(false);

    // state to store typed text
    const [textInput, setTextInput] = useState('');
    const textInputRef = useRef(null)

    const updateTextInput = (text) => {
        setTextInput(text === '' ? null : text)
    }

    // console.log(textInput);

    // scroll to bottom function
    const scrollToBottom = (animate) => {
        if (!hasScrolledToBottom.current) {
            scrollViewRef.current.scrollToEnd({ animated: animate });
            hasScrolledToBottom.current = true;
        }
    }

    // function to scroll to message
    const handleScrollToComponent = (id) => {
        // console.log(id);
        const targetMessage = messagesRefs.current.filter(message => message.id === id)[0];
        // console.log(messagesRefs.current);
        // // console.log(targetMessage);

        // get current scroll height
        // const currentScrollHeight = scrollViewRef.current;

        // console.log('currentScrollHeight: ', currentScrollHeight);

        scrollViewRef.current.scrollTo({ y: (targetMessage.y - 70), animated: true });
        setMessageOverlay({
            top: targetMessage.y,
            height: targetMessage.height
        })
        
        setTimeout(() => {
            setMessageOverlay({
                top: 0,
                height: 0,
            })
        }, 1500);
    };


    // chat rout parameters
    const {id, type, order, name, imageUrl} = route.params;

    // accoutntype, retreived from global variables
    const accountType = "Merchant";
    const userId = "hjsdjkji81899";
    const companyName = "Mega Enterprise";
    const fullname = "Iffie Ovie";
    const postOrderUserId = "hjsdjkji81899";
    const postOrderTimestamp = "6:30 am";
    const outOfStock = false;


    const [price, setPrice] = useState(38000);
    
    // function to update price
    const updatePrice = (text) => {
        let newText = text.replace(new RegExp(',', 'g'), '');
        // remove all occurrence of the comma character ',' in text gloablly
        if (newText) setPrice(parseFloat(newText));
        else setPrice(0);
        
    }

    const [charge, setCharge] = useState(3500);
    
    // function to update charge
    const updateCharge = (text) => {
        let newText = text.replace(new RegExp(',', 'g'), '');
        // remove all occurrence of the comma character ',' in text gloablly
        if (newText) setCharge(parseFloat(newText));
        else setCharge(0);
        
    }

    // response from ChatGPT after extracting order details
    const [products, setProducts] = useState([
        {
            id: 2,
            product_name: "Maybach Sunglasses",
            quantity: 1,
            imageUrl: require("../assets/images/maybach-sunglasses.png"),
        },
    ]);

    // decrease product quantity
    const decreaseQuantity = (id) => {
        setProducts(prevProducts => {
            return prevProducts.map(product => {
                if (product.id === id) {
                    let decrement;
                    if (product.quantity === 1) decrement = 0;
                    else decrement = 1
                    return {
                        ...product,
                        quantity: product.quantity -= decrement,
                    }
                } else {
                    return product
                }
            })
        })
    }

    // increase product quantity
    const increaseQuantity = (id) => {
        setProducts(prevProducts => {
            return prevProducts.map(product => {
                if (product.id === id) {
                    return {
                        ...product,
                        quantity: product.quantity += 1,
                    }
                } else {
                    return product
                }
            })
        })
    }

    // function to remove product
    const removeProduct = (id) => {
        const newProduct = products.filter((product) => product.id !== id);
        setProducts(newProduct);
    }

    // function to addProducts, the function is called in the select product modal
    const addProducts = (productsList) => {
        setProducts(productsList);
        closeModal();
        // console.log(productsList)
    }

    // chat header component
    const ChatHeader = (
        <View style={style.headerInfoWrapper}>
            <Image 
                source={imageUrl ? imageUrl : require("../assets/images/default.png")}
                style={style.headerImage}
            />
            <View style={style.headerTextWrapper}>
                <Text style={style.headerPrimaryText}>{name}</Text>
                <Text style={style.headerSecondaryText}>Order ID: Y5lq3xgCK9rkKRD7oJ4Q</Text>
            </View>
        </View>
    );

    // modal overlay
    const [showOverlay, setShowOverlay] = useState(false);

    // modal state
    const [modal, setModal] = useState({
        type: "Open with",
        snapPoints: ["25%"],
    });

    const [linkPhoneNumber, setLinkPhoneNumber] = useState("");

    
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
    };

    // open modal function
    const openModal = (type) => {
        // open bottomsheet modal
        bottomSheetModalRef.current?.present();
        // set overlay
        setShowOverlay(true);
        // set modal type
        if (type === "Open with") {
            return setModal({
                type: type,
                snapPoints: ["25%"],
            });
        } else if (type === "") {
            return setModal({
                type: type,
                snapPoints: ["30%"],
            });
        } else {
            return setModal({
                type: type,
                snapPoints: ["80%"],
            });
        } 
    }

    const handleOnPressPhoneNumber = (phoneNumber) => {
        openModal("Open with");
        setLinkPhoneNumber(phoneNumber);
    }

    const handleEditOrder = () => {
        openModal("Edit order");
    }


    const hanldeCloseCalender = () => {
        setCalender({
            ...calender,
            open: false,
        })
    }

    const hanldeOpenCalender = () => {
        setCalender({
            ...calender,
            open: true,
        })
    }

    const [rescheduleDate, setRescheduleDate] = useState("")

    const [calender, setCalender] = useState({
        open: false,
        close: hanldeCloseCalender,
        setDate: setRescheduleDate
    });
    
    // order buttons
    const orderButtons = [
        {
            id: 1,
            name: "Reschedule",
            onPress: hanldeOpenCalender
        },
        {
            id: 2,
            name: "Cancel",
            onPress: () => {}
        },
        {
            id: 3,
            name: "Dispatch",
            onPress: () => {}
        },
        {
            id: 4,
            name: "Deliver",
            onPress: () => {}
        },
    ]

    // waybill buttons
    const waybillButton = {
        name: "Received",
        onPress: () => {}
    }
    
    const templateText = `This is Komitex Logistics you ordered for Maybach Sunglasses at ₦38,000 online, would you be available to receive it today?`;

    const dialPhoneNumber = () => {
        Linking.openURL('tel:'+linkPhoneNumber);
    };

    const sendSms = () => {
        const url = `sms:${linkPhoneNumber}?body=${encodeURIComponent(templateText)}`;
        Linking.openURL(url);
    };

    const sendWhatsAppMessage = () => {
        const url = `whatsapp://send?phone=${linkPhoneNumber}&text=${encodeURIComponent(templateText)}`;
        Linking.openURL(url);
    };

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const openDocument = async (documentUrl) => {
        try {
            const supported = await Linking.canOpenURL(documentUrl);
            if (supported) {
                await Linking.openURL(documentUrl);
            } else {
                // console.log("No apps available to open this document");
            }
        } catch (error) {
            // console.error("An error occurred while opening the document:", error);
        }
    };

    // MESSAGES MESSAGES MESSAGES MESSAGES
    // MESSAGES MESSAGES MESSAGES MESSAGES
    // MESSAGES MESSAGES MESSAGES MESSAGES
    const [messages, setMessages] = useState([
        {
            reschedule_date: () => {},
            id: 1,
            seen: true,
            user_id: "hjsdjkji81899",
            fullname: "Iffie Ovie",
            company_name: 'Mega Enterprise',
            color: messageSenderColors[0],
            type: 'message',
            timestamp: () => {
                const currentTime = new Date();
                currentTime.setMinutes(currentTime.getMinutes() - 50);
                return currentTime.getTime();
            },
            account_type: 'Merchant',
            file: null,
            reply: false,
            text: 'Hello',
        },
        {
            reschedule_date: () => {},
            id: 2,
            seen: true,
            user_id: "hayaFGye67qY",
            fullname: "John Mark",
            color: messageSenderColors[1],
            company_name: 'Komitex Logistics',
            type: 'message',
            timestamp: () => {
                const currentTime = new Date();
                currentTime.setMinutes(currentTime.getMinutes() - 45);
                return currentTime.getTime();
            },
            account_type: 'Logistics',
            file: null,
            reply: false,
            text: 'Hello',
        },
        {
            reschedule_date: () => {},
            id: 3,
            seen: true,
            user_id: "hayaFGye67qY",
            fullname: "John Mark",
            company_name: 'Komitex Logistics',
            color: messageSenderColors[1],
            type: 'message',
            timestamp: () => {
                const currentTime = new Date();
                currentTime.setMinutes(currentTime.getMinutes() - 42);
                return currentTime.getTime();
            },
            account_type: 'Logistics',
            file: null,
            reply: false,
            text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus, labore aperiam blanditiis ex dolor sit?',
        },
        {
            reschedule_date: () => {},
            id: 4,
            seen: true,
            user_id: "hayaKGye67q4",
            fullname: "Felix Jones",
            company_name: 'Mega Enterprise',
            type: 'message',
            color: messageSenderColors[2],
            account_type: 'Merchant',
            file: null,
            reply: false,
            timestamp: () => {
                const currentTime = new Date();
                currentTime.setMinutes(currentTime.getMinutes() - 40);
                return currentTime.getTime();
            },
            text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores blanditiis, sunt, veritatis hic at ipsa quo, rerum corporis mollitia suscipit esse laudantium  iure recusandae vel praesentium. Harum esse deserunt amet.',
        },
        {
            reschedule_date: () => {},
            id: 5,
            seen: true,
            user_id: "hayaFGye67qY",
            fullname: "John Mark",
            company_name: 'Komitex Logistics',
            color: messageSenderColors[1],
            type: 'message',
            timestamp: () => {
                const currentTime = new Date();
                currentTime.setMinutes(currentTime.getMinutes() - 35);
                return currentTime.getTime();
            },
            account_type: 'Logistics',
            file: null,
            reply: false,
            text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint labore, optio accusantium magni ipsa cupiditate corrupti, tempore sunt omnis voluptate libero ad sapiente. Quibusdam quaerat dolorem architecto perferendis numquam aspernatur nesciunt sed expedita recusandae, voluptatem ipsum odit excepturi a amet suscipit repellat, quidem, officia eum mollitia quisquam cumque neque fuga aperiam. Aut nam sunt sit mollitia iste odio magnam iusto? Animi quaerat et delectus maiores corrupti corporis! Aperiam, sint? Praesentium placeat quibusdam dolor, eveniet quae velit nesciunt similique sed sunt aspernatur possimus et ipsum, incidunt optio quam nulla sint maxime nisi error alias. Reiciendis, consectetur eveniet tenetur ut doloremque sed?',
        },
        {
            reschedule_date: () => {},
            id: 6,
            seen: true,
            user_id: "hayaKGOe67q4",
            fullname: "John Doe",
            company_name: 'Mega Enterprise',
            color: messageSenderColors[3],
            type: 'message',
            account_type: 'Merchant',
            file: null,
            reply: false,
            timestamp: () => {
                const currentTime = new Date();
                currentTime.setMinutes(currentTime.getMinutes() - 30);
                return currentTime.getTime();
            },
            seen: true,
            seen: true,
            text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus illum perspiciatis tempora dolore inventore rerum architecto nam at accusamus vitae eos, in fugit dolores, quod recusandae sapiente? Blanditiis, temporibus saepe beatae reprehenderit delectus eius a. Animi deleniti, sed, beatae excepturi quis aliquid tempore debitis, voluptatum hic pariatur sint veniam velit. Ad ullam vero atque voluptatibus iste provident nesciunt similique, praesentium voluptatum dolorum obcaecati sint voluptas aperiam saepe temporibus dolores illum, unde qui optio quo ratione quod. Ratione ipsam deserunt unde obcaecati fuga quos numquam! Illo consectetur nihil cumque dolor. Facilis enim odit vel quisquam dolorum incidunt mollitia accusantium at corporis quasi fugiat, cumque officia voluptatum id deserunt. Obcaecati distinctio deserunt ut delectus beatae, ipsam aliquam expedita, ea libero asperiores nobis quam facere veritatis ratione quasi natus maxime nihil fuga repellat eveniet cum, dicta suscipit totam? Earum sed magnam esse eveniet iusto deleniti tempore assumenda debitis tenetur soluta quibusdam nihil, id repellat minus voluptatum fugit aspernatur quasi quos illum blanditiis accusantium inventore? Mollitia obcaecati, consequatur quibusdam harum expedita hic illum soluta nam amet blanditiis asperiores in aperiam magni molestiae eligendi, itaque maxime iure consequuntur. Voluptas ad cum aperiam esse expedita nihil repudiandae accusamus, velit earum praesentium rerum, molestias aliquam exercitationem cumque!',
        },
        {
            reschedule_date: () => {},
            id: 7,
            seen: true,
            user_id: "HayaFGye67qY",
            fullname: "John Mark",
            company_name: 'Komitex Logistics',
            color: messageSenderColors[1],
            type: 'message',
            timestamp: () => {
                const currentTime = new Date();
                currentTime.setMinutes(currentTime.getMinutes() - 25);
                return currentTime.getTime();
            },
            account_type: 'Logistics',
            file: null,
            reply: false,
            text: 'Lorem ipsum, dolor sit.',
        },
        {
            reschedule_date: () => {},
            id: 8,
            seen: true,
            user_id: "HayaFGye67qY",
            fullname: "John Mark",
            company_name: 'Komitex Logistics',
            color: messageSenderColors[1],
            type: 'message',
            timestamp: () => {
                const currentTime = new Date();
                currentTime.setMinutes(currentTime.getMinutes() - 25);
                return currentTime.getTime();
            },
            account_type: 'Logistics',
            file: null,
            reply: false,
            text: 'Velit earum praesentium rerum, molestias aliquam exercitationem cumque!',
        },
        {
            reschedule_date: () => {},
            id: 9,
            seen: true,
            user_id: "hayaKGye67q4",
            fullname: "Felix Jones",
            company_name: 'Mega Enterprise',
            color: messageSenderColors[2],
            type: 'message',
            timestamp: () => {
                const currentTime = new Date();
                currentTime.setMinutes(currentTime.getMinutes() - 22);
                return currentTime.getTime();
            },
            account_type: 'Merchant',
            file: null,
            reply: 5,
            text: 'Okay, understood 👍🏾',
        },
        {
            reschedule_date: () => {},
            id: 10,
            seen: true,
            user_id: "hjsdjkji81899",
            fullname: "Iffie Ovie",
            company_name: 'Mega Enterprise',
            color: messageSenderColors[0],
            type: 'message',
            timestamp: () => {
                const currentTime = new Date();
                currentTime.setMinutes(currentTime.getMinutes() - 20);
                return currentTime.getTime();
            },
            account_type: 'Merchant',
            file: null,
            reply: false,
            text: 'Call him now, hes expecting your call',
        },
        {
            reschedule_date: () => {},
            id: 11,
            seen: true,
            user_id: "HayaFGye67qY",
            fullname: "John Mark",
            company_name: 'Komitex Logistics',
            color: messageSenderColors[1],
            type: 'message',
            timestamp: () => {
                const currentTime = new Date();
                currentTime.setMinutes(currentTime.getMinutes() - 25);
                return currentTime.getTime();
            },
            account_type: 'Logistics',
            file: null,
            reply: 9,
            text: 'Velit earum praesentium rerum, molestias aliquam exercitationem cumque!',
        },
        {
            reschedule_date: () => {},
            id: 12,
            seen: true,
            user_id: "hayaKGOe67q4",
            fullname: "John Doe",
            company_name: 'Mega Enterprise',
            color: messageSenderColors[3],
            type: 'image',
            account_type: 'Merchant',
            file: {
                name: 'image',
                path: require('../assets/chat/3.jpeg')
            },
            reply: false,
            timestamp: () => {
                const currentTime = new Date();
                currentTime.setMinutes(currentTime.getMinutes() - 24);
                return currentTime.getTime();
            },
            text: null,
        },
        {
            reschedule_date: () => {},
            id: 13,
            seen: true,
            user_id: "HayaFGye67qY",
            fullname: "John Mark",
            company_name: 'Komitex Logistics',
            color: messageSenderColors[1],
            type: 'image',
            timestamp: () => {
                const currentTime = new Date();
                currentTime.setMinutes(currentTime.getMinutes() - 23);
                return currentTime.getTime();
            },
            account_type: 'Logistics',
            file: {
                name: 'image',
                path: require('../assets/chat/2.jpg')
            },
            reply: 9,
            text: 'Velit earum praesentium rerum!',
        },
        {
            reschedule_date: () => {},
            id: 14,
            seen: true,
            user_id: "hayaKGOe67q4",
            fullname: "John Doe",
            company_name: 'Mega Enterprise',
            color: messageSenderColors[3],
            type: 'image',
            account_type: 'Merchant',
            file: {
                name: 'image',
                path: require('../assets/chat/1.jpg')
            },
            reply: false,
            timestamp: () => {
                const currentTime = new Date();
                currentTime.setMinutes(currentTime.getMinutes() - 21);
                return currentTime.getTime();
            },
            text: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti cupiditate excepturi ratione aperiam fugiat, provident molestiae repellendus. Deserunt, consequatur est.`,
        },
        {
            reschedule_date: () => {},
            id: 15,
            seen: true,
            user_id: "HayaFGye67qY",
            fullname: "John Mark",
            company_name: 'Komitex Logistics',
            color: messageSenderColors[1],
            type: 'image',
            timestamp: () => {
                const currentTime = new Date();
                currentTime.setMinutes(currentTime.getMinutes() - 20);
                return currentTime.getTime();
            },
            account_type: 'Logistics',
            file: {
                name: 'image',
                path: require('../assets/chat/4.jpg')
            },
            reply: 6,
            text: null,
        },
        {
            reschedule_date: () => {},
            id: 16,
            seen: true,
            user_id: "hayaKGOe67q4",
            fullname: "John Doe",
            company_name: 'Mega Enterprise',
            color: messageSenderColors[3],
            type: 'message',
            account_type: 'Merchant',
            file: null,
            reply: 12,
            timestamp: () => {
                const currentTime = new Date();
                currentTime.setMinutes(currentTime.getMinutes() - 20);
                return currentTime.getTime();
            },
            text: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam, rem!`,
        },
        {
            reschedule_date: () => {},
            id: 17,
            seen: true,
            user_id: "hayaKGOe67q4",
            fullname: "John Doe",
            company_name: 'Mega Enterprise',
            color: messageSenderColors[3],
            type: 'message',
            account_type: 'Merchant',
            file: null,
            reply: 13,
            timestamp: () => {
                const currentTime = new Date();
                currentTime.setMinutes(currentTime.getMinutes() - 20);
                return currentTime.getTime();
            },
            text: `Lorem ipsum dolor!`,
        },
        {
            reschedule_date: () => {},
            id: 18,
            seen: true,
            user_id: "HayaFGye67qY",
            fullname: "John Mark",
            company_name: 'Komitex Logistics',
            color: messageSenderColors[1],
            type: 'message',
            timestamp: () => {
                const currentTime = new Date();
                currentTime.setMinutes(currentTime.getMinutes() - 20);
                return currentTime.getTime();
            },
            account_type: 'Logistics',
            file: null,
            reply: 14,
            text: 'J Hus activate all your Chakra 🧘🏾🧘🏾‍♀️🧘🏾‍♀️',
        },
        {
            reschedule_date: () => {},
            id: 19,
            seen: true,
            user_id: "HayaFGye67qY",
            fullname: "John Mark",
            company_name: 'Komitex Logistics',
            color: messageSenderColors[1],
            type: 'message',
            timestamp: () => {
                const currentTime = new Date();
                currentTime.setMinutes(currentTime.getMinutes() - 18);
                return currentTime.getTime();
            },
            account_type: 'Logistics',
            file: null,
            reply: 15,
            text: 'Put my hands in every Pie 🍕🍕🍕',
        },
        {
            reschedule_date: () => {},
            id: 20,
            seen: true,
            user_id: "hjsdjkji81899",
            fullname: "Iffie Ovie",
            company_name: 'Mega Enterprise',
            color: messageSenderColors[0],
            type: 'document',
            timestamp: () => {
                const currentTime = new Date();
                currentTime.setMinutes(currentTime.getMinutes() - 15);
                return currentTime.getTime();
            },
            account_type: 'Merchant',
            file: {
                name: 'ovie-resumé',
                url: '../assets/chat/ovie-resumé.pdf',
                size: '128KB',
                format: 'pdf',
            },
            reply: false,
            text: null,
        },
        {
            reschedule_date: () => {},
            id: 21,
            seen: true,
            user_id: "hjsdjkji81899",
            fullname: "Iffie Ovie",
            company_name: 'Mega Enterprise',
            color: messageSenderColors[0],
            type: 'message',
            timestamp: () => {
                const currentTime = new Date();
                currentTime.setMinutes(currentTime.getMinutes() - 15);
                return currentTime.getTime();
            },
            account_type: 'Merchant',
            file: null,
            reply: 1,
            text: 'Testing...',
        },
        {
            reschedule_date: () => {},
            id: 22,
            seen: true,
            user_id: "hjsdjkji81899",
            fullname: "Iffie Ovie",
            company_name: 'Mega Enterprise',
            color: messageSenderColors[0],
            type: 'message',
            timestamp: () => {
                const currentTime = new Date();
                currentTime.setMinutes(currentTime.getMinutes() - 14);
                return currentTime.getTime();
            },
            account_type: 'Merchant',
            file: null,
            reply: 20,
            text: 'This is the file I mentioned earlier',
        },
        {
            reschedule_date: () => {},
            id: 23,
            seen: true,
            user_id: "HayaFGye67qY",
            fullname: "John Mark",
            company_name: 'Komitex Logistics',
            color: messageSenderColors[1],
            type: 'message',
            timestamp: () => {
                const currentTime = new Date();
                currentTime.setMinutes(currentTime.getMinutes() - 11);
                return currentTime.getTime();
            },
            account_type: 'Logistics',
            file: null,
            reply: 20,
            text: `Send the document in MS Word format for easy editing`,
        },
        {
            reschedule_date: () => {},
            id: 24,
            seen: true,
            user_id: "HayaFGye67qY",
            fullname: "John Mark",
            company_name: 'Komitex Logistics',
            color: messageSenderColors[1],
            type: 'message',
            timestamp: () => {
                const currentTime = new Date();
                currentTime.setMinutes(currentTime.getMinutes() - 11);
                return currentTime.getTime();
            },
            account_type: 'Logistics',
            file: null,
            reply: false,
            text: `Don't worry let me convert it`,
        },
        {
            reschedule_date: () => {},
            id: 25,
            seen: true,
            user_id: "HayaFGye67qY",
            fullname: "John Mark",
            company_name: 'Komitex Logistics',
            color: messageSenderColors[1],
            type: 'document',
            timestamp: () => {
                const currentTime = new Date();
                currentTime.setMinutes(currentTime.getMinutes() - 10);
                return currentTime.getTime();
            },
            account_type: 'Logistics',
            file: {
                name: 'Ovie-resumé',
                url: '../assets/chat/ovie-resumé.pdf',
                size: '128KB',
                format: 'docx',
            },
            reply: false,
            text: `I converted it to .docx`,
        },
        {
            id: 26,
            seen: true,
            user_id: "hjsdjkji81899",
            fullname: "Iffie Ovie",
            company_name: 'Mega Enterprise',
            color: messageSenderColors[0],
            type: 'message',
            timestamp: () => {
                const currentTime = new Date();
                currentTime.setMinutes(currentTime.getMinutes() - 8);
                return currentTime.getTime();
            },
            account_type: 'Merchant',
            file: null,
            reply: 25,
            text: 'Okay thanks 👍🏾',
            reschedule_date: () => {},
        },
        {
            id: 27,
            seen: true,
            user_id: "hayaKGOe67q4",
            fullname: "John Doe",
            company_name: 'Mega Enterprise',
            color: messageSenderColors[0],
            type: 'Rescheduled',
            timestamp: () => {
                const currentTime = new Date();
                currentTime.setMinutes(currentTime.getMinutes() - 5);
                return currentTime.getTime();
            },
            account_type: 'Merchant',
            file: null,
            reply: false,
            text: 'The customer travelled and would return on saturday',
            reschedule_date: () => {
                const currentDate = new Date();
                const futureDate = new Date(currentDate.setDate(currentDate.getDate() + 3));
                
                const options = { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' };
                const formattedDate = futureDate.toLocaleDateString('en-US', options);
                
                return formattedDate;
            }
        },
        {
            id: 28,
            seen: true,
            user_id: "HayaFGye67qY",
            fullname: "John Mark",
            company_name: 'Komitex Logistics',
            color: messageSenderColors[1],
            type: 'Cancelled',
            timestamp: () => {
                const currentTime = new Date();
                currentTime.setMinutes(currentTime.getMinutes() - 3);
                return currentTime.getTime();
            },
            account_type: 'Logistics',
            file: null,
            reply: false,
            text: 'I just called him he said he actually doesn\'t know when he would return, cancel for now',
            reschedule_date: () => {}
        },
    ]);

    const sendMessage = () => {
        if (textInput === "" && uploading === false) return;
        else {
            setMessages([
                ...messages,
                {
                    id: Math.random(),
                    seen: false,
                    user_id: userId,
                    fullname: fullname,
                    company_name: companyName,
                    account_type: accountType,
                    color: messageSenderColors[0],
                    type: 'message',
                    timestamp: () => {
                        const currentTime = new Date();
                        return currentTime.getTime();
                    },
                    file: null,
                    reply: replying ? replying : false,
                    reschedule_date: () => {},
                    text: textInput,
                }   
            ])
            setTextInput("");
            setReplying(null);
            hasScrolledToBottom.current = false;
            scrollToBottom(true);
        }
    }

    // function to get the first word in a string
    const getFirstWord = (str) => {
        return str.split(" ")[0];
    }

    const messageSenderName = (user_id, full_name, reply) => {
        if (reply) {
            if (userId === user_id) return "You replied"
            return `${full_name} replied`;
            // return "You replied"
        } else {
            return userId === user_id ? "Me" : full_name 
        }
    }

    const messageSender = (account_type, user_id, full_name, prev_id, company_name, color, reply, orderDetails) => {

        if (orderDetails) {
            return account_type === "Merchant" ? (
                <Text 
                    style={[
                        style.messageSender, 
                        style.myTeam, 
                        {color: user_id === userId ? accent : color}
                    ]}
                >
                    {user_id === userId ? "Me" : full_name}
                </Text>
            ) : (
                <Text 
                    style={[
                        style.messageSender, 
                        style.otherTeam, 
                        {color: primaryColor}
                    ]}
                >
                    {company_name}
                </Text>
            )
        }

        if (accountType === account_type) {
            return prev_id !== user_id && (
                <Text 
                    style={[
                        style.messageSender, 
                        style.myTeam, 
                        {color: user_id === userId ? accent : color}
                    ]}
                >
                    {/* {user_id !== userId && full_name} */}
                    {messageSenderName(user_id, full_name, reply)}
                </Text>
            )
        } else {
            return prev_id !== user_id && (
                <Text style={[style.messageReceiver, style.otherTeam, {color: primaryColor}]}>
                    {company_name} {reply && "replied"} 
                </Text>
            )
        }
    };

    const replyingSenderName = (targetMessage) => {

        if (accountType !== targetMessage.account_type) {
            return targetMessage.company_name;
        }

        return userId === targetMessage.user_id ? "You" : targetMessage.fullname
    }

    const replyingSenderText = (targetMessage) => {

        return targetMessage.text.length > 175 ? targetMessage.text.slice(0, 175) + "..." : targetMessage.text;
    }

    const ReplyingMessageInput = (id) => {
        const targetMessage = messages.find(message => message.id === id);
        
        return (
            <View style={style.replyingInputWrapper}>
                <View style={style.replyingMessageWrapper}>
                    <Text style={style.replyingMessageSender}>
                        Replying to {replyingSenderName(targetMessage)}
                    </Text>
                    { targetMessage.type === 'image' && (
                        <>
                            <View style={style.replyingImageWrapper}>
                                <RepliedImageIcon />
                                <Text style={style.messageType}>Image</Text>
                            </View>
                            <View style={style.replyingImageContainer}>
                                <Image source={targetMessage.file.path} style={style.repliedImage} />
                            </View>
                        </>
                    )}
                    { targetMessage.type === 'document' && (
                        <>
                            <View style={style.replyingImageWrapper}>
                                <RepliedDocumentIcon />
                                <Text style={style.messageType}>{targetMessage.file.name}</Text>
                            </View>
                        </>
                    )}
                    { targetMessage.text && (
                        <Text style={style.replyingMessage}>
                            {replyingSenderText(targetMessage)}
                        </Text>
                    )}
                </View>
                <TouchableOpacity
                    onPress={() => {
                        setReplying(null)
                    }}
                    style={style.replyingCloseButton}
                >
                    <CloseIcon />
                </TouchableOpacity>
            </View>

        )
    }



    return (
        <>
            {/* chat header */}
            <View style={style.headerContainer}>
                {/* header component */}
                <Header
                    navigation={navigation}
                    stackName={ChatHeader}
                    iconFunction={() => {}}
                    icon={<MenuIcon />}
                    removeBackArrow={true}
                    inlineArrow={true}
                    backgroundColor={white}
                />
            </View>

            {/* out of stock indicator */}
            { outOfStock && (
                <View style={style.indicatorWrapper}>
                    <Indicator 
                        type={"Cancelled"}
                        text={"Out of stock"}
                    />
                </View>
            )}

            {/* <TouchableWithoutFeedback> */}
                <ScrollView 
                    ref={scrollViewRef}
                    onLayout={() => scrollToBottom(false)}
                    showsVerticalScrollIndicator={true}
                    style={style.scrollView}
                    contentContainerStyle={style.scrollViewContent}
                    keyboardShouldPersistTaps="always"
                >
                    {/* message overlay */}
                    <View 
                        style={[
                            style.messageOverlay,
                            {
                                top: messageOverlay.top,
                                height: messageOverlay.height,
                                pointerEvents: 'none',
                            }
                        ]} 
                    />
                    <View style={style.container}>
                        {/* fixed header container */}
                        {/* chat scroll view */}
                        <View style={style.messagesWrapper}>
                            <View style={style.dateWrapper}>
                                <Text style={style.dateText}>{"Friday July 7, 2023"}</Text>
                            </View>

                            <View style={[style.editButtonWrapper, accountType === "Merchant" && {justifyContent: 'flex-end'}]}>
                                <TouchableOpacity 
                                    style={style.editButton}
                                    onPress={handleEditOrder}
                                >
                                    <EditIcon />
                                    <Text style={style.editButtonText}>Edit Order</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={style.messageContent}>
                                {messageSender(accountType, userId, fullname, postOrderUserId, companyName, accent, false, true)}
                                <View 
                                    style={[
                                        style.message,
                                        {padding: 10},
                                        accountType === "Merchant" ? style.sent : style.received
                                    ]}
                                >
                                    <Text style={[style.messageHeading, accountType === "Merchant" && style.sentHeading]}>
                                        <Text style={[style.messageText, accountType === "Merchant" && style.sentText]}>
                                            Customer's Name: 
                                        </Text>
                                        Richard Idana
                                    </Text>

                                    <Text style={[style.messageHeading, accountType === "Merchant" && style.sentHeading]}>
                                        <Text style={[style.messageText, accountType === "Merchant" && style.sentText]}>Phone Number: </Text>
                                        <TouchableOpacity 
                                            style={style.linkButton}
                                            onPress={() => {handleOnPressPhoneNumber("08123456789")}}
                                        >
                                            <Text style={accountType === "Merchant" ? style.sentLinkText : style.receivedLinkText}>
                                                08123456789
                                            </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity 
                                            style={style.linkButton}
                                            onPress={() => {handleOnPressPhoneNumber("08165266847")}}
                                        >
                                            <Text style={accountType === "Merchant" ? style.sentLinkText : style.receivedLinkText}>
                                                08165266847
                                            </Text>
                                        </TouchableOpacity>
                                    </Text>
                                    <Text style={[style.messageHeading, accountType === "Merchant" && style.sentHeading]}>
                                        <Text style={[style.messageText, accountType === "Merchant" && style.sentText]}>Delivery Address: </Text>
                                        No 3 Izomo street odu roadwarri, delta state
                                    </Text>
                                    <Text style={[style.messageHeading, accountType === "Merchant" && style.sentHeading]}>
                                        <Text style={[style.messageText, accountType === "Merchant" && style.sentText]}>Location: </Text>
                                        Warri (₦3,000)
                                    </Text>
                                    <Text style={[style.messageHeading, accountType === "Merchant" && style.sentHeading]}>
                                        <Text style={[style.messageText, accountType === "Merchant" && style.sentText]}>Product: </Text>
                                        Maybach Sunglasses x 1
                                    </Text>
                                    <Text style={[style.messageHeading, accountType === "Merchant" && style.sentHeading]}>
                                        <Text style={[style.messageText, accountType === "Merchant" && style.sentText]}>Price: </Text>
                                        ₦38,000
                                    </Text>
                                    <Text style={[style.messageHeading, accountType === "Merchant" && style.sentHeading]}>
                                        <Text style={[style.messageText, accountType === "Merchant" && style.sentText]}>Logistics: </Text>
                                        Komitex Logistics
                                    </Text>
                                </View>
                                <Text style={[style.timeSent, style.myTeam]}>{postOrderTimestamp}</Text>
                            </View>
                            

                            {messages.map((message, index) => {


                                return (
                                    <MessageContainer
                                        key={message.id}
                                        messagesRefs={messagesRefs}
                                        message={message}
                                        messages={messages}
                                        index={index}
                                        products={products}
                                        handleScrollToComponent={handleScrollToComponent}
                                        setReplying={setReplying}
                                        textInputRef={textInputRef}
                                        navigation={navigation}
                                    />
                                );
                            })}

                        </View>
                    </View>
                </ScrollView>
            {/* </TouchableWithoutFeedback> */}

            {/* text field wrapper */}
            <View style={style.textFieldWrapper}>
                { !replying && !uploading && (
                    <View style={style.actionButtonsWrapper}>
                        { type === "Order" && orderButtons.map((button) => {
                            if (accountType === "Merchant"){
                                if (button.id === 1 || button.id === 2){
                                    return <ActionButton
                                        key={button.id}
                                        name={button.name}
                                        onPress={button.onPress}
                                    />
                                }
                            } else {
                                return <ActionButton
                                    key={button.id}
                                    name={button.name}
                                    onPress={button.onPress}
                                />
                            }
                        })}

                        { type === "Waybill" && accountType === "Logistics" && (
                            <ActionButton 
                                name={waybillButton.name}
                                onPress={waybillButton.onPress}
                            />
                        )}
                    </View>
                )}
                { replying && ReplyingMessageInput(replying) }
                <View style={style.inputGroupWrapper}>
                    <View style={style.textInputContainer}>
                        <TextInput 
                            style={style.textInput}
                            placeholder="Write a message..."
                            placeholderTextColor={bodyText}
                            multiline={true}
                            numberOfLines={1}
                            onChangeText={updateTextInput}
                            defaultValue={textInput}
                            ref={textInputRef}
                        />
                        <TouchableOpacity
                            style={[style.attachButton, style.fixedButton]}
                            onPress={() => {
                                openModal("")
                            }}
                        >
                            <PaperClipIcon />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        style={style.sendButton}
                        onPress={sendMessage}
                    >
                        <SendIcon />
                    </TouchableOpacity>
                </View>
            </View>

            {/* calender */}
            <Calender 
                open={calender.open}
                closeCalender={calender.close}
                setDate={calender.setDate}
                disableActionButtons={true}
                minDate={tomorrow} 
            />
            
            {/* Bottom sheet component */}
            <CustomBottomSheet 
                bottomSheetModalRef={bottomSheetModalRef}
                setShowOverlay={setShowOverlay}
                showOverlay={showOverlay}
                closeModal={closeModal}
                snapPointsArray={modal.snapPoints}
                autoSnapAt={0}
                sheetTitle={modal.type}
            >
                {/* edit order */}
                { modal.type === "Edit order" && (
                    <>
                        <BottomSheetScrollView contentContainerStyle={style.modalWrapper}>
                            <View style={style.modalContent}>
                                <Text style={style.editModalParagragh}>
                                    We all make mistakes, use the available fields to make to edit your order
                                </Text>
                                {/* Selected Products Container */}
                                <View style={style.productsWrapper}>
                                    <View style={style.productsHeading}>
                                        <Text style={style.producPlaceholder}>Products Selected</Text>
                                        <TouchableOpacity
                                            onPress={() => openModal("Products", "Select Products", null, 0)}
                                        >
                                            <Text style={style.addProduct}>+Add Product</Text>
                                        </TouchableOpacity>
                                    </View>
                                    { products.length !== 0 ? products.map((product) => (
                                        // map through selected products
                                        <Product 
                                            key={product.id} 
                                            product={product} 
                                            removeProduct={removeProduct}
                                            increaseQuantity={increaseQuantity}
                                            decreaseQuantity={decreaseQuantity}
                                            invertColor={true}
                                        />
                                    )) : (
                                        // show no product selected component
                                        <View style={style.noProductWrapper}>
                                            <Text style={style.noProductText}>
                                                No product selected. Kindly add a new product 
                                                or select one from your inventory
                                            </Text>
                                        </View>
                                    )}
                                </View>
                                {/* select location */}
                                <SelectInput
                                    label={"Location"}
                                    placeholder={"Location"}
                                    value={"Warri"}
                                    inputFor={"String"}
                                    onPress={() => {}}
                                />
                                {/* price input fields */}
                                <Input
                                    label={"Price"}
                                    placeholder={"Price"}
                                    adornment={"₦"}
                                    value={price ? price.toLocaleString() : ''}
                                    onChange={updatePrice}
                                />
                                {/* charge input fields */}
                                <Input
                                    label={"Charge"}
                                    placeholder={"Charge"}
                                    adornment={"₦"}
                                    value={charge ? charge.toLocaleString() : ''}
                                    onChange={updateCharge}
                                />
                                
                            </View>
                        </BottomSheetScrollView>
                        <ModalButton
                            name={"Done"}
                        />
                    </>
                )}
                {/* onclick phone number */}
                { modal.type === "Open with" && (
                    <View style={style.uploadButtonsWrapper}>
                        <TouchableOpacity
                            style={style.uploadButton}
                            onPress={dialPhoneNumber}
                        >
                            <View style={style.uploadIconWrapper}>
                                <CallPrimaryIcon />
                            </View>
                            <Text style={style.uploadButtonText}>Call</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={style.uploadButton}
                            onPress={sendSms}
                        >
                            <View style={style.uploadIconWrapper}>
                                <SmsPrimaryIcon />
                            </View>
                            <Text style={style.uploadButtonText}>Sms</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={style.uploadButton}
                            onPress={sendWhatsAppMessage}
                        >
                            <View style={style.uploadIconWrapper}>
                                <WhatsAppIcon />
                            </View>
                            <Text style={style.uploadButtonText}>WhatsApp</Text>
                        </TouchableOpacity>
                    </View>   
                )}
                {/* onclick phone number */}
                { modal.type === "" && (
                    <View style={style.uploadButtonsWrapper}>
                        <TouchableOpacity
                            style={style.uploadButton}
                        >
                            <View style={style.uploadIconWrapper}>
                                <CameraPrimaryLargeIcon />
                            </View>
                            <Text style={style.uploadButtonText}>Camera</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={style.uploadButton}
                        >
                            <View style={style.uploadIconWrapper}>
                                <GalleryIcon />
                            </View>
                            <Text style={style.uploadButtonText}>Gallery</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={style.uploadButton}
                        >
                            <View style={style.uploadIconWrapper}>
                                <DocumentIcon />
                            </View>
                            <Text style={style.uploadButtonText}>Document</Text>
                        </TouchableOpacity>
                    </View>   
                )}
            </CustomBottomSheet>
        </>
    );
}

const style = StyleSheet.create({
    scrollView: {
        position: 'relative',
        backgroundColor: white,
        height: '100%',
    },
    scrollViewContent: {
        backgroundColor: white,
        position: 'relative',
    },
    container: {
        flex: 1,
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },
    headerContainer: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        borderBottomWidth: 1,
        borderColor: background,
        zIndex: 2,
    }, 
    headerInfoWrapper: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: "100%",
        gap: 10,
    },  
    headerImage: {
        width: 30,
        height: 30,
        borderRadius: 6,
    },
    headerPrimaryText: {
        fontSize: 14,
        fontFamily: 'mulish-medium',
        color: black,
    },  
    headerSecondaryText: {
        fontSize: 10,
        fontFamily: 'mulish-regular',
        color: bodyText,
    },
    imageBackground: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    messagesWrapper: {
        paddingTop: 60,
        paddingBottom: 130,
        paddingHorizontal: 20,
        flex: 1,
        width: "100%",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    dateWrapper: {
        width: "100%",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center', 
        marginVertical: 20, 
    },
    dateText: {
        fontFamily: 'mulish-regular',
        color: bodyText,
        fontSize: 10,
    },
    editButtonWrapper: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginBottom: 8,
    },
    editButton: {
        display: 'flex',
        flexDirection: 'row',
        gap: 12,
    },
    editButtonText: {
        fontSize: 12,
        color: primaryColor,
        fontFamily: 'mulish-medium',
    },
    indicatorWrapper: {
        position: 'absolute',
        width: "100%",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        top: 100,
        zIndex: 2,
    },
    messageContent: {
        width: "100%",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginBottom: 5,
    },
    messageOverlay: {
        position: 'absolute',
        width: "100%",
        left: 0,
        top: 0,
        height: 0,
        backgroundColor: 'transparent',
        backgroundColor: secondaryColor,
        zIndex: 2,
    },
    linkButton: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center',
        height: "100%",
        alignSelf: 'baseline',
        paddingLeft: 3,
    },
    sentLinkText: {
        fontFamily: 'mulish-semibold',
        fontSize: 10,
        marginBottom: -3,
        color: linkText,
    },
    receivedLinkText: {
        fontFamily: 'mulish-semibold',
        fontSize: 10,
        marginBottom: -3,
        color: primaryColor,
    },
    message: {
        minHeight: 33,
        maxWidth: "90%",
        minWidth: 60,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        padding: 0,
        borderRadius: 12,
        height: null,
    },
    textGroup: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: "100%",
        flexWrap: 'wrap',
    },
    sent: {
        alignSelf: 'flex-end',
        backgroundColor: primaryColor,
        borderBottomRightRadius: 0,
    },
    sentText: {
        color: white,
        // flexWrap: 'wrap',
    },
    sentHeading: {
        color: background,
    },
    messageSender: {
        fontFamily: 'mulish-semibold',
        fontSize: 10,
        marginBottom: 4,  
    },
    messageReceiver: {
        fontFamily: 'mulish-semibold',
        color: primaryColor,
        fontSize: 10,
        marginBottom: 4,  
    },
    myTeam: {
        alignSelf: 'flex-end',
    },
    otherTeam: {
        alignSelf: 'flex-start',
    },
    timeSent: {
        fontFamily: 'mulish-regular',
        color: bodyText,
        fontSize: 10,
        marginTop: 4,  
        marginBottom: 5,
    },
    received: {
        alignSelf: 'flex-start',
        backgroundColor: receivedMessage,
        borderBottomLeftRadius: 0,
    },
    messageText: {
        fontFamily: 'mulish-regular',
        fontSize: 12,
        lineHeight: 17,
        display: 'flex',
        flexDirection: 'row',
        marginTop: 10,
        gap: 10,
        justifyContent: 'flex-start',
    },
    messageHeading: {
        fontFamily: 'mulish-semibold',
        fontSize: 12,
        lineHeight: 17,
    },
    repliedMessage: {
        backgroundColor: white,
        marginTop: 10,
        borderRadius: 9,
        padding: 8,
        paddingTop: 4,
        gap: 4,
        display: 'flex',
        flexDirection: 'column',
        alignSelf: 'stretch',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    repliedImageWrapper: {
        display: 'flex',
        flexDirection: 'row',
        alignSelf: 'stretch',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    repliedUser: {
        fontFamily: 'mulish-semibold',
        lineHeight: 12.4,
        fontSize: 9.5,
        color: subText,
    },
    repliedText: {
        fontFamily: 'mulish-regular',
        lineHeight: 14.6,
        fontSize: 11,
        color: bodyText,
    },
    postedImageContainer: {
        minWidth: 100,
        maxWidth: '100%',
        minHeight: 100,
        maxHeight: 160,
        marginTop: 10,
        overflow: 'hidden',
        alignSelf: 'stretch',
        borderRadius: 12,
    },
    postedImage: {
        borderRadius: 12,
        height: "100%",
        width: "100%",
        aspectRatio: 16/9,
        resizeMode: 'cover',
    },
    imageIconContainer: {
        marginTop: 7,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        gap: 4,
    },
    messageType: {
        fontSize: 11,
        fontFamily: 'mulish-regular',
        color: bodyText
    },
    repliedImage: {
        width: 28,
        height: 28,
        borderRadius: 3.36,
    },
    documentWrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 8,
        padding: 10,
    },
    documentDescription: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        gap: 4,
    },
    documentName: {
        fontFamily: 'mulish-medium',
        fontSize: 12,
    },
    documentProperties: {
        fontFamily: 'mulish-regular',
        fontSize: 10,
    },
    actionMessageWrapper: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginTop: 10,
    },
    actionMessageTitle: {
        fontSize: 12,
        fontFamily: 'mulish-bold',
        color: black,
        marginBottom: 4,
        marginTop: 8,
    },
    actionMessageHeading: {
        fontSize: 12,
        fontFamily: 'mulish-regular',
        color: black,
    },
    actionMessageText: {
        fontSize: 12,
        fontFamily: 'mulish-semibold',
        color: black,
    },



    textFieldWrapper: {
        width: "100%",
        minHeight: 64,
        maxHeight: 170,
        backgroundColor: white,
        paddingHorizontal: 20,
        paddingVertical: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        borderTopWidth: 1,
        borderColor: background,
        justifyContent: 'center',
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        zIndex: 2,
    },
    inputGroupWrapper: {
        width: "100%",
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'flex-end',
        gap: 10,
    },
    textInputContainer: {
        minHeight: 44,
        maxHeight: 100,
        flex: 1,
        backgroundColor: background,
        // backgroundColor: "red",
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 5,
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative',
    },
    textInput: {
        fontFamily: 'mulish-regular',
        flex: 1,
        fontSize: 12,
        paddingRight: 20,
        minHeight: 20,
    },
    attachButton: {
       height: 20,
       display: 'flex',
       justifyContent: 'center',
       alignItems: 'flex-end',
       flexDirection: 'row',
    },
    fixedButton: {
        position: 'absolute',
        right: 16,
        bottom: 12,
    },
    sendButton: {
        width: 44,
        height: 44,
        backgroundColor: background,
        borderRadius: 12,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    actionButtonsWrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: "100%",
        gap: 10,
    },
    uploadButtonsWrapper: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 50,
    },
    uploadButton: {
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    uploadIconWrapper: {
        width: 50,
        height: 50,
        backgroundColor: secondaryColor,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25
    },
    uploadButtonText: {
        fontFamily: 'mulish-semibold',
        fontSize: 14,
        color: bodyText,
    },
    replyingInputWrapper: {
        width: "100%",
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    replyingMessageWrapper: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        alignSelf: 'stretch',
        gap: 6,
        position: 'relative',
    },
    replyingMessageSender: {
        fontFamily: 'mulish-regular',
        fontSize: 10,
        color: subText,
    },
    replyingMessage: {
        fontFamily: 'mulish-semibold',
        fontSize: 12,
        color: black,
    },
    replyingImageWrapper: {
        display: 'flex',
        flexDirection: 'row',
        gap: 4,
    },
    replyingImageContainer: {
        position: 'absolute',
        right: 0,
        top: 0,
    },
    replyingCloseButton: {
        display: 'flex',    
        justifyContent: 'center',
        alignItems: 'center',
    },


    modalWrapper: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        minHeight: "100%",
        width: "100%",
        paddingBottom: 10,
    },
    modalContent: {
        width: "100%",
        gap: 20,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    editModalParagragh: {
        fontFamily: 'mulish-regular',
        color: bodyText,
        fontSize: 12,
        marginBottom: 4,
        textAlign: 'center',
        maxWidth: '80%',
        alignSelf: 'center',
    },

    productsWrapper: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        justifyContent: "flex-start",
        alignContent: "center", 
        gap: 10,       
    },
    productsHeading: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",  
        gap: 12,
    },
    producPlaceholder:  {
        fontFamily: "mulish-bold",
        fontSize: 12,
        color: black,
        flex: 1,
    },
    addProduct: {
        fontFamily: "mulish-semibold",
        color: primaryColor,
        textDecorationLine: "underline",
        fontSize: 12,
    },
    noProductWrapper: {
        minHeight: 50,
        width: "100%",
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: accentLight,
        padding: 10,
        borderRadius: 12,

    },
})
 
export default Chat;