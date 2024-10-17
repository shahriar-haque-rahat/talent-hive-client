'use client'

import React from 'react';
import { useSelector } from 'react-redux';
import TimelinePostSection from './TimelinePostSection';
import InteractionButtons from './InteractionButtons';

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
                    </div>
                    <div className='md:w-1/2 mx-auto'>
                        {(user._id !== userProfile._id) &&
                            <InteractionButtons user={user} userProfile={userProfile} relationshipStatus={userProfile.relationshipStatus}/>
                        }
                    </div>
                </div>
                <p className=' py-4 px-6'>{userProfile.about}</p>

                {(user._id === userProfile._id)
                    ? <TimelinePostSection />
                    : <div className='h-3'></div>
                }
            </div>
        </>
    );
};

export default ProfileHeader;
