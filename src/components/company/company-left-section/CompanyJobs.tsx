import { getJobPostsByCompany } from '@/apiFunctions/jobpostData';
import JobPostCard from '@/components/jobs/shared-components-for-jobpost/JobPostCard';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import JobPostSkeleton from '@/skeletons/JobPostSkeleton';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import JobPosting from './JobPosting';

interface CompanyJobsProps {
    companyId: string;
}

const CompanyJobs = ({ companyId }: CompanyJobsProps) => {
    const router = useRouter();
    const [jobPosts, setJobPosts] = useState([]);
    const [page, setPage] = useState(0);
    const { ref, inView } = useIntersectionObserver();
    const [hasMore, setHasMore] = useState(true);

    const fetchJobPosts = async () => {
        if (!companyId || !hasMore) return;

        const fetchedJobPosts = await getJobPostsByCompany(companyId, page, 10);

        if (fetchedJobPosts?.jobPosts?.length) {
            const existingJobPostsIds = new Set(jobPosts.map(jobPost => jobPost._id));
            const newJobPosts = fetchedJobPosts.jobPosts.filter(
                (jobPost) => !existingJobPostsIds.has(jobPost._id)
            );

            if (newJobPosts.length > 0) {
                setJobPosts((prev) => [...prev, ...newJobPosts]);
                setPage(fetchedJobPosts.page);
            }
            if (newJobPosts.length < 10) setHasMore(false);
        } else {
            setHasMore(false);
        }
    };

    useEffect(() => {
        setJobPosts([]);
        setPage(0);
        setHasMore(true);
    }, [companyId]);

    useEffect(() => {
        if (companyId) fetchJobPosts();
    }, [companyId]);

    useEffect(() => {
        if (inView && hasMore) fetchJobPosts();
    }, [inView, hasMore]);

    const handleDetails = (jobPostId: string) => {
        router.push(`/jobs/details?id=${jobPostId}`);
    };

    return (
        <>
            <div className='rounded-lg border bg-white shadow'>
                <div className='h-28 px-6 py-8 border-b border-gray-300 flex justify-between'>
                    <h1 className=' text-2xl font-semibold '>Jobs for you</h1>
                    <JobPosting companyId={companyId} setJobPosts={setJobPosts}/>
                </div>

                <div>
                    <div>
                        {jobPosts?.map(jobPost => (
                            <div className=' p-3 md:p-6 border-b border-gray-300'>
                                <JobPostCard jobPost={jobPost} handleDetails={handleDetails} />
                            </div>
                        ))}
                    </div>

                    {/* Element to trigger for more fetch */}
                    {hasMore && (
                        <div ref={ref} className="h-fit">
                            <JobPostSkeleton />
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default CompanyJobs;
