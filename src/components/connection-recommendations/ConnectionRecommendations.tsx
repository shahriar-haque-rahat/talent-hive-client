'use client';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '@/apiFunctions/userData';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { addFetchedUsers } from '@/redux/userSlice';
import UserConnectionCard from './UserConnectionCard';
import UserConnectionCardSkeleton from '@/skeletons/UserConnectionCardSkeleton';
import { checkConnectionStatus } from '@/apiFunctions/connection';
import { setBulkConnectionStatus } from '@/redux/connectionSlice';
import UserProfileSearch from '../shared/searching-components/UserProfileSearch';

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

                const userIds = fetchedUsers.users.map((u: any) => u._id);
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
        if (inView && hasMore) {
            fetchUsersAndStatuses();
        }
    }, [inView, hasMore, page]);

    const getConnectionStatus = (userId: string) => {
        return connectionStatus[userId] || 'no_relationship';
    };

    return (
        <>
            <div className="sticky top-20 z-10 mb-2 border-b border-gray-300 bg-gray-100">
                <h1 className="mb-4 text-2xl font-semibold px-6 py-8 bg-white rounded-lg shadow border">
                    People You May Know
                </h1>
                <div className="mb-4 md:w-1/2">
                    <UserProfileSearch />
                </div>
            </div>

            <div>
                <div>
                    {users?.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                            {users?.map((userInfo: any) => {
                                const connectionStatus = getConnectionStatus(userInfo._id);
                                return (
                                    <UserConnectionCard
                                        key={userInfo._id}
                                        user={userInfo}
                                        loggedInUser={user}
                                        connectionStatus={connectionStatus}
                                    />
                                );
                            })}
                        </div>
                    ) : (
                        <p className="text-center">No connection recommendations</p>
                    )}
                </div>

                {hasMore && (
                    <div ref={ref} className="h-fit">
                        <UserConnectionCardSkeleton />
                    </div>
                )}
            </div>
        </>

    );
};

export default ConnectionRecommendations;
