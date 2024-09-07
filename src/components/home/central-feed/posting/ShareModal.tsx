import { createPost } from '@/actions/postData';
import { addPost, updatePostOnInteraction } from '@/redux/postSlice';
import { Image } from '@nextui-org/react';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { MdClose } from 'react-icons/md';
import { useDispatch } from 'react-redux';

const ShareModal = ({ openShare, toggleOpenShare, post, userId }) => {
    const dispatch = useDispatch();
    const [content, setContent] = useState("");
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

    const handleShare = () => {
        if (userId && post) {
            const sharePostData = {
                userId,
                sharedPostId: post._id,
                content
            }
            createPost(sharePostData)
                .then((response) => {
                    if (response) {
                        dispatch(addPost({ postData: response }));
                        dispatch(updatePostOnInteraction(response.sharedPostId));
                        toast.success('Successfully Post Shared');
                        toggleOpenShare();
                    }
                })
                .catch(() => {
                    toast.error('Failed to share post');
                });
        }
    };

    if (!openShare) return null;

    return (
        <>
            {openShare && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[60]">
                    <div className="bg-white w-11/12 max-w-2xl h-3/4 p-6 rounded-lg relative flex flex-col">
                        <button
                            onClick={toggleOpenShare}
                            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                        >
                            <MdClose size={24} />
                        </button>

                        <h2 className="text-xl font-semibold mb-4">Share Post</h2>

                        {/* content input */}
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="w-full max-h-44 min-h-44 p-2 outline-none"
                            rows={4}
                            placeholder="Add a content..."
                        />

                        {/* Display the post being shared */}
                        <div className="border border-gray-300 rounded-lg p-4 overflow-y-scroll">
                            <div className="flex gap-2 items-center">
                                <Image
                                    src={post.userId.profileImage}
                                    alt={post.userId.fullName}
                                    className="rounded-full w-10 h-10 object-cover object-center"
                                />
                                <div>
                                    <h1 className="font-semibold">{post.userId.fullName}</h1>
                                    <p className="text-xs">{post.timestamp.slice(0, 10)}</p>
                                </div>
                            </div>

                            <p className="mt-4">{renderContent(post.content)}</p>

                            {/* Media files with scroll if overflow */}
                            {post.media && post.media.length > 0 && (
                                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                                    {post.media.map((mediaUrl, mediaIndex) => (
                                        <div key={mediaIndex} className="relative w-full cursor-pointer" >
                                            <Image
                                                src={mediaUrl}
                                                alt={`Media ${mediaIndex}`}
                                                className=" rounded-none border-2 border-white object-cover object-center"
                                                style={{ aspectRatio: '1 / 1' }}
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Share button */}
                        <button
                            onClick={handleShare}
                            className="bg-sky-500 text-white rounded-lg mt-4 py-2 px-4 hover:bg-sky-600 self-end"
                        >
                            Share
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default ShareModal;
