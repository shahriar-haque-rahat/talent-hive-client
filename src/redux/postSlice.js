import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
    name: 'post',
    initialState: {
        posts: {},
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
    },
});

export const { setPosts, addPost, editPost, removePost } = postSlice.actions;

export default postSlice.reducer;