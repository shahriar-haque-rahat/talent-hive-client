import React from 'react';
import JobPostingButton from '../jobs-posting/JobPostingButton';
import CompanySuggestions from '@/components/company/company-recommendations/CompanySuggestions';

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
