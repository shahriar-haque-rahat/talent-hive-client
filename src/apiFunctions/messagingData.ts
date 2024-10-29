import axios from 'axios';

export const getChatList = async (userId: string) => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_CHAT_URL}/conversation/${userId}`);

        return response.data;
    } catch (error) {
        console.error("Error fetching conversation:", error);
        return null;
    }
};

export const getOrCreateConversation = async (user1Id: string, user2Id: string) => {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_CHAT_URL}/conversation/get-or-create`, { userId: user1Id, contactId: user2Id });

        return response.data;
    } catch (error) {
        console.error("Error fetching conversation:", error);
        return [];
    }
};

export const getConversation = async (user1Id: string, user2Id: string) => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_CHAT_URL}/conversation/${user1Id}/${user2Id}`);

        return response.data;
    } catch (error) {
        console.error("Error fetching conversation:", error);
        return [];
    }
};

export const sendMessage = async (messageData: any) => {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_CHAT_URL}/conversation`, messageData);

        return response.data;
    } catch (error) {
        console.error("Error sending message:", error);
        return null;
    }
};
