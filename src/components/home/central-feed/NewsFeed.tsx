'use client'

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { CiMenuKebab } from 'react-icons/ci';
import EditAndDeletePost from './posting/EditAndDeletePost';
import PostDetailsModal from './post-details/PostDetailsModal';
import SharedPostContent from './SharedPostContent';
import PostInteractionSection from './post-interaction/PostInteractionSection';
import { Image } from '@nextui-org/react';

const NewsFeed = ({ posts }) => {
    const user = useSelector((state: any) => state.user.user);
    const [expandedPosts, setExpandedPosts] = useState({});
    const [openEditDeleteModal, setOpenEditDeleteModal] = useState({});
    const [openPostDetails, setOpenPostDetails] = useState({ isOpen: false, user: null, postId: null, currentImageIndex: 0 });

    // Post Details
    const openPostDetailsModal = (postId, index) => {
        setOpenPostDetails({ isOpen: true, user, postId, currentImageIndex: index });
    };

    const closePostDetailsModal = () => {
        setOpenPostDetails({ isOpen: false, user: null, postId: null, currentImageIndex: 0 });
    }

    // Content
    const toggleReadMore = (index) => {
        setExpandedPosts((prevState) => ({
            ...prevState,
            [index]: !prevState[index],
        }));
    };

    const renderContent = (content, index) => {
        const words = content.split(' ');
        const isExpanded = expandedPosts[index];

        if (words.length > 20) {
            return (
                <>
                    {isExpanded ? content : words.slice(0, 20).join(' ') + '...'}
                    <span
                        onClick={() => toggleReadMore(index)}
                        className="text-blue-500 cursor-pointer ml-1"
                    >
                        {isExpanded ? 'Show less' : 'Read more'}
                    </span>
                </>
            );
        }
        return content;
    };

    const toggleEditDeleteModal = (postId) => {
        setOpenEditDeleteModal((prevState) => ({
            ...prevState,
            [postId]: !prevState[postId],
        }));
    };

    return (
        <div className='space-y-4'>
            {Array.isArray(posts) &&
                posts?.map((post, index) => (
                    <div key={index} className='bg-white border border-gray-300 rounded-lg '>
                        <div className=' flex items-start justify-between p-3'>
                            {/* User details */}
                            <div className='flex gap-2'>
                                <Image
                                    src={post.userId.profileImage}
                                    alt={post.fullName}
                                    className="rounded-full border-2 border-white w-14 h-14 object-cover object-center"
                                />
                                <div>
                                    <h1 className='font-semibold'>{post.userId.fullName}</h1>
                                    <p className='text-xs mt-2'>{post.timestamp.slice(0, 10)}</p>
                                </div>
                            </div>

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
                                            <EditAndDeletePost onEditDeleteClose={() => toggleEditDeleteModal(post._id)} post={post} />
                                        )}
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Post content */}
                        <div className='mt-2 p-3'>
                            <p>{renderContent(post.content, index)}</p>
                        </div>

                        {/* Display media files */}
                        {post.media && post.media.length > 0 && (
                            <div className={post.media.length === 1 ? "grid grid-cols-1 w-full" : "grid grid-cols-2 w-full"}>
                                {post.media.slice(0, 4).map((mediaUrl, mediaIndex) => (
                                    <div key={mediaIndex} className="relative w-full cursor-pointer" onClick={() => openPostDetailsModal(post._id, mediaIndex)}>
                                        <Image
                                            src={mediaUrl}
                                            alt={`Media ${mediaIndex}`}
                                            className="border-2 border-white object-cover object-center rounded-none"
                                            style={{ aspectRatio: '1 / 1' }}
                                        />
                                        {mediaIndex === 3 && post.media.length > 4 && (
                                            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white text-xl">
                                                +{post.media.length - 4}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Shared post content */}
                        {post.sharedPostId && post.sharedPostId !== '' &&
                            <SharedPostContent user={user} sharedPostContent={post.sharedPostId} />
                        }

                        {/* interaction section */}
                        <PostInteractionSection user={user} post={post} />
                    </div>
                ))
            }

            {openPostDetails.isOpen &&
                <PostDetailsModal
                    isOpen={openPostDetails.isOpen}
                    onClose={closePostDetailsModal}
                    user={user}
                    postId={openPostDetails.postId}
                    initialIndex={openPostDetails.currentImageIndex}
                />
            }
        </div>
    );
};

export default NewsFeed;
