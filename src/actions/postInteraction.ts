import axios from "axios"

// Like
export const getLikes = async (postId: string) => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/post/${postId}/like`)

        return response;
    }
    catch (error) {
        console.error("Error getting likes:", error);
        return error;
    }
}

export const postLike = async (postId: string, userId: string) => {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/post/${postId}/like`, {
            postId,
            userId
        });
        return response;
    }
    catch (error) {
        console.error("Error liking post:", error);
        return error;
    }
}

// Comment
export const getComments = async (postId: string, skip: number = 0, limit: number = 5) => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/post/${postId}/comment`, {
            params: { skip, limit }
        });

        return response.data.comments;
    }
    catch (error) {
        console.error("Error getting comments:", error);
        return error;
    }
}

export const postComment = async (postId: string, userId: string, comment: string) => {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/post/${postId}/comment`, {
            postId,
            userId,
            comment
        });
        return response.data.comment;
    }
    catch (error) {
        console.error("Error commenting post:", error);
        return error;
    }
}

export const updateComment = async (postId: string, commentId: string, comment: string) => {
    try {
        const response = await axios.patch(`${process.env.NEXT_PUBLIC_SERVER_URL}/post/${postId}/comment/${commentId}`, {
            comment
        });
        return response.data.comment;
    }
    catch (error) {
        console.error("Error updating comment:", error);
        return error;
    }
}

export const deleteComment = async (postId: string, id: string) => {
    try {
        const response = await axios.delete(`${process.env.NEXT_PUBLIC_SERVER_URL}/post/${postId}/comment/${id}`);
        return response.data.comment;
    }
    catch (error) {
        console.log("Error deleting comment:", error);
        return error;
    }
}

// Share
export const getShares = async (postId: string) => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/post/${postId}/share`)

        return response;
    }
    catch (error) {
        console.error("Error getting shares:", error);
        return error;
    }
}

export const postShare = async (postId: string, userId: string) => {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/post/${postId}/share`, {
            postId,
            userId
        });
        return response;
    }
    catch (error) {
        console.error("Error sharing post:", error);
        return error;
    }
}

// Save
export const getSaves = async (postId: string) => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/post/${postId}/save`)

        return response;
    }
    catch (error) {
        console.error("Error getting saves:", error);
        return error;
    }
}

export const postSave = async (postId: string, userId: string) => {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/post/${postId}/save`, {
            postId,
            userId
        });
        return response;
    }
    catch (error) {
        console.error("Error saving post:", error);
        return error;
    }
}
