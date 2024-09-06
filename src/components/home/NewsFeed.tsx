'use client'

import { deleteLike, deleteSave, postComment, postLike, postSave, postShare } from '@/actions/postInteraction';
import Image from 'next/image';
import React, { useState } from 'react';
import { BiBookmarkAlt, BiCommentDetail, BiLike, BiShare, BiSolidBookmarkAlt, BiSolidLike } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import CommentSection from './post-interaction/CommentSection';
import AllComments from './post-interaction/AllComments';
import { setComments } from '@/redux/commentSlice';
import { CiMenuKebab } from 'react-icons/ci';
import EditAndDeletePost from './posting/EditAndDeletePost';
import { updatePostOnInteraction } from '@/redux/postSlice';
import AllLikes from './post-interaction/AllLikes';
import ShareModal from './posting/ShareModal';
import PostDetailsModal from './PostDetailsModal';

const NewsFeed = ({ posts }) => {
    const dispatch = useDispatch();
    const user = useSelector((state: any) => state.user.user);
    const [expandedPosts, setExpandedPosts] = useState({});
    const [openEditDeleteModal, setOpenEditDeleteModal] = useState({});
    const [openLike, setOpenLike] = useState({ isOpen: false, postId: null });
    const [openComment, setOpenComment] = useState({});
    const [openShare, setOpenShare] = useState({ isOpen: false, post: null });
    const [openPostDetails, setOpenPostDetails] = useState({ isOpen: false, user: null, post: null, currentImageIndex: 0 });

    // Post Details
    const openPostDetailsModal = (post, index) => {
        setOpenPostDetails({ isOpen: true, user, post, currentImageIndex: index });
    };

    const closePostDetailsModal = () => {
        setOpenPostDetails({ isOpen: false, user: null, post: null, currentImageIndex: 0 });
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

    // like
    const toggleOpenLike = (postId) => {
        setOpenLike({ isOpen: !openLike.isOpen, postId });
    }

    const handleLikeToggle = async (post) => {
        if (!user._id) return;

        try {
            let updatedPost;
            if (post.isLiked) {
                // Unlike the post
                const response = await deleteLike(post._id, post.likeId);
                updatedPost = { ...response.post, isLiked: false, likeId: null };
            } else {
                // Like the post
                const response = await postLike(post._id, user._id);
                updatedPost = { ...response.post, isLiked: true, likeId: response.like._id };
            }

            dispatch(updatePostOnInteraction(updatedPost));

            if (openPostDetails.isOpen && openPostDetails.post._id === post._id) {
                setOpenPostDetails((prevState) => ({
                    ...prevState,
                    post: {
                        ...updatedPost,
                        isSaved: prevState.post.isSaved,
                        saveId: prevState.post.saveId,
                    },
                }));
            }
        } catch (error) {
            console.error("Error toggling like:", error);
        }
    };

    // comment
    const toggleOpenComment = (postId) => {
        setOpenComment((prevState) => {
            const isClosing = prevState[postId];
            if (isClosing) {
                dispatch(setComments({ postId, comments: [] }));
            }
            return {
                ...prevState,
                [postId]: !prevState[postId],
            };
        });
    };

    // share
    const toggleOpenShare = (post) => {
        setOpenShare({ isOpen: !openShare.isOpen, post });
    }

    // save
    const handleSaveToggle = async (post) => {
        if (!user._id) return;

        try {
            let updatedPost;
            if (post.isSaved) {
                // Unsave the post
                const response = await deleteSave(post._id, post.saveId);
                updatedPost = { ...response.post, isSaved: false, saveId: null };
            } else {
                // Save the post
                const response = await postSave(post._id, user._id);
                updatedPost = { ...response.post, isSaved: true, saveId: response.save._id };
            }

            dispatch(updatePostOnInteraction(updatedPost));

            if (openPostDetails.isOpen && openPostDetails.post._id === post._id) {
                setOpenPostDetails((prevState) => ({
                    ...prevState,
                    post: {
                        ...updatedPost,
                        isLiked: prevState.post.isLiked,
                        likeId: prevState.post.likeId,
                        likesCount: prevState.post.likesCount
                    },
                }));
            }
        } catch (error) {
            console.error("Error toggling save:", error);
        }
    };

    return (
        <div className='space-y-4'>
            {Array.isArray(posts) &&
                posts?.map((post, index) => (
                    <div key={index} className='bg-white border border-gray-300 rounded-lg '>
                        <div className=' flex items-start justify-between p-3'>
                            <div className='flex gap-2'>
                                <Image
                                    src={post.userId.profileImage}
                                    alt={post.fullName}
                                    className="rounded-full border-2 border-white w-14 h-14 object-cover object-center"
                                    width={48}
                                    height={48}
                                />
                                <div>
                                    <h1 className='font-semibold'>{post.userId.fullName}</h1>
                                    <p className='text-xs mt-2'>{post.timestamp.slice(0, 10)}</p>
                                </div>
                            </div>
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

                        <div className='mt-2 p-3'>
                            <p>{renderContent(post.content, index)}</p>
                        </div>

                        {/* Display media files */}
                        {post.media && post.media.length > 0 && (
                            <div className="grid grid-cols-2 p-3 w-full">
                                {post.media.slice(0, 4).map((mediaUrl, mediaIndex) => (
                                    <div key={mediaIndex} className="relative w-full cursor-pointer" onClick={() => openPostDetailsModal(post, mediaIndex)}>
                                        <Image
                                            src={mediaUrl}
                                            alt={`Media ${mediaIndex}`}
                                            className="border-2 border-white object-cover object-center"
                                            width={1000}
                                            height={1000}
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

                        {/* interaction section */}
                        <div>
                            <div className=' text-xs flex items-center justify-end gap-2 text-gray-500 px-3 py-1'>
                                <p onClick={() => toggleOpenLike(post._id)} className=' cursor-pointer hover:text-sky-500 hover:underline'>{post.likesCount} {post.likesCount > 1 ? 'Likes' : 'Like'}</p><p className=' font-bold'>.</p>
                                <p onClick={() => toggleOpenComment(post._id)} className=' cursor-pointer hover:text-sky-500 hover:underline'>{post.commentsCount} {post.likesCount > 1 ? 'Comments' : 'Comment'}</p><p className=' font-bold'>.</p>
                                <p className=' cursor-pointer hover:text-sky-500 hover:underline'>{post.sharesCount} {post.likesCount > 1 ? 'Shares' : 'Share'}</p>
                            </div>
                            <div className='flex justify-evenly'>
                                {/* Like */}
                                <button onClick={() => handleLikeToggle(post)} className='hover:bg-gray-200 p-2 flex items-center justify-center gap-1 text-sm'>
                                    {post.isLiked ? <BiSolidLike size={22} className="text-black" /> : <BiLike size={22} />}
                                </button>

                                {/* Comment */}
                                <button onClick={() => toggleOpenComment(post._id)} className='hover:bg-gray-200 p-2 flex items-center justify-center gap-1 text-sm'>
                                    <BiCommentDetail size={22} />
                                </button>

                                {/* Share */}
                                <button onClick={() => toggleOpenShare(post)} className='hover:bg-gray-200 p-2 flex items-center justify-center gap-1 text-sm'>
                                    <BiShare style={{ transform: "scaleX(-1)" }} size={22} />
                                </button>

                                {/* Save */}
                                <button onClick={() => handleSaveToggle(post)} className='hover:bg-gray-200 p-2 flex items-center justify-center gap-1 text-sm'>
                                    {post.isSaved ? <BiSolidBookmarkAlt size={22} className=' text-black' /> : <BiBookmarkAlt size={22} />}
                                </button>
                            </div>
                        </div>

                        {/* comment section */}
                        {
                            openComment[post._id] &&
                            <div>
                                <CommentSection user={user} postId={post._id} />
                                <AllComments user={user} postId={post._id} openComment={openComment} />
                            </div>
                        }
                    </div>
                ))
            }


            {openPostDetails.isOpen &&
                <PostDetailsModal
                    isOpen={openPostDetails.isOpen}
                    onClose={closePostDetailsModal}
                    user={user}
                    post={openPostDetails.post}
                    initialIndex={openPostDetails.currentImageIndex}
                    handleLikeToggle={handleLikeToggle}
                    toggleOpenShare={toggleOpenShare}
                    handleSaveToggle={handleSaveToggle}
                />
            }
            {openLike.isOpen &&
                <AllLikes openLike={openLike.isOpen} toggleOpenLike={toggleOpenLike} postId={openLike.postId} />
            }
            {openShare.isOpen &&
                <ShareModal openShare={openShare.isOpen} toggleOpenShare={toggleOpenShare} post={openShare.post} userId={user._id} />
            }
        </div>
    );
};

export default NewsFeed;
