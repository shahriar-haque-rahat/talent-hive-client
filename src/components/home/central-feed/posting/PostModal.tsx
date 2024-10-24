import React, { useState, FormEventHandler, useContext, useEffect, useRef } from 'react';
import { MdClose, MdFileUpload } from 'react-icons/md';
import { AuthContext } from '@/provider/AuthProvider';
import toast from 'react-hot-toast';
import ConfirmationModal from '@/components/shared/ConfirmationModal';
import { createPost, updatePost } from '@/apiFunctions/postData';
import { useDispatch } from 'react-redux';
import { addPost, editPost } from '@/redux/postSlice';
import { useEdgeStore } from '../../../../edgestore/edgestore';

const PostModal = ({ isOpen, onClose, post, isEditing }) => {
    const dispatch = useDispatch();
    const { user } = useContext(AuthContext);
    const [content, setContent] = useState('');
    const [media, setMedia] = useState([]);
    const [removedMedia, setRemovedMedia] = useState([]);
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { edgestore } = useEdgeStore();
    const fileInputRef = useRef(null);

    useEffect(() => {
        if (post) {
            setContent(post.content || '');
            setMedia(post.media || []);
        }
    }, [post]);

    const handleAddMedia = (e) => {
        const files = Array.from(e.target.files);
        setMedia((prevMedia) => [...prevMedia, ...files]);
    };

    const handleRemoveMedia = (index) => {
        const removed = media[index];
        setMedia((prevMedia) => prevMedia.filter((_, i) => i !== index));
        if (typeof removed === 'string') {
            setRemovedMedia((prevRemoved) => [...prevRemoved, removed]);
        }
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

    const handleSubmit: FormEventHandler = async (event) => {
        event.preventDefault();

        setIsSubmitting(true);
        let mediaUrls = [];

        // Upload new media
        for (const file of media) {
            if (typeof file === 'object') {
                try {
                    const res = await edgestore.publicFiles.upload({
                        file,
                        onProgressChange: (progress) => {
                            console.log('Upload progress:', progress);
                        },
                    });
                    mediaUrls.push(res.url);
                } catch (error) {
                    toast.error('Failed to upload media.');
                    console.error(error);
                    return;
                }
            } else {
                mediaUrls.push(file);
            }
        }

        const postData = {
            userId: user?._id,
            content,
            media: mediaUrls,
        };

        try {
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

            // Delete removed media from EdgeStore
            for (const url of removedMedia) {
                try {
                    await edgestore.publicFiles.delete({ url });
                    console.log('Deleted media:', url);
                } catch (error) {
                    console.error('Failed to delete media:', url, error);
                }
            }

            onClose();
        } catch (error) {
            toast.error(post ? 'Failed to update post.' : 'Failed to create post.');
        } finally {
            setIsSubmitting(false);
            setContent('');
            setMedia([]);
        }
    };

    if (!isOpen) return null;

    return (
        <>
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[60]">
                <div className="bg-white w-full max-w-[80%] h-[80vh] p-6 rounded-lg relative overflow-auto">
                    <button
                        onClick={handleClose}
                        className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                    >
                        <MdClose size={24} />
                    </button>

                    <div className="grid grid-cols-3 gap-6 h-full">
                        {/* Left side: Textarea */}
                        <div className="col-span-2 flex flex-col">
                            <h2 className="text-xl font-semibold mb-4">{post ? 'Edit Post' : 'Create Post'}</h2>

                            <form onSubmit={handleSubmit} className="flex flex-col h-full">
                                <textarea
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    className="w-full h-[55vh] p-2 border rounded-md mb-4 resize-none outline-none"
                                    placeholder="What's on your mind?"
                                    rows={5}
                                />

                                <div className="flex justify-between mt-auto">
                                    <button
                                        type="submit"
                                        className={`px-3 py-1 border ${isSubmitting ? 'bg-white text-sky-500 cursor-not-allowed' : 'bg-sky-500 text-white'} rounded-lg hover:bg-white hover:text-sky-500`}
                                        disabled={isSubmitting || (!content && media.length === 0)}
                                    >
                                        {isSubmitting ? (post ? 'Saving...' : 'Posting...') : (post ? 'Save' : 'Post')}
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Right side: Media section */}
                        <div className="col-span-1 flex flex-col">
                            <h2 className="text-xl font-semibold mb-4">Add Media</h2>

                            {/* Media Previews with Scroll */}
                            <div className="grid grid-cols-2 gap-4 mb-4 overflow-y-auto h-[55vh] rounded-md ">
                                {media.length > 0 &&
                                    media.map((file, index) => (
                                        <div key={index} className="relative">
                                            <img
                                                src={typeof file === 'object' ? URL.createObjectURL(file) : file}
                                                alt="media preview"
                                                className="w-full aspect-square object-cover object-top rounded-md"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveMedia(index)}
                                                className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                                            >
                                                <MdClose size={16} />
                                            </button>
                                        </div>
                                    ))
                                }
                            </div>

                            <div className="mt-auto flex justify-end">
                                <label
                                    className={`px-3 py-1 border ${isSubmitting ? 'border-gray-400 text-gray-400 cursor-not-allowed' : 'border-sky-500 text-sky-500 cursor-pointer hover:bg-sky-500 hover:text-white'} rounded-lg flex items-center`}
                                >
                                    <MdFileUpload size={24} className="mr-2" />
                                    Add Media
                                    <input
                                        type="file"
                                        multiple
                                        ref={fileInputRef}
                                        onChange={handleAddMedia}
                                        accept="image/*"
                                        className="hidden"
                                        disabled={isSubmitting}
                                    />
                                </label>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            {/* Discard Confirmation Modal */}
            <ConfirmationModal
                isOpen={isConfirmationModalOpen}
                onClose={() => setIsConfirmationModalOpen(false)}
                onConfirm={handleDiscard}
                title={post ? 'Discard Changes?' : 'Discard Post?'}
                message={post ? 'You have unsaved changes. Are you sure you want to discard them?' : 'You have unsaved changes. Are you sure you want to discard this post?'}
                confirmLabel="Discard"
                cancelLabel="Cancel"
            />
        </>
    );
};

export default PostModal;
