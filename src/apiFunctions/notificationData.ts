import axios from 'axios';

export const getNotifications = async (userId: string, page: number, limit: number) => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/notifications/${userId}`, {
            params: { page, limit },
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching notifications:', error);
        return [];
    }
};

export const getNotificationCount = async (userId: string) => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/notifications/${userId}/unread-count`);

        return response.data;
    } catch (error) {
        console.error('Error fetching notification count:', error);
        return [];
    }
};

export const createNotification = async (notificationData: { type: string; recipient: string; sender: string; postId?: string; jobId?: string }) => {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/notifications`, notificationData);

        return response.data;
    } catch (error) {
        console.error('Error creating notification:', error);
        throw new Error('Failed to create notification');
    }
};

export const markNotificationAsRead = async (notificationId: string) => {
    try {
        const response = await axios.patch(`${process.env.NEXT_PUBLIC_SERVER_URL}/notifications/${notificationId}/read`);

        return response.data;
    } catch (error) {
        console.error('Error marking notification as read:', error);
        throw new Error('Failed to mark notification as read');
    }
};

export const markAllNotificationsAsRead = async (userId: string) => {
    try {
        const response = await axios.patch(`${process.env.NEXT_PUBLIC_SERVER_URL}/notifications/${userId}/mark-all-read`);
        return response.data;
    } catch (error) {
        console.error('Error marking all notifications as read:', error);
        return [];
    }
};

export const deleteNotification = async (notificationId: string) => {
    try {
        await axios.delete(`${process.env.NEXT_PUBLIC_SERVER_URL}/notifications/${notificationId}`);

        return true;
    } catch (error) {
        console.error('Error deleting notification:', error);
        throw new Error('Failed to delete notification');
    }
};
