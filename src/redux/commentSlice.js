import { createSlice } from "@reduxjs/toolkit";

const commentSlice = createSlice({
    name: 'comment',
    initialState: {
        commentsByPost: {},
    },
    reducers: {
        setComments: (state, action) => {
            const { postId, comments } = action.payload;
            state.commentsByPost[postId] = comments;
        },
        addComment: (state, action) => {
            const { postId, comment } = action.payload;
            if (state.commentsByPost[postId]) {
                state.commentsByPost[postId].unshift(comment);
            } else {
                state.commentsByPost[postId] = [comment];
            }
        },
        editComment: (state, action) => {
            const { postId, comment } = action.payload;
            if (state.commentsByPost[postId]) {
                state.commentsByPost[postId] = state.commentsByPost[postId].map(
                    c => c._id === comment._id ? comment : c
                );
            }
        },
        removeComment: (state, action) => {
            const { postId, commentId } = action.payload;
            if (state.commentsByPost[postId]) {
                state.commentsByPost[postId] = state.commentsByPost[postId].filter(
                    comment => comment._id !== commentId
                );
            }
        },
    },
});

export const { setComments, addComment, removeComment, editComment } = commentSlice.actions;

export default commentSlice.reducer;
