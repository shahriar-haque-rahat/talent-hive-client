'use client'

import { followCompany, getNotFollowedCompanies } from '@/apiFunctions/companyData';
import { Image, Link } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import { TiArrowRight } from 'react-icons/ti';
import { useSelector } from 'react-redux';

const CompanySuggestions = () => {
    const user = useSelector((state: any) => state.user.user);
    const router = useRouter();
    const [companies, setCompanies] = useState([]);
    const [buttonLoading, setButtonLoading] = useState(false);

    const fetchCompanies = async () => {
        const fetchedCompanies = await getNotFollowedCompanies(user._id, 0, 3);
        if (fetchedCompanies.companies?.length > 0) {
            setCompanies(fetchedCompanies.companies);
        }
    };

    useEffect(() => {
        if (companies.length === 0) {
            fetchCompanies();
        }

        // Add event listener to handle followed companies
        const handleCompanyFollowed = async (event) => {
            const { companyId } = event.detail;
            replaceCompany(companyId);
        };

        window.addEventListener('companyFollowed', handleCompanyFollowed);

        // Cleanup event listener on component unmount
        return () => {
            window.removeEventListener('companyFollowed', handleCompanyFollowed);
        };
    }, [companies]);

    const handleCompanyDetails = (companyId: string) => {
        router.push(`/company?id=${companyId}`);
    };

    const handleFollowCompany = async (companyId: string) => {
        try {
            setButtonLoading(true);

            await followCompany(companyId, user._id);
            replaceCompany(companyId);
        }
        catch (error) {
            console.error('Error following company:', error);
        }

        setButtonLoading(false);
    };

    const replaceCompany = async (followedCompanyId: string) => {
        const updatedCompanies = companies.filter(
            (company: any) => company._id !== followedCompanyId
        );

        if (updatedCompanies.length < 3) {
            const newCompanies = await getNotFollowedCompanies(user._id, companies.length, 1);
            setCompanies(updatedCompanies.concat(newCompanies.companies));
        } else {
            setCompanies(updatedCompanies);
        }
    };

    return (
        <>
            <div className=' bg-white p-3 xl:p-6 border shadow rounded-lg'>
                <p className=' mb-4 font-semibold'>Company Suggestions</p>
                {companies?.length > 0 ? (
                    companies?.map(company => (
                        <div key={company._id} className='flex gap-3 xl:gap-6 mb-4'>
                            <div className='flex-shrink-0 w-16 h-16 my-auto'>
                                <Image
                                    onClick={() => handleCompanyDetails(company._id)}
                                    src={company.companyProfileImage ? company.companyProfileImage : "/assets/user.png"}
                                    alt="Profile"
                                    className="cursor-pointer rounded-full w-16 h-16 border-2 border-white object-cover object-top"
                                />
                            </div>

                            <div className='flex-grow flex flex-col gap-1 justify-center'>
                                <h1 onClick={() => handleCompanyDetails(company._id)} className='cursor-pointer hover:underline font-semibold'>{company.companyName}</h1>
                                <button
                                    onClick={() => handleFollowCompany(company._id)}
                                    className='w-24 xl:w-28 text-sm py-1 px-3 rounded-lg border border-gray-600 hover:border-black hover:bg-gray-200 flex gap-1 justify-center items-center font-bold'
                                    disabled={buttonLoading}
                                >
                                    <FiPlus size={16} />Follow
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className='text-center text-xs'>No company recommendations</p>
                )}
                <Link href={"/company-recommendations"}>
                    <p className=' text-gray-600 mt-4 font-semibold text-xs flex items-center cursor-pointer'>View all companies <TiArrowRight size={20} /></p>
                </Link>
            </div>
        </>
    );
};

export default CompanySuggestions;
