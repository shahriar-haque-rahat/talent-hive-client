'use client'

import React, { useState, useEffect } from 'react';
import { getConversation, sendMessage } from '@/apiFunctions/messagingData';
import Chats from './Chats';
import { Image } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { addChatContact, updateChatContact } from '@/redux/chatListSlice';
import { useDispatch, useSelector } from 'react-redux';
import socket from '@/web-socket/socket';

interface ConversationInterface {
    userId: string
    contactId: string
}

const Conversation = ({ userId, contactId }: ConversationInterface) => {
    const dispatch = useDispatch();
    const [chats, setChats] = useState([]);
    const user = useSelector((state: any) => state.user.user);
    const [contactPerson, setContactPerson] = useState(null);
    const router = useRouter();

    const handleProfile = () => {
        router.push(`/profile?id=${userId}`);
    }

    const fetchChats = async () => {
        const conversation = await getConversation(userId, contactId);

        if (conversation) {
            setChats(conversation.messages);

            const contact = conversation.user1?._id === contactId ? conversation.user1 : conversation.user2;
            if (contact) {
                setContactPerson(contact);
            }
        }
    };

    useEffect(() => {
        const handleNewMessage = (updatedConversation) => {
            const lastMessageData = updatedConversation.messages[updatedConversation.messages.length - 1];

            const userIDs = [updatedConversation.user1._id, updatedConversation.user2._id];

            if (!userIDs.includes(user._id)) {
                return;
            }

            const otherUser = lastMessageData.sender._id === userId
                ? updatedConversation.user1._id === userId
                    ? updatedConversation.user2
                    : updatedConversation.user1
                : lastMessageData.sender;

            dispatch(updateChatContact({
                otherUserId: otherUser._id,
                lastMessage: lastMessageData.message,
                lastMessageTime: lastMessageData.createdAt,
                otherUserProfileImage: otherUser.profileImage,
                otherUserFullName: otherUser.fullName,
            }));

            if (otherUser._id === contactId) {
                setChats(updatedConversation.messages);
            }
        };

        const handleNewConversation = async (conversation) => {
            if (conversation.user1._id === userId || conversation.user2._id === userId) {
                setChats(conversation.messages);

                const contact = conversation.user1._id === userId ? conversation.user2 : conversation.user1;
                dispatch(addChatContact({
                    otherUserId: contact._id,
                    lastMessage: conversation.messages[conversation.messages.length - 1].message,
                    lastMessageTime: conversation.messages[conversation.messages.length - 1].createdAt,
                    otherUserProfileImage: contact.profileImage,
                    otherUserFullName: contact.fullName,
                }));
            }
        };

        socket.on('message', handleNewMessage);
        socket.on('newConversation', handleNewConversation);

        return () => {
            socket.off('message', handleNewMessage);
            socket.off('newConversation', handleNewConversation);
        };
    }, [contactId, userId]);

    useEffect(() => {
        if (userId && contactId) {
            fetchChats();
        }
    }, [userId, contactId]);

    return (
        <div className='bg-white rounded-lg border shadow h-[calc(100vh-110px)]'>
            {contactPerson &&
                <div className='h-20 p-4 border-b border-gray-300'>
                    <div className='flex gap-3 xl:gap-6 mb-4'>
                        <div className='flex-shrink-0 w-12 h-12 my-auto'>
                            <Image
                                onClick={handleProfile}
                                src={contactPerson.profileImage ? contactPerson.profileImage : "/assets/user.png"}
                                alt="Profile"
                                className=" cursor-pointer rounded-full w-12 h-12 border border-gray-300 object-cover object-top"
                            />
                        </div>

                        <div className='flex-grow flex flex-col gap-1 justify-center'>
                            <h1 onClick={handleProfile} className='flex-wrap font-semibold hover:underline cursor-pointer'>{contactPerson.fullName}</h1>
                        </div>
                    </div>
                </div>
            }
            <Chats chats={chats} userId={userId} contactId={contactId} />
        </div>
    );
};

export default Conversation;
