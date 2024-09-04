import { createSlice } from "@reduxjs/toolkit";

const commentSlice = createSlice({
    name: 'comment',
    initialState: {
        commentsByPost: {},
    },
    reducers: {
        setComments: (state, action) => {
            const { postUid, comments } = action.payload;
            state.commentsByPost[postUid] = comments;
        },
        addComment: (state, action) => {
            const { postUid, comment } = action.payload;
            if (state.commentsByPost[postUid]) {
                state.commentsByPost[postUid].unshift(comment);
            } else {
                state.commentsByPost[postUid] = [comment];
            }
        },
        removeComment: (state, action) => {
            const { postUid, commentUid } = action.payload;
            if (state.commentsByPost[postUid]) {
                state.commentsByPost[postUid] = state.commentsByPost[postUid].filter(
                    comment => comment.uid !== commentUid
                );
            }
        },
    },
});

export const { setComments, addComment, removeComment } = commentSlice.actions;

export default commentSlice.reducer;
