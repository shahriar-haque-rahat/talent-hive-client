import React, { useEffect, useState, useRef } from 'react';
import { getComments } from '@/actions/postInteraction';
import { Image } from '@nextui-org/react';

const AllComments = ({ postUid }) => {
    const [expandedComments, setExpandedComments] = useState({});
    const [comments, setComments] = useState([]);
    const [skip, setSkip] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const isFetching = useRef(false);

    const toggleExpandComment = (commentId) => {
        setExpandedComments(prevState => ({
            ...prevState,
            [commentId]: !prevState[commentId],
        }));
    };

    const renderCommentContent = (content, commentId) => {
        const words = content.split(' ');
        const isExpanded = expandedComments[commentId];

        if (words.length > 20) {
            return (
                <>
                    {isExpanded ? content : words.slice(0, 20).join(' ') + '...'}
                    <span
                        onClick={() => toggleExpandComment(commentId)}
                        className="text-blue-500 cursor-pointer ml-1"
                    >
                        {isExpanded ? 'Show less' : 'Read more'}
                    </span>
                </>
            );
        }
        return content;
    };

    const fetchComments = async () => {
        if (isFetching.current || !hasMore) return;

        isFetching.current = true;

        try {
            const newComments = await getComments(postUid, skip);

            setComments(prevComments => [...prevComments, ...newComments]);

            setSkip(prevSkip => prevSkip + newComments.length);

            if (newComments.length < 5) {
                setHasMore(false);
            }
        }
        catch (error) {
            console.error('Error fetching comments:', error);
        }
        finally {
            isFetching.current = false;
        }
    };

    useEffect(() => {
        setSkip(0);
        setComments([]);
        setHasMore(true);
        fetchComments();
    }, [postUid]);

    return (
        <>
            <div className='p-4'>
                {comments.map((comment) => (
                    <div key={comment._id} className='flex items-start gap-2 mt-2'>
                        <Image
                            src={comment.userId.profileImage}
                            alt={comment.userId.fullName}
                            className="rounded-full border-2 border-white w-14 h-14 object-cover object-center"
                            width={48}
                            height={48}
                        />
                        <div className='w-full'>
                            <div className='w-full rounded-lg bg-slate-100 p-2'>
                                {renderCommentContent(comment.comment, comment._id)}
                            </div>
                            <div className='pl-2 flex gap-2 items-center'>
                                <button className='text-xs text-gray-500 hover:text-gray-700'>Like</button>
                                <p>|</p>
                                <button className='text-xs text-gray-500 hover:text-gray-700'>Reply</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {hasMore && (
                <div className='text-center'>
                    <button
                        className='mt-4 text-blue-500 hover:text-blue-700'
                        onClick={fetchComments}
                    >
                        Show More Comments
                    </button>
                </div>
            )}
        </>
    );

};

export default AllComments;
