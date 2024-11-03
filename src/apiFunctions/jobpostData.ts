import { useServer } from "@/hooks/useAxiosInstances";
import axios from "axios";

export const getJobPosts = async (userId: string, page = 0, limit = 10) => {
    try {
        const response = await useServer.get(`/job-post`, {
            params: { userId, page, limit }
        });
        const jobPosts = response.data;

        return jobPosts;
    } catch (error) {
        console.error("Error fetching job posts:", error);
        return [];
    }
};

export const getJobPostsByCompany = async (companyId: string, page = 0, limit = 10) => {
    try {
        const response = await useServer.get(`/job-post/${companyId}`, {
            params: { page, limit }
        });
        const jobPosts = response.data;

        return jobPosts;
    } catch (error) {
        console.error("Error fetching job posts:", error);
        return [];
    }
};

export const getOneJobPost = async (jobPostId: string) => {
    try {
        const response = await useServer.get(`/job-post/details/${jobPostId}`);
        const jobPost = response.data;

        return jobPost;
    } catch (error) {
        console.error("Error fetching job posts:", error);
        return null;
    }
};

export const createJobPost = async (jobPostData: any) => {
    try {
        const response = await useServer.post(`/job-post`, jobPostData);
        const newJobPost = response.data;

        return newJobPost;
    } catch (error) {
        console.error("Error creating job post:", error);
        return null;
    }
};

export const updateJobPost = async (jobPostId: string, updatedData: any) => {
    try {
        const response = await useServer.patch(`/job-post/${jobPostId}`, updatedData);
        const updatedJobPost = response.data;

        return updatedJobPost;
    } catch (error) {
        console.error("Error updating job post:", error);
        return null;
    }
};

export const applyForJobPost = async (jobPostId: string, updatedData: any) => {
    try {
        const response = await useServer.patch(`/job-post/apply/${jobPostId}`, updatedData);
        const updatedJobPost = response.data;

        return updatedJobPost;
    } catch (error) {
        console.error("Error updating job post:", error);
        return null;
    }
};

export const deleteJobPost = async (jobPostId: string) => {
    try {
        const response = await useServer.delete(`/job-post/${jobPostId}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting job post:", error);
        return null;
    }
};
