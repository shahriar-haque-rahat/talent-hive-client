import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react';
import NewsFeed from './NewsFeed';
import PostModal from './posting/PostModal';
import { MdArticle, MdPermMedia } from 'react-icons/md';
import { AuthContext } from '@/provider/AuthProvider';
import { useRouter } from 'next/navigation';
import { getPosts } from '@/actions/postData';
import { useDispatch, useSelector } from 'react-redux';
import { setPosts } from '@/redux/postSlice';

const CentralFeed = () => {
    const dispatch = useDispatch();
    const { user } = useContext(AuthContext);
    const posts = useSelector((state: any) => state.post.posts);

    const router = useRouter();
    const [isPostModalOpen, setIsPostModalOpen] = useState(false);

    const openPostModal = () => {
        if (!user.email) {
            setIsPostModalOpen(false);
            router.push('/login');
            return;
        }
        else {
            setIsPostModalOpen(true);
        }
    };

    const closePostModal = () => {
        setIsPostModalOpen(false);
    };

    useEffect(() => {
        const fetchPosts = async () => {
            if (user && user._id) {
                const fetchedPosts = await getPosts(user._id);
                dispatch(setPosts(fetchedPosts));
            }
        };
        fetchPosts();
    }, [dispatch, user]);

    return (
        <>
            <div className='bg-white p-3 border border-gray-300 rounded-lg'>
                <div className='flex items-center justify-center gap-2'>
                    <Image
                        src="/assets/user.png"
                        alt="Profile"
                        className="rounded-full border-2 border-white w-12 h-12 object-cover object-center"
                        width={48}
                        height={48}
                    />
                    <button onClick={openPostModal} className='hover:bg-gray-100 text-sm text-left border border-gray-400 p-2 pl-4 rounded-full w-full'>
                        Create a post
                    </button>
                </div>
                {/* <div className='text-sm mt-4 flex justify-evenly'>
                    <button className='hover:bg-gray-100 p-2 flex gap-2 items-center text-blue-500'>
                        <MdPermMedia size={20} />Add Media
                    </button>
                    <button className='hover:bg-gray-100 p-2 flex gap-2 items-center text-orange-500'>
                        <MdArticle size={20} />Job Post
                    </button>
                </div> */}
            </div>
            <div className='my-6 border-t border-gray-500'></div>
            <NewsFeed posts={posts} />
            <PostModal
                isOpen={isPostModalOpen}
                onClose={closePostModal}
                post={null}
            />
        </>
    );
};

export default CentralFeed;
