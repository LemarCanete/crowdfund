'use client'
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function DonationsPage() {
    const initialProjects = [
        { id: 1, name: "Typhoon Bopha Relief Fund", description: "Typhoon Bopha devastated communities in the Philippines, leaving many without homes and basic necessities. Your contribution will provide essential relief and help rebuild lives.", image: "/Project1.jpg" },
        { id: 2, name: "Anti-poverty Program", description: "Our Anti-poverty Program aims to alleviate poverty by providing education, resources, and support to underprivileged communities. Join us in empowering individuals to build a better future.", image: "/Project2.jpg" },
        { id: 3, name: "Malnutrition In The Philippines", description: "Help us combat malnutrition in the Philippines by providing nutritious food and education on healthy eating. Your support can save lives and promote healthier communities.", image: "/Project3.jpg" }
    ];

    const initialDonations = [
        { id: 1, campaign: "Typhoon Bopha Relief Fund", amount: null },
        { id: 2, campaign: "Anti-poverty Program", amount: null },
        { id: 3, campaign: "Malnutrition In The Philippines", amount: null }
    ];

    const [donations] = useState(initialDonations);

    const totalDonations = donations.reduce((total, donation) => total + (donation.amount || 0), 0);

    return (
        <div className="flex justify-center">
            <Tabs defaultValue="projects" className="w-[800px]">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="projects">Projects</TabsTrigger>
                    <TabsTrigger value="myDonations">My Donations</TabsTrigger>
                </TabsList>
                <TabsContent value="projects">
                    <Card>
                        <CardHeader>
                            <CardTitle>Projects</CardTitle>
                            <CardDescription>
                                Join us in supporting innovative projects and making dreams come true.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {initialProjects.map(project => (
                                <div key={project.id} className="bg-white p-4 rounded shadow-md">
                                    <img src={project.image} alt={project.name} className="w-full h-48 object-cover rounded mb-4"/>
                                    <h3 className="text-xl font-bold">{project.name}</h3>
                                    <p className="mt-2">{project.description}</p>
                                    <Button className="mt-4">Support</Button>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="myDonations">
                    <Card>
                        <CardHeader>
                            <CardTitle>My Donations</CardTitle>
                            <CardDescription>
                                Review your contributions to various campaigns.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {donations.map(donation => (
                                <div key={donation.id} className="bg-white p-4 rounded shadow-md">
                                    <h3 className="text-xl font-bold">{donation.campaign}</h3>
                                    <p className="mt-2">Amount Donated: {donation.amount !== null ? `$${donation.amount.toFixed(2)}` : '-'}</p>
                                </div>
                            ))}
                        </CardContent>
                        <CardFooter className="text-center">
                            <h2 className="text-2xl font-semibold mb-4">Total Donations</h2>
                            <p className="text-lg font-bold">${totalDonations.toFixed(2)}</p>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
