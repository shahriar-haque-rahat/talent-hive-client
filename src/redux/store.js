import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import navbarReducer from "./navbarSlice";
import loadingReducer from "./loadingSlice";

const store = configureStore({
    reducer: {
        user: userReducer,
        navbar: navbarReducer,
        loading: loadingReducer,
    }
})

export default store;