import Image from 'next/image'
import React from 'react'

const AboutTheAuthor = ({projectDetails}) => {
    console.log(projectDetails.user)
    const user = projectDetails.user
    return (
        <div className=''>
            <div className="md:flex md:gap-10 md:items-center my-6">
                <img className='w-48' src={user?.photoURL || 'https://png.pngtree.com/png-vector/20240427/ourmid/pngtree-user-icon-brush-profile-vector-png-image_12327708.png'} />
                <div className="">
                    <p className="text-black/75 leading-7">Name: {user?.displayName}</p>
                    <p className="text-black/75 leading-7">Username: {user?.username}</p>
                    <p className="text-black/75 leading-7">Email: {user?.email}</p>
                    <p className="text-black/75 leading-7">Phone number: {user?.phoneNumber}</p>
                    <p className="text-black/75 leading-7">Location: {user?.location}</p>
                </div>
            </div>
            <p className="font-light text-slate-500 leading-7">{user?.bio}</p>
        </div>
    )
}

export default AboutTheAuthor