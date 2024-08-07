// app/api/create-payment-intent/route.js
import { NextResponse } from 'next/server';
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const calculateOrderAmount = (items) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
    console.log(Number(items[0].cash))
    const donate = Number(items[0].cash)
    return donate;
};

export async function POST(req) {
    const { items } = await req.json();
    console.log(items)
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount(items),
        currency: 'eur',
        // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
        automatic_payment_methods: {
        enabled: true,
        },
    });

    return NextResponse.json({
        clientSecret: paymentIntent.client_secret,
    });
}
