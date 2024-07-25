'use client';
import { useContext, useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { fetchProjects, fetchUserDonations, addDonation } from './pagebackend';
import { AuthContext } from '@/context/AuthContext';
import { useRouter } from "next/navigation";

export default function DonationsPage() {
    const { currentUser } = useContext(AuthContext);
    const [projects, setProjects] = useState([]);
    const [donations, setDonations] = useState([]);
    const router = useRouter()

    useEffect(() => {
        if (!currentUser.uid && !currentUser) {
            router.push('/');
        }
    }, [currentUser]);

    useEffect(() => {
        const getProjects = async () => {
            try {
                const fetchedProjects = await fetchProjects();
                setProjects(fetchedProjects);
            } catch (error) {
                console.error("Error fetching projects: ", error);
            }
        };

        getProjects();
    }, []);

    useEffect(() => {
        const getDonations = async () => {
            if (currentUser) {
                try {
                    const userDonations = await fetchUserDonations(currentUser.uid);
                    console.log('Fetched Donations:', userDonations);
                    userDonations.sort((a, b) => b.createdAt.seconds - a.createdAt.seconds);
                    setDonations(userDonations);
                } catch (error) {
                    console.error("Error fetching donations: ", error);
                }
            }
        };

        getDonations();
    }, [currentUser]);

    const handleSupport = async (project) => {
        console.log("handleSupport called for project:", project);
        if (currentUser) {
            const newDonation = { campaign: project.title, amount: 100, projectId: project.id, message: "Great Project!", status: "Succeeded", user: currentUser.uid };
            try {
                const existingDonation = donations.find(donation => 
                    donation.projectId === project.id && donation.user === currentUser.uid);
                
                if (!existingDonation) {
                    console.log("Adding new donation:", newDonation);
                    const updatedDonations = await addDonation(currentUser.uid, newDonation, donations);
                    updatedDonations.sort((a, b) => b.createdAt.seconds - a.createdAt.seconds);
                    setDonations(updatedDonations);
                } else {
                    console.log("Donation already exists for project:", project.title);
                }
            } catch (error) {
                console.error("Error adding donation:", error);
            }
        } else {
            console.error("User not authenticated");
        }
    };

    const getProjectTitleById = (projectId) => {
        const project = projects.find(project => project.id === projectId);
        return project ? project.title : "Unknown Project";
    };

    const supportedProjectIds = new Set(donations.map(donation => donation.projectId));

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
                                These are the projects that you have supported. Thank you for the Donations.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {projects
                                .filter(project => supportedProjectIds.has(project.id))
                                .map(project => (
                                    <div key={project.id} className="bg-white p-4 rounded shadow-md">
                                        <img src={project.coverPhoto} alt={project.title} className="w-full h-48 object-cover rounded mb-4"/>
                                        <h3 className="text-xl font-bold">{project.title}</h3>
                                        <p className="mt-2">{project.description}</p>
                                        <p className="mt-2">Target Amount: ₱{parseFloat(project.targetAmount).toLocaleString()}</p>
                                        <p className="mt-2">Raised Amount: ₱{project.raisedAmount.toLocaleString()}</p>
                                    </div>
                                ))}

                            { supportedProjectIds &&
                                <p className='text-slate-200 italic text-center text-3xl mt-6'>No projects supported yet!</p>
                            }
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
                            {donations.map((donation, index) => (
                                <div key={index} className="bg-white p-4 rounded shadow-md">
                                    <h3 className="text-xl font-bold">{getProjectTitleById(donation.projectId)}</h3>
                                    <p className="mt-2">Amount Donated: ₱{typeof donation.amount === 'number'||'string' ? donation.amount.toLocaleString() : '-'}</p>
                                    <p className="text-sm text-gray-500">Message: {donation.message}</p>
                                    <p className="text-sm text-gray-500">Status: {donation.status}</p>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
