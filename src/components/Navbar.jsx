import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import Login from '@/components/auth/Login'


const Navbar = () => {
    return (
        <nav className='flex justify-between p-5'>
            <Link href="/" className="text-2xl">LOGO</Link>

            <div className="flex gap-10 items-center">
                <Link className="" href='/'>Home</Link>
                <Link className="" href='/Projects'>Projects</Link>
                <Link className="" href='/Contact'>Contact Us</Link>
                <Link className="" href='/About'>About</Link>
                <Dialog>
                    <DialogTrigger className='button'>Login</DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle className='text-center'>LOGIN</DialogTitle>
                            <DialogDescription>
                                <Login />
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </div>

            
        </nav>
    )
}


export default Navbar