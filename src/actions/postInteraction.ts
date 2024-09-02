import axios from "axios"

// Like
export const likePost = async (postUid: string, userId: string) => {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/post/${postUid}/like`, {
            postUid,
            userId
        });
        return response;
    }
    catch (error) {
        console.error("Error getting posts:", error);
        return error;
    }
}

export const getLikes = async (postUid: string) => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/post/${postUid}/like`)

        return response;
    }
    catch (error) {
        console.error("Error getting likes:", error);
        return error;
    }
}

// Comment
export const commentPost = async (postUid: string, userId: string, comment: string) => {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/post/${postUid}/comment`, {
            postUid,
            userId,
            comment
        });
        return response;
    }
    catch (error) {
        console.error("Error fetching posts:", error);
        return error;
    }
}

export const getComments = async (postUid: string, skip: number = 0, limit: number = 5) => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/post/${postUid}/comment`, {
            params: { skip, limit }
        });

        return response.data.comments;
    } catch (error) {
        console.error("Error getting comments:", error);
        return error;
    }
}

// Share
export const sharePost = async (postUid: string, userId: string) => {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/post/${postUid}/share`, {
            postUid,
            userId
        });
        return response;
    }
    catch (error) {
        console.error("Error fetching posts:", error);
        return error;
    }
}

export const getShares = async (postUid: string) => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/post/${postUid}/share`)

        return response;
    }
    catch (error) {
        console.error("Error getting shares:", error);
        return error;
    }
}

// Save
export const savePost = async (postUid: string, userId: string) => {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/post/${postUid}/save`, {
            postUid,
            userId
        });
        return response;
    }
    catch (error) {
        console.error("Error fetching posts:", error);
        return error;
    }
}

export const getSaves = async (postUid: string) => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/post/${postUid}/save`)

        return response;
    }
    catch (error) {
        console.error("Error getting saves:", error);
        return error;
    }
}