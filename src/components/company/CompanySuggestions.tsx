'use client'

import { getCompanies } from '@/apiFunctions/companyData';
import { Image, Link } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import { TiArrowRight } from 'react-icons/ti';

const CompanySuggestions = () => {
    const [companies, setCompanies] = useState([]);
    const fetchCompanies = async () => {
        const fetchedCompanies = await getCompanies(0, 3);

        if (fetchedCompanies.companies.length > 0) {
            setCompanies(fetchedCompanies.companies);
        }
    };

    useEffect(() => {
        if (companies.length === 0) {
            fetchCompanies();
        }
    }, []);

    return (
        <>
            <div className=' bg-white p-3 xl:p-6 border shadow rounded-lg'>
                <p className=' mb-4 font-semibold'>Company Suggestions</p>
                {
                    companies?.map(company => (
                        <div key={company.id} className='flex gap-3 xl:gap-6 mb-4'>
                            <div className='flex-shrink-0 w-16 h-16 my-auto'>
                                <Image
                                    src={company.companyProfileImage ? company.companyProfileImage : "/assets/user.png"}
                                    alt="Profile"
                                    className="rounded-full w-16 h-16 border-2 border-white object-cover object-top"
                                />
                            </div>

                            <div className='flex-grow flex flex-col gap-1 justify-center'>
                                <h1 className='cursor-pointer hover:underline font-semibold'>{company.companyName}</h1>
                                <button className='w-24 xl:w-28 text-sm py-1 px-3 rounded-lg border border-gray-600 hover:border-black hover:bg-gray-200 flex gap-1 justify-center items-center font-bold'>
                                    <FiPlus size={16} />Follow
                                </button>
                            </div>
                        </div>
                    ))
                }
                <Link href={"/company-recommendations"}>
                    <p className=' text-gray-600 mt-4 font-semibold text-xs flex items-center cursor-pointer'>View all companies <TiArrowRight size={20} /></p>
                </Link>
            </div>
        </>
    );
};

export default CompanySuggestions;
