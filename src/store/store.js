import {applyMiddleware, configureStore} from '@reduxjs/toolkit'
import userSlice from "./reducers/userSlice";
import courseSlice from "./reducers/courseSlice";
import lessonSlice from "./reducers/lessonSlice";
import dragSlice from "./reducers/dragSlice";
import homeworkSlice from "./reducers/HomeworkSlice";
import thunk from "redux-thunk";

export default configureStore({
    reducer: {
        user: userSlice,
        course: courseSlice,
        lesson: lessonSlice,
        drag: dragSlice,
        homework: homeworkSlice
    },
    middleware: [thunk]
})