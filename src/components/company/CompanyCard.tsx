import { Image } from '@nextui-org/react';
import React from 'react';
import { FiPlus } from 'react-icons/fi';

const CompanyCard = ({ company }) => {
    const description = company?.companyDescription;
    const wordCount = description ? description.split(' ').length : 0;

    const handleReadMore = () => {
        // route to details page
    };

    return (
        <>
            <div className=' bg-white rounded-lg p-3 shadow border'>
                <div className='flex gap-3 xl:gap-6 mb-4'>
                    <div className='flex-shrink-0 w-16 md:w-20 h-16 md:h-20 my-auto'>
                        <Image
                            src={company.companyProfileImage ? company.companyProfileImage : "/assets/user.png"}
                            alt="Profile"
                            className="rounded-full w-16 md:w-20 h-16 md:h-20 border border-gray-300 object-cover object-top"
                        />
                    </div>

                    <div className='flex-grow flex flex-col gap-1 justify-center'>
                        <h1 className='text-xl font-semibold hover:underline cursor-pointer'>{company.companyName}</h1>
                    </div>
                </div>
                <div>
                    <p>
                        {wordCount <= 10 ? description : `${description.split(' ').slice(0, 10).join(' ')}...`}

                        {wordCount > 10 && (
                            <button onClick={handleReadMore} className=' text-sky-500 cursor-pointer ml-1'>
                                Read More
                            </button>
                        )}
                    </p>
                </div>
            </div>
        </>
    );
};

export default CompanyCard;
