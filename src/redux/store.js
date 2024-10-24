import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import navbarReducer from "./navbarSlice";
import loadingReducer from "./loadingSlice";
import postReducer from "./postSlice";
import commentReducer from "./commentSlice";
import companyReducer from "./companySlice";
import jobPostReducer from "./jobPostSlice";
import connectionReducer from "./connectionSlice";
import notificationReducer from "./notificationSlice";
import chatListReducer from "./chatListSlice";

const store = configureStore({
    reducer: {
        user: userReducer,
        navbar: navbarReducer,
        loading: loadingReducer,
        post: postReducer,
        comment: commentReducer,
        company: companyReducer,
        jobPost: jobPostReducer,
        connection: connectionReducer,
        notification: notificationReducer,
        chatList: chatListReducer,
    }
})

export default store;