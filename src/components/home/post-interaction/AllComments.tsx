import React, { useEffect, useState, useRef } from 'react';
import { deleteComment, getComments, updateComment } from '@/actions/postInteraction';
import { Image } from '@nextui-org/react';
import { useDispatch, useSelector } from 'react-redux';
import { setComments, removeComment, editComment } from '@/redux/commentSlice';
import ConfirmationModal from '@/shared/ConfirmationModal';

const AllComments = ({ user, postUid, openComment }) => {
    const dispatch = useDispatch();
    const isOpen = openComment[postUid];
    const comments = useSelector(state => state.comment.commentsByPost[postUid] || []);
    const [expandedComments, setExpandedComments] = useState({});
    const [skip, setSkip] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const isFetching = useRef(false);

    const [editingCommentUid, setEditingCommentUid] = useState(null);
    const [editingCommentContent, setEditingCommentContent] = useState('');

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [commentToDelete, setCommentToDelete] = useState(null);

    const toggleExpandComment = (commentUid) => {
        setExpandedComments(prevState => ({
            ...prevState,
            [commentUid]: !prevState[commentUid],
        }));
    };

    const renderCommentContent = (comment: any) => {
        const isExpanded = expandedComments[comment.uid];
        const isEditing = editingCommentUid === comment.uid;

        if (isEditing) {
            return (
                <input
                    type="text"
                    value={editingCommentContent}
                    onChange={(e) => setEditingCommentContent(e.target.value)}
                    className="w-full outline-none bg-white rounded-full pl-2"
                />
            );
        }
        else {
            const words = comment.comment.split(' ');

            if (words.length > 20) {
                return (
                    <>
                        {isExpanded ? comment.comment : words.slice(0, 20).join(' ') + '...'}
                        <span
                            onClick={() => toggleExpandComment(comment.uid)}
                            className="text-blue-500 cursor-pointer ml-1"
                        >
                            {isExpanded ? 'Show less' : 'Read more'}
                        </span>
                    </>
                );
            }
            return comment.comment;
        }
    };

    const handleEditComment = (comment) => {
        setEditingCommentUid(comment.uid);
        setEditingCommentContent(comment.comment);
    }

    const handleSaveEditComment = async (comment) => {
        try {
            const updatedComment = await updateComment(postUid, comment.uid, editingCommentContent);
            dispatch(editComment({ postUid, comment: updatedComment }));
            setEditingCommentUid(null);
        }
        catch (error) {
            console.error('Error updating comment:', error);
        }
    }

    const handleCancelEdit = () => {
        setEditingCommentUid(null);
        setEditingCommentContent('');
    };

    const confirmDeleteComment = (commentUid) => {
        setCommentToDelete(commentUid);
        setShowDeleteModal(true);
    };

    const handleDeleteComment = async () => {
        if (commentToDelete) {

            try {
                await deleteComment(postUid, commentToDelete);
                dispatch(removeComment({ postUid, commentUid: commentToDelete }));
            } catch (error) {
                console.error('Error deleting comment:', error);
            } finally {
                setShowDeleteModal(false);
                setCommentToDelete(null);
            }
        }
    };

    const fetchComments = async () => {
        if (isFetching.current || !hasMore) return;

        isFetching.current = true;

        try {
            const newComments = await getComments(postUid, skip);
            dispatch(setComments({ postUid, comments: [...comments, ...newComments] }));
            setSkip(prevSkip => prevSkip + newComments.length);

            if (newComments.length < 5) {
                setHasMore(false);
            }
        } catch (error) {
            console.error('Error fetching comments:', error);
        } finally {
            isFetching.current = false;
        }
    };

    useEffect(() => {
        if (comments.length === 0 && isOpen) {
            setSkip(0);
            dispatch(setComments({ postUid, comments: [] }));
            setHasMore(true);
            fetchComments();
        }
    }, [postUid, isOpen]);

    return (
        <>
            <div className='p-4'>
                {comments.map((comment) => (
                    <div key={comment._id} className='flex items-start gap-2 mt-2'>
                        <Image
                            src={comment.userId?.profileImage}
                            alt={comment.userId?.fullName}
                            className="rounded-full border-2 border-white w-14 h-14 object-cover object-center"
                            width={48}
                            height={48}
                        />
                        <div className='w-full'>
                            <div className='w-full rounded-lg bg-slate-100 p-2'>
                                <h1 className='font-bold'>{comment.userId?.fullName}</h1>
                                {renderCommentContent(comment)}
                            </div>
                            <div className='px-2 flex justify-between items-center'>
                                <div className='flex gap-2 items-center'>
                                    <button className='text-xs text-gray-500 hover:text-gray-700'>Like</button>
                                    <p>|</p>
                                    <button className='text-xs text-gray-500 hover:text-gray-700'>Reply</button>
                                </div>
                                {comment.userId?._id === user._id && (
                                    <div className='flex gap-2 items-center'>
                                        {editingCommentUid === comment.uid ? (
                                            <>
                                                <button onClick={() => handleSaveEditComment(comment)} className='text-xs text-green-500 hover:text-green-700'>Save</button>
                                                <p>|</p>
                                                <button onClick={handleCancelEdit} className='text-xs text-red-500 hover:text-red-700'>Cancel</button>
                                            </>
                                        ) : (
                                            <>
                                                <button onClick={() => handleEditComment(comment)} className='text-xs text-sky-500 hover:text-gray-700'>Edit</button>
                                                <p>|</p>
                                                <button onClick={() => confirmDeleteComment(comment.uid)} className='text-xs text-red-500 hover:text-gray-700'>Delete</button>
                                            </>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {hasMore && (
                <div className='text-center'>
                    <button
                        className='my-4 text-blue-500 hover:text-blue-700'
                        onClick={fetchComments}
                    >
                        Show More Comments
                    </button>
                </div>
            )}

            <ConfirmationModal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleDeleteComment}
                title="Delete Comment?"
                message="Are you sure you want to delete this comment? This action cannot be undone."
                confirmLabel="Delete"
                cancelLabel="Cancel"
            />
        </>
    );
};

export default AllComments;
