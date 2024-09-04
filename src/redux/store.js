import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import navbarReducer from "./navbarSlice";
import loadingReducer from "./loadingSlice";
import postReducer from "./postSlice";
import commentReducer from "./commentSlice";

const store = configureStore({
    reducer: {
        user: userReducer,
        navbar: navbarReducer,
        loading: loadingReducer,
        post: postReducer,
        comment: commentReducer,
    }
})

export default store;