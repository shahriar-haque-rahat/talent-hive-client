import React, { useState } from 'react';
import JobPostHeader from './JobPostHeader';

const JobPostCard = ({ jobPost }) => {
    const description = jobPost?.about.description;
    const wordCount = description ? description.split(' ').length : 0;

    const handleReadMore = () => {
        // route to details page
    };

    return (
        <>
            <div>
                <JobPostHeader
                    jobTitle={jobPost?.jobTitle}
                    jobLocation={jobPost.jobLocation}
                    workplaceType={jobPost.workplaceType}
                    createdAt={jobPost.createdAt}
                    companyId={jobPost?.companyId}
                />
                <p>
                    {wordCount <= 20 ? description : `${description.split(' ').slice(0, 20).join(' ')}...`}

                    {wordCount > 20 && (
                        <button onClick={handleReadMore} className=' text-sky-500 cursor-pointer ml-1'>
                            Read More
                        </button>
                    )}
                </p>
            </div>
        </>
    );
};

export default JobPostCard;
