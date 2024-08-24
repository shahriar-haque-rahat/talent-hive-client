import { createSlice } from "@reduxjs/toolkit";


const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: {},
    },
    reducers: {
        addAuthorizedUser: (state, action) => {
            state.user = action.payload;
        },
        clearUser: (state) => {
            state.user = {};
        },
    },
});

export const { addAuthorizedUser, clearUser } = userSlice.actions;

export default userSlice.reducer;