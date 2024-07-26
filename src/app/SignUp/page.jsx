'use client'
import React, { useContext, useEffect, useState } from 'react'
import {Formik} from 'formik'

// components
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import Link from 'next/link'

// icons
import { FcGoogle } from "react-icons/fc";

// auth
import {createUserWithEmailAndPassword, signInWithPopup} from 'firebase/auth'
import {auth, db, provider} from '@/utils/firebase-config'
import { useRouter } from 'next/navigation'
import { collection, query, where, getDocs } from "firebase/firestore";
import { addDoc, doc, getDoc, setDoc } from "firebase/firestore"; 
import { useToast } from "@/components/ui/use-toast"
import { AuthContext } from '@/context/AuthContext'

const Page = () => {
    const router = useRouter()
    const { toast } = useToast()
    const {currentUser} = useContext(AuthContext)

    useEffect(()=>{
        currentUser.uid && router.push('/')
      }, [currentUser])

    const addUserAuth = (email, password)=>{
        createUserWithEmailAndPassword(auth, email, password)
        .then(async(userCredential) => {
            // Signed up 
            const user = userCredential.user;
            console.log(user.uid)
            const docRef = await setDoc(doc(db, "users", user.uid), {
                uid: user.uid,
                displayName: user.displayName,
                email: user.email,
                isVerified: false,
                phoneNumber: user.phoneNumber,
                photoURL: user.photoURL,
                bio: '',
                username: '',
                location: ''
              });
              toast({
                title: "Successfully Loggedin",
                description: "Welcome user",
            })
            router.push('/')
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            toast({
                title: "Uh oh! Something went wrong.",
                description: "Pls try again!",
            })
        });
    }

    const signUpGoogle = () =>{
        signInWithPopup(auth, provider)
        .then(async(result) => {
            const docRef = doc(db, "users", result.user.uid);
            const docSnap = await getDoc(docRef);

            if (!docSnap.exists()) {
                const docRef = await setDoc(doc(db, "users", result.user.uid), {
                    uid: result.user.uid,
                    displayName: result.user.displayName,
                    email: result.user.email,
                    isVerified: false,
                    phoneNumber: result.user.phoneNumber,
                    photoURL: result.user.photoURL,
                    bio: '',
                    username: '',
                    location: ''
                });
            } 

            toast({
                title: "Successfully Loggedin",
                description: "Welcome user",
            })
                router.push('/')
          }).catch((error) => {
                console.log(error.message)
                toast({
                    title: "Uh oh! Something went wrong.",
                    description: "Pls try again!",
                })
          });
    }

    const checkIfEmailExist = async(email) =>{

        const q = query(collection(db, "users"), where("email", "==", email));

        const querySnapshot = await getDocs(q);
        const user = []
        querySnapshot.forEach((doc) => {
            user.push(doc.id)
        });

        if(user.length > 0){
            return true
        }else{
            return false
        }
    }

    return (
        <div className='w-full'>
            <Formik initialValues={{ email: '', password: '', confirmPassword: '' }}
                validate={async(values) => {
                    const errors = {};
                    const emailExist = await checkIfEmailExist(values.email)
                    console.log(emailExist)
                    if(emailExist){
                        errors.email = 'Email already exist';
                    } 
                    if (!values.email) {
                        errors.email = 'Required';
                    } else if ( !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                        errors.email = 'Invalid email address';
                    }else if(values.confirmPassword !== values.password){
                        errors.confirmPassword = 'Password not matched!';
                    }
                    return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                    addUserAuth(values.email, values.password)
                    setSubmitting(true)
                }}
                >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                    /* and other goodies */
                }) => (
                    <form onSubmit={handleSubmit} className='mx-4 lg:w-2/6 lg:mx-auto mt-16'>
                        <h1 className="text-2xl font-bold">Sign up</h1>
                        <div className="my-6">
                            <Label htmlFor="email" className=''>Email</Label>
                            <Input
                                htmlFor='email'
                                type="email"
                                name="email"
                                id='email'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                                className='my-2'
                            />
                            {errors.email && touched.email && <div className='text-red-500 text-sm'>{errors.email}</div>}
                        </div>
                        <div className="mb-6">
                            <Label htmlFor="password" className=''>Password</Label>
                            <Input
                                type="password"
                                name="password"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password}
                                id='password'
                                className='my-2'
                            />
                            {errors.password && touched.password && <div className='text-red-500 text-sm'>{errors.password}</div>}
                        </div>

                        <div className="mb-6">
                            <Label htmlFor="confirmPassword" className=''>Confirm Password</Label>
                            <Input
                                type="password"
                                name="confirmPassword"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.confirmPassword}
                                id='confirmPassword'
                                className='my-2'
                            />
                            {errors.confirmPassword && touched.confirmPassword && <div className='text-red-500 text-sm'>{errors.confirmPassword}</div>}
                        </div>

                        <Button type="submit" disabled={isSubmitting} className='w-full mt-6'>
                            Sign up
                        </Button>

                        <Separator className='mt-6'/>

                        <Button className='w-full mt-4' variant="outline" onClick={signUpGoogle}>
                            <FcGoogle className='text-lg me-2'/>Sign up with Google
                        </Button>
                    </form>
                )}
            </Formik>
        </div>
    )
}


export default Page