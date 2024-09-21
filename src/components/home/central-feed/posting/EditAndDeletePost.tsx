import React, { useState } from 'react';
import PostModal from './PostModal';
import ConfirmationModal from '@/shared/ConfirmationModal';
import { deletePost } from '@/actions/postData';
import { useDispatch } from 'react-redux';
import { removePost, updatePostOnInteraction } from '@/redux/postSlice';
import toast from 'react-hot-toast';

const EditAndDeletePost = ({ onEditDeleteClose, post }) => {
    const dispatch = useDispatch();
    const [isPostModalOpen, setIsPostModalOpen] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [postToDelete, setPostToDelete] = useState(null);

    const confirmDeletePost = (postId) => {
        setPostToDelete(postId);
        setShowDeleteModal(true);
    };

    const handleDeletePost = async () => {
        if (postToDelete) {

            try {
                deletePost(post._id)
                    .then((response) => {
                        if (response) {

                            if (response.sharedPostId) {
                                dispatch(updatePostOnInteraction(response.sharedPostId));
                            }
                            else {
                                dispatch(updatePostOnInteraction(response._id));
                            }
                            dispatch(removePost(post._id));
                        }
                    })
            }
            catch (error) {
                console.error('Error deleting post:', error);
            }
            finally {
                setShowDeleteModal(false);
                setPostToDelete(null);
                toast.success('Post deleted')
            }
        }
    };

    const closePostModal = () => {
        setIsPostModalOpen(false);
        onEditDeleteClose();
    };

    const handleEditPost = () => {
        setIsPostModalOpen(true);
    };

    return (
        <>
            <div className="absolute right-0 mt-2 z-[60] flex flex-col items-start text-sm bg-white border shadow-lg rounded-lg ">
                <button onClick={handleEditPost} className='hover:bg-gray-200 py-2 px-3 w-full text-left'>Edit</button>
                <button onClick={confirmDeletePost} className='hover:bg-gray-200 py-2 px-3 w-full text-left'>Delete</button>
            </div>

            <PostModal
                isOpen={isPostModalOpen}
                onClose={closePostModal}
                post={post}
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
