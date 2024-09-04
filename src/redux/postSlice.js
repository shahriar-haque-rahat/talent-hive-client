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
            const { postUid, editedData } = action.payload;
            const index = state.posts.findIndex(post => post.uid === postUid);
            if (index !== -1) {
                state.posts[index] = {
                    ...state.posts[index],
                    ...editedData,
                };
            }
        },
        removePost: (state, action) => {
            const postUid = action.payload;
            state.posts = state.posts.filter(post => post.uid !== postUid);
        },
        setPosts: (state, action) => {
            state.posts = action.payload;
        },
    },
});

export const { setPosts, addPost, editPost, removePost } = postSlice.actions;

export default postSlice.reducer;