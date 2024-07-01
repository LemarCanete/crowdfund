'use client'

import React from 'react'
import {Formik} from 'formik'
import { useRouter } from 'next/navigation'

// components
import { Button } from '../ui/button'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import Link from 'next/link'

// icons
import { FcGoogle } from "react-icons/fc";

// auth
import {signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/utils/firebase-confi'


const Login = () => {
    const router = useRouter();

    const signIn = (email, password) =>{
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log('signed in')
            router.push('/')
            return true
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            return false
        });
    }

    return (
        <div>
            <Formik initialValues={{ email: '', password: '' }}
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
                    signedIn && setSubmitting(false)
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
                    <form onSubmit={handleSubmit} className=''>
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

                        <div className="flex items-center space-x-2">
                            <Checkbox id="remember-me" />
                            <label
                                htmlFor="remember-me"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Remember me?
                            </label>
                        </div>

                        <Button type="submit" disabled={isSubmitting} className='w-full mt-6'>
                            Login
                        </Button>

                        <Separator className='mt-6'/>

                        <Button className='w-full mt-4' variant="outline" ><FcGoogle className='text-lg me-2'/>Sign in with Google</Button>
                        <p className="text-center mt-4">Dont have account? <Link href="SignUp" className='underline'>SignUp</Link></p>
                    </form>
                )}
            </Formik>
        </div>
    )
}

export default Login