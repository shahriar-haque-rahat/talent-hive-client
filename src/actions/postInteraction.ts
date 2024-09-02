import axios from "axios"

export const likePost = async (postUid: string, userId: string) => {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/post/${postUid}/like`, {
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