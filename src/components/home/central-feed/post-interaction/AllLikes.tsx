import { getLikes } from '@/actions/postInteraction';
import { Image } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import { MdClose } from 'react-icons/md';

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
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[60]">
            <div className="bg-white w-1/2 max-w-2xl h-3/4 p-6 rounded-lg relative flex flex-col">
                <button
                    onClick={handleCloseLikeModal}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                >
                    <MdClose size={24} />
                </button>
                <h2 className="text-xl font-bold mb-4">All Likes</h2>
                <div className="overflow-y-scroll flex-1">
                    <ul>
                        {likes.map((like) => (
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
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default AllLikes;
