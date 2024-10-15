'use client'

import { deleteConnectionRequest, getSentRequests } from '@/apiFunctions/connection';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MyConnectionProfileHeader from '../my-connections-shared-component/MyConnectionProfileHeader';
import { setConnectionStatus } from '@/redux/connectionSlice';

const SentRequest = () => {
    const dispatch = useDispatch();
    const user = useSelector((state: any) => state.user.user);
    const [sentRequests, setSentRequests] = useState([]);

    const handleDeleteConnectionRequest = async (action: string, otherUserId: string) => {
        const res = await deleteConnectionRequest(action, user._id, otherUserId);
        if (res) {
            const newStatus = action === 'reject' ? 'no_relationship' : 'no_relationship';
            dispatch(setConnectionStatus({ userId: otherUserId, status: newStatus }));

            setSentRequests((prevRequests) =>
                prevRequests.filter((request: any) => request.receiver._id !== otherUserId)
            );
        }
    };

    useEffect(() => {
        const fetchSentRequests = async () => {
            try {
                const res = await getSentRequests(user._id);
                setSentRequests(res);
            } catch (error) {
                console.error('Error fetching sent requests:', error);
            }
        };
        fetchSentRequests();
    }, [user._id]);

    return (
        <div>
            {sentRequests.length > 0 ? (
                <ul className='space-y-2'>
                    {sentRequests.map((request: any) => (
                        <li key={request.receiver._id} className="border bg-white shadow rounded-lg p-3">
                            <MyConnectionProfileHeader
                                profileImage={request.receiver.profileImage}
                                fullName={request.receiver.fullName}
                                email={request.receiver.email}
                            />
                            <button
                                onClick={() => handleDeleteConnectionRequest('delete', request.receiver._id)}
                                className='w-full mt-2 text-sm py-1 px-3 rounded-lg border border-gray-600 hover:border-black hover:bg-gray-200 flex gap-1 justify-center items-center font-bold'
                            >
                                Cancel
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No sent requests.</p>
            )}
        </div>
    );
};

export default SentRequest;
