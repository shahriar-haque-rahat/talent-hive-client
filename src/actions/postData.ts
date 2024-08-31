import axios from "axios";

export const getPosts = async () => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/post`);
        const posts = response.data;

        return posts;
    } catch (error) {
        console.error("Error fetching posts:", error);
        return [];
    }
};
