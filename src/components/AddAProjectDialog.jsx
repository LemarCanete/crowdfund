'use client'
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogDescription, DialogTitle, DialogClose} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useEffect, useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import { Textarea } from '@/components/ui/textarea'
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
  } from "@/components/ui/command"
  import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"
import { cn } from "@/lib/utils"
import { CalendarIcon } from "@radix-ui/react-icons"
import { addDays, format } from "date-fns"
import { DateRange } from "react-day-picker"
import { useToast } from "@/components/ui/use-toast"
import { Calendar } from "@/components/ui/calendar"

// firebase
import { db, storage, auth } from '@/utils/firebase-config'
import {collection, query, where, getDocs, addDoc, Timestamp} from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { onAuthStateChanged } from 'firebase/auth'



const AddAProjectDialog = ({className}) => {
    const { toast } = useToast()
    const [categories, setCategories] = useState([]);

    const [open, setOpen] = React.useState(false)

    const [author, setAuthor] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [notes, setNotes] = useState("");
    const [category, setCategory] = useState("");
    const [targetAmount, setTargetAmount] = useState(0);
    const [raisedAmount, setRaisedAmount] = useState(0);
    const [status, setStatus] = useState("Preparation");
    const [coverPhoto, setCoverPhoto] = useState();
    useEffect(()=>{
        // get categories api
        const fetchData = async() =>{
            const q = query(collection(db, "categories"));
            const querySnapshot = await getDocs(q);
            
            const arr = [];
            querySnapshot.forEach((doc) => {
                arr.push(doc.data())
            });

            setCategories(prev => arr)
        }
        fetchData();
    }, [])

    // get user
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthor(user);
            } else {
                setAuthor(null);
            }
        });
        return () => unsubscribe();
    }, [])

    // add project
    const addProject = async() =>{
        try{
            const file = await handleUpload();
            const docRef = await addDoc(collection(db, "projects"), {
                title: title,
                description: description,
                category: category,
                date: date,
                targetAmount: targetAmount,
                raisedAmount: raisedAmount,
                notes: notes,
                status: status,
                createdAt: Timestamp.now(),
                updatedAt: Timestamp.now(),
                coverPhoto: file,
                author: author.uid
                });
            toast({
                title: "Success",
                description: `Successfully added ${title} in projects`
                })
        }catch(err){
            console.log(err)
        }
    }

    const [date, setDate] = useState({
        from: new Date(2022, 0, 20),
        to: addDays(new Date(2022, 0, 20), 20),
    })

    const handleUpload = async () => {
        if (coverPhoto) {
            const storageRef = ref(storage, `projectCoverPhotos/${coverPhoto.name}`);
            try {
                const snapshot = await uploadBytes(storageRef, coverPhoto);
                console.log('Uploaded a blob or file!', snapshot);
                const url = await getDownloadURL(storageRef);
                console.log(url)
                return url;
            } catch (error) {
                console.error('Error uploading file:', error);
            }
        }
        return null;
    };

    console.log(author)

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="mt-4"><FaPlus className="me-2"/> Add a Project</Button>
            </DialogTrigger>
            <DialogContent className="min-w-[1000]">
                <DialogHeader>
                <DialogTitle>Add a Project</DialogTitle>
                <DialogDescription>
                    Fill out the form to add a Project. Then click submit
                </DialogDescription>
                </DialogHeader>
                    <div className="grid gap-4 py-4">
                        {/* title */}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="title" className="text-right">
                            Title
                            </Label>
                            <Input id="title" value={title} className="col-span-3" onChange={e => setTitle(e.target.value)}/>
                        </div>
                        {/* description */}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="description" className="text-right">
                            Description
                            </Label>
                            <Textarea id="description" value={description} className="col-span-3" onChange={e => setDescription(e.target.value)}/>
                        </div>
                        
                        {/* Category */}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Popover open={open} onOpenChange={setOpen}>
                                <Label htmlFor="category" className="text-right">Category</Label>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        role="combobox"
                                        aria-expanded={open}
                                        className="w-[340px] justify-between"
                                        >
                                        {category
                                            ? categories.find((val) => val.label === category)?.label
                                            : "Select a Category..."}
                                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-[340px] p-0">
                                    
                                    <Command>
                                        <CommandInput placeholder="Search Category..." className="h-9" />
                                        <CommandList>
                                            <CommandEmpty>No Category found.</CommandEmpty>
                                            <CommandGroup>
                                            {categories.map((category) => (
                                                <CommandItem
                                                    key={category.label}
                                                    value={category.label}
                                                    onSelect={(currentValue) => {
                                                        setCategory(currentValue === category ? "" : currentValue)
                                                        setOpen(false)
                                                    }}
                                                    >
                                                    {category.label}
                                                <CheckIcon
                                                    className={cn(
                                                    "ml-auto h-4 w-4",
                                                    category === category.label ? "opacity-100" : "opacity-0"
                                                    )}
                                                />
                                                </CommandItem>
                                            ))}
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                        </div>

                        {/* date */}
                        <div className={cn("grid grid-cols-4 items-center gap-4 gap-4", className)}>
                            <Label htmlFor="title" className="text-right">
                            Date
                            </Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        id="date"
                                        variant={"outline"}
                                        className={cn(
                                        "w-[340px] justify-start text-left font-normal",
                                        !date && "text-muted-foreground"
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {date?.from ? (
                                        date.to ? (
                                            <>
                                            {format(date.from, "LLL dd, y")} -{" "}
                                            {format(date.to, "LLL dd, y")}
                                            </>
                                        ) : (
                                            format(date.from, "LLL dd, y")
                                        )
                                        ) : (
                                        <span>Pick a date</span>
                                        )}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    initialFocus
                                    mode="range"
                                    defaultMonth={date?.from}
                                    selected={date}
                                    onSelect={setDate}
                                    numberOfMonths={2}
                                />
                                </PopoverContent>
                            </Popover>
                        </div>

                        {/* target Amount */}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="targetAmount" className="text-right">
                            Target Amount
                            </Label>
                            <Input id="targetAmount" type='number' value={targetAmount} className="col-span-3" onChange={e => setTargetAmount(e.target.value)}/>
                        </div>

                        {/* notes */}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="notes" className="text-right">
                            Notes
                            </Label>
                            <Textarea id="notes" value={notes} className="col-span-3" onChange={e => setNotes(e.target.value)}/>
                        </div>

                        {/* Cover Photo */}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="coverPhoto" className="text-right">
                            Cover Photo
                            </Label>
                            <Input id="coverPhoto" type='file' className="col-span-3" onChange={e => setCoverPhoto(e.target.files[0])}/>
                        </div>
                    </div>
                <DialogFooter>
                    <DialogClose asChild><Button type="submit" onClick={addProject}>Add Project</Button></DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default AddAProjectDialog