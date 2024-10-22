'use client'

import { getNotifications } from '@/apiFunctions/notificationData';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setNotifications } from '@/redux/notificationSlice';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

const NotificationList = () => {
    const user = useSelector((state: any) => state.user.user);
    const dispatch = useDispatch();
    const notifications = useSelector((state: any) => state.notification.notifications);
    const page = useSelector((state: any) => state.notification.notificationsPage);

    const { ref, inView } = useIntersectionObserver();
    const [hasMore, setHasMore] = useState(true);

    const fetchNotifications = async () => {
        if (user) {
            const res = await getNotifications(user._id, page, 10);

            dispatch(setNotifications({ notifications: res.notifications, page: res.page }));
        }
    };

    useEffect(() => {
        if (notifications.length === 0) {
            fetchNotifications();
        }
    }, [user]);

    useEffect(() => {
        if (inView && hasMore) {
            fetchNotifications();
        }
    }, [inView, hasMore]);

    return (
        <>
            <div className=' bg-white p-3 border shadow rounded-lg'>
                notifications
            </div>
        </>
    );
};

export default NotificationList;
