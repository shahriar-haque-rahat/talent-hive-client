import React from 'react';
import LeftSection from './LeftSection';
import RightSection from './RightSection';

const Profile = () => {
    return (
        <div className=' grid grid-cols-3 gap-6'>
            <LeftSection/>
            <div className=' col-span-2'><RightSection/></div>
        </div>
    );
};

export default Profile;
