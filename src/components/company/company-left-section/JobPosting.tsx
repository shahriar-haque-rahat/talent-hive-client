'use client'

import JobPostingModal from '@/components/jobs/jobs-posting/JobPostingModal';
import { Button } from '@nextui-org/react';
import React, { useState } from 'react';

const JobPosting = ({ companyId, setJobPosts }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAddJobPost = (newJobPost) => {
        setJobPosts((prevPosts) => [newJobPost, ...prevPosts]);
    };

    return (
        <>
            {/* Post Job Button */}
            <Button
                className='w-fit text-lg rounded-lg border border-gray-500 bg-transparent hover:bg-gray-200'
                onClick={() => setIsModalOpen(true)}
            >
                Post a Job
            </Button>

            {/* Job Posting Modal */}
            {isModalOpen && (
                <JobPostingModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    companyId={companyId}
                    jobPost={null}
                    handleAddJobPost={handleAddJobPost}
                />
            )}
        </>
    );
};

export default JobPosting;
