'use client'
import { createContext, useEffect, useState } from "react";
import { auth, db } from "@/utils/firebase-config";  // Assuming you have a reference to your Firestore database
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { collection, query, where, getDocs } from "firebase/firestore";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log(user)
        const q = query(collection(db, "users"), where("uid", "==", user.uid));

        const querySnapshot = await getDocs(q);
        const userDetails = [];
        querySnapshot.forEach((doc) => {
            userDetails.push(doc.data());
        });

        const userData = userDetails[0]

        if (userData) {
            console.log("firestore added")
          setCurrentUser({ ...userData, ...user });
        } else {
            console.log("no firestore added")
            setCurrentUser(user);
        }
      } else {
        // If the user is logged out, you might want to reset the currentUser
        setCurrentUser({});
      }
    });

    return () => {
      unsub();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
