import { database, storage } from "../../Firebase";
// firbase storage functions
import { 
    ref, 
    uploadBytesResumable, 
    getDownloadURL 
} from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";

// const { setStoredData } = useAuth();

// get path function
const getPath = (type) => {
    if (type === "Profile") return "profiles/";
    if (type === "Banner") return "banners/";
    if (type === "Product") return "products/";
    if (type === "Message") return "messages/";
}

// get ref function
const getRef = (type, id) => {
    if (type === "Profile") return doc(database, "users", id);
    if (type === "Banner") return doc(database, "businesses", id);
    if (type === "Product") return doc(database, "merchant_products", id);
    if (type === "Message") return doc(database, "messages", id);
}

// get query object
const getQueryObject = (type, downloadURL) => {
    if (type === "Profile") return { profile_image: downloadURL };
    if (type === "Banner") return { banner_image: downloadURL };
    if (type === "Product") return { product_image: downloadURL };
    if (type === "Message") return { file: downloadURL } ;
}

// upload file function
export const uploadFile = async (image, type, id, authData, storeData) => {
    try {
        const extension = image.uri.split('.').pop();
        const response = await fetch(image.uri);
        const blob = await response.blob();
        const rootPath = getPath(type);

        const storageRef = ref(storage, rootPath + id + "." + extension);
        const uploadTask = uploadBytesResumable(storageRef, blob);
    
        // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
        uploadTask.on('state_changed', 
            (snapshot) => {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                // console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                    // console.log('Upload is paused');
                    break;
                    case 'running':
                    // console.log('Upload is running');
                    break;
                    default:
                    break;
                }
            }, 
            (error) => {
                // Handle unsuccessful uploads
                console.log("Upload Task Error:", error.message);
            }, 
            () => {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                getDownloadURL(uploadTask.snapshot.ref).then( async (downloadURL) => {
                    // console.log('File available at', downloadURL);  
                    const docRef = getRef(type, id);
                    
                    try {
                        
                        await updateDoc(docRef, 
                            getQueryObject(type, downloadURL),
                        );
                        
                        // data needs to be stored in async storage
                        if (["Profile", "Banner"].includes(type)) {
                            await storeData({
                                ...authData,
                                profile_image: type === "Profile" ? downloadURL : authData.profile_image,
                                banner_image: type === "Banner" ? downloadURL : authData.banner_image,
                            });
                        }
                        
                        return true;

                    } catch (error) {
                        console.log("Update Doc Error:", error.message);
                        return error;
                    }
                });
            }
        );
    } catch (error) {
        console.log("Upload File error:", error.message);                
        return error;
    }
}