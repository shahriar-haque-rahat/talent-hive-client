import React, { useEffect, useState } from 'react';
import { MdMessage } from 'react-icons/md';
import { Badge } from '@nextui-org/react';
import { useDispatch, useSelector } from 'react-redux';
import { setChatList, updateChatContact } from '@/redux/chatListSlice';
import socket from '@/web-socket/socket';
import { getChatList } from '@/apiFunctions/messagingData';

const MessagingBadge = () => {
    const dispatch = useDispatch();
    const user = useSelector((state: any) => state.user.user);
    const chatList = useSelector((state: any) => state.chatList.chatList);

    const totalUnreadMessageCount = chatList?.reduce((total: number, contact: any) => {
        return total + (contact.unreadCount || 0);
    }, 0);

    useEffect(() => {
        const handleNewMessage = async (updatedConversation) => {
            const lastMessageData = updatedConversation.messages[updatedConversation.messages.length - 1];
            const userIDs = [updatedConversation.user1._id, updatedConversation.user2._id];

            if (!userIDs.includes(user._id)) return;

            const isSender = lastMessageData.sender._id === user._id;
            const otherUser = lastMessageData.sender._id === user._id
                ? updatedConversation.user1._id === user._id
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
        };

        socket.on('message', handleNewMessage);

        return () => {
            socket.off('message', handleNewMessage);
        };
    }, [user]);

    const fetchContacts = async () => {
        try {
            const response = await getChatList(user._id);
            if (response) {
                dispatch(setChatList(response));
            }
        } catch (error) {
            console.error("Error fetching chatList:", error);
        }
    };

    useEffect(() => {
        if (chatList.length === 0) {
            fetchContacts();
        }
    }, [user._id]);

    return (
        <Badge
            content={totalUnreadMessageCount}
            placement="top-right"
            shape="circle"
            size="sm"
            className='bg-sky-600 text-white'
        >
            <MdMessage size={22} />
        </Badge>
    );
};

export default MessagingBadge;
