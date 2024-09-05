import React, { useState, FormEventHandler, useContext, useEffect } from 'react';
import { MdPermMedia, MdArticle, MdClose } from 'react-icons/md';
import AddMediaModal from './AddMediaModal';
import { AuthContext } from '@/provider/AuthProvider';
import toast from 'react-hot-toast';
import ConfirmationModal from '@/shared/ConfirmationModal';
import { createPost, updatePost } from '@/actions/postData';
import { useDispatch } from 'react-redux';
import { addPost, editPost } from '@/redux/postSlice';

const PostModal = ({ isOpen, onClose, post }) => {
    const dispatch = useDispatch();
    const { user } = useContext(AuthContext);
    const [content, setContent] = useState('');
    const [media, setMedia] = useState([]);
    const [isAddMediaModalOpen, setIsAddMediaModalOpen] = useState(false);
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

    useEffect(() => {
        if (post) {
            setContent(post.content || '');
            setMedia(post.media || []);
        }
    }, [post]);

    const handleAddMedia = (uploadedMedia) => {
        setMedia(uploadedMedia);
    };

    const handleDiscard = () => {
        setContent('');
        setMedia([]);
        onClose();
        setIsConfirmationModalOpen(false);
    };

    const handleClose = () => {
        if (content || media.length > 0) {
            setIsConfirmationModalOpen(true);
        } else {
            onClose();
        }
    };

    const handleSubmit: FormEventHandler = (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('content', content);
        media.forEach((file, index) => formData.append(`media[${index}]`, file));

        const postData = {
            userId: user?._id,
            content: formData.get('content'),
            media: media.map((file) => (file.name ? file.name : file)),
        };

        if (post) {
            updatePost(post._id, postData)
                .then((response) => {
                    if (response) {
                        dispatch(editPost({ postId: post._id, editedData: response }));
                        toast.success('Post updated successfully');
                    }
                })
                .catch((error) => {
                    console.error('Error updating post:', error);
                    toast.error('Failed to update post');
                });
        } else {
            createPost(postData)
                .then((response) => {
                    if (response) {
                        const { _id } = response;
                        dispatch(addPost({ postData: response }));
                        toast.success('Successfully Posted');
                    }
                })
                .catch((error) => {
                    console.error('Error posting:', error);
                    toast.error('Failed to post');
                });
        }

        handleDiscard();
    };

    if (!isOpen) return null;

    return (
        <>
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[60]">
                <div className="bg-white w-11/12 max-w-2xl h-3/4 p-6 rounded-lg relative flex flex-col">
                    <button
                        onClick={handleClose}
                        className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                    >
                        <MdClose size={24} />
                    </button>

                    <h2 className="text-xl font-semibold mb-4">{post ? 'Edit Post' : 'Create a Post'}</h2>

                    <form onSubmit={handleSubmit} className="flex-grow flex flex-col">
                        <textarea
                            className="flex-grow w-full p-2 border border-gray-300 rounded-md focus:outline-none resize-none overflow-auto mb-4"
                            placeholder="Add a content..."
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        ></textarea>

                        <div className="grid grid-cols-3 gap-4 mb-4">
                            {media.map((file, index) => (
                                <img
                                    key={index}
                                    src={typeof file === 'string' ? file : URL.createObjectURL(file)}
                                    alt="uploaded preview"
                                    className="w-full h-32 object-cover rounded-md"
                                />
                            ))}
                        </div>

                        <div className="flex justify-between">
                            <div className="flex justify-start gap-4">
                                <button
                                    type="button"
                                    onClick={() => setIsAddMediaModalOpen(true)}
                                    className="flex items-center text-blue-500 hover:bg-gray-100 p-2 rounded-md"
                                >
                                    <MdPermMedia className="mr-1 text-3xl md:text-lg" />
                                    <span className='hidden md:block'>Add Media</span>
                                </button>
                                <button type="button" className="flex items-center text-orange-500 hover:bg-gray-100 p-2 rounded-md">
                                    <MdArticle className="mr-1 text-3xl md:text-lg" />
                                    <span className='hidden md:block'>Job Post</span>
                                </button>
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="px-3 py-1 border border-sky-500 bg-sky-500 text-white rounded-lg hover:bg-white hover:text-sky-500"
                                >
                                    {post ? 'Update' : 'Post'}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            <AddMediaModal
                isOpen={isAddMediaModalOpen}
                onClose={() => setIsAddMediaModalOpen(false)}
                onUpload={handleAddMedia}
            />

            <ConfirmationModal
                isOpen={isConfirmationModalOpen}
                onClose={() => setIsConfirmationModalOpen(false)}
                onConfirm={handleDiscard}
                title={post ? "Discard Changes?" : "Discard Post?"}
                message={post ? "You have unsaved changes. Are you sure you want to discard them?" : "You have unsaved changes. Are you sure you want to discard this post?"}
                confirmLabel="Discard"
                cancelLabel="Cancel"
            />
        </>
    );
};

export default PostModal;