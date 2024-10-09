import { createSlice } from "@reduxjs/toolkit";

const jobPostSlice = createSlice({
    name: 'jobPost',
    initialState: {
        jobPosts: [],
        jobPostsPage: 0,
    },
    reducers: {
        setJobPosts: (state, action) => {
            state.jobPosts = action.payload;
        },
        setJobPostsPage: (state, action) => {
            state.jobPostsPage = action.payload;
        },
        addJobPost: (state, action) => {
            const { jobPostData } = action.payload;
            state.jobPosts.unshift(jobPostData);
        },
        editPost: (state, action) => {
            const { jobPostId, editedData } = action.payload;

            const jobPostIndex = state.jobPosts.findIndex(jobPost => jobPost._id === jobPostId);
            if (jobPostIndex !== -1) {
                state.jobPosts[jobPostIndex] = {
                    ...state.jobPosts[jobPostIndex],
                    ...editedData,
                };
            }
        },
        removePost: (state, action) => {
            const jobPostId = action.payload;
            state.jobPosts = state.jobPosts.filter(jobPost => jobPost._id !== jobPostId);
        },
    },
});

export const { setJobPosts, setJobPostsPage, addJobPost, editPost, removePost } = jobPostSlice.actions;

export const selectJobPostById = (state, jobPostId) => {
    const jobPost = state.jobPost.jobPosts.find(post => post._id === jobPostId);
    if (jobPost) {
        return jobPost;
    }

    return undefined;
};

export default jobPostSlice.reducer;
