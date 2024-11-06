import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MdClose } from 'react-icons/md';
import { getPostShares } from '@/apiFunctions/postData';
import { addCachePost, selectManyPostById } from '@/redux/postSlice';
import SharedPostContent from '../../home/central-feed/SharedPostContent';
import UserInfoSection from '../UserInfoSection';
import ContentSection from '../../home/central-feed/shared-components-for-post/ContentSection';
import { Image, Modal, ModalBody, ModalContent, ModalHeader } from '@nextui-org/react';

// TODO: loading skeleton while share posts fetching  
const AllShares = ({ openShareList, toggleOpenShareList, post }) => {
    const dispatch = useDispatch();
    const user = useSelector((state: any) => state.user.user);
    const [shares, setShares] = useState([]);
    const [hasFetchedShares, setHasFetchedShares] = useState(false);
    const existingShares = useSelector(state => selectManyPostById(state, post._id));

    const fetchPostShares = async () => {
        if (post._id && !hasFetchedShares) {
            try {
                let fetchedShares = [];
                if (existingShares?.length !== post.sharesCount) {
                    const excludePostIds = existingShares.map(post => post._id).join(',');
                    fetchedShares = await getPostShares(post._id, excludePostIds);
                    fetchedShares.forEach(postData => {
                        dispatch(addCachePost({ postData }));
                    });
                }
                setShares([...existingShares, ...fetchedShares]);
                setHasFetchedShares(true);
            }
            catch (error) {
                console.error('Error fetching post shares:', error);
            }
        }
    };

    const handleCloseShareListModal = () => {
        setShares([]);
        setHasFetchedShares(false);
        toggleOpenShareList();
    };

    useEffect(() => {
        if (openShareList && !hasFetchedShares) {
            fetchPostShares();
        }
    }, [openShareList]);

    if (!openShareList) return null;

    return (
        <>
            <Modal
                size='5xl'
                isOpen={openShareList}
                onOpenChange={handleCloseShareListModal}
                className='bg-white w-full md:w-1/2 max-w-2xl md:p-6 rounded-lg'
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader>All Shares</ModalHeader>
                            <ModalBody>
                                <div>
                                    <div className='flex flex-col h-[60vh] md:h-[80vh] overflow-y-scroll flex-1'>
                                        {shares.length > 0 && shares.map((post, index) =>
                                            <div key={index} className='bg-white border border-gray-300 rounded-lg mt-10 pb-6'>
                                                <div className=' flex items-start justify-between p-3'>
                                                    {/* User info */}
                                                    <UserInfoSection userId={post.userId._id} profileImage={post.userId.profileImage} fullName={post.userId.fullName} createdAt={post.createdAt.slice(0, 10)} />
                                                </div>

                                                {/* Post content */}
                                                <ContentSection content={post.content} index={index} />

                                                {/* Shared post content */}
                                                {post.sharedPostId && post.sharedPostId !== '' &&
                                                    <SharedPostContent user={user} sharedPostContent={post.sharedPostId} />
                                                }
                                            </div>
                                        )}
                                        {shares.length === 0 &&
                                            <p className=' w-full text-center'>There are no shares</p>
                                        }
                                    </div>
                                </div>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};

export default AllShares;
