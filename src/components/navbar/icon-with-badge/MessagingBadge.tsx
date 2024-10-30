import React from 'react';
import { MdMessage } from 'react-icons/md';
import { Badge } from '@nextui-org/react';
import { useSelector } from 'react-redux';

const MessagingBadge = () => {
    const messagingCount = 10

    return (
        <Badge
            content={messagingCount}
            color="primary"
            placement="top-right"
            shape="circle"
            size="sm"
        >
            <MdMessage size={22} />
        </Badge>
    );
};

export default MessagingBadge;
