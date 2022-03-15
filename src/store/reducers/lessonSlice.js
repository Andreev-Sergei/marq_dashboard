import {createSlice} from '@reduxjs/toolkit'

export const lessonSlice = createSlice({
    name: 'lesson',
    initialState: {
        lessonId: null,
        lessonTitle: '',
        pLang: {},
        pCourse: {},
        board: []
    },
    reducers: {
        setLesson: (state, action) => {
            return {
                ...state,
                lessonId: action.payload.lessonId,
                lessonTitle: action.payload.lessonTitle,
                board: [...action.payload.board],
                lessonName: action.payload.lessonName,
                pCourse: {
                    title: action.payload.pCourseTitle,
                    id: action.payload.pCourseId
                },
                pLang:
                    {
                        title: action.payload.pLangTitle,
                        id: action.payload.pLangId
                    }
            }

        },
        addChatItem: (state, action) => {
            return {
                ...state,
                board: [action.payload,...state.board]
            }
        }
    },
})

export const {setLesson, addChatItem} = lessonSlice.actions

export default lessonSlice.reducer