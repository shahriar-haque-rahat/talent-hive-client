import React, { useState, useEffect } from 'react';
import { MdClose, MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';
import { BiBookmarkAlt, BiCommentDetail, BiLike, BiShare, BiSolidBookmarkAlt, BiSolidLike } from 'react-icons/bi';
import { Image } from '@nextui-org/react';
import CommentSection from './post-interaction/CommentSection';
import AllComments from './post-interaction/AllComments';

const PostDetailsModal = ({ isOpen, onClose, user, post, initialIndex, handleLikeToggle, toggleOpenShare, handleSaveToggle }) => {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);
    const [expandedPosts, setExpandedPosts] = useState(false);

    // Content
    const toggleReadMore = () => {
        setExpandedPosts((prevExpanded) => !prevExpanded);
    };

    const renderContent = (content) => {
        const words = content.split(' ');
        const isExpanded = expandedPosts;

        if (words.length > 20) {
            return (
                <>
                    {isExpanded ? content : words.slice(0, 20).join(' ') + '...'}
                    <span
                        onClick={() => toggleReadMore()}
                        className="text-blue-500 cursor-pointer ml-1"
                    >
                        {isExpanded ? 'Show less' : 'Read more'}
                    </span>
                </>
            );
        }
        return content;
    };

    useEffect(() => {
        if (isOpen) {
            setCurrentIndex(initialIndex);
        } else {
            setCurrentIndex(0);
        }
    }, [isOpen, initialIndex]);

    const handlePrev = () => {
        if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
    };

    const handleNext = () => {
        if (currentIndex < post.media.length - 1) setCurrentIndex(currentIndex + 1);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[60]">
            <div className="bg-white w-full min-h-[90vh] max-h-[90vh] md:max-h-[80vh] md:p-2 rounded-lg relative flex flex-col md:flex-row overflow-hidden">

                {/* Left Section: Media Slideshow */}
                <div className="flex-[2] flex items-center justify-between bg-black bg-opacity-90 p-2 relative">
                    <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 md:hidden">
                        <MdClose size={24} />
                    </button>

                    <button
                        onClick={handlePrev}
                        className="disabled:opacity-50 text-white"
                        disabled={currentIndex === 0}
                    >
                        <MdArrowBackIos size={20} />
                    </button>

                    <div className="flex-grow flex justify-center">
                        <Image
                            src={post.media[currentIndex]}
                            alt={`Media ${currentIndex + 1}`}
                            className="rounded-lg object-cover"
                        />
                    </div>

                    <button
                        onClick={handleNext}
                        className="disabled:opacity-50 text-white"
                        disabled={currentIndex === post.media.length - 1}
                    >
                        <MdArrowForwardIos size={20} />
                    </button>
                </div>

                {/* Right Section: Post Details */}
                <div className="flex-[1] bg-gray-100 p-4 pt-0 overflow-y-auto">
                    <div className="sticky top-0 bg-gray-100 z-10 pb-2 pt-4">
                        <div className="h-12 flex justify-between items-start">
                            {/* User Info */}
                            <div className="flex items-center gap-2">
                                <Image
                                    src={post.userId.profileImage}
                                    alt={post.userId.fullName}
                                    className="rounded-full border-2 border-white w-14 h-14 object-cover object-center"
                                    width={48}
                                    height={48}
                                />
                                <div>
                                    <h1 className="font-semibold">{post.userId.fullName}</h1>
                                    <p className="text-xs mt-2">{post.timestamp.slice(0, 10)}</p>
                                </div>
                            </div>
                            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 hidden md:block">
                                <MdClose size={24} />
                            </button>
                        </div>
                    </div>

                    {/* Scrollable content */}
                    <div className="my-4">
                        {/* Post Content */}
                        <p>{renderContent(post.content)}</p>

                        {/* Interaction Counts */}
                        <div className=' text-xs flex items-center justify-end gap-2 text-gray-500 px-3 py-1'>
                            <p className=' cursor-pointer hover:text-sky-500 hover:underline'>{post.likesCount} {post.likesCount > 1 ? 'Likes' : 'Like'}</p><p className=' font-bold'>.</p>
                            <p className=' cursor-pointer hover:text-sky-500 hover:underline'>{post.commentsCount} {post.likesCount > 1 ? 'Comments' : 'Comment'}</p><p className=' font-bold'>.</p>
                            <p className=' cursor-pointer hover:text-sky-500 hover:underline'>{post.sharesCount} {post.likesCount > 1 ? 'Shares' : 'Share'}</p>
                        </div>

                        {/* Interaction Buttons */}
                        <div className='flex justify-evenly'>
                            {/* Like */}
                            <button onClick={() => handleLikeToggle(post)} className='hover:bg-gray-200 p-2 flex items-center justify-center gap-1 text-sm'>
                                {post.isLiked ? <BiSolidLike size={22} className="text-black" /> : <BiLike size={22} />}
                            </button>

                            {/* Comment */}
                            <button className='hover:bg-gray-200 p-2 flex items-center justify-center gap-1 text-sm'>
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

                        {/* Comment Section */}
                        <CommentSection user={user} postId={post._id} />
                        <AllComments user={user} postId={post._id} openComment={isOpen} />
                    </div>
                </div>

            </div>
        </div>
    );
};

export default PostDetailsModal;