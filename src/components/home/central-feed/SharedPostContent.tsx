import React, { useState } from 'react';
import PostDetailsModal from './post-details/PostDetailsModal';
import UserInfoSection from './shared-components-for-post/UserInfoSection';
import MediaSection from './shared-components-for-post/MediaSection';

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
                <div className='border-b-0 border border-gray-300 rounded-t-lg m-4 mb-0'>
                    {/* User details */}
                    <UserInfoSection profileImage={post.userId.profileImage} fullName={post.userId.fullName} updatedAt={post.updatedAt.slice(0, 10)} />

                    {/* Content */}
                    <div className='p-3'>
                        <p>{renderContent(post.content)}</p>
                    </div>
                </div>

                {/* Display media files */}
                <MediaSection media={post.media} postId={post._id} user={user} />

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