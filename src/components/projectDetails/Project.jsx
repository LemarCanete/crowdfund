import React, { useContext, useEffect, useState } from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { BsCalendar, BsCoin } from "react-icons/bs";
import { Button } from '@/components/ui/button';
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from 'next/navigation';
import { CiBookmark } from "react-icons/ci";
import { IoMdBookmark } from 'react-icons/io';
import { Toggle } from '@/components/ui/toggle';
import AddAProjectDialog from '@/components/AddAProjectDialog';
import EditProjectDialog from '@/components/EditProjectDialog';
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import Share from '@/components/ShareLink';
import ReviewForm from '@/components/ReviewForm';
import Updates from '@/components/Updates';
import AboutTheAuthor from '@/components/AboutTheAuthor';
import { TbCurrencyPeso } from "react-icons/tb";
import { format } from 'date-fns';
import BackerList from '@/components/BackerList';
import { collection, addDoc, doc, deleteDoc, query, where, getDocs, onSnapshot } from "firebase/firestore";
import { db } from '@/utils/firebase-config';
import { AuthContext } from '@/context/AuthContext';
import { useToast } from "@/components/ui/use-toast";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Separator } from '@/components/ui/separator';
import { ToastAction } from "@/components/ui/toast";
import Link from 'next/link';

const Project = ({ projectDetails }) => {
    const router = useRouter();
    const [isBookmark, setIsBookmark] = useState(false);
    const { currentUser } = useContext(AuthContext);
    const [tempBookmarkId, setTempBookmarkId] = useState('');
    const { toast } = useToast();
    const [randomProject, setRandomProject] = useState(null);

    useEffect(() => {
        const fetchBookmark = async () => {
            const bookmarkRef = collection(db, "bookmarks");
            const q = query(bookmarkRef, where("projectId", "==", projectDetails.uid), where("userId", "==", currentUser.uid));

            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                setIsBookmark(true);
                setTempBookmarkId(doc.id);
            });
        };

        if (projectDetails.uid && currentUser.uid) fetchBookmark();
    }, [projectDetails, currentUser.uid]);

    useEffect(() => {
        const fetchData = async () => {
            const q = query(collection(db, "projects"));
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const proj = [];
                querySnapshot.forEach((doc) => {
                    proj.push({ uid: doc.id, ...doc.data() });
                });

                // Exclude the current project from the list
                const otherProj = proj.filter(p => p.uid !== projectDetails.uid);
                
                // Select a random project from the list
                if (otherProj.length > 0) {
                    const randomIndex = Math.floor(Math.random() * otherProj.length);
                    setRandomProject(otherProj[randomIndex]);
                }
            });
        };
        fetchData();
    }, [projectDetails.uid]);

    const addBookmark = async () => {
        try {
            const docRef = await addDoc(collection(db, "bookmarks"), {
                coverPhoto: projectDetails.coverPhoto,
                description: projectDetails.description,
                projectId: projectDetails.uid,
                title: projectDetails.title,
                userId: currentUser.uid
            });

            setIsBookmark(true);
            setTempBookmarkId(docRef.id);

            toast({
                title: "Bookmarked Successfully",
                description: "Project is now added to your bookmark",
            });
        } catch (err) {
            toast({
                title: "You are currently not logged in!",
                description: "Please login first",
                action: <ToastAction altText="Please login"><Link href="/Login">Login</Link></ToastAction>,
            });
        }
    };

    const removeBookmark = async () => {
        if (tempBookmarkId === "") return;
        await deleteDoc(doc(db, "bookmarks", tempBookmarkId));
        setIsBookmark(false);
        toast({
            title: "Bookmark Removed Successfully",
            description: "Project is now removed from your bookmarks",
        });
    };

    return (
        <div className='mx-2 md:mx-0'>
            <Card className='md:mx-20 my-2 border-0 md:border'>
                <CardContent className='p-0'>
                    <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
                        {/* images */}
                        <div className="m-2">
                            <AspectRatio ratio={16 / 9}>
                                <img src={projectDetails.coverPhoto} alt="" className='rounded-lg object-cover w-full h-60 md:h-80 lg:h-full' />
                            </AspectRatio>
                            {/* <img src={projectDetails.coverPhoto} alt="" className='rounded-bl-lg '/>
                            <img src={projectDetails.coverPhoto} alt="" className=''/>
                            <img src={projectDetails.coverPhoto} alt="" className='rounded-br-lg'/> */}
                        </div>

                        {/* details */}
                        <div className="mx-2 mt-6 sm:mt-2">
                            {/* header */}
                            <div className="grid grid-cols-2">
                                <div className="flex gap-4">
                                    <Avatar>
                                        <AvatarImage src={projectDetails.user?.photoURL} alt="@shadcn" />
                                        <AvatarFallback>{projectDetails.user?.email.slice(0, 2)}</AvatarFallback>
                                    </Avatar>
                                    <div className="">
                                        <HoverCard>
                                            <HoverCardTrigger>
                                                <h1 className="text-sm font-black tracking-wider hover:underline cursor-pointer">{projectDetails.user?.displayName}</h1>
                                            </HoverCardTrigger>
                                            <HoverCardContent className='flex gap-2 items-center text-sm'>
                                                <RiVerifiedBadgeFill className='text-green-500' /> Not Verified
                                            </HoverCardContent>
                                        </HoverCard>
                                        <p className="text-sm font-light text-slate-500">{projectDetails.user?.username || projectDetails.user?.email}</p>
                                    </div>
                                </div>
                                <div className="flex justify-end items-center">
                                    <div className="cursor-pointer" onClick={() => { isBookmark ? removeBookmark() : addBookmark() }}>
                                        {isBookmark ? <IoMdBookmark className="text-2xl text-yellow-300" /> : <CiBookmark className='text-xl' />}
                                    </div>
                                    <Share />
                                </div>
                            </div>

                            {/* details */}
                            <div className="">
                                <div className="my-2">
                                    <h1 className="text-3xl font-extrabold tracking-wider leading-relaxed">{projectDetails.title}</h1>
                                    <Badge variant="outline" className='w-fit h-fit'>{projectDetails.category}</Badge>
                                    <p className="text-slate-500 text-sm tracking-wide leading-6 p-2">{projectDetails.description}</p>
                                </div>

                                <Progress value={(projectDetails.raisedAmount / projectDetails.targetAmount) * 100 || 0} />

                                {/* target, date, donate button */}
                                <div className="flex justify-between text-sm my-2 items-center">
                                    <div className="flex gap-2 items-center">
                                        <BsCoin className='text-lg' />
                                        <div className="">
                                            <p className="font-extrabold"><TbCurrencyPeso className='inline' /> {projectDetails.raisedAmount}</p>
                                            <p className="">Total Raised</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <BsCalendar className='self-center' />
                                        <p className="">{format(projectDetails.date.from.toDate(), "MMMM dd, yyyy") + ' - ' + format(projectDetails.date.to.toDate(), "MMMM dd, yyyy")}</p>
                                    </div>
                                    <Button className='' onClick={() => router.push(`/Payment/${projectDetails.uid}`)}>Donate</Button>
                                </div>

                                <p className="bg-slate-100 rounded-lg text-slate-500 text-sm tracking-wide leading-6 p-2">Note: {projectDetails.notes}</p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="grid lg:grid-cols-6 grid-cols-1 md:mx-20 mx-auto my-8">
                <Tabs defaultValue="updates" className="col-span-4 mx-auto md:mx-0">
                    <TabsList>
                        {/* <TabsTrigger value="about">About</TabsTrigger> */}
                        <TabsTrigger value="updates">Updates</TabsTrigger>
                        <TabsTrigger value="backerList">Backer List</TabsTrigger>
                        <TabsTrigger value="reviews">Reviews</TabsTrigger>
                        <TabsTrigger value="aboutTheAuthor">Author bio</TabsTrigger>
                    </TabsList>
                    {/* <TabsContent value="about">
                        <h1 className="text-xl">About</h1>
                        <p className="">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eos repellat, fugiat harum eius sapiente nobis voluptate corrupti obcaecati itaque architecto fuga adipisci esse sint assumenda temporibus reprehenderit tempora unde amet?</p>
                    </TabsContent> */}
                    <TabsContent value="updates"><Updates projectDetails={projectDetails} /></TabsContent>
                    <TabsContent value="backerList"><BackerList projectDetails={projectDetails} /></TabsContent>
                    <TabsContent value="reviews"><ReviewForm projectDetails={projectDetails} projectId={projectDetails.uid}/></TabsContent>
                    <TabsContent value="aboutTheAuthor"><AboutTheAuthor projectDetails={projectDetails} /></TabsContent>
                </Tabs>
                <div className="lg:col-span-2">
                    <Separator className='md:hidden mt-16 w-5/6 mx-auto'/>
                    <h3 className="font-bold tracking-wider my-4 lg:my-0">Support other projects</h3>

                    {randomProject && (
                        <Card key={randomProject.uid} className='my-2'>
                            <CardHeader className='pb-2'>
                                <CardTitle className='text-xl font-bold'>{randomProject.title}</CardTitle>
                                <CardDescription className='tmt-2'>{randomProject.description}</CardDescription>
                            </CardHeader>
                            <CardContent className='py-2'>
                                <AspectRatio ratio={16 / 9}>
                                <img src={randomProject.coverPhoto} alt="" className='rounded-lg object-cover w-full h-48' />   
                                </AspectRatio>
                                <Progress value={(randomProject.raisedAmount / randomProject.targetAmount) * 100 || 0} className="w-full mt-2" />
                                <div className='flex justify-between mt-2'>
                                    <p className='basis-1/2'>Raised: {randomProject.raisedAmount} php</p>
                                    <p className='basis-1/2'>Goal: {Number(randomProject.targetAmount).toLocaleString()} php</p>
                                </div>
                                <Button className='mt-4' onClick={() => router.push(`/Projects/${randomProject.uid}`)}>More Details</Button>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
};
export default Project;
