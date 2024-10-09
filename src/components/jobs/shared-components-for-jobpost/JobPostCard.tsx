import React from 'react';
import JobPostHeader from './JobPostHeader';

const JobPostCard = ({ jobPost, handleDetails }) => {
    const description = jobPost?.about.description;
    const wordCount = description ? description.split(' ').length : 0;

    return (
        <>
            <div className='cursor-pointer' onClick={() => handleDetails(jobPost._id)}>
                <JobPostHeader
                    jobTitle={jobPost?.jobTitle}
                    position={jobPost?.position}
                    jobLocation={jobPost.jobLocation}
                    workplaceType={jobPost.workplaceType}
                    createdAt={jobPost.createdAt}
                    companyId={jobPost?.companyId}
                />
                <p>
                    {wordCount <= 20 ? description : `${description.split(' ').slice(0, 20).join(' ')}...`}

                    {wordCount > 20 && (
                        <button className=' text-sky-500 cursor-pointer ml-1'>
                            Read More
                        </button>
                    )}
                </p>
            </div>
        </>
    );
};

export default JobPostCard;
