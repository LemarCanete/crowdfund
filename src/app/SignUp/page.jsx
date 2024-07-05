'use client'
import React, { useEffect, useState } from 'react'
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
import {auth, provider} from '@/utils/firebase-config'
import { useRouter } from 'next/navigation'

const page = () => {
    const [userType, setUserType] = useState('');
    const router = useRouter()
    const addUserAuth = (email, password)=>{
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            router.push('/')
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
    }

    const signUpGoogle = () =>{
        console.log('unsa na ni')
        signInWithPopup(auth, provider)
        .then((result) => {
            router.push('/')
          }).catch((error) => {
            console.log(error.message)
          });
    }

    return (
        <div className='w-full'>
            <Formik initialValues={{ email: '', password: '', confirmPassword: '' }}
                validate={values => {
                    const errors = {};
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
                    <form onSubmit={handleSubmit} className='w-2/6 mx-auto mt-16'>
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


export default page