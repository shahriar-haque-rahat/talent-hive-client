import { useServer } from "@/hooks/useAxiosInstances";
import axios from "axios";

export const getPosts = async (userId: string, page = 0, limit = 10) => {
    try {
        const response = await useServer.get(`/post`, {
            params: { userId, page, limit }
        });
        const posts = response.data;

        return posts;
    } catch (error) {
        console.error("Error fetching posts:", error);
        return [];
    }
};

export const getTimelinePosts = async (userId: string, page = 0, limit = 10) => {
    try {
        const response = await useServer.get(`/post/timeline`, {
            params: { userId, page, limit }
        });
        const posts = response.data;

        return posts;
    } catch (error) {
        console.error("Error fetching posts:", error);
        return [];
    }
};

export const getOnePost = async (postId: string, userId: string) => {
    try {
        const response = await useServer.get(`/post/${postId}`, {
            params: { userId }
        });
        const post = response.data;

        return post;
    }
    catch (error) {
        console.error("Error fetching posts:", error);
        return null;
    }
};

export const getPostShares = async (postId: string, excludePostIds = '') => {
    try {
        const response = await useServer.get(`/post/share/${postId}`, {
            params: {
                exclude: excludePostIds
            }
        });
        const postShares = response.data;

        return postShares;
    }
    catch (error) {
        console.error("Error fetching post shares:", error);
        return null;
    }
};

export const createPost = async (postData: any) => {
    try {
        const response = await useServer.post(`/post`, postData);
        const newPost = response.data;

        return newPost;
    }
    catch (error) {
        console.error("Error creating post:", error);
        return null;
    }
};

export const updatePost = async (postId: string, updateData: any) => {
    try {
        const response = await useServer.patch(`/post/${postId}`, updateData);
        const updatedPost = response.data;

        return updatedPost;
    }
    catch (error) {
        console.error("Error updating post:", error);
        return null;
    }
};

export const deletePost = async (postId: string) => {
    try {
        const response = await useServer.delete(`/post/${postId}`);
        return response.data;
    }
    catch (error) {
        console.error("Error deleting post:", error);
        return null;
    }
};
