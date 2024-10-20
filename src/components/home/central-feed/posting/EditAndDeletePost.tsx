import React, { useState } from 'react';
import PostModal from './PostModal';
import ShareModal from './ShareModal';
import ConfirmationModal from '@/shared/ConfirmationModal';
import { deletePost } from '@/apiFunctions/postData';
import { useDispatch } from 'react-redux';
import { removePost, updatePostOnInteraction } from '@/redux/postSlice';
import toast from 'react-hot-toast';
import { useEdgeStore } from '../../../../edgestore/edgestore';

const EditAndDeletePost = ({ onEditDeleteClose, post, userId }) => {
    const dispatch = useDispatch();
    const [isPostModalOpen, setIsPostModalOpen] = useState(false);
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [postToDelete, setPostToDelete] = useState(null);
    const { edgestore } = useEdgeStore();

    const confirmDeletePost = (postId) => {
        setPostToDelete(postId);
        setShowDeleteModal(true);
    };

    const handleDeletePost = async () => {
        if (postToDelete) {
            try {
                const response = await deletePost(post._id);
                if (response) {
                    if (response.sharedPostId) {
                        dispatch(updatePostOnInteraction(response.sharedPostId));
                    } else {
                        dispatch(updatePostOnInteraction(response._id));
                    }

                    dispatch(removePost(post._id));

                    for (const url of post.media) {
                        try {
                            await edgestore.publicFiles.delete({ url });
                            console.log('Deleted media:', url);
                        } catch (error) {
                            console.error('Failed to delete media:', url, error);
                        }
                    }

                    toast.success('Post deleted');
                }
            } catch (error) {
                console.error('Error deleting post:', error);
            } finally {
                setShowDeleteModal(false);
                setPostToDelete(null);
            }
        }
    };

    const closePostModal = () => {
        setIsPostModalOpen(false);
        onEditDeleteClose();
    };

    const closeShareModal = () => {
        setIsShareModalOpen(false);
        onEditDeleteClose();
    };

    const handleEditPost = () => {
        if (post.sharedPostId) {
            setIsShareModalOpen(true);
        } else {
            setIsPostModalOpen(true);
        }
    };

    return (
        <>
            <div className="absolute right-0 mt-2 flex flex-col items-start text-sm bg-white border shadow-lg rounded-lg ">
                <button onClick={handleEditPost} className='hover:bg-gray-200 py-2 px-3 w-full text-left'>Edit</button>
                <button onClick={() => confirmDeletePost(post._id)} className='hover:bg-gray-200 py-2 px-3 w-full text-left'>Delete</button>
            </div>

            {/* Post Modal for regular posts */}
            <PostModal
                isOpen={isPostModalOpen}
                onClose={closePostModal}
                post={post}
                isEditing={true}
            />

            {/* Share Modal for shared posts */}
            <ShareModal
                openShare={isShareModalOpen}
                toggleOpenShare={closeShareModal}
                post={post}
                userId={userId}
                isEditing={true}
            />

            <ConfirmationModal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleDeletePost}
                title="Delete Post?"
                message="Are you sure you want to delete this post? This action cannot be undone."
                confirmLabel="Delete"
                cancelLabel="Cancel"
            />
        </>
    );
};

export default EditAndDeletePost;
