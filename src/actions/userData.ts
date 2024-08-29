import axios from "axios"

export const getUser = async (userUid) => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_AUTH_URL}/user/uid/${userUid}`);
        return response.data;
    }
    catch (error) {
        console.log(error);
        return error;
    }
}