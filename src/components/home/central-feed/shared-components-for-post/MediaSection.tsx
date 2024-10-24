import { Image } from '@nextui-org/react';
import React, { useState } from 'react';
import PostDetailsModal from '../../../post-details/PostDetailsModal';

const MediaSection = ({ media, postId, user }) => {
    const [openPostDetails, setOpenPostDetails] = useState({ isOpen: false, user: null, postId: null, currentImageIndex: 0 });

    const openPostDetailsModal = (postId, index) => {
        setOpenPostDetails({ isOpen: true, user, postId, currentImageIndex: index });
    };

    const closePostDetailsModal = () => {
        setOpenPostDetails({ isOpen: false, user: null, postId: null, currentImageIndex: 0 });
    }

    return (
        <div>
            {media && media.length > 0 && (
                // <div className={media.length === 1 ? "grid grid-cols-1 w-full" : "grid grid-cols-2 w-full"}>
                <div className={media.length > 3 ? "grid grid-cols-2 w-full" : "flex w-full"}>
                    {media.slice(0, 4).map((mediaUrl, mediaIndex) => (
                        <div key={mediaIndex} className="relative w-full cursor-pointer" onClick={() => openPostDetailsModal(postId, mediaIndex)}>
                            <Image
                                src={mediaUrl}
                                alt={`Media ${mediaIndex}`}
                                className="border-2 border-white object-cover object-center rounded-none"
                                style={{ aspectRatio: '1 / 1' }}
                            />
                            {mediaIndex === 3 && media.length > 4 && (
                                <div className="absolute inset-0 z-[40] bg-black bg-opacity-50 flex items-center justify-center text-white text-xl">
                                    +{media.length - 4}
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
    );
};

export default MediaSection;