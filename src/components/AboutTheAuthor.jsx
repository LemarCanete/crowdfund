import Image from 'next/image'
import React from 'react'

const AboutTheAuthor = ({projectDetails}) => {
    console.log(projectDetails.user)
    const user = projectDetails.user
    return (
        <div className=''>
            <div className="sm:flex sm:gap-10 sm:items-center my-6">
                <img className='w-48 mx-auto sm:mx-0' src={user?.photoURL || 'https://png.pngtree.com/png-vector/20240427/ourmid/pngtree-user-icon-brush-profile-vector-png-image_12327708.png'} />
                <div className="mt-8 sm:mt-0">
                    <p className="text-black/75 leading-7"><span className="text-black">Name: </span>{user?.displayName}</p>
                    <p className="text-black/75 leading-7"><span className="text-black">Username: </span>{user?.username}</p>
                    <p className="text-black/75 leading-7"><span className="text-black">Email: </span>{user?.email}</p>
                    <p className="text-black/75 leading-7"><span className="text-black">Phone number: </span>{user?.phoneNumber}</p>
                    <p className="text-black/75 leading-7"><span className="text-black">Location: </span>{user?.location}</p>
                </div>
            </div>
            <p className="font-light text-slate-500 leading-7">{user?.bio}</p>
        </div>
    )
}

export default AboutTheAuthor