'use client'

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserInfoSection from '../home/central-feed/shared-components-for-post/UserInfoSection';
import { CiMenuKebab } from 'react-icons/ci';
import EditAndDeletePost from '../home/central-feed/posting/EditAndDeletePost';
import ContentSection from '../home/central-feed/shared-components-for-post/ContentSection';
import MediaSection from '../home/central-feed/shared-components-for-post/MediaSection';
import SharedPostContent from '../home/central-feed/SharedPostContent';
import PostInteractionSection from '../home/central-feed/post-interaction/PostInteractionSection';
import PostSkeleton from '@/skeletons/PostSkeleton';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { getTimelinePosts } from '@/api/postData';
import { addCachePost, setTimelinePosts, setTimelinePostsPage } from '@/redux/postSlice';

const TimelinePosts = () => {
    const dispatch = useDispatch();
    const user = useSelector((state: any) => state.user.user);
    const timelinePosts = useSelector((state: any) => state.post.timelinePosts);
    const page = useSelector((state: any) => state.post.timelinePostsPage);
    const [openEditDeleteModal, setOpenEditDeleteModal] = useState({});
    const { ref, inView } = useIntersectionObserver();
    const [hasMore, setHasMore] = useState(true);

    const toggleEditDeleteModal = (postId) => {
        setOpenEditDeleteModal((prevState) => ({
            ...prevState,
            [postId]: !prevState[postId],
        }));
    };

    const fetchPosts = async () => {
        if (user && user._id && hasMore) {
            const fetchedPosts = await getTimelinePosts(user._id, page);
            if (fetchedPosts.posts.length < 10) {
                setHasMore(false);
            }
            const existingPostIds = new Set(timelinePosts.map(post => post._id));
            const newPosts = fetchedPosts.posts.filter(post => !existingPostIds.has(post._id));

            if (newPosts && newPosts.length > 0) {
                for (const post of newPosts) {
                    dispatch(addCachePost({ postData: post }));
                }
                dispatch(setTimelinePosts([...timelinePosts, ...newPosts]));
                dispatch(setTimelinePostsPage(fetchedPosts.page));
            }
        }
    };

    useEffect(() => {
        if (timelinePosts.length === 0) {
            fetchPosts();
        }
    }, [user]);

    useEffect(() => {
        if (inView && hasMore) {
            fetchPosts();
        }
    }, [inView, hasMore]);

    return (
        <>
            <div className='space-y-4 mt-10'>
                {Array.isArray(timelinePosts) &&
                    timelinePosts?.map((post, index) => (
                        <div key={index} className='bg-white border border-gray-300 rounded-lg '>
                            <div className=' flex items-start justify-between p-3'>
                                {/* User info */}
                                <UserInfoSection profileImage={post.userId.profileImage} fullName={post.userId.fullName} createdAt={post.createdAt.slice(0, 10)} />

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

                {/* Element to trigger for more fetch */}
                {hasMore && (
                    <div ref={ref} className="h-fit">
                        <PostSkeleton />
                    </div>
                )}
            </div>
        </>
    );
};

export default TimelinePosts;