import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'

const Navbar = () => {
    return (
        <nav className='flex justify-between p-5'>
            <Link href="/" className="text-2xl">LOGO</Link>

            <div className="flex gap-10 items-center">
                <Link className="" href='/'>Home</Link>
                <Link className="" href='/Projects'>Projects</Link>
                <Link className="" href='/Contact'>Contact Us</Link>
                <Link className="" href='/About'>About</Link>
                <Button className="">Login</Button>
            </div>
        </nav>
    )
}

export default Navbar