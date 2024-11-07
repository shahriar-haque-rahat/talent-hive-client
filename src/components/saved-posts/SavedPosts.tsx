import { deleteSave, getSaves } from '@/apiFunctions/postInteraction';
import React, { useEffect, useState } from 'react';
import { MdClose } from 'react-icons/md';
import UserInfoSection from '../shared/UserInfoSection';
import ContentSection from '../home/central-feed/shared-components-for-post/ContentSection';
import SharedPostContent from '../home/central-feed/SharedPostContent';
import { useSelector } from 'react-redux';
import MediaSection from '../home/central-feed/shared-components-for-post/MediaSection';
import { BiSolidBookmarkAlt } from 'react-icons/bi';
import ConfirmationModal from '@/components/shared/ConfirmationModal';
import { Image, Modal, ModalBody, ModalContent, ModalHeader } from '@nextui-org/react';

const SavedPosts = ({ userId, openSaveList, setOpenSaveList }) => {
    const user = useSelector((state) => state.user.user);
    const [savedPosts, setSavedPosts] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedSave, setSelectedSave] = useState({ saveId: '' });

    const handleGetSaves = async () => {
        const res = await getSaves(userId);
        if (res) {
            setSavedPosts(res.saves);
        }
    };

    const handleRemoveSavePost = async () => {
        const { saveId } = selectedSave;
        await deleteSave(saveId);
        setSavedPosts((prev) => prev.filter((post) => post._id !== saveId));
        setShowDeleteModal(false);
    };

    useEffect(() => {
        if (userId) {
            handleGetSaves();
        }
    }, [userId, openSaveList]);

    if (!openSaveList) return null;

    return (
        <>
            <Modal
                size='5xl'
                isOpen={openSaveList}
                onOpenChange={setOpenSaveList}
                className='bg-white w-full md:w-1/2 max-w-2xl md:p-6 rounded-lg '
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader>All Saves</ModalHeader>
                            <ModalBody>
                                <div>
                                    <div className="flex flex-col h-[60vh] md:h-[80vh] overflow-y-scroll flex-1">
                                        {savedPosts.length > 0 &&
                                            savedPosts.map((post, index) => (
                                                <>
                                                    {post.postId ?
                                                        <div key={index} className="relative bg-white border border-gray-300 rounded-lg mt-6 pb-6" >
                                                            <div
                                                                onClick={() => {
                                                                    setSelectedSave({ saveId: post._id });
                                                                    setShowDeleteModal(true);
                                                                }}
                                                                className="absolute top-2 right-2 cursor-pointer"
                                                            >
                                                                <BiSolidBookmarkAlt size={24} />
                                                            </div>

                                                            <div className="flex items-start justify-between p-3">
                                                                <UserInfoSection
                                                                    userId={post.postId.userId._id}
                                                                    profileImage={post.postId.userId.profileImage}
                                                                    fullName={post.postId.userId.fullName}
                                                                    createdAt={post.postId.createdAt}
                                                                />
                                                            </div>

                                                            <ContentSection content={post.postId.content} index={index} />

                                                            <MediaSection
                                                                media={post.postId.media}
                                                                postId={post.postId._id}
                                                                user={user}
                                                            />

                                                            {post.postId.sharedPostId && post.postId.sharedPostId !== '' && (
                                                                <SharedPostContent
                                                                    user={user}
                                                                    sharedPostContent={post.postId.sharedPostId}
                                                                />
                                                            )}
                                                        </div>
                                                        :
                                                        <div className="relative border border-gray-300 rounded-lg mt-6 bg-white p-4">
                                                            <div
                                                                onClick={() => {
                                                                    setSelectedSave({ saveId: post._id });
                                                                    setShowDeleteModal(true);
                                                                }}
                                                                className="absolute top-2 right-2 cursor-pointer"
                                                            >
                                                                <BiSolidBookmarkAlt size={24} />
                                                            </div>

                                                            <div className="flex items-center space-x-4">
                                                                <div className="w-12 h-12 rounded-full bg-gray-300"></div>
                                                                <div>
                                                                    <p className="text-gray-800 font-semibold">Unavailable Content</p>
                                                                    <p className="text-gray-600 text-sm">This content is unavailable right now.</p>
                                                                </div>
                                                            </div>
                                                            <div className="mt-4">
                                                                <p className="text-gray-500 text-sm">It looks like this content has been removed or is not accessible.</p>
                                                            </div>
                                                        </div>
                                                    }
                                                </>
                                            ))}
                                        {savedPosts.length === 0 && (
                                            <p className="w-full text-center">There are no saved posts</p>
                                        )}
                                    </div>
                                </div>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>

            <ConfirmationModal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleRemoveSavePost}
                title="Remove Saved Post?"
                message="Are you sure you want to remove this post? This action cannot be undone."
                confirmLabel="Remove"
                cancelLabel="Cancel"
            />
        </>
    );
};

export default SavedPosts;
