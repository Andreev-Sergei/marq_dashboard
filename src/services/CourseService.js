import $api from "../api";
import axios from "axios";
import {SERVER_URL} from "../helpers/constants";

export default class CourseService {
    static fetchCourseList = async () => {
        const response = await $api.get('/dashboard/course-list')
        return response
    }
    static addCourse = async (course) => {
        const response = await $api.post(SERVER_URL + '/course-list', {course})
        return response
    }
    static fetchCourse = async (courseId) => {
        const response = await $api.get(SERVER_URL + `/course-list/:${courseId}`)
        return response
    }
    static fetchLangItem = async (langId) => {
        const response = await $api.get(SERVER_URL + `/lang`, {params: {langId}})
        return response
    }
    static fetchShortLesson = async (lessonId) => {
        const response = await $api.get(SERVER_URL + `/lesson`, {
            params: {
                short: true,
                lessonId
            }
        })
        return response
    }
    static editLesson = async (lessonId, data) => {
        const response = await $api.put(SERVER_URL + `/lesson/${lessonId}`, data)
        return response
    }
    static addLesson = async (data) => {
        const response = await $api.post(SERVER_URL + `/lesson`, data)
        return response
    }

}