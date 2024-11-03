import { useChat } from '@/hooks/useAxiosInstances';
import axios from 'axios';

export const getChatList = async (userId: string) => {
    try {
        const response = await useChat.get(`/conversation/${userId}`);

        return response.data;
    } catch (error) {
        console.error("Error fetching conversation:", error);
        return null;
    }
};

export const getOrCreateConversation = async (user1Id: string, user2Id: string) => {
    try {
        const response = await useChat.post(`/conversation/get-or-create`, { userId: user1Id, contactId: user2Id });

        return response.data;
    } catch (error) {
        console.error("Error fetching conversation:", error);
        return [];
    }
};

export const getConversation = async (user1Id: string, user2Id: string) => {
    try {
        const response = await useChat.get(`/conversation/${user1Id}/${user2Id}`);

        return response.data;
    } catch (error) {
        console.error("Error fetching conversation:", error);
        return [];
    }
};

export const sendMessage = async (messageData: any) => {
    try {
        const response = await useChat.post(`/conversation`, messageData);

        return response.data;
    } catch (error) {
        console.error("Error sending message:", error);
        return null;
    }
};

export const markAsRead = async (userId: string, contactId: string, markAll: boolean) => {
    try {
        const response = await useChat.post(`/conversation/mark-as-read`,
            { userId, contactId, markAll }
        );

        return response.data;
    } catch (error) {
        console.error('Error marking messages as read:', error);
        throw error;
    }
};
