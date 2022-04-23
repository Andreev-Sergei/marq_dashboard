import {createSlice} from '@reduxjs/toolkit'

export const homeworkSlice = createSlice({
    name: 'homework',
    initialState: {
        exercise: null,
        board: [],
        error: null
    },
    reducers: {
        setExercise: (state,action) => {
            return {
                ...state,
                exercise: action.payload
            }
        },
        setBoard: (state,action) => {
            return {
                ...state,
                board: action.payload
            }
        },
    },
})

// Action creators are generated for each case reducer function
export const {setExercise,setBoard } = homeworkSlice.actions

export default homeworkSlice.reducer