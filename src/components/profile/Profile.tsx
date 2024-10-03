import React from 'react';
import LeftSection from './left-section/LeftSection';
import RightSection from './right-section/RightSection';

const Profile = () => {
    return (
        <div className=' grid lg:grid-cols-4 gap-6'>
            <div className=' lg:col-span-3'><LeftSection/></div>
            <div className='hidden lg:block'><RightSection/></div>
        </div>
    );
};

export default Profile;
