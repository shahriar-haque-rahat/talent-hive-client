import { Image } from '@nextui-org/react';
import React from 'react';

const CompanyHeader = ({ companyId }) => {

    return (
        <>
            <div className='flex gap-3 xl:gap-6 mb-4'>
                <div className='flex-shrink-0 w-14 h-14 my-auto'>
                    <Image
                        src={companyId.companyProfileImage ? companyId.companyProfileImage : "/assets/user.png"}
                        alt="Profile"
                        className="rounded-full w-14 h-14 border border-gray-300 object-cover object-top"
                    />
                </div>

                <div className='flex-grow flex flex-col gap-1 justify-center'>
                    <h1 className='flex-wrap font-semibold hover:underline cursor-pointer'>{companyId.companyName}</h1>
                </div>
            </div>
        </>
    );
};

export default CompanyHeader;
