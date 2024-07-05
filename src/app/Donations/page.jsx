'use client'
import { useState } from "react";

export default function UserDonations() {
    const initialDonations = [
        { id: 1, campaign: "Typhoon Bopha Relief Fund", amount: 0 },
        { id: 2, campaign: "Anti-poverty Program", amount: 0 },
        { id: 3, campaign: "Malnutrition In The Philippines", amount: 0 }
    ];

    const [donations, setDonations] = useState(initialDonations);

    const totalDonations = donations.reduce((total, donation) => total + donation.amount, 0);

    return (
        <main className="container mx-auto p-4">
            <header className="text-center my-8">
                <h1 className="text-4xl font-bold">My Donations</h1>
                <p className="mt-4 text-lg">Review your contributions to various campaigns.</p>
            </header>
            <section className="my-8">
                <h2 className="text-2xl font-semibold mb-4">Donations Made</h2>
                <div className="grid grid-cols-1 gap-4">
                    {donations.map(donation => (
                        <div key={donation.id} className="bg-white p-4 rounded shadow-md">
                            <h3 className="text-xl font-bold">{donation.campaign}</h3>
                            <p className="mt-2">Amount Donated: {donation.amount > 0 ? `$${donation.amount.toFixed(2)}` : '-'}</p>
                        </div>
                    ))}
                </div>
            </section>
            <section className="text-center my-8">
                <h2 className="text-2xl font-semibold mb-4">Total Donations</h2>
                <p className="text-lg font-bold">${totalDonations.toFixed(2)}</p>
            </section>
        </main>
    );
}
