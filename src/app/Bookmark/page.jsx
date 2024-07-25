"use client";
import { useContext } from 'react';
import { Button } from "@/components/ui/button";
import React, { useRef, useState, useEffect } from 'react';
import { collection, addDoc, getDocs, deleteDoc, doc, getFirestore, query, where, onSnapshot } from "firebase/firestore";
import { AuthContext } from '@/context/AuthContext';
import { auth, db } from "@/utils/firebase-config"
import { useRouter } from "next/navigation"
import { Separator } from '@/components/ui/separator';
import { FaTrash } from 'react-icons/fa';
import { useToast } from "@/components/ui/use-toast"


const Bookmarks = () => {
  
  const { currentUser } = useContext(AuthContext);
  const bookmarkedRef = useRef(null);
  const [bookmarkedProjects, setBookmarkedProjects] = useState([]);
  const [allProjects, setAllProjects] = useState([]);
    const router = useRouter();
    const { toast } = useToast()

    useEffect(() => {
        if (!currentUser.uid && !currentUser) {
            router.push('/');
        }
    }, [currentUser]);

  useEffect(() => {
    if (currentUser) {
      fetchAllProjects();
      fetchBookmarkedProjects(); 
    }
  }, [currentUser]); 

  const fetchAllProjects = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "projects"));
      const projects = [];
      querySnapshot.forEach((doc) => {
        projects.push({ id: doc.id, ...doc.data() });
      });
      setAllProjects(projects);
    } catch (error) {
      console.error("Error fetching all projects: ", error);
    }
  };

  const fetchBookmarkedProjects = async () => {
    try {
      const q = query(collection(db, "bookmarks"), where("userId", "==", currentUser.uid));
      const querySnapshot = await getDocs(q);
      const projects = [];
      querySnapshot.forEach((doc) => {
        projects.push({ id: doc.id, ...doc.data() });
      });
      setBookmarkedProjects(projects);
      console.log("Fetched bookmarked projects: ", projects);
    } catch (error) {
      console.error("Error fetching bookmarked projects: ", error);
    }
  };

  const addBookmark = async (proj) => {
    try {
        const docRef = await addDoc(collection(db, "bookmarks"), {
            title: proj.title,
            description: proj.description,
            coverPhoto: proj.coverPhoto,
            userId: currentUser.uid,
            projectId: proj.id,
        });
        console.log("Document written with ID: ", docRef.id); 
        toast({
            title: "Successfully added to bookmarks",
            description: `Project ${proj.title} has been added to bookmarks`,
        })
        fetchBookmarkedProjects(); 
        if (bookmarkedRef.current) {
            bookmarkedRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    } catch (e) {
        console.error("Error adding document: ", e);
        toast({
            title: "Uh oh! Something went wrong.",
            description: "There was a problem with adding a project to bookmarks. Pls try again",
          })
    }
  };


  const handleRemoveBookmark = async (projectId) => {
    try {
        await deleteDoc(doc(db, "bookmarks", projectId));
        fetchBookmarkedProjects(); 
        toast({
            title: "Successfully removed from bookmarks",
            description: `Project has been removed from bookmarks`,
        })
    } catch (error) {
        console.error("Error removing bookmark: ", error);
        toast({
            title: "Uh oh! Something went wrong.",
            description: "There was a problem with removing a project from bookmarks. Pls try again",
          })
    }
  };

  const filteredProjects = allProjects.filter(project => !bookmarkedProjects.find(bm => bm.title === project.title));

  return (
    <main className='container mx-auto p-4'>
        <header className="text-center my-8" ref={bookmarkedRef}>
            <h1 className="text-2xl font-bold">Bookmarked Projects</h1>
        </header>

        {/* Bookmarked Projects */}
        <section className="my-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {bookmarkedProjects.map((project) => (
            <div key={project.id} className="bg-white p-4 rounded shadow-md h-96 flex flex-col justify-between">
                <div className="">
                    <img src={project.coverPhoto} alt={project.title} className="w-full h-48 object-cover rounded mb-4" />
                    <h3 className="text-xl font-bold text-start">{project.title}</h3>
                    <p className="mt-2 text-start">{project.description.slice(0, 90)}{project.description.length > 90 && '...' }</p>
                </div>
                <div className='flex space x-4'>
                    <Button className='mt-4' variant="secondary" onClick={() => router.push(`/Projects/${project.projectId}`)}>More Details</Button>
                    <Button variant="destructive" className="mt-4 ml-auto" onClick={() => handleRemoveBookmark(project.id)}><FaTrash className='text-lg me-2'/> Remove Bookmark</Button>
                </div>
            </div>
            ))}
        </div>
        {bookmarkedProjects.length < 1 && <p className='text-slate-200 italic text-center text-3xl'>No projects added to bookmark</p>}
        </section>
            
        <Separator />
        
        <header className="text-center my-8">
            <h1 className="text-2xl font-bold">More Projects</h1>
        </header>
        
        {/* more projects */}
        <section className="my-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProjects.map((project) => (
                <div key={project.id} className="bg-white p-4 rounded shadow-md h-96 flex flex-col justify-between">
                    <div className="	">
                        <img src={project.coverPhoto} alt={project.title} className="w-full h-48 object-cover rounded mb-4" />
                        <h3 className="text-xl font-bold">{project.title}</h3>
                        <p className="mt-2 ">{project.description.slice(0, 90)}{project.description.length > 90 && '...' }</p>
                    </div>
                    <div className='flex space x-4 '>
                        <Button variant="secondary" className='mt-4' onClick={() => router.push(`/Projects/${project.id}`)}>More Details</Button>
                        <Button className="mt-4 ml-auto" onClick={() => addBookmark(project)}>+ Add Bookmark</Button>
                    </div>
                </div>
            ))}
            </div>
        </section>
    </main>
  );
}

export default Bookmarks;
