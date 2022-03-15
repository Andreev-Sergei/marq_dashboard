import {configureStore} from '@reduxjs/toolkit'
import userSlice from "./user/userSlice";
import courseSlice from "./course/courseSlice";
import lessonSlice from "./lesson/lessonSlice";

export default configureStore({
    reducer: {
        user: userSlice,
        course: courseSlice,
        lesson: lessonSlice
    },
})