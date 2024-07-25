'use client'
import React, { useContext, useEffect, useState } from 'react'
import { Button } from './ui/button'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import { auth } from '@/utils/firebase-config'
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { onAuthStateChanged, signOut } from 'firebase/auth'
import {FaBookmark, FaGoogleWallet, FaHandHoldingHeart, FaLink, FaPlus, FaRegUser, FaUser, FaWallet} from 'react-icons/fa'
import { GoGear, GoProject  } from "react-icons/go";
import { MdOutlineLogout, MdWallet } from "react-icons/md";
import AddAProjectDialog from '@/components/AddAProjectDialog'
import { AuthContext } from '@/context/AuthContext'
import Image from 'next/image'

const Navbar = () => {
    const router = useRouter();
    const pathname = usePathname();
    const {currentUser} = useContext(AuthContext)
    const [isOpen, setIsOpen] = useState(false); // Added state for mobile menu toggle

    if (pathname === '/') return false;

    const handleLinkClick = (href) => {
        router.push(href);
        setIsOpen(false);
    };

    return (
        <nav className='flex justify-between items-center p-5 bg-white '>
            <Link href="/" className="flex-shrink-0">
                <Image src="/logov5.png" alt="logo" width={155} height={0} />
            </Link>

            <div className="flex items-center">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden text-gray-800 focus:outline-none"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        {isOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                        )}
                    </svg>
                </button>

                <div className={`fixed inset-0 bg-white z-50 flex flex-col items-center justify-center gap-10 md:flex-row md:static md:bg-transparent md:gap-10 md:flex ${isOpen ? 'flex' : 'hidden'}`}>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="absolute top-4 right-4 text-gray-800 md:hidden"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <Link className={pathname === '/HomePage' ? 'text-blue-500' : ''} href='/HomePage' onClick={() => handleLinkClick('/HomePage')}>Home</Link>
                    <Link className={pathname === '/Projects' ? 'text-blue-500' : ''} href='/Projects' onClick={() => handleLinkClick('/Projects')}>Projects</Link>
                    <Link className={pathname === '/Contact' ? 'text-blue-500' : ''} href='/Contact' onClick={() => handleLinkClick('/Contact')}>Contact Us</Link>
                    <Link className={pathname === '/About' ? 'text-blue-500' : ''} href='/About' onClick={() => handleLinkClick('/About')}>About</Link>
                    {!currentUser?.uid && (
                        <div className="flex gap-2">
                            <Button variant="link" onClick={() => { router.push('/Login'); setIsOpen(false); }}>Login</Button>
                            <Button variant="" onClick={() => { router.push('/SignUp'); setIsOpen(false); }}>Sign up</Button>
                        </div>
                    )}
                    {currentUser?.uid && (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Avatar>
                                    <AvatarImage src={`${currentUser?.photoURL}`} alt="@shadcn" />
                                    <AvatarFallback>{currentUser.email.slice(0, 2)}</AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56">
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <Link href="/Profile">
                                        <DropdownMenuItem >
                                            <FaRegUser className="mr-2 text-gray-500" /> Profile
                                        </DropdownMenuItem>
                                    </Link>
                                    <Link href="/Settings">
                                        <DropdownMenuItem >
                                            <GoGear className="mr-2 text-gray-500" /> Settings
                                        </DropdownMenuItem>
                                    </Link>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <Link href="MyProjects">
                                        <DropdownMenuItem >
                                            <GoProject className="mr-2 text-gray-500" /> My Projects
                                        </DropdownMenuItem>
                                    </Link>
                                    <Link href="/Bookmark">
                                        <DropdownMenuItem>
                                            <FaBookmark className="mr-2 text-gray-500" /> Bookmark
                                        </DropdownMenuItem>
                                    </Link>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <Link href="Social">
                                    <DropdownMenuItem>
                                        <FaLink className="mr-2 text-gray-500" /> Socials
                                    </DropdownMenuItem>
                                </Link>
                                <Link href="/Donations">
                                    <DropdownMenuItem >
                                        <FaHandHoldingHeart className="mr-2 text-gray-500" /> Donations
                                    </DropdownMenuItem>
                                </Link>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => { signOut(auth); setIsOpen(false); }}>
                                    <MdOutlineLogout className="mr-2 text-gray-500" /> Log out
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;