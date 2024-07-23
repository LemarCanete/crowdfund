import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from '@/utils/firebase-config';

export const fetchUserData = async (uid) => {
    if (!uid) {
        console.error("No user ID provided.");
        return null;
    }

    try {
        const docRef = doc(db, 'users', uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data();
            console.log("User data fetched:", data);
            return data;
        } else {
            console.log(`No such document for UID: ${uid}`);
            return null;
        }
    } catch (error) {
        console.error("Error fetching user data:", error);
        return null;
    }
};

export const saveUserData = async (uid, userData) => {
    if (!uid) {
        console.error("No user ID provided.");
        return;
    }

    try {
        const docRef = doc(db, 'users', uid);
        await setDoc(docRef, userData, { merge: true });
        console.log("Document successfully written!");
    } catch (error) {
        console.error("Error writing document:", error);
    }
};
