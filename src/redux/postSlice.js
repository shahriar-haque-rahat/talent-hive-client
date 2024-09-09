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

            let postIndex = state.posts.findIndex(post => post._id === updatedPost._id);
            if (postIndex !== -1) {
                state.posts[postIndex] = { ...state.posts[postIndex], ...updatedPost };
            } else {
                const cachedPostIndex = state.cachedPosts.findIndex(post => post._id === updatedPost._id);
                if (cachedPostIndex !== -1) {
                    state.cachedPosts[cachedPostIndex] = { ...state.cachedPosts[cachedPostIndex], ...updatedPost };
                }
            }
        },
        addCachePost: (state, action) => {
            const { postData } = action.payload;
            const isPostAlreadyStored = state.posts.some(post => post._id === postData._id) || state.cachedPosts.some(post => post._id === postData._id);
            if (!isPostAlreadyStored) {
                state.cachedPosts.push(postData);
            }
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

export const selectManyPostById = (state, postId) => {
    const combinedPosts = [...state.post.posts, ...state.post.cachedPosts];
    const uniquePosts = combinedPosts.filter(post => post.sharedPostId?._id === postId);

    return uniquePosts;
};

export default postSlice.reducer;
