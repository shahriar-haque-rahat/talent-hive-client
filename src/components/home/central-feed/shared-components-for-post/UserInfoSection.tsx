import { Image } from '@nextui-org/react';
import React from 'react';
import { formatDistanceToNow } from 'date-fns';

const UserInfoSection = ({ profileImage, fullName, createdAt }) => {
    const timeAgo = formatDistanceToNow(new Date(createdAt), { addSuffix: true });

    return (
        <div className='flex gap-2 p-3'>
            <Image
                src={profileImage}
                alt={fullName}
                className="rounded-full border-2 border-white w-14 h-14 object-cover object-center"
            />
            <div>
                <h1 className='font-semibold'>{fullName}</h1>
                <p className='text-xs mt-2'>{timeAgo}</p>
            </div>
        </div>
    );
};

export default UserInfoSection;
