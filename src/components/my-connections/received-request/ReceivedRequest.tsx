'use client'

import { getPendingRequests, acceptConnectionRequest, deleteConnectionRequest } from '@/apiFunctions/connection';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MyConnectionProfileHeader from '../my-connections-shared-component/MyConnectionProfileHeader';
import { setConnectionStatus } from '@/redux/connectionSlice';

const ReceivedRequest = () => {
    const dispatch = useDispatch();
    const user = useSelector((state: any) => state.user.user);
    const [receivedRequests, setReceivedRequests] = useState([]);

    const handleAcceptConnectionRequest = async (otherUserId: string) => {
        const res = await acceptConnectionRequest(user._id, otherUserId);
        if (res) {
            setReceivedRequests((prevRequests) =>
                prevRequests.filter((request: any) => request.sender._id !== otherUserId)
            );
            dispatch(setConnectionStatus({ userId: otherUserId, status: 'connected' }));
        }
    };

    const handleDeleteConnectionRequest = async (action: string, otherUserId: string) => {
        const res = await deleteConnectionRequest(action, user._id, otherUserId);
        if (res) {
            setReceivedRequests((prevRequests) =>
                prevRequests.filter((request: any) => request.sender._id !== otherUserId)
            );
            const newStatus = action === 'reject' ? 'no_relationship' : 'no_relationship';
            dispatch(setConnectionStatus({ userId: otherUserId, status: newStatus }));
        }
    };

    useEffect(() => {
        const fetchPendingRequests = async () => {
            try {
                const res = await getPendingRequests(user._id);
                setReceivedRequests(res);
            } catch (error) {
                console.error('Error fetching received requests:', error);
            }
        };
        fetchPendingRequests();
    }, [user._id]);

    return (
        <div>
            {receivedRequests.length > 0 ? (
                <ul className='space-y-2'>
                    {receivedRequests.map((request: any) => (
                        <li key={request.sender._id} className="border bg-white shadow rounded-lg p-3">
                            <MyConnectionProfileHeader
                                profileImage={request.sender.profileImage}
                                fullName={request.sender.fullName}
                                email={request.sender.email}
                            />
                            <div className='flex gap-2 justify-between mt-1 w-full'>
                                <button
                                    onClick={() => handleAcceptConnectionRequest(request.sender._id)}
                                    className='w-full text-sm py-1 px-3 rounded-lg border border-gray-600 bg-gray-600 text-white hover:bg-gray-500 flex gap-1 justify-center items-center font-bold'
                                >
                                    Confirm
                                </button>
                                <button
                                    onClick={() => handleDeleteConnectionRequest('reject', request.sender._id)}
                                    className='w-full text-sm py-1 px-3 rounded-lg border border-gray-600 hover:border-black hover:bg-gray-200 flex gap-1 justify-center items-center font-bold'
                                >
                                    Cancel
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No received requests.</p>
            )}
        </div>
    );
};

export default ReceivedRequest;
