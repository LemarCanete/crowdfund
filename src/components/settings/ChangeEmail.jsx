import React, { useContext, useEffect, useState } from 'react'
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
import { AuthContext } from '@/context/AuthContext';
import { sendEmailVerification, signInWithEmailAndPassword, updateEmail } from "firebase/auth";
import { auth, db } from '@/utils/firebase-config';
import { useToast } from "@/components/ui/use-toast"
import { RiVerifiedBadgeFill } from 'react-icons/ri';
import { doc, updateDoc } from 'firebase/firestore';

const ChangeEmail = () => {
    const [email, setEmail] = useState("")
    const [newEmail, setNewEmail] = useState("")
    const [password, setPassword] = useState("")
    const { currentUser } = useContext(AuthContext);
    const { toast } = useToast()

    useEffect(()=>{
        setEmail(currentUser.email || "");
        setNewEmail(currentUser.email || "")
    }, [currentUser])

    // const verifyEmail = async() =>{
    //     sendEmailVerification(auth.currentUser)
    //     .then(() => {
    //         toast({
    //             title: "Verification Sent",
    //             description: "The verification email has been sent!",
    //         })
    //     }).catch(()=>{
    //         toast({
    //             title: "Uh oh! Something went wrong.",
    //             description: "There was a problem  with sending a verification",
    //         })
    //     })
    // }

    const changeEmail = async() =>{

        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            updateEmail(auth.currentUser, newEmail).then(async() => {
                setEmail(newEmail)
                const userRef = doc(db, "users", currentUser.uid);
                await updateDoc(userRef, {
                    email: newEmail
                });

                toast({
                    title: "Email has been updated Successfull",
                    description: "The email has been updated successfully",
                })
            }).catch((error) => {
                console.log(error)
                toast({
                    title: "Uh oh! Something went wrong.",
                    description: "There was a problem  with sending a verification",
                  })
            });
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage)
            toast({
                title: "Uh oh! Something went wrong.",
                description: `${errorMessage.slice(22, errorMessage.length-2)}`,
            })
        });

        
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Change Email</CardTitle>
                <CardDescription>
                    Verify your email before changing your email. Click save when you're done.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
                <div className="space-y-1">
                    <div className="flex gap-4 items-center">
                        <Label htmlFor='email'>Current Email</Label>
                        {/* {currentUser.emailVerified ? 
                            <p className="text-sm flex items-center"><RiVerifiedBadgeFill className='text-green-500 text-xl me-2'/> Verified</p> :
                            <Button variant="link" onClick={verifyEmail}>Verify</Button>
                        } */}
                    </div>
                    <Input id="email" disabled value={email} onChange={(e) => setEmail(e.target.value)} />
                    
                </div>
                <div className="space-y-1">
                    <Label htmlFor='newEmail'>New Email</Label>
                    <Input id="newEmail" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
                </div>
                <div className="space-y-1">
                    <Label htmlFor='password'>Current Password</Label>
                    <Input id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
            </CardContent>
            <CardFooter>
                <Button onClick={changeEmail}>Change Email</Button>
            </CardFooter>
        </Card>
    )
}

export default ChangeEmail