'use client'
import {React, useState, useEffect, useContext} from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import AddAProjectDialog from "@/components/AddAProjectDialog"
import { collection, query, where, onSnapshot, getDocs } from "firebase/firestore";
import { auth, db } from "@/utils/firebase-config"
import { AuthContext } from '@/context/AuthContext'

import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Label } from "@/components/ui/label"


export default function Projects() {
    const router = useRouter();
    const [projects, setProjects] = useState([]);
    const [filteredProjects, setFilteredProjects] = useState([]);
    const [search, setSearch] = useState("");
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const {currentUser} = useContext(AuthContext)

    useEffect(()=>{
        !currentUser.uid && !currentUser && router.push('/')
    }, [currentUser])

    useEffect(()=>{
        const fetchData = async() =>{
            // get categories
            const qCategories = query(collection(db, "categories"));

            const querySnapshot = await getDocs(qCategories);
            const categoryList = [];
            querySnapshot.forEach((doc) => {
                categoryList.push({uid: doc.id, ...doc.data()});
            });
            setCategories(categoryList)

            // get projects
            const q = query(collection(db, "projects"), where("author", "==", currentUser.uid));
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const proj = [];
                querySnapshot.forEach((doc) => {
                    proj.push({uid: doc.id, ...doc.data()});
                });
                setProjects(proj)
            });
        }

        currentUser.uid && fetchData();
    }, [currentUser])

    useEffect(()=>{

        const filter = () =>{
            if(selectedCategory === "All" && search === ""){
                setFilteredProjects(projects)
            } else if(selectedCategory !== "All" && search === ""){
                const filteredProjectList = projects.filter(proj => proj.category === selectedCategory) 
                setFilteredProjects(filteredProjectList)
            }
            else if(search !== "" && selectedCategory === "All"){
                console.log(search)
                const filteredProjectList = projects.filter(proj => proj.title.toLowerCase().includes(search.toLowerCase())) 
                console.log(filteredProjectList)
                setFilteredProjects(filteredProjectList)
            }
            else{
                const filteredProjectList = projects.filter(proj => proj.category === selectedCategory && proj.title.toLowerCase().includes(search.toLowerCase())) 
                setFilteredProjects(filteredProjectList)
            }
        }

        filter()

    }, [selectedCategory, projects, search])

    return (
        <main className="container mx-auto p-4">
            <header className="flex flex-col items-center mt-4">
                <h1 className="text-3xl font-bold tracking-wider">My Projects</h1>
            </header>
            <div className="md:flex justify-between items-center mt-16 mb-8">
                <Input type="text" 
                    id="search"
                    className="w-full md:w-96 p-2 border  "
                    placeholder="Search"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
                <div className="md:flex gap-4 items-center justify-end my-2 md:my-0">
                    <Select onValueChange={(val) =>
                        {
                            setSelectedCategory(val) 
                        }}>
                        <SelectTrigger className="md:w-[180px] w-full my-2 md:0">
                            <SelectValue placeholder="All" defaultValue="All"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Categories</SelectLabel>
                                <SelectItem value="All">All</SelectItem>
                                {categories.length > 0 && categories.map((category, key) => 
                                    <SelectItem key={key} value={category.label}>{category.label}</SelectItem>)}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    {currentUser.uid && <AddAProjectDialog />}
                </div>
            </div>
            <section className="mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredProjects.sort((a, b) => b.createdAt - a.createdAt).map((proj, key) => {
                        return (
                            <div className="bg-white p-4 rounded shadow-md h-[500] md:h-[450px] flex flex-col justify-between" key={key}>
                                <div className="">
                                    <img src={proj.coverPhoto} alt="Project 1" className="w-full h-48 object-cover rounded mb-4"/>
                                    <h3 className="text-xl font-bold text-wrap">{proj.title}</h3>
                                    <Badge variant="outline" className='w-fit h-fit'>{proj.category}</Badge>
                                    <p className="mt-2 text-wrap">{proj.description.slice(0, 90)}{proj.description.length > 90 && '...' }</p>
                                </div>
                                <div className="">
                                    <div className="flex gap-4 items-end ">
                                        <Progress value={(proj.raisedAmount/proj.targetAmount)*100} className=" mt-4" /> 
                                        <p className="text-sm">{((proj.raisedAmount/proj.targetAmount)*100).toString().slice(0, 5)}%</p>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <p className="">{proj.raisedAmount} php</p>
                                        <p className="">Goal: {Number(proj.targetAmount).toLocaleString()} php</p>
                                    </div>
                                    <Button variant="secondary" className="mt-4 w-full" onClick={()=>router.push(`Projects/${proj.uid}`)}>More Details</Button>
                                </div>
                            </div>
                        )
                    })}


                </div>
                {filteredProjects.length < 1 && <p className='text-slate-200 italic text-center text-3xl'>No projects created</p>}
            </section>
        </main>
    )
}



