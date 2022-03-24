import {createSlice} from '@reduxjs/toolkit'

export const lessonSlice = createSlice({
    name: 'lesson',
    initialState: {
        lessonId: null,
        lessonTitle: '',
        pLang: {},
        pCourse: {},
        board: [],
        editChatItem: null
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
                board: [action.payload, ...state.board]
            }
        },
        removeChatItem: (state, action) => {
            return {
                ...state,
                board: [...state.board.filter(x => x.id !== action.payload)]
            }
        },
        setEditChatItem: (state, action) => {
            return {
                ...state,
                editChatItem: action.payload
            }
        },
        editChatItem: (state, action) => {
            return {
                ...state,
                editChatItem: null,
                board: [...state.board.map(item => {
                    return (item.id === action.payload.id) ? action.payload : item
                })]
            }
        },
        cancelMsgEdit: (state) => {
            return {
                ...state,
                editChatItem: null,
            }
        }
    },
})

export const {setLesson, addChatItem, removeChatItem, setEditChatItem, editChatItem, cancelMsgEdit} = lessonSlice.actions

export default lessonSlice.reducer