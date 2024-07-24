'use client';
import React, { useContext, useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import VerifyAccount from "@/components/settings/VerifyAccount";
import ChangeEmail from "@/components/settings/ChangeEmail";
import ChangePassword from "@/components/settings/ChangePassword";
import { AuthContext } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { doc, updateDoc } from 'firebase/firestore';
import { useToast } from "@/components/ui/use-toast"
import { auth, db } from '@/utils/firebase-config';
import { updateEmail, updateProfile } from 'firebase/auth';

const Page = () => {
    const { currentUser } = useContext(AuthContext);
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [location, setLocation] = useState("");
    const [contactNo, setContactNo] = useState("");
    const [message, setMessage] = useState("");

    const router = useRouter();
    const { toast } = useToast()

    // useEffect(() => {
    //     if (!currentUser.uid) {
    //         router.push('/');
    //     }
    // }, [currentUser]);

    useEffect(() => {
        if (currentUser) {
            setName(currentUser.displayName || "");
            setUsername(currentUser.username || "");
            setLocation(currentUser.location || "");
            setContactNo(currentUser.phoneNumber || "");
        }
    }, [currentUser]);

    const handleSaveChanges = async () => {
        try {
            const docRef = doc(db, 'users', currentUser.uid);
            await updateDoc(docRef, {
                name: name,
                username: username,
                location: location,
                contactNo: contactNo,
            });

            await updateProfile(auth.currentUser, {
                displayName: name
            })

            toast({
                title: "Your account has been updated successfully",
                description: "The changes you have made to your profile has been updated successfully",
            })
        } catch (error) {
            console.error("Error writing document:", error);
            toast({
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with updating your profile. Pls try again",
            })
        }
    };

    console.log(currentUser)

    return (
        <div className='flex justify-center items-center'>
            <Tabs defaultValue="account" className="w-[900px]">
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="account">Account</TabsTrigger>
                    <TabsTrigger value="changeEmail">Change Email</TabsTrigger>
                    <TabsTrigger value="changePassword">Change Password</TabsTrigger>
                    <TabsTrigger value="verifyAccount">Verify Account</TabsTrigger>
                </TabsList>
                <TabsContent value="account">
                    <Card>
                        <CardHeader>
                            <CardTitle>Account</CardTitle>
                            <CardDescription>
                                Make changes to your account here. Click save when you&apos;re done.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="space-y-1">
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="username">Username</Label>
                                <Input id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="location">Location</Label>
                                <Input id="location" value={location} onChange={(e) => setLocation(e.target.value)} />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="contactNo">Contact No.</Label>
                                <Input id="contactNo" value={contactNo} onChange={(e) => setContactNo(e.target.value)} />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button onClick={handleSaveChanges}>Save changes</Button>
                            {message && <p className="ml-4 text-green-500">{message}</p>}
                        </CardFooter>
                    </Card>
                </TabsContent>
                <TabsContent value="changeEmail">
                    <ChangeEmail />
                </TabsContent>
                <TabsContent value="changePassword">
                    <ChangePassword />
                </TabsContent>
                <TabsContent value="verifyAccount">
                    <VerifyAccount />
                </TabsContent>
            </Tabs>
        </div>
    );
}

export default Page;
