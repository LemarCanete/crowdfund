import React, { useEffect, useState } from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { collection, query, where, onSnapshot, doc, getDocs } from "firebase/firestore";
import { db } from '@/utils/firebase-config';
import { format } from 'date-fns';

const DonationLogs = ({projectDetails}) => {

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

    return (
        <Table>
            <TableCaption>A list of recent donations.</TableCaption>
            <TableHeader>
                <TableRow>
                <TableHead className="">Timestamp</TableHead>
                <TableHead>Donor</TableHead>
                <TableHead>Message</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {donations.map((donation, key) => (
                <TableRow key={key}>
                    <TableCell className="font-medium">{format(donation.createdAt.toDate(), 'MM/dd/yyyy h:mm a')}</TableCell>
                    <TableCell>{donation?.userDetails?.displayName || donation?.userDetails?.email || donation.user}</TableCell>
                    <TableCell>{donation.message}</TableCell>
                    <TableCell className="text-right">P {donation.amount}.00</TableCell>
                </TableRow>
                ))}
            </TableBody>
            <TableFooter>
                <TableRow>
                <TableCell colSpan={3}>Total</TableCell>
                <TableCell className="text-right">P {donations.reduce((total, val) => total + Number(val.amount), 0)}.00</TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    )
}

export default DonationLogs