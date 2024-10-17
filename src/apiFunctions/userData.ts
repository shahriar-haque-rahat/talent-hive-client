import axios from "axios"

export const getUsers = async (userId: string, limit: number, page: number) => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_AUTH_URL}/user/all-user/${userId}`, {
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
        const response = await axios.get(`${process.env.NEXT_PUBLIC_AUTH_URL}/user/suggestion-user/${userId}`);
        const users = response.data;

        return users;
    } catch (error) {
        console.error("Error fetching users:", error);
        return [];
    }
};

export const getUserDetails = async (loggedInUserId: string, userId: string) => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_AUTH_URL}/user/${loggedInUserId}/${userId}`);

        return response.data;
    }
    catch (error) {
        console.error(error);
        return error;
    }
};

export const getUser = async (userId: string) => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_AUTH_URL}/user/${userId}`);

        return response.data;
    }
    catch (error) {
        console.error(error);
        return error;
    }
};

export const patchUser = async (userId: string, updateData: any) => {
    try {
        const response = await axios.patch(`${process.env.NEXT_PUBLIC_AUTH_URL}/user/${userId}`, updateData);
        return response.data;
    }
    catch (error) {
        console.error(error);
        return error;
    }
};

export const deleteUser = async (userId: string) => {
    try {
        const response = await axios.delete(`${process.env.NEXT_PUBLIC_AUTH_URL}/user/${userId}`);
        return response.data;
    }
    catch (error) {
        console.error(error);
        return error;
    }
};
