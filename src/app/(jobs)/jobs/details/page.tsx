import JobDetails from '@/components/jobs/jobs-details/JobDetails';
import { PageProps } from '@/types/global/global.types';
import { redirect } from 'next/navigation';
import React from 'react';

async function fetchJobData(id: string) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/job-post/details/${id}`);
    if (!response.ok) {
        throw new Error('Job not found');
    }
    return response.json();
}

export async function generateMetadata({ searchParams }: { searchParams: { id?: string } }) {
    const id = searchParams.id;

    if (!id) {
        redirect('/jobs');
        return {};
    }

    const jobData = await fetchJobData(id);

    return {
        title: `${jobData.jobTitle}`,
        description: `Explore the details of the job position: ${jobData.jobTitle} on Talent Hive.`,
    };
}

const page = ({ searchParams }: PageProps) => {
    const id = searchParams.id;

    if (!id) {
        redirect(`/jobs`)
    }
    return (
        <div>
            <JobDetails id={id as string} />
        </div>
    );
};

export default page;
