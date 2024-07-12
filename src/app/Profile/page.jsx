'use client'
import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { db } from '@/utils/firebase-config';
import { collection, query, where, getDocs } from 'firebase/firestore';

function ProfilePage() {
  const { currentUser } = useContext(AuthContext);
  const [contributions, setContributions] = useState([]);

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

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div className="flex items-center mb-6">
        <img
          src={currentUser.photoURL || '/default-avatar.png'}
          alt="Profile"
          className="w-20 h-20 rounded-full mr-4"
        />
        <div>
          <h1 className="text-3xl font-bold">{currentUser.displayName || 'Anonymous'}</h1>
          <p className="text-gray-600">Donor</p>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">About Me</h2>
        <p className="text-gray-700">
        Hello! I'm {currentUser.displayName || 'Anonymous'}, a passionate advocate for positive change and community empowerment. 
        I believe in the power of kindness and strive to make a difference in the lives of those around me. 
        Whether it’s volunteering at local shelters or mentoring youth, I’m dedicated to uplifting others.
        </p>
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
