import {createSlice} from '@reduxjs/toolkit'

export const courseSlice = createSlice({
    name: 'course',
    initialState: {
        course: {},
        langs: [],
        lessons: [],
        langItem: {},
    },
    reducers: {
        setCourse: (state, action) => {
            return {
                ...state,
                course: action.payload
            }
        },
        setCourseLangs: (state, action) => {
            return {
                ...state,
                langs: action.payload
            }
        },
        setCourseLessons: (state, action) => {
            return {
                ...state,
                lessons: action.payload
            }
        },
        setLangItem: (state, action) => {
            return {
                ...state,
                langItem: action.payload
            }
        },
        editLang: (state, action) => {
            return {
                ...state,
                langs: [...state.langs.map(lang => {
                    return (lang.id === action.payload.id) ? {
                        ...lang,
                        title: action.payload.title,
                        symbol: action.payload.symbol,
                    } : lang
                })]
            }
        },
        editLesson: (state, action) => {
            return {
                ...state,
                lessons: [...state.lessons.map(lesson => {
                  return (lesson.id === action.payload.id)
                        ? {
                            ...lesson,
                            title: action.payload.lessonName,
                            symbol: action.payload.emoji
                        }
                        : lesson
                })
                ]
            }
        },
        addLesson: (state, action) => {
            console.log(action.payload)
            return {
                ...state,
                lessons: [...state.lessons, {
                    id: action.payload.id,
                    title: action.payload.lessonName,
                    symbol: action.payload.emoji,
                    lang: action.payload.lang,
                    review: false,

                }]
            }
        }
    },
})

// Action creators are generated for each case reducer function
export const {setCourse, setCourseLangs, setLangItem, editLang, editLesson, addLesson, setCourseLessons} = courseSlice.actions

export default courseSlice.reducer