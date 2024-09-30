import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
    name: 'post',
    initialState: {
        posts: [],
        cachedPosts: [],
        timelinePosts: [],
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
        setTimelinePosts: (state, action) => {
            state.timelinePosts = action.payload;
        },
        updatePostOnInteraction: (state, action) => {
            const updatedPost = action.payload;
        
            // Update in `posts` array
            let postIndex = state.posts.findIndex(post => post._id === updatedPost._id);
            if (postIndex !== -1) {
                state.posts[postIndex] = { ...state.posts[postIndex], ...updatedPost };
            } 
        
            // Update in `cachedPosts` array
            const cachedPostIndex = state.cachedPosts.findIndex(post => post._id === updatedPost._id);
            if (cachedPostIndex !== -1) {
                state.cachedPosts[cachedPostIndex] = { ...state.cachedPosts[cachedPostIndex], ...updatedPost };
            }
        
            // Update in `timelinePosts` array
            const timelinePostIndex = state.timelinePosts.findIndex(post => post._id === updatedPost._id);
            if (timelinePostIndex !== -1) {
                state.timelinePosts[timelinePostIndex] = { ...state.timelinePosts[timelinePostIndex], ...updatedPost };
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

export const { setPosts, setTimelinePosts, addPost, editPost, removePost, updatePostOnInteraction, addCachePost } = postSlice.actions;

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
