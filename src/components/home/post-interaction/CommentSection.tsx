import { postComment } from '@/actions/postInteraction';
import { addComment } from '@/redux/commentSlice';
import { Image } from '@nextui-org/react';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { LuSendHorizonal } from "react-icons/lu";
import { useDispatch } from 'react-redux';

const CommentSection = ({ user, postUid }) => {
    const [comment, setComment] = useState('');
    const dispatch = useDispatch();

    const handlePostComment = (postUid) => {
        if (user._id && comment.trim()) {
            postComment(postUid, user._id, comment)
                .then((response) => {
                    toast.success('Comment posted');
                    setComment('');
                    dispatch(addComment({ postUid, comment: response }));
                })
                .catch(error => {
                    toast.error('Failed to post comment');
                });
        }
    };

    return (
        <>
            <div className=" p-4 border-b border-gray-300 flex items-center gap-1">
                <Image
                    src={user.profileImage}
                    alt={user.fullName}
                    className="rounded-full border-2 border-white w-14 h-14 object-cover object-center"
                    width={48}
                    height={48}
                />

                <div className=' w-full flex items-center border border-gray-400 p-2 pl-4 rounded-full '>
                    <input
                        className=' w-full bg-white outline-none'
                        type="email"
                        placeholder="Add a comment..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                    <LuSendHorizonal
                        onClick={() => comment.trim() && handlePostComment(postUid)}
                        size={20}
                        className={` cursor-pointer ${comment.trim() ? 'text-black' : 'text-gray-400'}`}
                        style={{ pointerEvents: comment.trim() ? 'auto' : 'none' }}
                    />
                </div>
            </div>
        </>
    );
};

export default CommentSection;