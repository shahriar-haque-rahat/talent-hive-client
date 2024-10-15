'use client';

import { getConnections, removeConnection } from '@/apiFunctions/connection';
import { setConnectionStatus } from '@/redux/connectionSlice';
import { Image } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MyConnectionProfileHeader from '../my-connections-shared-component/MyConnectionProfileHeader';

const Connection = () => {
    const dispatch = useDispatch();
    const user = useSelector((state: any) => state.user.user);
    const [connections, setConnections] = useState<any[]>([]);

    const handleRemoveConnection = async (userId2: string) => {
        const res = await removeConnection(user._id, userId2);
        if (res) {
            dispatch(setConnectionStatus({ userId: userId2, status: 'no_relationship' }));

            setConnections((prevConnections) =>
                prevConnections.filter(connection => connection._id !== userId2)
            );
        }
    };

    useEffect(() => {
        const fetchConnections = async () => {
            try {
                const res = await getConnections(user._id);
                setConnections(res.connectedUserIds);
            } catch (error) {
                console.error('Error fetching connections:', error);
            }
        };

        if (user?._id) {
            fetchConnections();
        }
    }, [user]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2 mt-4">
            {connections?.map((connection) => (
                <div key={connection._id} className=" border bg-white shadow rounded-lg p-3">
                    <MyConnectionProfileHeader profileImage={connection.profileImage} fullName={connection.fullName} email={connection.email}/>
                    <button
                        onClick={() => handleRemoveConnection(connection._id)}
                        className="w-full mt-2 text-sm py-1 px-3 rounded-lg border border-gray-600 hover:border-black hover:bg-gray-200 flex gap-1 justify-center items-center font-bold"
                    >
                        Remove
                    </button>
                </div>
            ))}
        </div>
    );
};

export default Connection;