import CourseList from "./pages/CourseList/CourseList";
import Course from "./pages/Course";
import Auth from "./pages/Auth";
import LessonEdit from "./pages/LessonEdit";

export const COURSES_LIST_ROUTE = '/course-list'
export const COURSE_ROUTE = '/course-list/'
export const LESSON_ROUTE = '/lesson/'
export const AUTH_ROUTE = '/auth'


export const routes  = [
    {
        path: COURSES_LIST_ROUTE,
        Component: CourseList
    },
     {
        path: COURSE_ROUTE + ':id',
        Component: Course
    },
     {
        path: LESSON_ROUTE + ':id',
        Component: LessonEdit
    },
]

export const publicRoutes = [
    {
        path: AUTH_ROUTE,
        Component: Auth
    }
]