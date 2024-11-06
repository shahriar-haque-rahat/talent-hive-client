import React from 'react';
import JobsLeftSection from './jobs-left-section/JobsLeftSection';
import JobsRightSection from './jobs-right-section/JobsRightSection';

const Jobs = () => {
    return (
        <>
            <div className=' grid md:grid-cols-5 gap-2'>
                <div className=' md:col-span-2'>
                    <div className=' sticky top-20 z-10'>
                        <JobsLeftSection />
                    </div>
                </div>
                <div className=' md:col-span-3'><JobsRightSection /></div>
            </div>
        </>
    );
};

export default Jobs;
