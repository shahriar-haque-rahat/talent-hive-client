import { deleteSave, getSaves } from '@/apiFunctions/postInteraction';
import React, { useEffect, useState } from 'react';
import { MdClose } from 'react-icons/md';
import UserInfoSection from '../home/central-feed/shared-components-for-post/UserInfoSection';
import ContentSection from '../home/central-feed/shared-components-for-post/ContentSection';
import SharedPostContent from '../home/central-feed/SharedPostContent';
import { useSelector } from 'react-redux';
import MediaSection from '../home/central-feed/shared-components-for-post/MediaSection';
import { BiSolidBookmarkAlt } from 'react-icons/bi';
import ConfirmationModal from '@/shared/ConfirmationModal';

const SavedPosts = ({ userId, openSaveList, setOpenSaveList }) => {
    const user = useSelector((state) => state.user.user);
    const [savedPosts, setSavedPosts] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedSave, setSelectedSave] = useState({ postId: '', saveId: '' });

    const handleGetSaves = async () => {
        const res = await getSaves(userId);
        if (res) {
            setSavedPosts(res.saves);
        }
    };

    const handleRemoveSavePost = async () => {
        const { postId, saveId } = selectedSave;
        await deleteSave(postId, saveId);
        setSavedPosts((prev) => prev.filter((post) => post._id !== saveId)); // Update UI after deletion
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
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[60]">
                <div className="bg-white w-1/2 max-w-2xl h-3/4 p-6 rounded-lg relative flex flex-col">
                    <button
                        onClick={() => setOpenSaveList(false)}
                        className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                    >
                        <MdClose size={24} />
                    </button>
                    <h2 className="text-xl font-bold mb-4">All Saves</h2>

                    <div className="overflow-y-scroll flex-1">
                        {savedPosts.length > 0 &&
                            savedPosts.map((post, index) => (
                                <div
                                    key={index}
                                    className="relative bg-white border border-gray-300 rounded-lg mt-10 pb-6"
                                >
                                    <div
                                        onClick={() => {
                                            setSelectedSave({ postId: post.postId._id, saveId: post._id });
                                            setShowDeleteModal(true);
                                        }}
                                        className="absolute top-2 right-2 cursor-pointer"
                                    >
                                        <BiSolidBookmarkAlt size={24} />
                                    </div>

                                    <div className="flex items-start justify-between p-3">
                                        <UserInfoSection
                                            userId={post.userId._id}
                                            profileImage={post.userId.profileImage}
                                            fullName={post.userId.fullName}
                                            createdAt={post.postId.createdAt.slice(0, 10)}
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
                            ))}
                        {savedPosts.length === 0 && (
                            <p className="w-full text-center">There are no saved posts</p>
                        )}
                    </div>
                </div>
            </div>

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
