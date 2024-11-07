import { Image } from '@nextui-org/react';
import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { useRouter } from 'next/navigation';

const UserInfoSection = ({ userId, profileImage, fullName, createdAt }) => {
    const router = useRouter();

    const handleProfile = () => {
        router.push(`/profile?id=${userId}`);
    }

    const localDate = createdAt.toLocaleString();

    const timeAgo = formatDistanceToNow(new Date(localDate), { addSuffix: true });
console.log(createdAt, localDate, timeAgo)
    return (
        <div className='flex gap-2 p-3 w-full'>
            <Image
                onClick={handleProfile}
                src={profileImage}
                alt={fullName}
                className="rounded-full border-2 border-white cursor-pointer w-14 h-14 object-cover object-top"
            />
            <div>
                <h1 onClick={handleProfile} className='font-semibold cursor-pointer hover:underline'>{fullName}</h1>
                <p className='text-xs mt-2'>{timeAgo}</p>
            </div>
        </div>
    );
};

export default UserInfoSection;
