import axios from "axios";

export const getPosts = async () => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/post`);
        const posts = response.data;

        return posts;
    }
    catch (error) {
        console.error("Error fetching posts:", error);
        return [];
    }
};

export const getOnePost = async (postUid: string) => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/post/${postUid}`);
        const post = response.data;

        return post;
    }
    catch (error) {
        console.error("Error fetching posts:", error);
        return null;
    }
};

export const createPost = async (postData: any) => {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/post`, postData);
        const newPost = response.data;

        return newPost;
    }
    catch (error) {
        console.error("Error fetching posts:", error);
        return null;
    }
};

export const updatePost = async (postUid: string, updateData: any) => {
    try {
        const response = await axios.patch(`${process.env.NEXT_PUBLIC_SERVER_URL}/post/${postUid}`, updateData);
        const updatedPost = response.data;

        return updatedPost;
    }
    catch (error) {
        console.error("Error fetching posts:", error);
        return null;
    }
};

export const deletePost = async (postUid: string) => {
    try {
        const response = await axios.delete(`${process.env.NEXT_PUBLIC_SERVER_URL}/post/${postUid}`);
        return response.data;
    }
    catch (error) {
        console.error("Error fetching posts:", error);
        return null;
    }
};
