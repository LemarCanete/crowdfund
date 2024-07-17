'use client'
import {React, useState, useEffect, useContext} from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Dialog } from "@/components/ui/dialog"
import AddAProjectDialog from "@/components/AddAProjectDialog"
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { auth, db } from "@/utils/firebase-config"

import { useRouter } from "next/navigation"
import { onAuthStateChanged } from "firebase/auth"
import { isEmptyArray } from "formik"
import { AuthContext } from "@/context/AuthContext"

export default function Projects() {
    const router = useRouter();
    const [projects, setProjects] = useState([]);
    const {currentUser} = useContext(AuthContext)


    useEffect(()=>{
        const fetchData = async() =>{
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
    }, [])

    

    console.log(projects)

    return (
        <main className="container mx-auto p-4">
            <header className="flex flex-col items-center mt-4">
            <h1 className="text-4xl font-bold">CrowdFund Projects</h1>
            <Input type="text" 
            className="box-content p-2 border size-2/6 mt-4"
            placeholder="Search Projects"/>
            {/* <Button className="mt-4"> Add Your Project
                </Button> */}
            <AddAProjectDialog />
            </header>
            <section className="my-8">
                <h2 className="text-2xl font-semibold mb-4">My Projects</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {projects.map((proj, key) => {
                        return (
                            <div className="bg-white p-4 rounded shadow-md" key={key}>
                                <img src={proj.coverPhoto} alt="Project 1" className="w-full h-48 object-cover rounded mb-4"/>
                                <h3 className="text-xl font-bold">{proj.title}</h3>
                                <p className="mt-2">{proj.description}</p>
                                    <Progress value={proj.raisedAmount/proj.targetAmount} className="w-[85%] mt-4" />
                                    <div className="flex flex-row">
                                    <p className="basis-1/2">{proj.raisedAmount} php</p>
                                    <p className="basis-1/2">Goal: {Number(proj.targetAmount).toLocaleString()} php</p>
                                    </div>
                                <Button className="mt-4" onClick={()=>router.push(`Projects/${proj.uid}`)}>More Details</Button>
                            </div>
                        )
                    })}
                </div>
            </section>
            <section>

            </section>
        </main>
    )
}