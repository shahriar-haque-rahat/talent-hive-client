import axios from "axios"

export const getUser = async (userId) => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_AUTH_URL}/user/id/${userId}`);
        return response.data;
    }
    catch (error) {
        console.log(error);
        return error;
    }
}