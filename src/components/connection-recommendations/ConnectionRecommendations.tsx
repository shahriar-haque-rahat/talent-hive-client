'use client'

import React, { useEffect, useState } from 'react';
import { Image } from '@nextui-org/react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '@/api/userData';
import { FiPlus } from "react-icons/fi";
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import PostSkeleton from '@/skeletons/PostSkeleton';
import { addFetchedUsers } from '@/redux/userSlice';

const ConnectionRecommendations = () => {
    const dispatch = useDispatch();
    const user = useSelector((state: any) => state.user.user);
    const users = useSelector((state: any) => state.user.users);
    const page = useSelector((state: any) => state.user.usersPage);
    const { ref, inView } = useIntersectionObserver();
    const [hasMore, setHasMore] = useState(true);

    const fetchUsers = async () => {
        if (!user) return;

        const fetchedUsers = await getUsers(user._id, 10, page);

        if (fetchedUsers.users.length < 10) {
            setHasMore(false);
        }

        if (fetchedUsers.users.length > 0) {
            dispatch(addFetchedUsers(fetchedUsers));
        }
    };

    useEffect(() => {
        if (users.length === 0) {
            fetchUsers();
        }
    }, []);

    useEffect(() => {
        if (inView && hasMore) {
            fetchUsers();
        }
    }, [inView, hasMore]);

    return (
        <>
            <div className='bg-white p-3 border border-gray-300 rounded-lg'>
                <p className='mb-4 font-semibold'>Add to your connect</p>
                {
                    users?.map(user => (
                        <div key={user._id} className='flex gap-3 mb-4'>
                            <div className='w-14 h-14'>
                                <Image
                                    src={user.profileImage ? user.profileImage : "/assets/user.png"}
                                    alt="Profile"
                                    className="rounded-full w-14 h-14 border-2 border-white object-cover object-top"
                                />
                            </div>

                            <div className='flex flex-col xl:flex-row gap-1 xl:gap-3 xl:items-center'>
                                <div>
                                    <h1 className='font-semibold'>{user.fullName}</h1>
                                    <p className='text-xs text-gray-500'>
                                        {user.designation ? user.designation : 'No designation available'}
                                    </p>
                                </div>
                                <button className='w-20 xl:w-24 mt-1 text-sm py-1 px-3 rounded-lg border border-gray-600 hover:border-black hover:bg-gray-200 flex gap-1 justify-center items-center font-bold'>
                                    <FiPlus size={16} />Add
                                </button>
                            </div>
                        </div>
                    ))
                }
            </div>

            {/* Element to trigger for more fetch */}
            {hasMore && (
                <div ref={ref} className="h-fit">
                    <PostSkeleton />
                </div>
            )}
        </>
    );
};

export default ConnectionRecommendations;
