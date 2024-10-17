'use client'

import { findCompanyById } from '@/apiFunctions/companyData';
import { Image, Tooltip } from '@nextui-org/react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FaFacebook, FaLinkedin } from 'react-icons/fa';
import { BsDot } from "react-icons/bs";
import CompanyJobs from './CompanyJobs';
import InteractionButtons from './InteractionButtons';
import { useSelector } from 'react-redux';

interface CompanyDetails {
    id: string
}

const DetailsPage = ({ id }: CompanyDetails) => {
    const user = useSelector((state: any) => state.user.user);
    const [company, setCompany] = useState();
    const [isFollowed, setIsFollowed] = useState(false);

    const fetchCompanyDetails = async () => {
        const res = await findCompanyById(id, user._id);

        if (res) {
            setCompany(res.company);
            setIsFollowed(res.isFollowed)
        }
    }

    const handleInvalidLink = (message: string) => {
        toast.error(message);
    };

    useEffect(() => {
        if (id) {
            fetchCompanyDetails();
        }
    }, [id])

    return (
        <>
            {company &&
                <div className='space-y-2 h-[calc(100vh-110px)] overflow-y-scroll'>
                    <div className='bg-white p-4 rounded-lg border shadow flex items-center justify-between'>
                        <div key={company._id} className='flex gap-3 xl:gap-6 '>
                            <div className='flex-shrink-0 w-32 h-32 my-auto'>
                                <Image
                                    src={company.companyProfileImage ? company.companyProfileImage : "/assets/user.png"}
                                    alt="Profile"
                                    className="rounded-lg w-32 h-32 border-2 border-white object-cover object-top"
                                />
                            </div>

                            <div className='flex-grow flex flex-col gap-2 justify-between'>
                                <h1 className=' text-2xl font-semibold'>{company.companyName}</h1>
                                <p className='text-lg'>{company.companyEmail}</p>
                                <p>{company.companyContactNumber}</p>

                                <div className=' flex gap-2 items-start text-gray-700'>
                                    {company.facebookLink?.startsWith('http') ? (
                                        <Link
                                            href={company.facebookLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <Tooltip placement="top" content="Facebook">
                                                <div>
                                                    <FaFacebook className='cursor-pointer text-xl mb-3' />
                                                </div>
                                            </Tooltip>
                                        </Link>
                                    ) : (
                                        <Tooltip placement="top" content="Facebook">
                                            <div onClick={() => handleInvalidLink('Facebook link not available')}>
                                                <FaFacebook className='cursor-pointer text-xl mb-3' />
                                            </div>
                                        </Tooltip>
                                    )}

                                    {company.linkedInLink?.startsWith('http') ? (
                                        <Link
                                            href={company.linkedInLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <Tooltip placement="top" content="LinkedIn">
                                                <div>
                                                    <FaLinkedin className='cursor-pointer text-xl mb-3' />
                                                </div>
                                            </Tooltip>
                                        </Link>
                                    ) : (
                                        <Tooltip placement="top" content="LinkedIn">
                                            <div onClick={() => handleInvalidLink('LinkedIn link not available')}>
                                                <FaLinkedin className='cursor-pointer text-xl mb-3' />
                                            </div>
                                        </Tooltip>
                                    )}

                                    <p><BsDot /></p>
                                    <p className=' text-sm'>{company.followers} Followers</p>
                                </div>
                            </div>
                        </div>

                        <div className=' pr-10'>
                            <InteractionButtons isFollowed={isFollowed} setIsFollowed={setIsFollowed} company={company} userId={user._id}/>
                        </div>
                    </div>

                    <div className='p-4 bg-white rounded-lg border shadow'>
                        <span className='font-bold'>About: </span> {company.companyDescription}
                    </div>

                    <CompanyJobs companyId={company._id} />
                </div>
            }
        </>
    );
};

export default DetailsPage;
