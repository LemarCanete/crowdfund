'use client'
import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { db } from '@/utils/firebase-config';
import { collection, query, where, getDocs, doc, getDoc, updateDoc, setDoc } from 'firebase/firestore';
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
import { useRouter } from 'next/navigation';

function ProfilePage() {
  const { currentUser } = useContext(AuthContext);
  const [contributions, setContributions] = useState([]);
  const [aboutMe, setAboutMe] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [aboutMeText, setAboutMeText] = useState('');
    const router = useRouter();

  useEffect(() => {
    const fetchAboutMe = async () => {
      if (currentUser) {
        try { 
          const userDocRef = doc(db, 'aboutme', currentUser.uid);
          const userSnapshot = await getDoc(userDocRef);
          if (userSnapshot.exists()) {
            setAboutMe(userSnapshot.data().aboutMe || '');
          }
        } catch (error) { 
          console.error('Error fetching about me data:', error);
        }
      }
    };

    fetchAboutMe();
  }, [currentUser]);

  useEffect(()=>{
    !currentUser.uid && !currentUser && router.push('/')
  }, [currentUser])

  /*useEffect(() => {
    const fetchContributions = async () => {
      if (currentUser) {
        const q = query(
          collection(db, 'contributions'),
          where('userId', '==', currentUser.uid)
        );
        const querySnapshot = await getDocs(q);
        const contributionsList = querySnapshot.docs.map(doc => doc.data());
        setContributions(contributionsList);
      }
    };
    
    fetchContributions();
  }, [currentUser]);

  if (!currentUser) {
    return <p>Loading...</p>;
  }
    /** */

    const handleSave = async () => {
      if (currentUser) {
        try { 
          const userDocRef = doc(db, 'aboutme', currentUser.uid);
          const userSnapshot = await getDoc(userDocRef);
          if (userSnapshot.exists()) {
            await updateDoc(userDocRef, {
              aboutMe: aboutMeText,
            });
          } else {
            await setDoc(userDocRef, {
              aboutMe: aboutMeText,
            });
          }
          setAboutMe(aboutMeText);
          setIsEditing(false);
          alert('About me updated successfully');
        } catch (error) { 
          alert('Error updating about me');
        }
      }
    };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div className="flex items-center mb-6">
        {/* <img
          src={currentUser.photoURL || '/default-avatar.png'}
          alt="Profile"
          className="w-20 h-20 rounded-full mr-4"
        /> */}
        {currentUser.uid && <Avatar className='w-20 h-20'>
            <AvatarImage src={`${currentUser?.photoURL}`} alt="@shadcn" className="h-full w-full mr-4"/>
            <AvatarFallback>{currentUser.email.slice(0, 2)}</AvatarFallback>
        </Avatar>}
        <div>
          <h1 className="text-3xl font-bold">{currentUser.displayName || 'Anonymous'}</h1>
          <p className="text-gray-600">Donor</p>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">About Me</h2>
        {isEditing ? (
          <div>
            <textarea
              value={aboutMeText}
              onChange={(e) => setAboutMeText(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Describe yourself"
            />
            <button onClick={handleSave} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">Save</button>
          </div>
        ) : (
          <p className="text-gray-700">
            {aboutMe || 'Describe yourself'}
            <button onClick={() => { setAboutMeText(aboutMe); setIsEditing(true); }} className="ml-2 text-blue-500">Edit</button>
          </p>
        )}
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
        <ul className="list-disc list-inside text-gray-700">
          <li>Email: {currentUser.email}</li>
          {/* Add more contact information if available */}
        </ul>
      </div>

      <div className="border border-gray-300 p-4 rounded-lg mb-6">
        <h2 className="text-2xl font-semibold mb-4">Contributions</h2>
        <ul className="divide-y divide-gray-200">
          {contributions.map((contribution, index) => (
            <li key={index} className="py-4">
              <p className="text-gray-700">{contribution.projectName}</p>
              <p className="text-gray-500">Amount: ${contribution.amount}</p>
              <p className="text-gray-500">Date: {contribution.date}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ProfilePage;
