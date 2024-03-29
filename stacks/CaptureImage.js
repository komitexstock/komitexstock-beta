// camera components and functions
import {
    Camera,
    CameraType,
    requestCameraPermissionsAsync,
    getCameraPermissionsAsync,
    FlashMode,
    AutoFocus,
    WhiteBalance,
} from 'expo-camera';
// react hooks
import { useState, useEffect, useRef, useLayoutEffect } from 'react';
// react cnative components
import {
    StyleSheet,
    Image,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
// colours
import { black, cameraButton, white } from '../style/colors';
// icons
import CloseCameraIcon from '../assets/icons/CloseCameraIcon';
import FlipCameraIcon from '../assets/icons/FlipCameraIcon';
import FlashIcon from '../assets/icons/FlashIcon';
import FlashSlashIcon from '../assets/icons/FlashSlashIcon';
import ConfirmImageIcon from '../assets/icons/ConfirmImageIcon';
import CropImageIcon from '../assets/icons/CropImageIcon';
// library to edit captured image
import * as ImageManipulator from 'expo-image-manipulator';

const CaptureImage = ({navigation, route}) => {

    // camera type
    const [type, setType] = useState(CameraType.back);
    // camera flash light mode
    const [flashMode, setFlashMode] = useState(FlashMode.off);
    // state to store captured image
    const [picture, setPicture ] = useState(null);

    // state to store origin (prev satck in the navigation)
    const [origin, setOrigin] = useState(null)

    // image type
    const [imageType, setImageType] = useState(null)

    // camera ref
    const cameraRef = useRef();

    // request permission to use phone camera
    const requestPermission = async () => {
        try {
            await requestCameraPermissionsAsync();
        } catch (error) {
            // go back to previous screen/stack
            navigation.goBack();   
        }
    }

    // Parameters neccessary when using the camera from a chat, so to navigate back to the right chat
    // states for chat
    const [chatId, setChatId] = useState(null);
    // chat name
    const [chatName, setChatName] = useState(null);
    // chat type
    const [chatType, setChatType] = useState(null);
    // chat header image
    const [chatHeaderImage, setChatHeaderImage] = useState(null);

    // request permission on load
    useEffect(() => {
        requestPermission();
    }, []);

    // use effect to remove add product or edit product success propmt after 3 seconds
    useLayoutEffect(() => {
        // if success is true, set success as false after 3 seconds
        if (route.params) {
            setOrigin(route.params.origin);
            route.params.imageType && setImageType(route.params.imageType);

            if (route.params.origin === "Chat") {
                setChatId(route.params.chat_id);
                setChatType(route.params.chat_type);
                setChatName(route.params.business_name);
                setChatHeaderImage(route.params.banner_image);
            }
        }
        else return setOrigin("Chat");

    }, []);

    // get permission to use camera
    const getPermission = async () => {
        try {
            const cameraPermission = await getCameraPermissionsAsync();
            return cameraPermission.granted;
        } catch (error) {
            console.log(error.message);
        }
    }

    if (!getPermission()) {
        navigation.goBack();
    }

    // function to swicth btw front and back camera
    const toggleCameraType = () => {
        setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
    }

    // function to toggle flash light
    const toggleFlashMode = () => {
        setFlashMode(flash => (flash === FlashMode.off ? FlashMode.on : FlashMode.off));
    }

    // function to crop image
    const cropImage = async () => {
        try {
            const manipResult = await ImageManipulator.manipulateAsync(
              picture.uri,
              [{ crop: { originX: 0, originY: 0, width: 500, height: 500 } }],
              { compress: 1, format: ImageManipulator.SaveFormat.PNG }
            );
            // console.log(manipResult);
            setPicture(manipResult);
        } catch (error) {
            console.log(error.message);
        }
    }

    // take picture function
    const takePicture = async () => {
        const photo = await cameraRef.current.takePictureAsync({
            quality: 1,
        });

        setPicture(photo);
    }

    // go back to previous screen function
    const goBack = () => {
        navigation.goBack();
    }

    // function to reset captured image
    const resetImage = () => {
        setPicture(null)
    }

    // function to confirm captured image
    const confirmImage = () => {
        if (origin === "Account") {
            return navigation.navigate(origin, {
                image: picture,
                imageType: imageType,
            });
        }

        navigation.navigate(origin, {
            imageUri: picture,
            imageType: imageType,
            chat_id: chatId,
            chat_type: chatType,
            business_name: chatName,
            banner_image: chatHeaderImage,
        });
    };


    // render Camera Page
    return (
        <View style={style.container}>
            { !picture ? (
                <Camera
                    ref={cameraRef}
                    style={style.camera}
                    type={type}
                    flashMode={flashMode}
                    ratio={'16:9'}
                    autoFocus={AutoFocus.on}
                    whiteBalance={WhiteBalance.cloudy}
                >
                    {/* flash button */}
                    <TouchableOpacity style={style.flash} onPress={toggleFlashMode}  >
                        { flashMode === FlashMode.off ? <FlashSlashIcon /> : <FlashIcon /> }
                    </TouchableOpacity>
                </Camera>
            ) : (
                <View style={style.imageContainer}>
                    {/* crop image buttton */}
                    <TouchableOpacity style={style.flash} onPress={cropImage}>
                        <CropImageIcon />
                    </TouchableOpacity>
                    {/* display captured image */}
                    <Image 
                        source={{uri: picture.uri}}
                        style={style.imageCaptured}
                    />
                </View> 
            )}

            {/* footer butttons */}
            <View style={style.buttonContainer}>
                <Text style={[style.text, {opacity: !picture ? 1 : 0}]}>Photo</Text>
                <View style={style.buttonWrapper}>
                    {/* close camera */}
                    <TouchableOpacity 
                        style={style.button}
                        onPress={!picture ? goBack : resetImage} 
                    >
                        <CloseCameraIcon />
                    </TouchableOpacity>
                    {/* shutter button to capture image */}
                    { !picture && <TouchableOpacity style={style.shutterButton} onPress={takePicture}>
                        <View style={style.shutter}></View>
                    </TouchableOpacity> }
                    { !picture ? ( // flip camera button
                        <TouchableOpacity style={style.button} onPress={toggleCameraType }>
                            <FlipCameraIcon />
                        </TouchableOpacity>
                    ) : ( // confirm image button
                        <TouchableOpacity style={style.button} onPress={confirmImage}>
                            <ConfirmImageIcon />
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        </View>
    );
}

const style = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    flash: {
        position: 'absolute',
        top: 23,
        right: 20,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2,
    },
    camera: {
        position: 'relative',
        width: "100%",
        flex: 1,
    },
    imageContainer: {
        position: 'relative',
        width: "100%",
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
        padding: 0,
        margin: 0,
    },
    imageCaptured: {
        width: "100%",
        height: "100%",
        resizeMode: 'cover',
    },
    buttonContainer:{
        height: 150,
        width: "100%",
        backgroundColor: black,
        paddingBottom: 45,
        paddingTop: 12,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 18,
    },
    text:{
        color: white,
        fontFamily: 'mulish-bold',
        fontSize: 12,
    },
    buttonWrapper:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 60,
        width: 188,
        // backgroundColor: 'red',
    },
    button:{
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: cameraButton,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    shutterButton:{
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: cameraButton,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    shutter:{
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: white,
    }
})
 
export default CaptureImage;