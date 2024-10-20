import React from 'react';
import ProfileHeader from './ProfileHeader';
import Timeline from './Timeline';
import LeftBar from './LeftBar';
import EmployerCompanies from './EmployerCompanies';

const ProfileLeftSection = () => {
    return (
        <>
            <div className=' flex'>
                <LeftBar />
                <div className=' ml-7 md:ml-2 lg:ml-8 xl:ml-10 w-full space-y-4'>
                    <ProfileHeader />
                    <EmployerCompanies />
                    <div className='border-t border-gray-500'></div>
                    <Timeline />
                </div>
            </div>
        </>
    );
};

export default ProfileLeftSection;
