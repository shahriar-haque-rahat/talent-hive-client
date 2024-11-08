import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name: 'notification',
    initialState: {
        notifications: [],
        notificationsPage: 0,
        notificationCount: 0,
    },
    reducers: {
        setNotifications: (state, action) => {
            const { notifications, page } = action.payload;

            const existingIds = new Set(state.notifications.map(n => n._id));

            const uniqueNotifications = notifications.filter(n => !existingIds.has(n._id));

            state.notifications = page === 0 ? uniqueNotifications : [...state.notifications, ...uniqueNotifications];
            state.notificationsPage = page;
        },
        updateNotification: (state, action) => {
            const updatedNotification = action.payload;
            const index = state.notifications.findIndex(n => n._id === updatedNotification._id);
            if (index !== -1) {
                state.notifications[index] = updatedNotification;
            }
        },
        updateMultipleNotifications: (state, action) => {
            const updatedNotifications = action.payload;
            updatedNotifications.forEach(updatedNotification => {
                const index = state.notifications.findIndex(n => n._id === updatedNotification._id);
                if (index !== -1) {
                    state.notifications[index] = updatedNotification;
                }
            });
        },
        deleteNotification: (state, action) => {
            const notificationId = action.payload;
            state.notifications = state.notifications.filter(n => n._id !== notificationId);
        },
        setNotificationCount: (state, action) => {
            state.notificationCount = action.payload;
        },
    },
});

export const { setNotifications, updateNotification, updateMultipleNotifications, deleteNotification, setNotificationCount } = notificationSlice.actions;
export default notificationSlice.reducer;
