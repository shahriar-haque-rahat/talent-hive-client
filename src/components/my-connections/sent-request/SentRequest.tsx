'use client';

import { getSentRequests, deleteConnectionRequest } from '@/apiFunctions/connection';
import { useDispatch, useSelector } from 'react-redux';
import { setSentRequests, removeSentRequest, setConnectionStatus } from '@/redux/connectionSlice';
import MyConnectionProfileHeader from '../my-connections-shared-component/MyConnectionProfileHeader';
import React, { useEffect } from 'react';

const SentRequest = () => {
    const dispatch = useDispatch();
    const user = useSelector((state: any) => state.user.user);
    const sentRequests = useSelector((state: any) => state.connection.sentRequests);

    const handleDeleteConnectionRequest = async (otherUserId: string) => {
        const res = await deleteConnectionRequest('delete', user._id, otherUserId);
        if (res) {
            dispatch(removeSentRequest(otherUserId));
            dispatch(setConnectionStatus({ userId: otherUserId, status: 'no_relationship' }));
        }
    };

    useEffect(() => {
        const fetchSentRequests = async () => {
            try {
                const res = await getSentRequests(user._id);
                dispatch(setSentRequests(res));
            } catch (error) {
                console.error('Error fetching sent requests:', error);
            }
        };

        fetchSentRequests();
    }, [user._id, dispatch]);

    return (
        <div>
            {sentRequests.length > 0 ? (
                <ul className='space-y-2'>
                    {sentRequests.map((request: any) => (
                        <li key={request.receiver._id} className="border bg-white shadow rounded-lg p-3">
                            <MyConnectionProfileHeader userId={request.receiver._id} profileImage={request.receiver.profileImage} fullName={request.receiver.fullName} email={request.receiver.email} />
                            <div className='flex gap-2 justify-between mt-1 w-full'>
                                <button
                                    onClick={() => handleDeleteConnectionRequest(request.receiver._id)}
                                    className='w-full text-sm py-1 px-3 rounded-lg border border-gray-600 hover:border-black hover:bg-gray-200 flex gap-1 justify-center items-center font-bold'
                                >
                                    Cancel Request
                                </button>
                            </div>
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
