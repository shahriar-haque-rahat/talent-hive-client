'use client'

import React from 'react';
import { useSelector } from 'react-redux';
import TimelinePostSection from './TimelinePostSection';
import { Button } from '@nextui-org/react';
import { FiPlus } from 'react-icons/fi';

const ProfileHeader = () => {
    const user = useSelector((state: any) => state.user.user);
    const userProfile = useSelector((state: any) => state.user.userProfile);

    return (
        <>
            <div className=' bg-white border rounded-lg'>
                <div className=' relative'>
                    <img
                        src={userProfile.coverImage ? userProfile.coverImage : "/assets/bg.jpg"}
                        className=' w-full h-52 object-cover object-center rounded-t-lg'
                    />
                    <img
                        src={userProfile.profileImage ? userProfile.profileImage : '/assets/user.png'}
                        alt={userProfile.fullName}
                        className='absolute top-20 left-1/2 transform -translate-x-1/2 border-4 border-white h-48 w-48 rounded-full md:left-6 md:translate-x-0 object-cover object-top'
                    />
                </div>
                <div className=' mt-16 flex flex-col md:flex-row gap-3 justify-between md:px-6'>
                    <div className='md:w-1/2 text-center md:text-start'>
                        <h1 className=' text-2xl font-semibold'>{userProfile.fullName}</h1>
                        <p>{userProfile.about}</p>
                    </div>
                    <div className='md:w-1/2 flex justify-center items-center gap-6 mx-auto'>
                        <Button className=' bg-transparent text-sky-500 text-base font-semibold w-28 border border-sky-500 hover:bg-sky-500 hover:text-white'>Message</Button>
                        <Button className=' bg-sky-500 text-white text-base font-semibold w-28 border border-sky-500 hover:bg-white hover:text-sky-500'><FiPlus size={16} />Add</Button>
                    </div>
                </div>
                {(user._id === userProfile._id)
                    ? <TimelinePostSection />
                    : <div className='h-3'></div>
                }
            </div>
        </>
    );
};

export default ProfileHeader;