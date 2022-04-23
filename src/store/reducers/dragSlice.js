import {createSlice} from '@reduxjs/toolkit'
const initialStateD = {
    type: null,
    dragItem: null,
    error: null
}
export const dragSlice = createSlice({
    name: 'drag',
    initialState: initialStateD,
    reducers: {
        setDrugItem: (state,action) => {
            return {
                ...state,
                dragItem: action.payload
            }
        },
        setDragType: (state,action) => {
            return {
                ...state,
                type: action.payload
            }
        },
        reset: () => initialStateD,


    },
})

// Action creators are generated for each case reducer function
export const { setDrugItem, setDragType, reset } = dragSlice.actions

export default dragSlice.reducer