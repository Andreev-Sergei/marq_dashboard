import {createSlice} from '@reduxjs/toolkit'

export const courseSlice = createSlice({
    name: 'course',
    initialState: {
        course: {},
        langs: [],
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
        setLangItem: (state, action) => {
            return {
                ...state,
                langItem: action.payload
            }
        }
    },
})

// Action creators are generated for each case reducer function
export const {setCourse, setCourseLangs, setLangItem} = courseSlice.actions

export default courseSlice.reducer