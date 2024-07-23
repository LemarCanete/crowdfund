// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'


const firebaseConfig = {
  apiKey: "AIzaSyCkkxrrSDrIFTOT4AfgFRmynRLgrjZKoIE",
  authDomain: "crowdfund-43b6f.firebaseapp.com",
  projectId: "crowdfund-43b6f",
  storageBucket: "crowdfund-43b6f.appspot.com",
  messagingSenderId: "322483202422",
  appId: "1:322483202422:web:21fc29ffce334f7780b257",
  measurementId: "G-E79YEP74GV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app)
export const storage = getStorage(app)