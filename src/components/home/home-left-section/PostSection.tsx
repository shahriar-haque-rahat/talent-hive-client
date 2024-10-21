import React, { useState } from 'react';
import { Image } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import PostModal from '../central-feed/posting/PostModal';
import { useSelector } from 'react-redux';

const PostSection = () => {
    const user = useSelector((state: any) => state.user.user);
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

    return (
        <>
            <div className='bg-white p-3 border shadow rounded-lg'>
                <div className='flex items-center gap-2'>
                    <Image
                        src={user?.profileImage ? user.profileImage : "/assets/user.png"}
                        alt={user?.fullName}
                        className="rounded-full w-12 h-12 object-cover object-top"
                    />
                    <div className='flex-grow'>
                        <button onClick={openPostModal} className='hover:bg-gray-100 h-10 text-sm text-left border border-gray-400 p-2 pl-4 rounded-lg w-full'>
                            Create a post
                        </button>
                    </div>
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
            <PostModal isOpen={isPostModalOpen} onClose={closePostModal} post={null} isEditing={false} />
        </>
    );
};

export default PostSection;