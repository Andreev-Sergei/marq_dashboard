
import $api from "../api";

export default class CourseService {
    static fetchCourseList = async () => {
        const {data} = await $api.get('/core/course-list')
        return data
    }
}