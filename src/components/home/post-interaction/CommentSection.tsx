import { commentPost } from '@/actions/postInteraction';
import { Image } from '@nextui-org/react';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { LuSendHorizonal } from "react-icons/lu";

const CommentSection = ({ user, postUid }) => {
    const [comment, setComment] = useState('');

    const handleCommentPost = (postUid) => {
        if (user._id && comment.trim()) {
            commentPost(postUid, user._id, comment)
                .then(() => {
                    toast.success('Comment posted');
                    setComment('');
                })
        }
    }

    return (
        <>
            <div className=" p-4 flex items-center gap-1">
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
                        onClick={() => comment.trim() && handleCommentPost(postUid)}
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