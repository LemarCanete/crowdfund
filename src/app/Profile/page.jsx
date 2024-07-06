import React from 'react';

function ProfilePage() {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div className="flex items-center mb-6">
        <img
          src="/Jimny.png"
          alt="Profile"
          className="w-20 h-20 rounded-full mr-4"
        />
        <div>
          <h1 className="text-3xl font-bold">Jimmy Neutron</h1>
          <p className="text-gray-600">Donor</p>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">About Me</h2>
        <p className="text-gray-700">
        Hey there, I'm Jimmy Neutron, a young prodigy with a knack for inventing and a passion for exploring the wonders of science! Whether 
        it's building rockets to explore the cosmos or creating gadgets to solve <br />everyday problems.
        </p>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
        <ul className="list-disc list-inside text-gray-700">
          <li>Email: jimmyneutron@example.com</li>
          <li>Phone: +6395653722</li>
          <li>Location: Cebu, Philippines</li>
        </ul>
      </div>

      

      <div className="border border-gray-300 p-4 rounded-lg mb-6">
        <h2 className="text-2xl font-semibold mb-4">Contributions</h2>
        <ul className="divide-y divide-gray-200">
          {/* CONTRIBUTION */}
          <li className="py-4">
            <p className="text-gray-700">Contribution to Project Typhoon Bopha Relief Fund</p>
            <p className="text-gray-500">Amount: $100</p>
            <p className="text-gray-500">Date: January 1, 2024</p>
          </li>
          
          {/* CONTRIBUTION */}
          <li className="py-4">
            <p className="text-gray-700">Contribution to Project Anti-poverty Program</p>
            <p className="text-gray-500">Amount: $50</p>
            <p className="text-gray-500">Date: February 15, 2024</p>
        </li>
        </ul>
      </div>
    </div>
  );
}

export default ProfilePage;
