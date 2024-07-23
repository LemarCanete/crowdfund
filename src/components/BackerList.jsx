import React, { useEffect, useState } from 'react'
import { collection, query, where, onSnapshot, doc, getDocs } from "firebase/firestore";
import { db } from '@/utils/firebase-config';
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"

const BackerList = ({projectDetails}) => {
    const [donations, setDonations] = useState([])

    useEffect(() => {
        if (!projectDetails?.uid) {
          console.error("Project UID is not available.");
          return;
        }
    
        const fetchData = async () => {
          try {
            console.log("Fetching donations for project ID:", projectDetails.uid);
    
            // get donations
            const q = query(collection(db, "donations"), where("projectId", "==", projectDetails.uid));
            const unsubscribe = onSnapshot(q, async (querySnapshot) => {
              if (querySnapshot.empty) {
                console.warn("No donations found for this project.");
                return;
              }
    
              const donationsArr = await Promise.all(querySnapshot.docs.map(async (res) => {
                console.log("Donation found:", res.data());
    
                // get donor name
                const userQuery = query(collection(db, "users"), where("uid", "==", res.data().user));
                const userSnapshot = await getDocs(userQuery);
                const userDetails = userSnapshot.docs.map(doc => doc.data())[0]; // assuming user ID is unique
    
                if (userDetails) {
                  console.log("User details found:", userDetails);
                  return { uid: res.id, ...res.data(), userDetails };
                } else {
                  console.warn("User document not found for user ID:", res.data().user);
                  return { uid: res.id, ...res.data(), userDetails: null };
                }
              }));
    
              console.log("Final donations array:", donationsArr);
              setDonations(donationsArr);
            });
    
            // Clean up the listener on unmount
            return () => unsubscribe();
          } catch (err) {
            console.error("Error fetching donations:", err);
          }
        };
    
        fetchData();
    }, [projectDetails.uid]);   

    // console.log(donations)

    const donationList = Object.values(
        donations.reduce((acc, donation) => {
          const { user, userDetails } = donation;
          if (!acc[user]) {
            acc[user] = { user: userDetails?.displayName || userDetails?.email || 'anonymous', photoURL: userDetails?.photoURL };
          } 
          return acc;
        }, {})
    );

    console.log(donationList)
    return (
        <div className='w-full'>
            <h1 className="">Backer List</h1>
            
            <div className="grid grid-cols-5 gap-2" >

            {donationList.length > 0 && donationList.map((donation, key) => {
                return (
                        <GridDisplay donation={donation} key={key}/>
                )
                })}
            </div>
            
            

        </div>
    )
}

const GridDisplay = ({donation, key}) =>{
    return (
        <div className="w-40 h-40 border flex flex-col items-center justify-center shadow" key={key}>
            <Avatar className='w-20 h-20'>
                <AvatarImage src={`${donation?.photoURL}`} alt="@shadcn" sizes={100} className='w-96'/>
                <AvatarFallback>{donation?.user.slice(0, 2) || "anon"}</AvatarFallback>
            </Avatar>

            <p className="mt-6 text-sm">{donation?.user || donation?.user || 'Anonymous'}</p>
        </div>
    )
}



export default BackerList