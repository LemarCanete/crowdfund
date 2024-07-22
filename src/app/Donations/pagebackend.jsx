import { db } from '@/utils/firebase-config';
import { collection, query, where, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';

export const fetchProjects = async () => {
    const projects = [];
    try {
        const q = query(collection(db, 'projects'));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            projects.push({ id: doc.id, ...doc.data() });
        });
    } catch (error) {
        console.error("Error fetching projects: ", error);
    }
    return projects;
};

export const fetchUserDonations = async (uid) => {
    const donations = [];
    try {
        const q = query(collection(db, 'donations'), where('user', '==', uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            donations.push({ id: doc.id, ...doc.data() });
        });
    } catch (error) {
        console.error("Error fetching donations: ", error);
    }
    return donations;
};

export const addDonation = async (uid, newDonation, currentDonations) => {
    try {
        console.log("Checking for existing donation:", newDonation);
        const q = query(collection(db, 'donations'), where('user', '==', uid), where('projectId', '==', newDonation.projectId));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            console.log("Donation already exists for user:", uid, "and project:", newDonation.projectId);
            return currentDonations;
        }

        console.log("Adding new donation to Firestore:", newDonation);
        const docRef = await addDoc(collection(db, 'donations'), {
            ...newDonation,
            user: uid,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        });
        return [...currentDonations, { id: docRef.id, ...newDonation }];
    } catch (error) {
        console.error("Error adding donation:", error);
        throw error;
    }
};
