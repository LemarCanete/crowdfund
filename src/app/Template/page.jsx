'use client'
import { Button } from '@/components/ui/button'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/utils/firebase-config"
import { collection, addDoc } from "firebase/firestore"; 
import { onAuthStateChanged } from 'firebase/auth';

const page = () => {
    const router = useRouter();
    const [name, setName] = useState('')
    const [isEdit, setIsEdit] = useState(false)
    const [user, setUser] = useState({});

    useEffect(()=>{
        onAuthStateChanged(auth, (u) => {
            if (u) {
              setUser(u)
            } else {
              setIsLoggedIn(false)
            }
          });
          
    }, [])

    useEffect(()=> {
        const fetchData = async() =>{
            const docRef = doc(db, "projects", "1A8aUi1TRN2eHnzFfdmf");
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                console.log("Document data:", docSnap.data());
            } else {
            // docSnap.data() will be undefined in this case
                console.log("No such document!");
            }
        }

        fetchData()
    }, [])

    const addProject = async() =>{
        try{
            const docRef = await addDoc(collection(db, "projects"), {
                name: name,
                category: "uuuuu"
              });
              console.log("Document written with ID: ", docRef.id);
        }catch(err){
            console.log(err.message)
        }
    }

    

    console.log(user)

    return (
        <div>
            <Button onClick={()=>router.push('/About')}>Button</Button>
            <div>
                <input type="text" value={name} className='border' onChange={(e)=> setName(e.target.value)}/>
                <h1 className="">{user.email}</h1>
                <button onClick={addProject}>Submit</button>
            </div>
        </div>
        
    )
}

export default page