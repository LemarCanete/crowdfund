// page.jsx
'use client'
import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./CheckoutForm";
import { IoMdArrowBack } from "react-icons/io";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function Page() {
    const [clientSecret, setClientSecret] = React.useState("");
    const router = useRouter()

    React.useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch("/Payment/api/create-payment-intent", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
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

    return (
        <div className="w-screen">
            {clientSecret && (
                <div className="w-4/6 mx-auto">
                    <Elements options={options} stripe={stripePromise}>
                        <Button variant="link" className="flex gap-4 items-center cursor-pointer" onClick={()=>router.back()} ><IoMdArrowBack /> Back</Button>
                        <CheckoutForm />
                    </Elements>
                </div>
            )}
        </div>
    );
}
