'use client';

import { getNotifications, markNotificationAsRead, deleteNotification as apiDeleteNotification, markAllNotificationsAsRead } from '@/apiFunctions/notificationData';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setNotifications, updateNotification, deleteNotification, updateMultipleNotifications } from '@/redux/notificationSlice';
import { formatDistanceToNow } from 'date-fns';
import { FiMoreHorizontal } from 'react-icons/fi';
import { BiCommentDetail, BiLike, BiShare } from 'react-icons/bi';

const NotificationList = () => {
    const user = useSelector((state: any) => state.user.user);
    const dispatch = useDispatch();
    const notifications = useSelector((state: any) => state.notification.notifications);
    const page = useSelector((state: any) => state.notification.notificationsPage);

    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [selectedNotification, setSelectedNotification] = useState<string | null>(null);

    const fetchNotifications = async (isInitialFetch = false) => {
        console.log('fetched')
        if (user && !loading) {
            setLoading(true);
            const res = await getNotifications(user._id, isInitialFetch ? 0 : page, 10);

            if (res.notifications.length < 10) {
                setHasMore(false);
            }

            dispatch(setNotifications({ notifications: res.notifications, page: res.page }));
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user && notifications.length === 0) {
            fetchNotifications(true);
        }
    }, [user]);

    const handleMarkAsRead = async (notificationId: string) => {
        const updatedNotification = await markNotificationAsRead(notificationId);
        dispatch(updateNotification(updatedNotification));
        setSelectedNotification(null);
    };

    const handleMarkAllAsRead = async () => {
        const updatedNotifications = await markAllNotificationsAsRead(user._id);
        dispatch(updateMultipleNotifications(updatedNotifications));
    };

    const handleDeleteNotification = async (notificationId: string) => {
        await apiDeleteNotification(notificationId);
        dispatch(deleteNotification(notificationId));
        setSelectedNotification(null);
    };

    const handlePostLinkClick = (postId: string) => {
        console.log(`Post ID: ${postId}`);
    };

    const getIcon = (type: string, senderProfileImage: string) => {
        switch (type) {
            case 'like':
                return <BiLike size={28} className="text-blue-500 mr-3" />;
            case 'comment':
                return <BiCommentDetail size={28} className="text-green-500 mr-3" />;
            case 'share':
                return <BiShare style={{ transform: "scaleX(-1)" }} size={28} className="text-yellow-500 mr-3" />;
            case 'connection_request':
            case 'connection_accept':
                return (
                    <img
                        src={senderProfileImage}
                        alt="Sender Profile"
                        className="w-10 h-10 rounded-full object-cover object-top"
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div className="bg-white border py-1 shadow rounded-lg">
            <div className=' p-4 border-b flex justify-between items-center'>
                <h1 className=' text-xl font-bold'>Notifications</h1>
                <button onClick={handleMarkAllAsRead} className=' hover:underline'>Mark all as read</button>
            </div>

            <div className='max-h-[calc(100vh-150px)] overflow-y-scroll'>
                {notifications.length > 0 ? (
                    notifications.map((notification: any) => (
                        <div
                            key={notification._id}
                            className={` flex items-center p-6 border-b ${notification.isRead ? 'bg-white' : 'bg-blue-50'}`}
                        >
                            {/* Icon or Profile Image */}
                            <div className="mr-4">
                                {getIcon(notification.type, notification.sender.profileImage)}
                            </div>

                            {/* Notification Content */}
                            <div className="flex-1">
                                <p className="text-gray-700">
                                    <strong>{notification.sender.fullName}</strong>
                                    {notification.type === 'like' && ' liked your '}
                                    {notification.type === 'comment' && ' commented on your '}
                                    {notification.type === 'share' && ' shared your '}
                                    {notification.type === 'connection_request' && ' sent you a connection request'}
                                    {notification.type === 'connection_accept' && ' accepted your connection request'}

                                    {(notification.type === 'like' || notification.type === 'comment' || notification.type === 'share') && (
                                        <span
                                            className="text-sky-500 cursor-pointer hover:underline"
                                            onClick={() => handlePostLinkClick(notification.postId)}
                                        >
                                            post
                                        </span>
                                    )}
                                </p>
                                <p className="text-gray-500 text-sm">
                                    {formatDistanceToNow(new Date(notification.createdAt))} ago
                                </p>
                            </div>

                            {/* Dropdown Menu for Mark as Read/Delete */}
                            <div className="relative">
                                <button
                                    onClick={() => setSelectedNotification(notification._id === selectedNotification ? null : notification._id)}
                                    className="ml-4 text-gray-500 hover:text-gray-700 focus:outline-none"
                                >
                                    <FiMoreHorizontal size={24} />
                                </button>

                                {selectedNotification === notification._id && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-10">
                                        {!notification.isRead && (
                                            <button
                                                onClick={() => handleMarkAsRead(notification._id)}
                                                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                                            >
                                                Mark as Read
                                            </button>
                                        )}
                                        <button
                                            onClick={() => handleDeleteNotification(notification._id)}
                                            className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
                                        >
                                            Delete Notification
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500">No notifications</p>
                )}

                {/* Show More Button */}
                {hasMore && (
                    <div className="my-4 text-center">
                        <button
                            onClick={() => fetchNotifications(false)} // Fetch next page
                            className={`w-32 mx-auto mt-1 text-sm py-1 px-3 rounded-lg border border-gray-600 hover:border-black hover:bg-gray-200 flex gap-1 justify-center items-center font-bold ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={loading}
                        >
                            {loading ? 'Loading...' : 'Show More'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NotificationList;
