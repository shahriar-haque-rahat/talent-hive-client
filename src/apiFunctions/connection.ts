import axios from "axios";

export const getConnections = async (userId: string) => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/connection/${userId}`);

        return response.data;
    } catch (error) {
        console.error("Error checking connection status:", error);
        return [];
    }
};

// ===================================

export const checkConnectionStatus = async (userId1: string, userIds: string[]) => {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/connection-request/check-status`, {
            loggedInUserId: userId1,
            userIds: userIds,
        });

        return response.data;
    } catch (error) {
        console.error("Error checking connection status:", error);
        return [];
    }
};

export const getPendingRequests = async (userId: string) => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/connection-request/pending/${userId}`);
        const pendingRequests = response.data;

        return pendingRequests;
    } catch (error) {
        console.error("Error fetching pending requests:", error);
        return [];
    }
};

export const getSentRequests = async (userId: string) => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/connection-request/sent/${userId}`);
        const sentRequests = response.data;

        return sentRequests;
    } catch (error) {
        console.error("Error fetching sent requests:", error);
        return [];
    }
};

export const sendConnectionRequest = async (sender: string, receiver: string) => {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/connection-request`, { sender, receiver });
        const newConnectionRequest = response.data;

        return newConnectionRequest;
    } catch (error) {
        console.error("Error send new connection request:", error);
        return [];
    }
};

export const acceptConnectionRequest = async (userId: string, otherUserId: string) => {
    try {
        const response = await axios.patch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/connection-request/accept/${userId}/${otherUserId}`
        );
        const acceptedConnectionRequest = response.data;

        return acceptedConnectionRequest;
    } catch (error) {
        console.error("Error accepting connection request:", error);
        return [];
    }
};

export const deleteConnectionRequest = async (action: string, userId: string, otherUserId: string) => {
    try {
        const response = await axios.delete(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/connection-request/${action}/${userId}/${otherUserId}`
        );
        const deletedConnectionRequest = response.data;

        return deletedConnectionRequest;
    } catch (error) {
        console.error("Error deleting connection request:", error);
        return [];
    }
};

export const removeConnection = async (userId1: string, userId2: string) => {
    try {
        const response = await axios.delete(`${process.env.NEXT_PUBLIC_SERVER_URL}/connection-request/${userId1}/${userId2}`);
        const removedConnection = response.data;

        return removedConnection;
    } catch (error) {
        console.error("Error removing connection request:", error);
        return [];
    }
};
