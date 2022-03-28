import axios from "axios";
import {SERVER_URL} from "../helpers/constants";

export const fetchLesson = async (lessonId) => {
    const data = {
        lessonId: lessonId,
        pCourseTitle: 'English',
        pCourseId: 1,
        pLangTitle: 'Spanish',
        pLangId: 2,
        lessonName: '¡Yo hablo español!',
        reviewed: true,
        board: [
            {
                type: 'MESSAGE',
                value: '<p>test</p>'
            }
        ]
    }
    return data
}


export const fetchShortLessonItem = async (id) => {
    const data = await axios.get(SERVER_URL + `/lesson/${id}`, {
        params: {
            short: true
        }
    })
    return data
}