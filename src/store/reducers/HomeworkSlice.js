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
        addTask: (state, action) => {
            console.log('add task to homework', action.payload)
            return {
                ...state,
                board: [action.payload, ...state.board]
            }
        },
        removeTask: (state, action) => {
            console.log('remove homework task', action.payload)
            return {
                ...state,
                board: [ ...state.board.filter(task => task.id !== action.payload)]
            }
        }
    },
})

// Action creators are generated for each case reducer function
export const {setExercise,setBoard, addTask, removeTask } = homeworkSlice.actions

export default homeworkSlice.reducer