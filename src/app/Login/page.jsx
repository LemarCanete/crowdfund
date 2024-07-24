'use client'
import React, { useContext, useEffect } from 'react'
import {Formik} from 'formik'
import { useRouter } from 'next/navigation'

// components
import { Button } from '@/components/ui/button'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import Link from 'next/link'

// icons
import { FcGoogle } from "react-icons/fc";

// auth
import {getAuth, sendPasswordResetEmail, setPersistence, signInWithEmailAndPassword, signInWithPopup, browserLocalPersistence } from 'firebase/auth'
import { auth, db, provider } from '@/utils/firebase-config'
import { addDoc, collection, doc, getDoc, setDoc } from 'firebase/firestore'
import { useToast } from "@/components/ui/use-toast"
import { AuthContext } from '@/context/AuthContext'

const Page = () => {
    const router = useRouter()
    const { toast } = useToast()
    const {currentUser} = useContext(AuthContext)

    useEffect(()=>{
        currentUser.uid && router.push('/')
      }, [currentUser])

    const signIn = (email, password) =>{
        setPersistence(auth, browserLocalPersistence)
        .then(() => {
            signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                toast({
                    title: "Successfully Loggedin",
                    description: "Welcome user",
                })
                router.push('/')
                return true
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                toast({
                    title: "Uh oh! Something went wrong.",
                    description: "Pls try again!",
                })
                return false
            });
        })
        .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            
            return false
        });
    }

    const resetEmail = (email) =>{
        try{
            sendPasswordResetEmail(auth, email)
        }catch(err){
            console.log(err.message)
        }
    }

    const signInGoogle = () =>{
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

    return (
        <div className='w-full'>
            <Formik initialValues={{ email: '', password: ''}}
                validate={values => {
                    const errors = {};
                    if (!values.email) {
                        errors.email = 'Required';
                    } else if (
                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                    ) {
                    errors.email = 'Invalid email address';
                    }
                    return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                    const signedIn = signIn(values.email, values.password)
                    setSubmitting(false)
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
                    <form onSubmit={handleSubmit} className='w-2/6 mx-auto mt-16'>
                        <h1 className="text-2xl font-bold">Login</h1>
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
                            {errors.email && touched.email && <div className='text-sm text-red-500'>{errors.email   }</div>}
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
                            {errors.password && touched.password && <div className='text-sm text-red-500'>{errors.password}</div>}
                        </div>

                        <div className="flex justify-between align-center">
                            <div className="flex items-center space-x-2">
                                <Checkbox id="remember-me" />
                                <label
                                    htmlFor="remember-me"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Remember me?
                                </label>
                            </div>
                            <div className="">
                                <Button variant="link" type="button" onClick={()=> resetEmail(values.email)}>Forgot password?</Button>
                            </div>
                        </div>

                        <Button type="submit" disabled={isSubmitting} className='w-full mt-6'>
                            Login
                        </Button>

                        <Separator className='mt-6'/>

                        <Button className='w-full mt-4' onClick={signInGoogle} variant="outline" type='button'>
                            <FcGoogle className='text-lg me-2' />Sign in with Google
                        </Button>
                        <p className="text-center mt-4">Dont have account? <Link href="SignUp" className='underline'>SignUp</Link></p>
                    </form>
                )}
            </Formik>
        </div>
    )
}


export default Page