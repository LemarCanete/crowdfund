import React, {useEffect, useState} from "react";
import {
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function CheckoutForm({cash, setCash, addDonate}) {
    const stripe = useStripe();
    const elements = useElements();

    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!stripe) {
        return;
        }

        const clientSecret = new URLSearchParams(window.location.search).get(
            "payment_intent_client_secret"
        );

        if (!clientSecret) {
            return;
        }

        stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
        switch (paymentIntent.status) {
            case "succeeded":
            setMessage("Payment succeeded!");
            break;
            case "processing":
            setMessage("Your payment is processing.");
            break;
            case "requires_payment_method":
            setMessage("Your payment was not successful, please try again.");
            break;
            default:
            setMessage("Something went wrong.");
            break;
        }
        });
    }, [stripe]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
        // Stripe.js hasn't yet loaded.
        // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        setIsLoading(true);

        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: "http://localhost:3000/DonateSuccessPage",   
            },
        });

        console.log(paymentIntent.status)

        if (paymentIntent.status === "succeeded") {
            try {
                alert("Success")
                addDonate();
                setMessage("Payment succeeded!");
            } catch (error) {
                setMessage("Failed to update the donation record.");
                console.error("Error updating document: ", error);
            }
        } else {
            setMessage("Something went wrong.");
        }

        if (error.type === "card_error" || error.type === "validation_error") {
            setMessage(error.message);
        } else {
            setMessage("An unexpected error occurred.");
        }

        
    
        setIsLoading(false);
    };

    const paymentElementOptions = {
        layout: "tabs",
    };

    return (
        <div className="grid grid-cols-2 gap-16">
            <div className="bg-white p-4 rounded shadow-md ">
                <img src="/Project1.jpg" alt="Project 1" className="w-full h-48 object-cover rounded mb-4"/>
                <h3 className="text-xl font-bold">Typhoon Bopha Relief Fund</h3>
                <p className="mt-2">Typhoon Bopha devastated communities in the Philippines, leaving many without homes and basic necessities. 
                    Your contribution will provide essential relief and help rebuild lives.</p>
                    <Progress value={35} className="w-[85%] mt-4" />
                    <div className="flex flex-row">
                    <p className="basis-1/2">Raised:70,000 php</p>
                    <p className="basis-1/2">Goal:200,000 php</p>
                    </div>
                <Button className="mt-4">More Details</Button>
            </div>

            <form id="payment-form" onSubmit={handleSubmit} className="">
                <h1 className="text-xl font-bold tracking-wider leading-10">Card Information</h1>
                <PaymentElement id="payment-element" options={paymentElementOptions} className=""/>

                <Label htmlFor="cash" className="font-light text-base mt-96">Donation Amount</Label>
                <Input type="number" id="cash" value={cash} onChange={(e) => setCash(e.target.value)}/>

                <Button disabled={isLoading || !stripe || !elements} id="submit" className="mt-4">
                    <span id="button-text">
                    {isLoading ? <div className="spinner" id="spinner"></div> : `Donate now`}
                    </span>
                </Button>
                {/* Show any error or success messages */}
                {message && <div id="payment-message text-sm">{message}</div>}
            </form>
        </div>
    );
}