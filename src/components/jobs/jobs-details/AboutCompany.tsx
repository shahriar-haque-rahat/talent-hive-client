'use client'

import { Image, Tooltip } from '@nextui-org/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import toast from 'react-hot-toast';
import { BsDot } from 'react-icons/bs';
import { FaFacebook, FaLinkedin } from 'react-icons/fa';
import { FiPlus } from 'react-icons/fi';

const AboutCompany = ({ jobPost }) => {
    const router = useRouter();

    const handleInvalidLink = (message: string) => {
        toast.error(message);
    };

    const handleCompanyDetails = (companyId) => {
        router.push(`/company?id=${companyId}`);
    }

    return (
        <>
            <div className=' border-t border-gray-300'>
                <div className='py-6'>
                    <h1 className='text-2xl font-bold mb-6'>About the company</h1>

                        <div className='flex items-center gap-3 xl:gap-6 mb-4'>
                            <div className='flex-shrink-0 w-16 h-16 my-auto'>
                                <Image
                                    onClick={() => handleCompanyDetails(jobPost.companyId._id)}
                                    src={jobPost.companyId.companyProfileImage ? jobPost.companyId.companyProfileImage : "/assets/user.png"}
                                    alt="Profile"
                                    className="cursor-pointer rounded-full w-16 h-16 border border-gray-300 object-cover object-top"
                                />
                            </div>

                            <div className='flex-grow flex flex-col lg:flex-row gap-2 lg:gap-6'>
                                <h1 onClick={() => handleCompanyDetails(jobPost.companyId._id)} className='flex-wrap text-xl font-semibold hover:underline cursor-pointer'>{jobPost.companyId.companyName}</h1>

                                <div className=' flex gap-2 items-center text-gray-700'>
                                    {jobPost.companyId.facebookLink?.startsWith('http') ? (
                                        <Link
                                            href={jobPost.companyId.facebookLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <Tooltip placement="top" content="Facebook">
                                                <div>
                                                    <FaFacebook className='cursor-pointer text-xl' />
                                                </div>
                                            </Tooltip>
                                        </Link>
                                    ) : (
                                        <Tooltip placement="top" content="Facebook">
                                            <div onClick={() => handleInvalidLink('Facebook link not available')}>
                                                <FaFacebook className='cursor-pointer text-xl' />
                                            </div>
                                        </Tooltip>
                                    )}

                                    {jobPost.companyId.linkedInLink?.startsWith('http') ? (
                                        <Link
                                            href={jobPost.companyId.linkedInLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <Tooltip placement="top" content="LinkedIn">
                                                <div>
                                                    <FaLinkedin className='cursor-pointer text-xl' />
                                                </div>
                                            </Tooltip>
                                        </Link>
                                    ) : (
                                        <Tooltip placement="top" content="LinkedIn">
                                            <div onClick={() => handleInvalidLink('LinkedIn link not available')}>
                                                <FaLinkedin className='cursor-pointer text-xl' />
                                            </div>
                                        </Tooltip>
                                    )}

                                    <p><BsDot /></p>
                                    <p className=' text-sm'>{jobPost.companyId.followers} {(jobPost.companyId.followers > 1) ? 'Followers' : 'Follower'}</p>
                                </div>
                            </div>
                        </div>

                    <p>{jobPost.companyId.companyDescription}</p>
                </div>

                <div onClick={() => handleCompanyDetails(jobPost.companyId._id)} className=' cursor-pointer border-t p-6 text-lg font-semibold text-sky-500 flex justify-center items-center'>
                    Show more
                </div>
            </div>
        </>
    );
};

export default AboutCompany;
