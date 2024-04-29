// react native components
import { 
    View, 
    Text, 
    TextInput, 
    TouchableOpacity,
    ScrollView, 
    StyleSheet, 
    Image,
    Keyboard,
    Linking,
    Vibration
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
import CalendarIcon from "../assets/icons/CalendarIcon";
import RemoveImageIcon from "../assets/icons/RemoveImageIcon";
import RemoveDocIcon from "../assets/icons/RemoveDocIcon";
import UploadingImageDocIcon from "../assets/icons/UploadingImageDocIcon";
import UploadingDocIcon from "../assets/icons/UploadingDocIcon";
import OrderDetailsIcon from "../assets/icons/OrderDetailsIcon";
import ChatLinkIcon from "../assets/icons/ChatLinkIcon";
import CopyTextIcon from "../assets/icons/CopyTextIcon";
import ReplyIcon from "../assets/icons/ReplyIcon";
import DeleteBlackIcon from "../assets/icons/DeleteBlackIcon";
// components
import ActionButton from "../components/ActionButton";
import Header from "../components/Header";
import Indicator from "../components/Indicator";
import AlertNewChat from "../components/AlertNewChat";
import CustomBottomSheet from "../components/CustomBottomSheet";
import AddProductsModalContent from "../components/AddProductsModalContent";
import AddLocationModalContent from "../components/AddLocationModalContent";
import Calendar from "../components/Calendar";
import Product from "../components/Product";
import CustomButton from "../components/CustomButton";
import Input from "../components/Input";
import SelectInput from "../components/SelectInput";
import MessageContainer from "../components/MessageContainer";
import MerchantProduct from "../components/MerchantProduct";
import Avatar from "../components/Avatar";
import Menu from "../components/Menu";
// import react hooks
import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
// colors
import {
    background,
    black,
    bodyText,
    primaryColor,
    white,
    secondaryColor,
    accentLight,
    messageSenderColors,
    subText,
    deliveredText,
    cancelledText,
    listSeparator,
} from "../style/colors";
// bottomsheet components
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
// moment
import moment from "moment";
// import image picker library
import * as ImagePicker from "expo-image-picker";
// import document picker library
import * as DocumentPicker from 'expo-document-picker';
// globals
import { useGlobals } from "../context/AppContext";
// data
import { messageList } from "../data/messageList";
// use Auth
import { useAuth } from "../context/AuthContext";
// helpers
import { copyToClipboard, windowHeight, windowWidth } from "../utils/helpers";

// Chat Screen
const Chat = ({navigation, route}) => {

    // auth data
    const { authData } = useAuth()

    // bottom sheet ref
    const sheetRef = useRef(null);

    // stcked sheet ref
    const stackedSheetRef = useRef(null);

    // parameters for all bottomsheets
    const {
        setBottomSheet,
        setStackedBottomSheet,
        setToast,
    } = useGlobals();

    // sheet paramteres
    const [sheetParameters, setSheetParameters] = useState({
        sheetTitle: "Open with",
        snapPointsArray: [198],
    });

    // stacked sheet parameters
    const [stackedSheetParameters, setStackedSheetParameters] = useState({
        sheetTitle: "Products",
    });

    
    // state to store text typed into reason text input
    const [reason, setReason] = useState("");

    // set bottomsheets gloabl states
    useEffect(() => {
        // set bottomsheet state
        setBottomSheet(prevState=> {
            return {...prevState, close: () => {
                sheetRef.current?.close()
                setReason("");
            }}
        });

        // set bottomsheet state
        setStackedBottomSheet(prevState=> {
            return {...prevState, close: () => stackedSheetRef.current?.close()}
        });
    }, [])
    

    // chat route parameters
    const {
        chatId,
        chatType,
        businessName,
        bannerImage,
        inventory_action,
        origin_warehouse,
        destination_warehouse,
    } = route?.params || {};

    // chat status
    const status = "Pending";

    // accoutntype, retreived from global variables
    const userId = "hjsdjkji81899";
    const companyName = "Mega Enterprise";
    const fullname = "Iffie Ovie";
    const emptyStock = false;

    // messages ref // would be changed to messages offset state
    const messagesRefs = useRef([]);

    // scroll view ref
    // required for any auto scroll action to be carried out on the screen
    const scrollViewRef = useRef();

    
    // has scrolled to bottom ref
    // stores if the screen has scrolled to bottom on mount
    const hasScrolledToBottom = useRef(false);

    // message overlay to show when auto scroll to replied message
    // it hightights a replied message, stores the height and offset of overlay
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

    // retrived from global async sorage
    const warehouseList = [
        {
            id: 1,
            warehouse_name: "Warri",
            warehouse_manager: {
                id: 1,
                full_name: "Abiodun Johnson"
            },
        },
        {
            id: 2,
            warehouse_name: "Isoko",
            warehouse_manager: {
                id: 1,
                full_name: "Abiodun Johnson"
            },
        },
        {
            id: 3,
            warehouse_name: "Asaba",
            warehouse_manager: {
                id: 1,
                full_name: "Abiodun Johnson"
            },
        },
        {
            id: 4,
            warehouse_name: "Kwale",
            warehouse_manager: {
                id: 1,
                full_name: "Abiodun Johnson"
            },
        },
        {
            id: 5,
            warehouse_name: "Agbor",
            warehouse_manager: {
                id: 1,
                full_name: "Abiodun Johnson"
            },
        },
        {
            id: 6,
            warehouse_name: "Benin",
            warehouse_manager: {
                id: 1,
                full_name: "Abiodun Johnson"
            },
        },
        {
            id: 7,
            warehouse_name: "Auchi",
            warehouse_manager: {
                id: 1,
                full_name: "Abiodun Johnson"
            },
        },
        {
            id: 8,
            warehouse_name: "Ekpoma",
            warehouse_manager: {
                id: 1,
                full_name: "Abiodun Johnson"
            },
        },
    ];
    
    // ref for the input text
    // needed to auto focus on the chat text input when a message is pulled/dragged to be relied
    const textInputRef = useRef(null)

    // function to update text in text input
    const updateTextInput = (text) => {
        setTextInput(text === '' ? null : text)
    }

    // indicator for new chat and message copied
    const [newChat, setNewChat] = useState({
        open: false,
        copyAlert: false,
    });

    
    // function to indicate a new chat has been created for an order, waybill or stock transfer
    const openNewMessageAlert = (copyAlert) => {
        
        setNewChat({
            copyAlert: copyAlert ? copyAlert : false,
            open: true
        });
        
        // after 3 seconds set as false
        setTimeout(() => {
            setNewChat({
                copyAlert: copyAlert ? copyAlert : false,
                open: false
            });
        }, 2500);
    }

    // check for a newChat
    useLayoutEffect(() => {
        // if newChat variable is receives via the route
        if (route.params.newChat) {
            // set new chat as true
            openNewMessageAlert();
        }

        if (route.params.imageUri) {
            setUploading({
                uploadType: "Camera",
                assets: [
                    {
                        assetId: 0, 
                        uri: route.params.imageUri,
                    },
                ],
            })
        }

    }, [route.params]);

    // console.log(textInput);

    // scroll to bottom function
    const scrollToBottom = (animate) => {
        if (!hasScrolledToBottom.current) {
            scrollViewRef.current.scrollToEnd({ 
                animated: animate,
            });
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

    // variable to store price in price input
    const [price, setPrice] = useState(50000);
    
    // function to update price
    const updatePrice = (text) => {
        let newText = text.replace(new RegExp(',', 'g'), '');
        // remove all occurrence of the comma character ',' in text gloablly
        if (newText) setPrice(parseFloat(newText));
        else setPrice(0);
        
    }

    // response from ChatGPT after extracting order details
    const [products, setProducts] = useState([
        {
            id: 5,
            product_name: "Maybach Sunglasses",
            quantity: 1,
            imageUrl: 'https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/products%2Fmaybach-sunglasses.jpg?alt=media&token=95200745-ada8-4787-9779-9d00c56a18a5',
            checked: true,
        },
        {
            id: 6,
            product_name: "Accurate Watch",
            quantity: 1,
            imageUrl: 'https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/products%2Faccurate-watch.png?alt=media&token=4330bcd1-e843-434c-97cb-bf84c49b82b0',
            checked: true,
        },
    ]);

    // customer location and address
    const address = "No 3 Izono street Udu road, Warri";
    const [location, setLocation] = useState({
        id: Math.random(),
        location: "Warri",
        charge: 3000,
    });

    // warehouse input
    const [warehouseInput, setWarehouseInput] = useState(null);

    // warehosue input active
    const [warehouseInputActive, setWarehouseInputActive] = useState(false);

     // list of warehouse of logisics for incoming oe outgoing waybill
     const warehouses = [
        {id:  6, name: "Abraka"},
        {id:  4, name: "Agbor"},
        {id:  2, name: "Asaba"},
        {id:  3, name: "Benin"},
        {id:  8, name: "Kwale"},
        {id:  7, name: "Isoko"},
        {id:  5, name: "Sapele"},
        {id:  1, name: "Warri"},
    ];

    // update warehouse function
    const updateWarehouse = (id) => {
        // close stacked bottomsheet
        closeStackedModal();
        // set warehouse input
        setWarehouseInput(warehouses.find((item) => item.id === id));
        // disable input active state
        setWarehouseInputActive(false);
    }

    // function to update charge
    const updateCharge = (text) => {
        let newText = text.replace(new RegExp(',', 'g'), '');
        // remove all occurrence of the comma character ',' in text gloablly
        if (newText) setLocation({...location, charge: parseFloat(newText)});
        else setLocation({...location, charge: 0});
        
    }

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
        closeStackedModal();
        // console.log(productsList)
    }

    // chat header component
    const ChatHeader = (
        <View style={style.headerInfoWrapper}>
            {chatType !== "StockTransfer" && (
                <Avatar
                    imageUrl={bannerImage}
                    fullname={businessName}
                    squared={true}
                    diameter={30}
                />
            )}
            <View style={style.headerTextWrapper}>
                <Text style={style.headerPrimaryText}>{chatType === "StockTransfer" ? "Stock Transfer" : businessName}</Text>
                <Text style={style.headerSecondaryText}>{chatType} ID: {chatId}</Text>
            </View>
        </View>
    );

    // state to temporarily store phone number in a link
    // before user decides on texting, calling or whatsapp message
    const [linkPhoneNumber, setLinkPhoneNumber] = useState("");

    // calendar visible state
    const [calendarVisible, setCalendarVisible] = useState(false);

    // open calendar function
    const openCalendar = () => {
        // show calendar
        setCalendarVisible(true);
    }
    
    // close calendar function
    const closeCalendar = () => {
        // hide calendar
        setCalendarVisible(false)
    }
    // function handle selected location when location of an order or waybill is being edited
    const handleSelectedLocation = (data) => {
        closeStackedModal();
        setLocation(data);
    }
    
    // close modal function
    const closeModal = () => {
        sheetRef.current?.close();
        setReason("");

        // set bottomsheet global state
        setBottomSheet(prevState => {
            return {
                ...prevState,
                opened: false,
            }
        });
    };

    // open bottomsheet modal function
    const openModal = (type) => {

        // order actionables
        const orderActionables = [
            "Cancel order", 
            "Dispatch order", 
            "Deliver order", 
            "Reschedule order", 
            "Return order"
        ];

        // other modal type 
        const otherModals = [
            "Open with",
            "",
        ];

        // set bottomshee parameters
        setSheetParameters({
            sheetTitle: type,
            snapPointsArray: (() => {
                if (orderActionables.includes(type)) {
                    return ["100%"];
                } else if (otherModals.includes(type)) {
                    return [198];
                }
                // else return full height
                return ["100%"];
            })()
        })

        // open bottomsheet modal
        sheetRef.current?.present();

        // set bottomsheet global state
        setBottomSheet(prevState => {
            return {
                ...prevState,
                opened: true,
            }
        });
    }

    // function to open stacked bottom sheet
    const openStackedModal = (type) => {
        // set stacked sheet parameters
        setStackedSheetParameters({
            sheetTitle: type
        });

        // open botomsheet
        stackedSheetRef.current?.present();

        // set bottomsheet global state
        setStackedBottomSheet(prevState => {
            return {
                ...prevState,
                opened: true,
            }
        });
    }

    // function to close stacked bottom sheet
    const closeStackedModal = () => {
        // close bottomsheet
        stackedSheetRef.current?.close();

        // set bottomsheet global state
        setStackedBottomSheet(prevState => {
            return {
                ...prevState,
                opened: false,
            }
        });
    };

    // function to handle on press phone number link
    const handleOnPressPhoneNumber = (phoneNumber) => {
        // Keyboard.dismiss();
        openModal("Open with");
        // set phone  number thats passed to dailing function
        setLinkPhoneNumber(phoneNumber);
    }

    // to store order reschedule date temporarily
    const [rescheduleDate, setRescheduleDate] = useState("")

    // order buttons
    const orderButtons = [
        {
            id: 1,
            name: "Reschedule",
            onPress: () => openModal("Reschedule order")
        },
        {
            id: 2,
            name: "Cancel",
            onPress: () => openModal("Cancel order")
        },
        {
            id: 3,
            name: "Dispatch",
            onPress: () => openModal("Dispatch order")
        },
        {
            id: 4,
            name: "Deliver",
            onPress: () => openModal("Deliver order")
        },
        {
            id: 5,
            name: "Return",
            onPress: () => openModal("Return order")
        },
    ];

    // waybill buttons
    const waybillButtons = [
        {
            id: 1,
            name: "Deliver",
            onPress: () => {}
        },
        {
            id: 2,
            name: "Cancel",
            onPress: () => {}
        },

    ] 
    
    // template text
    const templateText = `This is Komitex Logistics you ordered for Maybach Sunglasses at ₦38,000 online, would you be available to receive it today?`;

    // function that runs when phone icon button is clicked 
    // in phone number action bottomsheet 
    const dialPhoneNumber = () => {
        Linking.openURL('tel:'+linkPhoneNumber);
    };

    // send sms function
    const sendSms = () => {
        const url = `sms:${linkPhoneNumber}?body=${encodeURIComponent(templateText)}`;
        Linking.openURL(url);
    };

    // send wahtsapp message function
    const sendWhatsAppMessage = () => {
        const url = `whatsapp://send?phone=${linkPhoneNumber}&text=${encodeURIComponent(templateText)}`;
        Linking.openURL(url);
    };

    // tomorrow date
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    // function to open document
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
    const [messages, setMessages] = useState(messageList);

    // update messages
    useEffect(() => {
        setMessages(messages)
    }, [messages])

    // send message in chat
    const sendMessage = (type) => {
        if (textInput === "" && uploading === false && type === "message") return;
        else {
            if (type === "message") {
                setMessages([
                    ...messages,
                    {
                        id: Math.random(),
                        seen: false,
                        user_id: userId,
                        fullname: fullname,
                        company_name: companyName,
                        account_type: authData?.account_type,
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
                ]);
            } else if (type === "Edited") {
                setMessages([
                    ...messages,
                    {
                        id: Math.random(),
                        seen: false,
                        user_id: userId,
                        fullname: fullname,
                        company_name: companyName,
                        account_type: authData?.account_type,
                        color: messageSenderColors[0],
                        type: 'Edited',
                        timestamp: () => {
                            const currentTime = new Date();
                            return currentTime.getTime();
                        },
                        file: null,
                        reply: false,
                        reschedule_date: () => {},
                        text: `Customer's Name: *Richard Idana*\nPhone Number: 08165266847, 08123456789\nDelivery Address: *${address}*\nProduct: *${products.map((product) => { return ` ${product.product_name} x ${product.quantity}`})}*\nPrice: *₦${price.toLocaleString()}*\nLocation: *${location.location}*\nCharge: *₦${location.charge.toLocaleString()}*\nLogistics: *Komitex Logistics*`,
                    }   
                ]);

            } else if (type === "Cancelled") {
                setMessages([
                    ...messages,
                    {
                        id: Math.random(),
                        seen: false,
                        user_id: userId,
                        fullname: fullname,
                        company_name: companyName,
                        account_type: authData?.account_type,
                        color: messageSenderColors[0],
                        type: 'Cancelled',
                        timestamp: () => {
                            const currentTime = new Date();
                            return currentTime.getTime();
                        },
                        file: null,
                        reply: false,
                        reschedule_date: () => {},
                        text: reason,
                    }   
                ]);
            } else if (type === "Rescheduled") {
                setMessages([
                    ...messages,
                    {
                        id: Math.random(),
                        seen: false,
                        user_id: userId,
                        fullname: fullname,
                        company_name: companyName,
                        account_type: authData?.account_type,
                        color: messageSenderColors[0],
                        type: 'Rescheduled',
                        timestamp: () => {
                            const currentTime = new Date();
                            return currentTime.getTime();
                        },
                        file: null,
                        reply: false,
                        reschedule_date: () => {
                            return moment(rescheduleDate).format('dddd, D MMMM, YYYY');
                        },
                        text: reason ? reason : "N/A",
                    }   
                ]);
            } else if (type === "Dispatched") {
                setMessages([
                    ...messages,
                    {
                        id: Math.random(),
                        seen: false,
                        user_id: userId,
                        fullname: fullname,
                        company_name: companyName,
                        account_type: authData?.account_type,
                        color: messageSenderColors[0],
                        type: 'Dispatched',
                        timestamp: () => {
                            const currentTime = new Date();
                            return currentTime.getTime();
                        },
                        file: null,
                        reply: false,
                        reschedule_date: () => {},
                        text: reason ? reason : "N/A",
                    }   
                ]);
            } else if (type === "Returned") {
                setMessages([
                    ...messages,
                    {
                        id: Math.random(),
                        seen: false,
                        user_id: userId,
                        fullname: fullname,
                        company_name: companyName,
                        account_type: authData?.account_type,
                        color: messageSenderColors[0],
                        type: 'Returned',
                        timestamp: () => {
                            const currentTime = new Date();
                            return currentTime.getTime();
                        },
                        file: null,
                        reply: false,
                        reschedule_date: () => {},
                        text: reason ? reason : "N/A",
                    }   
                ]);
            } else if (type === "Delivered") {
                setMessages([
                    ...messages,
                    {
                        id: Math.random(),
                        seen: false,
                        user_id: userId,
                        fullname: fullname,
                        company_name: companyName,
                        account_type: authData?.account_type,
                        color: messageSenderColors[0],
                        type: 'Delivered',
                        timestamp: () => {
                            const currentTime = new Date();
                            return currentTime.getTime();
                        },
                        file: null,
                        reply: false,
                        reschedule_date: () => {},
                        text: reason ? reason : "N/A",
                    }   
                ]);
            }
            setTextInput("");
            setReplying(null);
            hasScrolledToBottom.current = false;
            scrollToBottom(true);
        }
    }

    // user name of message being replied
    const replyingSenderName = (targetMessage) => {
        if (authData?.account_type !== targetMessage.account_type) {
            return targetMessage.company_name;
        }

        // if user id matches user id in authdata, show "You"
        return userId === targetMessage.user_id ? "You" : targetMessage.fullname
    }

    // text of message being replied, if it excede a particular length, cut the string
    const replyingSenderText = (targetMessage) => {
        return targetMessage.text.length > 175 ? targetMessage.text.slice(0, 175) + "..." : targetMessage.text;
    }

    // if message being replied to has th character '*', remove it 
    const processText = (text) => {

        if (!text.includes('*')) return text;
        
        const textArray = text.split('*');
        
        if (textArray.length < 3) {
            return textArray.join("*");
        } else {
            return textArray.join("");
        }
    }

    // component of message being replied above text area when replying a message
    const ReplyingMessageInput = (id) => {
        const targetMessage = messages.find(message => message.id === id);
        
        return (
            <View style={style.replyingInputWrapper}>
                <View style={style.replyingMessageWrapper}>
                    <Text style={style.replyingMessageSender}>
                        Replying to {replyingSenderName(targetMessage)}
                    </Text>
                    {/* if replied message is an image */}
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
                    {/* if replied message is a document */}
                    { targetMessage.type === 'document' && (
                        <>
                            <View style={style.replyingImageWrapper}>
                                <RepliedDocumentIcon />
                                <Text style={style.messageType}>{targetMessage.file.name}</Text>
                            </View>
                        </>
                    )}
                    {/* if replied message is a text */}
                    { targetMessage.text && (
                        <Text style={style.replyingMessage}>
                            {/* {replyingSenderText(processText(targetMessage))} */}
                            {processText(replyingSenderText(targetMessage))}
                        </Text>
                    )}
                </View>
                {/* button to disable replying state */}
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


    // component above text feild when uplaoding image or document is taking place
    const uploadingMessageInput = (uploadingDataArray) => {

        return (
            <ScrollView 
                showsHorizontalScrollIndicator={false} 
                horizontal={true}
                contentContainerStyle={style.uploadingInputContainer}
            >
                {/* uplaoding images from Gallery or Camera */}
                {["Gallery", "Camera"].includes(uploadingDataArray.uploadType) && uploadingDataArray.assets.map(item => (
                    <View style={style.uploadingImageWrapper} key={item.uri}>
                        {/* remove image button */}
                        <TouchableOpacity
                            style={style.removeImageButton}
                            onPress={() => removeImageFromUpload(item.uri)}
                        >
                            <RemoveImageIcon />
                        </TouchableOpacity>
                        <Image style={style.uploadingImage} source={{uri: item.uri}} />
                    </View>
                ))}
                {/* uploading documents */}
                {uploadingDataArray.uploadType === "Document" && (
                    <View style={style.uploadingDocumentWraper}>
                        {uploadingDataArray.mimeType.includes("image") ? <UploadingImageDocIcon /> : <UploadingDocIcon />}
                        <Text style={style.uploadingDocName}>
                            {/* slice document name if its too long */}
                            {uploadingDataArray.name.length > 25 ? uploadingDataArray.name.slice(0, 25) + "..." : uploadingDataArray.name}
                        </Text>
                        <TouchableOpacity onPress={removeDocFromUpload}>
                            <RemoveDocIcon />
                        </TouchableOpacity>
                    </View>
                )}
            </ScrollView>
        )
    }

    // function to remove image from upload list
    // function runs when you click close icon in image being uploaded
    const removeImageFromUpload = (uri) => {
        setUploading(prevUploading => {
            // filter list
            const newUploadList = prevUploading.assets.filter(item => item.uri !== uri);
            // check if list is zero
            if (newUploadList.length === 0) return false; // return false if length is zero 
            return { // else return updated list
                uploadType: "Gallery",
                assets: newUploadList
            }
        })
    }

    // function runs to remove document from upload
    const removeDocFromUpload = () => {
        setUploading(false);
    }

    // state to indicate if the input field has an error/or is left empty
    const [errorReason, setErrorReason] = useState(false);

    // state to indicate if an error was made in the charge input
    const [errorCharge, setErrorCharge] = useState(false);

    // state to indicate if an error was made in the price input
    const [errorPrice, setErrorPrice] = useState(false);

    // state to store waybill details
    const [waybillDetails, setWaybilldetails] = useState(null);

    // state to indicate if the input field has an error/or is left empty
    const [errorWaybillDetails, setErrorWaybillDetails] = useState(false);

    // function to update waybilldetails
    const updateWaybillDetails = (text) => {
        setWaybilldetails(text)
    }

    // state to store transfer details
    const [transferDetails, setTransferdetails] = useState(null);

    // state to indicate if the input field has an error/or is left empty
    const [errorTransferDetails, setErrorTransferDetails] = useState(false);

    // function to update transferdetails
    const updateTransferDetails = (text) => {
        setTransferdetails(text)
    }

    // variable to check for empty fields
    const isAnyFieldEmpty = [
        location, 
        products, 
        price
        ].some((item) => {
            return item === null || 
            item === '' || 
            item === undefined ||
            item === 0 ||
            item === NaN ||
            (Array.isArray(item) && 
            item.length === 0);
        }
    );

    // submit edited order details
    const submitEditOrder = () => {
        hasScrolledToBottom.current = false;
        scrollToBottom(true); // animate === true
        sendMessage("Edited");
        Keyboard.dismiss();
        closeModal();
        setToast({
            visible: true,
            text: "Order edited successfully",        
            type: "success",
        })
    }

    // submit edit waybill
    const submitEditWaybill = () => {
        
    }

    // submit edit transfer
    const submitEditTransfer = () => {
        // Add your logic here for submitting edited transfer
    }
    
    // submit order rescheduled information
    const submitRescheduledOrder = () => {
        Keyboard.dismiss();
        hasScrolledToBottom.current = false;
        scrollToBottom(true); // animate === true
        sendMessage("Rescheduled");
        closeModal();
        setToast({
            visible: true,
            text: "Order rescheduled successfully",        
            type: "success",
        })
    }
    
    // submit order cancelled information
    const submitCancelledOrder = () => {
        hasScrolledToBottom.current = false;
        Keyboard.dismiss();
        scrollToBottom(true); // animate === true
        sendMessage("Cancelled");
        closeModal();
        setToast({
            visible: true,
            text: "Order cancelled successfully",        
            type: "success",
        })
    }

    // switch order status to dispatched
    const submitDispatchedOrder = () => {
        hasScrolledToBottom.current = false;
        Keyboard.dismiss();
        scrollToBottom(true); // animate === true
        sendMessage("Dispatched");
        closeModal();
        setToast({
            visible: true,
            text: "Order dispatched successfully",        
            type: "success",
        })
    }

    // switch order status to delivered
    const submitDeliveredOrder = () => {
        hasScrolledToBottom.current = false;
        Keyboard.dismiss();
        scrollToBottom(true); // animate === true
        sendMessage("Delivered");
        closeModal();
        setToast({
            visible: true,
            text: "Order delivered successfully",        
            type: "success",
        })
    }

    // console.log(moment("today").format('DD MMMM, YYYY'));

    // function to pick image from gallery
    const pickImageAsync = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            quality: 1,
            allowsMultipleSelection: true,
        });

        
        if (!result.canceled) {
            // handle selected image
            // console.log(result);
            setUploading({
                uploadType: "Gallery",
                assets: result.assets
            })
            closeModal();
        }
    };

    // function to select a document from file manager
    const pickDocAsync = async () => {
        let result = await DocumentPicker.getDocumentAsync();

        // console.log(result);        
        if (result.type === "success") {
            setUploading({
                uploadType: "Document",
                ...result
            })
            closeModal();
        }
    };

    // navigate to camera
    const navigateToCamera = () => {
        closeModal();
        Keyboard.dismiss();
        navigation.navigate("CaptureImage", {
            origin: "Chat",
            chatId: chatId,
            chatType: chatType,
            businessName: businessName,
            bannerImage: bannerImage,
        })
    };

    // const menu state
    const [menuOpened, setMenuOpened] = useState(false);

    // state to control message options
    const [messageOptions, setMessageOptions] = useState({
        open: true,
        optionsButtons: (() => {})(),
        buttons: [],
        top: 0,
        right: 0,
        left: 0,
    })
    

    // function get right offset of menu
    const getRightPosition = (messageWidth) => {
        const menuWidth = 184;
        const horizontalPadding = 40;

        if ( horizontalPadding + messageWidth + menuWidth >= windowWidth ) {
            return (windowWidth - menuWidth)/2 + horizontalPadding/2;
        }
        return messageWidth + horizontalPadding/4;
    }

    // function to get top offset of menu
    const getTopPosition = (messageHeight, messageOffset) => {

        // vertical padding in message container
        const verticalPadding = 30;

        // height of menu
        const menuHeight = 124;

        // header bar height
        const headerBarHeight = 80;

        // text fields height
        const textFieldHeight = 103;

        if (messageOffset > windowHeight - textFieldHeight) {
            const threshold = messageOffset - scrollOffset;
            // console.log(threshold);
            if ( threshold > 500 ) {
                return messageOffset + verticalPadding - menuHeight;
            }
        }


        if (messageOffset - scrollOffset <= headerBarHeight) {
            return messageOffset + messageHeight - verticalPadding;
        }

        return messageOffset;
    }
    
    // open Menu function
    const openMessageOptions = (messageType, id) => {
        // target message from messages refs 
        const targetMessage = messagesRefs.current.find(message => message.id === id);

        // console.log(messageType);

        setMessageOverlay({
            top: targetMessage.y,
            height: targetMessage.height
        })

        // set options parameters
        setMessageOptions({
            open: true,
            optionsButtons: (() => {
                // if message is an image
                if (messageType === "image") return imageOptionsButtons;
                // if message is a document
                if (messageType === "document") return docOptionsButtons;
                // else return regular message options
                return messageOptionsButtons
            })(),
            // buttons: messageType === "image" && imageOptionsButtons || messageType === "document" && docOptionsButtons || messageOptionsButtons,
            top: getTopPosition(targetMessage.height, targetMessage.y),
            right: authData?.account_type === targetMessage.account_type ? getRightPosition(targetMessage.width) : undefined,
            left: authData?.account_type !== targetMessage.account_type ? getRightPosition(targetMessage.width) : undefined,
        });

        // Vibrate the phone slightly
        Vibration.vibrate(50); // Vibrate for 50ms
    }

    // close Menu function
    const closeMessageOptions = () => {

        // reset message options
        setMessageOptions(prevMenu => {
            return  {
                ...prevMenu,
                open: false
            }
        });

        setMessageOverlay({
            top: 0,
            height: 0
        })
    }

    // useEffect(() => {
    //     if (messageOptions.open === false) return;
    //     closeMessageOptions();
    // }, [scrollOffset])

    // function to handle copying of a chat link
    const handleCopyChatLink = () => {
        copyToClipboard("abc123");
        closeMenu();

    }
    
    // meesage options buttons
    const messageOptionsButtons = [
        {
            id: 1,
            icon: <ReplyIcon />,
            text: "Reply",
            onPress: () => {},
        },
        {
            id: 2,
            icon: <CopyTextIcon />,
            text: "Copy text",
            onPress: () => {},
        },
        {
            id: 3,
            icon: <DeleteBlackIcon />,
            text: "Delete text",
            onPress: () => {},
        },
    ];

    // image options button
    const imageOptionsButtons = [
        {
            id: 1,
            icon: <ReplyIcon />,
            text: "Reply",
            onPress: () => {},
        },
        {
            id: 2,
            icon: <DeleteBlackIcon />,
            text: "Delete image",
            onPress: () => {},
        },
    ];

    // document options button
    const docOptionsButtons = [
        {
            id: 1,
            icon: <ReplyIcon />,
            text: "Reply",
            onPress: () => {},
        },
        {
            id: 2,
            icon: <DeleteBlackIcon />,
            text: "Delete document",
            onPress: () => {},
        },
    ];

    // buttons in header menu
    const headerMenuButtons =  [
        {
            id: 1,
            icon:<OrderDetailsIcon />,
            text: (() => {
                if (chatType === "StockTransfer") return "Transfer Details";
                return chatType + " Details";
            }).call(),
            onPress: () => {
                setMenuOpened(false);
                if (chatType === "StockTransfer") return navigation.navigate("TransferDetails", { chatId: chatId });
                return navigation.navigate(`${chatType}Details`, { chatId: chatId });
            },
        },
        {
            id: 2,
            icon: <ChatLinkIcon />,
            text: "Chat link",
            onPress: handleCopyChatLink,
        },
    ];

    // scroll ref
    const [scrollOffset, setScrollOffset] = useState(null);

    return (<>
        {/* chat header */}
        <View style={style.headerContainer}>
            {/* header component */}
            <Header
                navigation={navigation}
                stackName={ChatHeader}
                component={true}
                iconFunction={() => setMenuOpened(prevState => !prevState)}
                icon={<MenuIcon />}
                removeBackArrow={true}
                inlineArrow={true}
                backgroundColor={white}
                barheight={45}
            />
            {/* status indicator */}
            {status !== "Pending" && (
                <View style={style.statusIndicator}>
                    <Text style={style.statusChatType}>
                        {chatType} status:&nbsp;
                        <Text
                            style={[
                                status === "Delivered" && style.deliveredStatus,
                                status === "Cancelled" && style.cancelledStatus,
                                status === "Dispatched" && style.dispatchedStatus,
                                status === "rescheduled" && style.rescheduledStatus,
                            ]}
                        >
                            {status}
                        </Text>
                    </Text>
                    <Text style={style.statusDateTime}>
                        3:28 pm, Jan 09, 2024
                    </Text>
                </View>
            )}
        </View>

        {/* menu component */}
        {menuOpened && (
            <Menu
                closeMenu={() => setMenuOpened(false)}
                menuButtons={headerMenuButtons}
            />
        )}

        {/* out of stock indicator */}
        { emptyStock && (
            <View style={style.indicatorWrapper}>
                <Indicator 
                    type={"Cancelled"}
                    text={"Out of stock"}
                />
            </View>
        )}

        {/* chat scrollable view */}
        <ScrollView 
            ref={scrollViewRef}
            onLayout={() => scrollToBottom(false)}
            showsVerticalScrollIndicator={true}
            style={style.scrollView}
            contentContainerStyle={style.scrollViewContent}
            keyboardShouldPersistTaps="always"
            onScroll={({nativeEvent}) => {
                setScrollOffset(nativeEvent.contentOffset.y)
                if (messageOptions.open) return closeMessageOptions();
            }}
        >
            {/* menu */}
            {messageOptions.open && (
                <Menu
                    menuButtons={messageOptions?.optionsButtons}
                    top={messageOptions?.top}
                    right={messageOptions?.right}
                    left={messageOptions?.left}
                    hideTouchableBackground={false}
                    shrinkMenu={true}
                    closeMenu={closeMessageOptions}
                />
            )}

            {/* message overlay */}
            {/* shows when you click a repplied message and it auto scrolls to that message */}
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
            <View 
                style={style.container}
            >
                {/* fixed header container */}
                {/* chat scroll view */}
                <View 
                    style={[
                        style.messagesWrapper,
                        status !== "Pending" && {paddingTop: 94},
                    ]}
                >
                    {/* date */}
                    <View style={style.dateWrapper}>
                        <Text style={style.dateText}>{"Friday July 7, 2023"}</Text>
                    </View>

                    {/* edi button */}
                    <View style={[style.editButtonWrapper, authData?.account_type === "Merchant" && {justifyContent: 'flex-end'}]}>
                        <TouchableOpacity 
                            style={style.editButton}
                            onPress={() => {
                                if (chatType !== "StockTransfer") return openModal("Edit "+chatType.toLowerCase());
                                return openModal("Edit transfer");
                            }}
                        >
                            <EditIcon />
                            <Text style={style.editButtonText}>
                                Edit {chatType === "StockTransfer" ? "Transfer" : chatType}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    
                    {/* list of messages */}
                    {messages.map((message, index) => {
                        return (
                            <MessageContainer
                                key={message.id}
                                index={index}
                                messagesRefs={messagesRefs}
                                copyNumberAlert={openNewMessageAlert}
                                message={message}
                                messages={messages}
                                products={products}
                                handleOnPressPhoneNumber={handleOnPressPhoneNumber}
                                handleScrollToComponent={handleScrollToComponent}
                                setReplying={setReplying}
                                textInputRef={textInputRef}
                                navigation={navigation}
                                openMessageOptions={openMessageOptions}
                            />
                        );
                    })}

                </View>
            </View>
        </ScrollView>

        {/* text field wrapper */}
        <View style={style.textFieldWrapper}>
            { !replying && !uploading && (
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={style.actionButtonsWrapper}>
                    { chatType === "Order" && orderButtons.map((button) => {

                        // if status is cancelled
                        if (status === "Cancelled") return;

                        // if account type is merchant and status is Pending or Rescheduled 
                        if (authData?.account_type === "Merchant"){
                            // if status is not pending or rescheduled, show no buttons
                            if (!["Pending", "Rescheduled"].includes(status)) return;
                            // show only reschedule and cancel buttons
                            if (button.name === "Reschedule" || button.name === "Cancel"){
                                return <ActionButton
                                    key={button.id}
                                    name={button.name}
                                    onPress={button.onPress}
                                />
                            }
                        } else { // Logistics account
                            // order buttons if status is Pending or Rescheduled
                            if (["Pending", "Rescheduled"].includes(status)){
                                if (button.name === "Deliver" || button.name === "Return") return;
                                return <ActionButton
                                    key={button.id}
                                    name={button.name}
                                    onPress={button.onPress}
                                />
                            }
    
                            // if order is dispatched, only possible actions are deliver or cancel
                            if (["Dispatched"].includes(status)){
                                if (button.name === "Deliver" || button.name === "Return") {
                                    return <ActionButton
                                        key={button.id}
                                        name={button.name}
                                        onPress={button.onPress}
                                    />
                                }
                            }
    
                            // if order is Delivered, only possible action is cancelled within 30mins after delivery
                            if (["Delivered"].includes(status)){
                                if (button.name === "Cancel") {
                                    return <ActionButton
                                        key={button.id}
                                        name={button.name}
                                        onPress={button.onPress}
                                    />
                                }
                            }
                        }

                    })}

                    {/* waybill chat type */}
                    { chatType === "Waybill" && waybillButtons.map((button) => {
                        // if account is merchant
                        if (authData?.account_type === "Merchant"){
                            // if status is "Pending", inventory action is increment, render cancel button
                            if (status === "Pending" && inventory_action === "increment" && button.name === "Cancel"){
                                return <ActionButton 
                                    key={button.id}
                                    name={button.name}
                                    onPress={button.onPress}
                                />
                            }
                            // if status is "Pending", inventory action is decrement, render deliver button
                            if (status === "Pending" && inventory_action === "decrement" && button.name === "Deliver"){
                                return <ActionButton 
                                    key={button.id}
                                    name={button.name}
                                    onPress={button.onPress}
                                />
                            }
                        }


                        // if account is logistics
                        if (authData?.account_type === "Logistics"){
                            // if status is "Pending", inventory action is decrement, render cancel button
                            if (status === "Pending" && inventory_action === "decrement" && button.name === "Cancel"){
                                return <ActionButton 
                                    key={button.id}
                                    name={button.name}
                                    onPress={button.onPress}
                                />
                            }
                            // if status is "Pending", inventory action is increment, render deliver button
                            if (status === "Pending" && inventory_action === "increment" && button.name === "Deliver"){
                                return <ActionButton 
                                    key={button.id}
                                    name={button.name}
                                    onPress={button.onPress}
                                />
                            }
                        }
                    })}
                    
                </ScrollView>
            )}
            { replying && ReplyingMessageInput(replying) }
            { uploading && uploadingMessageInput(uploading) }
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
                    onPress={() => sendMessage("message")}
                >
                    <SendIcon />
                </TouchableOpacity>
            </View>
        </View>

        {/* calendar */}
        <Calendar 
            minDate={tomorrow}
            visible={calendarVisible}
            setDate={setRescheduleDate}
            disableActionButtons={true}
            closeCalendar={closeCalendar}
        />
        
        {/* Bottom sheet component */}
        <CustomBottomSheet 
            index={0}
            sheetRef={sheetRef}
            closeModal={closeModal}
            snapPointsArray={sheetParameters.snapPointsArray}
            sheetTitle={sheetParameters.sheetTitle}
            contentContainerStyle={{paddingTop: 8}}
        >
            {/* edit order */}
            { sheetParameters.sheetTitle === "Edit order" && (<>
                <BottomSheetScrollView showsVerticalScrollIndicator={false} contentContainerStyle={style.modalWrapper}>
                    <View style={style.modalContent}>
                        <Text style={style.editModalParagragh}>
                            We all make mistakes, use the available fields to make to edit your order
                        </Text>
                        {/* Selected Products Container */}
                        <View style={style.productsWrapper}>
                            <View style={style.productsHeading}>
                                <Text style={style.producPlaceholder}>Products ({products.length})</Text>
                                <TouchableOpacity
                                    onPress={() => openStackedModal("Products")}
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
                            value={location.location}
                            inputFor={"String"}
                            onPress={() => {
                                openStackedModal("Locations")
                            }}
                        />
                        {/* price input fields */}
                        <Input
                            label={"Price"}
                            placeholder={"Price"}
                            adornment={"₦"}
                            value={price ? price.toLocaleString() : ''}
                            onChange={updatePrice}
                            keyboardType={"numeric"}
                            error={errorPrice}
                            setError={setErrorPrice}
                            
                            />
                        {/* charge input fields */}
                        {authData?.account_type === "Logistics" && 
                            <Input
                                label={"Charge"}
                                placeholder={"Charge"}
                                adornment={"₦"}
                                value={location.charge ? location.charge.toLocaleString() : ''}
                                onChange={updateCharge}
                                keyboardType={"numeric"}
                                error={errorCharge}
                                setError={setErrorCharge}
                            />
                        }
                    </View>
                </BottomSheetScrollView>
                <CustomButton
                    // secondaryButton={true}
                    name={"Done"}
                    shrinkWrapper={true}
                    inactive={isAnyFieldEmpty}
                    onPress={submitEditOrder}
                    unpadded={true}
                />
            </>)}
            {/* edit waybill */}
            { sheetParameters.sheetTitle === "Edit waybill" && (<>
                <BottomSheetScrollView showsVerticalScrollIndicator={false} contentContainerStyle={style.modalWrapper}>
                    <View style={style.modalContent}>
                        <Text style={style.editModalParagragh}>
                            We all make mistakes, use the available fields to make to edit your waybill
                        </Text>
                        {/* Selected Products Container */}
                        <View style={style.productsWrapper}>
                            <View style={style.productsHeading}>
                                <Text style={style.producPlaceholder}>Products ({products.length})</Text>
                                <TouchableOpacity
                                    onPress={() => openStackedModal("Products")}
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
                        {/* select warehouse input */}
                        <SelectInput
                            label={"Select Warehouse"}
                            placeholder={"Select warehouse to receive the waybill"}
                            inputFor={"String"}
                            onPress={() => openStackedModal("Warehouses")}
                            value={warehouseInput?.name}
                            active={warehouseInputActive}
                        />
                        {/* waybill details */}
                        <Input
                            multiline={true}
                            label={"Waybill Details"} 
                            placeholder={"Driver's number or Waybill number"} 
                            value={waybillDetails}
                            onChange={updateWaybillDetails}
                            height={100}
                            textAlign={"top"}
                            error={errorWaybillDetails}
                            setError={setErrorWaybillDetails}
                        />
                    </View>
                </BottomSheetScrollView>
                <CustomButton
                    name={"Done"}
                    shrinkWrapper={true}
                    inactive={isAnyFieldEmpty}
                    onPress={submitEditWaybill}
                    unpadded={true}
                />
            </>)}
            {/* edit stock transfer */}
            { sheetParameters.sheetTitle === "Edit transfer" && (<>
                <BottomSheetScrollView showsVerticalScrollIndicator={false} contentContainerStyle={style.modalWrapper}>
                    <View style={style.modalContent}>
                        <Text style={style.editModalParagragh}>
                            We all make mistakes, use the available fields to make to edit your stock transfer
                        </Text>
                        {/* select warehouse input */}
                        <SelectInput
                            label={"Change Destination"}
                            placeholder={"Select warehouse to receive the transfer"}
                            inputFor={"String"}
                            onPress={() => openStackedModal("Warehouses")}
                            value={warehouseInput?.name}
                            active={warehouseInputActive}
                        />
                        {/* Selected Products Container */}
                        <View style={style.productsWrapper}>
                            <View style={style.productsHeading}>
                                <Text style={style.producPlaceholder}>Products ({products.length})</Text>
                                <TouchableOpacity
                                    onPress={() => openStackedModal("Products")}
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
                        {/* waybill details */}
                        <Input
                            multiline={true}
                            label={"Waybill Details"} 
                            placeholder={"Driver's number or Waybill number"} 
                            value={transferDetails}
                            onChange={updateTransferDetails}
                            height={100}
                            textAlign={"top"}
                            error={errorTransferDetails}
                            setError={setErrorTransferDetails}
                        />
                    </View>
                </BottomSheetScrollView>
                <CustomButton
                    name={"Done"}
                    shrinkWrapper={true}
                    inactive={isAnyFieldEmpty}
                    onPress={submitEditTransfer}
                    unpadded={true}
                />
            </>)}
            {/* Reschedule order */}
            { sheetParameters.sheetTitle === "Reschedule order" && (
                <>
                    <BottomSheetScrollView showsVerticalScrollIndicator={false} contentContainerStyle={style.modalWrapper}>
                        <View style={style.modalContent}>
                            <Text style={style.editModalParagragh}>
                                Kindly use the form to reschedule your order to a later date
                            </Text>
                            {/* Selected Products Container */}
                            <View style={style.productsWrapper}>
                                <View style={style.productsHeading}>
                                    <Text style={style.producPlaceholder}>Products ({products.length})</Text>
                                </View>
                                <View style={style.productsDetailsContainer}>
                                    { products.map((product) => (
                                        // map through selected products
                                        <MerchantProduct
                                            key={product.id}
                                            productName={product.product_name}
                                            quantity={product.quantity}
                                            imageUrl={product.imageUrl}
                                            summary={true}
                                            containerStyle={{
                                                backgroundColor: background,
                                                paddingVertical: 0,
                                            }}                                            
                                        />
                                    ))}
                                </View>
                            </View>
                            {/* Reschedule date */}
                            <SelectInput 
                                label={"Reschedule Date"} 
                                placeholder={"DD MMMM, YYYY"} 
                                value={rescheduleDate}
                                onPress={openCalendar}
                                icon={<CalendarIcon />}
                                active={false}
                                inputFor={"Date"}
                            />

                            <Input
                                multiline={true}
                                label={"Reason (optional)"}
                                placeholder={"Tell us what happened..."}
                                value={reason}
                                onChange={setReason}
                                height={100}
                                textAlign={"top"}
                                error={errorReason}
                                setError={setErrorReason}
                            />

                            
                        </View>
                    </BottomSheetScrollView>
                    <CustomButton
                        // secondaryButton={true}
                        name={"Done"}
                        shrinkWrapper={true}
                        inactive={!rescheduleDate ? true : false}
                        onPress={submitRescheduledOrder}
                        unpadded={true}
                    />
                </>
            )}
            {/* cancel order */}
            { sheetParameters.sheetTitle === "Cancel order" && (
                <>
                    <BottomSheetScrollView showsVerticalScrollIndicator={false} contentContainerStyle={style.modalWrapper}>
                        <View style={style.modalContent}>
                            <Text style={style.editModalParagragh}>
                                Kindly use the form to cancel your order
                            </Text>
                            {/* Selected Products Container */}
                            <View style={style.productsWrapper}>
                                <View style={style.productsHeading}>
                                    <Text style={style.producPlaceholder}>Products ({products.length})</Text>
                                </View>
                                <View style={style.productsDetailsContainer}>
                                    { products.map((product) => (
                                        // map through selected products
                                        <MerchantProduct
                                            key={product.id}
                                            productName={product.product_name}
                                            quantity={product.quantity}
                                            imageUrl={product.imageUrl}
                                            summary={true}
                                            containerStyle={{
                                                backgroundColor: background,
                                                paddingVertical: 0,
                                            }}
                                        />
                                    ))}
                                </View>
                            </View>
                            <Input
                                multiline={true}
                                label={"Reason"}
                                placeholder={"Tell us what happened..."}
                                value={reason}
                                onChange={setReason}
                                height={100}
                                textAlign={"top"}
                                error={errorReason}
                                setError={setErrorReason}
                            />

                            
                        </View>
                    </BottomSheetScrollView>
                    <CustomButton
                        // secondaryButton={true}
                        name={"Done"}
                        shrinkWrapper={true}
                        inactive={!reason ? true : false}
                        onPress={submitCancelledOrder}
                        unpadded={true}
                    />
                </>
            )}
            {/* dispatch order */}
            { sheetParameters.sheetTitle === "Dispatch order" && (
                <>
                    <BottomSheetScrollView showsVerticalScrollIndicator={false} contentContainerStyle={style.modalWrapper}>
                        <View style={style.modalContent}>
                            <Text style={style.editModalParagragh}>
                                Kindly review and confirm this action
                            </Text>
                            {/* Selected Products Container */}
                            <View style={style.productsWrapper}>
                                <View style={style.productsHeading}>
                                    <Text style={style.producPlaceholder}>Products ({products.length})</Text>
                                </View>
                                <View style={style.productsDetailsContainer}>
                                    { products.map((product) => (
                                        // map through selected products
                                        <MerchantProduct
                                            key={product.id}
                                            productName={product.product_name}
                                            quantity={product.quantity}
                                            imageUrl={product.imageUrl}
                                            summary={true}
                                            containerStyle={{
                                                backgroundColor: background,
                                                paddingVertical: 0,
                                            }}
                                        />
                                    ))}
                                </View>
                            </View>
                            <Input
                                multiline={true}
                                label={"Comments (optional)"}
                                placeholder={"Anything you would like to say?"}
                                value={reason}
                                onChange={setReason}
                                height={100}
                                textAlign={"top"}
                                error={errorReason}
                                setError={setErrorReason}
                            />

                            
                        </View>
                    </BottomSheetScrollView>
                    <CustomButton
                        // secondaryButton={true}
                        name={"Done"}
                        shrinkWrapper={true}
                        onPress={submitDispatchedOrder}
                        unpadded={true}
                    />
                </>
            )}
            {/* return order bottomsheet */}
            { sheetParameters.sheetTitle === "Return order" && (
                <>
                    <BottomSheetScrollView showsVerticalScrollIndicator={false} contentContainerStyle={style.modalWrapper}>
                        <View style={style.modalContent}>
                            <Text style={style.editModalParagragh}>
                                Kindly review and confirm this action
                            </Text>
                            {/* Selected Products Container */}
                            <View style={style.productsWrapper}>
                                <View style={style.productsHeading}>
                                    <Text style={style.producPlaceholder}>Products ({products.length})</Text>
                                </View>
                                <View style={style.productsDetailsContainer}>
                                    { products.map((product) => (
                                        // map through selected products
                                        <MerchantProduct
                                            key={product.id}
                                            productName={product.product_name}
                                            quantity={product.quantity}
                                            imageUrl={product.imageUrl}
                                            summary={true}
                                            containerStyle={{
                                                backgroundColor: background,
                                                paddingVertical: 0,
                                            }}
                                        />
                                    ))}
                                </View>
                            </View>
                            <Input
                                multiline={true}
                                label={"Comments"}
                                placeholder={"Anything you would like to say?"}
                                value={reason}
                                onChange={setReason}
                                height={100}
                                textAlign={"top"}
                                error={errorReason}
                                setError={setErrorReason}
                            />
                        </View>
                    </BottomSheetScrollView>
                    <CustomButton
                        name={"Done"}
                        shrinkWrapper={true}
                        onPress={submitDispatchedOrder}
                        unpadded={true}
                        inactive={!reason ? true : false}
                    />
                </>
            )}
            {/* dispatch order */}
            { sheetParameters.sheetTitle === "Deliver order" && (
                <>
                    <BottomSheetScrollView showsVerticalScrollIndicator={false} contentContainerStyle={style.modalWrapper}>
                        <View style={style.modalContent}>
                            <Text style={style.editModalParagragh}>
                                Kindly review and confirm this action
                            </Text>
                            {/* Selected Products Container */}
                            <View style={style.productsWrapper}>
                                <View style={style.productsHeading}>
                                    <Text style={style.producPlaceholder}>Products ({products.length})</Text>
                                </View>
                                <View style={style.productsDetailsContainer}>
                                    { products.map((product) => (
                                        // map through selected products
                                        <MerchantProduct
                                            key={product.id}
                                            productName={product.product_name}
                                            quantity={product.quantity}
                                            imageUrl={product.imageUrl}
                                            summary={true}
                                            containerStyle={{
                                                backgroundColor: background,
                                                paddingVertical: 0,
                                            }}
                                        />
                                    ))}
                                </View>
                            </View>
                            <Input
                                multiline={true}
                                label={"Comments (optional)"}
                                placeholder={"Payment method cash or transfer?"}
                                value={reason}
                                onChange={setReason}
                                height={100}
                                textAlign={"top"}
                                error={errorReason}
                                setError={setErrorReason}
                            />
                        </View>
                    </BottomSheetScrollView>
                    <CustomButton
                        name={"Done"}
                        shrinkWrapper={true}
                        inactive={!reason ? true : false}
                        onPress={submitDeliveredOrder}
                        unpadded={true}
                    />
                </>
            )}
            {/* onclick phone number */}
            { sheetParameters.sheetTitle === "Open with" && (
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
            { sheetParameters.sheetTitle === "" && (
                <View style={style.uploadButtonsWrapper}>
                    <TouchableOpacity
                        style={style.uploadButton}
                        onPress={navigateToCamera}
                    >
                        <View style={style.uploadIconWrapper}>
                            <CameraPrimaryLargeIcon />
                        </View>
                        <Text style={style.uploadButtonText}>Camera</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={style.uploadButton}
                        onPress={pickImageAsync}
                        >
                        <View style={style.uploadIconWrapper}>
                            <GalleryIcon />
                        </View>
                        <Text style={style.uploadButtonText}>Gallery</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={style.uploadButton}
                        onPress={pickDocAsync}
                    >
                        <View style={style.uploadIconWrapper}>
                            <DocumentIcon />
                        </View>
                        <Text style={style.uploadButtonText}>Document</Text>
                    </TouchableOpacity>
                </View>   
            )}
        </CustomBottomSheet>

        {/* bottom sheet to edit product and location, should have stack behaviour */}
        <CustomBottomSheet 
            index={0}
            sheetRef={stackedSheetRef}
            closeModal={closeStackedModal}
            snapPointsArray={["75%"]}
            sheetTitle={stackedSheetParameters.sheetTitle}
            contentContainerStyle={{paddingTop: 8}}
            stackBehavior={"push"}
        >
            {stackedSheetParameters.sheetTitle === "Products" && (
                <AddProductsModalContent 
                    addProducts={addProducts} selectedProducts={products}
                />
            )}

            {stackedSheetParameters.sheetTitle === "Locations" && (
                <AddLocationModalContent 
                    handleSelectedLocation={handleSelectedLocation}
                />
            )}

            {stackedSheetParameters.sheetTitle === "Warehouses" && (
                <BottomSheetScrollView showsVerticalScrollIndicator={false}>
                    <View style={style.listWrapper}>
                        {warehouses.map((warehouse) => (
                            <TouchableOpacity 
                                key={warehouse.id} 
                                style={style.listItem}
                                onPress={() => updateWarehouse(warehouse.id)}
                            >
                                <Text style={style.listText}>{warehouse.name}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </BottomSheetScrollView>
            )}
        </CustomBottomSheet>

        {/* Alert to display whena  new order or waybill is created */}
        { newChat.open && (
            <AlertNewChat 
                show={newChat.show}
                text={type + " successfully created"}
                copyNumberAlert={newChat.copyAlert}
            />
        )}

    </>);
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
        alignSelf: 'stretch',
        flex: 1,
        gap: 10,
    },  
    statusIndicator: {
        height: 34,
        width: "100%",
        backgroundColor: background,
        display: 'flex',
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    statusChatType: {
        fontFamily: 'mulish-medium',
        color: black,
        fontSize: 12,
    },
    deliveredStatus: {
        color: deliveredText,
    },
    dispatchedStatus: {
        color: primaryColor
    },
    cancelledStatus: {
        color: cancelledText,
    },
    rescheduledStatus: {
        color: black,
    },
    statusDateTime: {
        fontFamily: 'mulish-medium',
        color: black,
        fontSize: 10,
    },
    headerTextWrapper: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        height: 30,
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
        zIndex: 1,
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
    messageOverlay: {
        position: 'absolute',
        width: "100%",
        left: 0,
        top: 0,
        height: 0,
        backgroundColor: secondaryColor,
        zIndex: 2,
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
    textFieldWrapper: {
        width: "100%",
        minHeight: 64,
        maxHeight: 200,
        backgroundColor: white,
        paddingHorizontal: 20,
        paddingVertical: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
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
        minWidth: "100%",
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
    uploadingInputContainer: {
        // width: "100%",
        // height: 60,
        marginBottom: 8,
        display: 'flex',
        flexDirection: 'row',    
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 8,
    },
    uploadingImageWrapper : {
        width: 60,
        height: 60,
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    uploadingImage : {
        width: 60,
        height: 60,
        borderRadius: 12,
        resizeMode: 'cover',
    },
    removeImageButton: {
        position: 'absolute',
        zIndex: 2,
        width: 16,
        height: 16,
        borderRadius: 8,
        backgroundColor: subText,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        top: 4,
        right: 4,
    },
    uploadingDocumentWraper: {
        padding: 10,
        backgroundColor: background,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderRadius: 12,
    },
    uploadingDocName: {
        fontFamily: 'mulish-medium',
        color: bodyText,
        fontSize: 10,
        marginLeft: 12,
        marginRight: 4,
    },

    modalWrapper: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        minHeight: "100%",
        width: "100%",
        paddingBottom: 20,
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
        maxWidth: '70%',
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
    noProductText: {
        fontFamily: "mulish-medium",
        fontSize: 10
    },

    productsDetailsContainer: {
        borderRadius: 12,
        paddingHorizontal: 12,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: background,
    },

    // select warehouse bottomsheet styles
    listWrapper: {
        width: "100%",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 10,
    },
    listItem: {
        width: "100%",
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: 40,
        paddingVertical: 6,
        borderBottomWidth: 1,
        borderBottomColor: listSeparator,
    },
    listText: {
        fontSize: 14,
        fontFamily: 'mulish-semibold',
        color: black,
    },
})
 
export default Chat;