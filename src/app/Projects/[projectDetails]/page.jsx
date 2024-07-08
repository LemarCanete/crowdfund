'use client'
import React, {useEffect, useState} from 'react'
import { doc, getDoc } from "firebase/firestore";
import { db } from '@/utils/firebase-config';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { BsCalendar, BsCoin } from "react-icons/bs";
import { Button } from '@/components/ui/button';
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {useRouter} from 'next/navigation'
import { CiBookmark, CiFlag1, CiHeart, CiShare2 } from "react-icons/ci";
import { Toggle } from '@/components/ui/toggle';

const page = ({params}) => {
    const id = params.projectDetails;
    const [projectDetails, setProjectDetails] = useState({})
    const router = useRouter();

    useEffect(()=>{
        const fetchData = async() =>{
            const docRef = doc(db, "projects", id);
            const docSnap = await getDoc(docRef);

            setProjectDetails(docSnap.data());
        }

        fetchData()
    }, [])

    return (
        <div className=''>
            <Card className='mx-20 my-2 '>
                <CardContent className='p-0'>
                    <div className="grid grid-cols-2 gap-4">
                        {/* images */}
                        <div className="m-2 grid grid-cols-3 gap-2">
                            <img src={projectDetails.coverPhoto} alt="" className='rounded-t-lg col-span-3'/>
                            <img src={projectDetails.coverPhoto} alt="" className='rounded-bl-lg '/>
                            <img src={projectDetails.coverPhoto} alt="" className=''/>
                            <img src={projectDetails.coverPhoto} alt="" className='rounded-br-lg'/>
                        </div>

                        {/* details */}
                        <div className="m-2">
                            {/* header */}
                            <div className="grid grid-cols-2">
                                <div className="flex gap-4">
                                    <Avatar>
                                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                    <div className="">
                                        <h1 className="text-sm">Name</h1>
                                        <p className="text-sm">username</p>
                                    </div>
                                </div>
                                <div className="flex justify-end">
                                    <Toggle><CiBookmark className='text-xl'/></Toggle>
                                    <Toggle><CiHeart className='text-xl'/></Toggle>
                                    <Toggle><CiShare2 className='text-xl'/></Toggle>
                                    <Toggle><CiFlag1 className='text-xl'/></Toggle>
                                </div>
                            </div>

                            {/* details */}
                            <div className="grid grid-rows-5">
                                <h1 className="text-2xl font-extrabold tracking-wide">{projectDetails.title}</h1>
                                <Badge variant="" className='w-fit h-fit'>{projectDetails.category}</Badge>
                                <p className="text-gray-500 ">{projectDetails.description}</p>

                                <Progress value={projectDetails.raisedAmount/projectDetails.targetAmount || 33} />

                                {/* target, date, donate button */}
                                <div className="flex justify-between text-sm mb-2 mt-0">
                                    <div className="flex gap-2">
                                        <BsCoin/>
                                        <div className="">
                                            <p className="font-extrabold">$ {projectDetails.raisedAmount}</p>
                                            <p className="">Total Raised</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <BsCalendar className='self-center'/>
                                        <p className="">July 4 - July 8</p>
                                    </div>
                                    <Button className='' onClick={()=> router.push('/Payment')}>Donate</Button>
                                </div>

                                <p className="bg-slate-100 rounded-lg h-20">{projectDetails.notes}</p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
            
            <div className="grid grid-cols-6 mx-20 my-8">
                <Tabs defaultValue="about" className="col-span-4">
                    <TabsList>
                        <TabsTrigger value="about">About</TabsTrigger>
                        <TabsTrigger value="updates">Updates</TabsTrigger>
                        <TabsTrigger value="backerList">Backer List</TabsTrigger>
                        <TabsTrigger value="reviews">Reviews</TabsTrigger>
                    </TabsList>
                    <TabsContent value="about">
                        <h1 className="text-xl">About</h1>
                        <p className="">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eos repellat, fugiat harum eius sapiente nobis voluptate corrupti obcaecati itaque architecto fuga adipisci esse sint assumenda temporibus reprehenderit tempora unde amet?</p>
                    </TabsContent>
                    <TabsContent value="updates">Updates</TabsContent>
                    <TabsContent value="backerList">Backer list</TabsContent>
                    <TabsContent value="reviews">Add a review</TabsContent>
                </Tabs>
                <div className="col-span-2">
                    <h3 className="font-bold tracking-wider">Support other projects</h3>

                    <div className="bg-white p-4 rounded shadow-md">
                        <img src="/Project1.jpg" alt="Project 1" className="w-full h-48 object-cover rounded mb-4"/>
                        <h3 className="text-xl font-bold">Typhoon Bopha Relief Fund</h3>
                        <p className="mt-2">Typhoon Bopha devastated communities in the Philippines, leaving many without homes and basic necessities. 
                            Your contribution will provide essential relief and help rebuild lives.</p>
                            <Progress value={35} className="w-[85%] mt-4" />
                            <div className="flex flex-row">
                            <p className="basis-1/2">Raised:70,000 php</p>
                            <p className="basis-1/2">Goal:200,000 php</p>
                            </div>
                        <Button className="mt-4">More Details</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page