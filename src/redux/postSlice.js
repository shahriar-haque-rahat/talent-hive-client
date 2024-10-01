import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
    name: 'post',
    initialState: {
        posts: [],
        postsPage: 0,
        cachedPosts: [],
        timelinePosts: [],
        timelinePostsPage: 0,
    },
    reducers: {
        addPost: (state, action) => {
            const { postData } = action.payload;
            
            // Update posts array
            state.posts.unshift(postData);

            // Update timelinePosts array
            state.timelinePosts.unshift(postData);
        },
        editPost: (state, action) => {
            const { postId, editedData } = action.payload;

            // Update posts array
            const postIndex = state.posts.findIndex(post => post._id === postId);
            if (postIndex !== -1) {
                state.posts[postIndex] = {
                    ...state.posts[postIndex],
                    ...editedData,
                };
            }

            // Update timelinePosts array
            const timelinePostIndex = state.timelinePosts.findIndex(post => post._id === postId);
            if (timelinePostIndex !== -1) {
                state.timelinePosts[timelinePostIndex] = {
                    ...state.timelinePosts[timelinePostIndex],
                    ...editedData,
                };
            }
        },
        removePost: (state, action) => {
            const postId = action.payload;

            // Update posts array
            state.posts = state.posts.filter(post => post._id !== postId);

            // Update timelinePosts array
            state.timelinePosts = state.timelinePosts.filter(post => post._id !== postId);
        },
        setPosts: (state, action) => {
            state.posts = action.payload;
        },
        setPostsPage: (state, action) => {
            state.postsPage = action.payload;
        },
        setTimelinePosts: (state, action) => {
            state.timelinePosts = action.payload;
        },
        setTimelinePostsPage: (state, action) => {
            state.timelinePostsPage = action.payload;
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

export const { setPosts,setPostsPage, setTimelinePosts, setTimelinePostsPage, addPost, editPost, removePost, updatePostOnInteraction, addCachePost } = postSlice.actions;

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
