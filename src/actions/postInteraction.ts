import axios from "axios"

// Like
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

export const postLike = async (postUid: string, userId: string) => {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/post/${postUid}/like`, {
            postUid,
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
export const getComments = async (postUid: string, skip: number = 0, limit: number = 5) => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/post/${postUid}/comment`, {
            params: { skip, limit }
        });

        return response.data.comments;
    }
    catch (error) {
        console.error("Error getting comments:", error);
        return error;
    }
}

export const postComment = async (postUid: string, userId: string, comment: string) => {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/post/${postUid}/comment`, {
            postUid,
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

export const updateComment = async (postUid: string, commentUid: string, comment: string) => {
    try {
        const response = await axios.patch(`${process.env.NEXT_PUBLIC_SERVER_URL}/post/${postUid}/comment/${commentUid}`, {
            comment
        });
        return response.data.comment;
    }
    catch (error) {
        console.error("Error updating comment:", error);
        return error;
    }
}

export const deleteComment = async (postUid: string, uid: string) => {
    try {
        const response = await axios.delete(`${process.env.NEXT_PUBLIC_SERVER_URL}/post/${postUid}/comment/${uid}`);
        return response.data.comment;
    }
    catch (error) {
        console.log("Error deleting comment:", error);
        return error;
    }
}

// Share
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

export const postShare = async (postUid: string, userId: string) => {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/post/${postUid}/share`, {
            postUid,
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

export const postSave = async (postUid: string, userId: string) => {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/post/${postUid}/save`, {
            postUid,
            userId
        });
        return response;
    }
    catch (error) {
        console.error("Error saving post:", error);
        return error;
    }
}
