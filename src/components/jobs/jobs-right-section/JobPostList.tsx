'use client'

import { getJobPosts } from '@/apiFunctions/jobpostData';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { setJobPosts, setJobPostsPage } from '@/redux/jobPostSlice';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import JobPostCard from '../shared-components-for-jobpost/JobPostCard';
import JobPostSkeleton from '@/skeletons/JobPostSkeleton';

const JobPostList = () => {
    const dispatch = useDispatch();
    const user = useSelector((state: any) => state.user.user);
    const jobPosts = useSelector((state: any) => state.jobPost.jobPosts);
    const page = useSelector((state: any) => state.jobPost.jobPostsPage);
    const { ref, inView } = useIntersectionObserver();
    const [hasMore, setHasMore] = useState(true);

    const fetchJobPosts = async () => {
        if (!user || !hasMore) return;

        const fetchedJobPosts = await getJobPosts(user._id, page, 10);

        if (fetchedJobPosts && fetchedJobPosts.jobPosts && Array.isArray(fetchedJobPosts.jobPosts)) {
            if (fetchedJobPosts.jobPosts.length < 10) {
                setHasMore(false);
            }

            const existingJobPostsIds = new Set(jobPosts.map(jobPost => jobPost._id));
            const newJobPosts = fetchedJobPosts.jobPosts.filter(jobPost => !existingJobPostsIds.has(jobPost._id));

            if (newJobPosts.length > 0) {
                dispatch(setJobPosts([...jobPosts, ...newJobPosts]));
                dispatch(setJobPostsPage(fetchedJobPosts.page));
            }
        }
        else {
            setHasMore(false);
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

    return (
        <>
            <div>
                <h1 className='mb-4 text-2xl font-semibold px-6 py-8 bg-white rounded-lg border shadow'>Jobs for you</h1>

                <div className=' space-y-4'>
                    {jobPosts?.map(jobPost => (
                        <div className=' p-3 md:p-6 bg-white rounded-lg shadow border'>
                            <JobPostCard jobPost={jobPost} />
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
        </>
    );
};

export default JobPostList;
