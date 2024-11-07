'use client'

import React, { useEffect, useState } from 'react';
import UserInfoSection from '../shared/UserInfoSection';
import { useDispatch, useSelector } from 'react-redux';
import { CiMenuKebab } from 'react-icons/ci';
import EditAndDeletePost from '../home/central-feed/posting/EditAndDeletePost';
import ContentSection from '../home/central-feed/shared-components-for-post/ContentSection';
import MediaSection from '../home/central-feed/shared-components-for-post/MediaSection';
import SharedPostContent from '../home/central-feed/SharedPostContent';
import PostInteractionSection from '../shared/post-interaction/PostInteractionSection';
import { getOnePost } from '@/apiFunctions/postData';
import { addCachePost, selectPostById } from '@/redux/postSlice';

const Details = ({ postId }) => {
    const dispatch = useDispatch();
    const user = useSelector((state: any) => state.user.user);
    const post = useSelector((state) => selectPostById(state, postId));
    const [openEditDeleteModal, setOpenEditDeleteModal] = useState({});

    // Edit Delete Modal
    const toggleEditDeleteModal = (postId: string) => {
        setOpenEditDeleteModal((prevState) => ({
            ...prevState,
            [postId]: !prevState[postId],
        }));
    };

    const fetchPost = async () => {
        try {
            console.log(postId, user._id)
            const fetchedPost = await getOnePost(postId, user._id);
            console.log('Fetched Post:', fetchedPost);
            if (fetchedPost) {
                dispatch(addCachePost({ postData: fetchedPost }));
            }
        } catch (error) {
            console.error('Error fetching post:', error);
        }
    };

    useEffect(() => {
        if (!post && postId) {
            fetchPost();
        }
    }, [user, postId]);

    return (
        <>
            {post &&
                <div className='bg-white border rounded-lg shadow'>
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
                    </div>

                    {/* Post content */}
                    <ContentSection content={post.content} index={1} />

                    {/* Display media files */}
                    <MediaSection media={post.media} postId={post._id} user={user} />

                    {/* Shared post content */}
                    {(post.sharedPostId || post.sharedPostId === null) &&
                        <SharedPostContent user={user} sharedPostContent={post.sharedPostId} />
                    }

                    {/* interaction section */}
                    <PostInteractionSection user={user} post={post} isModalView/>
                </div>
            }
        </>
    );
};

export default Details;
