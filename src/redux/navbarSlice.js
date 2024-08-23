import { createSlice } from "@reduxjs/toolkit";

const navbarSlice = createSlice({
    name: 'navbar',
    initialState: {
        menuOpen: false
    },
    reducers: {
        toggleMenu: (state) => {
            state.menuOpen = !state.menuOpen;
        }
    },
    extraReducers: (builder) => {
        builder
    },
});

export const { toggleMenu } = navbarSlice.actions;

export default navbarSlice.reducer;
