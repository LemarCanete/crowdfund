// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const analytics = getAnalytics(app);