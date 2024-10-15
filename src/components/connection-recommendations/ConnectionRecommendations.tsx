'use client'

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '@/apiFunctions/userData';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { addFetchedUsers } from '@/redux/userSlice';
import UserConnectionCard from './UserConnectionCard';
import UserConnectionCardSkeleton from '@/skeletons/UserConnectionCardSkeleton';
import { checkConnectionStatus } from '@/apiFunctions/connectionRequest';
import { setBulkConnectionStatus } from '@/redux/connectionSlice';

const ConnectionRecommendations = () => {
    const dispatch = useDispatch();
    const user = useSelector((state: any) => state.user.user);
    const users = useSelector((state: any) => state.user.users);
    const page = useSelector((state: any) => state.user.usersPage);
    const connectionStatus = useSelector((state: any) => state.connection.connectionStatus);
    const { ref, inView } = useIntersectionObserver();
    const [hasMore, setHasMore] = useState(true);

    const fetchUsersAndStatuses = async () => {
        if (!user || !hasMore) return;

        const fetchedUsers = await getUsers(user._id, 12, page);

        if (fetchedUsers?.users && Array.isArray(fetchedUsers.users)) {
            if (fetchedUsers.users.length < 12) {
                setHasMore(false);
            }

            if (fetchedUsers.users.length > 0) {
                dispatch(addFetchedUsers(fetchedUsers));

                const userIds = fetchedUsers.users.map((u) => u._id);
                const statuses = await checkConnectionStatus(user._id, userIds);

                if (statuses) {
                    dispatch(setBulkConnectionStatus(statuses));
                }
            }
        } else {
            setHasMore(false);
        }
    };

    useEffect(() => {
        if (users.length === 0) {
            fetchUsersAndStatuses();
        }
    }, []);

    useEffect(() => {
        if (users.length > 0 && inView && hasMore) {
            fetchUsersAndStatuses();
        }
    }, [inView, hasMore]);

    const getConnectionStatus = (userId) => {
        return connectionStatus[userId] || 'no_relationship';
    };

    return (
        <>
            <div>
                <h1 className='mb-4 text-2xl font-semibold px-6 py-8 bg-white rounded-lg shadow border'>People You May Know</h1>
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3'>
                    {
                        users?.map(userInfo => {
                            const connectionStatus = getConnectionStatus(userInfo._id);
                            return (
                                <UserConnectionCard
                                    key={userInfo._id}
                                    user={userInfo}
                                    loggedInUser={user}
                                    connectionStatus={connectionStatus}
                                />
                            );
                        })
                    }
                </div>
            </div>

            {/* Element to trigger for more fetch */}
            {hasMore && (
                <div ref={ref} className="h-fit">
                    <UserConnectionCardSkeleton />
                </div>
            )}
        </>
    );
};

export default ConnectionRecommendations;
