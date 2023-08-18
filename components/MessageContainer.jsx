import { View, Text, TouchableOpacity, Image, StyleSheet, Animated, PanResponder } from "react-native";
import { useRef, useState } from "react";
// import helper functions
import { convertUTCToTime } from "../utils/convertUTCToTime";
// icons
import SentDocumentIcon from "../assets/icons/SentDocumentIcon";
import ReceivedDocumentIcon from "../assets/icons/ReceivedDocumentIcon";
import OrderRescheduled from "../assets/icons/OrderRescheduled";
import OrderCancelled from "../assets/icons/OrderCancelled";
import RepliedImageIcon from "../assets/icons/RepliedImageIcon";
import RepliedDocumentIcon from "../assets/icons/RepliedDocumentIcon";
import EditWhiteIcon from "../assets/icons/EditWhiteIcon";
import EditBlackIcon from "../assets/icons/EditBlackIcon";
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
    rescheduledContainer,
    cancelledContainer,
    deliveredContainer,
    pendingContainer,
    cancelledText,
    deliveredText,
    pendingText
} from "../style/colors";
// components
import NumberLink from "./NumberLink";

const MessageContainer = ({messages, message, index, messagesRefs, customerName, phoneNumber, address, location, charge, price, products, handleOnPressPhoneNumber, handleScrollToComponent, setReplying, textInputRef, navigation}) => {

    // accoutntype, retreived from global variables
    const accountType = "Merchant";
    const userId = "hjsdjkji81899";
    const companyName = "Mega Enterprise";
    const fullname = "Iffie Ovie";
    const postOrderUserId = "hjsdjkji81899";
    const postOrderTimestamp = "6:30 am";

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

    const repliedMessageSender = (account_type, user_id, full_name, company_name) => {

        if (accountType === account_type) {
            return user_id === userId ? "Me" : full_name;
        } else {
            return company_name;
        }
    };
    
    const messageBody = (account_type, text, reply, file, timestamp, user_id, full_name, company_name, type, reschedule_date, id) => {

        const repliedMessage = messages.filter(message => message.id === reply);
        
        return (
            <View 
                style={[
                    style.message,
                    accountType === account_type ? style.sent : style.received,
                    // for sent messages or messages from my team
                    // remove padding from file
                    file && accountType === account_type && {borderBottomRightRadius: 12, borderBottomRightRadius: 12},
                    // apply padding to text
                    text && accountType === account_type && {paddingTop: 0, padding: 10, borderBottomRightRadius: 0},
                    // for received messages from other team
                    // remove padding from file
                    file && accountType !== account_type && {borderBottomRightRadius: 12, borderBottomLeftRadius: 12},
                    // apply padding to text
                    text && accountType !== account_type && {paddingTop: 0, padding: 10, borderBottomLeftRadius: 0},
                    // general
                    reply && {paddingTop: 0, padding: 10},
                    type === "Rescheduled" && {backgroundColor: rescheduledContainer},
                    type === "Cancelled" && {backgroundColor: cancelledContainer},
                    type === "Delivered" && {backgroundColor: deliveredContainer},
                    type === "Dispatched" && {backgroundColor: secondaryColor},
                    type === "Returned" && {backgroundColor: pendingContainer},
                    // always pad custom messages regardless of is text is present
                    customMessages.includes(type) && {paddingTop: 0, padding: 10},
                ]}
            >
                {/* replied text message */}
                { reply && repliedMessage[0].type === 'message' && 
                    <TouchableOpacity 
                        // specific to sent messages or messages from my team
                        activeOpacity={accountType === account_type && 0.8} 
                        style={style.repliedMessage}
                        onPress={() => {
                            handleScrollToComponent(reply)
                        }}
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
                            {repliedMessage[0].text.length > 175 ? repliedMessage[0].text.slice(0, 175) + "..." : repliedMessage[0].text}
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
                    >
                        {accountType === account_type ? <SentDocumentIcon /> : <ReceivedDocumentIcon />}
                        <View style={style.documentDescription}>
                            <Text 
                                style={[
                                    style.documentName,
                                    accountType === account_type && style.sentText,
                                ]}
                            >
                                {file.name}
                            </Text>
                            <Text 
                                style={[
                                    style.documentProperties,
                                    accountType === account_type && style.sentText
                                ]}
                            >
                                {`${file.size} \u2022 ${file.format.toUpperCase()}`}
                            </Text>
                        </View>
                    </TouchableOpacity>
                }
                {/* if it is not an action triggered message */}
                { text && !customMessages.includes(type) &&
                    <Text 
                        style={[
                            style.messageText, 
                            accountType === account_type && style.sentText
                        ]}
                    >
                        {text}
                    </Text>
                }

                { customMessages.includes(type) &&
                    <View style={style.actionMessageWrapper}>
                        {type === "Rescheduled" && <OrderRescheduled />}
                        {type === "Cancelled" && <OrderCancelled />}
                        {type === "Edited" && accountType === account_type && <EditWhiteIcon />}
                        {type === "Edited" && accountType !== account_type && <EditBlackIcon />}

                        <Text 
                            style={[
                                style.actionMessageTitle,
                                type === "Rescheduled" && {color: black},
                                type === "Cancelled" && {color: cancelledText},
                                type === "Dispatched" && {color: primaryColor},
                                type === "Delivered" && {color: deliveredText},
                                type === "Returned" && {color: pendingText},
                                type === "Edited" && accountType === account_type && style.sentText
                            ]}
                        >
                            Order {type}
                        </Text>
                        { type === "Edited" && (
                            <>
                                <Text 
                                    style={[
                                        style.actionMessageHeading,
                                        accountType === account_type && style.sentText
                                    ]}
                                >
                                    Customer's Name:&nbsp;
                                    <Text 
                                        style={[
                                            style.actionMessageText,
                                            accountType === account_type && style.sentText
                                        ]}
                                    >
                                        {customerName}
                                    </Text>
                                </Text>
                                <Text 
                                    style={[
                                        style.actionMessageHeading,
                                        accountType === account_type && style.sentText
                                    ]}
                                >
                                    Phone Number:&nbsp;
                                    <Text 
                                        style={[
                                            style.actionMessageText,
                                            accountType === account_type && style.sentText
                                        ]}
                                    >
                                        { phoneNumber.map((number, index) => (
                                            <NumberLink
                                                key={index}
                                                number={number}
                                                handleOnPressPhoneNumber={handleOnPressPhoneNumber}
                                                account_type={account_type}
                                            />
                                        ))}
                                    </Text>
                                </Text>
                                <Text 
                                    style={[
                                        style.actionMessageHeading,
                                        accountType === account_type && style.sentText
                                    ]}
                                >
                                    Delivery Address:&nbsp;
                                    <Text 
                                        style={[
                                            style.actionMessageText,
                                            accountType === account_type && style.sentText
                                        ]}
                                    >
                                        {address}
                                    </Text>
                                </Text>
                                <Text 
                                    style={[
                                        style.actionMessageHeading,
                                        accountType === account_type && style.sentText
                                    ]}
                                >
                                    Product:&nbsp;
                                    <Text 
                                        style={[
                                            style.actionMessageText,
                                            accountType === account_type && style.sentText
                                        ]}
                                    >
                                        {products.map((product, index) => {
                                            // seperate list of products by commas ','
                                            return `${index === 0 ? '' : ', '} ${product.product_name} x ${product.quantity}`
                                        })}
                                    </Text>
                                </Text>
                                <Text 
                                    style={[
                                        style.actionMessageHeading,
                                        accountType === account_type && style.sentText
                                    ]}
                                >
                                    Amount:&nbsp;
                                    <Text 
                                        style={[
                                            style.actionMessageText,
                                            accountType === account_type && style.sentText
                                        ]}
                                    >
                                        ₦{price.toLocaleString()}
                                    </Text>
                                </Text>
                                <Text 
                                    style={[
                                        style.actionMessageHeading,
                                        accountType === account_type && style.sentText
                                    ]}
                                >
                                    Location:&nbsp;
                                    <Text 
                                        style={[
                                            style.actionMessageText,
                                            accountType === account_type && style.sentText
                                        ]}
                                    >
                                        {location}
                                    </Text>
                                </Text>
                                <Text 
                                    style={[
                                        style.actionMessageHeading,
                                        accountType === account_type && style.sentText
                                    ]}
                                >
                                    Charge:&nbsp;
                                    <Text 
                                        style={[
                                            style.actionMessageText,
                                            accountType === account_type && style.sentText
                                        ]}
                                    >
                                        ₦{charge.toLocaleString()}
                                    </Text>
                                </Text>
                            </>
                        )}
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
                        { type === "Rescheduled" && (
                            <Text style={style.actionMessageHeading}>
                                New Delivery Date:&nbsp;
                                <Text style={style.actionMessageText}>
                                    {reschedule_date}
                                </Text>
                            </Text>
                        )}

                        { ['Rescheduled', 'Cancelled', 'Returned'].includes(type) && (
                            <Text style={style.actionMessageHeading}>
                                Reason:&nbsp;
                                <Text style={style.actionMessageText}>
                                    {text}
                                </Text>
                            </Text>
                        )}

                        { type === "Delivered" && (
                            <Text style={style.actionMessageHeading}>
                                Payemnt Method:&nbsp;
                                <Text style={style.actionMessageText}>
                                    {text}
                                </Text>
                            </Text>
                        )}

                    </View>
                }
            </View>
        );
    };

    const messageTimestamp = (account_type, time, next_time, user_id, next_user_id, seen) => {
        if (accountType === account_type) {
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
                message.timestamp(),
                message.user_id,
                message.fullname,
                message.company_name,
                message.type,
                message.reschedule_date(),
                message.id
            )}
            {/* mesage timestamp */}
            { messageTimestamp(
                message.account_type, 
                message.timestamp(), 
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