import $api from "../../api";
import {setLesson, setLoading} from "../../store/reducers/lessonSlice";
import {setBoard} from "../../store/reducers/HomeworkSlice";

export default class LessonService {

    static fetchLesson = (id, short) => async (dispatch) => {
        console.log('fetch lesson short:', !!short)
        const response = await $api.get(`/dashboard/lesson`, {
            params: {short, lessonId: id}
        })
        try {
            await dispatch(setLesson(response.data))
            await dispatch(setLoading(false))

        } catch (e) {
            console.log(e)
        }
    }
    static fetchHomeworkBoard = (exerciseId, lessonId) => async (dispatch) => {
        try {
            const {data: board} = await $api.get(`/dashboard/homework-board`, {
                params: {exerciseId, lessonId}
            })
            dispatch(setBoard(board))
        } catch (e) {
            console.log(e)
        }
    }
}