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
// components
import ActionButton from "../components/ActionButton";
import Header from "../components/Header";
import Indicator from "../components/Indicator";
import AlertNotice from "../components/AlertNotice";
import AlertNewChat from "../components/AlertNewChat";
import CustomBottomSheet from "../components/CustomBottomSheet";
import AddProductsModalContent from "../components/AddProductsModalContent";
import AddLocationModalContent from "../components/AddLocationModalContent";
import CalendarSheet from "../components/CalendarSheet";
import Product from "../components/Product";
import CustomButton from "../components/CustomButton";
import Input from "../components/Input";
import SelectInput from "../components/SelectInput";
import MessageContainer from "../components/MessageContainer";
import ProductListSummary from "../components/ProductListSummary";
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
import { messages } from "../data/messages";
// use Auth
import { useAuth } from "../context/AuthContext";

const Chat = ({navigation, route}) => {

    const { authData } = useAuth()

    const { bottomSheetRef, stackedSheetRef, calendarSheetRef, bottomSheetOpen } = useGlobals();

    // messages ref
    const messagesRefs = useRef([]);

    // scroll view ref
    const scrollViewRef = useRef();
    // has scrolled to bottom ref
    const hasScrolledToBottom = useRef(false);

    // message overlay to show when auto scroll to replied message
    // it hightights a replied message
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

    const [newChat, setNewChat] = useState({
        open: false,
        copyAlert: false,
    });

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

    // alert state
    const [alert, setAlert] = useState({
        show: false,
        type: "Success",
        text: ""
    });

    const closeAlert = () => {
        setAlert(prevAlert => {
            return {
                ...prevAlert,
                show: false
            }
        });
    };

    const openAlert = (type, text) => {
        setAlert({
            show: true,
            type: type,
            text: text
        });

        // auto close alert after 4 seconds
        setTimeout(() => {
            closeAlert();
        }, 4000);
    }

    // chat rout parameters
    const {id, type, name, imageUrl} = route.params;

    // accoutntype, retreived from global variables
    const accountType = "Merchant";
    const userId = "hjsdjkji81899";
    const companyName = "Mega Enterprise";
    const fullname = "Iffie Ovie";
    const emptyStock = false;


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
            imageUrl: "../assets/images/maybach-sunglasses.png",
            checked: true,
        },
        {
            id: 6,
            product_name: "Accurate Watch",
            quantity: 1,
            imageUrl: "../assets/images/accurate-watch.png",
            checked: true,
        },
    ]);

    const address = "No 3 Izono street Udu road, Warri";
    const [location, setLocation] = useState({
        id: Math.random(),
        location: "Warri",
        charge: 3000,
    });

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
            <Image 
                source={require("../assets/images/default.png")}
                style={style.headerImage}
            />
            <View style={style.headerTextWrapper}>
                <Text style={style.headerPrimaryText}>{name}</Text>
                <Text style={style.headerSecondaryText}>{type === "Order" ? "Order" : "Waybill"} ID: Y5lq3xgCK9rkKRD7oJ4Q</Text>
            </View>
        </View>
    );

    // modal overlay
    // const [showOverlay, setShowOverlay] = useState(false);

    // modal state
    const [modal, setModal] = useState({
        type: "Open with",
        snapPoints: ["25%"],
    });

    // modal state
    const [stackedModal, setStackedModal] = useState({
        type: "Products",
        snapPoints: ["75%"],
    });

    const [linkPhoneNumber, setLinkPhoneNumber] = useState("");

    const closeCalendar = () => {
        calendarSheetRef.current?.close();
    }
    
    const openCalendar = () => {
        calendarSheetRef.current?.present();
    }

    const handleSelectedLocation = (data) => {
        closeStackedModal();
        setLocation(data);
    }
    
    // close modal function
    const closeModal = () => {
        bottomSheetRef.current?.close();
        setReason("");
    };

    // open modal function
    const openModal = (type) => {
        // open bottomsheet modal
        bottomSheetRef.current?.present();
        // set modal type
        if (type === "Open with") {
            return setModal({
                type: type,
                snapPoints: [198],
            });
        } else if (type === "Reschedule order") {
            return setModal({
                type: type,
                snapPoints: ["100%"],
            });
        } else if (["Cancel order", "Dispatch order", "Deliver order"].includes(type)) {
            return setModal({
                type: type,
                snapPoints: [520],
            });
        } else if (type === "") {
            return setModal({
                type: type,
                snapPoints: [198],
            });
        } else {
            return setModal({
                type: type,
                snapPoints: ["100%"],
            });
        } 
    }

    // console.log(Keyboard.isVisible())

    const openStackedModal = (type) => {
        stackedSheetRef.current?.present();
        if (type === "Products") {
            setStackedModal({
                type: "Products",
                snapPoints: ["75%"],
            })
        } else {
            setStackedModal({
                type: "Locations",
                snapPoints: ["75%"],
            })
        }
    }

    const closeStackedModal = () => {
        stackedSheetRef.current?.close();
    };

    const handleOnPressPhoneNumber = (phoneNumber) => {
        // Keyboard.dismiss();
        openModal("Open with");
        // set phone  number thats passed to dailing function
        setLinkPhoneNumber(phoneNumber);
    }

    const handleEditOrder = () => {
        openModal("Edit order");
    }


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
    ];

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
    const [messages, setMessages] = useState(messages);

    // update messages
    useEffect(() => {
        setMessages(messages)
    }, [messages])

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
            }
            setTextInput("");
            setReplying(null);
            hasScrolledToBottom.current = false;
            scrollToBottom(true);
        }
    }

    const replyingSenderName = (targetMessage) => {

        if (authData?.account_type !== targetMessage.account_type) {
            return targetMessage.company_name;
        }

        return userId === targetMessage.user_id ? "You" : targetMessage.fullname
    }

    const replyingSenderText = (targetMessage) => {

        return targetMessage.text.length > 175 ? targetMessage.text.slice(0, 175) + "..." : targetMessage.text;
    }

    const processText = (text) => {

        if (!text.includes('*')) return text;
        
        const textArray = text.split('*');
        
        if (textArray.length < 3) {
            return textArray.join("*");
        } else {
            return textArray.join("");
        }
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
                            {/* {replyingSenderText(processText(targetMessage))} */}
                            {processText(replyingSenderText(targetMessage))}
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

    const uploadingMesaageInput = (uploadingDataArray) => {
        return (
            <ScrollView 
                showsHorizontalScrollIndicator={false} 
                horizontal={true}
                contentContainerStyle={style.uploadingInputContainer}
            >
                {/* uplaoding images from Gallery or Camera */}
                {["Gallery", "Camera"].includes(uploadingDataArray.uploadType) && uploadingDataArray.assets.map(item => (
                    <View style={style.uploadingImageWrapper} key={item.assetId}>
                        <TouchableOpacity
                            style={style.removeImageButton}
                            onPress={() => removeImageFromUpload(item.assetId)}
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

    // function to remiove image from upload list
    const removeImageFromUpload = (id) => {
        setUploading(prevUploading => {
            // filter list
            const newUploadList = prevUploading.assets.filter(item => item.assetId !== id);
            // check if list is zero
            if (newUploadList.length === 0) return false; // return false if length is zero 
            return { // else return updated list
                uploadType: "Gallery",
                assets: newUploadList
            }
        })
    }

    const removeDocFromUpload = () => {
        setUploading(false);
    }

    const [reason, setReason] = useState("");
    const [errorReason, setErrorReason] = useState(false);

    const [errorCharge, setErrorCharge] = useState(false);
    const [errorPrice, setErrorPrice] = useState(false);

    // variable to check for empty fields
    const isAnyFieldEmpty = [
        location, 
        products, 
        price
        ].some((item) => {
            return item === null || item === '' || item === undefined || item === 0 || item === NaN || (Array.isArray(item) && item.length === 0);
        }
    );

    // submit edited order details
    const submitEditOrder = () => {
        hasScrolledToBottom.current = false;
        scrollToBottom(true); // animate === true
        sendMessage("Edited");
        Keyboard.dismiss();
        closeModal();
        openAlert('Success', 'Order edited successfully');
    }
    
    // submit order rescheduled information
    const submitRescheduledOrder = () => {
        Keyboard.dismiss();
        hasScrolledToBottom.current = false;
        scrollToBottom(true); // animate === true
        sendMessage("Rescheduled");
        closeModal();
        openAlert('Success', 'Order rescheduled successfully');
    }
    
    // submit order cancelled information
    const submitCancelledOrder = () => {
        hasScrolledToBottom.current = false;
        Keyboard.dismiss();
        scrollToBottom(true); // animate === true
        sendMessage("Cancelled");
        closeModal();
        openAlert('Success', 'Order cancelled successfully');
    }

    const submitDispatchedOrder = () => {
        hasScrolledToBottom.current = false;
        Keyboard.dismiss();
        scrollToBottom(true); // animate === true
        sendMessage("Dispatched");
        closeModal();
        openAlert('Success', 'Order dispatched successfully');
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

    // 
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

    // navugate to camera
    const navigateToCamera = () => {
        closeModal();
        Keyboard.dismiss();
        navigation.navigate("CaptureImage", {
            origin: "Chat",
            id: id,
            type: type,
            name: name,
            imageUrl: imageUrl,
        })
    }

    // if bottomsheet modal is closed with back button set reason as ""
    useEffect(() => {
        if (!bottomSheetOpen) return setReason("");
    }, [bottomSheetOpen])



    return (
        <>
            {/* chat header */}
            <View style={style.headerContainer}>
                {/* header component */}
                <Header
                    navigation={navigation}
                    stackName={ChatHeader}
                    component={true}
                    iconFunction={() => {}}
                    icon={<MenuIcon />}
                    removeBackArrow={true}
                    inlineArrow={true}
                    backgroundColor={white}
                />
            </View>

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

                        <View style={[style.editButtonWrapper, authData?.account_type === "Merchant" && {justifyContent: 'flex-end'}]}>
                            <TouchableOpacity 
                                style={style.editButton}
                                onPress={handleEditOrder}
                            >
                                <EditIcon />
                                <Text style={style.editButtonText}>Edit Order</Text>
                            </TouchableOpacity>
                        </View>
                        

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
                                />
                            );
                        })}

                    </View>
                </View>
            </ScrollView>

            {/* text field wrapper */}
            <View style={style.textFieldWrapper}>
                { !replying && !uploading && (
                    <View style={style.actionButtonsWrapper}>
                        { type === "Order" && orderButtons.map((button) => {
                            if (authData?.account_type === "Merchant"){
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

                        { type === "Waybill" && authData?.account_type === "Logistics" && (
                            <ActionButton 
                                name={waybillButton.name}
                                onPress={waybillButton.onPress}
                            />
                        )}
                    </View>
                )}
                { replying && ReplyingMessageInput(replying) }
                { uploading && uploadingMesaageInput(uploading) }
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
            <CalendarSheet 
                closeCalendar={closeCalendar}
                setDate={setRescheduleDate}
                disableActionButtons={true}
                snapPointsArray={["55%"]}
                minDate={tomorrow}
                calendarRef={calendarSheetRef} 
            />
            
            {/* Bottom sheet component */}
            <CustomBottomSheet 
                bottomSheetModalRef={bottomSheetRef}
                closeModal={closeModal}
                snapPointsArray={modal.snapPoints}
                autoSnapAt={0}
                sheetTitle={modal.type}
                topContentPadding={8}
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
                    </>
                )}
                {/* Reschedule order */}
                { modal.type === "Reschedule order" && (
                    <>
                        <BottomSheetScrollView contentContainerStyle={style.modalWrapper}>
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
                                            <ProductListSummary
                                                key={product.id}
                                                product_name={product.product_name}
                                                quantity={product.quantity}
                                                imageUrl={product.imageUrl}
                                                padded={true}
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
                { modal.type === "Cancel order" && (
                    <>
                        <BottomSheetScrollView contentContainerStyle={style.modalWrapper}>
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
                                            <ProductListSummary
                                                key={product.id}
                                                product_name={product.product_name}
                                                quantity={product.quantity}
                                                imageUrl={product.imageUrl}
                                                padded={true}
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
                {/* cancel order */}
                { modal.type === "Dispatch order" && (
                    <>
                        <BottomSheetScrollView contentContainerStyle={style.modalWrapper}>
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
                                            <ProductListSummary
                                                key={product.id}
                                                product_name={product.product_name}
                                                quantity={product.quantity}
                                                imageUrl={product.imageUrl}
                                                padded={true}
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
                bottomSheetModalRef={stackedSheetRef}
                closeModal={closeStackedModal}
                snapPointsArray={stackedModal.snapPoints}
                autoSnapAt={0}
                sheetTitle={stackedModal.type}
                topContentPadding={8}
                stacked={true}
            >
                {stackedModal.type === "Products" && (
                    <AddProductsModalContent 
                        addProducts={addProducts} selectedProducts={products}
                    />
                )}

                {stackedModal.type === "Locations" && (
                    <AddLocationModalContent 
                        handleSelectedLocation={handleSelectedLocation}
                    />
                )}
            </CustomBottomSheet>

            {/* success alert to display on addproduct or edit product */}
            { alert.show && (
                <AlertNotice 
                    type={alert.type}
                    text={alert.text}
                    closeAlert={closeAlert}
                    show={alert.show}
                />
            )}

            {/* Alert to display whena  new order or waybill is created */}
            { newChat.open && (
                <AlertNewChat 
                    show={newChat.show}
                    text={type + " successfully created"}
                    copyNumberAlert={newChat.copyAlert}
                />
            )}
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
        alignSelf: 'stretch',
        flex: 1,
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
        padding: 12,
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        backgroundColor: background,
    }
})
 
export default Chat;