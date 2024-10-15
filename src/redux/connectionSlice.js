import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
    name: 'connection',
    initialState: {
        connectionStatus: {},
        connections: [],
        receivedRequests: [],
        sentRequests: []
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
        setConnections: (state, action) => {
            state.connections = action.payload;
        },
        addConnection: (state, action) => {
            const newConnection = action.payload;
            state.connections.push(newConnection);
        },
        setReceivedRequests: (state, action) => {
            state.receivedRequests = action.payload;
        },
        setSentRequests: (state, action) => {
            state.sentRequests = action.payload;
        },
        removeConnection: (state, action) => {
            const userId = action.payload;
            state.connections = state.connections.filter(connection => connection._id !== userId);
        },
        removeReceivedRequest: (state, action) => {
            const userId = action.payload;
            state.receivedRequests = state.receivedRequests.filter(request => request.sender._id !== userId);
        },
        removeSentRequest: (state, action) => {
            const userId = action.payload;
            state.sentRequests = state.sentRequests.filter(request => request.receiver._id !== userId);
        }
    },
});

export const { setConnectionStatus, setBulkConnectionStatus, removeConnectionStatus, setConnections, addConnection, setReceivedRequests, setSentRequests, removeConnection, removeReceivedRequest, removeSentRequest } = connectionSlice.actions;

export default connectionSlice.reducer;
