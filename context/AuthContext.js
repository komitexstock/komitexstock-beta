// react hooks
import { createContext, useState, useContext, useEffect } from "react";
// async storage
import AsyncStorage from "@react-native-async-storage/async-storage";
// firebase AUth
import { onAuthStateChanged, User } from "firebase/auth";
import { FIREBASE_AUTH } from "../Firebase";

const AuthContext = createContext({});

export const useAuth = useContext(AuthContext);

const AuthProvider = ({children}) => {

	const [session, setSession] = useState(() => {
		if (User) return true;
		return false;
	});

	// The loading state
	const [loading, setLoading] = useState(false);

	const handleSignUp = async () => {
		setLoading(true);
		setLoading(false);
	}
	
	const handleSignIn = async () => {
		setLoading(true);
		
		setSession(true);
		setLoading(false);
	}
	
	const handleSignOut = async () => {
		
		setLoading(true);
		setSession(false);
		setLoading(false);
	}
	
	useEffect(() => {
		onAuthStateChanged(FIREBASE_AUTH, (user) => {
			if (user) {
				setSession(true);
			} else {
				setSession(false);
			}
		});
	}, [])
	
	return (
		<AuthContext.Provider value={{session, loading, handleSignIn, handleSignOut, handleSignUp}}>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthProvider