import { formatDistanceToNow } from 'date-fns';
import { LuDot } from "react-icons/lu";
import React from 'react';
import { MdWork } from 'react-icons/md';
import { GoDotFill } from "react-icons/go";
import CompanyHeader from '@/components/company/company-recommendations/CompanyHeader';
import AboutCompany from './AboutCompany';
import ApplyOrSaveButton from './ApplyOrSaveButton';
import JobEditAndDelete from './JobEditAndDelete';

const JobDetailsRightSection = ({ jobPost }) => {
    const timeAgo = formatDistanceToNow(new Date(jobPost.createdAt), { addSuffix: true });

    return (
        <>
            <div className='bg-white rounded-lg border shadow'>
                <div className='h-28 px-6 py-8 border-b border-gray-300'><CompanyHeader companyId={jobPost.companyId} /></div>

                <div className='relative h-[calc(100vh-110px)] overflow-y-scroll'>
                    <div className='absolute top-2 right-3 '><JobEditAndDelete jobPost={jobPost}/></div>

                    <div className=' p-6'>
                        <div className=' space-y-3'>
                            <h1 className=' text-2xl font-bold'>{jobPost.jobTitle}</h1>

                            <div className=' flex gap-2 items-center text-gray-500'>
                                <p>{jobPost.jobLocation}</p>
                                <p><LuDot /></p>
                                <p>{timeAgo}</p>
                                <p>{jobPost.applicants.length ? <LuDot /> : ''}</p>
                                <p>
                                    {jobPost.applicants.length
                                        ? `${jobPost.applicants.length} applicant${jobPost.applicants.length === 1 ? '' : 's'}`
                                        : ''}
                                </p>
                            </div>

                            <div className='flex gap-2 items-center text-lg'>
                                <MdWork size={22} className='text-gray-600' />
                                <p>{jobPost.position}, {jobPost.workplaceType}, {jobPost.jobType}</p>
                            </div>
                        </div>

                        <ApplyOrSaveButton jobPostId={jobPost._id} applicants={jobPost.applicants} employerId={jobPost.companyId.employerId} />

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

                        <AboutCompany jobPost={jobPost} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default JobDetailsRightSection;
