import JobDetails from '@/components/jobs/jobs-details/JobDetails';
import { PageProps } from '@/types/global/global.types';
import { redirect } from 'next/navigation';
import React from 'react';

const page = ({searchParams}: PageProps) => {
    const id = searchParams.id;

    if (!id) {
        redirect(`/jobs`)
    }
    return (
        <div>
            <JobDetails id={id as string}/>
        </div>
    );
};

export default page;
