import React from 'react';
import ProfileHeader from './ProfileHeader';
import Timeline from './Timeline';
import LeftBar from './LeftBar';

const ProfileLeftSection = () => {
    return (
        <>
            <div className=' flex'>
                <LeftBar />
                <div className=' ml-7 md:ml-2 lg:ml-8 xl:ml-10 w-full'>
                    <ProfileHeader />
                    <div className='my-4 border-t border-gray-500'></div>
                    <Timeline />
                </div>
            </div>
        </>
    );
};

export default ProfileLeftSection;
