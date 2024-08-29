import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import navbarReducer from "./navbarSlice";
import loadingReducer from "./loadingSlice";
import postReducer from "./postSlice";

const store = configureStore({
    reducer: {
        user: userReducer,
        navbar: navbarReducer,
        loading: loadingReducer,
        post: postReducer,
    }
})

export default store;