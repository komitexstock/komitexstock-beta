// react hooks
import {
	createContext,
	useState,
	useContext,
	useEffect,
	useLayoutEffect,
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
// auth
import { signOut } from "firebase/auth";

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

	// The authLoading state
	const [authLoading, setAuthLoading] = useState(true);
	
	// console.log("auth state", authData);
	
	// auth listeners
	useEffect(() => {
		// setAuthLoading(true);

		// detect changes in auth state
		const unsubscribeFromAuthStateChanged = onAuthStateChanged(auth, async (user) => {
			// console.log("Auth State Changed", user);
			if (!user) {
				await removeStoredData();
				return setAuthLoading(false);
			}

			const storedData = await getStoredData();

			const claims = await user.getIdTokenResult();

			console.log(claims.claims);
			// console.log("Stored Data", storedData);
			// if there is a stored data
			if (storedData) {
				// You have stored data; use it here if needed
				setAuthData(storedData)
				return setAuthLoading(false);
			} else {
				try {
					// get user data
					const user_data = await getUserData(user.uid); 
					// console.log("User Data:", user_data); // Add this line for debugging
					
					// if there is no business_id in users collection, 
					// make request again get business data
					if (user_data === undefined) {
						// return early if user data is undefined
						// this happens when user signs up for the first time
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
						return setAuthLoading(false);
					}
	
				} catch (error) {
					console.error(error.message);
					return setAuthLoading(false);
				}
			}

		})

		return unsubscribeFromAuthStateChanged;
				
	}, []);

	// role change listener
	useLayoutEffect(() => {
		// console.log(authData?.uid);
		// if user doesn't exist return early		
		// if user exist 
		// if (!auth.currentUser) {
		const userRef = doc(database, 'users', authData?.uid ? authData?.uid : "x");
		const unsubscribe = onSnapshot(userRef, async (doc) => {
			const data = doc.data();
			if (data) {
				const { role, deactivated } = data;
				// console.log("DB Role: ", role);
				// console.log("Stored Role: ", authData.role);
	
				// Check if the role has changed
				if (role !== authData.role) {
					try {
						console.log("updating data...")
						// update role
						await setStoredData({
							...authData,
							role: role,
						})
					} catch (error) {
						console.log(error.message)
					}
				}
				
				// Check if deactivated status has changed
				if (deactivated !== authData?.deactivated && authData?.deactivated !== undefined) {
					try {
						// force signout
						setTimeout(async () => {
							await signOut(auth);
						}, 3000);
					} catch (error) {
						console.log(error.message)
					}
				}
			}
		}, (error) => {
			console.log(error.message);
		});
		return unsubscribe;
		// }
	}, [authData]);

	return (
		<AuthContext.Provider value={{authData, authLoading, setStoredData }}>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthProvider