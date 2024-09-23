import { createPost, updatePost } from '@/actions/postData';
import { addPost, editPost, updatePostOnInteraction } from '@/redux/postSlice';
import { Image } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { MdClose } from 'react-icons/md';
import { useDispatch } from 'react-redux';

const ShareModal = ({ openShare, toggleOpenShare, post, userId, isEditing = false }) => {
    const dispatch = useDispatch();
    const [sharedPost, setSharedPost] = useState(post);
    const [content, setContent] = useState(isEditing ? post.content : "");
    const [expandedPosts, setExpandedPosts] = useState(false);

    const toggleReadMore = () => {
        setExpandedPosts((prevExpanded) => !prevExpanded);
    };

    const renderContent = (content) => {
        const words = content.split(' ');
        const isExpanded = expandedPosts;

        if (words.length > 20) {
            return (
                <>
                    {isExpanded ? content : words.slice(0, 20).join(' ') + '...'}
                    <span
                        onClick={() => toggleReadMore()}
                        className="text-blue-500 cursor-pointer ml-1"
                    >
                        {isExpanded ? 'Show less' : 'Read more'}
                    </span>
                </>
            );
        }
        return content;
    };

    const handleShareOrEdit = () => {
        if (userId && sharedPost) {
            const sharePostData = {
                userId,
                sharedPostId: sharedPost._id,
                content
            };
            if (isEditing) {
                updatePost(post._id, sharePostData)
                    .then((response) => {
                        if (response) {
                            dispatch(editPost({ postId: post._id, editedData: response }));
                            toast.success('Post updated successfully');
                            toggleOpenShare();
                        }
                    })
                    .catch((error) => {
                        console.error('Error updating post:', error);
                        toast.error('Failed to update post');
                    });
            } else {
                createPost(sharePostData)
                    .then((response) => {
                        if (response) {
                            dispatch(addPost({ postData: response }));
                            dispatch(updatePostOnInteraction(response.sharedPostId));
                            toast.success('Successfully Post Shared');
                            toggleOpenShare();
                        }
                    })
                    .catch(() => {
                        toast.error('Failed to share post');
                    });
            }
        }
    };

    useEffect(() => {
        if (post.sharedPostId) {
            setSharedPost(post.sharedPostId);
        }
    }, [post]);

    if (!openShare) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[60]">
            <div className="bg-white w-11/12 max-w-2xl h-3/4 p-6 rounded-lg relative flex flex-col">
                <button
                    onClick={toggleOpenShare}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                >
                    <MdClose size={24} />
                </button>

                <h2 className="text-xl font-semibold mb-4">
                    {isEditing ? 'Edit Shared Post' : 'Share Post'}
                </h2>

                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full max-h-44 min-h-44 p-2 outline-none"
                    rows={4}
                    placeholder="Add content..."
                />

                <div className="border border-gray-300 rounded-lg p-4 overflow-y-scroll">
                    <div className="flex gap-2 items-center">
                        <Image
                            src={sharedPost.userId.profileImage}
                            alt={sharedPost.userId.fullName}
                            className="rounded-full w-10 h-10 object-cover object-center"
                        />
                        <div>
                            <h1 className="font-semibold">{sharedPost.userId.fullName}</h1>
                            <p className="text-xs">{sharedPost.updatedAt.slice(0, 10)}</p>
                        </div>
                    </div>

                    <p className="mt-4">{renderContent(sharedPost.content)}</p>

                    {sharedPost.media && sharedPost.media.length > 0 && (
                        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                            {sharedPost.media.map((mediaUrl, mediaIndex) => (
                                <div key={mediaIndex} className="relative w-full cursor-pointer">
                                    <Image
                                        src={mediaUrl}
                                        alt={`Media ${mediaIndex}`}
                                        className="rounded-none border-2 border-white object-cover object-center"
                                        style={{ aspectRatio: '1 / 1' }}
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <button
                    onClick={handleShareOrEdit}
                    className="bg-sky-500 text-white rounded-lg mt-4 py-2 px-4 hover:bg-sky-600 self-end"
                >
                    {isEditing ? 'Save Changes' : 'Share'}
                </button>
            </div>
        </div>
    );
};

export default ShareModal;
