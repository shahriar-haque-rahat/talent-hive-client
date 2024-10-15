import React from 'react';
import CompanySuggestions from '@/components/company/CompanySuggestions';
import JobPostingButton from '../jobs-posting/JobPostingButton';

const JobsLeftSection = () => {
    return (
        <>
            <div>
                <CompanySuggestions/>
                <JobPostingButton/>
            </div>
        </>
    );
};

export default JobsLeftSection;
