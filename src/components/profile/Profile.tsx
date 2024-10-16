import React from 'react';
import LeftSection from './profile-left-section/ProfileLeftSection';
import RightSection from './profile-right-section/ProfileRightSection';
import { getUser } from '@/apiFunctions/userData';
import ReduxHandler from './ReduxHandler';

interface ProfileDetails {
    id: string
}

const Profile = async ({ id }: ProfileDetails) => {
    try {
        const userData = await getUser(id);

        return (
            <>
                {/* Pass the userData to ReduxHandler */}
                <ReduxHandler userData={userData} />

                <div className=' grid lg:grid-cols-4 gap-2'>
                    <div className=' lg:col-span-3'><LeftSection /></div>
                    <div className='hidden lg:block'><RightSection /></div>
                </div>
            </>
        );
    } catch (error) {
        console.error('Error fetching user:', error);
        return <div>Error loading profile...</div>;
    }
};

export default Profile;
