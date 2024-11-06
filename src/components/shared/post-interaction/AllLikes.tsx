import { getLikes } from '@/apiFunctions/postInteraction';
import { Image, Modal, ModalBody, ModalContent, ModalHeader } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import { MdClose } from 'react-icons/md';

// TODO: loading skeleton while likes fetching 
const AllLikes = ({ openLike, toggleOpenLike, postId }) => {
    const [likes, setLikes] = useState([]);
    const [hasFetchedLikes, setHasFetchedLikes] = useState(false);

    const fetchLikes = async (postId) => {
        if (postId && !hasFetchedLikes) {
            try {
                const response = await getLikes(postId);
                setLikes(response.likes);
                setHasFetchedLikes(true);
            }
            catch (error) {
                console.error('Error fetching likes:', error);
            }
        }
    };

    const handleCloseLikeModal = () => {
        setLikes([]);
        setHasFetchedLikes(false);
        toggleOpenLike();
    }

    useEffect(() => {
        if (openLike && !hasFetchedLikes) {
            fetchLikes(postId);
        }
    }, [openLike, postId]);

    if (!openLike) return null;

    return (
        <>
            <Modal
                size='5xl'
                isOpen={openLike}
                onOpenChange={handleCloseLikeModal}
                className='bg-white w-full md:w-1/2 max-w-2xl md:p-6 rounded-lg '
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader>All Likes</ModalHeader>
                            <ModalBody>
                                <div>
                                    <div className="flex flex-col h-[60vh] md:h-[80vh] overflow-y-scroll flex-1">
                                        <ul>
                                            {likes.length > 0 && likes.map((like) => (
                                                <div key={like._id} className=' flex gap-2 items-center py-2 border-b border-gray-200 hover:underline cursor-pointer'>
                                                    <Image
                                                        src={like.userId?.profileImage}
                                                        alt={like.userId?.fullName}
                                                        className="rounded-full border-2 border-white w-14 h-14 object-cover object-center"
                                                        width={48}
                                                        height={48}
                                                    />
                                                    <li>
                                                        {like.userId.fullName}
                                                    </li>
                                                </div>
                                            ))}
                                            {likes.length === 0 &&
                                                <p className=' w-full text-center'>There are no likes</p>
                                            }
                                        </ul>
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

export default AllLikes;
