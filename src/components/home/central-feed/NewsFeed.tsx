'use client'

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CiMenuKebab } from 'react-icons/ci';
import EditAndDeletePost from './posting/EditAndDeletePost';
import SharedPostContent from './SharedPostContent';
import PostInteractionSection from './post-interaction/PostInteractionSection';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { getPosts } from '@/apiFunctions/postData';
import { setPosts, setPostsPage } from '@/redux/postSlice';
import PostSkeleton from '@/skeletons/PostSkeleton';
import UserInfoSection from './shared-components-for-post/UserInfoSection';
import ContentSection from './shared-components-for-post/ContentSection';
import MediaSection from './shared-components-for-post/MediaSection';

const NewsFeed = () => {
    const dispatch = useDispatch();
    const user = useSelector((state: any) => state.user.user);
    const { ref, inView } = useIntersectionObserver();
    const posts = useSelector((state: any) => state.post.posts);
    const page = useSelector((state: any) => state.post.postsPage);
    const [hasMore, setHasMore] = useState(true);
    const [openEditDeleteModal, setOpenEditDeleteModal] = useState({});

    // Edit Delete Modal
    const toggleEditDeleteModal = (postId) => {
        setOpenEditDeleteModal((prevState) => ({
            ...prevState,
            [postId]: !prevState[postId],
        }));
    };

    const fetchPosts = async () => {
        if (!user || !hasMore) return;

        const fetchedPosts = await getPosts(user._id, page);

        if (fetchedPosts && fetchedPosts.posts && Array.isArray(fetchedPosts.posts)) {
            if (fetchedPosts.posts.length < 10) {
                setHasMore(false);
            }

            const existingPostIds = new Set(posts.map(post => post._id));
            const newPosts = fetchedPosts.posts.filter(post => !existingPostIds.has(post._id));

            if (newPosts.length > 0) {
                dispatch(setPosts([...posts, ...newPosts]));
                dispatch(setPostsPage(fetchedPosts.page));
            }
        }
        else {
            setHasMore(false);
        }
    };

    useEffect(() => {
        if (posts.length === 0) {
            fetchPosts();
        }
    }, [user]);

    useEffect(() => {
        if (inView && hasMore) {
            fetchPosts();
        }
    }, [inView, hasMore]);

    return (
        <div className='space-y-4'>
            {Array.isArray(posts) &&
                posts?.map((post, index) => (
                    <div key={index} className='bg-white border rounded-lg shadow'>
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
    );
};

export default NewsFeed;
