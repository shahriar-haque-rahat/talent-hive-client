import { deleteLike, deleteSave, postLike, postSave } from '@/apiFunctions/postInteraction';
import { setComments } from '@/redux/commentSlice';
import { updatePostOnInteraction } from '@/redux/postSlice';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { BiBookmarkAlt, BiCommentDetail, BiLike, BiShare, BiSolidBookmarkAlt, BiSolidLike } from 'react-icons/bi';
import AllLikes from './AllLikes';
import CommentSection from './CommentSection';
import AllComments from './AllComments';
import ShareModal from '../../home/central-feed/posting/ShareModal';
import AllShares from './AllShares';

const PostInteractionSection = ({ user, post, isModalView = false }) => {
    const dispatch = useDispatch();
    const [openLike, setOpenLike] = useState({ isOpen: false, postId: null });
    const [openComment, setOpenComment] = useState(isModalView ? { [post._id]: true } : {});
    const [openShare, setOpenShare] = useState({ isOpen: false, post: null });
    const [openShareList, setOpenShareList] = useState({ isOpen: false, post: null });

    const [buttonLoading1, setButtonLoading1] = useState(false);
    const [buttonLoading2, setButtonLoading2] = useState(false);

    // like
    const toggleOpenLike = (postId) => {
        setOpenLike({ isOpen: !openLike.isOpen, postId });
    }

    const handleLikeToggle = async (post) => {
        if (!user._id) return;

        try {
            setButtonLoading1(true);

            let updatedPost;
            if (post.isLiked) {
                // Unlike the post
                const response = await deleteLike(post._id, post.likeId);
                updatedPost = { ...response.post, isLiked: false, likeId: null };
            } else {
                // Like the post
                const response = await postLike(post._id, user._id);
                updatedPost = { ...response.post, isLiked: true, likeId: response.like._id };
            }

            dispatch(updatePostOnInteraction(updatedPost));
        }
        catch (error) {
            console.error("Error toggling like:", error);
        }

        setButtonLoading1(false);
    };

    // comment
    const toggleOpenComment = (postId) => {
        setOpenComment((prevState) => {
            const isClosing = prevState[postId];
            if (isClosing) {
                dispatch(setComments({ postId, comments: [] }));
            }
            return {
                ...prevState,
                [postId]: !prevState[postId],
            };
        });
    };

    // share
    const toggleOpenShare = (post) => {
        setOpenShare({ isOpen: !openShare.isOpen, post });
    }

    const toggleOpenShareList = (post) => {
        setOpenShareList({ isOpen: !openShareList.isOpen, post });
    }

    // save
    const handleSaveToggle = async (post) => {
        if (!user._id) return;

        try {
            setButtonLoading2(true);

            let updatedPost;
            if (post.isSaved) {
                // Unsave the post
                const response = await deleteSave(post._id, post.saveId);
                updatedPost = { ...response.post, isSaved: false, saveId: null };
            } else {
                // Save the post
                const response = await postSave(post._id, user._id);
                updatedPost = { ...response.post, isSaved: true, saveId: response.save._id };
            }

            dispatch(updatePostOnInteraction(updatedPost));
        }
        catch (error) {
            console.error("Error toggling save:", error);
        }

        setButtonLoading2(false);
    };

    return (
        <div>
            <div className=' mt-3'>
                <div className=' text-xs flex items-center justify-end gap-2 text-gray-500 px-3 py-1'>
                    <p onClick={() => toggleOpenLike(post._id)} className=' cursor-pointer hover:text-sky-500 hover:underline'>{post.likesCount} {post.likesCount > 1 ? 'Likes' : 'Like'}</p><p className=' font-bold'>.</p>
                    <p onClick={() => toggleOpenComment(post._id)} className=' cursor-pointer hover:text-sky-500 hover:underline'>{post.commentsCount} {post.commentsCount > 1 ? 'Comments' : 'Comment'}</p><p className=' font-bold'>.</p>
                    <p onClick={() => toggleOpenShareList(post)} className=' cursor-pointer hover:text-sky-500 hover:underline'>{post.sharesCount} {post.sharesCount > 1 ? 'Shares' : 'Share'}</p>
                </div>
                <div className='flex justify-evenly'>
                    {/* Like */}
                    <button
                        onClick={() => handleLikeToggle(post)}
                        className='hover:bg-gray-200 p-2 flex items-center justify-center gap-1 text-sm'
                        disabled={buttonLoading1}
                    >
                        {post.isLiked ? <BiSolidLike size={22} className="text-black" /> : <BiLike size={22} />}
                    </button>

                    {/* Comment */}
                    <button onClick={() => toggleOpenComment(post._id)} className='hover:bg-gray-200 p-2 flex items-center justify-center gap-1 text-sm'>
                        <BiCommentDetail size={22} />
                    </button>

                    {/* Share */}
                    <button onClick={() => toggleOpenShare(post)} className='hover:bg-gray-200 p-2 flex items-center justify-center gap-1 text-sm'>
                        <BiShare style={{ transform: "scaleX(-1)" }} size={22} />
                    </button>

                    {/* Save */}
                    <button
                        onClick={() => handleSaveToggle(post)}
                        className='hover:bg-gray-200 p-2 flex items-center justify-center gap-1 text-sm'
                        disabled={buttonLoading2}
                    >
                        {post.isSaved ? <BiSolidBookmarkAlt size={22} className=' text-black' /> : <BiBookmarkAlt size={22} />}
                    </button>
                </div>

                {/* likes modals */}
                {openLike.isOpen &&
                    <AllLikes openLike={openLike.isOpen} toggleOpenLike={toggleOpenLike} postId={openLike.postId} />
                }

                {/* comment modals */}
                {
                    openComment[post._id] &&
                    <div>
                        <CommentSection user={user} postId={post._id} />
                        <AllComments user={user} postUserId={post.userId._id} postId={post._id} openComment={openComment} />
                    </div>
                }

                {/* share modals */}
                {openShare.isOpen &&
                    <ShareModal openShare={openShare.isOpen} toggleOpenShare={toggleOpenShare} post={openShare.post} userId={user._id} />
                }

                {openShareList.isOpen &&
                    <AllShares openShareList={openShareList.isOpen} toggleOpenShareList={toggleOpenShareList} post={openShareList.post} />
                }
            </div>
        </div>
    );
};

export default PostInteractionSection;