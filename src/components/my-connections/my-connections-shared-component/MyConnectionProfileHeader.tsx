import { Image } from '@nextui-org/react';
import React from 'react';

const MyConnectionProfileHeader = ({ profileImage, fullName, email }) => {
    return (
        <div className="flex items-center justify-center gap-2">
            <div className="flex-shrink-0">
                <Image
                    src={profileImage}
                    alt={fullName}
                    className="w-12 h-12 rounded-full object-top object-cover"
                />
            </div>
            <div className="flex-grow">
                <p className="font-bold text-base">{fullName}</p>
                <p className="text-xs text-gray-500">{email}</p>
            </div>
        </div>
    );
};

export default MyConnectionProfileHeader;

