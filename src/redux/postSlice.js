import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
    name: 'post',
    initialState: {
        posts: [],
        cachedPosts: [],
    },
    reducers: {
        addPost: (state, action) => {
            const { postData } = action.payload;
            state.posts.unshift(postData);
        },
        editPost: (state, action) => {
            const { postId, editedData } = action.payload;
            const index = state.posts.findIndex(post => post._id === postId);
            if (index !== -1) {
                state.posts[index] = {
                    ...state.posts[index],
                    ...editedData,
                };
            }
        },
        removePost: (state, action) => {
            const postId = action.payload;
            state.posts = state.posts.filter(post => post._id !== postId);
        },
        setPosts: (state, action) => {
            state.posts = action.payload;
        },
        updatePostOnInteraction: (state, action) => {
            const updatedPost = action.payload;
            const index = state.posts.findIndex(post => post._id === updatedPost._id);
            if (index !== -1) {
                state.posts[index] = { ...state.posts[index], ...updatedPost };
            }
        },
        addCachePost: (state, action) => {
            const { postData } = action.payload;
            state.cachedPosts.push(postData);
        },
    },
});

export const { setPosts, addPost, editPost, removePost, updatePostOnInteraction, addCachePost } = postSlice.actions;

export const selectPostById = (state, postId) => {
    const postFromCache = state.post.cachedPosts.find(post => post._id === postId);
    if (postFromCache) {
        return postFromCache;
    }

    const postFromState = state.post.posts.find(post => post._id === postId);
    if (postFromState) {
        return postFromState;
    }

    return undefined;
};


export default postSlice.reducer;