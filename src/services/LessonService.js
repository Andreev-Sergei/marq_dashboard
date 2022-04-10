import $api from "../api";

export default class LessonService {
    static fetchLesson = async (id, short) => {
        const response = await $api.get(`/dashboard/lesson/${id}`,{
            params: { short }
        })
        return response
    }
}