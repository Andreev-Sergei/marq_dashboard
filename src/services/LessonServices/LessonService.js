import $api from "../../api";
import {setLesson, setLoading} from "../../store/reducers/lessonSlice";

export default class LessonService {

    static fetchLesson = (id, short) => async (dispatch) => {
        const response = await $api.get(`/dashboard/lesson/${id}`,{
            params: { short }
        })
        try {
            setTimeout(async () => {
                await dispatch(setLesson(response.data))
                await dispatch(setLoading(false))
            },1000)
        } catch (e) {
            console.log(e)
        }
    }
}