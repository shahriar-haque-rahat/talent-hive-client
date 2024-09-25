'use client'

import React from 'react';
import { useSelector } from 'react-redux';

const ProfileHeader = () => {
    const user = useSelector((state: any) => state.user.user);

    return (
        <>
            <div className=' relative'>
                <img src="/assets/bg.jpg" className=' w-full h-52 object-cover object-center rounded-b-lg' />
                <img src={user.profileImage} alt={user.fullName} className=' absolute top-20 right-6 border-4 border-white h-48 w-48 rounded-full' />
            </div>
            <div className=' mt-16 flex flex-col items-end text-end pr-6'>
                <h1 className=' text-2xl font-semibold'>{user.fullName}</h1>
                <p className=' w-1/2'>MERN Stack Developer || Focused on Building Reliable Web Applications || Interested in Software Engineering</p>
            </div>
        </>
    );
};

export default ProfileHeader;