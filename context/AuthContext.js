// react hooks
import {
	createContext,
	useState,
	useContext,
	useEffect,
} from "react";
// async storage
import AsyncStorage from "@react-native-async-storage/async-storage";
// firebase AUth
import {
	onAuthStateChanged,
} from "firebase/auth";
// firebase
import { auth, database } from "../Firebase";
// firestore functions
import { doc, getDoc } from "firebase/firestore";

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({children}) => {

	const setStoredData = async (data) => {
		setAuthData(data);
		await AsyncStorage.setItem("@user", JSON.stringify(data));
	}

	const getStoredData = async () => {
		try {
			const data = await AsyncStorage.getItem("@user");
			const parsedData = JSON.parse(data);
			return parsedData;
		} catch (error) {
			console.log(error.message);
			return null;
		}
	}

	const removeStoredData = async () => {
		try {
			await AsyncStorage.removeItem("@user");
		} catch (error) {
			console.log(error.message)
		}
	}

	const getUserData = async (uid) => {
		const docRef = doc(database, 'users', uid);
		try {
			const user = await getDoc(docRef);
			return user.data()
		} catch (error) {
			console.log(error.message);
			return null;			
		}
	}

	const getBusinessData = async (id) => {
		const docRef = doc(database, 'businesses', id)
		try {
			const business = await getDoc(docRef);
			return business.data()
		} catch (error) {
			console.log(error.message);
			return null;
		}
	}

	// auth data state
	const [authData, setAuthData] = useState(async () => {
		const data =  await getStoredData();
		return data;
	});

	// The loading state
	const [loading, setLoading] = useState(true);
	
	// console.log("auth state", authData);
	
	useEffect(() => {
		// setLoading(true);

		const unsubscribeFromAuthStatuChanged = onAuthStateChanged(auth, async (user) => {
			// console.log("Auth State Changed", user);
			if (!user) {
				setAuthData(null)
				await removeStoredData();
				return setLoading(false);
			}

			const storedData = await getStoredData();

			// console.log("Stored Data", storedData);
			// if there is a stored data
			if (storedData) {
				// You have stored data; use it here if needed
				setAuthData(storedData)
				return setLoading(false);
			} else {
				const user_data = await getUserData(user.uid); 
				const business_data = await getBusinessData(user_data.business_id);
				
				// Combine user and business data
				const data = {
					uid: user.uid,
					email: user.email,
					...user_data,
					...business_data,
				};
	
				try {
					// Wait for setStoredData to complete
					await setStoredData(data);
					setAuthData(data);
					return setLoading(false);
				} catch (error) {
					console.error('Error setting stored data:', error);
					return setLoading(false);
				}
			}

		})

		return unsubscribeFromAuthStatuChanged;
		
	}, []);
	
	return (
		<AuthContext.Provider value={{authData, loading, setStoredData }}>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthProvider