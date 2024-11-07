'use client'

import { getJobPosts } from '@/apiFunctions/jobpostData';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { setJobPosts, setJobPostsPage } from '@/redux/jobPostSlice';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import JobPostCard from '../shared-components-for-jobpost/JobPostCard';
import JobPostSkeleton from '@/skeletons/JobPostSkeleton';
import { useRouter } from 'next/navigation';

const JobPostList = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const user = useSelector((state: any) => state.user.user);
    const jobPosts = useSelector((state: any) => state.jobPost.jobPosts);
    const page = useSelector((state: any) => state.jobPost.jobPostsPage);
    const { ref, inView } = useIntersectionObserver();
    const [hasMore, setHasMore] = useState(true);

    const fetchJobPosts = async () => {
        if (!user || !hasMore) return;

        try {
            const fetchedJobPosts = await getJobPosts(user._id, page, 10);

            if (fetchedJobPosts && fetchedJobPosts.jobPosts && Array.isArray(fetchedJobPosts.jobPosts)) {
                if (fetchedJobPosts.jobPosts.length < 10) {
                    setHasMore(false);
                }

                const existingJobPostsIds = new Set(jobPosts.map((jobPost: any) => jobPost._id));
                const newJobPosts = fetchedJobPosts.jobPosts.filter((jobPost: any) => !existingJobPostsIds.has(jobPost._id));

                if (newJobPosts.length > 0) {
                    dispatch(setJobPosts([...jobPosts, ...newJobPosts]));
                    dispatch(setJobPostsPage(fetchedJobPosts.page));
                }
            }
            else {
                setHasMore(false);
            }
        }
        catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (jobPosts.length === 0) {
            fetchJobPosts();
        }
    }, [user]);

    useEffect(() => {
        if (inView && hasMore) {
            fetchJobPosts();
        }
    }, [inView, hasMore]);

    const handleDetails = (jobPostId: string) => {
        router.push(`/jobs/details?id=${jobPostId}`);
    }

    return (
        <>
            <div className='rounded-lg border bg-white shadow'>
                <h1 className=' h-28 text-2xl font-semibold px-6 py-8 border-b border-gray-300'>Jobs for you</h1>

                <div className=' h-[calc(100vh-200px)] overflow-y-scroll'>
                    {(jobPosts?.length > 0) ? (
                        jobPosts?.map((jobPost: any) => (
                            <div className=' p-3 md:p-6 border-b border-gray-300'>
                                <JobPostCard jobPost={jobPost} handleDetails={handleDetails} />
                            </div>
                        ))
                    ) : (
                        <p className='text-center'>No job found</p>
                    )}

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

export default JobPostList;
