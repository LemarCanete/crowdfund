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
import { auth, db, storage } from '@/utils/firebase-config';
import { updateEmail, updateProfile } from 'firebase/auth';
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const Page = () => {
    const { currentUser, setCurrentUser } = useContext(AuthContext);
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [location, setLocation] = useState("");
    const [contactNo, setContactNo] = useState("");
    const [message, setMessage] = useState("");
    const [bio, setBio] = useState("");
    const [file, setFile] = useState(null)
    const [photoURL, setPhotoURL] = useState('');

    const router = useRouter();
    const { toast } = useToast()

    useEffect(() => {
        if (!currentUser.uid && !currentUser) {
            router.push('/');
        }
    }, [currentUser]);

    useEffect(() => {
        if (currentUser) {
            setName(currentUser.displayName || "");
            setUsername(currentUser.username || "");
            setLocation(currentUser.location || "");
            setContactNo(currentUser.contactNo || "");
            setBio(currentUser.bio || "");
            setPhotoURL(currentUser.photoURL || "")
        }
    }, [currentUser]);

    const handleSaveChanges = async () => {
        try {
            const docRef = doc(db, 'users', currentUser.uid);
            await updateDoc(docRef, {
                displayName: name,
                username: username,
                location: location,
                contactNo: contactNo,
                bio: bio
            });

            await updateProfile(auth.currentUser, {
                displayName: name
            })

            if(file && file.name){
                handleUploadFile()
            }

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


    const handleUploadFile = async() =>{
        try{
            const metadata = {
                contentType: 'image/jpeg'
            };
    
            // Upload file and metadata to the object 'images/mountains.jpg'
            const storageRef = ref(storage, 'profile/' + file.name);
            const uploadTask = uploadBytesResumable(storageRef, file, metadata);
    
            // Listen for state changes, errors, and completion of the upload.
            uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                case 'paused':
                    console.log('Upload is paused');
                    break;
                case 'running':
                    console.log('Upload is running');
                    break;
                }
            }, 
            (error) => {
                switch (error.code) {
                case 'storage/unauthorized':
                    // User doesn't have permission to access the object
                    break;
                case 'storage/canceled':
                    // User canceled the upload
                    break;
                case 'storage/unknown':
                    // Unknown error occurred, inspect error.serverResponse
                    break;
                }
            }, 
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
                    console.log('File available at', downloadURL);
    
                    // update user from firestore
                    const userRef = doc(db, "users", currentUser.uid);
                    await updateDoc(userRef, {
                        photoURL: downloadURL
                    });
    
                    // update auth photoURL
                    updateProfile(auth.currentUser, {
                        photoURL: downloadURL
                    })

                    setCurrentUser(prev => ({...prev, photoURL: downloadURL}))
                    setFile(null)
                    setPhotoURL(downloadURL)
                });
            }
            );

            toast({
                title: "Successfully changed profile picture",
                description: "The changes you have made to your profile picture has been updated successfully",
            })
        }catch(err){
            toast({
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with updating your profile picture. Pls try again",
            })
        }
    }

    return (
        <div className='flex justify-center items-center'>
            <Tabs defaultValue="account" className="w-[1200px]">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="account">Account</TabsTrigger>
                    <TabsTrigger value="changeEmail">Change Email</TabsTrigger>
                    {/* <TabsTrigger value="changePassword">Change Password</TabsTrigger>
                    <TabsTrigger value="verifyAccount">Verify Account</TabsTrigger> */}
                </TabsList>
                <TabsContent value="account">
                    <Card className='border-0 md:border'>
                        <CardHeader>
                            <CardTitle>Account</CardTitle>
                            <CardDescription>
                                Make changes to your account here. Click save when you&apos;re done.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="grid grid-cols-1 md:grid-cols-3 mb-4">
                                {/* photoURL */}
                                <div className="flex flex-col justify-end gap-2 row-span-3 me-10">
                                    <Label htmlFor="photoURL" className=''>
                                        <img className='w-48 mx-auto' src={photoURL || 'https://png.pngtree.com/png-vector/20240427/ourmid/pngtree-user-icon-brush-profile-vector-png-image_12327708.png'}/>
                                    </Label>
                                    <Input type='file' id="photoURL" accept='image/*' className={`border-0 underline ${file ? 'visible' : 'invisible'}`} onChange={e => setFile(e.target.files[0])}/>
                                </div>
                                {/* name */}
                                <div className="flex flex-col justify-end gap-2 col-span-2">
                                    <Label htmlFor="name">Name</Label>
                                    <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
                                </div>
                                {/* username */}
                                <div className="flex flex-col justify-end gap-2 col-span-2">
                                    <Label htmlFor="username">Username</Label>
                                    <Input id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                                </div>
                                {/* phoneNumber */}
                                <div className="flex flex-col justify-end gap-2 col-span-2">
                                    <Label htmlFor="contactNo">Phone Number</Label>
                                    <Input id="contactNo" value={contactNo} onChange={(e) => setContactNo(e.target.value)} />
                                </div>
                            </div>
                            {/* location */}
                            <div className="space-y-1">
                                <Label htmlFor="location">Location</Label>
                                <Input id="location" value={location} onChange={(e) => setLocation(e.target.value)} />
                            </div>
                            {/* bio */}
                            <div className="space-y-1">
                                <Label htmlFor="bio">Bio</Label>
                                <Textarea id="bio" rows={5} maxLength="1000" value={bio} onChange={(e) => setBio(e.target.value)} />

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
                {/* <TabsContent value="changePassword">
                    <ChangePassword />
                </TabsContent>
                <TabsContent value="verifyAccount">
                    <VerifyAccount />
                </TabsContent> */}
            </Tabs>
        </div>
    );
}

export default Page;
