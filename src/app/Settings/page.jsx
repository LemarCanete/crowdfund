'use client'
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
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from '@/utils/firebase-config';
import { AuthContext } from '@/context/AuthContext';

const Page = () => {
    const { currentUser } = useContext(AuthContext);
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [location, setLocation] = useState("");
    const [contactNo, setContactNo] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        console.log(currentUser);

        if (currentUser) {
            const fetchUserData = async () => {
                const docRef = doc(db, 'users', currentUser.uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setName(data.name);
                    setUsername(data.username);
                    setEmail(data.email);
                    setLocation(data.location);
                    setContactNo(data.contactNo);
                } else {
                    console.log("No such document!");
                }
            };

            fetchUserData();
        } else {
            console.log("No user is signed in.");
        }
    }, [currentUser]);

    const handleSaveChanges = async () => {
        if (currentUser) {
            try {
                const docRef = doc(db, 'users', currentUser.uid);
                await setDoc(docRef, {
                    name,
                    username,
                    email,
                    location,
                    contactNo
                });
                setMessage("Changes Saved");
                setTimeout(() => setMessage(""), 3000);
                console.log("Document successfully written!");
            } catch (e) {
                console.error("Error writing document: ", e);
            }
        } else {
            console.error("No user is signed in.");
        }
    };

    return (
        <div className='flex justify-center'>
            <Tabs defaultValue="account" className="w-[800px]">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="account">Account</TabsTrigger>
                    <TabsTrigger value="password">Password</TabsTrigger>
                    <TabsTrigger value="verifyAccount">Verify Account</TabsTrigger>
                </TabsList>
                <TabsContent value="account">
                    <Card>
                        <CardHeader>
                            <CardTitle>Account</CardTitle>
                            <CardDescription>
                                Make changes to your account here. Click save when you're done.
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
                                <Label htmlFor="email address">Email Address</Label>
                                <Input id="email address" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="location">Location</Label>
                                <Input id="location" value={location} onChange={(e) => setLocation(e.target.value)} />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="contact no.">Contact No.</Label>
                                <Input id="contact no." value={contactNo} onChange={(e) => setContactNo(e.target.value)} />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button onClick={handleSaveChanges}>Save changes</Button>
                            {message && <p className="ml-4 text-green-500">{message}</p>}
                        </CardFooter>
                    </Card>
                </TabsContent>
                <TabsContent value="password">
                    <Card>
                        <CardHeader>
                            <CardTitle>Password</CardTitle>
                            <CardDescription>
                                Change your password here. After saving, you'll be logged out.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="space-y-1">
                                <Label htmlFor="current">Current password</Label>
                                <Input id="current" type="password" />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="new">New password</Label>
                                <Input id="new" type="password" />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button>Save password</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
                <TabsContent value="verifyAccount">
                    <VerifyAccount />
                </TabsContent>
            </Tabs>
        </div>
    );
}

export default Page;
