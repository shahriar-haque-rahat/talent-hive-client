import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: {},
        users: [],
        usersPage: 0,
    },
    reducers: {
        addAuthorizedUser: (state, action) => {
            state.user = action.payload;
        },
        clearUser: (state) => {
            state.user = {};
            state.users = [];
        },
        addFetchedUsers: (state, action) => {
            const newUsers = action.payload.users.filter(newUser =>
                !state.users.some(existingUser => existingUser._id === newUser._id)
            );
            state.users = [...state.users, ...newUsers];
            state.usersPage = action.payload.page;
        },
    },
});

export const { addAuthorizedUser, clearUser, addFetchedUsers } = userSlice.actions;
export default userSlice.reducer;
