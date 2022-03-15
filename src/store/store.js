import {configureStore} from '@reduxjs/toolkit'
import userSlice from "./reducers/userSlice";
import courseSlice from "./reducers/courseSlice";
import lessonSlice from "./reducers/lessonSlice";

export default configureStore({
    reducer: {
        user: userSlice,
        course: courseSlice,
        lesson: lessonSlice
    },
})