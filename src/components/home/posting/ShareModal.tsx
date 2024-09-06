import { postShare } from '@/actions/postInteraction';
import { updatePostOnInteraction } from '@/redux/postSlice';
import Image from 'next/image';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { MdClose } from 'react-icons/md';
import { useDispatch } from 'react-redux';

const ShareModal = ({ openShare, toggleOpenShare, post, userId }) => {
    const dispatch = useDispatch();
    const [caption, setCaption] = useState("");

    const handleShare = () => {
        if (userId && post) {
            postShare(post._id, userId, caption)
                .then((response) => {
                    dispatch(updatePostOnInteraction(response.post));
                    toast.success('Post shared');
                    toggleOpenShare();
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
                    <div className="bg-white w-11/12 max-w-2xl h-3/4 p-6 rounded-lg relative flex flex-col space-y-4">
                        <button
                            onClick={toggleOpenShare}
                            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                        >
                            <MdClose size={24} />
                        </button>

                        <h2 className="text-lg font-bold">Share Post</h2>

                        {/* Caption input */}
                        <textarea
                            value={caption}
                            onChange={(e) => setCaption(e.target.value)}
                            className="w-full max-h-44 min-h-44 p-2 outline-none"
                            rows={4}
                            placeholder="Add a caption..."
                        />

                        {/* Display the post being shared */}
                        <div className="border border-gray-300 rounded-lg p-4">
                            <div className="flex gap-2 items-center">
                                <Image
                                    src={post.userId.profileImage}
                                    alt={post.userId.fullName}
                                    className="rounded-full w-10 h-10 object-cover object-center"
                                    width={40}
                                    height={40}
                                />
                                <div>
                                    <h1 className="font-semibold">{post.userId.fullName}</h1>
                                    <p className="text-xs">{post.timestamp.slice(0, 10)}</p>
                                </div>
                            </div>

                            <p className="mt-4">{post.content}</p>

                            {/* Media files with scroll if overflow */}
                            {post.media && post.media.length > 0 && (
                                <div className="mt-4 max-h-64 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                                    {post.media.map((mediaUrl, mediaIndex) => (
                                        <div key={mediaIndex} className="relative w-full cursor-pointer" >
                                            <Image
                                                src={mediaUrl}
                                                alt={`Media ${mediaIndex}`}
                                                className="border-2 border-white object-cover object-center"
                                                width={1000}
                                                height={1000}
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
                            className="bg-sky-500 text-white rounded-lg py-2 px-4 hover:bg-sky-600 self-end"
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
