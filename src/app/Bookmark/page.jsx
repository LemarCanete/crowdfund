"use client";

import { Button } from "@/components/ui/button";
import React, { useRef, useState, useEffect } from 'react';
import { collection, addDoc, getDocs, getFirestore } from "firebase/firestore";

const Bookmarks = () => {
  const bookmarkedRef = useRef(null);
  const [bookmarkedProjects, setBookmarkedProjects] = useState([]);
  const [allProjects, setAllProjects] = useState([]);

  useEffect(() => {
    fetchAllProjects();
    fetchBookmarkedProjects();
  }, []);

  const fetchAllProjects = async () => {
    try {
      
      const projects = [
        {
          id: 1,
          title: "Typhoon Bopha Relief Fund",
          description: "Typhoon Bopha devastated communities in the Philippines...",
          coverPhoto: "/Project1.jpg"
        },
        {
          id: 2,
          title: "Anti-poverty Program",
          description: "Our Anti-poverty Program aims to alleviate poverty by providing education...",
          coverPhoto: "/Project2.jpg"
        },
        {
          id: 3,
          title: "Malnutrition In The Philippines",
          description: "Help us combat malnutrition in the Philippines by providing nutritious food...",
          coverPhoto: "/Project3.jpg"
        },
        {
          id: 4,
          title: "Cultural Heritage Preservation",
          description: "This Project aims at preserving and promoting the rich cultural heritage...",
          coverPhoto: "/Project4.jpg"
        },
        {
          id: 5,
          title: "Education for All: Scholarship Fund",
          description: "Provide scholarships for underprivileged students in rural areas...",
          coverPhoto: "/Project5.jpg"
        }
      ];

      setAllProjects(projects);
    } catch (error) {
      console.error("Error fetching all projects: ", error);
    }
  };

  const fetchBookmarkedProjects = async () => {
    const db = getFirestore();
    try {
      const querySnapshot = await getDocs(collection(db, "bookmarks"));
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
    const db = getFirestore();
    try {
      const docRef = await addDoc(collection(db, "bookmarks"), {
        title: proj.title,
        description: proj.description,
        coverPhoto: proj.coverPhoto
      });
      console.log("Document written with ID: ", docRef.id);
      fetchBookmarkedProjects(); 
      if (bookmarkedRef.current) {
        bookmarkedRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const handleAddBookmark = (title, description, coverPhoto) => {
    const proj = {
      title: title,
      description: description,
      coverPhoto: coverPhoto
    };
    addBookmark(proj);
  };

  const handleRemoveBookmark = async (projectId) => {
    const db = getFirestore();
    try {
      await db.collection("bookmarks").doc(projectId).delete();
      fetchBookmarkedProjects(); 
    } catch (error) {
      console.error("Error removing bookmark: ", error);
    }
  };

  
  const filteredProjects = allProjects.filter(project => !bookmarkedProjects.find(bm => bm.title === project.title));

  return (
    <main className='container mx-auto p-4'>
      <header className="text-center my-8" ref={bookmarkedRef}>
        <h1 className="text-2xl font-bold">Bookmarked Projects</h1>
        <section className="my-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {bookmarkedProjects.map((project) => (
              <div key={project.id} className="bg-white p-4 rounded shadow-md">
                <img src={project.coverPhoto} alt={project.title} className="w-full h-48 object-cover rounded mb-4" />
                <h3 className="text-xl font-bold">{project.title}</h3>
                <p className="mt-2">{project.description}</p>
                <Button className="mt-4" onClick={() => handleRemoveBookmark(project.id)}>Remove Bookmark</Button>
              </div>
            ))}
          </div>
        </section>
      </header>

      <header className="text-center my-8">
        <h1 className="text-2xl font-bold">More Projects</h1>
      </header>
      <section className="my-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProjects.map((project) => (
            <div key={project.id} className="bg-white p-4 rounded shadow-md">
              <img src={project.coverPhoto} alt={project.title} className="w-full h-48 object-cover rounded mb-4" />
              <h3 className="text-xl font-bold">{project.title}</h3>
              <p className="mt-2">{project.description}</p>
              <div className="flex space x-16">
              <Button className="mt-4">Support</Button>
              <Button className="mt-4 ml-auto" onClick={() => handleAddBookmark(project.title, project.description, project.coverPhoto)}>Bookmark</Button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Bookmarks;
