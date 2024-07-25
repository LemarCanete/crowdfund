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

    if(pathname === '/') return false

    return (
        <nav className='flex justify-between p-5'>
            <Link href="/" className=""><Image src="/logov5.png" alt="logo" width={155} height={155} priority/></Link>

            <div className="flex gap-10 items-center">
            <Link className={pathname === '/HomePage' ? 'text-blue-500' : ''} href='/HomePage'>Home</Link>
            <Link className={pathname === '/Projects' ? 'text-blue-500' : ''} href='/Projects'>Projects</Link>
            <Link className={pathname === '/Contact' ? 'text-blue-500' : ''} href='/Contact'>Contact Us</Link>
            <Link className={pathname === '/About' ? 'text-blue-500' : ''} href='/About'>About</Link>
                {!currentUser.uid && <div className="gap-2 flex">
                    <Button variant="link" onClick={()=> router.push('/Login')}>Login</Button>
                    <Button variant="" onClick={()=> router.push('/SignUp')}>Sign up</Button>
                </div>}
              

                {currentUser.uid && <div className=''>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild className='cursor-pointer'>
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
                                    <FaRegUser className="me-2 text-gray-500"/> Profile
                                </DropdownMenuItem>
                            </Link>
                            <Link href="/Settings">
                                <DropdownMenuItem>
                                    <GoGear className="me-2 text-gray-500"/> Settings
                                </DropdownMenuItem>
                            </Link>
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                                <Link href="/MyProjects">
                                    <DropdownMenuItem>
                                        <GoProject className="me-2 text-gray-500" /> My Projects
                                    </DropdownMenuItem>
                                </Link>
                                <Link href="Bookmark">
                                    <DropdownMenuItem >
                                        <FaBookmark className="me-2 text-gray-500" /> Bookmark
                                    </DropdownMenuItem>
                                </Link>
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator />
                            <Link href="Social">
                                <DropdownMenuItem >
                                    <FaLink className="me-2 text-gray-500" /> Socials
                                </DropdownMenuItem>
                            </Link>
                            
                            <Link href="/Donations">
                                <DropdownMenuItem >
                                    <FaHandHoldingHeart className="me-2 text-gray-500"/> Donations
                                </DropdownMenuItem>
                            </Link>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={()=>signOut(auth)}>
                                <MdOutlineLogout className="me-2 text-gray-500"/> Log out
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                        </DropdownMenu>
                </div>}

            </div>

            

            
        </nav>
    )
}



export default Navbar