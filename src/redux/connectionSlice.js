import { createSlice } from "@reduxjs/toolkit";

const connection = createSlice({
    name: 'connection',
    initialState: {
        connectionStatus: {},
    },
    reducers: {
        setConnectionStatus: (state, action) => {
            const { userId, status } = action.payload;
            state.connectionStatus[userId] = status;
        },
        setBulkConnectionStatus: (state, action) => {
            const statuses = action.payload;
            statuses.forEach(({ userId, status }) => {
                state.connectionStatus[userId] = status;
            });
        },
        removeConnectionStatus: (state, action) => {
            const userId = action.payload;
            delete state.connectionStatus[userId];
        },
    },
});

export const { setConnectionStatus, setBulkConnectionStatus, removeConnectionStatus } = connection.actions;

export default connection.reducer;
