import axios from "axios";
import {SERVER_URL} from "../helpers/constants";


export const fetchCourseList = async () => {
    const data = await axios.get(SERVER_URL + '/course-list')
    return data
}


export const addCourse = async (course) => {
    const data = await axios.post(SERVER_URL + '/course-list', {course})
    return data
}


export const fetchCourse = async (courseId) => {
    const data = await axios.get(SERVER_URL + `/course-list/${courseId}`)
    return data
}

export const fetchLangItem = async (langId) => {
    const data = await axios.get(SERVER_URL + `/lang/${langId}`)
    return data
}