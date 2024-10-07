import axios from "axios";

export const getJobPosts = async (userId: string, page = 0, limit = 10) => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/job-post`, {
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
        const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/job-post/${companyId}`, {
            params: { page, limit }
        });
        const jobPosts = response.data;

        return jobPosts;
    } catch (error) {
        console.error("Error fetching job posts:", error);
        return [];
    }
};

export const createJobPost = async (jobPostData: any) => {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/job-post`, jobPostData);
        const newJobPost = response.data;

        return newJobPost;
    } catch (error) {
        console.error("Error creating job post:", error);
        return null;
    }
};

export const updateJobPost = async (jobPostId: string, updatedData: any) => {
    try {
        const response = await axios.patch(`${process.env.NEXT_PUBLIC_SERVER_URL}/job-post/${jobPostId}`, updatedData);
        const updatedJobPost = response.data;

        return updatedJobPost;
    } catch (error) {
        console.error("Error updating job post:", error);
        return null;
    }
};

export const deleteJobPost = async (jobPostId: string) => {
    try {
        const response = await axios.delete(`${process.env.NEXT_PUBLIC_SERVER_URL}/job-post/${jobPostId}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting job post:", error);
        return null;
    }
};
