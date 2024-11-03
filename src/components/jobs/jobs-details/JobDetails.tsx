import React from 'react';
import JobDetailsLeftSection from './JobDetailsLeftSection';
import JobDetailsRightSection from './JobDetailsRightSection';
import { getOneJobPost } from '@/apiFunctions/jobpostData';

interface JobDetails {
    id: string
}

const JobDetails = async ({ id }: JobDetails) => {
    const jobPost = await getOneJobPost(id)

    return (
        <>
            <div className=' md:grid grid-cols-5 gap-2'>
                <div className='hidden md:block col-span-2'><JobDetailsLeftSection /></div>
                <div className=' md:col-span-3'><JobDetailsRightSection jobPost={jobPost} /></div>
            </div>
        </>
    );
};

export default JobDetails;
