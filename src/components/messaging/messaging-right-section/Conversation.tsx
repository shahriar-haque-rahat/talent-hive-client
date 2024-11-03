'use client';

import React, { useEffect, useState } from 'react';
import { getConversation, markAsRead } from '@/apiFunctions/messagingData';
import Chats from './Chats';
import { Image } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { addChatContact, updateMessageReadStatus, updateChatContact } from '@/redux/chatListSlice';
import { useDispatch, useSelector } from 'react-redux';
import socket from '@/web-socket/socket';
import { FaArrowLeft } from "react-icons/fa6";

interface ConversationInterface {
    userId: string | null;
    contactId: string | null;
}

const Conversation = ({ userId, contactId }: ConversationInterface) => {
    const dispatch = useDispatch();
    const [chats, setChats] = useState([]);
    const user = useSelector((state: any) => state.user.user);
    const [contactPerson, setContactPerson] = useState(null);
    const router = useRouter();

    const handleProfile = () => {
        router.push(`/profile?id=${contactId}`);
    };

    const fetchChats = async () => {
        const conversation = await getConversation(userId, contactId);

        if (conversation) {
            setChats(conversation.messages);

            const contact = conversation.user1?._id === contactId ? conversation.user1 : conversation.user2;
            if (contact) {
                setContactPerson(contact);
            }

            await markAsRead(userId, contactId, true);

            dispatch(updateMessageReadStatus({
                otherUserId: contactId,
                lastMessageIsRead: true,
                unreadCount: 0,
            }));
        }
    };

    useEffect(() => {
        const handleNewMessage = async (updatedConversation) => {
            const lastMessageData = updatedConversation.messages[updatedConversation.messages.length - 1];
            const userIDs = [updatedConversation.user1._id, updatedConversation.user2._id];

            if (!userIDs.includes(user._id)) return;

            const isSender = lastMessageData.sender._id === user._id;
            const otherUser = lastMessageData.sender._id === userId
                ? updatedConversation.user1._id === userId
                    ? updatedConversation.user2
                    : updatedConversation.user1
                : lastMessageData.sender;

            const unreadCount = updatedConversation.messages.filter(
                (message) => message.sender._id === otherUser._id && !message.isRead
            ).length;

            dispatch(updateChatContact({
                otherUserId: otherUser._id,
                lastMessage: lastMessageData.message,
                lastMessageTime: lastMessageData.createdAt,
                lastMessageIsRead: isSender ? true : lastMessageData.isRead,
                otherUserProfileImage: otherUser.profileImage,
                otherUserFullName: otherUser.fullName,
                unreadCount: isSender ? 0 : unreadCount,
            }));

            if (!isSender) {
                if (userId && contactId) {
                    await markAsRead(userId, contactId, false);
                }

                dispatch(updateMessageReadStatus({
                    otherUserId: contactId,
                    lastMessageIsRead: true,
                    unreadCount: 0,
                }));
            }

            if (otherUser._id === contactId) {
                setChats(updatedConversation.messages);
            }
        };

        const handleNewConversation = async (conversation) => {
            if (conversation.user1._id === userId || conversation.user2._id === userId) {
                setChats(conversation.messages);
                const contact = conversation.user1._id === userId ? conversation.user2 : conversation.user1;

                const unreadCount = conversation.messages.filter(
                    (message) => message.sender._id === contact._id && !message.isRead
                ).length;

                dispatch(addChatContact({
                    otherUserId: contact._id,
                    lastMessage: conversation.messages[conversation.messages.length - 1].message,
                    lastMessageTime: conversation.messages[conversation.messages.length - 1].createdAt,
                    lastMessageIsRead: conversation.messages[conversation.messages.length - 1].isRead,
                    otherUserProfileImage: contact.profileImage,
                    otherUserFullName: contact.fullName,
                    unreadCount,
                }));
            }
        };

        const handleConversationOpened = (data) => {
            if (
                (data.senderId === userId && data.receiverId === contactId) ||
                (data.senderId === contactId && data.receiverId === userId)
            ) {
                setChats(data.messages);

                dispatch(updateMessageReadStatus({
                    otherUserId: contactId,
                    lastMessageIsRead: true,
                }));
            }
        };

        socket.on('message', handleNewMessage);
        socket.on('newConversation', handleNewConversation);
        socket.on('conversationOpened', handleConversationOpened);

        return () => {
            socket.off('message', handleNewMessage);
            socket.off('newConversation', handleNewConversation);
            socket.off('conversationOpened', handleConversationOpened);
        };
    }, [contactId, userId]);

    useEffect(() => {
        if (userId && contactId) {
            fetchChats();
        }
    }, [userId, contactId]);

    const openConversation = () => {
        socket.emit('openConversation', { userId, contactId });
    };

    return (
        <div className='bg-white rounded-lg border shadow h-[calc(100vh-110px)]' onClick={openConversation}>
            {contactPerson &&
                <div className=' flex items-center gap-3 h-20 p-4 border-b border-gray-300'>
                    <div className=' md:hidden' onClick={() => router.back()}>
                        <FaArrowLeft size={20} />
                        </div>

                    <div className='flex items-center gap-3 xl:gap-6'>
                        <div className='flex-shrink-0 w-12 h-12 '>
                            <Image
                                onClick={handleProfile}
                                src={contactPerson.profileImage ? contactPerson.profileImage : "/assets/user.png"}
                                alt="Profile"
                                className="cursor-pointer rounded-full w-12 h-12 border border-gray-300 object-cover object-top"
                            />
                        </div>

                        <div className='flex-grow'>
                            <h1 onClick={handleProfile} className='font-semibold hover:underline cursor-pointer'>{contactPerson.fullName}</h1>
                        </div>
                    </div>
                </div>
            }
            <Chats chats={chats} userId={userId} contactId={contactId} />
        </div>
    );
};

export default Conversation;
