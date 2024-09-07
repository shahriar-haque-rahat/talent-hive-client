import React, { useState, useEffect } from 'react';
import { MdClose, MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';
import { Image } from '@nextui-org/react';
import PostInteractionSection from '../post-interaction/PostInteractionSection';
import { selectPostById } from '@/redux/postSlice';
import { useSelector } from 'react-redux';

const PostDetailsModal = ({ isOpen, onClose, user, postId, initialIndex }) => {
    const post = useSelector((state) => selectPostById(state, postId));
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
                <div className="flex-[2] flex items-center justify-between bg-black bg-opacity-90 rounded-l-lg p-2 relative">
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
                <div className="flex-[1] bg-gray-100 rounded-r-lg p-4 pt-0 overflow-y-scroll">
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
                        <p className=' mb-4'>{renderContent(post.content)}</p>

                        {/* Interaction Buttons */}
                        <PostInteractionSection user={user} post={post} />
                    </div>
                </div>

            </div>
        </div>
    );
};

export default PostDetailsModal;