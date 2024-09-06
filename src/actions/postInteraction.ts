import axios from "axios"

// Like
export const getLikes = async (postId: string) => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/post/${postId}/like`)

        // console.log(response.data);
        return response.data;
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

        // console.log(response.data);
        return response.data;
    }
    catch (error) {
        console.error("Error liking post:", error);
        return error;
    }
}
// :id/like/:likeId
export const deleteLike = async (postId: string, likeId: string) => {
    try {
        const response = await axios.delete(`${process.env.NEXT_PUBLIC_SERVER_URL}/post/${postId}/like/${likeId}`);

        // console.log(response.data);
        return response.data;
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

        // console.log(response.data);
        return response.data;
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

        // console.log(response.data);
        return response.data;
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

        // console.log(response.data);
        return response.data;
    }
    catch (error) {
        console.error("Error updating comment:", error);
        return error;
    }
}

export const deleteComment = async (postId: string, id: string) => {
    try {
        const response = await axios.delete(`${process.env.NEXT_PUBLIC_SERVER_URL}/post/${postId}/comment/${id}`);

        // console.log(response.data);
        return response.data;
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

        // console.log(response.data);
        return response.data;
    }
    catch (error) {
        console.error("Error getting shares:", error);
        return error;
    }
}

export const postShare = async (postId: string, userId: string, content: string) => {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/post/${postId}/share`, {
            postId,
            userId,
            content
        });

        // console.log(response.data);
        return response.data;
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

        // console.log(response.data);
        return response.data;
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

        // console.log(response.data);
        return response.data;
    }
    catch (error) {
        console.error("Error saving post:", error);
        return error;
    }
}

export const deleteSave = async (postId: string, saveId: string) => {
    try {
        const response = await axios.delete(`${process.env.NEXT_PUBLIC_SERVER_URL}/post/${postId}/save/${saveId}`);

        // console.log(response.data);
        return response.data;
    }
    catch (error) {
        console.error("Error liking post:", error);
        return error;
    }
}
