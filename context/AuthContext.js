// react hooks
import { createContext, useState, useContext, useEffect } from "react";
// async storage
import AsyncStorage from "@react-native-async-storage/async-storage";
// firebase AUth
import { onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "../Firebase";
import { parse } from "react-native-svg";

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({children}) => {

	const [authData, setAuthData] = useState(null);

	// The loading state
	const [loading, setLoading] = useState(false);

	const handleSignUp = async () => {
	}
	
	const handleSignIn = async () => {
	}
	
	const handleSignOut = async () => {
	}
	
	useEffect(() => {
		setLoading(true);

		// onAuthStateChanged(FIREBASE_AUTH, (user) => {
		// 	if (user) {
		// 		// setSession(true);
		// 	} else {
		// 		// setSession(false);
		// 	}
		// });
		
		const userData = {
			account_type: "Logistics",
			business_name: "Komitex Logistics",
			full_name: "Iffie Okomite",
			email: "Komitexlogistics@gmai.com",
		}
	
		const setData = async () => {
		    await AsyncStorage.setItem("@user", JSON.stringify(userData));
		}

		// setData();
	
		const getData = async () => {
			try {
				const data = await AsyncStorage.getItem("@user");
				if (data) {
					const parsedData = JSON.parse(data);
					setAuthData(parsedData);

					console.log(parsedData)
				} else {
					setAuthData(null);					
				}
				setLoading(false);
			} catch (error) {
				setAuthData(null);				
				setLoading(false);
			}
		}

		getData();
		
	}, []);
	
	return (
		<AuthContext.Provider value={{authData, loading, handleSignIn, handleSignOut, handleSignUp}}>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthProvider