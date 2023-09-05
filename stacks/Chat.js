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
import CalendarIcon from "../assets/icons/CalendarIcon";
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
import ModalButton from "../components/ModalButton";
import Input from "../components/Input";
import SelectInput from "../components/SelectInput";
import MessageContainer from "../components/MessageContainer";
import NumberLink from "../components/NumberLink";
import ProductListSummary from "../components/ProductListSummary";
// import react hooks
import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
// colors
import {
    accent,
    background,
    black,
    bodyText,
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
// moment
import moment from "moment";


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

    const [newChat, setNewChat] = useState(false);

    // check for a newChat
    useLayoutEffect(() => {
        // if newChat variable is receives via the route
        if (route.params.newChat) {
            // set new chat as true
            setNewChat(true);
        }
        
        // after 3 seconds set as false
        setTimeout(() => {
            setNewChat(false);
        }, 3000);

    }, [route.params.newChat]);

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
    const postOrderUserId = "hjsdjkji81899";
    const postOrderTimestamp = "6:30 am";
    const outOfStock = false;


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
            imageUrl: require("../assets/images/maybach-sunglasses.png"),
            checked: true,
        },
        {
            id: 6,
            product_name: "Accurate Watch",
            quantity: 1,
            imageUrl: require("../assets/images/accurate-watch.png"),
            checked: true,
        },
    ]);

    const customerName = "Richard Idana";
    const phoneNumber = ["08165266847", "08123456789"];
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

    const [showStackedOverlay, setShowStackedOverlay] = useState(false);

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

    const calendarRef = useRef(null);
    const [calendarOpen, setCalendarOpen] = useState(false)

    const handleCloseCalendar = () => {
        calendarRef.current?.close();
        setCalendarOpen(false);
    }
    
    const hanldeOpenCalendar = () => {
        calendarRef.current?.present();
        setCalendarOpen(true);
    }

    const handleSelectedLocation = (data) => {
        closeStackedModal();
        setLocation(data);
    }

    
    // use effect to close modal
    useEffect(() => {
        // function to run if back button is pressed
        const backAction = () => {
            // Run your function here
            if (showOverlay) {
                // if modal is open, close modal
                if (calendarOpen) {
                    handleCloseCalendar();
                    return true
                }
                if (showStackedOverlay) {
                    closeStackedModal();
                    return true
                }
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

    }, [showOverlay, calendarOpen, showStackedOverlay]);
   
    // bottom sheet ref
    const bottomSheetModalRef = useRef(null);

    // stacked bottom sheet ref
    const stackedSheetRef = useRef(null);

    // close modal function
    const closeModal = () => {
        bottomSheetModalRef.current?.close();
        setShowOverlay(false);
        setReason("");
    };

    const closeStackedModal = () => {
        stackedSheetRef.current?.close();
        setShowStackedOverlay(false);
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
        } else if (type === "Reschedule order") {
            return setModal({
                type: type,
                snapPoints: ["85%"],
            });
        } else if (type === "Cancel order") {
            return setModal({
                type: type,
                snapPoints: ["80%"],
            });
        } else if (type === "") {
            return setModal({
                type: type,
                snapPoints: ["25%"],
            });
        } else {
            return setModal({
                type: type,
                snapPoints: ["100%"],
            });
        } 
    }

    const openStackedModal = (type) => {
        stackedSheetRef.current?.present();
        setShowStackedOverlay(true);
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

    const handleOnPressPhoneNumber = (phoneNumber) => {
        Keyboard.dismiss();
        openModal("Open with");
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
            onPress: () => {
                openModal("Reschedule order")
            }
        },
        {
            id: 2,
            name: "Cancel",
            onPress: () => {
                openModal("Cancel order")
            }
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
    const [messages, setMessages] = useState([
        {
            reschedule_date: () => {},
            id: 70,
            seen: true,
            user_id: "hjsdjkji81899",
            fullname: "Iffie Ovie",
            company_name: 'Mega Enterprise',
            color: messageSenderColors[0],
            type: 'message',
            timestamp: () => {
                const currentTime = new Date();
                currentTime.setMinutes(currentTime.getMinutes() - 870);
                return currentTime.getTime();
            },
            account_type: 'Merchant',
            file: null,
            reply: false,
            text: "Customer's Name: *Richard Idana*\nPhone Number: 08165266847, 08123456789\nDelivery Address: *No 3 Izono street Udu road, Warri*\nProduct: *Maybach Sunglasses x 1, Accurate Watch x 1*\nPrice: *₦50,000*\nLocation: *Warri, Delta State*\nCharge: *₦3,000*\nLogistics: *Komitex Logistics*\nMerchant: *Mega Enterprise*",
        },
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
            text: 'Hey *there*',
        },
        // {
        //     reschedule_date: () => {},
        //     id: 3,
        //     seen: true,
        //     user_id: "hayaFGye67qY",
        //     fullname: "John Mark",
        //     company_name: 'Komitex Logistics',
        //     color: messageSenderColors[1],
        //     type: 'message',
        //     timestamp: () => {
        //         const currentTime = new Date();
        //         currentTime.setMinutes(currentTime.getMinutes() - 42);
        //         return currentTime.getTime();
        //     },
        //     account_type: 'Logistics',
        //     file: null,
        //     reply: false,
        //     text: 'Lorem *ipsum dolor* sit amet 08045678912 consectetur adipisicing elit. Voluptatibus, labore aperiam blanditiis ex dolor sit?',
        // },
        // {
        //     reschedule_date: () => {},
        //     id: 4,
        //     seen: true,
        //     user_id: "hayaKGye67q4",
        //     fullname: "Felix Jones",
        //     company_name: 'Mega Enterprise',
        //     type: 'message',
        //     color: messageSenderColors[2],
        //     account_type: 'Merchant',
        //     file: null,
        //     reply: false,
        //     timestamp: () => {
        //         const currentTime = new Date();
        //         currentTime.setMinutes(currentTime.getMinutes() - 40);
        //         return currentTime.getTime();
        //     },
        //     text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores blanditiis, sunt, veritatis hic at ipsa quo, rerum corporis mollitia suscipit esse laudantium  iure recusandae vel praesentium. Harum esse deserunt amet.',
        // },
        // {
        //     reschedule_date: () => {},
        //     id: 5,
        //     seen: true,
        //     user_id: "hayaFGye67qY",
        //     fullname: "John Mark",
        //     company_name: 'Komitex Logistics',
        //     color: messageSenderColors[1],
        //     type: 'message',
        //     timestamp: () => {
        //         const currentTime = new Date();
        //         currentTime.setMinutes(currentTime.getMinutes() - 35);
        //         return currentTime.getTime();
        //     },
        //     account_type: 'Logistics',
        //     file: null,
        //     reply: false,
        //     text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint labore, optio accusantium magni ipsa cupiditate corrupti, tempore sunt omnis voluptate libero ad sapiente. Quibusdam quaerat dolorem architecto perferendis numquam aspernatur nesciunt sed expedita recusandae, voluptatem ipsum odit excepturi a amet suscipit repellat, quidem, officia eum mollitia quisquam cumque neque fuga aperiam. Aut nam sunt sit mollitia iste odio magnam iusto? Animi quaerat et delectus maiores corrupti corporis! Aperiam, sint? Praesentium placeat quibusdam dolor, eveniet quae velit nesciunt similique sed sunt aspernatur possimus et ipsum, incidunt optio quam nulla sint maxime nisi error alias. Reiciendis, consectetur eveniet tenetur ut doloremque sed?',
        // },
        // {
        //     reschedule_date: () => {},
        //     id: 6,
        //     seen: true,
        //     user_id: "hayaKGOe67q4",
        //     fullname: "John Doe",
        //     company_name: 'Mega Enterprise',
        //     color: messageSenderColors[3],
        //     type: 'message',
        //     account_type: 'Merchant',
        //     file: null,
        //     reply: false,
        //     timestamp: () => {
        //         const currentTime = new Date();
        //         currentTime.setMinutes(currentTime.getMinutes() - 30);
        //         return currentTime.getTime();
        //     },
        //     seen: true,
        //     seen: true,
        //     text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus illum perspiciatis tempora dolore inventore rerum architecto nam at accusamus vitae eos, in fugit dolores, quod recusandae sapiente? Blanditiis, temporibus saepe beatae reprehenderit delectus eius a. Animi deleniti, sed, beatae excepturi quis aliquid tempore debitis, voluptatum hic pariatur sint veniam velit. Ad ullam vero atque voluptatibus iste provident nesciunt similique, praesentium voluptatum dolorum obcaecati sint voluptas aperiam saepe temporibus dolores illum, unde qui optio quo ratione quod. Ratione ipsam deserunt unde obcaecati fuga quos numquam! Illo consectetur nihil cumque dolor. Facilis enim odit vel quisquam dolorum incidunt mollitia accusantium at corporis quasi fugiat, cumque officia voluptatum id deserunt. Obcaecati distinctio deserunt ut delectus beatae, ipsam aliquam expedita, ea libero asperiores nobis quam facere veritatis ratione quasi natus maxime nihil fuga repellat eveniet cum, dicta suscipit totam? Earum sed magnam esse eveniet iusto deleniti tempore assumenda debitis tenetur soluta quibusdam nihil, id repellat minus voluptatum fugit aspernatur quasi quos illum blanditiis accusantium inventore? Mollitia obcaecati, consequatur quibusdam harum expedita hic illum soluta nam amet blanditiis asperiores in aperiam magni molestiae eligendi, itaque maxime iure consequuntur. Voluptas ad cum aperiam esse expedita nihil repudiandae accusamus, velit earum praesentium rerum, molestias aliquam exercitationem cumque!',
        // },
        // {
        //     reschedule_date: () => {},
        //     id: 7,
        //     seen: true,
        //     user_id: "HayaFGye67qY",
        //     fullname: "John Mark",
        //     company_name: 'Komitex Logistics',
        //     color: messageSenderColors[1],
        //     type: 'message',
        //     timestamp: () => {
        //         const currentTime = new Date();
        //         currentTime.setMinutes(currentTime.getMinutes() - 25);
        //         return currentTime.getTime();
        //     },
        //     account_type: 'Logistics',
        //     file: null,
        //     reply: false,
        //     text: 'Lorem ipsum, dolor sit.',
        // },
        // {
        //     reschedule_date: () => {},
        //     id: 8,
        //     seen: true,
        //     user_id: "HayaFGye67qY",
        //     fullname: "John Mark",
        //     company_name: 'Komitex Logistics',
        //     color: messageSenderColors[1],
        //     type: 'message',
        //     timestamp: () => {
        //         const currentTime = new Date();
        //         currentTime.setMinutes(currentTime.getMinutes() - 25);
        //         return currentTime.getTime();
        //     },
        //     account_type: 'Logistics',
        //     file: null,
        //     reply: false,
        //     text: 'Velit earum praesentium rerum, molestias aliquam exercitationem cumque!',
        // },
        // {
        //     reschedule_date: () => {},
        //     id: 9,
        //     seen: true,
        //     user_id: "hayaKGye67q4",
        //     fullname: "Felix Jones",
        //     company_name: 'Mega Enterprise',
        //     color: messageSenderColors[2],
        //     type: 'message',
        //     timestamp: () => {
        //         const currentTime = new Date();
        //         currentTime.setMinutes(currentTime.getMinutes() - 22);
        //         return currentTime.getTime();
        //     },
        //     account_type: 'Merchant',
        //     file: null,
        //     reply: 5,
        //     text: 'Okay, understood 👍🏾',
        // },
        // {
        //     reschedule_date: () => {},
        //     id: 10,
        //     seen: true,
        //     user_id: "hjsdjkji81899",
        //     fullname: "Iffie Ovie",
        //     company_name: 'Mega Enterprise',
        //     color: messageSenderColors[0],
        //     type: 'message',
        //     timestamp: () => {
        //         const currentTime = new Date();
        //         currentTime.setMinutes(currentTime.getMinutes() - 20);
        //         return currentTime.getTime();
        //     },
        //     account_type: 'Merchant',
        //     file: null,
        //     reply: false,
        //     text: 'Call him now, hes expecting your call',
        // },
        // {
        //     reschedule_date: () => {},
        //     id: 11,
        //     seen: true,
        //     user_id: "HayaFGye67qY",
        //     fullname: "John Mark",
        //     company_name: 'Komitex Logistics',
        //     color: messageSenderColors[1],
        //     type: 'message',
        //     timestamp: () => {
        //         const currentTime = new Date();
        //         currentTime.setMinutes(currentTime.getMinutes() - 25);
        //         return currentTime.getTime();
        //     },
        //     account_type: 'Logistics',
        //     file: null,
        //     reply: 9,
        //     text: 'Velit earum praesentium rerum, molestias aliquam exercitationem cumque!',
        // },
        // {
        //     reschedule_date: () => {},
        //     id: 12,
        //     seen: true,
        //     user_id: "hayaKGOe67q4",
        //     fullname: "John Doe",
        //     company_name: 'Mega Enterprise',
        //     color: messageSenderColors[3],
        //     type: 'image',
        //     account_type: 'Merchant',
        //     file: {
        //         name: 'image',
        //         path: require('../assets/chat/3.jpeg')
        //     },
        //     reply: false,
        //     timestamp: () => {
        //         const currentTime = new Date();
        //         currentTime.setMinutes(currentTime.getMinutes() - 24);
        //         return currentTime.getTime();
        //     },
        //     text: null,
        // },
        // {
        //     reschedule_date: () => {},
        //     id: 13,
        //     seen: true,
        //     user_id: "HayaFGye67qY",
        //     fullname: "John Mark",
        //     company_name: 'Komitex Logistics',
        //     color: messageSenderColors[1],
        //     type: 'image',
        //     timestamp: () => {
        //         const currentTime = new Date();
        //         currentTime.setMinutes(currentTime.getMinutes() - 23);
        //         return currentTime.getTime();
        //     },
        //     account_type: 'Logistics',
        //     file: {
        //         name: 'image',
        //         path: require('../assets/chat/2.jpg')
        //     },
        //     reply: 9,
        //     text: 'Velit earum praesentium rerum!',
        // },
        // {
        //     reschedule_date: () => {},
        //     id: 14,
        //     seen: true,
        //     user_id: "hayaKGOe67q4",
        //     fullname: "John Doe",
        //     company_name: 'Mega Enterprise',
        //     color: messageSenderColors[3],
        //     type: 'image',
        //     account_type: 'Merchant',
        //     file: {
        //         name: 'image',
        //         path: require('../assets/chat/1.jpg')
        //     },
        //     reply: false,
        //     timestamp: () => {
        //         const currentTime = new Date();
        //         currentTime.setMinutes(currentTime.getMinutes() - 21);
        //         return currentTime.getTime();
        //     },
        //     text: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti cupiditate excepturi ratione aperiam fugiat, provident molestiae repellendus. Deserunt, consequatur est.`,
        // },
        // {
        //     reschedule_date: () => {},
        //     id: 15,
        //     seen: true,
        //     user_id: "HayaFGye67qY",
        //     fullname: "John Mark",
        //     company_name: 'Komitex Logistics',
        //     color: messageSenderColors[1],
        //     type: 'image',
        //     timestamp: () => {
        //         const currentTime = new Date();
        //         currentTime.setMinutes(currentTime.getMinutes() - 20);
        //         return currentTime.getTime();
        //     },
        //     account_type: 'Logistics',
        //     file: {
        //         name: 'image',
        //         path: require('../assets/chat/4.jpg')
        //     },
        //     reply: 6,
        //     text: null,
        // },
        // {
        //     reschedule_date: () => {},
        //     id: 16,
        //     seen: true,
        //     user_id: "hayaKGOe67q4",
        //     fullname: "John Doe",
        //     company_name: 'Mega Enterprise',
        //     color: messageSenderColors[3],
        //     type: 'message',
        //     account_type: 'Merchant',
        //     file: null,
        //     reply: 12,
        //     timestamp: () => {
        //         const currentTime = new Date();
        //         currentTime.setMinutes(currentTime.getMinutes() - 20);
        //         return currentTime.getTime();
        //     },
        //     text: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam, rem!`,
        // },
        // {
        //     reschedule_date: () => {},
        //     id: 17,
        //     seen: true,
        //     user_id: "hayaKGOe67q4",
        //     fullname: "John Doe",
        //     company_name: 'Mega Enterprise',
        //     color: messageSenderColors[3],
        //     type: 'message',
        //     account_type: 'Merchant',
        //     file: null,
        //     reply: 13,
        //     timestamp: () => {
        //         const currentTime = new Date();
        //         currentTime.setMinutes(currentTime.getMinutes() - 20);
        //         return currentTime.getTime();
        //     },
        //     text: `Lorem ipsum dolor!`,
        // },
        // {
        //     reschedule_date: () => {},
        //     id: 18,
        //     seen: true,
        //     user_id: "HayaFGye67qY",
        //     fullname: "John Mark",
        //     company_name: 'Komitex Logistics',
        //     color: messageSenderColors[1],
        //     type: 'message',
        //     timestamp: () => {
        //         const currentTime = new Date();
        //         currentTime.setMinutes(currentTime.getMinutes() - 20);
        //         return currentTime.getTime();
        //     },
        //     account_type: 'Logistics',
        //     file: null,
        //     reply: 14,
        //     text: 'J Hus activate all your Chakra 🧘🏾🧘🏾‍♀️🧘🏾‍♀️',
        // },
        // {
        //     reschedule_date: () => {},
        //     id: 19,
        //     seen: true,
        //     user_id: "HayaFGye67qY",
        //     fullname: "John Mark",
        //     company_name: 'Komitex Logistics',
        //     color: messageSenderColors[1],
        //     type: 'message',
        //     timestamp: () => {
        //         const currentTime = new Date();
        //         currentTime.setMinutes(currentTime.getMinutes() - 18);
        //         return currentTime.getTime();
        //     },
        //     account_type: 'Logistics',
        //     file: null,
        //     reply: 15,
        //     text: 'Put my hands in every Pie 🍕🍕🍕',
        // },
        // {
        //     reschedule_date: () => {},
        //     id: 20,
        //     seen: true,
        //     user_id: "hjsdjkji81899",
        //     fullname: "Iffie Ovie",
        //     company_name: 'Mega Enterprise',
        //     color: messageSenderColors[0],
        //     type: 'document',
        //     timestamp: () => {
        //         const currentTime = new Date();
        //         currentTime.setMinutes(currentTime.getMinutes() - 15);
        //         return currentTime.getTime();
        //     },
        //     account_type: 'Merchant',
        //     file: {
        //         name: 'ovie-resumé',
        //         url: '../assets/chat/ovie-resumé.pdf',
        //         size: '128KB',
        //         format: 'pdf',
        //     },
        //     reply: false,
        //     text: null,
        // },
        // {
        //     reschedule_date: () => {},
        //     id: 21,
        //     seen: true,
        //     user_id: "hjsdjkji81899",
        //     fullname: "Iffie Ovie",
        //     company_name: 'Mega Enterprise',
        //     color: messageSenderColors[0],
        //     type: 'message',
        //     timestamp: () => {
        //         const currentTime = new Date();
        //         currentTime.setMinutes(currentTime.getMinutes() - 15);
        //         return currentTime.getTime();
        //     },
        //     account_type: 'Merchant',
        //     file: null,
        //     reply: 1,
        //     text: 'Testing...',
        // },
        // {
        //     reschedule_date: () => {},
        //     id: 22,
        //     seen: true,
        //     user_id: "hjsdjkji81899",
        //     fullname: "Iffie Ovie",
        //     company_name: 'Mega Enterprise',
        //     color: messageSenderColors[0],
        //     type: 'message',
        //     timestamp: () => {
        //         const currentTime = new Date();
        //         currentTime.setMinutes(currentTime.getMinutes() - 14);
        //         return currentTime.getTime();
        //     },
        //     account_type: 'Merchant',
        //     file: null,
        //     reply: 20,
        //     text: 'This is the file I mentioned earlier',
        // },
        // {
        //     reschedule_date: () => {},
        //     id: 23,
        //     seen: true,
        //     user_id: "HayaFGye67qY",
        //     fullname: "John Mark",
        //     company_name: 'Komitex Logistics',
        //     color: messageSenderColors[1],
        //     type: 'message',
        //     timestamp: () => {
        //         const currentTime = new Date();
        //         currentTime.setMinutes(currentTime.getMinutes() - 11);
        //         return currentTime.getTime();
        //     },
        //     account_type: 'Logistics',
        //     file: null,
        //     reply: 20,
        //     text: `Send the document in MS Word format for easy editing`,
        // },
        // {
        //     reschedule_date: () => {},
        //     id: 24,
        //     seen: true,
        //     user_id: "HayaFGye67qY",
        //     fullname: "John Mark",
        //     company_name: 'Komitex Logistics',
        //     color: messageSenderColors[1],
        //     type: 'message',
        //     timestamp: () => {
        //         const currentTime = new Date();
        //         currentTime.setMinutes(currentTime.getMinutes() - 11);
        //         return currentTime.getTime();
        //     },
        //     account_type: 'Logistics',
        //     file: null,
        //     reply: false,
        //     text: `Don't worry let me convert it`,
        // },
        // {
        //     reschedule_date: () => {},
        //     id: 25,
        //     seen: true,
        //     user_id: "HayaFGye67qY",
        //     fullname: "John Mark",
        //     company_name: 'Komitex Logistics',
        //     color: messageSenderColors[1],
        //     type: 'document',
        //     timestamp: () => {
        //         const currentTime = new Date();
        //         currentTime.setMinutes(currentTime.getMinutes() - 10);
        //         return currentTime.getTime();
        //     },
        //     account_type: 'Logistics',
        //     file: {
        //         name: 'Ovie-resumé',
        //         url: '../assets/chat/ovie-resumé.pdf',
        //         size: '128KB',
        //         format: 'docx',
        //     },
        //     reply: false,
        //     text: `I converted it to .docx`,
        // },
        // {
        //     id: 26,
        //     seen: true,
        //     user_id: "hjsdjkji81899",
        //     fullname: "Iffie Ovie",
        //     company_name: 'Mega Enterprise',
        //     color: messageSenderColors[0],
        //     type: 'message',
        //     timestamp: () => {
        //         const currentTime = new Date();
        //         currentTime.setMinutes(currentTime.getMinutes() - 8);
        //         return currentTime.getTime();
        //     },
        //     account_type: 'Merchant',
        //     file: null,
        //     reply: 25,
        //     text: 'Okay thanks 👍🏾',
        //     reschedule_date: () => {},
        // },
        // {
        //     id: 27,
        //     seen: true,
        //     user_id: "hayaKGOe67q4",
        //     fullname: "John Doe",
        //     company_name: 'Mega Enterprise',
        //     color: messageSenderColors[0],
        //     type: 'Rescheduled',
        //     timestamp: () => {
        //         const currentTime = new Date();
        //         currentTime.setMinutes(currentTime.getMinutes() - 5);
        //         return currentTime.getTime();
        //     },
        //     account_type: 'Merchant',
        //     file: null,
        //     reply: false,
        //     text: 'The customer travelled and would return on saturday',
        //     reschedule_date: () => {
        //         const currentDate = new Date();
        //         const futureDate = new Date(currentDate.setDate(currentDate.getDate() + 3));
                
        //         const options = { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' };
        //         const formattedDate = futureDate.toLocaleDateString('en-US', options);
                
        //         return formattedDate;
        //     }
        // },
    ]);

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
                        account_type: accountType,
                        color: messageSenderColors[0],
                        type: 'Edited',
                        timestamp: () => {
                            const currentTime = new Date();
                            return currentTime.getTime();
                        },
                        file: null,
                        reply: false,
                        reschedule_date: () => {},
                        text: `Customer's Name: *Richard Idana*\nPhone Number: 08165266847, 08123456789\nDelivery Address: *${address}*\nProduct: *${products.map((product) => { return ` ${product.product_name} x ${product.quantity}`})}*\nPrice: *₦${price.toLocaleString()}*\nLocation: *${location.location}*\nCharge: *₦${location.charge.toLocaleString()}*\nLogistics: *Komitex Logistics*\nMerchant: *Mega Enterprise*`,
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
                        account_type: accountType,
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
                        account_type: accountType,
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

                        <View style={[style.editButtonWrapper, accountType === "Merchant" && {justifyContent: 'flex-end'}]}>
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
                                    message={message}
                                    messages={messages}
                                    customerName={customerName}
                                    phoneNumber={phoneNumber}
                                    address={address}
                                    location={location}
                                    products={products}
                                    price={price}
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
                        onPress={() => sendMessage("message")}
                    >
                        <SendIcon />
                    </TouchableOpacity>
                </View>
            </View>

            {/* calendar */}
            <CalendarSheet 
                closeCalendar={handleCloseCalendar}
                setDate={setRescheduleDate}
                disableActionButtons={true}
                snapPointsArray={["55%"]}
                minDate={tomorrow}
                calendarRef={calendarRef} 
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
                                        <Text style={style.producPlaceholder}>Products Selected</Text>
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
                        <ModalButton
                            name={"Done"}
                            emptyFeilds={isAnyFieldEmpty}
                            onPress={submitEditOrder}
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
                                        <Text style={style.producPlaceholder}>Products Selected</Text>
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
                                    onPress={hanldeOpenCalendar}
                                    icon={<CalendarIcon />}
                                    active={false}
                                    inputFor={"Reschedule Date"}
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
                        <ModalButton
                            name={"Done"}
                            emptyFeilds={!rescheduleDate ? true : false}
                            onPress={submitRescheduledOrder}
                        />
                    </>
                )}
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
                                        <Text style={style.producPlaceholder}>Products Selected</Text>
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
                        <ModalButton
                            name={"Done"}
                            emptyFeilds={!reason ? true : false}
                            onPress={submitCancelledOrder}
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

            {/* bottom sheet to edit product and location */}
            <CustomBottomSheet 
                bottomSheetModalRef={stackedSheetRef}
                setShowOverlay={setShowStackedOverlay}
                showOverlay={showStackedOverlay}
                closeModal={closeStackedModal}
                snapPointsArray={stackedModal.snapPoints}
                autoSnapAt={0}
                sheetTitle={stackedModal.type}
                topContentPadding={8}
                stackBehavior={"push"}
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
            { newChat && (
                <AlertNewChat 
                    text={type + " successfully created"}
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