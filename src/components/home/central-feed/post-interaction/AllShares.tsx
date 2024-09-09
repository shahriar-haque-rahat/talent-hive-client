import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MdClose } from 'react-icons/md';
import { getPostShares } from '@/actions/postData';
import { addCachePost, selectManyPostById } from '@/redux/postSlice';

const AllShares = ({ openShareList, toggleOpenShareList, post }) => {
    const dispatch = useDispatch();
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
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[60]">
            <div className="bg-white w-1/2 max-w-2xl h-3/4 p-6 rounded-lg relative flex flex-col">
                <button
                    onClick={handleCloseShareListModal}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                >
                    <MdClose size={24} />
                </button>
                <h2 className="text-xl font-bold mb-4">All Shares</h2>
                <div>
                    {shares.map(share => (
                        <div key={share._id} className="share-item">
                            <p>{share.content}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AllShares;
