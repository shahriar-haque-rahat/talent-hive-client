import React from 'react';
import ProfileHeader from './profile-header/ProfileHeader';
import Timeline from './timeline-posts/Timeline';
import LeftBar from './LeftBar';
import EmployerCompanies from './company/EmployerCompanies';

const ProfileLeftSection = () => {
    return (
        <>
            <div className=' flex'>
                <LeftBar />
                <div className=' ml-7 md:ml-2 lg:ml-8 xl:ml-10 w-full flex flex-col gap-4'>
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
