import React from 'react';
import LeftSection from './left-section/LeftSection';
import RightSection from './right-section/RightSection';

const Profile = () => {
    return (
        <div className=' grid grid-cols-3 gap-6'>
            <div className=' col-span-2'><LeftSection/></div>
            <RightSection/>
        </div>
    );
};

export default Profile;
