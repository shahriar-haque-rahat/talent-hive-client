import React, { useState } from 'react';
import { Button } from '@nextui-org/react';
import { FiPlus } from 'react-icons/fi';
import { acceptConnectionRequest, deleteConnectionRequest, removeConnection, sendConnectionRequest } from '@/apiFunctions/connection';
import { useDispatch } from 'react-redux';
import { setConnectionStatus } from '@/redux/connectionSlice';
import { editUserProfile } from '@/redux/userSlice';
import { createUserConnectionRequestedEvent } from '@/event-emitter/events';
import { useRouter } from 'next/navigation';
import { getOrCreateConversation } from '@/apiFunctions/messagingData';
import socket from '@/web-socket/socket';

const InteractionButtons = ({ user, userProfile, relationshipStatus }) => {
    const dispatch = useDispatch();
    const router = useRouter();

    const handleSelectContact = async (contactId) => {
        const conversation = await getOrCreateConversation(user._id, contactId);
    
        if (conversation) {
            socket.emit('newConversation', conversation);
    
            router.push(`/messaging?userId=${user._id}&contactId=${contactId}`);
        }
    };    

    // connection interactions
    const handleSendConnectionRequest = async (receiverId: string) => {
        const res = await sendConnectionRequest(user._id, receiverId);
        if (res) {
            dispatch(setConnectionStatus({ userId: res.receiver, status: 'request_sent' }));
            dispatch(editUserProfile({ relationshipStatus: 'request_sent' }));
        }

        const event = createUserConnectionRequestedEvent(receiverId);
        window.dispatchEvent(event);
    };

    const handleAcceptConnectionRequest = async (otherUserId: string) => {
        const res = await acceptConnectionRequest(user._id, otherUserId);
        if (res) {
            dispatch(setConnectionStatus({ userId: otherUserId, status: 'connected' }));
            dispatch(editUserProfile({ relationshipStatus: 'connected' }));
        }
    };

    const handleDeleteConnectionRequest = async (action: string, otherUserId: string) => {
        const res = await deleteConnectionRequest(action, user._id, otherUserId);
        if (res) {
            const newStatus = action === 'reject' ? 'no_relationship' : 'no_relationship';
            dispatch(setConnectionStatus({ userId: otherUserId, status: newStatus }));
            dispatch(editUserProfile({ relationshipStatus: newStatus }));
        }
    };

    const handleRemoveConnection = async (userId2: string) => {
        const res = await removeConnection(user._id, userId2);
        if (res) {
            dispatch(setConnectionStatus({ userId: userId2, status: 'no_relationship' }));
            dispatch(editUserProfile({ relationshipStatus: 'no_relationship' }));
        }
    };

    return (
        <>
            <div className='flex justify-center items-center gap-8 '>
                <Button
                    onClick={() => handleSelectContact(userProfile._id)}
                    className='rounded-lg  bg-transparent text-sky-500 text-base font-semibold w-28 border border-sky-500 hover:bg-sky-500 hover:text-white'>
                    Message
                </Button>

                {/* Conditionally render the button or status based on connection status */}
                {
                    (relationshipStatus === 'no_relationship') && (
                        <Button
                            onClick={() => handleSendConnectionRequest(userProfile._id)}
                            className='rounded-lg bg-sky-500 text-white text-base font-semibold w-28 border border-sky-500 hover:bg-white hover:text-sky-500'
                        >
                            <FiPlus size={16} />Add
                        </Button>
                    )
                }
                {
                    (relationshipStatus === 'connected') && (
                        <Button
                            onClick={() => handleRemoveConnection(userProfile._id)}
                            className='rounded-lg bg-sky-500 text-white text-base font-semibold w-28 border border-sky-500 hover:bg-white hover:text-sky-500'
                        >
                            Remove
                        </Button>
                    )
                }
                {
                    (relationshipStatus === 'request_sent') && (
                        <Button
                            onClick={() => handleDeleteConnectionRequest('delete', userProfile._id)}
                            className='rounded-lg bg-sky-500 text-white text-base font-semibold w-28 border border-sky-500 hover:bg-white hover:text-sky-500'
                        >
                            Cancel
                        </Button>
                    )
                }
                {
                    (relationshipStatus === 'request_received') && (
                        <div className=' flex gap-2 w-full'>
                            <Button
                                onClick={() => handleAcceptConnectionRequest(userProfile._id)}
                                className='rounded-lg bg-sky-500 text-white text-base font-semibold w-28 border border-sky-500 hover:bg-white hover:text-sky-500'
                            >
                                Confirm
                            </Button>
                            <Button
                                onClick={() => handleDeleteConnectionRequest('reject', userProfile._id)}
                                className='rounded-lg bg-transparent text-sky-500 text-base font-semibold w-28 border border-sky-500 hover:bg-sky-500 hover:text-white'
                            >
                                Cancel
                            </Button>
                        </div>
                    )
                }
            </div>
        </>
    );
};

export default InteractionButtons;
