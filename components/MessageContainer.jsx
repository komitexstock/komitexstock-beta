import { View, Text, TouchableOpacity, Image, StyleSheet, Animated, PanResponder } from "react-native";
import { useEffect, useRef, useState } from "react";
// import helper functions
import { convertUTCToTime } from "../utils/convertUTCToTime";
// icons
import SentDocumentIcon from "../assets/icons/SentDocumentIcon";
import ReceivedDocumentIcon from "../assets/icons/ReceivedDocumentIcon";
import OrderRescheduled from "../assets/icons/OrderRescheduled";
import OrderReturned from "../assets/icons/OrderReturned";
import OrderDelivered from "../assets/icons/OrderDelivered";
import OrderDispatched from "../assets/icons/OrderDispatched";
import OrderCancelled from "../assets/icons/OrderCancelled";
import RepliedImageIcon from "../assets/icons/RepliedImageIcon";
import RepliedDocumentIcon from "../assets/icons/RepliedDocumentIcon";
import EditWhiteIcon from "../assets/icons/EditWhiteIcon";
import EditBlackIcon from "../assets/icons/EditBlackIcon";
import MessageArrowWhiteIcon from "../assets/icons/MessageArrowWhiteIcon";
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
    subText,
    rescheduledContainer,
    cancelledContainer,
    deliveredMessageBody,
    cancelledText,
    deliveredText,
} from "../style/colors";
// components
import NumberLink from "./NumberLink";
import Menu from "./Menu";
// useAuth
import { useAuth } from "../context/AuthContext"

const MessageContainer = ({messages, message, index, messagesRefs, copyNumberAlert, products, handleOnPressPhoneNumber, handleScrollToComponent, setReplying, textInputRef, navigation, openMenu}) => {

    const { authData } = useAuth()

    // accoutntype, retreived from global variables
    const userId = "hjsdjkji81899";
    const postOrderUserId = "hjsdjkji81899";

    const customMessages = ['Rescheduled', 'Dispatched', 'Cancelled', 'Delivered', 'Returned', 'Edited'];

    const [isDragging, setIsDragging] = useState(false);
        
    const createPanResponder = (pan, id) => {
        
        return PanResponder.create({
            onMoveShouldSetPanResponderCapture: (event, gestureState) => {
                // Check if there is movement in the x-axis
                const isXMovement = Math.abs(gestureState.dx) > 0;
                // Check if the movement exceeds the threshold (e.g., 10)
                const isAboveThreshold = Math.abs(gestureState.dx) > 10;
                // Return true only if there is movement in the x-axis and it exceeds the threshold
                return isXMovement && isAboveThreshold;
            },
            onPanResponderGrant: () => {
                pan.setOffset(pan._value);
                // pan.setOffset(0);
                pan.setValue(0);
            },
            onPanResponderMove: (event, gestureState) => {
                if (gestureState.dx < 0) return pan.setValue(0);
                pan.setValue(gestureState.dx);
                setIsDragging(true);
                // console.log(event);
            },
            onPanResponderEnd: () => {
                if (isDragging) {
                    // Animate the return to the original position
                    Animated.spring(pan, {
                        toValue: 0,
                        useNativeDriver: false,
                        // tension: 60,
                    }).start(() => {
                        pan.setOffset(0);
                    });
                    setReplying(id);
                    textInputRef.current.focus();
                    setIsDragging(false);
                }
            }
        })
    };

    const messageSenderName = (user_id, full_name, reply) => {
        if (reply) {
            if (userId === user_id) return "You replied"
            return `${full_name} replied`;
            // return "You replied"
        } else {
            return userId === user_id ? "Me" : full_name 
        }
    }


    const messageSender = (account_type, user_id, full_name, prev_id, company_name, color, reply) => {

        if (authData?.account_type === account_type) {
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

    const repliedMessageSender = (account_type, user_id, full_name, company_name) => {

        if (authData?.account_type === account_type) {
            return user_id === userId ? "Me" : full_name;
        } else {
            return company_name;
        }
    };

    const findPhoneNumbers = (string) => {
        const regex = /(\+?\d{1,3}\s?)?\d{10,13}/g;
        let matches = [];
        
        let match;
        while ((match = regex.exec(string)) !== null) {
          const startIndex = match.index;
          const endIndex = startIndex + match[0].length;
          
          if (match[0].length >= 10) {
            matches.push(startIndex, endIndex);
          }
        }
        
        return matches;
    }

    const sliceStringByNumbers = (string, numbers) => {
        numbers = [0, ...numbers]; // Add initial 0 index
        let slicedStrings = [];
        
        for (let i = 0; i < numbers.length; i++) {
          const startIndex = numbers[i];
          const endIndex = numbers[i + 1];
          
          const slicedString = string.slice(startIndex, endIndex);
          slicedStrings.push(slicedString);
        }
        
        return slicedStrings;
    }

    // handle bold text
    const handleBoldText = (text, account_type, repliedText, index_) => {
        // if index isn't provided use 0
        const index1 = index_ ? index_ : 0;
        // if no asterix, retun text as it is
        if (!text.includes('*')) return text;
        const textArray = text.split('*'); // split text where asterix exist
        // if its a text that shows above the text input thats rbeing replied to
        // return the text without all the asterix
        if (repliedText) return textArray.join("");
        // if thext contains just one asterix, return text as it is
        if (textArray.length < 3) {
            if (!index_) return textArray.join("*");
            return <Text key={index1}>{textArray.join("*")}</Text>;
        } else {
            return textArray.map((item, index2) => {
                // odd text
                if (index2 % 2 === 0) {
                    return <Text key={`${index1}${index2}`}>{item}</Text>;
                } else {
                    return (
                        <Text 
                            key={`${index1}${index2}`} 
                            style={[
                                style.messageHeading, 
                                authData?.account_type === account_type && style.sentHeading
                            ]}
                        >
                            {item}
                        </Text>
                    )
                }
            })
        }
    }

    const handleTextIcons = (text, account_type, repliedText) => {
        const textArray = text.split('&arrow&');
        return textArray.map((item, index) => {
            if (index % 2 === 0) {
                return <Text key={index}>{processText(item, account_type, repliedText)}</Text>;
            } else {
                return <Text key={index}>
                    &nbsp;<MessageArrowWhiteIcon />&nbsp;
                    {processText(item, account_type, repliedText)}
                </Text>;             
            }
        })
    }

    // process text function, makes text bold and highlights phone number
    const processText = (text, account_type, repliedText) => {

        // first check if phone numbers exist in text
        const phoneNumbersIndex = findPhoneNumbers(text);
        
        // no phone number found
        if (phoneNumbersIndex.length === 0) {
            // handle bold text where neccesary
            return handleBoldText(text, account_type, repliedText)
            
        } else {
            const stringWithPhoneNumbers = sliceStringByNumbers(text, phoneNumbersIndex);

            return stringWithPhoneNumbers.map((item, index1) => {
                // odd element in array, would be text
                if (index1 % 2 === 0) { // actual text
                    // handle bold text
                    return handleBoldText(item, account_type, repliedText, index1)
                    
                } else { // even elements in array would be phone number
                    if (repliedText) return item;
                    return (
                        <NumberLink
                            key={index1}
                            number={item}
                            onPress={() => handleOnPressPhoneNumber(item)}
                            account_type={account_type}
                            copyNumberAlert={copyNumberAlert}
                        />
                    );
                }
            })
        }
    }


    // message body function
    const messageBody = (account_type, text, reply, file, timestamp, user_id, full_name, company_name, type, reschedule_date, id) => {

        const repliedMessage = messages.filter(message => message.id === reply);
        
        return (
            <TouchableOpacity 
                style={[
                    style.message,
                    authData?.account_type === account_type ? style.sent : style.received,
                    // for sent messages or messages from my team
                    // remove padding from file
                    file && authData?.account_type === account_type && {borderBottomRightRadius: 12, borderBottomRightRadius: 12},
                    // apply padding to text
                    text && authData?.account_type === account_type && {paddingTop: 0, padding: 10, borderBottomRightRadius: 0},
                    // for received messages from other team
                    // remove padding from file
                    file && authData?.account_type !== account_type && {borderBottomRightRadius: 12, borderBottomLeftRadius: 12},
                    // apply padding to text
                    text && authData?.account_type !== account_type && {paddingTop: 0, padding: 10, borderBottomLeftRadius: 0},
                    // general
                    reply && {paddingTop: 0, padding: 10},
                    ["Rescheduled", "Returned"].includes(type) && {backgroundColor: rescheduledContainer},
                    type === "Cancelled" && {backgroundColor: cancelledContainer},
                    type === "Delivered" && {backgroundColor: deliveredMessageBody},
                    type === "Dispatched" && {backgroundColor: secondaryColor},
                    // always pad custom messages regardless of is text is present
                    customMessages.includes(type) && {paddingTop: 0, padding: 10},
                ]}
                delayLongPress={250}
                onLongPress={() => {
                    const customMessages = ['Rescheduled', 'Cancelled', 'Returned', 'Delivered', 'Dispatched' ];
                    if (customMessages.includes(type)) return;
                    openMenu("message", id)}
                }
                activeOpacity={1}
                onLayout={(e) => {
                    const width = e.nativeEvent.layout.width;
                    setTimeout(() => {
                        messagesRefs.current = messagesRefs.current.map(item => {
                            if (item.id === id) {
                                return {
                                    ...item,
                                    width: width,
                                }
                            }
                            return item
                        });
                    }, 2000);
                }}
            >
                {/* replied text message */}
                { reply && repliedMessage[0].type === 'message' && 
                    <TouchableOpacity 
                        // specific to sent messages or messages from my team
                        activeOpacity={authData?.account_type === account_type && 0.95} 
                        style={style.repliedMessage}
                        onPress={() => {
                            handleScrollToComponent(reply)
                        }}
                        delayLongPress={250}
                        onLongPress={() => {
                            const customMessages = ['Rescheduled', 'Cancelled', 'Returned', 'Delivered', 'Dispatched' ];
                            if (customMessages.includes(type)) return;
                            openMenu("message", id)}
                        }
                    >
                        <Text style={style.repliedUser}>
                            { repliedMessageSender(
                                repliedMessage[0].account_type,
                                repliedMessage[0].user_id, 
                                repliedMessage[0].fullname,
                                repliedMessage[0].company_name,
                            )}
                        </Text>
                        <Text style={style.repliedText}>
                            {repliedMessage[0].text.length > 175 ? 
                                handleTextIcons(repliedMessage[0].text.slice(0, 175), account_type, true) :
                                handleTextIcons(repliedMessage[0].text, account_type, true)
                            }
                        </Text>
                    </TouchableOpacity>
                }

                {/* replied image */}
                { reply && repliedMessage[0].type === 'image' && 
                    <TouchableOpacity 
                        activeOpacity={0.8} 
                        style={style.repliedMessage}
                        onPress={() => {
                            handleScrollToComponent(reply)
                        }}
                        delayLongPress={250}
                        onLongPress={() => {
                            const customMessages = ['Rescheduled', 'Cancelled', 'Returned', 'Delivered', 'Dispatched' ];
                            if (customMessages.includes(type)) return;
                            openMenu("message", id)}
                        }
                    >  
                        <View style={style.repliedImageWrapper}>
                            <View style={style.repliedUserContainer}>
                                <Text style={style.repliedUser}>
                                    { repliedMessageSender(
                                        repliedMessage[0].account_type,
                                        repliedMessage[0].user_id, 
                                        repliedMessage[0].fullname,
                                        repliedMessage[0].company_name,
                                    )}
                                </Text>
                                <View style={style.imageIconContainer}>
                                    <RepliedImageIcon />
                                    <Text style={style.messageType}>Image</Text>
                                </View>
                            </View>
                            <Image source={repliedMessage[0].file.path} style={style.repliedImage} />
                        </View>
                        { repliedMessage[0].text && 
                            <Text style={style.repliedText}>
                                {repliedMessage[0].text.length > 175 ? repliedMessage[0].text.slice(0, 175) + "..." : repliedMessage[0].text}
                            </Text>
                        }
                    </TouchableOpacity>
                }

                {/* replied document */}
                { reply && repliedMessage[0].type === 'document' && 
                    <TouchableOpacity 
                        activeOpacity={0.8} 
                        style={style.repliedMessage}
                        onPress={() => {
                            handleScrollToComponent(reply)
                        }}
                        delayLongPress={250}
                        onLongPress={() => {
                            const customMessages = ['Rescheduled', 'Cancelled', 'Returned', 'Delivered', 'Dispatched' ];
                            if (customMessages.includes(type)) return;
                            openMenu("message", id)}
                        }
                    >  
                        <View style={style.repliedImageWrapper}>
                            <View style={style.repliedUserContainer}>
                                <Text style={style.repliedUser}>
                                    { repliedMessageSender(
                                        repliedMessage[0].account_type,
                                        repliedMessage[0].user_id, 
                                        repliedMessage[0].fullname,
                                        repliedMessage[0].company_name,
                                    )}
                                </Text>
                                <View style={style.imageIconContainer}>
                                    <RepliedDocumentIcon />
                                    <Text style={style.messageType}>{repliedMessage[0].file.name}</Text>
                                </View>
                            </View>
                        </View>
                        { repliedMessage[0].text && 
                            <Text style={style.repliedText}>
                                {repliedMessage[0].text.length > 175 ? repliedMessage[0].text.slice(0, 175) + "..." : repliedMessage[0].text}
                            </Text>
                        }
                    </TouchableOpacity>
                }

                {/* image message */}
                { type === 'image' && file &&
                    <TouchableOpacity 
                        activeOpacity={0.8}
                        style={[
                            style.postedImageContainer,
                            !reply && !text && {marginTop: 0}
                        ]}
                        onPress={() => {
                            navigation.navigate('ViewImage', {
                                image: file.path,
                                timestamp: timestamp,
                                userId: user_id,
                                fullname: full_name,
                                companyName: company_name,
                                accountType: account_type
                            })
                        }}
                        onLongPress={() => {
                            const customMessages = ['Rescheduled', 'Cancelled', 'Returned', 'Delivered', 'Dispatched' ];
                            if (customMessages.includes(type)) return;
                            openMenu("message", id)}
                        }
                        delayLongPress={250}
                    >
                        <Image source={file.path} style={style.postedImage} />
                    </TouchableOpacity>
                }

                {/* document message */}
                { type === 'document' && file &&
                    <TouchableOpacity 
                        style={[
                            style.documentWrapper,
                            !reply && !text && {marginTop: 0}
                        ]}
                        onPress={() => {}}
                        onLongPress={() => {
                            const customMessages = ['Rescheduled', 'Cancelled', 'Returned', 'Delivered', 'Dispatched' ];
                            if (customMessages.includes(type)) return;
                            openMenu("message", id)}
                        }
                        delayLongPress={250}
                    >
                        {authData?.account_type === account_type ? <SentDocumentIcon /> : <ReceivedDocumentIcon />}
                        <View style={style.documentDescription}>
                            <Text 
                                style={[
                                    style.documentName,
                                    authData?.account_type === account_type && style.sentText,
                                ]}
                            >
                                {file.name}
                            </Text>
                            <Text 
                                style={[
                                    style.documentProperties,
                                    authData?.account_type === account_type && style.sentText
                                ]}
                            >
                                {`${file.size} \u2022 ${file.format.toUpperCase()}`}
                            </Text>
                        </View>
                    </TouchableOpacity>
                }
                
                {/* if it is not an action triggered message i.e a basic text*/}
                { text && !customMessages.includes(type) &&
                    <Text 
                        style={[
                            style.messageText, 
                            authData?.account_type === account_type && style.sentText
                        ]}
                    >
                        {handleTextIcons(text, account_type)}
                    </Text>
                }

                {/* if it's a custome message */}
                { customMessages.includes(type) &&
                    <View style={style.actionMessageWrapper}>
                        {type === "Rescheduled" && <OrderRescheduled />}
                        {type === "Returned" && <OrderReturned />}
                        {type === "Cancelled" && <OrderCancelled />}
                        {type === "Delivered" && <OrderDelivered />}
                        {type === "Dispatched" && <OrderDispatched />}
                        {type === "Edited" && authData?.account_type === account_type && <EditWhiteIcon />}
                        {type === "Edited" && authData?.account_type !== account_type && <EditBlackIcon />}

                        {/* custom message heading */}
                        <Text 
                            style={[
                                style.actionMessageTitle,
                                ["Rescheduled", "Returned"].includes(type) && {color: black},
                                type === "Cancelled" && {color: cancelledText},
                                type === "Dispatched" && {color: primaryColor},
                                type === "Delivered" && {color: deliveredText},
                                type === "Edited" && authData?.account_type === account_type && style.sentText
                            ]}
                        >
                            Order {type}
                        </Text>
                        
                        {/* edited custome message text */}
                        { type === "Edited" && (
                            <Text 
                                style={[
                                    style.messageText, 
                                    authData?.account_type === account_type && style.sentText,
                                    {marginTop: 0}
                                ]}
                            >
                                {handleTextIcons(text, account_type)}
                            </Text>
                        )}

                        {/* show products for all custome messages except edited custome message */}
                        { type !== "Edited" && (
                            <Text style={style.actionMessageHeading}>
                                Product:
                                <Text style={style.actionMessageText}>
                                    {products.map((product, index) => {
                                        // seperate list of products by commas ','
                                        return `${index === 0 ? '' : ', '} ${product.product_name} x ${product.quantity}`
                                    })}
                                </Text>
                            </Text>
                        )}

                        {/* rescheduled custom message content */}
                        { type === "Rescheduled" && (
                            <Text style={style.actionMessageHeading}>
                                New Delivery Date:&nbsp;
                                <Text style={style.actionMessageText}>
                                    {reschedule_date}
                                </Text>
                            </Text>
                        )}

                        {/* rescheduled, cancelled or returned custom message content */}
                        { ['Rescheduled', 'Cancelled', 'Returned'].includes(type) && (
                            <Text style={style.actionMessageHeading}>
                                Reason:&nbsp;
                                <Text style={style.actionMessageText}>
                                    {text ? text : "N/A"}
                                </Text>
                            </Text>
                        )}

                        {/* dispatched custom message content */}
                        { type === "Dispatched" && (
                            <Text style={style.actionMessageHeading}>
                                Comments :&nbsp;
                                <Text style={style.actionMessageText}>
                                    {text ? text : "N/A"}
                                </Text>
                            </Text>
                        )}

                        {/* delivered custom message content */}
                        { type === "Delivered" && (
                            <Text style={style.actionMessageHeading}>
                                Payment Method :&nbsp;
                                <Text style={style.actionMessageText}>
                                    {text ? text : "N/A"}
                                </Text>
                            </Text>
                        )}

                    </View>
                }
            </TouchableOpacity>
        );
    };

    const messageTimestamp = (account_type, time, next_time, user_id, next_user_id, seen) => {
        if (authData?.account_type === account_type) {
            if (user_id !== next_user_id) {
                return (
                    <Text style={[style.timeSent, style.myTeam]}>{convertUTCToTime(time)} . {seen ? "Seen" : "Sent"}</Text>
                );
            } else {
                return (time !== next_time) && (
                    <Text style={[style.timeSent, style.myTeam]}>{convertUTCToTime(time)} . {seen ? "Seen" : "Sent"}</Text>
                );
            }
        } else {
            if (user_id !== next_user_id) {
                return (
                    <Text style={[style.timeSent, style.otherTeam]}>{convertUTCToTime(time)}</Text>
                );
            } else {
                return (time !== next_time) && (
                    <Text style={[style.timeSent, style.otherTeam]}>{convertUTCToTime(time)}</Text>
                );
            }
        }
    };

    const pan = useRef(new Animated.Value(0)).current;
                                
    const panResponder = createPanResponder(pan, message.id);

    return (
        <Animated.View
            // enable reply for text only if its not an action message
            {...(message.type !== 'Rescheduled' &&
                message.type !== 'Dispatched' &&
                message.type !== 'Cancelled' &&
                message.type !== 'Delivered' &&
                message.type !== 'Returned' &&
                message.type !== 'Edited' &&
                panResponder.panHandlers
            )}
            
            key={message.id} 
            style={[
                style.messageContent, 
                {transform: [
                    { translateX: pan }, 
                ]},
            ]}
            onLayout={(e) => {
                // console.log(e);
                messagesRefs.current.push({
                    id: message.id, 
                    y: e.nativeEvent.layout.y,
                    height: e.nativeEvent.layout.height,
                    width: 0,
                    account_type: message.account_type,
                })
            }}
        >
            {/* message sender */}
            { messageSender(
                message.account_type, 
                message.user_id, 
                message.fullname, 
                index === 0 ? postOrderUserId : messages[index - 1].user_id,
                message.company_name,
                message.color,
                message.reply,
            )}
            {/* message body */}
            { messageBody(
                message.account_type, 
                message.text, 
                message.reply, 
                message.file,
                typeof message.timestamp === "function" ? message.timestamp() : message.timestamp,
                message.user_id,
                message.fullname,
                message.company_name,
                message.type,
                typeof message.reschedule_date === "function" ? message.reschedule_date() : message.reschedule_date,
                message.id
            )}
            {/* mesage timestamp */}
            { messageTimestamp(
                message.account_type, 
                typeof message.timestamp === "function" ? message.timestamp() : message.timestamp,
                index !== messages.length - 1 && messages[index + 1].timestamp(),
                message.user_id,
                index !== messages.length - 1 && messages[index + 1].user_id,
                message.seen
            )}
        </Animated.View>
    );
}
 

const style = StyleSheet.create({
    replyingInputWrapper: {
        width: "100%",
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    replyingMessageWrapper: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        alignSelf: 'stretch',
        gap: 6,
        paddingBottom: 12,
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


    scrollView: {
        position: 'relative',
        backgroundColor: white,
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
    messageContent: {
        width: "100%",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginBottom: 5,
        position: "relative",
        zIndex: 1,
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
        zIndex: 1,
        position: "relative"
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
        marginLeft: 10,
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
export default MessageContainer;