import React, { useEffect, useState } from 'react';
import { IoNotificationsSharp } from 'react-icons/io5';
import { Badge } from '@nextui-org/react';
import { useDispatch, useSelector } from 'react-redux';
import { getNotificationCount } from '@/apiFunctions/notificationData';
import { setNotificationCount } from '@/redux/notificationSlice';

const NotificationsBadge = () => {
    const dispatch = useDispatch();
    const user = useSelector((state: any) => state.user.user);
    const unreadCount = useSelector((state: any) => state.notification.notificationCount);

    useEffect(() => {
        const fetchUnreadCount = async () => {
            try {
                const response = await getNotificationCount(user._id);

                dispatch(setNotificationCount(response.count));
            } catch (error) {
                console.error("Failed to fetch unread notifications count:", error);
            }
        };

        fetchUnreadCount();
    }, [user]);

    return (
        <Badge
            content={unreadCount}
            placement="top-right"
            shape="circle"
            size="sm"
            className='bg-sky-600 text-white'
        >
            <IoNotificationsSharp size={22} />
        </Badge>
    );
};

export default NotificationsBadge;
