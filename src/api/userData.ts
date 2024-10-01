import axios from "axios"

export const getUsers = async (userId, limit, page) => {
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

export const getUser = async (userId) => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_AUTH_URL}/user/id/${userId}`);
        return response.data;
    }
    catch (error) {
        console.error(error);
        return error;
    }
}

