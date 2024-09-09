import { Image } from '@nextui-org/react';
import React from 'react';

const UserInfoSection = ({ profileImage, fullName, updatedAt }) => {
    return (
        <div className='flex gap-2'>
            <Image
                src={profileImage}
                alt={fullName}
                className="rounded-full border-2 border-white w-14 h-14 object-cover object-center"
            />
            <div>
                <h1 className='font-semibold'>{fullName}</h1>
                <p className='text-xs mt-2'>{updatedAt.slice(0, 10)}</p>
            </div>
        </div>
    );
};

export default UserInfoSection;