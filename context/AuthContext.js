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
import { doc, getDoc, onSnapshot } from "firebase/firestore";

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
			setAuthData(null);
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

	// const getUserData = (uid) => {
	// 	const docRef = doc(database, 'users', uid);
	  
	// 	return new Promise((resolve, reject) => {
	// 	  onSnapshot(docRef, (doc) => {
	// 		if (doc.exists()) {
	// 		  resolve(doc.data());
	// 		} else {
	// 		  resolve(null);
	// 		}
	// 	  }, (error) => {
	// 		console.log(error.message);
	// 		reject(error);
	// 	  });
	// 	});
	// };

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
				try {
					// get user data
					const user_data = await getUserData(user.uid); 

					console.log("User Data:", user_data); // Add this line for debugging
					
					// if there is no business_id in users collection, 
					// make request again get business data
					if (user_data === undefined) {
						// return early if business id is null
						await removeStoredData();
						return;
					} else {
						// get business data
						const business_data = await getBusinessData(user_data?.business_id);
						
						// Combine user and business data
						const data = {
							uid: user.uid,
							email: user.email,
							...user_data,
							...business_data,
						};
						// Wait for setStoredData to complete
						await setStoredData(data);
						return setLoading(false);
					}
	
				} catch (error) {
					console.error(error.message);
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