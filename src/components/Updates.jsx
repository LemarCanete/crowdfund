import React, { useContext, useEffect, useState } from 'react'
import {Button} from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FaPlus } from 'react-icons/fa'
import { Textarea } from '@/components/ui/textarea'
import { collection, addDoc, Timestamp, doc, onSnapshot, where, query } from "firebase/firestore"; 
import { db, storage } from '@/utils/firebase-config'
import { AuthContext } from '@/context/AuthContext'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { formatDistanceToNow } from "date-fns";
import { CiEdit, CiTrash } from 'react-icons/ci'
import { getDownloadURL, ref, uploadBytes, getStorage, deleteObject } from 'firebase/storage'
import { BsThreeDotsVertical } from 'react-icons/bs'
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
import { IoClose } from 'react-icons/io5'
import { GoImage, GoPaperclip } from 'react-icons/go'
import { Separator } from '@/components/ui/separator'
import { deleteDoc } from "firebase/firestore";
import { useToast } from "@/components/ui/use-toast"

const Updates = ({projectDetails}) => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [images, setImages] = useState([]);
    const [files, setFiles] = useState([]);
    const {currentUser} = useContext(AuthContext);
    const [updates, setUpdates] = useState([]);
    const { toast } = useToast()

    useEffect(()=>{
        const fetchData = async () =>{
            const q = query(collection(db, "updates"), where("projectId", "==", projectDetails.uid));
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const updateArr = [];
            querySnapshot.forEach((doc) => {
                updateArr.push({uid: doc.id, ...doc.data()});
            });
                setUpdates(updateArr.sort((a, b) => b.createdAt - a.createdAt))
            });
        }

        fetchData()
    }, [projectDetails])

    const displayImagesName = () => {
        return images.map((file, index) => {
            if (file instanceof File) {
                return <div className="flex gap-2" key={index}>
                    <p key={index} className='block'>{file.name}</p>
                    <span onClick={() => setImages(prev => prev.filter(img => img.name !== file.name))}><IoClose /></span>
                </div>
            }
            return null;
        });
    };

    const displayFilesName = () => {
        return files.map((file, index) => {
            if (file instanceof File) {
                return <div className="flex gap-2" key={index}>
                    <p key={index} className='block'>{file.name}</p>
                    <span onClick={() => setFiles(prev => prev.filter(val => val.name !== file.name))}><IoClose /></span>
                </div>
            }
            return null;
        });
    };

    const handleUploadFiles = async () => {
        try {
            const imageArr = [];
            const fileArr = [];
            for (const file of images) {
                if (file instanceof File) {  
                    console.log(file);
                    const storageRef = ref(storage, `projectUpdates/${file.name}`);
                    const snapshot = await uploadBytes(storageRef, file);
                    console.log('Uploaded a blob or file!', snapshot);
                    const url = await getDownloadURL(storageRef);
                    imageArr.push({url: url, filename: file.name});
                }
            }

            for (const file of files) {
                if (file instanceof File) {  
                    console.log(file);
                    const storageRef = ref(storage, `projectUpdates/${file.name}`);
                    const snapshot = await uploadBytes(storageRef, file);
                    console.log('Uploaded a blob or file!', snapshot);
                    const url = await getDownloadURL(storageRef);
                    fileArr.push({url: url, filename: file.name});
                }
            }

            return {imageArr: imageArr, fileArr: fileArr};
        } catch (error) {
            console.error('Error uploading file:', error);
        }
        return null;
    };

    const addUpdate = async() =>{
        try{

            const filesAndImages = await handleUploadFiles();
            // add update to firebase
            const docRef = await addDoc(collection(db, "updates"), {
                projectId: projectDetails.uid,
                title: title,
                description: description,
                images: filesAndImages.imageArr,
                files: filesAndImages.fileArr,
                createdAt: Timestamp.now(),
                updatedAt: Timestamp.now(),
            });
            
            toast({
                title: `Update Successful`,
                description: "Successfully added  ${title} as update",
              })

            setImages([]);
            setTitle("");
            setDescription("");
            setFiles([])
        }catch(err){
            toast({
                title: "Uh oh! Something went wrong.",
                description: "There was a problem adding an update. Pls try again",
              })
        }
    }

    const deleteUpdate = async(id, files, images) =>{
        try{
            console.log(id, files, images)
            const storage = getStorage();

            if(files){
                files.map(file => {
                    const desertRef = ref(storage, `projectUpdates/${file.filename}`);
                    // Delete the file
                    deleteObject(desertRef).then(() => {
                        alert("Deleted Successfully!")
                        }).catch((error) => {
                            alert(error.message)
                        });
                    })
            }
                

            if(images){
                images.map(img => {
                    const desertRef = ref(storage, `projectUpdates/${img.filename}`);
                    // Delete the file
                    deleteObject(desertRef).then(() => {
                        alert("Deleted Successfully!")
                        }).catch((error) => {
                            alert(error.message)
                        });
                })
            }
            await deleteDoc(doc(db, "updates", id));

            toast({
                title: `Successfully deleted update`,
                description: "There was a problem with your request.",
              })
        }catch(err){
            toast({
                title: "Uh oh! Something went wrong.",
                description: "There was a problem adding an update. Pls try again",
            })
            console.log(err.message)
        }
    }

    return (
        <div>
            <div className="flex justify-between w-11/12 items-center mb-2 mt-6">
                <h1 className="font-bold">Updates</h1>
                <Dialog>
                    {currentUser.uid === projectDetails?.user.uid && <DialogTrigger asChild>
                        <Button variant="ghost"> <FaPlus />  Add an Update</Button>
                    </DialogTrigger>}
                    <DialogContent className="sm:max-w-[600px]">
                        <DialogHeader>
                        <DialogTitle>Add Update</DialogTitle>
                        <DialogDescription>
                            Make changes to add update here. Click save when you&apos;re done.
                        </DialogDescription>
                        </DialogHeader>
                        <div className="">
                            <Label htmlFor='title'>Title</Label>
                            <Input id='title' value={title} onChange={e => setTitle(e.target.value)} className='mb-2' />
                            <Label htmlFor='description'>Description</Label>
                            <Textarea placeholder='Add text here..' className='mb-4' id='description' value={description} onChange={e => setDescription(e.target.value)}/>
                            {displayImagesName()}
                            {displayFilesName()}
                            <Separator />
                            <div className="flex gap-2 my-2">
                                <Label htmlFor='updateImage'><GoImage className='text-2xl'/></Label>
                                <Label htmlFor='updateFiles'><GoPaperclip className='text-2xl'/></Label>
                            </div>
                            <Input type="file" className='hidden' multiple id='updateImage' onChange={e => setImages(Array.from(e.target.files))} accept='image/*'/>
                            <Input type="file" className='hidden' multiple id='updateFiles' onChange={e => setFiles(Array.from(e.target.files))} accept='application/*'/>
                        </div>
                        <DialogFooter>
                        <Button type="submit" onClick={addUpdate}>Save</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="text-wrap flex flex-col gap-2">
                {updates.map((update, key)=>{
                    return (
                        <Card className="w-11/12 rounded-sm" key={key}>
                            <CardHeader className=''>
                                <CardTitle className='flex justify-between'>
                                    <div className="flex flex-col">
                                        <p className="">{update.title}</p>
                                        <p className="text-gray-500 text-xs">
                                            {update.createdAt instanceof Date ?
                                                formatDistanceToNow(update.createdAt, { addSuffix: true }) :
                                                formatDistanceToNow(update.createdAt.toDate(), { addSuffix: true })}
                                        </p>
                                    </div>
                                    
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost"><BsThreeDotsVertical /></Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="w-56" align='end'>
                                            <DropdownMenuGroup>
                                                <DropdownMenuItem>
                                                    <CiEdit className='me-2'/>Edit
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => deleteUpdate(update.uid, update.files, update.images)}>
                                                    <CiTrash className='me-2' />Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuGroup>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </CardTitle>
                                <CardDescription className='break-words'>{update.description} </CardDescription>
                            </CardHeader>
                            <CardContent>
                                {update.files.length > 0 && <div className="my-2">
                                    {update.files.map((val, key) => <a className='hover:underline border p-2' key={key} href={val.url} target='_blank'>{val.filename}</a>)}
                                </div>}
                                {update.images.length > 0 && <div className={`mt-4 grid grid-cols-${Math.min(update.images.length, 3)}`}>
                                    {update.images.map((val, key) => <img src={val.url} key={key}/> )}
                                </div>}
                            </CardContent>
                            <CardFooter >
                            </CardFooter>
                        </Card>
                    )
                })}
            </div>
        </div>
    )
}

export default Updates