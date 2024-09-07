import { Image } from '@nextui-org/react';
import React, { useState } from 'react';
import PostDetailsModal from './post-details/PostDetailsModal';

const SharedPostContent = ({ user, sharedPostContent: post }) => {
    const [openPostDetails, setOpenPostDetails] = useState({ isOpen: false, user: null, postId: null, currentImageIndex: 0 });

    // Post Details
    const openPostDetailsModal = (postId, index) => {
        setOpenPostDetails({ isOpen: true, user, postId, currentImageIndex: index });
    };

    const closePostDetailsModal = () => {
        setOpenPostDetails({ isOpen: false, user: null, postId: null, currentImageIndex: 0 });
    }

    // Content
    const renderContent = (content) => {
        const words = content.split(' ');

        if (words.length > 20) {
            return (
                <>
                    {words.slice(0, 20).join(' ') + '...'}
                    <span
                        onClick={() => openPostDetailsModal(post._id, 0)}
                        className="text-blue-500 cursor-pointer ml-1"
                    >
                        {'Read more'}
                    </span>
                </>
            );
        }
        return content;
    };

    return (
        <>
            <div>
                <div className='border-b-0 border border-gray-300 rounded-t-lg p-2 m-4 mb-0'>
                    {/* User details */}
                    <div className='flex gap-2 '>
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

                    {/* Content */}
                    <div className='mt-2 p-3'>
                        <p>{renderContent(post.content)}</p>
                    </div>
                </div>

                {/* Display media files */}
                {post.media && post.media.length > 0 && (
                    <div className="grid grid-cols-2 w-full">
                        {post.media.slice(0, 4).map((mediaUrl, mediaIndex) => (
                            <div key={mediaIndex} className="relative w-full cursor-pointer" onClick={() => openPostDetailsModal(post._id, mediaIndex)}>
                                <Image
                                    src={mediaUrl}
                                    alt={`Media ${mediaIndex}`}
                                    className=" rounded-none border-2 border-white object-cover object-center"
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
        </>
    );
};

export default SharedPostContent;