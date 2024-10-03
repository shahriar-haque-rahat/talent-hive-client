import React, { useContext, useState } from 'react';
import { Image } from '@nextui-org/react';
import { AuthContext } from '@/provider/AuthProvider';
import { useRouter } from 'next/navigation';
import PostModal from '../central-feed/posting/PostModal';

const PostSection = () => {
    const { user } = useContext(AuthContext);
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
                <div className='flex items-center justify-center gap-2'>
                    <div className='w-14 h-14 flex items-center'>
                        <Image
                            src="/assets/user.png"
                            alt="Profile"
                            className="rounded-full border-2 border-white object-cover object-center"
                        />
                    </div>
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
            <PostModal isOpen={isPostModalOpen} onClose={closePostModal} post={null} isEditing={false} />
        </>
    );
};

export default PostSection;