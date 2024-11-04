'use client';

import { getConnections, removeConnection } from '@/apiFunctions/connection';
import { useDispatch, useSelector } from 'react-redux';
import { setConnections, removeConnection as removeConnectionRedux, setConnectionStatus } from '@/redux/connectionSlice';
import MyConnectionProfileHeader from '../my-connections-shared-component/MyConnectionProfileHeader';
import React, { useEffect, useState } from 'react';

const Connection = () => {
    const dispatch = useDispatch();
    const user = useSelector((state: any) => state.user.user);
    const connections = useSelector((state: any) => state.connection.connections);
    const [buttonLoading, setButtonLoading] = useState(false);

    const handleRemoveConnection = async (userId2: string) => {
        try {
            setButtonLoading(true);

            const res = await removeConnection(user._id, userId2);
            if (res) {
                dispatch(setConnectionStatus({ userId: userId2, status: 'no_relationship' }));
                dispatch(removeConnectionRedux(userId2));
            }
        } catch (error) {
            console.log('Error removing connection', error)
        }

        setButtonLoading(false);
    };

    useEffect(() => {
        const fetchConnections = async () => {
            try {
                const res = await getConnections(user._id);
                dispatch(setConnections(res.connectedUserIds));
            } catch (error) {
                console.error('Error fetching connections:', error);
            }
        };

        if (user?._id) {
            fetchConnections();
        }
    }, [user, dispatch]);

    return (
        <>
            {connections.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2 mt-4">
                    {connections?.map((connection: any) => (
                        <div key={connection._id} className="border bg-white shadow rounded-lg p-3">
                            <MyConnectionProfileHeader userId={connection._id} profileImage={connection.profileImage} fullName={connection.fullName} email={connection.email} />
                            <button
                                onClick={() => handleRemoveConnection(connection._id)}
                                className="w-full mt-2 text-sm py-1 px-3 rounded-lg border border-gray-600 hover:border-black hover:bg-gray-200 flex gap-1 justify-center items-center font-bold"
                                disabled={buttonLoading}
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <p className='text-center'>No connections</p>
            )}
        </>
    );
};

export default Connection;
