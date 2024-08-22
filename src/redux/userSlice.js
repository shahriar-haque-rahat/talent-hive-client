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
    },
});

export const { addAuthorizedUser } = userSlice.actions;

export default userSlice.reducer;