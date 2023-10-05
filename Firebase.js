// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore, collection } from "firebase/firestore";
// import { getAuth } from "firebase/auth";
// import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBjP8UL9K2BVjiFYPoy6-UK8WW2FFmIQMQ",
    authDomain: "komitex-e7659.firebaseapp.com",
    projectId: "komitex-e7659",
    storageBucket: "komitex-e7659.appspot.com",
    messagingSenderId: "604857612418",
    appId: "1:604857612418:web:52b7d0bc2a8b8e4e719c9b",
    measurementId: "G-VC0VQRZTDM"
};

// Initialize Firebase
const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DATABASE = getFirestore(FIREBASE_APP);
// export const USERS = collection(FIREBASE_DATABASE, 'Users');

// const Auth = initializeAuth(FIREBASE_APP, {
//     persistence: getReactNativePersistence(AsyncStorage),
// })
// export const storage = getStorage(app);