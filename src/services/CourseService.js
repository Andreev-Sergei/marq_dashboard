import $api from "../api";

export default class CourseService {
    static fetchCourseList = async () => {
        const {data} = await $api.get('/dashboard/course-list')
        return data
    }
}