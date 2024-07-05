'use client'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
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


const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter();
    const [user, setUser] = useState();

    useEffect(()=>{
        onAuthStateChanged(auth, (u) => {
            if (u) {
              setIsLoggedIn(true)
              setUser(u)
            } else {
              setIsLoggedIn(false)
            }
          });
          
    }, [])
    return (
        <nav className='flex justify-between p-5'>
            <Link href="/" className="text-2xl">LOGO</Link>

            <div className="flex gap-10 items-center">
                <Link className="" href='/'>Home</Link>
                <Link className="" href='/Projects'>Projects</Link>
                <Link className="" href='/Contact'>Contact Us</Link>
                <Link className="" href='/About'>About</Link>
                {!isLoggedIn && <div className="gap-2 flex">
                    <Button variant="link" onClick={()=> router.push('/Login')}>Login</Button>
                    <Button variant="" onClick={()=> router.push('/SignUp')}>Sign up</Button>
                </div>}
              

                {isLoggedIn && <div className=''>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild className='cursor-pointer'>
                            <Avatar>
                                <AvatarImage src={`${user.photoURL ? user.photoURL : 'https://github.com/shadcn.png'}`} alt="@shadcn" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <FaRegUser className="me-2 text-gray-500"/> Profile
                                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <MdWallet className="me-2 text-gray-500"/> Payment
                                <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={()=>router.push('/Settings')}>
                                <GoGear className="me-2 text-gray-500"/> Settings
                                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                            </DropdownMenuItem>
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                            <DropdownMenuItem onClick={()=> router.push('/MyProjects')}>
                                <GoProject className="me-2 text-gray-500" /> My Projects
                            </DropdownMenuItem>
                            <DropdownMenuSub>
                                <DropdownMenuSubTrigger><FaBookmark className="me-2 text-gray-500"/> Bookmark</DropdownMenuSubTrigger>
                                <DropdownMenuPortal>
                                <DropdownMenuSubContent>
                                    <DropdownMenuItem>Projects</DropdownMenuItem>
                                    <DropdownMenuItem>Message</DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>More...</DropdownMenuItem>
                                </DropdownMenuSubContent>
                                </DropdownMenuPortal>
                            </DropdownMenuSub>
                            {/* <DropdownMenuItem>
                                <FaPlus className="me-2 text-gray-500"/> Add a Project
                                <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
                            </DropdownMenuItem> */}
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem><FaLink className="me-2 text-gray-500"/> Socials</DropdownMenuItem>
                            <DropdownMenuItem><FaHandHoldingHeart className="me-2 text-gray-500"/> Donations</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={()=>signOut(auth)}>
                                <MdOutlineLogout className="me-2 text-gray-500"/> Log out
                            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                        </DropdownMenu>
                </div>}

            </div>

            

            
        </nav>
    )
}



export default Navbar