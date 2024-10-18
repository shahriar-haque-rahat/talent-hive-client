import { Image } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import React from 'react';

const MyConnectionProfileHeader = ({ userId, profileImage, fullName, email }) => {
    const router = useRouter();

    const handleProfile = () => {
        router.push(`/profile?id=${userId}`);
    }

    return (
        <div className="flex items-center justify-center gap-2">
            <div className="flex-shrink-0">
                <Image
                    onClick={handleProfile}
                    src={profileImage}
                    alt={fullName}
                    className="cursor-pointer w-12 h-12 rounded-full object-top object-cover"
                />
            </div>
            <div className="flex-grow">
                <p onClick={handleProfile} className="cursor-pointer hover:underline font-bold text-base">{fullName}</p>
                <p className="text-xs text-gray-500">{email}</p>
            </div>
        </div>
    );
};

export default MyConnectionProfileHeader;

