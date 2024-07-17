import React, { useEffect, useState } from 'react'
import Radial from '@/components/Analytics/Radial'
// import LineGraph from '@/components/Analytics/LineGraph'
import AreaGraph from '@/components/Analytics/AreaGraph'
import PieGraph from '@/components/Analytics/PieGraph'
import BarGraph from '@/components/Analytics/BarGraph'
import AreaGraph2 from '@/components/Analytics/AreaGraph2'
import { collection, query, where, onSnapshot, doc, getDocs } from "firebase/firestore";
import { db } from '@/utils/firebase-config';

const Analytics = ({projectDetails}) => {

    const [donations, setDonations] = useState([])
    const [reviews, setReviews] = useState([])
    const [updates, setUpdates] = useState([])

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

    // fetch reviews
    useEffect(() => {
        const fetchData = async() =>{

            const q = query(collection(db, "reviews"), where("projectId", "==", projectDetails.uid));
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const reviewArr = [];
            querySnapshot.forEach((doc) => {
                reviewArr.push(doc.data());
            });
                setReviews(reviewArr)
            });
        }

        fetchData()
    }, [])

    // fetch updates
    useEffect(() => {
        const fetchData = async() =>{

            const q = query(collection(db, "updates"), where("projectId", "==", projectDetails.uid));
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const updatesArr = [];
            querySnapshot.forEach((doc) => {
                updatesArr.push(doc.data());
            });
            setUpdates(updatesArr)
            });
        }

        fetchData()
    }, [])

    console.log(donations)
    console.log(reviews)
    console.log(updates)

    return (
        <div className='mx-20 grid grid-cols-2 gap-10 my-4'>
            <Radial projectDetails={projectDetails}/>
            {/* <LineGraph projectDetails={projectDetails}/> */}
           {donations.length > 0 && <AreaGraph projectDetails={projectDetails} donations={donations}/>}
            <PieGraph projectDetails={projectDetails}/>
            {donations.length > 0 && <BarGraph projectDetails={projectDetails} donations={donations}/>}
            {donations.length > 0 && reviews.length > 0 && <div className="">
                <AreaGraph2 projectDetails={projectDetails} donations={donations} rev={reviews} upd={updates}/>
            </div>}
        </div>
    )
}

export default Analytics