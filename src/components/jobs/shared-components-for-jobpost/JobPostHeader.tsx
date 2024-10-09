import { Image } from '@nextui-org/react';
import { formatDistanceToNow } from 'date-fns';
import React from 'react';
import { LuDot } from 'react-icons/lu';

const JobPostHeader = ({ jobTitle, position, jobLocation, workplaceType, createdAt, companyId }) => {
    const timeAgo = formatDistanceToNow(new Date(createdAt), { addSuffix: true });

    return (
        <>
            <div className='flex gap-3 xl:gap-6 mb-4'>
                <div className='flex-shrink-0 w-16 md:w-20 h-16 md:h-20'>
                    <Image
                        src={companyId.companyProfileImage ? companyId.companyProfileImage : "/assets/user.png"}
                        alt="Profile"
                        className="rounded-full w-16 md:w-20 h-16 md:h-20 border border-gray-300 object-cover object-top"
                    />
                </div>

                <div className='flex-grow flex flex-col gap-1 justify-center'>
                    <span className=' flex items-center gap-2 flex-wrap'>
                        <h1 className='font-semibold hover:underline cursor-pointer'>{jobTitle}</h1>
                        <p className='text-xs text-gray-500'>({timeAgo})</p>
                    </span>

                    <p className='text-sm font-semibold'>{companyId.companyName}</p>
                    <div className=' flex flex-wrap gap-2 items-center'>
                        <p className='text-sm'>{position}</p>
                        <p><LuDot /></p>
                        <p className='text-sm'>{jobLocation} ({workplaceType})</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default JobPostHeader;
