import { doc, updateDoc, getDoc, onSnapshot, collection, where, query } from "firebase/firestore";
import { database } from "../../Firebase";

export const getTeamMembers = async (business_id) => {
    try {
        const collectionRef = collection(database, "users");
        let q = query(collectionRef, where("business_id", "==", business_id));
    
        return new Promise((resolve, reject) => {
            onSnapshot(q, (querySnapshot) => {
                let members = [];
                querySnapshot.forEach((doc) => {
                    const member = {
                        id: doc.id,
                        admin: doc.data().admin,
                        email: doc.data().email,
                        deactivated: doc.data().deactivated,
                        full_name: doc.data().full_name,
                        profile_image: doc.data().profile_image,
                        role: doc.data().role,
                    };
                    members.push(member);
                });
                resolve(members);
            }, reject);
        });
    } catch (error) {
        console.log("Error: ", error.message);
        return [];
    }
};