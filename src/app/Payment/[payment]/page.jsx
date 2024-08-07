// page.jsx
'use client'
import React, {useState, useEffect, useContext} from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "../CheckoutForm";
import { IoMdArrowBack } from "react-icons/io";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { collection, addDoc, Timestamp, onSnapshot } from "firebase/firestore"; 
import { AuthContext } from "@/context/AuthContext";
import { db } from "@/utils/firebase-config";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useToast } from "@/components/ui/use-toast"

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function Page({params}) {
    const [clientSecret, setClientSecret] = useState("");
    const [cash, setCash] = useState(50)
    const [note, setNote] = useState("")
    const [isPrivate, setIsPrivate] = useState(false);
    const {currentUser} = useContext(AuthContext)
    const router = useRouter()
    const [projectDetails, setProjectDetails] = useState([])
    const { toast } = useToast()

    const projectId = params.payment

    useEffect(()=>{
        const fetchData = async () =>{
            const docRef = doc(db, "projects", projectId);

            const unsubscribe = onSnapshot(docRef, (doc) => {
            if (doc.exists()) {
                console.log("Current data: ", doc.data());
                setProjectDetails({uid: projectId, ...doc.data()})
            } else {
                console.log("No such document!");
            }
            }, (error) => {
                console.error("Error listening to document:", error);
            });
        }

        fetchData()
    }, [projectId])

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch("/Payment/api/create-payment-intent", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ items: [{ id: 'xlshirt-1', cash: cash }] }),
        })
        .then((res) => res.json())
        .then((data) => setClientSecret(data.clientSecret));
    }, []);

    const appearance = {
        theme: 'stripe',
    };
    const options = {
        clientSecret,
        appearance,
    };

    const addDonate = async() =>{
        try{
            // Add a new document with a generated id.
            const docRef = await addDoc(collection(db, "donations"), {
                amount: Number(cash),
                user: !isPrivate ? currentUser.uid : 'anonymous',
                createdAt: Timestamp.now(),
                updatedAt: Timestamp.now(),
                status: "Succeeded",
                projectId: projectId,
                message: note,
            });

            toast({
                title: `Donation Successful`,
                description: `Successfully donated ${cash}`,
              })
            
            // update project raisedAmount
            const projectRef = doc(db, "projects", projectId);
            // Set the "capital" field of the city 'DC'
            await updateDoc(projectRef, {
                raisedAmount: Number(projectDetails.raisedAmount) + Number(cash),
                updatedAt: Timestamp.now()
            });

            window.location.reload()


        }catch(err){
            toast({
                title: "Uh oh! Something went wrong.",
                description: "There was an error with your donation. Pls try again",
            })
            console.log(err.message);
        }
    }

    return (
        <div className="w-screen">
            {clientSecret && (
                <div className="w-full md:w-4/6 mx-auto">
                    <Elements options={options} stripe={stripePromise}>
                        <Button variant="link" className="flex gap-4 items-center cursor-pointer" onClick={()=>router.back()} ><IoMdArrowBack /> Back</Button>
                        {projectDetails && <CheckoutForm cash={cash} setCash={setCash} note={note} setNote={setNote} setIsPrivate={setIsPrivate} isPrivate={isPrivate} addDonate={addDonate} projectDetails={projectDetails}/>}
                    </Elements>
                </div>
            )}
        </div>
    );
}
