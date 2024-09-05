'use client'

import { postComment, postLike, postSave, postShare } from '@/actions/postInteraction';
import Image from 'next/image';
import React, { useState } from 'react';
import { BiBookmarkAlt, BiCommentDetail, BiLike, BiShare } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import CommentSection from './post-interaction/CommentSection';
import toast from 'react-hot-toast';
import AllComments from './post-interaction/AllComments';
import { setComments } from '@/redux/commentSlice';
import { CiMenuKebab } from 'react-icons/ci';
import EditAndDeletePost from './posting/EditAndDeletePost';

const NewsFeed = ({ posts }) => {
    const dispatch = useDispatch();
    const user = useSelector((state: any) => state.user.user);
    const [expandedPosts, setExpandedPosts] = useState({});
    const [openComment, setOpenComment] = useState({});
    const [openEditDeleteModal, setOpenEditDeleteModal] = useState({});

    const toggleEditDeleteModal = (postId) => {
        setOpenEditDeleteModal((prevState) => ({
            ...prevState,
            [postId]: !prevState[postId],
        }));
    };

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

    const handlePostLike = (postId) => {
        if (user._id) {
            postLike(postId, user._id)
        }
    }

    const handlePostShare = (postId) => {
        if (user._id) {
            postShare(postId, user._id)
                .then(() => {
                    toast.success('Post shared');
                })
        }
    }

    const handlePostSave = (postId) => {
        if (user._id) {
            postSave(postId, user._id);
        }
    }

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

                        <div>
                            <Image
                                src='/assets/bg.jpg'
                                alt='image loading...'
                                className="border-2 border-white w-full h-96 object-cover object-center"
                                width={1000}
                                height={1000}
                            />
                        </div>

                        {/* interaction section */}
                        {/* TODO: singular plural has to be defined */}
                        <div>
                            <div className=' text-xs flex items-center justify-end gap-2 text-gray-500 px-3 py-1'>
                                <p className=' cursor-pointer hover:text-sky-500 hover:underline'>{post.likesCount} {post.likesCount > 1 ? 'Likes' : 'Like'}</p><p className=' font-bold'>.</p>
                                <p onClick={() => toggleOpenComment(post._id)} className=' cursor-pointer hover:text-sky-500 hover:underline'>{post.commentsCount} {post.likesCount > 1 ? 'Comments' : 'Comment'}</p><p className=' font-bold'>.</p>
                                <p className=' cursor-pointer hover:text-sky-500 hover:underline'>{post.sharesCount} {post.likesCount > 1 ? 'Shares' : 'Share'}</p>
                            </div>
                            <div className=' flex justify-evenly'>
                                <button onClick={() => handlePostLike(post._id)} className=' hover:bg-gray-200 p-2 flex items-center gap-1 text-sm'>
                                    <BiLike size={20} />Like
                                </button>
                                <button onClick={() => toggleOpenComment(post._id)} className=' hover:bg-gray-200 p-2 flex items-center gap-1 text-sm'>
                                    <BiCommentDetail size={20} />Comment
                                </button>
                                <button onClick={() => handlePostShare(post._id)} className=' hover:bg-gray-200 p-2 flex items-center gap-1 text-sm'>
                                    <BiShare style={{ transform: "scaleX(-1)" }} size={20} />Share
                                </button>
                                <button onClick={() => handlePostSave(post._id)} className=' hover:bg-gray-200 p-2 flex items-center gap-1 text-sm'>
                                    <BiBookmarkAlt size={20} />Save
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
        </div>
    );
};

export default NewsFeed;
