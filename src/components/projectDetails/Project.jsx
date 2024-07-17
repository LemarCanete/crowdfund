import React from 'react'

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
import { BsCalendar, BsCoin, BsPen, BsPencil } from "react-icons/bs";
import { Button } from '@/components/ui/button';
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {useRouter} from 'next/navigation'
import { CiBookmark, CiEdit, CiFlag1, CiHeart, CiPen, CiSettings, CiShare2 } from "react-icons/ci";
import { Toggle } from '@/components/ui/toggle';
import AddAProjectDialog from '@/components/AddAProjectDialog';
import EditProjectDialog from '@/components/EditProjectDialog'
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
  } from "@/components/ui/hover-card"
import { RiSettings4Line, RiSettingsLine, RiVerifiedBadgeFill } from "react-icons/ri";
import Share from '@/components/ShareLink'
import ReviewForm from '@/components/ReviewForm'
import Updates from '@/components/Updates'
import { TbCurrencyPeso } from "react-icons/tb";
import { format } from 'date-fns';
import BackerList from '@/components/BackerList'

const Project = ({projectDetails}) => {
    const router = useRouter();

    return (
        <div>
            <Card className='lg:mx-20 md:mx-28 my-2 '>
                <CardContent className='p-0'>
                    <div className="grid lg:grid-cols-2 md:grid-cols-1 gap-4">
                        {/* images */}
                        <div className="m-2 md:grid lg:grid-cols-3 md:grid-cols-2 gap-2">
                            <img src={projectDetails.coverPhoto} alt="" className='rounded-t-lg col-span-3'/>
                            <img src={projectDetails.coverPhoto} alt="" className='rounded-bl-lg '/>
                            <img src={projectDetails.coverPhoto} alt="" className=''/>
                            <img src={projectDetails.coverPhoto} alt="" className='rounded-br-lg'/>
                        </div>

                        {/* details */}
                        <div className="m-2">
                            {/* header */}
                            <div className="grid lg:grid-cols-2 md:grid-cols-1">
                                <div className="flex gap-4">
                                    <Avatar>
                                        <AvatarImage src={projectDetails.user?.photoURL} alt="@shadcn" />
                                        <AvatarFallback>{projectDetails.user?.displayName.slice(0, 2)}</AvatarFallback>
                                    </Avatar>
                                    <div className="">
                                        <HoverCard>
                                            <HoverCardTrigger>
                                                <h1 className="text-sm font-black tracking-wider hover:underline cursor-pointer">{projectDetails.user?.displayName}</h1>
                                            </HoverCardTrigger>
                                            <HoverCardContent className='flex gap-2 items-center text-sm'>
                                                <RiVerifiedBadgeFill className='text-green-500'/> Verified

                                            </HoverCardContent>
                                        </HoverCard>

                                        <p className="text-sm font-light text-slate-500">{projectDetails.user?.username || projectDetails.user?.email}</p>
                                    </div>
                                </div>
                                <div className="flex justify-end">
                                    {/* {currentUser.uid && projectDetails.title && <EditProjectDialog projectDetails={projectDetails}/>} */}
                                    <Toggle><CiBookmark className='text-xl'/></Toggle>
                                    <Toggle><CiHeart className='text-xl'/></Toggle>
                                    <Share />
                                    {/* <Toggle><CiFlag1 className='text-xl'/></Toggle> */}
                                </div>
                            </div>

                            {/* details */}
                            <div className="">
                                <div className="my-2">
                                    <h1 className="text-3xl font-extrabold tracking-wider leading-relaxed">{projectDetails.title}</h1>
                                    <Badge variant="" className='w-fit h-fit'>{projectDetails.category}</Badge>
                                    <p className="text-slate-500 text-sm tracking-wide leading-6 p-2">{projectDetails.description}</p>
                                </div>

                                <Progress value={(projectDetails.raisedAmount/projectDetails.targetAmount) * 100 || 0} />

                                {/* target, date, donate button */}
                                <div className="flex justify-between text-sm my-2 items-center">
                                    <div className="flex gap-2">
                                        <BsCoin/>
                                        <div className="">
                                            <p className="font-extrabold"><TbCurrencyPeso className='inline'/> {projectDetails.raisedAmount}</p>
                                            <p className="">Total Raised</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <BsCalendar className='self-center'/>
                                        <p className="">{format(projectDetails.date.from.toDate(), "MMMM dd, yyyy") + ' - ' + format(projectDetails.date.to.toDate(), "MMMM dd, yyyy")}</p>
                                    </div>
                                    <Button className='' onClick={()=> router.push(`/Payment/${projectDetails.uid}`)}>Donate</Button>
                                </div>

                                <p className="bg-slate-100 rounded-lg text-slate-500 text-sm tracking-wide leading-6 p-2">Note: {projectDetails.notes}</p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
            
            <div className="grid lg:grid-cols-6 grid-cols-1 lg:mx-20 mx-auto my-8">
                <Tabs defaultValue="updates" className="col-span-4">
                    <TabsList>
                        {/* <TabsTrigger value="about">About</TabsTrigger> */}
                        <TabsTrigger value="updates">Updates</TabsTrigger>
                        <TabsTrigger value="backerList">Backer List</TabsTrigger>
                        <TabsTrigger value="reviews">Reviews</TabsTrigger>
                    </TabsList>
                    {/* <TabsContent value="about">
                        <h1 className="text-xl">About</h1>
                        <p className="">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eos repellat, fugiat harum eius sapiente nobis voluptate corrupti obcaecati itaque architecto fuga adipisci esse sint assumenda temporibus reprehenderit tempora unde amet?</p>
                    </TabsContent> */}
                    <TabsContent value="updates"><Updates projectDetails={projectDetails}/></TabsContent>
                    <TabsContent value="backerList"><BackerList projectDetails={projectDetails}/></TabsContent>
                    <TabsContent value="reviews"><ReviewForm projectId={projectDetails.uid} /></TabsContent>
                </Tabs>
                <div className="lg:col-span-2">
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

export default Project