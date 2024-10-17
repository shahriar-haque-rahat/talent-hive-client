import React from 'react';
import LeftSection from './profile-left-section/ProfileLeftSection';
import RightSection from './profile-right-section/ProfileRightSection';
import ReduxHandler from './ReduxHandler';

interface ProfileDetails {
    id: string
}

const Profile = async ({ id }: ProfileDetails) => {
    return (
        <>
            {/* setting user in redux */}
            <ReduxHandler id={id} />

            <div className=' grid lg:grid-cols-4 gap-2'>
                <div className=' lg:col-span-3'><LeftSection /></div>
                <div className='hidden lg:block'><RightSection /></div>
            </div>
        </>
    );
};

export default Profile;
