// Import the functions you need from the SDKs you need
// app
import { initializeApp } from "firebase/app";
// auth
import { initializeAuth, getAuth, getReactNativePersistence } from 'firebase/auth';
// firestore
import { getFirestore } from "firebase/firestore";
// firebase storage
import { getStorage } from "firebase/storage";
// async storage
import AsyncStorage from "@react-native-async-storage/async-storage";
// cloud function
import { getFunctions } from "firebase/functions";


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
const app = initializeApp(firebaseConfig);
const initAuth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
});

export const auth = getAuth(app);
export const database = getFirestore(app);
export const storage = getStorage(app);
export const functions = getFunctions(app);
