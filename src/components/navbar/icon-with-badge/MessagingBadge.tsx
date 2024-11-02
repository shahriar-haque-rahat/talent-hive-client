import React, { useState } from 'react';
import { MdMessage } from 'react-icons/md';
import { Badge } from '@nextui-org/react';
import { useSelector } from 'react-redux';

const MessagingBadge = () => {
    const chatList = useSelector((state: any) => state.chatList.chatList);

    const totalUnreadMessageCount = chatList?.reduce((total: number, contact: any) => {
        return total + (contact.unreadCount || 0);
    }, 0);

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
