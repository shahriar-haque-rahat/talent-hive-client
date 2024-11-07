'use client'

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CiMenuKebab } from 'react-icons/ci';
import EditAndDeletePost from './posting/EditAndDeletePost';
import SharedPostContent from './SharedPostContent';
import PostInteractionSection from '../../shared/post-interaction/PostInteractionSection';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { getPosts } from '@/apiFunctions/postData';
import { setPosts, setPostsPage } from '@/redux/postSlice';
import PostSkeleton from '@/skeletons/PostSkeleton';
import UserInfoSection from '../../shared/UserInfoSection';
import ContentSection from './shared-components-for-post/ContentSection';
import MediaSection from './shared-components-for-post/MediaSection';
import PostSection from '../home-left-section/PostSection';
import { MdReportGmailerrorred } from "react-icons/md";
import ReportModal from '@/components/shared/ReportModal';

const NewsFeed = () => {
    const dispatch = useDispatch();
    const user = useSelector((state: any) => state.user.user);
    const { ref, inView } = useIntersectionObserver();
    const posts = useSelector((state: any) => state.post.posts);
    const page = useSelector((state: any) => state.post.postsPage);
    const [hasMore, setHasMore] = useState(true);
    const [openEditDeleteModal, setOpenEditDeleteModal] = useState({});
    const [openReportModal, setOpenReportModal] = useState({ isOpen: false, postId: null, postUser: null });

    // Toggle Report Modal
    const toggleReportModal = (postId = null, postUser = null) => {
        setOpenReportModal({ isOpen: !openReportModal.isOpen, postId, postUser });
    };

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
        <>
            <div className=' md:hidden mb-2'>
                <PostSection />
            </div>

            <div className='space-y-4  border-y rounded-lg'>
                {Array.isArray(posts) &&
                    posts?.map((post, index) => (
                        <div key={index} className='bg-white border rounded-lg shadow'>
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
                                    className='mt-1 text-red-500 hover:text-red-600 hover:bg-gray-200 cursor-pointer' />
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

export default NewsFeed;
