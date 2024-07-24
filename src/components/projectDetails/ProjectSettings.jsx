import React, { useState, useEffect } from 'react';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from "@/utils/firebase-config";
import { Input } from '@/components/ui/input';
import { useToast } from "@/components/ui/use-toast"

const ProjectSettings = ({ projectId }) => {
  const [projectData, setProjectData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast()

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const docRef = doc(db, 'projects', projectId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProjectData(docSnap.data());
        } else {
          alert("No such document!");
        }
      } catch (error) {
        alert("Error fetching project data");
      } finally {
        setLoading(false);
      }
    };

    if (projectId) {
      fetchProjectData();
    }
  }, [projectId]);

  const handleUpdate = async () => {
    try {
        const docRef = doc(db, 'projects', projectId);
        await updateDoc(docRef, projectData);
        toast({
            title: "Update Successfully!",
            description: "The project has been updated",
        })
    } catch (error) {
        toast({
            title: "Error! Failed to update!",
            description: "There was a problem. Pls try again!.",
        })
    }
  };

  const handleDelete = async () => {
    try {
        const docRef = doc(db, 'projects', projectId);
        await deleteDoc(docRef); 
        toast({
            title: "Project Successfully Deleted!",
            description: "The project has been deleted",
        })
    } catch (error) {
        toast({
            title: "Error! Failed to delete!",
            description: "There was a problem. Pls try again!.",
        })
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setProjectData({ ...projectData, [id]: value });
  };

  const handleCategoryChange = (e) => {
    const { value } = e.target;
    setProjectData({ ...projectData, category: value });
  };

  if (loading) {
    return <div className='mx-20'>Loading...</div>;
  } 

  if (!projectData) {
    return <div>No project data found.</div>;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md mx-20">
      <h2 className="text-2xl font-bold mb-4">Project Settings</h2>

    
      <div className="mb-4">
        <label htmlFor="project-title" className="block text-sm font-medium text-gray-700">Project Name</label>
        <Input
          type="text"
          id="title"
          value={projectData.title || ''}
          onChange={handleInputChange}
          className="input-field"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="project-description" className="block text-sm font-medium text-gray-700">Project Description</label>
        <textarea
          id="description"
          value={projectData.description || ''}
          onChange={handleInputChange}
          className="input-field border border-gray-300 rounded-md p-2 w-full"
          
        />
      </div>

      <div className="mb-4">
        <label htmlFor="project-description" className="block text-sm font-medium text-gray-700">Project Note</label>
        <textarea
          id="notes"
          value={projectData.notes || ''}
          onChange={handleInputChange}
          className="input-field border border-gray-300 rounded-md p-2 w-full"
          
        />
      </div>

      <div className="mb-4">
        <label htmlFor="project-category" className="block text-sm font-medium text-gray-700">Project Category</label>
        <select
          id="category"
          value={projectData.category || ''}
          onChange={handleCategoryChange}
          className="input-field border border-gray-300 rounded-md p-2 w-full"
        >
          <option value="">Select category...</option>
          <option value="Health">Health</option>
          <option value="Education">Education</option>
          <option value="Pets">Pets</option>
          <option value="Crafts">Crafts</option>
          <option value="Foods">Foods</option>
          <option value="Design">Design</option>
          <option value="Fashion">Fashion</option>
          <option value="Travel">Travel</option>
          <option value="Technology">Technology</option>
          <option value="Disaster Relief">Disaster</option>
          <option value="Music">Music</option>
          <option value="Journalism">Journalism</option>
          <option value="Arts and Culture">Arts and Culture</option>
          <option value="Environment">Environment</option>
          <option value="Games">Games</option>
          <option value="Comics and Animation">Comics and Animation</option>
          <option value="Entrepreneurship">Entrepreneurship</option>
          <option value="Community">Community</option>
        </select>
      </div>

      <div className="flex justify-between">
        <button
          onClick={handleUpdate}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
            
          Update
        
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ProjectSettings;
