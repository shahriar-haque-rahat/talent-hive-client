'use client'

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CiMenuKebab } from 'react-icons/ci';
import PostSkeleton from '@/skeletons/PostSkeleton';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { getTimelinePosts } from '@/apiFunctions/postData';
import { addCachePost, setTimelinePosts, setTimelinePostsPage, clearTimelinePosts } from '@/redux/postSlice';
import UserInfoSection from '@/components/shared/UserInfoSection';
import EditAndDeletePost from '@/components/home/central-feed/posting/EditAndDeletePost';
import ContentSection from '@/components/home/central-feed/shared-components-for-post/ContentSection';
import MediaSection from '@/components/home/central-feed/shared-components-for-post/MediaSection';
import SharedPostContent from '@/components/home/central-feed/SharedPostContent';
import PostInteractionSection from '@/components/shared/post-interaction/PostInteractionSection';
import { MdReportGmailerrorred } from 'react-icons/md';
import ReportModal from '@/components/shared/ReportModal';

const TimelinePosts = () => {
    const dispatch = useDispatch();
    const user = useSelector((state: any) => state.user.user);
    const userProfile = useSelector((state: any) => state.user.userProfile);
    const timelinePosts = useSelector((state: any) => state.post.timelinePosts);
    const page = useSelector((state: any) => state.post.timelinePostsPage);
    const [openEditDeleteModal, setOpenEditDeleteModal] = useState({});
    const { ref, inView } = useIntersectionObserver();
    const [hasMore, setHasMore] = useState(true);
    const [previousUserId, setPreviousUserId] = useState(null);
    const [openReportModal, setOpenReportModal] = useState({ isOpen: false, postId: null, postUser: null });

    // Toggle Report Modal
    const toggleReportModal = (postId = null, postUser = null) => {
        setOpenReportModal({ isOpen: !openReportModal.isOpen, postId, postUser });
    };

    const toggleEditDeleteModal = (postId) => {
        setOpenEditDeleteModal((prevState) => ({
            ...prevState,
            [postId]: !prevState[postId],
        }));
    };

    const fetchPosts = async () => {
        if (!userProfile || !hasMore) return;

        const fetchedPosts = await getTimelinePosts(userProfile._id, page);

        if (fetchedPosts && fetchedPosts.posts && Array.isArray(fetchedPosts.posts)) {
            if (fetchedPosts.posts.length < 10) {
                setHasMore(false);
            }
            const existingPostIds = new Set(timelinePosts.map(post => post._id));
            const newPosts = fetchedPosts.posts.filter(post => !existingPostIds.has(post._id));

            if (newPosts.length > 0) {
                newPosts.forEach((post) => {
                    dispatch(addCachePost({ postData: post }));
                });
                dispatch(setTimelinePosts([...timelinePosts, ...newPosts]));
                dispatch(setTimelinePostsPage(fetchedPosts.page));
            }
        } else {
            setHasMore(false);
        }
    };

    useEffect(() => {
        if (userProfile && userProfile._id !== previousUserId) {
            dispatch(clearTimelinePosts());
            setHasMore(true);
            setPreviousUserId(userProfile._id);
        }
    }, [userProfile, previousUserId, dispatch]);

    useEffect(() => {
        if (userProfile && timelinePosts.length === 0) {
            fetchPosts();
        }
    }, [timelinePosts.length, userProfile]);

    useEffect(() => {
        if (inView && hasMore && userProfile) {
            fetchPosts();
        }
    }, [inView, hasMore, userProfile]);

    return (
        <>
            <div className='space-y-4'>
                {Array.isArray(timelinePosts) &&
                    timelinePosts?.map((post, index) => (
                        <div key={index} className='bg-white border shadow rounded-lg '>
                            <div className=' flex items-start justify-between p-3'>
                                {/* User info */}
                                <UserInfoSection userId={post.userId._id} profileImage={post.userId.profileImage} fullName={post.userId.fullName} createdAt={post.createdAt} />

                                {/* Edit and delete modal */}
                                <div className='relative'>
                                    {post.userId._id === user._id && (
                                        <>
                                            <button
                                                className='hover:bg-gray-200 py-1'
                                                onClick={() => toggleEditDeleteModal(post._id)}
                                            >
                                                <CiMenuKebab />
                                            </button>
                                            {openEditDeleteModal[post._id] && (
                                                <EditAndDeletePost onEditDeleteClose={() => toggleEditDeleteModal(post._id)} post={post} userId={user._id} />
                                            )}
                                        </>
                                    )}
                                </div>

                                <MdReportGmailerrorred
                                    onClick={() => toggleReportModal(post._id, post.userId)}
                                    size={18}
                                    className='mt-1 text-red-500 hover:text-red-600 hover:bg-gray-200 cursor-pointer'
                                />
                            </div>

                            {/* Post content */}
                            <ContentSection content={post.content} index={index} />

                            {/* Display media files */}
                            <MediaSection media={post.media} postId={post._id} user={user} />

                            {/* Shared post content */}
                            {(post.sharedPostId || post.sharedPostId === null) &&
                                <SharedPostContent user={user} sharedPostContent={post.sharedPostId} />
                            }

                            {/* interaction section */}
                            <PostInteractionSection user={user} post={post} />
                        </div>
                    ))
                }

                {/* Trigger more fetch when inView */}
                {hasMore && (
                    <div ref={ref} className="h-fit">
                        <PostSkeleton />
                    </div>
                )}
            </div>

            {/* Report post */}
            <ReportModal
                isOpen={openReportModal.isOpen}
                toggleReportModal={() => toggleReportModal(null, null)}
                postId={openReportModal.postId}
                postUser={openReportModal.postUser}
            />
        </>
    );
};

export default TimelinePosts;
