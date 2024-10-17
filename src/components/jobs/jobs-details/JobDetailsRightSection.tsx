import { formatDistanceToNow } from 'date-fns';
import { LuDot } from "react-icons/lu";
import React from 'react';
import { MdWork } from 'react-icons/md';
import { GoDotFill } from "react-icons/go";
import { Button, Image } from '@nextui-org/react';
import { FiPlus } from 'react-icons/fi';
import CompanyHeader from '@/components/company/company-recommendations/CompanyHeader';

const JobDetailsRightSection = ({ jobPost }) => {
    const timeAgo = formatDistanceToNow(new Date(jobPost.createdAt), { addSuffix: true });

    return (
        <>
            <div className=' bg-white rounded-lg border shadow'>
                <div className='h-28 px-6 py-8 border-b border-gray-300'><CompanyHeader companyId={jobPost.companyId} /></div>

                <div className=' h-[calc(100vh-110px)] overflow-y-scroll'>
                    <div className=' p-6'>
                        <div className=' space-y-3'>
                            <h1 className=' text-2xl font-bold'>{jobPost.jobTitle}</h1>

                            <div className=' flex gap-2 items-center text-gray-500'>
                                <p>{jobPost.jobLocation}</p>
                                <p><LuDot /></p>
                                <p>{timeAgo}</p>
                                <p>{jobPost.applicants.length ? <LuDot /> : ''}</p>
                                <p>{jobPost.applicants.length ? `${jobPost.applicants.length} applicants` : ''}</p>
                            </div>

                            <div className='flex gap-2 items-center text-lg'>
                                <MdWork size={22} className='text-gray-600' />
                                <p>{jobPost.position}, {jobPost.workplaceType}, {jobPost.jobType}</p>
                            </div>

                            <div className=' flex gap-3'>
                                <Button className=' px-6 rounded-lg bg-sky-500 border border-sky-500 text-white hover:bg-white hover:text-sky-500'>Apply</Button>
                                <Button className=' px-6 rounded-lg bg-white border border-sky-500 text-sky-500 hover:bg-sky-500 hover:text-white'>Save</Button>
                            </div>
                        </div>

                        <div className=' my-6'>
                            <h2 className=' text-xl font-semibold mb-3'>About the job</h2>

                            <div className=' flex flex-col gap-3'>
                                <p className=' font-semibold'>Description</p>
                                <p>{jobPost.about.description}</p>

                                <p className=' font-semibold'>Educational Requirements</p>
                                <ul>
                                    {jobPost.about.educationalRequirements.map(e => (
                                        <li key={e} className='flex items-center gap-2'><GoDotFill /> {e}</li>
                                    ))}
                                </ul>

                                <p className=' font-semibold'>Experience Requirements</p>
                                <ul>
                                    {jobPost.about.experienceRequirements.map(e => (
                                        <li key={e} className='flex items-center gap-2'><GoDotFill /> {e}</li>
                                    ))}
                                </ul>

                                <p className=' font-semibold'>Additional Requirements</p>
                                <ul>
                                    {jobPost.about.additionalRequirements.map(e => (
                                        <li key={e} className='flex items-center gap-2'><GoDotFill /> {e}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className=' border-t border-gray-300'>
                        <div className='p-6'>
                            <h1 className='text-2xl font-bold mb-6'>About the company</h1>

                            <div className=' flex justify-between items-center'>
                                <div className='flex gap-3 xl:gap-6 mb-4'>
                                    <div className='flex-shrink-0 w-16 h-16 my-auto'>
                                        <Image
                                            src={jobPost.companyId.companyProfileImage ? jobPost.companyId.companyProfileImage : "/assets/user.png"}
                                            alt="Profile"
                                            className="rounded-full w-16 h-16 border border-gray-300 object-cover object-top"
                                        />
                                    </div>

                                    <div className='flex-grow flex flex-col justify-center'>
                                        <h1 className='flex-wrap text-xl font-semibold hover:underline cursor-pointer'>{jobPost.companyId.companyName}</h1>
                                    </div>
                                </div>
                                <button className='w-24 xl:w-28 text-sm py-1 px-3 rounded-lg border border-gray-600 hover:border-black hover:bg-gray-200 flex gap-1 justify-center items-center font-bold'>
                                    <FiPlus size={16} />Follow
                                </button>
                            </div>

                            <p>{jobPost.companyId.companyDescription}</p>
                        </div>

                        <div className=' cursor-pointer border-t p-6 text-lg font-semibold text-sky-500 flex justify-center items-center'>
                            Show more
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default JobDetailsRightSection;
