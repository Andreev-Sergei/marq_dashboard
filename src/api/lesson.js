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


const input = {
    id: 4,
    keyboardType: 2,
    type: "TASK",
    taskType: "INPUT",
    typeTitle: "Input",
    value: "Dog - <i>собака</i>",
    variants: [
        {id: 1, word: 'собака', right: true},
        {id: 2, word: 'кошка', right: false},
        {id: 1, word: 'собака', right: true},
        {id: 2, word: 'кошка', right: false},
    ]
}



// userInput = TASK
const lesson = [
        { blockId: 2, messages: ['hi how are u?', 'give a answer'], userInput: { id: 2 } },
        { blockId: 3, messages: [], userInput: { id: 3 } },
]
