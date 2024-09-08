import { getPostShares } from '@/actions/postData';
import React, { useEffect, useState } from 'react';
import { MdClose } from 'react-icons/md';

const AllShares = ({ openShareList, toggleOpenShareList, postId }) => {
    const [shares, setShares] = useState([]);
    const [hasFetchedShares, setHasFetchedShares] = useState(false);
console.log(shares);

    const fetchPostShares = async (postId) => {
        if (postId && !hasFetchedShares) {
            try {
                const response = await getPostShares(postId);
                setShares(response);
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
    }

    useEffect(() => {
        if (openShareList && !hasFetchedShares) {
            fetchPostShares(postId);
        }
    }, [])

    if (!openShareList) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[60]">
            <div className="bg-white w-1/2 max-w-2xl h-3/4 p-6 rounded-lg relative flex flex-col">
                <button
                    onClick={handleCloseShareListModal}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                >
                    <MdClose size={24} />
                </button>
                <h2 className="text-xl font-bold mb-4">All Likes</h2>
            </div>
        </div>
    );
};

export default AllShares;