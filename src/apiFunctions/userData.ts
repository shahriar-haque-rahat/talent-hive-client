import { useAuth } from "@/hooks/useAxiosInstances";
import axios from "axios"

export const getUserByName = async (name: string) => {
    try {
        const response = await useAuth.get(`/user/search-by-name`, {
            params: { name },
        });
        const users = response.data;

        return users;
    } catch (error) {
        console.error("Error fetching users:", error);
        return [];
    }
};

export const getUsers = async (userId: string, limit: number, page: number) => {
    try {
        const response = await useAuth.get(`/user/all-user/${userId}`, {
            params: { limit, page }
        });
        const users = response.data;

        return users;
    } catch (error) {
        console.error("Error fetching users:", error);
        return [];
    }
};

export const suggestionUsers = async (userId: string) => {
    try {
        const response = await useAuth.get(`/user/suggestion-user/${userId}`);
        const users = response.data;

        return users;
    } catch (error) {
        console.error("Error fetching users:", error);
        return [];
    }
};

export const getUserDetails = async (loggedInUserId: string, userId: string) => {
    try {
        const response = await useAuth.get(`/user/${loggedInUserId}/${userId}`);

        return response.data;
    }
    catch (error) {
        console.error(error);
        return error;
    }
};

export const getUser = async (userId: string) => {
    try {
        const response = await useAuth.get(`/user/${userId}`);

        return response.data;
    }
    catch (error) {
        console.error(error);
        return error;
    }
};

export const patchUser = async (userId: string, updateData: any) => {
    try {
        const response = await useAuth.patch(`/user/${userId}`, updateData);
        return response.data;
    }
    catch (error) {
        console.error(error);
        return error;
    }
};

export const deleteUser = async (userId: string) => {
    try {
        const response = await useAuth.delete(`/user/${userId}`);
        return response.data;
    }
    catch (error) {
        console.error(error);
        return error;
    }
};
