'use client'
import React, {useContext, useEffect, useState} from 'react'
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from '@/utils/firebase-config';
import Project from '@/components/projectDetails/Project'
import { AuthContext } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import ProjectSettings from '@/components/projectDetails/ProjectSettings'
import Analytics from '@/components/projectDetails/Analytics'
import Logs from '@/components/projectDetails/Logs'

const page = ({params}) => {
    const id = params.projectDetails;
    const [projectDetails, setProjectDetails] = useState({})
    const {currentUser} = useContext(AuthContext)
    const [tabSelected, setTabSelected] = useState(1);

    useEffect(()=>{
        const fetchData = async() =>{

            // get Project details
            const docRef = doc(db, "projects", id);
            const docSnap = await getDoc(docRef);

            // get project author details
            const usersRef = collection(db, "users");
            const q = query(usersRef, where("uid", "==", docSnap.data().author));

            const querySnapshot = await getDocs(q);
            let author;
            querySnapshot.forEach((doc) => {
                author = doc.data()
            });

            setProjectDetails({...docSnap.data(), user: author, uid: id});
        }

        fetchData()
    }, [])

    console.log(projectDetails)

    const RenderTabSelected = () =>{
        if(tabSelected === 2){
            return <Analytics projectDetails={projectDetails}/>
        }else if(tabSelected === 3){
            return <Logs projectDetails={projectDetails}/>
        }else if(tabSelected === 4){
            return <ProjectSettings projectDetails={projectDetails}/>
        }else{
            return <Project projectDetails={projectDetails} />
        }
    }

    return (
        <div className=''>
            {currentUser.uid && <div className="flex mx-20 gap-2">
                <Button className={`${tabSelected === 1 && 'underline'}`} variant="ghost" onClick={() => setTabSelected(1)}>Project</Button>
                <Button className={`${tabSelected === 2 && 'underline'}`} variant="ghost" onClick={() => setTabSelected(2)}>Analytics</Button>
                <Button className={`${tabSelected === 3 && 'underline'}`} variant="ghost" onClick={() => setTabSelected(3)}>Logs</Button>
                <Button className={`${tabSelected === 4 && 'underline'}`} variant="ghost" onClick={() => setTabSelected(4)}>Settings</Button>
            </div>}

            {projectDetails.uid && <RenderTabSelected />}
        </div>
    )
}

export default page